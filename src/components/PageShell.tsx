import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PortalNav } from "./PortalNav";
import { Fireflies } from "./Fireflies";
import { Mist } from "./Mist";
import { AmbientAudio } from "./AmbientAudio";
import { useAuth } from "@/lib/auth";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import coupleBg from "@/assets/couple-bg.jpeg.asset.json";

export function PageShell({ children, title, subtitle }: { children: ReactNode; title?: string; subtitle?: string }) {
  const { authed, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !authed) router.navigate({ to: "/login" });
  }, [authed, hydrated, router]);

  if (!hydrated || !authed) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Mist />
      <Fireflies />
      <PortalNav />
      <AmbientAudio />
      <main className="relative z-20 mx-auto max-w-6xl px-4 pb-24 pt-28">
        {title && (
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-10 text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-display text-gold flicker">{title}</h1>
            {subtitle && <p className="mt-3 text-mithril/80 italic">{subtitle}</p>}
            <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.header>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
