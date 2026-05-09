import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { words } from "../../constant/index.js";
import { ArrowDown } from "lucide-react";

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
    gsap.from(".arrow-down", {
      opacity: 0,
      delay: 1,
      yPercent: -20,
      ease: "expo.out",
      duration: 0.8,
    });

    const el = document.querySelector(".type-effect");
    if (!el) return;

    const text = "Izaz";
    let typed = 0;


    el.textContent = text;
    
    el.style.padding = "2px 6px"; 
    gsap.set(el, { width: "auto", height: "25px", overflow: "visible" });
    const fullWidth = el.offsetWidth;
    const fullHeight = el.offsetHeight;

    el.textContent = "";
    gsap.set(el, {
      width: 0,
      height: fullHeight,
      paddingLeft: 0,  
      paddingRight: 0, 
      paddingTop: 2, 
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

  return (
    <>
      <div ref={cursorRef} className="cursor" />

      <div className="top-sub">
        <h3 className="top-sub-left">
          I'm <span className="type-effect">Izaz</span>
        </h3>
        <h3 className="top-sub-right">and <span className="type-effect-right">he said</span></h3>
      </div>
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
        <div className="arrow-down">
          <ArrowDown size={50} strokeWidth={1} />
        </div>
      </section>
    </>
  );
};

export default Hero;