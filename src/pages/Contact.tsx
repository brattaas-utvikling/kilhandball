import { motion } from 'framer-motion';
import { 
  Mail,
  Phone,
  MapPin,
  User,
  Gavel
} from 'lucide-react';
import { GiWhistle } from 'react-icons/gi';
import { FaVolleyballBall } from 'react-icons/fa';

const Contact = () => {
  interface Person {
    navn: string;
    stilling: string;
    epost?: string;
    telefon?: string;
  }
  const styremedlemmer = [
    {
      navn: "Bent Rode-Christoffersen",
      stilling: "Styreleder",
      epost: "bent.rode.christoffersen@gmail.com",
      telefon: "90969435"
    },
    {
      navn: "Vidar Svartkjønnli",
      stilling: "Nestleder",
      epost: "darwin73@live.no",
      telefon: "92201316"
    },
    {
      navn: "Svein Thorstensen", 
      stilling: "Styremedlem",
      epost: "sveinthorstensen50@gmail.com",
      telefon: "91185490"
    },
    {
      navn: "Elin Maria Vendela Skoglund",
      stilling: "Styremedlem",
      epost: "elinskoglund83@gmail.com",
      telefon: "91788617"
    },
    {
      navn: "Erik Seigerud",
      stilling: "Styremedlem",
      epost: "erse@omfjeld.no",
      telefon: "92097978"
    },
    {
      navn: "Bjørn Erik Johnsen",
      stilling: "Styremedlem",
      epost: "berikj@online.no",
      telefon: "90728194"
    },
    {
      navn: "Linda Skarstad",
      stilling: "Styremedlem",
      epost: "linda@skarstadgartneri.no",
      telefon: "41500585"
    },
    {
      navn: "Hanne Fiskerud",
      stilling: "Styremedlem",
      epost: "hanne.fiskerud@gmail.com",
      telefon: "97584371"
    }
  ];

  const sportsligUtvalg = [
    {
      navn: "Erik Elseth",
      stilling: "Sportslig leder",
      epost: "erik.elseth@gmail.com",
      telefon: "90667312"
    },
    {
      navn: "Sarah Bourne Holtet",
      stilling: "Medlem",
      epost: "sarah_bourne6@hotmail.com",
      telefon: "91158686"
    },
    {
      navn: "Charlotte Egnersson",
      stilling: "Medlem",
      epost: "charlotteproeven@hotmail.com",
      telefon: "41351166"
    },
    {
      navn: "Jon Are Haveråen-Brattås",
      stilling: "Medlem",
      epost: "jon.are.br@gmail.com",
      telefon: "91607759"
    }
  ];

  const dommerTeam = [
    {
      navn: "Filippa My Lindgren",
      stilling: "Dommeransvarlig",
      epost: "Kommer snart",
      telefon: "95013931"
    },
    {
      navn: "Bent Rode-Christoffersen",
      stilling: "Dommerkontakt",
      epost: "bent.rode.christoffersen@gmail.com",
      telefon: "90969435"
    }
  ];

  const PersonCard = ({ person, index, delay = 0 }: { person: Person; index: number; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay + index * 0.1 }}
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 flex-shrink-0">
          <User className="w-4 h-4 text-kilred-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-kilsvart text-sm">{person.navn}</h4>
          <p className="text-gray-600 text-xs mb-2">{person.stilling}</p>
          
          {person.epost && (
            <div className="flex items-center text-xs mb-1">
              <Mail className="w-3 h-3 mr-1 text-kilred" />
              <a 
                href={`mailto:${person.epost}`}
                className="text-kilsvart-600 hover:text-kilsvart-800 hover:underline transition-colors"
              >
                {person.epost}
              </a>
            </div>
          )}
          
          {person.telefon && (
            <div className="flex items-center text-xs">
              <Phone className="w-3 h-3 mr-1 text-kilred" />
              <a 
                href={`tel:+47${person.telefon}`}
                className="text-kilsvart-500 hover:text-svart-700 hover:underline transition-colors"
              >
                {person.telefon}
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      
      {/* Header Section */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)] text-white">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-anton font-bold text-anton-4xl md:text-anton-5xl mb-6 text-white tracking-wide uppercase text-center">
              Kontakt oss
            </h1>
            <p className="text-lg text-white font-roboto leading-relaxed">
              Vi hører gjerne fra deg! Enten du er interessert i å bli med i
              klubben, har spørsmål om våre lag, eller ønsker å bidra som
              frivillig, er vi her for å hjelpe!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* General Contact */}
            <div className="mb-8">
              <h2 className="font-anton font-bold text-anton-3xl uppercase mb-4 text-kilsvart">
                Generell kontakt
              </h2>
              <p className="mb-4 text-anton-lg font-roboto leading-relaxed">
                Har du spørsmål om våre lag, treninger eller aktiviteter? Ønsker du informasjon om 
                påmelding eller medlemskap? Vi hjelper deg gjerne videre og setter deg i kontakt med 
                riktige personer.
              </p>
              <p className="mb-4 text-anton-lg font-roboto">
                For generelle henvendelser, send en e-post til{' '}
                <a
                  href="mailto:post@kilhandball.no"
                  className="text-kilred font-semibold hover:underline transition-colors"
                >
                  post@kilhandball.no
                </a>
              </p>
            </div>

            {/* Address */}
            <div className="mb-8">
              <h3 className="font-anton font-bold text-anton-2xl mb-3 text-kilsvart">
                Besøksadresse
              </h3>
              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="w-5 h-5 text-kilred mt-1 flex-shrink-0" />
                <address className="text-anton-lg font-roboto not-italic">
                  Markensvegen 20<br />
                  2212 Kongsvinger
                </address>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.a
                href="mailto:post@kilhandball.no"
                className="flex items-center p-4 bg-kilred-400 border border-kilred-200 rounded-lg hover:bg-kilred-500 transition-colors duration-300 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-white mr-3" />
                <div>
                  <div className="font-semibold text-white">Send e-post</div>
                  <div className="text-sm text-white">Generelle henvendelser</div>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center p-4 bg-kilsvart-50 border border-kilsvart-200 rounded-lg hover:bg-kilsvart-100 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-kilsvart mr-3" />
                <div>
                  <div className="font-semibold text-kilsvart">Ring styreleder</div>
                  <a 
                    href="tel:+4790969435"
                    className="text-sm text-kilsvart-700 hover:underline"
                  >
                    909 69 435
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Map */}
            <div className="w-full">
              <h3 className="text-anton-2xl font-anton font-bold mb-3 text-kilsvart">
                Finn oss
              </h3>
              <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
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
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Organization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Styret */}
            <div>
              <div className="flex items-center mb-4">
                <Gavel className="w-6 h-6 text-kilred mr-3" />
                <h2 className="text-2xl font-anton font-bold text-kilsvart">
                  Styret
                </h2>
              </div>
              <p className="text-gray-700 mb-4 font-roboto">
                Styret er klubbens øverste organ og tar de viktigste beslutningene for klubbens drift og utvikling.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {styremedlemmer.map((medlem, index) => (
                  <PersonCard 
                    key={medlem.navn} 
                    person={medlem} 
                    index={index}
                    delay={0.1}
                  />
                ))}
              </div>
            </div>

            {/* Sportslig utvalg */}
            <div>
              <div className="flex items-center mb-4">
                <FaVolleyballBall className="w-6 h-6 text-kilred mr-3" />
                <h2 className="text-2xl font-anton font-bold text-kilsvart">
                  Sportslig utvalg
                </h2>
              </div>
              <p className="text-gray-700 mb-4 font-roboto">
                Sportslig utvalg har ansvar for den sportslige utviklingen og koordineringen av lagene i klubben.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sportsligUtvalg.map((medlem, index) => (
                  <PersonCard 
                    key={medlem.navn} 
                    person={medlem} 
                    index={index}
                    delay={0.3}
                  />
                ))}
              </div>
            </div>

            {/* Dommerkontakt */}
            <div>
              <div className="flex items-center mb-4">
                <GiWhistle className="w-6 h-6 text-kilred mr-3" />
                <h2 className="text-2xl font-anton font-bold text-kilsvart">
                  Dommerkontakt
                </h2>
              </div>
              <p className="text-gray-700 mb-4 font-roboto">
                Kontaktpersoner for dømming og dommerutvikling i klubben.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dommerTeam.map((medlem, index) => (
                  <PersonCard 
                    key={medlem.navn} 
                    person={medlem} 
                    index={index}
                    delay={0.5}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <section className="py-20 bg-kilred text-white overflow-hidden -mx-[calc((100vw-100%)/2)]">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-anton text-anton-3xl md:text-anton-4xl text-white tracking-wide mb-6 uppercase">
            Ønsker du å engasjere deg?
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-roboto leading-relaxed mb-12 max-w-2xl mx-auto">
            Vi søker alltid etter frivillige som ønsker å bidra til klubbens utvikling. 
                Ta kontakt hvis du er interessert i å være med på laget - enten som trener, 
                dommer, i styret eller på andre måter!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;