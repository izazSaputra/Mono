import gsap from "gsap";

// Keep the visual settings in one place; mouse events only request one frame.
export function initHeroPointer({
  hero,
  outline,
  textWrap,
  web,
  webOutline,
  cursor,
  field,
}) {
  if (
    !hero ||
    !outline ||
    !textWrap ||
    !web ||
    !webOutline ||
    !cursor ||
    !field
  ) {
    return () => {};
  }
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  let frame = 0;
  let idleTimer = 0;
  let intersecting = false;
  let active = false;
  let hasPointer = false;
  let disposed = false;
  let mouseX = 0;
  let mouseY = 0;
  const targets = [web, webOutline];
  const heroTweens = [];
  let suspendedTweens = [];
  let outlineX, outlineY, scaleX, scaleY, skew, webX, webY;
  let cursorScale, cursorBorders, fieldX, fieldY, fieldAlpha;

  const context = gsap.context(() => {
    const quick = (
      target,
      property,
      duration,
      ease = "power3.out",
      isHero = true,
    ) => {
      const update = gsap.quickTo(target, property, { duration, ease });
      if (isHero) heroTweens.push(update.tween);
      return update;
    };

    gsap.set(targets, { transformOrigin: "50% 90%" });
    gsap.set(field, {
      "--mx": window.innerWidth / 2,
      "--my": window.innerHeight / 2,
      "--field-alpha": 0.015,
    });
    outlineX = quick(outline, "--cx", 0.4);
    outlineY = quick(outline, "--cy", 0.4);
    scaleX = quick(targets, "scaleX", 0.6);
    scaleY = quick(targets, "scaleY", 0.6);
    skew = quick(targets, "skewX", 0.5);
    webX = quick(targets, "x", 0.6);
    webY = quick(targets, "y", 0.6);
    cursorScale = quick(cursor, "--cursor-scale", 0.35, "power3.out", false);
    cursorBorders = [
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
    ].map((property) => quick(cursor, property, 0.35, "power3.out", false));
    fieldX = quick(field, "--mx", 0.6);
    fieldY = quick(field, "--my", 0.6);
    fieldAlpha = quick(field, "--field-alpha", 0.8, "power2.out");
  }, hero);

  const resetCursor = () => {
    cursorScale(1);
    cursorBorders.forEach((update) => update(2));
  };

  function renderPointer() {
    frame = 0;
    if (!active || !hasPointer || disposed) return;

    // Read both bounds before updating any animation targets.
    const textRect = textWrap.getBoundingClientRect();
    const webRect = web.getBoundingClientRect();
    const dx = mouseX - (webRect.left + webRect.width / 2);
    const dy = mouseY - (webRect.top + webRect.height / 2);
    const radius = 250;
    const strength = gsap.utils.clamp(0, 1, 1 - Math.hypot(dx, dy) / radius);
    const nx = gsap.utils.clamp(-1, 1, dx / radius);
    const ny = gsap.utils.clamp(-1, 1, dy / radius);

    outlineX(mouseX - textRect.left);
    outlineY(mouseY - textRect.top);
    scaleX(1 + strength * 0.14);
    scaleY(1 - strength * 0.04);
    skew(nx * strength * -8);
    webX(nx * strength * 10);
    webY(ny * strength * 4);
    cursorScale(1 + strength * 0.65);
    cursorBorders.forEach((update) => update(2 - strength));
    fieldX(mouseX);
    fieldY(mouseY);
    fieldAlpha(0.055);

    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      idleTimer = 0;
      if (active && !disposed) fieldAlpha(0.012);
    }, 700);
  }

  function schedule() {
    if (active && hasPointer && !frame && !disposed) {
      frame = requestAnimationFrame(renderPointer);
    }
  }

  function handleMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    hasPointer = true;
    schedule();
  }

  function handleLeave() {
    hasPointer = false;
    cancelAnimationFrame(frame);
    frame = 0;
    clearTimeout(idleTimer);
    idleTimer = 0;
    outlineX(-200);
    outlineY(-200);
    scaleX(1);
    scaleY(1);
    skew(0);
    webX(0);
    webY(0);
    fieldAlpha(0.012);
    resetCursor();
  }

  function syncActivity() {
    if (disposed) return;
    const nextActive = intersecting && !document.hidden;
    if (nextActive === active) return;
    active = nextActive;
    if (active) {
      window.addEventListener("mousemove", handleMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", handleLeave);
      suspendedTweens.forEach((tween) => tween.resume());
      suspendedTweens = [];
      schedule();
    } else {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(idleTimer);
      idleTimer = 0;
      suspendedTweens = heroTweens.filter((tween) => tween.isActive());
      suspendedTweens.forEach((tween) => tween.pause());
      resetCursor();
    }
  }

  // Observing the pinned element keeps the effects active while Hero is pinned.
  const observer = new IntersectionObserver(([entry]) => {
    intersecting = entry.isIntersecting;
    syncActivity();
  });
  observer.observe(hero);
  document.addEventListener("visibilitychange", syncActivity);

  return () => {
    disposed = true;
    observer.disconnect();
    document.removeEventListener("visibilitychange", syncActivity);
    window.removeEventListener("mousemove", handleMove);
    document.documentElement.removeEventListener("mouseleave", handleLeave);
    cancelAnimationFrame(frame);
    clearTimeout(idleTimer);
    context.revert();
  };
}
