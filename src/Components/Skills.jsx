import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Skills = () => {
  return (
    <>
      <div className="skills-section">
        <h3>My Skills</h3>
        <section className="skills-grid">
          <div className="skill-card">GSAP</div>
          <div className="skill-card">React</div>
          <div className="skill-card">Next</div>
          <div className="skill-card">Laravel</div>
          <div className="skill-card">Figma</div>
          <div className="skill-card">Tailwind</div>
        </section>
        <section className="skills-grid-bottom">
          <div className="skill-card">Photoshop</div>
          <div className="skill-card">Javascript</div>
          <div className="skill-card">PHP</div>
          <div className="skill-card">Lightroom</div>
          <div className="skill-card">Notion</div>
          <div className="skill-card">Affinity</div>
        </section>
      </div>
    </>
  );
};

export default Skills;
