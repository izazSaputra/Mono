import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Manifesto = ({ setActiveSection }) => {
  const manifestoRef = useRef(null);
  const introRef = useRef(null);

  useGSAP(() => {
    const manifesto = manifestoRef.current;

    if (!manifesto) return;

    ScrollTrigger.create({
      trigger: manifesto,
      start: "top 60%",
      end: "bottom 40%",

      onEnter: () => {
        setActiveSection({
          number: "01",
          label: "MANIFESTO",
        });
      },

      onEnterBack: () => {
        setActiveSection({
          number: "01",
          label: "MANIFESTO",
        });
      },

      onLeaveBack: () => {
        setActiveSection({
          number: "00",
          label: "IDENTITY",
        });
      },
    });

    const intro = introRef.current;

    if (!intro) return;

    gsap.from(intro, {
      y: 60,
      duration: 1,
      opacity: 0,
      ease: "power3.inOut",

      scrollTrigger: {
        trigger: intro,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });
  }, [setActiveSection]);

  return (
    <section ref={manifestoRef} className="manifesto">
      <div ref={introRef} className="manifesto-intro">
        <p className="manifesto-label">A SMALL STATEMENT ABOUT HOW I BUILD</p>

        <h2 className="manifesto-title">
          I TURN IDEAS
          <br />
          INTO <span>INTERFACES.</span>
        </h2>
      </div>

      <div className="manifesto-scenes">
        <article className="manifesto-scene">
          <span className="manifesto-scene-number">01</span>

          <h3 className="manifesto-scene-word">CODE</h3>

          <p className="manifesto-scene-desc">GIVES THEM STRUCTURE.</p>
        </article>

        <article className="manifesto-scene">
          <span className="manifesto-scene-number">02</span>

          <h3 className="manifesto-scene-word">DESIGN</h3>

          <p className="manifesto-scene-desc">GIVES THEM FORM.</p>
        </article>

        <article className="manifesto-scene">
          <span className="manifesto-scene-number">03</span>

          <h3 className="manifesto-scene-word">MOTION</h3>

          <p className="manifesto-scene-desc">
            MAKES THEM <span className="manifesto-alive">ALIVE.</span>
          </p>
        </article>
      </div>
    </section>
  );
};

export default Manifesto;
