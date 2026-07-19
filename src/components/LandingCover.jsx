import { motion } from "framer-motion";
import DovesOverlay from "./DovesOverlay";
import Divider from "./Divider";
import { weddingContent } from "../content/weddingContent";
import "./LandingCover.css";

export default function LandingCover({ onContinue }) {
  const { title, hint } = weddingContent.cover;

  return (
    <motion.button
      type="button"
      className="landing-cover"
      onClick={onContinue}
      aria-label="Taklifnomani ochish uchun bosing"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <DovesOverlay />

      <div className="landing-cover__glow" aria-hidden="true" />

      <motion.div
        className="landing-cover__content"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <h1 className="landing-cover__title">{title}</h1>
        <Divider className="landing-cover__divider" />
      </motion.div>

      <div className="landing-cover__tap-hint">
        <span className="landing-cover__ripple" aria-hidden="true">
          <span className="ripple-ring" />
          <span className="ripple-ring ripple-ring--delayed" />
          <span className="ripple-dot" />
        </span>
        <span className="landing-cover__hint-text">{hint}</span>
      </div>
    </motion.button>
  );
}
