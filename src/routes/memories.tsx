import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ImagePlus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/memories")({ component: Memories });

type Page = { title: string; body: string; image?: string };

const defaultPages: Page[] = [
  { title: "The First Glance", body: "A room full of people, and somehow only your eyes. I remember it like a painting I keep in my chest." },
  { title: "That Autumn Walk", body: "Leaves the color of firelight, your hand cold, then not — because I held it." },
  { title: "The Song in the Kitchen", body: "You hummed something old while the kettle sang. I have never wanted a morning to last so long." },
  { title: "Rain, Unafraid", body: "We ran anyway. Wet clothes, warm laughter — the sky trying, and failing, to dampen us." },
  { title: "A Quiet Vow", body: "You fell asleep on my shoulder and I promised, silently, to be worth that trust." },
  { title: "The Winter of Small Lights", body: "String bulbs, cheap wine, your face lit gold. I framed it in my mind without a camera." },
];

const STORAGE_KEY = "justus.memories.pages";

function loadPages(): Page[] {
  if (typeof window === "undefined") return defaultPages;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPages;
    const parsed = JSON.parse(raw) as Page[];
    return Array.isArray(parsed) && parsed.length ? parsed : defaultPages;
  } catch {
    return defaultPages;
  }
}

function Memories() {
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [i, setI] = useState(0);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPages(loadPages());
  }, []);

  const save = (next: Page[]) => {
    setPages(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const next = () => setI((v) => Math.min(v + 1, pages.length - 1));
  const prev = () => setI((v) => Math.max(v - 1, 0));

  const handleFile = (f: File | null) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(f);
  };

  const addPage = () => {
    if (!title.trim() && !body.trim() && !image) return;
    const p: Page = { title: title.trim() || "Untitled", body: body.trim(), image };
    const nextPages = [...pages, p];
    save(nextPages);
    setI(nextPages.length - 1);
    setTitle(""); setBody(""); setImage(undefined); setAdding(false);
  };

  const removeCurrent = () => {
    if (pages.length <= 1) return;
    const nextPages = pages.filter((_, idx) => idx !== i);
    save(nextPages);
    setI(Math.max(0, i - 1));
  };

  return (
    <PageShell title="The Memory Book" subtitle="Turn the pages slowly. They are all we have of forever.">
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 rounded border border-gold/40 bg-parchment/10 px-3 py-1.5 rune-text text-[11px] text-gold hover:bg-gold/10"
          >
            <ImagePlus size={14} /> Add Memory
          </button>
          <button
            onClick={removeCurrent}
            disabled={pages.length <= 1}
            className="flex items-center gap-2 rounded border border-ember/30 bg-parchment/10 px-3 py-1.5 rune-text text-[11px] text-ember hover:bg-ember/10 disabled:opacity-30"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>

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
              <h2 className="mt-3 font-display text-3xl text-ink">{pages[i]?.title}</h2>
              <div className="my-4 h-px w-24 bg-ink/30" />
              {pages[i]?.image && (
                <img
                  src={pages[i].image}
                  alt={pages[i].title}
                  className="mb-4 max-h-[70vh] w-full rounded border border-ink/20 object-contain shadow-lg bg-night/20"
                />
              )}
              <p className="hand-text text-ink/90 whitespace-pre-wrap">{pages[i]?.body}</p>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button onClick={prev} disabled={i === 0}
            className="flex items-center gap-2 rune-text text-xs text-gold disabled:text-mithril/30">
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex flex-wrap justify-center gap-1">
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

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setAdding(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="parchment w-full max-w-lg rounded-lg p-8"
            >
              <h3 className="font-display text-2xl text-ink">A New Memory</h3>
              <div className="mt-4 space-y-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full rounded border border-ink/30 bg-parchment/60 px-3 py-2 font-body text-ink outline-none focus:border-ember"
                />
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write the memory..."
                  rows={4}
                  className="w-full rounded border border-ink/30 bg-parchment/60 px-3 py-2 font-body text-ink outline-none focus:border-ember"
                />
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-ink/40 px-3 py-4 rune-text text-xs text-ink hover:border-ember hover:text-ember"
                >
                  <ImagePlus size={16} /> {image ? "Change image" : "Attach image"}
                </button>
                {image && (
                  <img src={image} alt="preview" className="max-h-48 w-full rounded object-cover" />
                )}
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button onClick={() => setAdding(false)} className="rune-text text-xs text-ink/60 hover:text-ink">Cancel</button>
                <button onClick={addPage} className="rounded bg-ember px-4 py-2 rune-text text-xs text-parchment hover:opacity-90">Add to Book</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
