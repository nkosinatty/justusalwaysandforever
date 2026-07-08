import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/countdown")({ component: Countdown });

// Default target: 30 days from now, editable via localStorage
const KEY = "justus-target";

function Countdown() {
  const [target, setTarget] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(KEY) || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 16);
  });
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (target) localStorage.setItem(KEY, target);
  }, [target]);

  const t = new Date(target).getTime() - now;
  const clamp = Math.max(t, 0);
  const days = Math.floor(clamp / 86400000);
  const hours = Math.floor((clamp % 86400000) / 3600000);
  const minutes = Math.floor((clamp % 3600000) / 60000);
  const seconds = Math.floor((clamp % 60000) / 1000);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <PageShell title="Until We Meet Again" subtitle="Time is a long road; you make it worth walking.">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {units.map((u) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="parchment rounded-lg p-6 text-center"
            >
              <motion.div
                key={u.value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-5xl text-ink"
              >
                {String(u.value).padStart(2, "0")}
              </motion.div>
              <div className="mt-2 rune-text text-[10px] text-ember">{u.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-gold/20 bg-night/60 p-6 text-center backdrop-blur">
          <label className="rune-text text-[10px] text-mithril">Set the hour we meet</label>
          <input
            type="datetime-local"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="mt-3 rounded border border-gold/40 bg-night/70 px-4 py-2 text-gold outline-none"
          />
        </div>
      </div>
    </PageShell>
  );
}
