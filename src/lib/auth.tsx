import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "justus-auth";
const USER = "justus";
const PASS = "Kissofdeath07.";

type AuthCtx = {
  authed: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  hydrated: boolean;
};

const Ctx = createContext<AuthCtx>({ authed: false, login: () => false, logout: () => {}, hydrated: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setAuthed(localStorage.getItem(KEY) === "1");
    } catch {}
    setHydrated(true);
  }, []);

  return (
    <Ctx.Provider
      value={{
        authed,
        hydrated,
        login: (u, p) => {
          if (u === USER && p === PASS) {
            localStorage.setItem(KEY, "1");
            setAuthed(true);
            return true;
          }
          return false;
        },
        logout: () => {
          localStorage.removeItem(KEY);
          setAuthed(false);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
