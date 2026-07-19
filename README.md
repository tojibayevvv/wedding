# Taklifnoma — wedding invitation SPA

Vite + React. Cover → tap → intro video (crossfades into its own last
frame) → scroll through the invitation letter → wedding date.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. Best viewed on a phone-sized viewport
(it's built mobile-first — open DevTools device toolbar, or just open
it on your phone).

```bash
npm run build      # production build, output in dist/
npm run preview    # serve that production build locally
```

## Add your media (required)

Drop your two files into `public/media/`:

- `intro-video.mp4` — the intro video
- `last-frame.jpg` — a still image that is **the exact final frame**
  of that video (same crop/resolution). This is what makes the
  video → image transition invisible. Full details in
  `public/media/README.md`.

The app runs fine without them (it'll just skip forward if the video
fails to load), so you can preview the flow immediately and drop the
real files in whenever they're ready.

## Edit the text

Everything editable — the cover title, the invitation letter, the
couple's names, the date/time/venue — lives in one file:

```
src/content/weddingContent.js
```

The invitation and event details currently contain **placeholder
Uzbek text with bracketed placeholders** (e.g. `[Kelin ismi]`,
`[To'yxona nomi]`) — replace those with the real names/venue before
sharing.

## Project structure

```
src/
  content/weddingContent.js   ← edit this for all text/media paths
  components/
    LandingCover.jsx          ← "Taklifnoma" + tap to continue
    IntroSequence.jsx         ← video, crossfades into last-frame image
    ScrollFlow.jsx            ← scroll-snap container for the 3 sections below
    HeroSection.jsx           ← the frozen last-frame image + scroll cue
    InvitationSection.jsx     ← the invitation letter
    DateSection.jsx           ← the wedding date medallion
    DovesOverlay.jsx          ← the animated dove flock (used on the cover + date)
    Divider.jsx, ScrollCue.jsx← small reusable ornament/icon pieces
  App.jsx                     ← cover → intro → scroll state machine
```

## Notes on how the smooth bits work

- **Video preloads silently during the cover screen** (mounted from
  app start with `preload="auto"`, just invisible), so tapping
  "continue" starts playback instantly instead of buffering.
- **Video → image crossfade**: the last-frame image sits underneath
  the video the whole time; on `ended` the video just fades its own
  opacity to 0, revealing the (identical-looking) image beneath. If
  your still frame doesn't exactly match the video's last frame,
  you'll see a jump here — that's the one asset constraint that
  matters for the "no glitches" requirement.
- **Scroll-snap** (`scroll-snap-type: y mandatory`) drives the hero →
  invitation → date flow, so it always settles on a full section
  instead of stopping half way.
- **Reduced motion**: anyone with `prefers-reduced-motion` set gets
  the doves and pulse/bounce animations turned off automatically.
- Autoplay is muted by default (required for reliable autoplay on
  iOS/Android) with a small unmute button once playback actually
  starts — full sound requires a second tap, which browsers require.

## Extending it (section 5 and beyond)

Add a new `src/components/YourSection.jsx` + `.css` following the
pattern of `InvitationSection.jsx`, then drop it into `ScrollFlow.jsx`
between the existing sections. It'll pick up scroll-snap and the same
design tokens automatically.
