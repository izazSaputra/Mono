export function initCursor(cursorElement, textElement) {
  let mouseX = 0;
  let mouseY = 0;

  let currentX = 0;
  let currentY = 0;

  const speed = 0.1;

  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.addEventListener("mousemove", handleMouseMove);

  function animate() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    if (cursorElement) {
      cursorElement.style.left = currentX + "px";
      cursorElement.style.top = currentY + "px";
    }

    requestAnimationFrame(animate);
  }

  animate();

  if (textElement && cursorElement) {
    textElement.addEventListener("mouseenter", () => {
      cursorElement.classList.add("active");
    });

    textElement.addEventListener("mouseleave", () => {
      cursorElement.classList.remove("active");
    });
  }

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
}