import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { words } from "../../constant/index.js";
import { ArrowDown } from "lucide-react";
import { SplitText } from "gsap/SplitText";
import { initCursor } from "../utils/cursor.js";
import { initHeroPointer } from "../utils/heroPointer.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = ({ setActiveSection }) => {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);
  const textWrapRef = useRef(null);
  const webRef = useRef(null);
  const webOutlineRef = useRef(null);
  const heroRef = useRef(null);
  const arrowRef = useRef(null);

  const identityDataRef = useRef(null);

  const identityNameRef = useRef(null);
  const identityRoleRef = useRef(null);
  const identityLocalRef = useRef(null);

  const voidFieldRef = useRef(null);

  useEffect(() => {
    const cleanupCursor = initCursor(cursorRef.current);
    const cleanupPointer = initHeroPointer({
      hero: heroRef.current,
      outline: outlineRef.current,
      textWrap: textWrapRef.current,
      web: webRef.current,
      webOutline: webOutlineRef.current,
      cursor: cursorRef.current,
      field: voidFieldRef.current,
    });

    return () => {
      cleanupPointer();
      cleanupCursor();
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

        onEnter: () => {
          setActiveSection({
            number: "00",
            label: "IDENTITY",
          });
        },

        onEnterBack: () => {
          setActiveSection({
            number: "00",
            label: "IDENTITY",
          });
        },
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
