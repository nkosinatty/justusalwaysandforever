import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/promise")({ component: PromisePage });

const vows = [
  "To be your quiet in loud rooms.",
  "To choose you again on the difficult days.",
  "To keep the small joys — tea, songs, the good blanket.",
  "To tell you the truth, gently.",
  "To grow old on the same porch, arguing about the weather.",
  "To love the whole of you, not just the easy parts.",
];

function PromisePage() {
  const [signed, setSigned] = useState(false);
  return (
    <PageShell title="The Promise Scroll" subtitle="Sealed in wax. Kept in blood, breath, and daylight.">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scaleY: 0.3 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.2 }}
          style={{ transformOrigin: "top" }}
          className="parchment relative rounded-lg p-10 sm:p-16"
        >
          <h2 className="text-center font-display text-3xl text-ink">A Promise, Written Twice</h2>
          <div className="mx-auto my-4 h-px w-32 bg-ink/40" />
          <ul className="mt-6 space-y-4">
            {vows.map((v, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="hand-text text-2xl text-ink/90"
              >
                ✦ {v}
              </motion.li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-ember/60 bg-gradient-to-b from-ember to-ember/60 font-display text-xl text-parchment shadow-inner">
              U & I
            </div>
            {!signed ? (
              <button onClick={() => setSigned(true)}
                className="rune-text rounded border border-ember/60 bg-parchment/60 px-6 py-2 text-xs text-ink hover:bg-parchment">
                Press the seal
              </button>
            ) : (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="hand-text text-2xl text-ember"
              >
                sealed — forever and a day
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
