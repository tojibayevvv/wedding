import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { weddingContent } from "../content/weddingContent";
import "./IntroSequence.css";

const CROSSFADE_MS = 650;
const HOLD_MS = 550;
const VIDEO_END_HOLD_MS = 1500;

export default function IntroSequence({ active, onComplete }) {
  const videoRef = useRef(null);
  const [faded, setFaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [canUnmute, setCanUnmute] = useState(false);
  const timers = useRef([]);

  const finish = () => {
    setFaded(true);
    const t1 = setTimeout(() => {
      onComplete();
    }, CROSSFADE_MS + HOLD_MS + VIDEO_END_HOLD_MS);
    timers.current.push(t1);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!active || !video || faded) return;

    // Tie playback to the tap-triggered phase change; muted autoplay is
    // permitted everywhere, and we surface an unmute control once
    // playback has actually started. Set the property imperatively too —
    // some browsers ignore the JSX `muted` attribute for autoplay checks.
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.then(() => setCanUnmute(true)).catch(() => {
        // Autoplay was blocked outright — skip forward rather than
        // leaving guests staring at a frozen screen.
        finish();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <motion.div
      className="intro-sequence"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
    >
      <img
        src={weddingContent.media.lastFrame}
        alt=""
        className="intro-sequence__frame"
      />
      <video
        ref={videoRef}
        className="intro-sequence__video"
        style={{ opacity: faded ? 0 : 1 }}
        src={weddingContent.media.video}
        muted={muted}
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      />

      {canUnmute && !faded && (
        <button
          type="button"
          className="intro-sequence__mute"
          onClick={handleToggleMute}
          aria-label={muted ? "Ovozni yoqish" : "Ovozni o'chirish"}
        >
          {muted ? (
            <VolumeX size={18} strokeWidth={1.5} />
          ) : (
            <Volume2 size={18} strokeWidth={1.5} />
          )}
        </button>
      )}
    </motion.div>
  );
}
