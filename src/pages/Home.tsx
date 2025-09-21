import Sponsorer from '../components/Sponsorer';
import { HeroSection } from '../components/HeroSection';
import { useNavigate } from 'react-router-dom';
import arsmotepapirer from '../assets/pdfs/Arsmotepapirer_v2025.pdf';
import arsmotepapirer_signert from '../assets/pdfs/Arsmotepapirer_v2025_signert.pdf';
import HomepageNews from '../components/HomepageNews';

function Home() {
  const navigate = useNavigate();

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
        <div className="flex flex-col items-center justify-center">
          <HeroSection />
          <HomepageNews />

          <div className="p-6 md:p-10 lg:p-16 bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)] text-white w-screed">
          <div className='w-7xl mx-auto'>
            <h2 className="text-xl md:text-2xl font-bold font-anton text-white mb-4">
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
                className="text-white font-semibold hover:underline"
              >
                post@kilhandball.no
              </a>
              .
            </p>
            <p className="mb-4 text-lg font-roboto font-normal">
              Fullstendig sakliste med alle saksdokumenter vil bli gjort
              tilgjengelig for medlemmene senest én uke før årsmøtet her:
            </p>
              <div className='flex flex-wrap justify-start align-middle gap-10 my-4'>
                  <button
                    onClick={() =>
                      openPdfWithState(
                        arsmotepapirer_signert,
                        'Årsmøtepapirer 2025 Signert'
                      )
                    }
                    className="px-4 py-2 bg-white text-kilred font-semibold text-base rounded-md shadow-md hover:bg-kilred-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                  >
                    Signerte årsmøtepapirer for 2025
                  </button>
        
                  <button
                    onClick={() =>
                      openPdfWithState(arsmotepapirer, 'Årsmøtepapirer 2025')
                    }
                    className="px-4 py-2 bg-kilsvart text-white font-medium text-base rounded-md shadow-sm hover:bg-kilsvart/80 focus:outline-none focus:ring-2 focus:ring-kilsvart/50 transition-all duration-300"
                  >
                    Se årsmøtepapirer for 2025
                  </button>

              </div>
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
                className="text-white font-semibold hover:underline"
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
          </div>
          <Sponsorer />
        </div>
    </>
  );
}

export default Home;
