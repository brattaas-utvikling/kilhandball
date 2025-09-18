import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, BookOpen } from "lucide-react";
import RenderSection from "./RenderSection";

interface Section {
  id: string;
  title: string;
  children?: Section[];
}

const sections: Section[] = [
  {
    id: "1-0",
    title: "1.0 Roller og arbeidsbeskrivelser styret",
    children: [
      { id: "1-1", title: "1.1 Styrets oppgaver" },
      {
        id: "1-2",
        title: "1.2 Roller i Styret i KIL håndball",
        children: [
          { id: "1-2-1", title: "1.2.1 Leder" },
          { id: "1-2-2", title: "1.2.2 Nestleder" },
          { id: "1-2-3", title: "1.2.3 Styremedlem" },
          { id: "1-2-4", title: "1.2.4 Økonomiansvarlig" },
          { id: "1-2-5", title: "1.2.5 Dommerkontakt" },
          { id: "1-2-6", title: "1.2.6 Arrangementsansvarlig" },
          { id: "1-2-7", title: "1.2.7 Attestansvarlig" },
          { id: "1-2-8", title: "1.2.8 Hjemmeside & SoMe ansvarlig" },
        ],
      },
    ],
  },
  {
    id: "2-0",
    title: "2.0 Roller og arbeidsbeskrivelser sportslig utvalg",
    children: [
      { id: "2-1", title: "2.1 Sportslig utvalgs oppgaver" },
      { id: "2-1-1", title: "2.1.1 Sportslig leder og sportslig utvalg" },
      { id: "2-1-2", title: "2.1.2 Barnehåndballansvarlig (5-12 år)" },
      { id: "2-1-3", title: "2.1.3 Ungdoms- og seniorhåndballansvarlig (13+ år)" },
    ],
  },
  {
    id: "3-0",
    title: "3.0 Roller, organisering og arbeidsbeskrivelser av lag",
    children: [
      { id: "3-1", title: "3.1 Utøver" },
      { id: "3-2", title: "3.2 Trener" },
      { id: "3-3", title: "3.3 Hjelpetrener" },
      { id: "3-4", title: "3.4 Lagleder" },
      { id: "3-5", title: "3.5 Foreldrekontakt" },
      { id: "3-6", title: "3.6 Foreldre/foresatt" },
    ],
  },
];

// Rekursiv TOC-komponent
const TocList: React.FC<{
  items: Section[];
  activeSection: string;
  onClick: (id: string) => void;
  level?: number;
}> = ({ items, activeSection, onClick, level = 0 }) => {
  return (
    <ul className={`space-y-1 ml-${level * 3}`}>
      {items.map(({ id, title, children }) => (
        <li key={id}>
          <button
            onClick={() => onClick(id)}
            className={`block w-full text-left px-2 py-1 rounded-md text-sm transition-all ${
              activeSection === id
                ? "bg-kilred text-white font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {title}
          </button>
          {children && (
            <TocList
              items={children}
              activeSection={activeSection}
              onClick={onClick}
              level={level + 1}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

// const RenderSection: React.FC<{ section: Section }> = ({ section }) => {
//   const ref = React.useRef<HTMLDivElement | null>(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <motion.section
//       ref={ref}
//       id={section.id}
//       initial={{ opacity: 0, y: 30 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6 }}
//       className="scroll-mt-24"
//     >
//       <h2 className="text-2xl font-bold text-kilsvart mb-4">{section.title}</h2>
//       <p className="text-gray-700">
//         {/* TODO: Sett inn teksten fra dokumentet her */}
//         Plassholder for {section.title}.
//       </p>
//       {section.children &&
//         section.children.map((child) => (
//           <RenderSection key={child.id} section={child} />
//         ))}
//     </motion.section>
//   );
// };

const ClubManagement: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [tocOpen, setTocOpen] = useState<boolean>(false);

  // Scroll til seksjon
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  };

  // Observer for aktiv seksjon
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const collectIds = (arr: Section[]): string[] =>
      arr.flatMap((s) => [s.id, ...(s.children ? collectIds(s.children) : [])]);

    collectIds(sections).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 lg:flex lg:gap-8">
        {/* Desktop TOC */}
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-lg shadow p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h3 className="text-lg font-bold text-kilsvart mb-4 flex items-center">
              <BookOpen size={20} className="mr-2 text-kilred" />
              Innholdsfortegnelse
            </h3>
            <TocList
              items={sections}
              activeSection={activeSection}
              onClick={scrollToSection}
            />
          </div>
        </div>

        {/* Mobile TOC */}
        <div className="lg:hidden mb-6 w-full">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex items-center justify-between w-full bg-white rounded-lg shadow p-4 text-kilsvart"
          >
            <span className="flex items-center font-medium">
              <BookOpen size={20} className="mr-2 text-kilred" />
              Innholdsfortegnelse
            </span>
            {tocOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          {tocOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-white rounded-lg shadow mt-2 p-4"
            >
              <TocList
                items={sections}
                activeSection={activeSection}
                onClick={scrollToSection}
              />
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-5xl space-y-8">
          {sections.map((sec) => (
            <RenderSection key={sec.id} section={sec} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubManagement;
