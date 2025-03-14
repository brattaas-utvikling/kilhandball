import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import Logo from '../../assets/kil_logo.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-kilsvart py-10 px-6 w-full">
      {/* Toppbanner med logo og tekst */}
      <div className="container mx-auto">
        {/* Flex-container for logo og tekst */}
        <div className="flex flex-col md:flex-row items-center md:justify-between">
          {/* Logo - sentrert på mobil, venstre på desktop */}
          <div className="flex flex-col whitespace-nowrap items-center justify-center">
            <img
              src={Logo}
              alt="KIL Håndball Logo"
              className="max-h-20 w-auto"

            />
             <p className="text-kilblue font-bold text-sm tracking-wider mt-1 uppercase font-serif">
    KIL HÅNDBALL
  </p>
          </div>

          {/* Tekst - sentrert på mobil, høyre på desktop */}
          <div className="md:max-w-xl">
            <p className="text-base md:text-lg text-center font-thin font-roboto text-gray-400 leading-relaxed italic py-4">
              Bli en del av vårt fellesskap i Kongsvinger IL Håndball – <br />{' '}
              hvor vi sammen skaper idrettsglede og bygger karakter.
            </p>
          </div>
          <div className='max-w-md'>
  <a 
    href="https://www.sparebank1.no/nb/ostlandet/privat.html" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="Besøk SpareBank1 sin nettside"
    className="inline-block transition-transform hover:scale-102"
  >
    <img 
      src='public/images/sponsorer/sparebank1.webp'
      className='max-h-12 md:max-h-20 w-auto rounded-md' 
      alt="SpareBank1 logo" 
    />
  </a>
</div>
        </div>
      </div>

      {/* Bunnseksjon med lenker og sosiale medier */}
      <div className="container mx-auto mt-8 text-gray-400 border-t-2 border-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          {/* Første seksjon - Om oss, Kontakt, Copyright */}
          <ul className="flex flex-wrap justify-center items-center gap-x-2 text-base font-roboto mb-4 md:mb-0">
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
            <li className="font-roboto text-2xl items-center" aria-hidden="true">
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
              href="https://www.brattaasutvikling.no"
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
              className="hover:text-kilblue transition-colors duration-200"
              aria-label="Besøk oss på FaceBook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-kilblue transition-colors duration-200"
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
