import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/map")({ component: MapRoute });

const places = [
  { x: 10, y: 70, name: "The Sleepover", tale: "Where it all began — whispers past midnight." },
  { x: 22, y: 42, name: "First Kiss", tale: "The world went quiet, and everything shifted." },
  { x: 36, y: 62, name: "Movie Night", tale: "Half-watched screen, fully-held hand." },
  { x: 50, y: 30, name: "Ice Cream Day", tale: "Sunlight, sweet cones, and your laugh." },
  { x: 62, y: 58, name: "The Park", tale: "Long walks, longer talks, softer us." },
  { x: 74, y: 34, name: "The Chinese Shop", tale: "Our little ritual — you always ordered the same." },
  { x: 86, y: 60, name: "Go Cart", tale: "You won. I let you. (Mostly.)" },
  { x: 94, y: 28, name: "And Now", tale: "Here. Still choosing you, every single day." },
];

function MapRoute() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <PageShell title="Adventure Map" subtitle="Every road we've walked, drawn in ink and firelight.">
      <div className="parchment relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden rounded-lg">
        {/* decorative compass */}
        <div className="absolute right-6 top-6 text-ink/60">
          <svg viewBox="0 0 100 100" className="h-20 w-20">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 8 L55 50 L50 92 L45 50 Z" fill="currentColor" opacity="0.6" />
            <path d="M8 50 L50 55 L92 50 L50 45 Z" fill="currentColor" opacity="0.3" />
            <text x="50" y="6" textAnchor="middle" fontSize="6" fill="currentColor">N</text>
          </svg>
        </div>
        {/* mountains svg */}
        <svg viewBox="0 0 100 60" className="absolute inset-x-0 top-4 h-1/2 w-full text-ink/40" preserveAspectRatio="none">
          <path d="M0 60 L10 30 L18 45 L28 20 L38 40 L48 15 L58 38 L68 22 L78 42 L88 25 L100 45 L100 60 Z" fill="currentColor" opacity="0.3" />
          <path d="M0 60 L12 40 L22 50 L32 35 L44 48 L56 32 L66 46 L76 36 L88 48 L100 40 L100 60 Z" fill="currentColor" opacity="0.5" />
        </svg>

        {/* route path */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            d={`M ${places[0].x} ${places[0].y} ` + places.slice(1).map((p) => `Q ${(p.x + 8)} ${p.y - 8} ${p.x} ${p.y}`).join(" ")}
            fill="none"
            stroke="oklch(0.35 0.09 45)"
            strokeWidth="0.4"
            strokeDasharray="1.5 1"
          />
        </svg>

        {places.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
              className="block h-3 w-3 rounded-full bg-ember shadow-[0_0_12px_oklch(0.68_0.19_45)]"
            />
            {active === i && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 top-4 w-52 -translate-x-1/2 rounded border border-ember/60 bg-parchment-dark/95 p-3 text-center text-ink shadow-lg"
              >
                <p className="font-display text-sm">{p.name}</p>
                <p className="hand-text mt-1 text-base">{p.tale}</p>
              </motion.div>
            )}
          </button>
        ))}
      </div>
      <p className="mt-6 text-center italic text-mithril/70">Tap a marker to remember.</p>
    </PageShell>
  );
}
