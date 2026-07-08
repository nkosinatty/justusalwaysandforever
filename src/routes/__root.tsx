import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-gold flicker">404</h1>
        <h2 className="mt-4 rune-text text-sm text-mithril">The path is lost in mist</h2>
        <p className="mt-2 text-sm text-muted-foreground italic">Even Elrond's maps end somewhere.</p>
        <Link to="/" className="mt-6 inline-block rune-text text-xs text-gold hover:text-ember">
          ✦ Return to the hearth ✦
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-gold">A candle went out</h1>
        <p className="mt-2 text-sm text-muted-foreground italic">Let us relight it.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rune-text text-xs text-gold hover:text-ember"
        >
          ✦ Rekindle ✦
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Just Us — A Private Portal" },
      { name: "description", content: "A candlelit haven of memory, music, and promise. For only two hearts." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Just Us — A Private Portal" },
      { property: "og:description", content: "A candlelit haven of memory, music, and promise. For only two hearts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Just Us — A Private Portal" },
      { name: "twitter:description", content: "A candlelit haven of memory, music, and promise. For only two hearts." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70c5235e-b65a-44f4-bb64-f2c30e4935a6/id-preview-8e14ab1f--1cb37935-3a7a-4a30-9b95-b90472841c5c.lovable.app-1783516701074.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70c5235e-b65a-44f4-bb64-f2c30e4935a6/id-preview-8e14ab1f--1cb37935-3a7a-4a30-9b95-b90472841c5c.lovable.app-1783516701074.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Tangerine:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}
