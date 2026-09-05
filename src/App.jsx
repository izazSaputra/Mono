import React, { useState } from "react";

import Hero from "./Components/Hero";
import Manifesto from "./Components/Manifesto";
import SectionIndex from "./Components/SectionIndex";

const App = () => {
  const [activeSection, setActiveSection] = useState({
    number: "00",
    label: "IDENTITY",
  });

  return (
    <main>
      <SectionIndex section={activeSection} />

      <Hero setActiveSection={setActiveSection} />

      <Manifesto setActiveSection={setActiveSection} />
    </main>
  );
};

export default App;
