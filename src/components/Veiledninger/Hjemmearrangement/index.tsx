import { Link } from 'react-router-dom';

function Hjemmearrangement() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6">
        <Link to="/praktisk-info" className="text-kilred hover:underline flex items-center">
          ← Tilbake til praktisk info
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-kilsvart">Hjemmearrangement</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-kilred">Brukerveiledning for hjemmearrangement</h2>
        
        <div className="prose max-w-none">
          <p>
            Her kommer informasjon om hjemmearrangement. Du kan legge til tekst, bilder, nedlastbare filer eller annet innhold som er relevant for hjemmearrangement.
          </p>
          
          {/* Eksempelseksjoner - erstatt med faktisk innhold */}
          <h3 className="mt-6 mb-2 text-lg font-medium">Før kampen</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Sjekkliste for hallansvarlig</li>
            <li>Oppsett av sekretariat</li>
            <li>Forberedelser for dommere</li>
          </ul>
          
          <h3 className="mt-6 mb-2 text-lg font-medium">Under kampen</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Føring av kamprapport</li>
            <li>Hallvaktens oppgaver</li>
            <li>Håndtering av publikum</li>
          </ul>
          
          <h3 className="mt-6 mb-2 text-lg font-medium">Etter kampen</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Rapportering av resultater</li>
            <li>Rydding og klargjøring</li>
            <li>Evaluering</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Hjemmearrangement;