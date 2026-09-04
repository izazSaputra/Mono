import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { words } from "../../constant/index.js";
import { ArrowDown } from "lucide-react";
import { SplitText } from "gsap/SplitText";
import { initCursor } from "../utils/cursor.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);
  const textWrapRef = useRef(null);
  const webRef = useRef(null);
  const webOutlineRef = useRef(null);
  const heroRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const outline = outlineRef.current;
    const textWrap = textWrapRef.current;

    const cleanupCursor = initCursor(cursorRef.current);

    const xTo = gsap.quickTo(outline, "--cx", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(outline, "--cy", {
      duration: 0.4,
      ease: "power3.out",
    });

    const handleMove = (e) => {
      const rect = textWrap.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    const handleLeave = () => {
      xTo(-200);
      yTo(-200);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      cleanupCursor();
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const web = webRef.current;
    const webOutline = webOutlineRef.current;
    const cursor = cursorRef.current;

    if (!web || !webOutline || !cursor) return;

    const targets = [web, webOutline];

    gsap.set(targets, {
      transformOrigin: "50% 90%",
    });

    const scaleXTo = gsap.quickTo(targets, "scaleX", {
      duration: 0.6,
      ease: "power3.out",
    });

    const scaleYTo = gsap.quickTo(targets, "scaleY", {
      duration: 0.6,
      ease: "power3.out",
    });

    const skewTo = gsap.quickTo(targets, "skewX", {
      duration: 0.5,
      ease: "power3.out",
    });

    const xTo = gsap.quickTo(targets, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(targets, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const cursorScaleTo = gsap.quickTo(cursor, "--cursor-scale", {
      duration: 0.35,
      ease: "power3.out",
    });

    const cursorBorderTo = gsap.quickTo(cursor, "borderWidth", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleWebMove = (e) => {
      const rect = web.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const radius = 250;

      const strength = gsap.utils.clamp(0, 1, 1 - distance / radius);

      const normalizedX = gsap.utils.clamp(-1, 1, deltaX / radius);

      const normalizedY = gsap.utils.clamp(-1, 1, deltaY / radius);

      scaleXTo(1 + strength * 0.14);

      scaleYTo(1 - strength * 0.04);

      skewTo(normalizedX * strength * -8);

      xTo(normalizedX * strength * 10);

      yTo(normalizedY * strength * 4);

      cursorScaleTo(1 + strength * 0.65);

      cursorBorderTo(2 - strength);
    };

    const resetWeb = () => {
      scaleXTo(1);
      scaleYTo(1);
      skewTo(0);
      xTo(0);
      yTo(0);
      cursorScaleTo(1);
      cursorBorderTo(2);
    };

    window.addEventListener("mousemove", handleWebMove);
    window.addEventListener("mouseleave", resetWeb);

    return () => {
      window.removeEventListener("mousemove", handleWebMove);
      window.removeEventListener("mouseleave", resetWeb);
    };
  }, []);

  useGSAP(() => {
    const splits = gsap.utils
      .toArray(".words")
      .map((el) => new SplitText(el, { type: "chars" }));

    const allChars = splits.flatMap((split) => split.chars);

    const introTl = gsap.timeline({
      defaults: {
        ease: "expo.out",
      },
    });

    introTl.from(allChars, {
      yPercent: 130,
      duration: 1.4,
      rotate: 4,
      opacity: 0,
      stagger: {
        each: 0.025,
        from: "start",
      },
    });

    introTl.from(
      [".top-sub-left", ".top-sub-right"],
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      },
      "-=0.7",
    );

    introTl.from(
      [".arrow-down"],
      {
        y: -20,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.35",
    );

    const el = document.querySelector(".type-effect");
    if (!el) return;

    const text = "Izaz";
    let typed = 0;

    el.textContent = text;

    el.style.padding = "2px 6px";

    const isMobile = window.innerWidth <= 768;
    gsap.set(el, {
      width: "auto",
      height: isMobile ? "25px" : "35px",
      overflow: "visible",
    });
    const fullWidth = el.offsetWidth;
    const fullHeight = el.offsetHeight;

    el.textContent = "";
    gsap.set(el, {
      width: 0,
      height: fullHeight,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 1,
      paddingBottom: 2,
      overflow: "hidden",
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.to(el, {
      width: fullWidth,
      paddingLeft: 6,
      paddingRight: 6,
      duration: 0.55,
      ease: "expo.out",
    });

    tl.to(
      {},
      {
        duration: 0.08 * text.length,
        onUpdate: function () {
          const count = Math.ceil(this.progress() * text.length);
          if (count !== typed) {
            typed = count;
            el.textContent = text.slice(0, count);
          }
        },
        onComplete: function () {
          el.textContent = text;
          typed = text.length;
        },
      },
    );

    tl.to(el, {
      width: 0,
      paddingLeft: 0,
      paddingRight: 0,
      duration: 0.45,
      ease: "expo.in",
      delay: 1.2,
      onStart: () => {
        typed = 0;
        el.textContent = text;
      },
      onComplete: () => {
        el.textContent = "";
      },
    });
  }, []);

  useGSAP(() => {
    const hero = heroRef.current;
    const arrow = arrowRef.current;
    const textWrap = textWrapRef.current;

    if (!hero || !arrow || !textWrap) return;

    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    exitTl
      .to(
        textWrap,
        {
          scale: 0.78,
          yPercent: -5,
          opacity: 0,
          filter: "blur(14px)",
          ease: "none",
        },
        0,
      )
      .to(
        arrow,
        {
          y: 80,
          opacity: 0,
          ease: "none",
        },
        0,
      );
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />

      <div className="top-sub">
        <h3 className="top-sub-left">
          I'm <span className="type-effect">Izaz</span>
        </h3>
        <h3 className="top-sub-right">
          Building <span className="top-sub-by">interfaces that feel</span>{" "}
          <span className="type-effect-right">alive</span>
        </h3>
      </div>
      <section className="hero" ref={heroRef}>
        <div className="hero-text-wrap" ref={textWrapRef}>
          <h1 className="hero-heading">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  ref={w.text === "WEB" ? webRef : null}
                  className={`words${w.italic ? " italic" : ""}`}
                >
                  {w.text}
                </span>
                {i < words.length - 1 && " "}
              </React.Fragment>
            ))}
          </h1>

          <h1
            ref={outlineRef}
            className="hero-heading hero-heading--outline"
            aria-hidden="true"
          >
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span
                  ref={w.text === "WEB" ? webOutlineRef : null}
                  className={`word${w.italic ? " italic" : ""}`}
                >
                  {w.text}
                </span>
                {i < words.length - 1 && " "}
              </React.Fragment>
            ))}
          </h1>
        </div>
        <div className="arrow-down" ref={arrowRef}>
          <ArrowDown size={50} strokeWidth={1} />
        </div>
      </section>
    </>
  );
};

export default Hero;
