import { CircleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-kilsvart mb-8">
        Ooops!
      </h2>
      <CircleAlert className="text-6xl text-kilred mb-8" />
      <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
        En uventet feil har oppstått
      </p>
      <p className="text-base md:text-lg text-gray-600 max-w-lg mb-12">
        Det skjedde en uventet feil, og vi jobber med å fikse det. I mellomtiden kan du prøve å gå tilbake til hjemmesiden eller kontakte oss hvis du har spørsmål.
      </p>
      <div className="w-full max-w-xs">
        <Link
          to="/"
          className="inline-block w-full py-3 px-6 bg-kilred text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
        >
          Tilbake til hjemmesiden
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
