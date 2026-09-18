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

    const label = intro.querySelector(".manifesto-label");
    const title = intro.querySelector(".manifesto-title");

    if (!label || !title) return;

    const introTl = gsap.timeline({
      defaults: {
        opacity: 0,
        ease: "power3.out",
      },
      scrollTrigger: {
        trigger: intro,
        start: "top 55%",
        toggleActions: "play none none reverse",
      },
    });

    introTl
      .from(label, {
        y: 20,
        duration: 0.6,
      })
      .from(
        title,
        {
          y: 40,
          duration: 1,
        },
        "-=0.25",
      );

    const scenes = manifesto.querySelectorAll(".manifesto-scene");

    scenes.forEach((scene, index) => {
      const number = scene.querySelector(".manifesto-scene-number");
      const word = scene.querySelector(".manifesto-scene-word");
      const description = scene.querySelector(".manifesto-scene-desc");
      const alive = scene.querySelector(".manifesto-alive");

      if (!number || !word || !description) return;

      const direction = index === 1 ? 1 : -1;

      const sceneTl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },

        scrollTrigger: {
          trigger: scene,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      sceneTl
        .from(number, {
          y: 12,
          opacity: 0,
          duration: 0.4,
        })
        .from(
          word,
          {
            x: 60 * direction,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.2",
        )
        .from(
          description,
          {
            y: 24,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.55",
        );
      if (alive) {
        gsap.set(alive, {
          transformOrigin: "left center",
        });

        sceneTl
          .to(
            alive,
            {
              scaleX: 1.1,
              duration: 0.35,
              ease: "power2.out",
            },
            "+=0.1",
          )
          .to(alive, {
            scaleX: 1,
            duration: 0.55,
            ease: "power2.inOut",
          });
      }
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
