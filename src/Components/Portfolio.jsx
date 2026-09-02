import React from "react";
import mojitoBw from "../assets/mojito.png";
import mojitoColor from "../assets/mojito-color.png";
import smileworkBw from "../assets/smilework.png";
import smileworkColor from "../assets/smilework-color.png";
import samiraBw from "../assets/samira.png";
import samiraColor from "../assets/samira-color.png";

const items = [
  {
    id: 1,
    imageBw: mojitoBw,
    imageColor: mojitoColor,
    alt: "Interactive web design for selling cocktails.",
    title: "Mojito",
    subtitle: "Interactive Web",
  },
  {
    id: 2,
    imageBw: smileworkBw,
    imageColor: smileworkColor,
    alt: "Modern web portfolio  for an interior arcitecture firm.",
    title: "Smilework",
    subtitle: "Web Portfolio",
  },
  {
    id: 3,
    imageBw: samiraBw,
    imageColor: samiraColor,
    alt: "Web Presence for regional travel agency.",
    title: "Samira Travel",
    subtitle: "Web Development",
  },
];

export default function PortfolioGrid() {
  return (
    <div className="portfolio-page">
      <header className="topbar">
        <p className="tagline">
          Something i've made
          <br />
          the work here isn't just a showcase
        </p>
      </header>

      <main className="grid">
        {items.map((item) => (
          <figure className={`grid-item item-${item.id}`} key={item.id}>
            <div className="portfolio-media" data-cursor-reveal>
              <img
                className="portfolio-img portfolio-img--bw"
                src={item.imageBw}
                alt={item.alt}
              />
              <img
                className="portfolio-img portfolio-img--color"
                src={item.imageColor}
                alt=""
                aria-hidden="true"
              />
            </div>
            <figcaption>
              <span className="title">{item.title}</span>
              <span className="subtitle">{item.subtitle}</span>
            </figcaption>
          </figure>
        ))}
      </main>
    </div>
  );
}
