import React from "react";
import gsap from "gsap";
import mojito from "../assets/mojito.png";
import smilework from "../assets/smilework.png";
import samira from "../assets/samira.png";

const items = [
  {
    id: 1,
    image: mojito,
    alt: "Interactive web design for selling cocktails.",
    title: "Mojito",
    subtitle: "Interactive Web",
  },
  {
    id: 2,
    image: smilework,
    alt: "Modern web portfolio  for an interior arcitecture firm.",
    title: "Smilework",
    subtitle: "Web Portfolio",
  },
  {
    id: 3,
    image: samira,
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
            <img src={item.image} alt={item.alt} />
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
