import { NVIDIA, SYSTEM_PROMPT, type ChatMessage } from "@/lib/concierge";

/**
 * Concierge chat endpoint. Proxies the conversation to DeepSeek on NVIDIA NIM
 * (OpenAI-compatible API) and streams the reply back as plain text so the
 * widget can render it token-by-token.
 *
 * The API key never reaches the browser - it lives only in NVIDIA_API_KEY on
 * the server. Swap point for a different provider is isolated to this file.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 20; // trim history so the context stays bounded
const MAX_LEN = 4000; // hard cap on any single message

function sanitize(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_LEN) }));
}

export async function POST(req: Request) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The concierge is not configured yet." },
      { status: 503 },
    );
  }

  let history: ChatMessage[];
  try {
    const body = await req.json();
    history = sanitize(body?.messages);
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  if (history.length === 0) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${NVIDIA.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        model: NVIDIA.model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        temperature: 0.5,
        top_p: 0.9,
        max_tokens: 700,
        stream: true,
      }),
    });
  } catch {
    return Response.json(
      { error: "Could not reach the concierge service." },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    return Response.json(
      { error: "The concierge is briefly unavailable." },
      { status: 502 },
    );
  }

  // Re-emit the OpenAI-style SSE stream as a plain UTF-8 text stream of the
  // assistant's visible content only (DeepSeek's separate `reasoning_content`
  // and any <think> blocks are dropped so the customer never sees them).
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      let inThink = false;

      const push = (text: string) => {
        if (!text) return;
        // Strip inline <think>…</think> reasoning some DeepSeek builds emit.
        let out = "";
        let rest = text;
        while (rest) {
          if (inThink) {
            const end = rest.indexOf("</think>");
            if (end === -1) return;
            rest = rest.slice(end + "</think>".length);
            inThink = false;
          } else {
            const start = rest.indexOf("<think>");
            if (start === -1) {
              out += rest;
              break;
            }
            out += rest.slice(0, start);
            rest = rest.slice(start + "<think>".length);
            inThink = true;
          }
        }
        if (out) controller.enqueue(encoder.encode(out));
      };

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (typeof delta === "string") push(delta);
            } catch {
              // Ignore keep-alive / non-JSON lines.
            }
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode("\n\n(Connection interrupted. Please try again.)"),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
