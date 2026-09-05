import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SectionIndex = ({ section }) => {
  const numberRef = useRef(null);
  const labelRef = useRef(null);
  const lineRef = useRef(null);

  const [displayedSection, setDisplayedSection] = useState(section);

  useEffect(() => {
    if (
      displayedSection.number === section.number &&
      displayedSection.label === section.label
    ) {
      return;
    }

    const tl = gsap.timeline();

    // section lama keluar ke atas
    tl.to([numberRef.current, labelRef.current], {
      yPercent: -120,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.04,

      onComplete: () => {
        setDisplayedSection(section);
      },
    });

    // pindahin text baru ke bawah
    tl.set([numberRef.current, labelRef.current], {
      yPercent: 120,
    });

    // section baru masuk dari bawah
    tl.to([numberRef.current, labelRef.current], {
      yPercent: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
      stagger: 0.05,
    });

    // garis sedikit bereaksi
    tl.fromTo(
      lineRef.current,
      {
        scaleX: 0.3,
      },
      {
        scaleX: 1,
        duration: 0.45,
        ease: "power3.out",
      },
      "-=0.4",
    );
  }, [section, displayedSection]);

  return (
    <div className="section-index">
      <div className="section-index__content">
        <div className="section-index__mask">
          <span ref={numberRef}>{displayedSection.number}</span>
        </div>

        <span>/</span>

        <div className="section-index__mask">
          <span ref={labelRef}>{displayedSection.label}</span>
        </div>

        <span ref={lineRef} className="section-index__line" />
      </div>
    </div>
  );
};

export default SectionIndex;