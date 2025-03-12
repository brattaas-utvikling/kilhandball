import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import Logo from '../../assets/kil_logo.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-kilsvart py-10 px-6 w-full">
      {/* Toppbanner med logo og tekst */}
      <div className="container mx-auto">
        {/* Flex-container for logo og tekst */}
        <div className="flex flex-col md:flex-row items-center md:justify-around">
          {/* Logo - sentrert på mobil, venstre på desktop */}
          <div className="flex justify-center mb-6 md:mb-0">
            <img
              src={Logo}
              alt="KIL Håndball Logo"
              className="min-h-20 w-auto"
            />
          </div>

          {/* Tekst - sentrert på mobil, høyre på desktop */}
          <div className="md:max-w-xl">
            <p className="text-lg text-center font-thin font-roboto text-gray-400 leading-relaxed italic">
              Bli en del av vårt fellesskap i Kongsvinger IL Håndball – <br />{' '}
              hvor vi sammen skaper idrettsglede og bygger karakter.
            </p>
          </div>
        </div>
      </div>

      {/* Bunnseksjon med lenker og sosiale medier */}
      <div className="container mx-auto mt-8 text-gray-400 border-t-2 border-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          {/* Første seksjon - Om oss, Kontakt, Copyright */}
          <ul className="flex flex-wrap justify-center items-center gap-x-4 text-base font-roboto mb-4 md:mb-0">
            <li>
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

          {/* Andre seksjon - Designet av */}
          <p className="text-base font-roboto mb-4 md:mb-0">
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

          {/* Tredje seksjon - Sosiale medier ikoner */}
          <div className="flex gap-4 text-2xl text-white">
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
      </div>
    </footer>
  );
}

export default Footer;
