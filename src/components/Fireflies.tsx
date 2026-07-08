import { useEffect, useRef } from "react";

export function Fireflies({ count = 40 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const flies = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4 * dpr,
      vy: (Math.random() - 0.5) * 0.4 * dpr,
      r: (1 + Math.random() * 2) * dpr,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.03,
    }));

    let t = 0;
    const loop = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const f of flies) {
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 0 || f.x > canvas.width) f.vx *= -1;
        if (f.y < 0 || f.y > canvas.height) f.vy *= -1;
        const glow = 0.4 + 0.6 * Math.abs(Math.sin(t * f.speed + f.phase));
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 8);
        grad.addColorStop(0, `rgba(255, 220, 140, ${glow})`);
        grad.addColorStop(0.4, `rgba(255, 170, 70, ${glow * 0.4})`);
        grad.addColorStop(1, "rgba(255, 170, 70, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255, 245, 210, ${glow})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden
    />
  );
}
