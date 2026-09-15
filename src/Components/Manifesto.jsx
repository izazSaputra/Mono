import react, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Manifesto = ({ setActiveSection }) => {
  const manifestoRef = useRef(null);

  const introRef = useRef(null);
  const codeRef = useRef(null);
  const designRef = useRef(null);
  const motionRef = useRef(null);
  const aliveRef = useRef(null);

  useGSAP(() => {
    const manifesto = manifestoRef.current;
    if (!manifesto) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: manifestoRef.current,
        start: "top top",
        end: "+=180",
        scrub: 1,
        pin: true,

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
      },
    });

    tl.from(introRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.7,
    })

      .to(codeRef.current, {
        color: "#ffffff",
        duration: 1,
      })

      .to(designRef.current, {
        color: "#ffffff",
        duration: 1,
      })

      .to(motionRef.current, {
        color: "#ffffff",
        duration: 1,
      })

      .to(
        aliveRef.current,
        {
          scaleX: 1.08,
          letterSpacing: "0.04em",
          duration: 0.6,
          transformOrigin: "left center",
        },
        "-=0.4",
      );
  }, [setActiveSection]);

  return (
    <section className="manifesto">
      <div className="manifesto-intro">
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
            MAKES THEM <span>ALIVE.</span>
          </p>
        </article>
      </div>
    </section>
  );
};

export default Manifesto;
