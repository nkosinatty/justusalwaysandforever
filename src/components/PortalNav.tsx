import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Hearth" },
  { to: "/memories", label: "Memories" },
  { to: "/letters", label: "Letters" },
  { to: "/music", label: "Music" },
  { to: "/map", label: "Map" },
  { to: "/constellation", label: "Stars" },
  { to: "/countdown", label: "Countdown" },
] as const;

export function PortalNav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed inset-x-0 top-0 z-30 border-b border-gold/20 bg-night/60 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="rune-text text-gold text-sm sm:text-base flicker">
          ✦ Just Us ✦
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rune-text text-[10px] px-3 py-1 text-mithril hover:text-gold transition-colors"
              activeProps={{ className: "rune-text text-[10px] px-3 py-1 text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

