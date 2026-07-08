import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { BookOpen, Feather, Music2, Map, Sparkles, Heart, Timer, ScrollText, Moon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const doors = [
  { to: "/memories", label: "The Memory Book", desc: "Turn the pages of us", icon: BookOpen },
  { to: "/letters", label: "Handwritten Letters", desc: "Ink from my hand to yours", icon: Feather },
  { to: "/music", label: "The Music Room", desc: "A gramophone in the hall", icon: Music2 },
  { to: "/map", label: "Adventure Map", desc: "Every road we've walked", icon: Map },
  { to: "/constellation", label: "Constellation of Us", desc: "Our stars, named", icon: Sparkles },
  { to: "/reasons", label: "365 Reasons", desc: "One for every dawn", icon: Heart },
  { to: "/countdown", label: "The Countdown", desc: "Until we meet again", icon: Timer },
  { to: "/promise", label: "Promise Scroll", desc: "Vows sealed in wax", icon: ScrollText },
] as const;

function Home() {
  const [moon, setMoon] = useState(0);
  return (
    <PageShell>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6 }}
        className="mb-16 text-center"
      >
        <p className="rune-text text-[11px] text-ember">✦ Welcome home, my love ✦</p>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl text-gold flicker">Just Us</h1>
        <p className="mx-auto mt-4 max-w-xl italic text-mithril/90">
          "Not all those who wander are lost — some are wandering toward you."
        </p>
        <div className="mx-auto mt-6 h-px w-48 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </motion.section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doors.map((d, i) => (
          <motion.div
            key={d.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 * i }}
          >
            <Link
              to={d.to}
              className="group relative block h-full overflow-hidden rounded-lg border border-gold/20 bg-night/50 p-6 backdrop-blur-sm transition hover:border-gold/60 hover:candle-glow"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.68 0.19 45 / 0.15), transparent 70%)" }} />
              <d.icon className="relative mb-3 h-6 w-6 text-gold" />
              <h3 className="relative font-display text-xl text-gold">{d.label}</h3>
              <p className="relative mt-1 text-sm italic text-mithril/70">{d.desc}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Hidden moon Easter egg */}
      <div className="mt-16 flex flex-col items-center gap-2">
        <p className="rune-text text-[10px] text-mithril/40">the sky remembers</p>
        <button
          onClick={() => setMoon((m) => m + 1)}
          aria-label="A hidden moon"
          className="group relative rounded-full p-2 transition hover:candle-glow"
        >
          <Moon className="h-5 w-5 text-mithril/40 transition group-hover:text-moon" />
        </button>
        {moon >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/moon" className="hand-text text-gold hover:text-ember">
              a door opens…
            </Link>
          </motion.div>
        )}
      </div>
    </PageShell>
  );
}
