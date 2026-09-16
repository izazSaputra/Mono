export function initCursor(cursorElement, textElement) {
  if (!cursorElement) return () => {};
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let activeReveal = null;
  let rafId = 0;
  let disposed = false;
  const speed = 0.12;
  const epsilon = 0.05;

  function wake() {
    if (!disposed && !document.hidden && !rafId) {
      rafId = requestAnimationFrame(animate);
    }
  }

  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    wake();
  };

  const handlePointerOver = (e) => {
    const el =
      e.target instanceof Element
        ? e.target.closest("[data-cursor-reveal]")
        : null;
    if (!el || el === activeReveal) return;
    if (activeReveal) activeReveal.classList.remove("is-revealing");
    activeReveal = el;
    el.classList.add("is-revealing");
    cursorElement.classList.add("is-reveal");
    wake();
  };

  const handlePointerOut = (e) => {
    const el =
      e.target instanceof Element
        ? e.target.closest("[data-cursor-reveal]")
        : null;
    if (!el) return;
    const next =
      e.relatedTarget instanceof Element
        ? e.relatedTarget.closest("[data-cursor-reveal]")
        : null;
    if (next === el) return;
    el.classList.remove("is-revealing");
    if (activeReveal === el) {
      activeReveal = null;
      cursorElement.classList.remove("is-reveal");
    }
  };

  function animate() {
    rafId = 0;
    if (disposed || document.hidden) return;
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    const moving =
      Math.abs(mouseX - currentX) > epsilon ||
      Math.abs(mouseY - currentY) > epsilon;
    if (!moving) {
      currentX = mouseX;
      currentY = mouseY;
    }

    // Read reveal geometry first, and preserve the original cursor positioning.
    const rect = activeReveal?.getBoundingClientRect();
    cursorElement.style.left = `${currentX}px`;
    cursorElement.style.top = `${currentY}px`;
    if (rect) {
      activeReveal.style.setProperty("--rx", `${currentX - rect.left}px`);
      activeReveal.style.setProperty("--ry", `${currentY - rect.top}px`);
    }

    // Reveal targets may themselves animate; keep tracking only in that mode.
    if (moving || activeReveal) wake();
  }

  const refreshReveal = () => {
    if (activeReveal) wake();
  };
  const handleVisibility = () => {
    cancelAnimationFrame(rafId);
    rafId = 0;
    if (!document.hidden) wake();
  };
  const activate = () => cursorElement.classList.add("active");
  const deactivate = () => cursorElement.classList.remove("active");

  document.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("pointerover", handlePointerOver);
  document.addEventListener("pointerout", handlePointerOut);
  document.addEventListener("scroll", refreshReveal, {
    passive: true,
    capture: true,
  });
  window.addEventListener("resize", refreshReveal, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);
  textElement?.addEventListener("mouseenter", activate);
  textElement?.addEventListener("mouseleave", deactivate);
  animate();

  return () => {
    disposed = true;
    cancelAnimationFrame(rafId);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("pointerover", handlePointerOver);
    document.removeEventListener("pointerout", handlePointerOut);
    document.removeEventListener("scroll", refreshReveal, true);
    window.removeEventListener("resize", refreshReveal);
    document.removeEventListener("visibilitychange", handleVisibility);
    textElement?.removeEventListener("mouseenter", activate);
    textElement?.removeEventListener("mouseleave", deactivate);
    activeReveal?.classList.remove("is-revealing");
    cursorElement.classList.remove("is-reveal");
    if (textElement) deactivate();
  };
}
