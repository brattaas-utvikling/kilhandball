import { useEffect, useState } from 'react';
import StyledLoader from '../../components/styles/StyledLoader';

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
            Velkommen til Kongsvinger IL Håndball
          </p>
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed">
            Kongsvinger Idrettslag, med en stolt historie som strekker seg
            tilbake til 1892, er mer enn bare en idrettsklubb; det er et
            fellesskap som binder sammen generasjoner av idrettsentusiaster i
            Kongsvinger kommune.
          </p>
          <p className="text-base md:text-lg font-roboto text-gray-700 leading-relaxed mt-4">
            KIL Håndballs verdier: <br />
            <ul className="list-disc ml-8">
              <li>Mestring</li>
              <li>Allsidighet</li>
              <li>Lek</li>
              <li>Idrettsglede</li>
              <li>Fellesskap-trygghet-respekt</li>
            </ul>
          </p>
        </div>
      )}
    </>
  );
}
