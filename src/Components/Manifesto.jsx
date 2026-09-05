import react, { useRef } from "react";

const Manifesto = () => {
  const manifestoRef = useRef(null);

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
