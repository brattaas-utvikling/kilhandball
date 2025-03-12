import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import Logo from '../../assets/kil_logo.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-kilsvart py-10 px-6 w-full">
      <div className="flex flex-col items-center md:items-start">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Holidayz Logo" className="min-h-20 w-auto" />
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-8 gap-8 text-gray-400 border-t-2 border-gray-400 ">
        <ul className="flex flex-wrap justify-center md:justify-start items-center md:items-start gap-x-4 mt-4 text-base font-roboto">
          <li>
            {/* Bruker Link fra react-router-dom i stedet for onClick + navigate */}
            <Link
              to="/om-oss"
              className="hover:text-secondary cursor-pointer transition"
            >
              Om oss
            </Link>
          </li>
          <li>
            <Link
              to="/kontakt"
              className="hover:text-white cursor-pointer transition"
            >
              Kontakt
            </Link>
          </li>
          <li className="text-body text-2xl items-center" aria-hidden="true">
            |
          </li>
          <li>
            <p>&copy; 2025 KIL Håndball</p>
          </li>
        </ul>
        <div>
          <p className="flex justify-center md:justify-end items-center mt-4 text-base font-roboto">
            Designet og utviklet av{' '}
            <a
              className="text-kilblue text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https:/www.brattaasutvikling.no"
              aria-label="Nettsiden til Brattås Utvikling"
            >
              Brattås Utvikling
            </a>
          </p>
        </div>
        <div className="flex gap-4 text-2xl my-4 text-white justify-center md:justify-end">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opacity-60 transition"
            aria-label="Besøk oss på FaceBook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-opacity-60 transition"
            aria-label="Besøk oss på Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
