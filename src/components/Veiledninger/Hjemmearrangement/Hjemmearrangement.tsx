import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Coffee, 
  Ticket, 
  FileText,
  Video,
  Clock,
  MapPin,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const Hjemmearrangement = () => {

  const sections = [
    {
      id: 'overview',
      title: 'Oversikt - Dugnadsansvarlig',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-kilred',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Lagets dugnadsansvarlig sørger for at følgende oppgaver er ivaretatt:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-kilred-50 p-4 rounded-lg border-l-4 border-kilred">
              <h4 className="font-semibold text-kilsvart mb-2">Kiosk</h4>
              <p className="text-sm text-gray-600">2 personer</p>
            </div>
            <div className="bg-kilblue-50 p-4 rounded-lg border-l-4 border-kilblue">
              <h4 className="font-semibold text-kilsvart mb-2">Billett / Fair Play-vert / Garderober</h4>
              <p className="text-sm text-gray-600">1 person</p>
            </div>
            <div className="bg-kildarkblue-50 p-4 rounded-lg border-l-4 border-kildarkblue">
              <h4 className="font-semibold text-kilsvart mb-2">LIVE</h4>
              <p className="text-sm text-gray-600">1 person</p>
            </div>
            <div className="bg-kilsvart-50 p-4 rounded-lg border-l-4 border-kilsvart">
              <h4 className="font-semibold text-kilsvart mb-2">Sekretariat</h4>
              <p className="text-sm text-gray-600">2 personer</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'kiosk',
      title: 'Kiosk',
      icon: <Coffee className="w-6 h-6" />,
      color: 'bg-kilred',
      content: (
        <div className="space-y-6">
          <div className="bg-kilred-50 border-l-4 border-kilred-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-kilred-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-kilred-800 mb-2">NB! Viktig</h4>
                <p className="text-kilred-700 text-sm">
                  Før du åpner kiosken, se an hvor mange kamper det spilles den aktuelle dagen og beregne vafler og pølser etter det.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-kilsvart mb-3">Oppgaver:</h4>
            {[
              'Kontroller at kassen stemmer',
              'Brygg kaffe og fyll termosene',
              'Sett på pölsekokeren ihht. anvisningene som beskrevet på tavlen i kiosken',
              'Sett frem alle varer, inkl. kaffefløte og syltetöy',
              'Stek vafler'
            ].map((task, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 bg-kilred rounded-full mr-3 flex-shrink-0"></div>
                <p className="text-gray-700">{task}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'billett',
      title: 'Billett / Fair Play-vert / Garderober',
      icon: <Ticket className="w-6 h-6" />,
      color: 'bg-kilblue',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-3" />
              <p className="text-blue-800 font-semibold">Må være til stede 1,5 time før kampstart</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-kilsvart mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-kilblue" />
                Forberedelser
              </h4>
              <div className="space-y-2">
                {[
                  'Lås opp doene ved siden av kiosken',
                  'Lås opp garderobene som skal brukes inkl. dommergarderoben',
                  'Heng opp A4 ark med lagets navn på angitt garderober',
                  'Merk opp minihåndballbaner med ex. Bane 1 osv.',
                  'Ta fram minihåndball mål og feste de enligt anvisning'
                ].map((task, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-kilblue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">{task}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-kilsvart mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2 text-kilblue" />
                Under arrangementet
              </h4>
              <div className="space-y-2">
                {[
                  'Se til at alle garderober er ryddet og dopapir finnes',
                  'Fair play-vert vesten finnes på bakrommet og brukes under hele arrangementet',
                  'Kontroller at billettkassen stemmer'
                ].map((task, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-kilblue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-sm">{task}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sekretariat',
      title: 'Sekretariat',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-kilsvart',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">NB! Viktig</h4>
                <p className="text-gray-700 text-sm">
                  Les nøye på beskrivelsen ved oppsett av sekretariatet som ligger i boksen! Her er det lurt å lære og vise andre foresatte på laget hvordan det skal gjøres – flere som kan, bedre er det!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-kilsvart mb-3">Før kampen</h4>
              {[
                'Forberedelser for dommere',
                'Kontroller at lyd, mikrofon og signalhornet virker',
                'Dele ut Time out kort til begge lagene'
              ].map((task, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="w-2 h-2 bg-kilsvart rounded-full mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">{task}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-kilsvart mb-3">Under kampen</h4>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-kilred-50 to-kilred-100 p-4 rounded-lg border">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Innløp (5 min før kamp):</strong> Lagene løper inn til musikk (eks. Avicii «Levels»)
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>• Presenter bortelag med nummer og navn</li>
                    <li>• Presenter hjemmelaget</li>
                    <li>• Presenter dommerne</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-kilred-50 to-kilred-100 p-3 rounded-lg border border-kilred-200">
                  <p className="text-sm text-gray-700">Les opp malen om Fair Play og NIF's regler mot filming/fotografering</p>
                </div>
                
                <div className="bg-gradient-to-br from-kilred-50 to-kilred-100 p-3 rounded-lg border border-kilred-200">
                  <p className="text-sm text-gray-700">Spill av reklamer fra sponsorer: før kamp, i pausen og etter kamp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'live',
      title: 'LIVE',
      icon: <Video className="w-6 h-6" />,
      color: 'bg-purple',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Viktigt</h4>
                <p className="text-purple-700 text-sm">
                  Her er det lurt og lære og vise andre foresatte på laget hvordan det skal gjøres – flere som kan, bedre er det!
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-600 to-kilblue-600 p-6 rounded-xl text-white shadow-lg"
          >
            <h4 className="font-semibold mb-4 flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Brukerveiledning og Video
            </h4>
            <p className="text-purple-100 mb-4 text-sm">
              Klikk på lenken nedenfor for å få tilgang til brukerveiledning og instruksjonsvideo:
            </p>
            <motion.a 
              href="https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 text-sm font-medium backdrop-blur-sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Åpne brukerveiledning
            </motion.a>
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
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
            ARRANGERE HJEMMEKAMP
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
            className="text-lg text-gray-600 font-roboto max-w-2xl mx-auto"
          >
            Komplett guide for å arrangere hjemmekamper med alle nødvendige oppgaver og ansvarsområder
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="p-6"
            whileHover={{ scale: 1.00 }}
          >
            <p className="text-gray-800 text-sm">
              Ved spørsmål eller usikkerhet, kontakt klubbens dugnadsansvarlig eller styret
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hjemmearrangement;