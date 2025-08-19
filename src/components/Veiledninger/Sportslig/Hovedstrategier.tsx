import { motion } from 'framer-motion';

const Hovedstrategier = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Trening - hovedstrategier</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      >
        {/* Desktop View - Vertical Split Layout */}
        <div className="hidden md:block">
          {/* Rekrutteringsperiode - Top Section */}
          <div>
            <div className="bg-kilred text-white p-4">
              <h3 className="font-bold text-lg text-center">Rekrutteringsperiode</h3>
            </div>
            
            <div className="grid grid-cols-2">
              {/* Age groups header */}
              <div className="bg-kilred/60 text-white p-3 text-center border-r border-white">
                <span className="font-bold text-sm lg:text-base">6 - 10 år</span>
              </div>
              <div className="bg-kilred/60 text-white p-3 text-center">
                <span className="font-bold text-sm lg:text-base">11 - 12 år</span>
              </div>

              {/* Content cells */}
              {/* 6-10 år */}
              <div className="bg-gray-50 p-4 border-r border-gray-200 min-h-[200px]">
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    <strong>Utvikle grunnleggende motoriske og fysiske forutsetninger.</strong>
                  </p>
                  <p className="text-gray-700">
                    Leker som øver grunnleggende håndballteknikk samt har øvelser som øker trivsel og håndballinteresse.
                  </p>
                  <p className="text-kilblue font-medium italic">
                    <strong>Oppgaveorientert læringsmiljø</strong>
                  </p>
                </div>
              </div>

              {/* 11-12 år */}
              <div className="bg-white p-4 min-h-[200px]">
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    <strong>Bevisst egen ferdighetsutvikling</strong>
                  </p>
                  <p className="text-gray-700">
                    Ulike spilleplasser
                  </p>
                  <p className="text-gray-700">
                    Allsidig fysisk og teknisk trening
                  </p>
                  <p className="text-gray-700">
                    Kamper er uhøytidelige
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Talentutviklingsperiode - Bottom Section */}
          <div className="border-t-4 border-kilred">
            <div className="bg-kilred text-white p-4">
              <h3 className="font-bold text-lg text-center">Talentutviklingsperiode</h3>
            </div>
            
            <div className="grid grid-cols-2">
              {/* Age groups header */}
              <div className="bg-kilred/60 text-white p-3 text-center border-r border-white">
                <span className="font-bold text-sm lg:text-base">13 - 14 år</span>
              </div>
              <div className="bg-kilred/60 text-white p-3 text-center">
                <span className="font-bold text-sm lg:text-base">15 - 16 år</span>
              </div>

              {/* Content cells */}
              {/* 13-14 år */}
              <div className="bg-gray-50 p-4 border-r border-gray-200 min-h-[160px]">
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    <strong>Utvikle evne til å gjennomføre systematisk trening med langsiktige utviklingsmål</strong>
                  </p>
                  <p className="text-gray-700">
                    Små spilltrening med hensikt
                  </p>
                  <p className="text-gray-700">
                    Opplæring i egentrening (kast, utholdenhet og styrke)
                  </p>
                </div>
              </div>

              {/* 15-16 år */}
              <div className="bg-white p-4 min-h-[160px]">
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    <strong>God treningsuke, innhold som utvikler og utfordrer "fysisk-teknisk-kamp"</strong>
                  </p>
                  <p className="text-gray-700">
                    Godt, utfordrende og tilpasset kamptilbud
                  </p>
                  <p className="text-gray-700">
                    Lære å forberede, gjennomføre og evaluere konkurranse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden">
          <div className="space-y-4">
            {/* Rekrutteringsperiode */}
            <div>
              <div className="bg-kilred/80 text-white p-3">
                <h3 className="font-bold text-center">Rekrutteringsperiode</h3>
              </div>
              
              {/* 6-10 år */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 p-4 border-x border-gray-200"
              >
                <h4 className="font-bold text-kilred mb-2">6 - 10 år</h4>
                <div className="space-y-2 text-sm">
                  <p>Utvikle grunnleggende motoriske og fysiske forutsetninger.</p>
                  <p>Leker som øver grunnleggende håndballteknikk samt har øvelser som øker trivsel og håndballinteresse.</p>
                  <p className="text-kilblue font-medium italic"><strong>Oppgaveorientert læringsmiljø</strong></p>
                </div>
              </motion.div>

              {/* 11-12 år */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white p-4 border border-gray-200"
              >
                <h4 className="font-bold text-kilred mb-2">11 - 12 år</h4>
                <div className="space-y-2 text-sm">
                  <p>Bevisst egen ferdighetsutvikling</p>
                  <p>Ulike spilleplasser</p>
                  <p>Allsidig fysisk og teknisk trening</p>
                  <p>Kamper er uhøytidelige</p>
                </div>
              </motion.div>
            </div>

            {/* Talentutviklingsperiode */}
            <div>
              <div className="bg-kilred text-white p-3">
                <h3 className="font-bold text-center">Talentutviklingsperiode</h3>
              </div>
              
              {/* 13-14 år */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gray-50 p-4 border-x border-gray-200"
              >
                <h4 className="font-bold text-kilred mb-2">13 - 14 år</h4>
                <div className="space-y-2 text-sm">
                  <p>Utvikle evne til å gjennomføre systematisk trening med langsiktige utviklingsmål</p>
                  <p>Små spilltrening med hensikt</p>
                  <p>Opplæring i egentrening (kast, utholdenhet og styrke)</p>
                </div>
              </motion.div>

              {/* 15-16 år */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white p-4 border border-gray-200 rounded-b-lg"
              >
                <h4 className="font-bold text-kilred mb-2">15 - 16 år</h4>
                <div className="space-y-2 text-sm">
                  <p>God treningsuke, innhold som utvikler og utfordrer "fysisk-teknisk-kamp"</p>
                  <p>Godt, utfordrende og tilpasset kamptilbud</p>
                  <p>Lære å forberede, gjennomføre og evaluere konkurranse</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lenke under tabellen */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 text-center"
      >
        <a
          href="https://www.idrettsforbundet.no/tema/barneidrett/bestemmelser-om-barneidrett/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-kilblue hover:bg-kilblue/80 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Les mer om spilleregler for barneidrett
        </a>
      </motion.div>
    </div>
  );
};

export default Hovedstrategier;