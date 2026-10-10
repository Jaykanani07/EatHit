# EAT HIT — Hero Section Design Specification

## Goal

Create a premium, cinematic EAT HIT khakhra hero using the supplied real khakhra and packet images.

The hero is a flavour carousel. The active khakhra is prominent in the center, the matching EAT HIT packet is displayed with it, and the previous/next flavours remain partially visible on the left and right.

The most important interaction is:

**NEW KHakhra enters from RIGHT → current khakhra exits LEFT → matching packet changes smoothly → flavour settles in the center.**

---

## Hero Composition

```text
┌──────────────────────────────────────────────────────────────┐
│ EAT HIT        Products   Our Story   Find a Store   Search  │
│                                                              │
│                 THE CRUNCH OF INDIA                          │
│                                                              │
│      PREVIOUS        ACTIVE PACKET        NEXT               │
│         🍘              ┌───────┐            🍘               │
│                         │ PACK  │                             │
│                         │  🍘   │                             │
│                         └───────┘                             │
│                                                              │
│                       JEERA KHakhra                          │
│                 LIGHT • CRISPY • FULL OF FLAVOUR             │
│                                                              │
│                         • ● • • •                             │
│                     SCROLL TO EXPLORE ↓                       │
└──────────────────────────────────────────────────────────────┘
```

The active product must always be the visual focus.

---

## Product Data

Keep all product information in one configuration.

```ts
const products = [
  {
    id: "plain",
    name: "Plain Khakhra",
    khakhraImage: "/images/products/plain-khakhra.png",
    packetImage: "/images/products/plain-pouch.png",
    accent: "#F2C64F",
    tagline: "PURE • SIMPLE • CLASSIC",
  },
  {
    id: "jeera",
    name: "Jeera Khakhra",
    khakhraImage: "/images/products/jeera-khakhra.png",
    packetImage: "/images/products/jeera-pouch.png",
    accent: "#E98527",
    tagline: "EARTHY • AROMATIC • CRISPY",
  },
  {
    id: "methi",
    name: "Methi Khakhra",
    khakhraImage: "/images/products/methi-khakhra.png",
    packetImage: "/images/products/methi-pouch.png",
    accent: "#69A43B",
    tagline: "HERBAL • LIGHT • CRISPY",
  },
  {
    id: "masala",
    name: "Masala Khakhra",
    khakhraImage: "/images/products/masala-khakhra.png",
    packetImage: "/images/products/masala-pouch.png",
    accent: "#DB2E2B",
    tagline: "BOLD • SPICY • CRISPY",
  },
  {
    id: "lasan",
    name: "Lasan Khakhra",
    khakhraImage: "/images/products/lasan-khakhra.png",
    packetImage: "/images/products/lasun-pouch.png",
    accent: "#DEB577",
    tagline: "GARLIC • CRUNCH • FLAVOUR",
  },
];
```

Use the supplied real assets. Do not replace them with generated substitutes.

---

## Core Flavour Interaction

The active product is centered.

```text
          PREVIOUS        ACTIVE        NEXT

             🍘             🍘             🍘
                            │
                            ↓
                         [PACKET]
```

Previous and next products are smaller, slightly rotated, and lower opacity.

Suggested values:

```text
Active:
scale: 1
opacity: 1

Adjacent:
scale: 0.62–0.72
opacity: 0.55–0.75
```

---

# Required Transition Direction

When moving to the next flavour:

**The new khakhra MUST swipe/enter from RIGHT to LEFT.**

The old active khakhra exits toward the left.

```text
BEFORE

       previous        CURRENT        next
          🍘             🍘             🍘


TRANSITION

          old 🍘  ─────────→ LEFT

                              NEW 🍘
                                ← enters from RIGHT


AFTER

       previous        CURRENT        next
          🍘             🍘             🍘
```

Technically:

### Current khakhra

```text
translateX(0)
opacity: 1
scale: 1
```

to:

```text
translateX(-120%)
opacity: 0
scale: 0.88
```

### New khakhra

Start:

```text
translateX(120%)
opacity: 0
scale: 0.88
```

Finish:

