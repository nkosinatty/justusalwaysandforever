export function Mist() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="drift absolute -inset-x-40 top-0 h-[60vh] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(180,200,220,0.25), transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(200,180,150,0.2), transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <div className="drift absolute -inset-x-40 bottom-0 h-[60vh] opacity-50"
        style={{
          animationDirection: "alternate-reverse",
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(150,170,200,0.25), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(220,200,170,0.2), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
