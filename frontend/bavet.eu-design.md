---
version: alpha
name: Bavet Bold Casual
description: A warm, high-energy restaurant brand with oversized display type, tight red accents, and a lightly vintage, playful attitude.
colors:
  primary: "#c33130"
  secondary: "#333333"
  tertiary: "#f4f1ea"
  neutral: "#ffffff"
  surface: "#f4f1ea"
  on-surface: "#333333"
  border: "#e5e7eb"
  muted: "#ffffffcc"
typography:
  headline-display:
    fontFamily: Krisha
    fontSize: 120px
    fontWeight: 400
    lineHeight: 144px
    letterSpacing: 0px
  headline-lg:
    fontFamily: Krisha
    fontSize: 73px
    fontWeight: 400
    lineHeight: 102px
    letterSpacing: 0px
  headline-md:
    fontFamily: Teko
    fontSize: 44px
    fontWeight: 400
    lineHeight: 53px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Teko
    fontSize: 26px
    fontWeight: 400
    lineHeight: 31px
    letterSpacing: 0px
  body-lg:
    fontFamily: Barlow
    fontSize: 20px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: Barlow
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: Barlow
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: Teko
    fontSize: 20px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  label-md:
    fontFamily: Barlow
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0px
  label-sm:
    fontFamily: Barlow
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  nav-link:
    fontFamily: Teko
    fontSize: 18px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  button-label:
    fontFamily: Teko
    fontSize: 20px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 10px
  xl: 16px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  xxl: 176px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.button-label}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.button-label}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
    height: "56px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.neutral}"
    typography: "{typography.button-label}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
    height: "56px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "16px"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "16px"
  chip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
---
## Overview

Bavet feels loud, cheerful, and a little theatrical, with a strong restaurant identity built around food, friends, and personality. The visual tone is casual rather than corporate: oversized display type, strong red accents, and a soft warm backdrop create a playful but still polished experience. Layouts are open and airy, but the content itself is bold and attention-seeking, so the system should preserve that contrast.

## Colors

