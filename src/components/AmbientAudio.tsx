import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Soft public-domain orchestral ambience (Kevin MacLeod, CC-BY) served from archive
const SRC = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e2c0e5.mp3?filename=medieval-fantasy-background-music-11907.mp3";

export function AmbientAudio() {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.volume = 0.25;
    ref.current.loop = true;
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (on) { ref.current.pause(); setOn(false); }
    else { ref.current.play().catch(() => {}); setOn(true); }
  };

  return (
    <>
      <audio ref={ref} src={SRC} preload="none" />
      <button
        onClick={toggle}
        aria-label={on ? "Silence the strings" : "Awaken the strings"}
        className="fixed bottom-6 right-6 z-40 rounded-full border border-gold/40 bg-night/70 p-3 text-gold backdrop-blur-md transition hover:bg-night hover:candle-glow"
      >
        {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  );
}
