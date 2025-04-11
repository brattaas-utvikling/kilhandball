import { useEffect, useState } from 'react';
import StyledLoader from '../../components/styles/StyledLoader';

function Contact() {
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
        <div className="mx-auto pb-8">
          <h1 className="text-3xl font-anton font-bold mb-6 text-center border-b-2 border-gray-600 py-4 w-full">
            Kontaktinformasjon
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info-seksjon */}
            <div>
              <p className="mb-4 text-lg font-roboto font-normal">
                Vi hører gjerne fra deg! Enten du er interessert i å bli med i
                klubben, har spørsmål om våre lag, eller ønsker å bidra som
                frivillig, er vi her for å hjelpe!
              </p>
              <p className="mb-8 text-lg font-roboto font-normal">
                For generelle hendvendelser, send en e-post til{' '}
                <a
                  href="mailto:post@kilhandball.no"
                  className="text-kilred font-semibold hover:underline"
                >
                  post@kilhandball.no
                </a>
              </p>
              <div>
                <h3 className="text-xl font-anton font-bold mb-2">
                  Besøksadresse
                </h3>
                <address className="text-lg font-roboto">
                  Markensvegen 20, 2212 Kongsvinger
                </address>
                {/* Google Maps seksjon */}
                <div className="w-full mt-8">
                  <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1936.1667491002683!2d12.00510145731154!3d60.192375994710575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46424126beed7ba1%3A0xea89122e6ec6e0e9!2sMarkensvegen%2020%2C%202212%20Kongsvinger!5e0!3m2!1sno!2sno!4v1710280000000!5m2!1sno!2sno"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Kart til KIL Håndball"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-anton mb-2">Styret</h2>
              <p className="text-lg font-roboto font-regular mb-4">
                Styret til KIL Håndball består av Bent Rode-Christoffersen,
                Vidar Svartkjønnli, Svein Thorstensen, Elin Maria Vendela
                Skoglund, Ole-Erik Ruud, Bjørn Erik Johnsen, Linda skarstad og
                Hanne Fiskerud.
              </p>
              <h3 className="text-xl font-anton font-bold mb-2">Styreleder</h3>
              <p className="text-lg font-roboto font-medium">
                Bent Rode-Christoffersen
              </p>
              <ul className="mb-4 text-lg font-roboto">
                <li>
                  <strong>E-post:</strong>{' '}
                  <a
                    href="mailto:bent.rode.christoffersen@gmail.com"
                    className="text-kilsvart font-regular hover:underline"
                  >
                    bent.rode.christoffersen@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Telefon:</strong>{' '}
                  <a
                    href="tel:+4790969435"
                    className="text-kilsvart font-regular hover:underline"
                  >
                    90969435
                  </a>
                </li>
              </ul>
              <h3 className="text-xl font-anton font-bold mb-2">
                Dommerkontakt
              </h3>
              <p className="text-lg font-roboto font-medium">
                Ingvald Moe Gimse
              </p>
              <ul className="mb-4 text-lg font-roboto">
                <li>
                  <strong>E-post:</strong>{' '}
                  <a
                    href="mailto:Ingvald.Moe.gimse@gmail.com"
                    className="text-kilsvart font-regular hover:underline"
                  >
                    Ingvald.Moe.gimse@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Telefon:</strong>{' '}
                  <a
                    href="tel:+4790252766"
                    className="text-kilsvart font-regular hover:underline"
                  >
                    90252766
                  </a>
                </li>
              </ul>

              <h3 className="text-2xl font-anton font-bold mb-2">
                Sportslig utvalg
              </h3>
              <p className="text-lg font-roboto font-medium">
                Sportslig utvalg består av Erik Elseth, Sara Bourne Holtet,
                Charlotte Egnersson og Jon Are Haveråen-Brattås.
              </p>
              <ul className="text-lg font-roboto">
                <li>
                  <strong>E-post:</strong>{' '}
                  <a
                    href="mailto:jon.are.br@gmail.com"
                    className="text-kilsvart font-regular hover:underline"
                  >
                    jon.are.br@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Telefon:</strong>{' '}
                  <a
                    href="tel:+4791607759"
                    className="text-kilsvart font-regular hover:underline"
                  >
                    91607759
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
