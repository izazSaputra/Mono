import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillsRow1 = ["GSAP", "React", "Next", "Laravel", "Figma", "Tailwind"];
const skillsRow2 = ["Photoshop", "Javascript", "PHP", "Lightroom", "Notion", "Affinity"];

const MarqueeRow = ({ items, direction = 1, speed = 30 }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const singleSetWidth = track.scrollWidth / 3;

    if (direction === -1) {
      gsap.set(track, { x: -singleSetWidth });
    }

    tweenRef.current = gsap.to(track, {
      x: direction === 1 ? `-=${singleSetWidth}` : `+=${singleSetWidth}`,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    const vp = track.parentElement;
    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    vp.addEventListener("mouseenter", pause);
    vp.addEventListener("mouseleave", resume);

    return () => {
      vp.removeEventListener("mouseenter", pause);
      vp.removeEventListener("mouseleave", resume);
    };
  }, []);

  const tripled = [...items, ...items, ...items];

  return (
    <div className="marquee-viewport">
      <div className="marquee-track" ref={trackRef}>
        {tripled.map((skill, i) => (
          <div className="skill-pill" key={i}>
            <span className="skill-dot" />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.from(".skills-label", {
      opacity: 0,
      stagger: 0.1,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
    })
    .from(".skills-title", {
      opacity: 0,
      stagger: 0.1,
      y: 28,
      duration: 0.7,
      ease: "power2.out",
    }, "-=0.3")
    .from(".skills-desc", {
      opacity: 0,
      stagger: 0.1,
      y: 24,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3");

  }, { scope: sectionRef });

  return (
    <section className="skills-section" ref={sectionRef}>
      <div className="skills-header">
        <div className="skills-header-left">
          <div className="skills-label">
            <span className="label-dot" />
            MY SKILLS
          </div>
          <h2 className="skills-title">
            Tools &amp; technologies<br />I work with.
          </h2>
        </div>
        <p className="skills-desc">
          A curated set of tools I use to build fast,
          beautiful, and scalable digital products.
        </p>
      </div>

      <div className="marquee-wrapper">
        <MarqueeRow items={skillsRow1} direction={1} speed={25} />
        <MarqueeRow items={skillsRow2} direction={-1} speed={20} />
      </div>
    </section>
  );
};

export default Skills;