import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/memories")({ component: Memories });

const pages = [
  { title: "The First Glance", body: "A room full of people, and somehow only your eyes. I remember it like a painting I keep in my chest." },
  { title: "That Autumn Walk", body: "Leaves the color of firelight, your hand cold, then not — because I held it." },
  { title: "The Song in the Kitchen", body: "You hummed something old while the kettle sang. I have never wanted a morning to last so long." },
  { title: "Rain, Unafraid", body: "We ran anyway. Wet clothes, warm laughter — the sky trying, and failing, to dampen us." },
  { title: "A Quiet Vow", body: "You fell asleep on my shoulder and I promised, silently, to be worth that trust." },
  { title: "The Winter of Small Lights", body: "String bulbs, cheap wine, your face lit gold. I framed it in my mind without a camera." },
];

function Memories() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => Math.min(v + 1, pages.length - 1));
  const prev = () => setI((v) => Math.max(v - 1, 0));
  return (
    <PageShell title="The Memory Book" subtitle="Turn the pages slowly. They are all we have of forever.">
      <div className="relative mx-auto max-w-3xl">
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={i}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="parchment rounded-lg p-10 sm:p-14"
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            >
              <p className="rune-text text-[10px] text-ember">Page {i + 1} of {pages.length}</p>
              <h2 className="mt-3 font-display text-3xl text-ink">{pages[i].title}</h2>
              <div className="my-4 h-px w-24 bg-ink/30" />
              <p className="hand-text text-ink/90">{pages[i].body}</p>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button onClick={prev} disabled={i === 0}
            className="flex items-center gap-2 rune-text text-xs text-gold disabled:text-mithril/30">
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-1">
            {pages.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)}
                className={`h-1.5 w-6 rounded-full transition ${idx === i ? "bg-gold" : "bg-mithril/20"}`} />
            ))}
          </div>
          <button onClick={next} disabled={i === pages.length - 1}
            className="flex items-center gap-2 rune-text text-xs text-gold disabled:text-mithril/30">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </PageShell>
  );
}
