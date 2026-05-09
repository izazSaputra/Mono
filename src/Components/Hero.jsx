import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { words } from "../../constant/index.js";

const CURSOR_RADIUS = 20;

const Hero = () => {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);
  const textWrapRef = useRef(null);

  useEffect(() => {
    const outline = outlineRef.current;
    const textWrap = textWrapRef.current;
    const cursor = cursorRef.current;

    const xTo = gsap.quickTo(outline, "--cx", {
      duration: 0.4,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(outline, "--cy", {
      duration: 0.4,
      ease: "power3.out",
    });

    const cursorXTo = gsap.quickTo(cursor, "left", {
      duration: 0.15,
      ease: "power2.out",
    });
    const cursorYTo = gsap.quickTo(cursor, "top", {
      duration: 0.15,
      ease: "power2.out",
    });

    const handleMove = (e) => {
      const rect = textWrap.getBoundingClientRect();

      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);

      cursorXTo(e.clientX);
      cursorYTo(e.clientY);
    };

    const handleLeave = () => {
      xTo(-200);
      yTo(-200);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useGSAP(() => {
    gsap.from(".word", {
      opacity: 0,
      yPercent: 100,
      ease: "expo.out",
      stagger: 0.1,
      duration: 1,
    });
    gsap.from(".hero-sub", {
      opacity: 0,
      delay: 0.5,
      xPercent: 50,
      ease: "expo.out",
      duration: 0.8,
    });
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />

      <section className="hero">
        <div className="hero-text-wrap" ref={textWrapRef}>
          <h1 className="hero-heading">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className={`word${w.italic ? " italic" : ""}`}>
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
                <span className={`word${w.italic ? " italic" : ""}`}>
                  {w.text}
                </span>
                {i < words.length - 1 && " "}
              </React.Fragment>
            ))}
          </h1>

          <h3 className="hero-sub">There is clarity.</h3>
        </div>
      </section>
    </>
  );
};

export default Hero;
