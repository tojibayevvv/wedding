# Put your media here

| File you add          | Replaces                          |
|------------------------|------------------------------------|
| `intro-video.mp4`      | The intro video                    |
| `last-frame.jpg`       | The still image the video ends on  |

Requirements for a glitch-free transition:
- `last-frame.jpg` must be **the exact final frame** of `intro-video.mp4`
  (same crop, same resolution ratio). Any mismatch will show as a visible
  jump when the video fades into the image.
- Recommended video format: H.264 .mp4, ideally under ~15MB so it starts
  playing instantly on mobile data. Vertical/portrait video (9:16) works
  best since this is a mobile-first single page.
- `last-frame.jpg` can be a `.jpg` or `.png` — just keep the filename (or
  update the path in `src/content/weddingContent.js`).

Nothing else to configure — the app reads both paths from
`src/content/weddingContent.js`.
