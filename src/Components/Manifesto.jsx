import react, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Manifesto = ({ setActiveSection }) => {
  const manifestoRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: manifestoRef.current,

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
    });
  }, []);

  return (
    <section ref={manifestoRef} id="manifesto" className="manifesto">
      <div className="manifesto-inner">
        <p className="manifesto-intro">
          I TURN IDEAS
          <br />
          INTO INTERFACES.
        </p>

        <div className="manifesto-lines">
          <p>CODE GIVES THEM STRUCTURE.</p>
          <p>DESIGN GIVES THEM FORM.</p>
          <p>
            MOTION MAKES THEM <span>ALIVE.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
