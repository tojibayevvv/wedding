import { ChevronDown } from "lucide-react";
import "./ScrollCue.css";

export default function ScrollCue({ label, tone = "light" }) {
  return (
    <div className={`scroll-cue scroll-cue--${tone}`}>
      {label && <span className="scroll-cue__label">{label}</span>}
      <ChevronDown className="scroll-cue__icon" size={22} strokeWidth={1.5} />
    </div>
  );
}
