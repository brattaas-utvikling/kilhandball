import { useEffect, useState } from "react";
import StyledLoader from "../../components/styles/StyledLoader";

export default function About() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Vis loader i 1 sekund når siden lastes
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader ? (
        <StyledLoader />
      ) : (
        <div className="mx-auto pb-20">
          <h1 className="text-3xl md:text-4xl font-anton font-bold text-kilsvart text-center uppercase mb-6 animate-fade-in border-b-2 border-gray-600 pb-4 w-full">
            Om oss
          </h1>
          <p className="text-lg md:text-xl font-roboto text-center text-kilred font-semibold mb-8">
            Velkommen til Håndballavdelingen i Kongsvinger IL
          </p>
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed">
            Kongsvinger Idrettslag, med en stolt historie som strekker seg tilbake
            til 1892, er mer enn bare en idrettsklubb; det er et fellesskap som
            binder sammen generasjoner av idrettsentusiaster i Kongsvinger kommune.
            Håndballavdelingen vår er et skinnende eksempel på denne arven, hvor
            lidenskap og samhold står sentralt.
          </p>
          <h2 className="text-2xl md:text-3xl font-anton font-bold text-kilsvart mt-10 mb-2">
            Ledelse og Utvikling
          </h2>
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed">
            Under ledelse av vår dyktige styreleder Bent Rohde Christoffersen, har
            håndballavdelingen nylig gjennomgått en positiv forandring. Vårt nye
            styre, opptatt av både tradisjon og innovasjon, har etablert et
            sportslig utvalg dedikert til å styrke det sportslige aspektet av
            klubben. Dette inkluderer en gjennomtenkt treningskabal, fokus på
            trenerutdanning, og utvikling av en Sportslig plan som vil tjene som en
            veileder for våre ambisjoner og praksis.
          </p>
          <h2 className="text-2xl md:text-3xl font-anton font-bold text-kilsvart mt-10 mb-2">
            Våre Verdier og Tilnærming
          </h2>
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed">
            I hjertet av Kongsvinger IL Håndball ligger våre kjerneverdier:
            mestring, inkludering og samfunnsengasjement. Vi tror fast på at barne-
            og ungdomsidrett er en arena hvor alle skal få muligheten til å oppleve
            mestring og glede. Med et inkluderende miljø ønsker vi at alle, uansett
            bakgrunn eller ferdighetsnivå, skal føle seg velkomne til å prøve
            håndball hos oss.
          </p>
          <h2 className="text-2xl md:text-3xl font-anton font-bold text-kilsvart mt-10 mb-2">
            Fasiliteter og Lokasjon
          </h2>
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed">
            Våre treninger og hjemmekamper finner sted i Tråstad
            Idrettshall, plassert langs Glomma og i nærheten av Kongsvinger
            Ungdomsskole og Kongsvinger Idrettspark. Dette gir oss en unik mulighet
            til å integrere idrett med lokalsamfunnet og bidra til en sunn og aktiv
            livsstil blant ungdommen.
          </p>
          <h2 className="text-2xl md:text-3xl font-anton font-bold text-kilsvart mt-10 mb-2">
            Dugnad og Fellesskap
          </h2>
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed">
            Klubben vår er drevet av en ånd av dugnad, hvor alle – spillere,
            trenere, foreldre og lokalbefolkning – bidrar med sitt. Denne felles
            innsatsen gjør det mulig for oss å tilby et trygt og støttende miljø
            hvor barn og unge kan trene, utvikle seg og fremfor alt, oppleve gleden
            ved håndball.
          </p>
        </div>
      )}
    </>
  );
}