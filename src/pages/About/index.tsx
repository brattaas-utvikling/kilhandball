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
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed mt-4">
            Vi er stolte av å kunne tilby et bredt spekter av aktiviteter for
            barn, ungdom og voksne, og vi er alltid på jakt etter nye talenter
            som ønsker å bli en del av vårt fellesskap. Uansett om du er en
            erfaren spiller eller en nybegynner, er du hjertelig velkommen til
            å ta kontakt med oss for en uforpliktende prat.
          </p>
        </div>
      )}
    </>
  );
}