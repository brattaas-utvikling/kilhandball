import { FiTool } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function KommerSnart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-kilsvart mb-8">
        Under utvikling
      </h2>
      <FiTool className="text-6xl text-kilred mb-8" />
      <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
        Vi jobber med denne siden!
      </p>
      <p className="text-base md:text-lg text-gray-600 max-w-lg mb-12">
        Her kommer det mer informasjon løpende. Vi oppdaterer nettsiden jevnlig
        med nytt innhold.
      </p>
      <div className="w-full max-w-xs">
        <Link
          to="/praktisk-info"
          className="inline-block w-full py-3 px-6 bg-kilred text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
        >
          Tilbake til praktisk info
        </Link>
      </div>
    </div>
  );
}

export default KommerSnart;
