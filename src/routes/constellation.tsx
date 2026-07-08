import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Starfield } from "@/components/Starfield";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/constellation")({ component: Constellation });

// Named star nodes forming a heart-ish constellation
const stars = [
  { x: 25, y: 45, name: "The night we met" },
  { x: 30, y: 30, name: "Our first laugh" },
  { x: 40, y: 20, name: "The bridge" },
  { x: 50, y: 25, name: "The first 'I love you'" },
  { x: 60, y: 20, name: "That road trip" },
  { x: 70, y: 30, name: "The rainy kitchen" },
  { x: 75, y: 45, name: "Our home" },
  { x: 65, y: 60, name: "A quiet promise" },
  { x: 50, y: 72, name: "The heart of it" },
  { x: 35, y: 60, name: "Everything after" },
];

function Constellation() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <PageShell title="Constellation of Us" subtitle="I named every star after a moment we made.">
      <div className="relative mx-auto aspect-square max-w-3xl overflow-hidden rounded-full border border-gold/20"
        style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.14 0.05 265), oklch(0.06 0.02 265))" }}>
        <Starfield density={140} />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {stars.slice(0, -1).map((s, i) => {
            const n = stars[i + 1];
            return (
              <motion.line
                key={i}
                x1={s.x} y1={s.y} x2={n.x} y2={n.y}
                stroke="oklch(0.78 0.14 82 / 0.5)"
                strokeWidth="0.15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.15 }}
              />
            );
          })}
          <motion.line
            x1={stars[stars.length - 1].x} y1={stars[stars.length - 1].y}
            x2={stars[0].x} y2={stars[0].y}
            stroke="oklch(0.78 0.14 82 / 0.5)" strokeWidth="0.15"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: stars.length * 0.15 }}
          />
        </svg>
        {stars.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
              className="block h-2 w-2 rounded-full bg-moon shadow-[0_0_10px_white]"
            />
            {active === i && (
              <motion.div
                initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 top-3 w-44 -translate-x-1/2 rounded border border-gold/40 bg-night/90 p-2 text-center text-xs text-gold shadow-lg"
              >
                {s.name}
              </motion.div>
            )}
          </button>
        ))}
      </div>
      <p className="mt-8 text-center italic text-mithril/70">Trace the lines — that's the shape of us.</p>
    </PageShell>
  );
}