- **Primary (#c33130):** A saturated tomato red used for brand moments, CTAs, logo treatment, and emphatic outlines. It carries the energetic, social feel of the site and should remain the main accent color.
- **Secondary (#333333):** A deep charcoal used for navigation, body text, and readable contrast against the light background. It keeps the playful brand from feeling too decorative.
- **Tertiary (#f4f1ea):** A warm off-white background that softens the palette and gives the page a slightly nostalgic, paper-like feel. It works best as the main surface color.
- **Neutral (#ffffff):** Clean white used for button text, overlays, and high-contrast UI elements. It helps the red buttons and modal cards pop clearly.
- **Surface (#f4f1ea):** The default panel and page surface tone, matching the overall warm backdrop. Use it for cards and broad sections when you want continuity with the page.
- **On-surface (#333333):** The primary readable text color on warm surfaces. It should be used for copy, labels, and utility text that needs dependable contrast.
- **Border (#e5e7eb):** A light neutral border color for subtle separation around cards and inputs. It stays understated so the layout feels lightweight.
- **Muted (#ffffffcc):** A translucent white for softened overlays and secondary UI treatments. Useful when the design needs a lighter visual touch without losing contrast.

## Typography

The system uses three distinct voice layers: Krisha for oversized editorial headlines, Teko for condensed energetic UI labels, and Barlow for readable supporting copy. Headlines should feel expressive and spacious, while body text stays simple and functional. The site leans heavily on uppercase or all-caps presentation in navigation and buttons, so labels should use compact, condensed styling with minimal letter spacing and strong vertical presence.

- **Headline-display / Headline-lg:** Use Krisha for large hero messaging and oversized promotional statements. This face gives the brand its distinctive, poster-like character.
- **Headline-md / Headline-sm:** Use Teko for section titles, nav-like emphasis, and compact display moments. It feels athletic and punchy, which suits the restaurant’s lively tone.
- **Body-lg / Body-md / Body-sm:** Use Barlow for paragraphs, cookie copy, helper text, and general interface content. It keeps information easy to scan and avoids competing with the display fonts.
- **Label-lg / Button-label / Nav-link:** Use Teko for primary action labels and top navigation, especially in uppercase contexts. The condensed proportions make buttons feel bold without requiring heavy weight.
- **Label-md / Label-sm:** Use Barlow for small utility text and secondary labels when clarity matters more than personality.

## Layout

The layout is spacious and centered, with large open fields of background color framing a hero illustration and a floating modal. Content blocks are separated by generous vertical breathing room rather than tight multi-column density. Use the spacing scale rhythmically: 8px for fine adjustments, 16px and 24px for internal component padding, 48px for section separation, and 80px or more for major page breathing room.

The interface favors large centered compositions and wide margins, so containers should feel restrained and intentional instead of edge-to-edge busy. Buttons and cards should have comfortable internal padding, but not excessive rounding or shadow depth. Sections should balance decorative overflow with clear alignment, keeping primary actions visually anchored near the center.

## Elevation & Depth

Depth is subtle and mostly achieved through layering, contrast, and scale rather than pronounced shadows. The background stays flat and warm, while foreground elements such as modals and button groups stand out through solid fills, borders, and tonal separation. Shadows are minimal; if used at all, they should be extremely soft and sparing.

The hero image and modal card create hierarchy by overlapping intentionally, not by heavy elevation effects. Borders and contrast are more important than blur or complex shadow stacks. Keep the system visually crisp and slightly graphic.

## Shapes

The shape language is rounded but restrained. Corners sit in the 8px to 10px range for most interactive elements, giving the UI a friendly, approachable feel without becoming pill-shaped by default. Use full rounding only for chips or highly compact badges that need a softer, more tactile presence.

Overall, the shapes should feel practical and lively rather than luxurious or technical. Rectangular forms with modest rounding match the brand’s casual restaurant energy and keep the layout grounded.

## Components

### Buttons
Buttons are central to the interface and should be bold, condensed, and easy to scan. Primary actions use `button-primary` with a red fill, white text, and Teko typography. Secondary actions use `button-secondary` with a transparent background and white border for use on dark or image-heavy surfaces. Tertiary or link-style actions use `button-tertiary` for minimal emphasis and should remain visually light.

Primary buttons should be around 56px tall with generous horizontal padding, giving them a chunky, menu-like presence. Hover states should not introduce dramatic color shifts; instead, preserve the same brand red and rely on subtle interaction changes like contrast, cursor, or border emphasis. Avoid oversized shadows or overly soft pill shapes.

### Cards
Cards use `card` with the warm surface color, a 1px border, and modest 8px rounding. They should feel like simple content containers rather than elevated panels. Keep padding comfortable but compact, and avoid strong shadows so cards remain part of the flat, layered composition.

### Inputs
Inputs should follow the same restrained shape as cards, with 8px rounding, light borders, and clear text contrast. They should look clean, functional, and legible on the warm background. Use Barlow for input text and labels to preserve readability.

### Chips and Badges
Use `chip` for small emphasis elements, tag-like labels, and compact callouts. These should be fully rounded, red-filled, and white-texted to remain highly visible. Keep their padding tight and their text brief.

### Navigation
Top navigation is concise and uppercase-feeling, using Teko or similarly condensed label styling. Items should remain evenly spaced and understated, with the logo receiving the strongest brand expression. Navigation should feel integrated into the page rather than floating independently.

### Modals and Overlays
Cookie or consent modals should use a solid red surface with white text and clean internal spacing. Keep the structure simple: clear message, a prominent primary action, and secondary options grouped below. The modal should be readable over busy imagery and should avoid decorative effects that compete with the content.

## Do's and Don'ts

- Do use the warm off-white background and red accent as the core brand contrast.
- Do keep headlines large, expressive, and editorial in spirit.
- Do use Teko for buttons and navigation to preserve the condensed, energetic feel.
- Do keep cards and inputs lightly bordered with modest 8px to 10px rounding.
- Don't introduce heavy drop shadows or glossy depth effects.
- Don't replace the display typography with generic sans-serif styles for hero moments.
- Don't make buttons overly pill-shaped or overly minimal; they should feel bold and substantial.
- Don't crowd the layout with dense grids when the brand is clearly spacious and centered.
