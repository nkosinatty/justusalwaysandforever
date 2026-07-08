import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/reasons")({ component: Reasons });

const seeds = [
  "the way you say my name",
  "your laugh, first thing in the morning",
  "how you hum without knowing",
  "the crease between your brows when you read",
  "your kindness to strangers",
  "the small dances in the kitchen",
  "how you hold my hand in your sleep",
  "your bravery on ordinary days",
  "the way you argue with movies",
  "your handwriting on grocery lists",
  "how you make tea like it's a ceremony",
  "your patience with me",
  "the songs you save for me",
  "the way you fold sleeves up",
  "your loyalty, quiet and enormous",
  "how you notice everything",
  "your terrible, perfect puns",
  "your soft heart under your armor",
  "the way you say 'come here'",
  "how you love with your whole life",
];

function reasonFor(day: number) {
  return seeds[day % seeds.length];
}

function Reasons() {
  const today = useMemo(() => {
    const start = new Date(new Date().getFullYear(), 0, 0);
    const diff = Date.now() - start.getTime();
    return Math.floor(diff / 86400000);
  }, []);
  const [n, setN] = useState(today);
  return (
    <PageShell title="365 Reasons I Love You" subtitle="One reason for every dawn — and still not enough.">
      <div className="mx-auto max-w-3xl">
        <motion.div
          key={n}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="parchment rounded-lg p-10 text-center"
        >
          <p className="rune-text text-[10px] text-ember">Reason № {n + 1} / 365</p>
          <p className="mt-6 hand-text text-3xl text-ink">"{reasonFor(n)}"</p>
        </motion.div>
        <div className="mt-6 flex items-center justify-center gap-6 rune-text text-xs text-gold">
          <button onClick={() => setN((v) => (v - 1 + 365) % 365)} className="hover:text-ember">← previous</button>
          <button onClick={() => setN(today)} className="hover:text-ember">✦ today</button>
          <button onClick={() => setN((v) => (v + 1) % 365)} className="hover:text-ember">next →</button>
        </div>

        <div className="mt-14 grid grid-cols-10 gap-1 sm:grid-cols-15 md:grid-cols-25">
          {Array.from({ length: 365 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setN(i)}
              className={`aspect-square rounded-sm transition ${
                i === n ? "bg-gold" : i === today ? "bg-ember/80" : "bg-mithril/10 hover:bg-gold/40"
              }`}
              title={`Day ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