```text
translateX(0)
opacity: 1
scale: 1
```

Recommended:

```text
duration: 700–900ms
easing: cubic-bezier(0.22, 1, 0.36, 1)
```

Do not use a harsh linear animation.

---

# Packet Transition

The packet image MUST change whenever the flavour changes.

Do not instantly replace:

```js
packet.src = nextPacket;
```

Use two visual layers so the transition is smooth.

### Old packet

```text
scale: 1
opacity: 1
blur: 0
```

to:

```text
scale: 0.94
opacity: 0
blur: 4px
```

### New packet

```text
scale: 1.04
opacity: 0
blur: 4px
```

to:

```text
scale: 1
opacity: 1
blur: 0
```

Recommended duration:

```text
650–850ms
```

The packet should feel like it is physically being replaced rather than simply swapped.

---

# Combined Transition Timeline

All parts should feel like one coordinated animation.

```text
0ms
Current flavour is stable.

50ms
New khakhra starts entering from RIGHT.

100ms
Current khakhra starts moving LEFT.

150ms
Packet transition begins.

250ms
Background/accent begins changing.

400ms
New packet becomes dominant.

550ms
New khakhra approaches center.

700–800ms
New khakhra settles.

800ms
Everything is stable.
```

Target transition:

**~800ms**

---

# Khakhra + Packet Relationship

The khakhra should visually feel connected to its matching packet.

During the transition, briefly overlap the khakhra with the packet.

```text
             🍘
                                           ┌─────────┐
              │  PACKET │
              │         │
              └─────────┘
```

This gives the impression that the khakhra belongs to that package.

Do not make the khakhra permanently cover important packet branding.

---

# Side Products

Always show previous and next flavours when screen size permits.

```text
        LASAN          JEERA          METHI

          🍘            🍘              🍘
```

Side products should:

- be smaller
- have reduced opacity
- have slight rotation
- sit closer to the edges
- never compete with the active product

On mobile, only partial side products are necessary.

---

# Infinite Carousel

The order is:

```text
Plain
  ↓
Jeera
  ↓
Methi
  ↓
Masala
  ↓
Lasan
  ↓
Plain
```

Use modulo indexing so there is no visible jump:

```ts
const previousIndex =
  (activeIndex - 1 + products.length) % products.length;

const nextIndex =
  (activeIndex + 1) % products.length;
```

---

# Scroll / Swipe Behaviour

The main visual movement is horizontal **RIGHT → LEFT** when moving to the next flavour.

### Desktop

- Mouse wheel/page scroll advances the hero.
- The hero can remain sticky/pinned while flavours change.
- Optional drag support is welcome.

### Mobile

- Horizontal swipe controls the carousel.
- Swipe right-to-left = next flavour.
- Swipe left-to-right = previous flavour.

Recommended swipe threshold:

```text
~60px
```

Avoid changing flavour from tiny accidental movements.

---

# Preferred Scroll-Driven Experience

The final website should preferably be scroll-driven rather than simply autoplaying a video.

Example:

```text
0%       Plain
20%      Jeera
40%      Methi
60%      Masala
80%      Lasan
100%     Explore Products
```

The hero can be pinned while the flavour transitions occur.

This makes the interaction feel intentional and premium.

---

# Background Transition

Use a flavour-specific visual atmosphere:

```text
Plain  → warm yellow / cream
Jeera  → warm orange
Methi  → natural green
Masala → rich red
Lasan  → warm cream / garlic
```

Transition smoothly.

Avoid abrupt background replacement.

Example:

```css
transition:
  background-color 800ms cubic-bezier(0.22, 1, 0.36, 1);
```

A large soft gradient/orb can also transition behind the product.

---

# Typography

Keep the hero typography bold and minimal.

Eyebrow:

```text
TRADITIONAL • CRISPY • EVERYDAY GOODNESS
```

Main heading:

```text
THE CRUNCH
OF INDIA
```

Product name:

```text
JEERA KHakhra
```

Supporting line:

```text
LIGHT • CRISPY • FULL OF FLAVOUR
```

Do not fill the hero with paragraphs.

