import { motion } from "framer-motion";
import ScrollCue from "./ScrollCue";
import { weddingContent } from "../content/weddingContent";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section" aria-label="Taklifnoma rasmi">
      <img
        src={weddingContent.media.lastFrame}
        alt=""
        className="hero-section__image"
      />
      <div className="hero-section__scrim" aria-hidden="true" />

      <motion.div
        className="hero-section__cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <ScrollCue label="pastga suring" tone="light" />
      </motion.div>
    </section>
  );
}
