import { Link } from 'react-router-dom';

function HandballLive() {
  return (
    <div className="container mx-auto pb-12">
      <div className="mb-6">
        <Link
          to="/praktisk-info"
          className="text-kilred hover:underline flex items-center"
        >
          ← Tilbake til praktisk info
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-kilsvart">Håndball Live</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-kilred">
          Brukerveiledning for Håndball Live
        </h2>

        <div className="prose max-w-none">
          <p className="mb-6">
            Det er tre ulike typer LIVE det kan plottes under en kamp:
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-bold mb-2">
                Standard versjon - Digital kamprapport
              </h3>
              <ul className="list-disc pl-6">
                <li>Brukes i klassene 13 år - Senior</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2">
                Enkel versjon - Digital kamprapport
              </h3>
              <ul className="list-disc pl-6">
                <li>Kun registrere målscore lag, som kamp-ur i hallen</li>
                <li>Brukes i klassene 12 år og yngre</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-2">Avansert versjon</h3>
              <ul className="list-disc pl-6">
                <li>
                  Føre hendelser for statistikk (parallelt med Digital
                  kamprapport)
                </li>
                <li>Brukes i NHFs serier</li>
              </ul>
            </div>
          </div>

          <p className="mb-4">
            Det er de som administrerer de ulike kamptilbudene (NHF
            sentralt/Regioner) som setter opp hvilke type LIVE en skal føre.
          </p>

          <p className="mb-4">
            For å ha tilgang til å kunne plotte/føre LIVE må en ha en bruke
            klubbens LIVE-bruker, eller ha følgende funksjoner knyttet til egen
            bruker i MinIdrett:
          </p>

          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Kamper LIVE</strong> (tilknyttet involvert klubb eller
              lag)
            </li>
            <li>
              <strong>Kampansvarlig</strong> (tilknyttet involvert klubb eller
              lag)
            </li>
          </ul>

          <p>
            Kampene som føres i LIVE-admin kan publikum følge fra websiden
            Håndball LIVE (link finnes også for hver enkelt kamp i app'en
            MinHåndball), dersom administrerende org. (NHF sentralt/Regioner)
            har gjort det tilgjengelig.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HandballLive;
