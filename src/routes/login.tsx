import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Fireflies } from "@/components/Fireflies";
import { Mist } from "@/components/Mist";
import coupleBg from "@/assets/couple-bg.jpeg.asset.json";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, authed, hydrated } = useAuth();
  const router = useRouter();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    if (hydrated && authed) router.navigate({ to: "/" });
  }, [authed, hydrated, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(u.trim(), p)) {
      router.navigate({ to: "/" });
    } else {
      setErr(true);
      setShake((s) => s + 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coupleBg.url})` }}
        aria-hidden
      />
      <div className="fixed inset-0 z-0 bg-night/75" aria-hidden />
      <Mist />
      <Fireflies count={25} />
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4">
        <motion.div
          key={shake}
          initial={{ x: 0 }}
          animate={err ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="parchment relative rounded-lg p-10"
          >
            <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rune-text text-xs text-ember flicker">
              ✦ Speak, friend ✦
            </div>
            <h1 className="text-center font-display text-4xl text-ink">WHAT ARE WE</h1>
            <p className="mt-2 text-center text-sm italic text-ink/70">
              They say love found&nbsp; us but it was&nbsp;
            </p>
            <div className="mx-auto my-6 h-px w-32 bg-gradient-to-r from-transparent via-ink/40 to-transparent" />

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="rune-text mb-1 block text-[10px] text-ink/70">USERNAME</label>
                <input
                  autoFocus
                  value={u}
                  onChange={(e) => { setU(e.target.value); setErr(false); }}
                  className="w-full rounded border border-ink/30 bg-parchment/60 px-3 py-2 font-body text-ink outline-none focus:border-ember focus:ring-2 focus:ring-ember/40"
                />
              </div>
              <div>
                <label className="rune-text mb-1 block text-[10px] text-ink/70">PASSWORD&nbsp;</label>
                <input
                  type="password"
                  value={p}
                  onChange={(e) => { setP(e.target.value); setErr(false); }}
                  className="w-full rounded border border-ink/30 bg-parchment/60 px-3 py-2 font-body text-ink outline-none focus:border-ember focus:ring-2 focus:ring-ember/40"
                />
              </div>
              {err && (
                <p className="text-center text-sm italic text-destructive">
                  The gate remains shut. Try again, dear traveler.
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded border border-ember/60 bg-gradient-to-b from-ember/80 to-ember/60 py-2 rune-text text-xs text-parchment shadow-lg transition hover:candle-glow"
              >
                Enter
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] italic text-ink/50">
              Hint whispered by the wind: <span className="hand-text">mellon</span>
            </p>
          </motion.div>
          <p className="mt-4 text-center text-[10px] text-mithril/50">
            <Link to="/" className="hover:text-gold">✦</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