The product imagery should carry most of the visual communication.

---

# Hero Controls

Use subtle carousel controls.

```text
        ←                       →
```

And/or:

```text
○  ●  ○  ○  ○
```

The active dot corresponds to the active flavour.

Controls should never overpower the product.

---

# Asset Requirements

Use the supplied real assets:

### Khakhra

- Plain
- Jeera
- Methi
- Masala
- Lasan

### Packets

- Plain
- Jeera
- Methi
- Masala
- Lasan

Keep the khakhra images realistic.

Do not apply aggressive color filters that change their real appearance.

---

# Image Preloading

Preload all 10 product assets before enabling the hero carousel.

```ts
await Promise.all(
  products.flatMap(product => [
    preloadImage(product.khakhraImage),
    preloadImage(product.packetImage),
  ])
);
```

The user should never see:

- blank product
- loading spinner
- broken image
- visible loading delay
- layout jump

---

# Recommended Animation Technology

## Preferred: GSAP

For a React/Next.js implementation, GSAP + ScrollTrigger is recommended for the cinematic scroll-driven version.

Use:

- GSAP
- ScrollTrigger
- transforms
- opacity
- scale
- blur
- background transitions

## Alternative: Framer Motion

Use Framer Motion if the project already relies heavily on React state and gesture interactions.

Use:

- `AnimatePresence`
- `motion`
- `drag`
- spring transitions

Do not introduce a heavy 3D library unless it is genuinely needed.

The supplied 2D product assets are strong enough.

---

# Performance

Prefer GPU-friendly properties:

```text
transform
opacity
filter
```

Avoid repeatedly animating layout properties such as:

```text
left
top
width
height
```

Use:

```css
transform: translate3d(...);
```

where appropriate.

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Reduced-motion mode should use a simple fade/short slide rather than large movement.

---

# Responsive Design

## Desktop

```text
Previous | Active Packet + Khakhra | Next
```

## Tablet

Reduce side product size.

## Mobile

```text
             ACTIVE PACKET

                  🍘

            JEERA KHakhra

           ←  ● ● ● ● ●  →
```

Allow partial previous/next khakhras to peek in from the edges.

The active product remains dominant.

---

# State Synchronization

The following must always change together:

1. Khakhra
2. Packet
3. Product name
4. Tagline
5. Accent/background
6. Carousel indicator

All should derive from the same `activeProduct`.

Never allow a state such as:

```text
JEERA title
+
MASALA packet
+
METHI khakhra
```

The product state must be atomic.

---

# Desired Experience

The final interaction should feel like:

```text
DISCOVER
   ↓
CURRENT FLAVOUR
   ↓
NEW KHakhra enters from RIGHT
   ↓
OLD KHakhra exits LEFT
   ↓
PACKET changes smoothly
   ↓
BACKGROUND changes
   ↓
TITLE changes
   ↓
NEW PRODUCT settles
   ↓
DISCOVER NEXT FLAVOUR
```

It should feel **smooth, premium, tactile and product-focused**.

It should NOT feel like:

```text
click
→ image instantly changes
→ text instantly changes
```

---

# Acceptance Criteria

- [ ] Real supplied khakhra images are used.
- [ ] Real supplied packet images are used.
- [ ] Five flavours are supported.
- [ ] Previous and next khakhras are visible.
- [ ] Active khakhra is larger and visually dominant.
- [ ] New khakhra enters from RIGHT.
- [ ] Old khakhra exits toward LEFT.
- [ ] Packet changes with the active flavour.
- [ ] Packet transition is animated.
- [ ] No abrupt packet image swap is visible.
- [ ] Background/accent changes smoothly.
- [ ] Product title changes with the same active product.
- [ ] Carousel loops infinitely.
- [ ] Desktop scroll/drag interaction works.
- [ ] Mobile swipe works.
- [ ] Images are preloaded.
- [ ] Animation does not cause layout shifting.
- [ ] Main motion uses GPU-friendly transforms/opacity.
- [ ] Reduced-motion users receive a simpler transition.
- [ ] No unrelated redesign is introduced while implementing this hero.
