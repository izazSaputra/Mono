export function initCursor(cursorElement, textElement) {
  if (!cursorElement) return () => {};
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let activeReveal = null;
  let rafId = 0;
  const speed = 0.12;

  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const handlePointerOver = (e) => {
    const el = e.target.closest("[data-cursor-reveal]");
    if (!el || el === activeReveal) return;

    if (activeReveal) activeReveal.classList.remove("is-revealing");

    activeReveal = el;
    el.classList.add("is-revealing");
    cursorElement.classList.add("is-reveal");
  };

  const handlePointerOut = (e) => {
    const el = e.target.closest("[data-cursor-reveal]");
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
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    cursorElement.style.left = `${currentX}px`;
    cursorElement.style.top = `${currentY}px`;

    if (activeReveal) {
      const rect = activeReveal.getBoundingClientRect();
      activeReveal.style.setProperty("--rx", `${currentX - rect.left}px`);
      activeReveal.style.setProperty("--ry", `${currentY - rect.top}px`);
    }

    rafId = requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("pointerover", handlePointerOver);
  document.addEventListener("pointerout", handlePointerOut);

  if (textElement) {
    textElement.addEventListener("mouseenter", () => {
      cursorElement.classList.add("active");
    });

    textElement.addEventListener("mouseleave", () => {
      cursorElement.classList.remove("active");
    });
  }

  animate();

  return () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("pointerover", handlePointerOver);
    document.removeEventListener("pointerout", handlePointerOut);
  };
}
