/**
 * Renders a JSON-LD structured-data script. Server component. The payload is
 * serialised into a <script type="application/ld+json"> tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, server-authored content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
