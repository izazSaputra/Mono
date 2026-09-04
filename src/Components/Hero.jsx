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

  const indexRef = useRef(null);
  const indexLineRef = useRef(null);
  const identityDataRef = useRef(null);

  const identityNameRef = useRef(null);
  const identityRoleRef = useRef(null);
  const identityLocalRef = useRef(null);

  const voidFieldRef = useRef(null);

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

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const field = voidFieldRef.current;
    if (!field) return;

    gsap.set(field, {
      "--mx": window.innerWidth / 2,
      "--my": window.innerHeight / 2,
      "--field-alpha": 0.015,
    });
  const xTo = gsap.quickTo(field, "--mx", {
    duration: 0.6,
    ease: "power3.out",
  });

  const yTo = gsap.quickTo(field, "--my", {
    duration: 0.6,
    ease: "power3.out",
  });

  const alphaTo = gsap.quickTo(field, "--field-alpha", {
    duration: 0.8,
    ease: "power2.out",
  });

  let idleTimer;

  const handleMove = (e) => {
    xTo(e.clientX);
    yTo(e.clientY);

    alphaTo(0.055);

    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {
      alphaTo(0.018);
    }, 700);
  };

  window.addEventListener("mousemove", handleMove);

  return () => {
    clearTimeout(idleTimer);
    window.removeEventListener("mousemove", handleMove);
  };

  }, []);

  useGSAP(() => {
    const splits = gsap.utils
      .toArray(textWrapRef.current.querySelectorAll(".words"))
      .map((el) => new SplitText(el, { type: "chars" }));

    const allChars = splits.flatMap((split) => split.chars);

    const addType = (timeline, element, text, duration = 0.45) => {
      if (!element) return;

      element.textContent = "";

      const state = {
        count: 0,
      };

      timeline.to(state, {
        count: text.length,
        duration,
        ease: "none",

        onUpdate: () => {
          const count = Math.round(state.count);
          const typedText = text.slice(0, count);

          element.textContent =
            count < text.length ? `${typedText}_` : typedText;
        },

        onComplete: () => {
          element.textContent = text;
        },
      });
    };

    const introTl = gsap.timeline();

    introTl.from(indexRef.current, {
      y: 8,
      opacity: 0,
      duration: 0.4,
    });

    introTl.from(
      indexLineRef.current,
      {
        scaleX: 0,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.15",
    );

    addType(introTl, identityNameRef.current, "IZAZ SAPUTRA", 0.4);

    addType(introTl, identityRoleRef.current, "CREATIVE DEVELOPER", 0.45);

    addType(introTl, identityLocalRef.current, "MALANG — INDONESIA", 0.45);

    introTl.from(
      allChars,
      {
        yPercent: 130,
        rotate: 4,
        opacity: 0,
        duration: 1.4,

        stagger: {
          each: 0.025,
          from: "start",
        },
      },
      "-=0.1",
    );

    introTl.from(
      arrowRef.current,
      {
        y: -20,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.35",
    );

    return () => {
      splits.forEach((split) => split.revert());
    };
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

      <div className="mono-index">
        <div ref={indexRef} className="mono-index__chapter">
          <span>00</span>
          <span>/</span>
          <span>IDENTITY</span>

          <span ref={indexLineRef} className="mono-index__line" />
        </div>

        <div className="mono-mark">
          <span>MONO</span>
          <span>/ 2026 </span>
        </div>

        <div ref={identityDataRef} className="mono-index__identity">
          <p ref={identityNameRef} className="identity-name"></p>
          <p ref={identityRoleRef} />
          <p ref={identityLocalRef} />
        </div>
      </div>
      <section className="hero" ref={heroRef}>
        <div ref={voidFieldRef} className="void-field" aria-hidden="true" />
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
