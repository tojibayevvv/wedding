export default function Divider({ tone = "#c8a24f", className = "" }) {
  return (
    <svg
      className={`divider-ornament ${className}`}
      viewBox="0 0 160 20"
      aria-hidden="true"
      style={{ width: "120px", height: "15px" }}
    >
      <line x1="0" y1="10" x2="62" y2="10" stroke={tone} strokeWidth="1" />
      <path
        d="M80,3 L86,10 L80,17 L74,10 Z"
        fill="none"
        stroke={tone}
        strokeWidth="1"
      />
      <line x1="98" y1="10" x2="160" y2="10" stroke={tone} strokeWidth="1" />
    </svg>
  );
}
