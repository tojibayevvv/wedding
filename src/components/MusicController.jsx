import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import "./MusicController.css";

const MUSIC_SRC = "/media/choliqushi.mp3";

export default function MusicController() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);

  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  };

  const startMusic = async () => {
    if (typeof window === "undefined") return;

    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.src = MUSIC_SRC;
      audio.load();
      audio.volume = 0.45;
      audio.loop = true;
      await audio.play();
      setHasStarted(true);
      setIsEnabled(true);
    } catch (error) {
      console.error("Could not start music", error);
      setHasStarted(true);
      setIsEnabled(false);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasStarted) {
        startMusic();
      }
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasStarted]);

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasStarted) {
      await startMusic();
      return;
    }

    if (isEnabled) {
      audio.pause();
      setIsEnabled(false);
    } else {
      try {
        audio.volume = 0.45;
        audio.loop = true;
        await audio.play();
        setIsEnabled(true);
      } catch (error) {
        console.error("Could not resume music", error);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" />
      <button
        type="button"
        className={`music-toggle ${isEnabled ? "music-toggle--on" : ""}`}
        onClick={handleToggle}
        aria-label={isEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
      >
        {isEnabled ? <Volume2 size={18} strokeWidth={1.6} /> : <VolumeX size={18} strokeWidth={1.6} />}
        <span>{isEnabled ? "Musiqa yoqilgan" : "Musiqa o'chirilgan"}</span>
      </button>
    </>
  );
}
