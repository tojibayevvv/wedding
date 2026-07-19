import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingCover from "./components/LandingCover";
import IntroSequence from "./components/IntroSequence";
import ScrollFlow from "./components/ScrollFlow";
import MusicController from "./components/MusicController";

// cover -> intro -> scroll
export default function App() {
  const [appState, setAppState] = useState("cover");
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("app--scrollable", appState === "scroll");
  }, [appState]);

  useEffect(() => {
    if (appState !== "scroll") return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const frame = window.requestAnimationFrame(() => {
      const invitation = container.querySelector(".invitation-section");
      if (invitation) {
        invitation.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [appState]);

  const handleTapContinue = useCallback(() => setAppState("intro"), []);
  const handleIntroComplete = useCallback(() => setAppState("scroll"), []);

  return (
    <>
      <AnimatePresence>
        {appState === "cover" && <LandingCover key="cover" onContinue={handleTapContinue} />}
      </AnimatePresence>

      {/* Mounted from the start so the video can preload during the cover screen. */}
      <IntroSequence active={appState === "intro"} onComplete={handleIntroComplete} />

      {appState === "scroll" && <div ref={scrollContainerRef}><ScrollFlow /></div>}

      <MusicController />
    </>
  );
}
