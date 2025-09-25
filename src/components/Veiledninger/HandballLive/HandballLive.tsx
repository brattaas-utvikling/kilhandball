import React from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Users, 
  Trophy,
  Settings,
  Shield,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const HandballLive = () => {
  const sections = [
    {
      id: 'intro',
      title: 'Håndball Live',
      icon: <Video className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Informasjon og brukerveiledninger for føring av kamphendelser i LIVE-admin.
          </p>
        </div>
      )
    },
    {
      id: 'live-typer',
      title: 'De ulike LIVE-versjonene',
      icon: <Settings className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Det er tre ulike typer LIVE det kan plottes under en kamp:
          </p>

          {/* Standard versjon */}
          <div className="bg-gradient-to-r from-kilblue-50 to-kilblue-100 p-6 rounded-xl border border-kilblue-200">
            <h4 className="font-bold font-anton text-anton-lg text-kilblue mb-3 tracking-wide">STANDARD VERSJON</h4>
            <div className="space-y-2">
              <div className="flex items-center text-kilblue-800">
                <Trophy className="w-4 h-4 mr-2" />
                <span className="font-semibold">Digital kamprapport</span>
              </div>
              <p className="text-kilblue-700 text-sm">
                Brukes i klassene 13 år - Senior
              </p>
            </div>
          </div>

          {/* Enkel versjon */}
          <div className="bg-gradient-to-r from-kilred-50 to-kilred-100 p-6 rounded-xl border border-kilred-200">
            <h4 className="font-bold font-anton text-anton-lg text-kilred mb-3 tracking-wide">ENKEL VERSJON</h4>
            <div className="space-y-2">
              <div className="flex items-center text-kilred-800">
                <Users className="w-4 h-4 mr-2" />
                <span className="font-semibold">Digital kamprapport</span>
              </div>
              <p className="text-kilred-700 text-sm">
                Kun registrere målscore lag, som kampur i hallen
              </p>
              <p className="text-kilred-700 text-sm">
                Brukes i klassene 12 år og yngre
              </p>
            </div>
          </div>

          {/* Avansert versjon */}
          <div className="bg-gradient-to-r from-kilsvart-50 to-white-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold font-anton text-anton-lg text-kilsvart mb-3 tracking-wide">AVANSERT VERSJON</h4>
            <div className="space-y-2">
              <div className="flex items-center text-kilsvart">
                <Shield className="w-4 h-4 mr-2" />
                <span className="font-semibold">Føre hendelser for statistikk</span>
              </div>
              <p className="text-gray-700 text-sm">
                (parallelt med Digital kamprapport)
              </p>
              <p className="text-gray-700 text-sm">
                Brukes i NHFs serier
              </p>
            </div>
          </div>

          <div className="bg-kilblue-50 border-l-4 border-kilblue p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-kilblue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-kilblue-800 mb-2">Viktig informasjon</h4>
                <p className="text-kilblue-700 text-sm">
                  Det er de som administrerer de ulike kamptilbudene (NHF sentralt/Regioner) som setter opp hvilke type LIVE en skal føre.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tilgang',
      title: 'Tilgang til LIVE',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            For å ha tilgang til å kunne plotte/føre LIVE må en ha en bruke klubbens LIVE-bruker, eller ha følgende funksjoner knyttet til egen bruker i MinIdrett:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-kilred-100 rounded-lg mr-3">
                  <Video className="w-4 h-4 text-kilred-600" />
                </div>
                <h5 className="font-semibold text-kilsvart">Kamper LIVE</h5>
              </div>
              <p className="text-gray-600 text-sm">(tilknyttet involvert klubb eller lag)</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-kilblue-100 rounded-lg mr-3">
                  <Users className="w-4 h-4 text-kilblue-600" />
                </div>
                <h5 className="font-semibold text-kilsvart">Kampansvarlig</h5>
              </div>
              <p className="text-gray-600 text-sm">(tilknyttet involvert klubb eller lag)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'publikum',
      title: 'Publikumstilgang',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
<p className="text-gray-700 leading-relaxed">
  Kampene som føres i LIVE-admin kan publikum følge fra websiden{' '}
  <a 
    href="https://www.handball.no/system/live-kamper/?regionId=372&date=0" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-kilblue hover:text-kilblue-700 underline transition-colors duration-200"
  >
    Håndball LIVE
  </a>
  {' '}(link finnes også for hver enkelt kamp i app'en{' '}
  <a 
    href="https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-min-handball/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-kilblue hover:text-kilblue-700 underline transition-colors duration-200"
  >
    MinHåndball
  </a>
  ), dersom administrerende org. (NHF sentralt/Regioner) har gjort det tilgjengelig.
</p>
        </div>
      )
    }
  ];

  const liveLinks = [
    {
      title: 'Digital kamprapport - Standard versjon (13 år og eldre)',
      url: 'https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/standard-22.0/', // Placeholder URL
    },
    {
      title: 'Digital Kamprapport - Enkel versjon (12 år og yngre)',
      url: 'https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/live-enkel/', // Placeholder URL
    },
    {
      title: 'Avansert versjon - for plottere',
      url: 'https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/avansert-2.0/', // Placeholder URL
    },
    {
      title: 'Enheter en kan føre LIVE',
      url: 'https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/enheter-en-kan-fore-live/', // Placeholder URL
    },
    {
      title: 'Dommers ansvar tilknyttet Digital kamprapport',
      url: 'https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/dommers-ansvar/', // Placeholder URL
    },
    {
      title: 'Regel 18 - Tidtakeren og sekretæren i Spilleregler Håndball',
      url: 'https://www.handball.no/regioner/nhf-sentralt/praktisk-info/lover-og-regler/spilleregler-handball/#Regel_18_-_Tidtakeren_og_sekret%C3%A6ren', // Placeholder URL
    },
    {
      title: 'Endringslogg LIVE Håndball 2.0',
      url: 'https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/endringslogg-2.0/', // Placeholder URL
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-anton-4xl md:text-anton-5xl font-anton text-kilsvart mb-4"
          >
            HÅNDBALL LIVE
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-kilsvart mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-gray-600 font-roboto max-w-3xl mx-auto leading-relaxed"
          >
            Informasjon og brukerveiledninger for føring av kamphendelser i LIVE-admin
          </motion.p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden"
            >
              {/* Section Header */}
              <div className="">
                <div className="flex items-center space-x-4 text-kilsvart text-anton-xl">
                  <motion.div 
                    className="p-3"
                    whileHover={{ rotate: 5 }}
                  >
                    {React.cloneElement(section.icon, { className: "w-6 h-6" })}
                  </motion.div>
                  <h2 className="text-2xl font-anton font-semibold">
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Section Content - Always visible */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-6"
              >
                {section.content}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-anton font-semibold text-kilsvart mb-4">
              SE OGSÅ:
            </h3>
          </div>

          <div className="space-y-4">
            {liveLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.00 }}
                className="block bg-kilred-300 border border-kilred-400 rounded-lg p-4 text-white hover:bg-kilred-400 hover:border-kilred-500 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white group-hover:text-white">
                    {link.title}
                  </span>
                  <ExternalLink className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
    <div className="w-full h-auto flex items-center justify-center">
                        <img
                          src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68d03bd90025fb011d7f/view?project=68a9f0da0014cb9bd6ad&mode=admin"
                          alt="KIL Håndball Logo"
                          className="w-auto h-1/2 object-contain object-center aspect-video overflow-hidden"
                        />
                      </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HandballLive;