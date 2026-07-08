import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { motion } from "framer-motion";
import { Starfield } from "@/components/Starfield";

export const Route = createFileRoute("/moon")({ component: MoonChamber });

function MoonChamber() {
  return (
    <PageShell>
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <Starfield density={220} />
          </div>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-8 rounded-full bg-gradient-to-br from-white via-mithril to-mithril/40 shadow-[0_0_120px_60px_oklch(0.9_0.02_240/0.4)]"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="absolute inset-4 rounded-full"
            style={{ background: "radial-gradient(circle at 30% 30%, transparent 40%, oklch(0 0 0 / 0.25) 70%)" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.6 }}
          className="mt-10"
        >
          <p className="rune-text text-[10px] text-mithril">The Hidden Moon Chamber</p>
          <h1 className="mt-4 font-display text-4xl text-moon flicker">You found me.</h1>
          <p className="mx-auto mt-4 max-w-lg italic text-mithril/80">
            "Even the smallest person can change the course of the future." <br />
            You changed mine the moment you smiled.
          </p>
          <p className="mt-8 hand-text text-3xl text-gold">— forever yours, in every language of light.</p>
        </motion.div>
      </div>
    </PageShell>
  );
}
