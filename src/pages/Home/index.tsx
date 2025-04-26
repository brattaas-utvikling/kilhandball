import { useEffect, useState } from 'react';
import StyledLoader from '../../styles/StyledLoader';
import SiteNotification from '../../components/SiteNotification';
import Sponsorer from '../../components/Sponsorer';
import { HeroSection } from '../../components/HeroSection';
import { useNavigate } from 'react-router-dom';
import arsmotepapirer from '../../assets/pdfs/Arsmotepapirer_v2025.pdf';
import arsmotepapirer_signert from '../../assets/pdfs/Arsmotepapirer_v2025_signert.pdf';

function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openPdfWithState = (pdfUrl: string, pdfTitle: string) => {
    navigate('/pdf/view', {
      state: {
        pdfUrl,
        pdfTitle,
      },
    });
  };

  return (
    <>
      {showLoader ? (
        <StyledLoader />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <HeroSection />
          <div className="border-b-2 border-gray-600 pb-4 w-full">
            <h2 className="text-3xl font-anton font-bold mb-4 text-center uppercase">
              Siste nyheter
            </h2>
            <SiteNotification />
          </div>
          
          <div className='p-6 md:p-8 mx-auto mt-8 md:mt-16'>
          <button
              onClick={() =>
                openPdfWithState(arsmotepapirer_signert, 'Årsmøtepapirer 2025 Signert')
              }
              className="w-full sm:w-auto px-6 py-3 bg-kilred text-white font-semibold text-base rounded-2xl shadow-md hover:bg-kilred/80 focus:outline-none focus:ring-2 focus:ring-kilred/50 transition-all duration-300"
            >
              Signerte årsmøtepapirer for 2025
            </button>

          </div>
          <div className="p-6 md:p-8 mx-auto mt-8 md:mt-16">
            <h2 className="text-xl md:text-2xl font-bold font-anton text-kilsvart mb-4">
              Innkalling til årsmøte i Kongsvinger IL Håndball 27. MARS 2025
            </h2>
            <p className="mb-4 text-lg font-roboto font-normal">
              Styret innkaller herved til årsmøte i Kongsvinger IL Håndball.
              Årsmøtet avholdes <strong>27. mars kl. 18.00</strong> i peisestua
              på Gjemselund.
            </p>
            <p className="mb-4 text-lg font-roboto font-normal">
              Saker som et medlem ønsker behandlet på årsmøtet, må sendes styret
              senest <strong>13. mars 2025</strong> til{' '}
              <a
                href="mailto:post@kilhandball.no"
                className="text-kilred font-semibold hover:underline"
              >
                post@kilhandball.no
              </a>
              .
            </p>
            <p className="mb-4 text-lg font-roboto font-normal">
              Fullstendig sakliste med alle saksdokumenter vil bli gjort
              tilgjengelig for medlemmene senest én uke før årsmøtet her:
            </p>
            <button
              onClick={() =>
                openPdfWithState(arsmotepapirer, 'Årsmøtepapirer 2025')
              }
              className="px-4 py-2 bg-kilsvart text-white font-medium rounded hover:bg-kilsvart/80 transition-colors duration-200 mb-4"
            >
              Se årsmøtepapirer for 2025
            </button>
            <p className="mb-4 text-lg font-roboto font-normal">
              For å ha stemmerett og kunne velges til verv må man ha vært medlem
              av Kongsvinger IL Håndball i minst én måned, fylle minst 15 år i
              det kalenderåret årsmøtet avholdes, og ha gjort opp sine
              økonomiske forpliktelser til klubben. Alle medlemmer har uansett
              møterett, talerett og forslagsrett.
            </p>
            <p className="mb-4 text-lg font-roboto font-normal">
              For mer informasjon om årsmøte samt regler om stemmerett,
              valgbarhet, forslagsrett mv., se Kongsvinger IL Håndballs lov.
            </p>
            <p className="mb-4 text-lg font-roboto font-normal">
              Ved spørsmål som gjelder årsmøtet, send mail til:{' '}
              <a
                href="mailto:post@kilhandball.no"
                className="text-kilred font-semibold hover:underline"
              >
                post@kilhandball.no
              </a>
            </p>
            <p className="mt-6 font-semibold text-lg font-roboto">
              Velkommen til årsmøte!
            </p>
            <p className="font-medium text-lg font-roboto">
              Med vennlig hilsen
            </p>
            <p className="font-semibold text-lg font-roboto">Styret</p>
          </div>
          <Sponsorer />
        </div>
      )}
    </>
  );
}

export default Home;
