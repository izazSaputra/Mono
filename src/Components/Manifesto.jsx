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
    <section ref={manifestoRef} id="manifesto" className="manifesto">
      <div className="manifesto-inner">
        <p ref={introRef} className="manifesto-intro">
          I TURN IDEAS
          <br />
          INTO <span>INTERFACES.</span>
        </p>

        <div className="manifesto-lines">
          <p ref={codeRef}>CODE GIVES THEM STRUCTURE.</p>
          <p ref={designRef}>DESIGN GIVES THEM FORM.</p>
          <p ref={motionRef}>
            MOTION MAKES THEM{" "}
            <span ref={aliveRef} className="manisfesto-alive">
              ALIVE.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
