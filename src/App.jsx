import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingCover from "./components/LandingCover";
import IntroSequence from "./components/IntroSequence";
import ScrollFlow from "./components/ScrollFlow";

// cover -> intro -> scroll
export default function App() {
  const [appState, setAppState] = useState("cover");

  useEffect(() => {
    document.body.classList.toggle("app--scrollable", appState === "scroll");
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

      {appState === "scroll" && <ScrollFlow />}
    </>
  );
}
