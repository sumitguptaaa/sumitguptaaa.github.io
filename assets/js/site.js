(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  root.classList.add("js");

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }

  const header = document.querySelector(".site-header");
  if (!header) return;

  let frame = 0;
  const updateHeader = () => {
    header.classList.toggle("is-condensed", window.scrollY > 28);
    frame = 0;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (frame) return;
      frame = requestAnimationFrame(updateHeader);
    },
    { passive: true }
  );
})();
