(() => {
  const root = document.documentElement;
  const finePointer = window.matchMedia("(pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    root.classList.add("has-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
  }

  if (!finePointer.matches || reducedMotion.matches) return;

  let frame;

  window.addEventListener(
    "pointermove",
    ({ clientX, clientY }) => {
      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        root.style.setProperty("--spot-x", `${clientX}px`);
        root.style.setProperty("--spot-y", `${clientY}px`);
      });
    },
    { passive: true }
  );
})();
