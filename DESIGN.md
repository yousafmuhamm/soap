---
name: Yeong Won
description: A refined, clinically assured wholesale skincare house.
colors:
  clinical-gold: "#C5922E"
  clinical-gold-ink: "#8A641E"
  porcelain-cream: "#F7EAD2"
  gallery-white: "#FFFFFF"
  house-ink: "#111111"
  quiet-graphite: "#6B6B6B"
typography:
  display: Cormorant Garamond
  body: Jost
  label: Jost Medium
rounded:
  square: 0px
  glass: 4px
  pill: 9999px
spacing:
  2xs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
components:
  primary-button: Dark ink field with compact uppercase label
  text-link: Underlined editorial action with a gold rule
  input: Transparent field with an ink-to-gold underline
  glass-panel: Restrained frosted surface reserved for imagery
---

# Design System: Yeong Won

## Overview

The creative north star is **The Gilded Laboratory**: a quiet, exacting wholesale skincare house where clinical confidence and restrained luxury coexist. The experience is composed for buyers, distributors, and prospective stockists who need to evaluate formulation, pack format, positioning, and credibility before making contact.

The system should feel high-end, elegant, refined, assured, and clinical. Luxury comes from scale, whitespace, strong product imagery, precise language, and controlled contrast. Avoid generic beauty-store patterns, crowded merchandising, discount language, consumer checkout cues, decorative gradients, and trend-led effects.

## Colors

**Clinical Gold** is the identifying accent. Use it for rules, icons, active states, dark-surface labels, and restrained emphasis. It is not a body-text color on white.

**Clinical Gold Ink** is the accessible text companion to Clinical Gold. Use it for small gold-toned copy and numerals on light or porcelain surfaces.

**Porcelain Cream** creates the one warm editorial band and gentle product backdrops. Pair small text on it with House Ink at 70% or stronger.

**Gallery White** is the primary canvas. **House Ink** carries headlines, copy, controls, and primary actions. **Quiet Graphite** supports secondary copy on white, but should not be used on Porcelain Cream at small sizes.

Keep the palette narrow. Photography may introduce natural material color, but interface chrome must remain within these named colors.

## Typography

Cormorant Garamond is the display voice for headlines, pull quotes, product names, and prominent numerals. It should feel editorial and assured, with tight line heights and generous scale rather than decorative styling.

Jost is the functional voice for body copy, navigation, forms, metadata, and buttons. Body copy uses regular weights and comfortable leading. Labels use medium weight, 11px sizing, uppercase treatment, and 0.16em tracking. Reserve labels for navigation, section markers, and compact actions; do not turn full sentences into labels.

## Elevation

The default interface is flat: no general-purpose shadows and square corners. Hierarchy comes from spacing, type, hairline rules, image scale, and surface color.

Frosted glass is the single controlled elevation treatment. Use the 4px glass surface only over photography or video for the hero, science panel, concierge, and scrolled header. It combines a subtle border, restrained blur, and soft depth. Never stack multiple glass surfaces or apply them over plain white or cream fields.

Motion is quiet and functional: 320ms ease-out reveals, 12px maximum travel, and 60ms stagger steps. Respect reduced-motion and reduced-transparency preferences. Ambient video must retain a meaningful still image and avoid loading for reduced-motion, data-saving, or slow-network visitors.

## Components

**Header:** A centered wordmark with compact left and right navigation. The wordmark is slightly more prominent than the labels. The transparent hero state uses white; the solid state uses ink and gold. All controls retain a visible current-color focus outline.

**Primary button:** House Ink background, Gallery White label, square corners, at least 44px tall. Hover may invert toward Clinical Gold. Disabled and pending states reduce opacity without removing the label.

**Editorial link:** Compact uppercase text with a two-pixel Clinical Gold underline. Keep actions descriptive and buyer-oriented.

**Inputs:** Transparent fields with a one-pixel House Ink underline that shifts to Clinical Gold on focus. Labels sit above the field. Errors appear directly below and preserve the entered value. Every submission must expose pending, success, and recoverable failure states.

**Glass panel:** Use only over media, with readable foreground contrast and a solid fallback. Concierge controls use the same glass language, 44px targets, clear focus, Escape dismissal, and focus restoration.

**Media:** Product imagery is direct and tactile, with editorial crops and accurate alternative text. The homepage hero presents a priority still first, then progressively loads the reel without competing for the initial render.

## Do’s and Don’ts

- Do lead with wholesale relevance, product credibility, pack information, and a clear enquiry path.
- Do use generous whitespace, exact typography, restrained gold accents, and strong photography.
- Do keep keyboard focus visible and maintain WCAG 2.2 AA contrast for text and controls.
- Do preserve visitor input when delivery fails and explain how to recover.
- Don’t introduce consumer carts, prices, discount banners, ratings, or crowded product grids.
- Don’t use Clinical Gold for small text on white; use Clinical Gold Ink instead.
- Don’t add arbitrary radii, shadows, gradients, or glass effects outside the documented exceptions.
- Don’t overuse uppercase labels, long stagger sequences, or large reveal movement.
- Don’t claim a lead was received until the delivery service confirms it.
