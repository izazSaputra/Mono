import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  useGSAP(() => {
    // Split the paragraph into individual words
    const split = new SplitText(".about-text", { type: "words" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "+=150%",
        scrub: 1,
      },
    });

    tl.from(split.words, {
      delay: 0.09,
      x: "100vw",
      opacity: 0,
      ease: "power2.out",
      stagger: 0.02,
    });

    ScrollTrigger.create({
      trigger: "#about",
      start: "top top",
      end: "+=100%",
      pin: true,
      anticipatePin: 1,
    });
  }, []);

  return (
    <section id="about">
      <div>
        <p className="about-text">
          I am a passionate and dedicated web developer with a strong focus on
          creating visually stunning and user-friendly websites. With a keen eye
          for design and a deep understanding of front-end technologies, I
          strive to bring ideas to life through innovative and responsive web
          solutions. My commitment to continuous learning and staying up-to-date
          with the latest industry trends allows me to deliver high-quality work
          that exceeds client expectations.
        </p>
      </div>
    </section>
  );
};

export default About;
