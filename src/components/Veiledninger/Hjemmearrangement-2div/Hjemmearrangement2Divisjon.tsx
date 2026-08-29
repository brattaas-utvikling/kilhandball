import React from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  AlertCircle,
  ExternalLink,
  NotebookText
} from 'lucide-react';

const Hjemmearrangement2Divisjon = () => {

  const Badge = ({ type }: { type: 'obligatorisk' | 'anbefalt' }) => (
    <span
      className={`ml-3 px-3 py-1 rounded-full text-xs font-roboto font-semibold uppercase tracking-wide ${
        type === 'obligatorisk'
          ? 'bg-kilred-100 text-kilred-800 border border-kilred-200'
          : 'bg-kilblue-50 text-kilblue border border-blue-200'
      }`}
    >
      {type}
    </span>
  );

  const TaskList = ({ items, dotColor = 'bg-kilred' }: { items: React.ReactNode[]; dotColor?: string }) => (
    <div className="space-y-2">
      {items.map((task, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
          className="flex items-start p-3"
        >
          <div className={`w-2 h-2 ${dotColor} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
          <p className="text-gray-700 text-sm">{task}</p>
        </motion.div>
      ))}
    </div>
  );

  const sections = [
    {
      id: 'sesongprogram',
      title: '1. Sesongprogram som skal inneholde følgende informasjon',
      badge: 'anbefalt' as const,
      color: 'bg-kilred',
      content: (
        <TaskList
          dotColor="bg-kilred"
          items={[
            'Klubben og laget',
            'Serieoppsett inkl. seriemodell',
            'Informasjon om øvrige lag i avdelingen',
            'Klubbens samarbeidspartnere (sponsorer)',
            'Støtteapparat'
          ]}
        />
      )
    },
    {
      id: 'hjemmesider',
      title: '2. Hjemmesider med oppdatert informasjon om',
      badge: 'anbefalt' as const,
      color: 'bg-kilblue',
      content: (
        <TaskList
          dotColor="bg-kilblue"
          items={[
            'Klubben',
            'Spillerstall med faste draktnr',
            'Bilder (enkeltvis og lagbilde)',
            'Serieoppsett med seriemodell.',
            'Forhåndsomtale av kamper / Resultater / kampfakta / kort referat samme dag',
            'Info om samarbeidspartnere.',
            'Info om hjemmehall, adr./beliggenhet, tlf.nr., ankomstmuligheter anbefalt hotell og transport.'
          ]}
        />
      )
    },
    {
      id: 'billetter',
      title: '3. Billetter',
      badge: null,
      color: 'bg-kilblue',
      content: (
        <div className="bg-kilblue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start">
            <Ticket className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-blue-800 text-sm">
              Type billetter (sesongkort, familie, enkeltbilleter og lignende) er opp til hver enkelt klubb.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'markedsforing',
      title: '4. Markedsføring',
      badge: 'anbefalt' as const,
      color: 'bg-kilred',
      content: (
        <TaskList
          dotColor="bg-kilred"
          items={[
            'Minimum ukentlig oppdatering av nettsider og SoMe i sesong. Sak om neste kommende kamp senest dagen før kamp.',
            'Det bør være minimum en annonse i lokal media før hver hjemmekamp.',
            'Det kan utarbeides plakater som slås opp på godt synlige faste plasser.'
          ]}
        />
      )
    },
    {
      id: 'vertskap',
      title: '5. Vertskap',
      badge: 'obligatorisk' as const,
      color: 'bg-kilsvart',
      content: (
        <TaskList
          dotColor="bg-kilsvart"
          items={[
            'Som tar imot Bortelaget',
            'Gi dommerne egen garderobe og bevertning (kaffe / vaffel eller lignende) før kamp samt mineralvann. Følge dommerne i pausen og etter kamp.',
            'Stille ett hvilerom disponibelt for dommerne ved behov.'
          ]}
        />
      )
    },
    {
      id: 'arena',
      title: '6. Arena',
      badge: 'obligatorisk' as const,
      color: 'bg-kilsvart',
      content: (
        <TaskList
          dotColor="bg-kilsvart"
          items={[
            'Passe på at oppvarming kan påbegynnes min 30 min. før kamp (NB! Ikke krav om at dette skal foregå på matchbane 60 min. før kamp)',
            'Skal innrette seg etter arrangør i forhold til innløpning, presentasjon og åpningsseremoni (arr. har maks 10 min. til rådighet).',
            'Presentere sponsorer.',
            'Presentere motstanderlag og spillere',
            'Presentere egne spillere',
            'Presentere dommere',
            'Hjemmelaget etter presentasjon gå til bortelaget og ønske velkommen (hilse)',
            'Lagene kan ha med maskoter (yngre spillere) ut til presentasjon.',
            'Ha Kampspeaker(e)',
            'Åpne Hallen ferdig rigget minimum en halv time før kampstart for publikum.',
            'Spille musikk (etter arrangørens ønske)'
          ]}
        />
      )
    },
    {
      id: 'kampstatistikk',
      title: '7. Kampstatistikk',
      badge: 'obligatorisk' as const,
      color: 'bg-kilsvart',
      content: (
        <div className="space-y-4">
          <TaskList
            dotColor="bg-kilsvart"
            items={[
              'Føre statistikk etter retningslinjer (program) fra NHF føres "live".'
            ]}
          />
          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">NB!</h4>
                <p className="text-gray-700 text-sm">
                  Det presiseres at den signerte live-kamprapporten er det offisielle dokumentet fra kampen, også i forhold til statistikk.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'pause',
      title: '8. Pause',
      badge: 'anbefalt' as const,
      color: 'bg-kilred',
      content: (
        <TaskList
          dotColor="bg-kilred"
          items={['Ha pauseunderholdning']}
        />
      )
    },
    {
      id: 'kampslutt',
      title: '9. Kampslutt',
      badge: 'obligatorisk' as const,
      color: 'bg-kilsvart',
      content: (
        <div className="space-y-4">
          <TaskList
            dotColor="bg-kilsvart"
            items={[
              'Etter kampen, stille opp midt på banen,',
              'Utrope beste bortelagsspiller',
              'Utrope beste hjemmelagsspiller',
              <>
                Takke Dommere, motstander og publikum for kampen.
                <span className="block mt-2 pl-4 text-gray-600">
                  • Spillerne takke hverandre for kampen på rekke mot hverandre
                </span>
              </>,
              'Informere om neste hjemme og bortekamp.',
              'Sjekk kamprapport og last opp live-data til TA.'
            ]}
          />
        </div>
      )
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
            ARRANGEMENTSMAL 2. DIVISJON <br/><span className='text-anton-2xl md:text-anton-3xl font-light'>SESONGEN 2026/27</span>
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
            className="text-lg text-gray-600 font-roboto text-start mx-auto"
          > 
            Mange klubber lager gode arrangement, men erfaringsmessig så er dette varierende i 2. divisjon. NHF ønsker å utvikle arrangementene i 2. divisjon slik at det blir en bedre opplevelse for både de involverte og publikum. Nedenfor kommer en liste med minstekrav som skal oppfylles i alle arrangement (obligatoriske krav), og noen punkter som er anbefalt. Klubbene står selvfølgelig fritt til å gjøre enda mer ut av sine arrangement enn det som kommer frem her.
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
                  <h2 className="text-2xl font-anton font-semibold flex flex-wrap items-center">
                    {section.title}
                    {section.badge && <Badge type={section.badge} />}
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

        {/* Lenker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 px-6 flex flex-wrap gap-3 justify-center"
        >
          <motion.a
            href="https://www.handball.no/system/banedagbok/?venueUnitId=4125"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-kilblue-100 border-2 border-blue-200 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 text-sm font-medium backdrop-blur-sm"
          >
            <NotebookText className="w-4 h-4 mr-2" />
            Banedagbok Tråstadhallen
          </motion.a>
          <motion.a
            href="https://www.handball.no/regioner/nhf-sentralt/praktisk-info/brukerveiledninger/brukerveiledning-handball-live/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 bg-kilblue-100 border-2 border-blue-200 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 text-sm font-medium backdrop-blur-sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Brukerveiledning Håndball LIVE
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
    <div className="w-full h-auto flex items-center justify-center">
                        <img
                          src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68d03bd90025fb011d7f/view?project=68a9f0da0014cb9bd6ad&mode=admin"
                          alt="KIL Håndball Logo"
                          className="w-auto h-1/2 object-contain object-center aspect-video overflow-hidden"
                        />
                      </div>
                      <p className="text-kilsvart-400 text-sm">
            <strong>Kilde:</strong> Norges Håndballforbund
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hjemmearrangement2Divisjon;