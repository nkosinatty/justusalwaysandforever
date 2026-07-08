import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export const Route = createFileRoute("/music")({ component: MusicRoom });

const tracks = [
  { title: "Love The Way You Lie — Eminem ft. Rihanna", src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e2c0e5.mp3?filename=medieval-fantasy-background-music-11907.mp3" },
  { title: "Tatiana Manaois", src: "https://cdn.pixabay.com/download/audio/2022/08/23/audio_d0c6ff1bab.mp3?filename=fantasy-116376.mp3" },
  { title: "You Mean To Tell Me", src: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc7f4c8.mp3?filename=medieval-castle-124049.mp3" },
];

function MusicRoom() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  const play = (idx: number) => {
    setI(idx);
    setTimeout(() => {
      if (!audio.current) return;
      audio.current.src = tracks[idx].src;
      audio.current.play().then(() => setPlaying(true)).catch(() => {});
    }, 50);
  };
  const toggle = () => {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); setPlaying(false); }
    else { audio.current.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <PageShell title="The Music Room" subtitle="A brass gramophone hums in the corner. Choose a song for us.">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
        {/* Gramophone */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <motion.div
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-black shadow-2xl candle-glow"
            >
              <div className="absolute inset-6 rounded-full border border-gold/20" />
              <div className="absolute inset-12 rounded-full border border-gold/10" />
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-ember to-ember/60 shadow-inner" />
              <div className="absolute h-3 w-3 rounded-full bg-gold" />
            </motion.div>
            {/* Horn */}
            <div className="absolute -right-16 top-4 h-20 w-40 rounded-tr-full rounded-br-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 shadow-xl"
              style={{ clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 70%)" }} />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="rune-text text-[11px] text-ember">Now playing</p>
          <h2 className="mt-2 font-display text-4xl text-gold flicker">{tracks[i].title}</h2>

          <div className="mt-8 space-y-2">
            {tracks.map((t, idx) => (
              <button
                key={t.title}
                onClick={() => play(idx)}
                className={`flex w-full items-center justify-between rounded border px-4 py-3 text-left transition ${
                  idx === i
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-mithril/20 text-mithril hover:border-gold/40 hover:text-gold"
                }`}
              >
                <span className="font-display">{t.title}</span>
                <Play size={14} />
              </button>
            ))}
          </div>

          <button onClick={toggle}
            className="mt-8 inline-flex items-center gap-3 self-start rounded-full border border-gold/50 bg-night/60 px-6 py-3 rune-text text-xs text-gold hover:candle-glow">
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? "Pause the strings" : "Wake the strings"}
          </button>

          <audio ref={audio} preload="none" loop />
        </div>
      </div>
    </PageShell>
  );
}
