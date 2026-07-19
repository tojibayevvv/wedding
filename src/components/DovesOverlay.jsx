import "./DovesOverlay.css";

// Hand-drawn single-silhouette dove, wings spread mid-glide.
// Kept as one shared path so every dove on screen reads consistently.
function DoveSilhouette({ tone }) {
  return (
    <svg viewBox="0 0 100 60" className="dove-svg" aria-hidden="true">
      <path
        d="M6,38
           C 16,20 32,13 48,23
           C 53,12 66,6 80,10
           C 71,19 61,23 55,27
           C 66,28 80,26 92,31
           C 78,38 62,38 53,33
           C 55,41 51,49 45,47
           C 45,40 43,34 38,31
           C 27,35 15,37 6,38 Z"
        fill={tone}
      />
    </svg>
  );
}

// Hand-tuned choreography rather than randomized — a few birds,
// varied depth (scale/opacity/duration), alternating direction.
const FLOCK = [
  { top: "18%", duration: 26, delay: 0, scale: 0.55, opacity: 0.16, dir: "ltr", flap: 0.9 },
  { top: "32%", duration: 34, delay: 4, scale: 0.85, opacity: 0.26, dir: "rtl", flap: 1.1 },
  { top: "12%", duration: 30, delay: 11, scale: 0.4, opacity: 0.12, dir: "ltr", flap: 0.8 },
  { top: "45%", duration: 40, delay: 6, scale: 0.65, opacity: 0.18, dir: "rtl", flap: 1.0 },
  { top: "24%", duration: 22, delay: 16, scale: 1.0, opacity: 0.3, dir: "ltr", flap: 1.05 },
];

export default function DovesOverlay({ tone = "#faf3e7", className = "" }) {
  return (
    <div className={`doves-overlay ${className}`} aria-hidden="true">
      {FLOCK.map((d, i) => (
        <div
          key={i}
          className={`dove-wrapper dove-${d.dir}`}
          style={{
            top: d.top,
            "--duration": `${d.duration}s`,
            "--delay": `${d.delay}s`,
            "--scale": d.scale,
            "--opacity": d.opacity,
          }}
        >
          <div className="dove-flap" style={{ "--flap-duration": `${d.flap}s` }}>
            <DoveSilhouette tone={tone} />
          </div>
        </div>
      ))}
    </div>
  );
}
