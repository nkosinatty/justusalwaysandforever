import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/letters")({ component: Letters });

const letters = [
  {
    seal: "I",
    date: "By candlelight",
    body: `My dearest,

If this letter reaches you, it means the wind was kind. I write not because I have news, but because I have you — and that is news enough to fill any page.

Today I thought of the way you laugh with your whole body, the way silence feels safe beside you. In a world that hurries, you are my slow morning.

Yours, always and again,
—`,
  },
  {
    seal: "II",
    date: "The hour of stars",
    body: `Beloved,

I have been reading old poems and none of them are as good as looking at you. That is not flattery, it is arithmetic.

If ever you doubt, put your hand on your chest and feel the drum of it — that is me, keeping time from wherever I am.

Faithfully,
—`,
  },
  {
    seal: "III",
    date: "First frost",
    body: `My love,

There is a small fire in the grate and I am thinking of every winter yet to come. I want to spend them all under the same blanket as you, arguing gently about the temperature of the room.

Tell me you'll grow old with me clumsily, sweetly, without hurry.

Ever thine,
—`,
  },
];

const DAY = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "justus.letters.opened";

type OpenedMap = Record<number, number>; // index -> timestamp opened

function loadOpened(): OpenedMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function Letters() {
  const [open, setOpen] = useState<number | null>(null);
  const [opened, setOpened] = useState<OpenedMap>({});
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    setOpened(loadOpened());
    const id = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const isVanished = (i: number) => {
    const t = opened[i];
    return t !== undefined && now - t >= DAY;
  };

  // active (opened but not vanished)
  const activeIndex = Object.entries(opened)
    .map(([k, v]) => [Number(k), v] as [number, number])
    .find(([, v]) => now - v < DAY)?.[0];

  const canOpenToday = activeIndex === undefined;

  const handleOpen = (i: number) => {
    if (isVanished(i)) return;
    if (opened[i] !== undefined) {
      setOpen(i);
      return;
    }
    if (!canOpenToday) return;
    const next = { ...opened, [i]: Date.now() };
    setOpened(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setOpen(i);
  };

  const timeLeft = (i: number) => {
    const t = opened[i];
    if (t === undefined) return null;
    const ms = DAY - (now - t);
    if (ms <= 0) return null;
    const h = Math.floor(ms / (60 * 60 * 1000));
    const m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${h}h ${m}m`;
  };

  return (
    <PageShell title="Handwritten Letters" subtitle="Only one seal may be broken each day. It fades after a single turn of the sun.">
      <div className="grid gap-6 sm:grid-cols-3">
        {letters.map((l, i) => {
          if (isVanished(i)) {
            return (
              <div key={i} className="relative aspect-[3/4] rounded-lg border border-dashed border-ink/20 p-6 text-center opacity-40">
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="rune-text text-[10px] text-ink/60">Letter {l.seal}</p>
                  <p className="hand-text mt-2 text-ink/60">turned to ash</p>
                </div>
              </div>
            );
          }
          const alreadyOpened = opened[i] !== undefined;
          const locked = !alreadyOpened && !canOpenToday;
          return (
            <motion.button
              key={i}
              whileHover={locked ? undefined : { y: -4 }}
              onClick={() => handleOpen(i)}
              disabled={locked}
              className={`parchment relative aspect-[3/4] overflow-hidden rounded-lg p-6 text-left ${locked ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20"
                style={{ background: "radial-gradient(circle at 50% 55%, oklch(0.55 0.22 27), transparent 40%)" }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-ember/60 bg-gradient-to-b from-ember to-ember/50 font-display text-3xl text-parchment shadow-inner">
                  {l.seal}
                </div>
              </div>
              <div className="absolute inset-x-6 bottom-4 text-center">
                <p className="rune-text text-[10px] text-ink/70">{l.date}</p>
                <p className="mt-1 hand-text text-ink">
                  {alreadyOpened ? `fades in ${timeLeft(i)}` : locked ? "sealed until tomorrow" : "open me"}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open !== null && !isVanished(open) && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -3, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
              className="parchment max-h-[85vh] w-full max-w-2xl overflow-auto rounded-lg p-10"
            >
              <p className="rune-text text-[10px] text-ember">
                Letter {letters[open].seal} — {letters[open].date} · fades in {timeLeft(open)}
              </p>
              <pre className="mt-4 whitespace-pre-wrap font-body text-lg leading-relaxed text-ink">
                {letters[open].body}
              </pre>
              <button onClick={() => setOpen(null)} className="mt-6 rune-text text-xs text-ember hover:text-ink">✦ Close ✦</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
