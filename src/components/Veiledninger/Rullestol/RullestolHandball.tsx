import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Trophy,
  Target,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Shield,
  Award
} from 'lucide-react';

const RullestolHandball = () => {
  const sections = [
    {
      id: 'hva-er',
      title: 'En aktivitet for alle',
      icon: <Heart className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Rullestolhåndball er et breddetilbud hvor alle kan delta, uavhengig av kjønn, alder og funksjonsnivå. 
            Dette er en rask og fartsfylt lagidrett som spilles på ordinære håndballbaner med tilpassede regler.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-kilred/10 border-l-4 border-kilred p-4 rounded-r-lg">
              <h4 className="font-semibold text-kilred-800 mb-2">For alle</h4>
              <p className="text-kilred-700 text-sm">
                Både spillere med funksjonsnedsettelse og funksjonsfriske kan delta på samme lag. 
                Alle må sitte i rullestol og følger samme regelverk.
              </p>
            </div>
            
            <div className="bg-kilblue-50 border-l-4 border-kilblue p-4 rounded-r-lg">
              <h4 className="font-semibold text-kilblue-800 mb-2">Mestring og glede</h4>
              <p className="text-kilblue-700 text-sm">
                Aktiviteten gir fort mestringsfølelse, et lagsmiljø og en sosial aktivitet 
                som engasjerer og gir energi og glede.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-kilsvart-100 to-kilsvart-50 p-6 rounded-xl border border-gray-200">
            <div className="flex items-center mb-3">
              <Trophy className="w-5 h-5 text-kilsvart mr-2" />
              <h4 className="font-anton text-kilsvart text-lg">VEKST I NORGE</h4>
            </div>
            <p className="text-gray-700 text-sm">
              Rullestolhåndball har hatt sterk vekst de siste årene og vi har nå åtte aktive lag i Norge. 
              Det meldes fortsatt om interesse fra flere klubber, og sporten vokser også i Europa.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'spilleregler',
      title: 'Spilleregler og format',
      icon: <Target className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Spillereglene har utgangspunkt i ordinære håndballregler, men er tilpasset rullestolhåndball. 
            Det spilles på ordinær håndballbane (20x40m) med nedsenket tverrligger.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-kilred-100 rounded-lg mr-3">
                    <Users className="w-4 h-4 text-kilred-600" />
                  </div>
                  <h5 className="font-semibold text-kilsvart">6-a-side</h5>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 5 utespillere + 1 målvakt</li>
                  <li>• 2x30 min (serie) / 2x20 min (turnering)</li>
                  <li>• Målvakt kan delta som utespiller</li>
                  <li>• Avkast fra midtpunkt ved scoring</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-kilblue-100 rounded-lg mr-3">
                    <Target className="w-4 h-4 text-kilblue-600" />
                  </div>
                  <h5 className="font-semibold text-kilsvart">4-a-side</h5>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 4 spillere, alle kan være målvakt</li>
                  <li>• Spill i sett: 2x10 min</li>
                  <li>• Raskere spill - ingen avkast</li>
                  <li>• Strengere bestrafning</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r  from-kilred-50 to-kilred-100  p-4 rounded-lg border border-kilred-200">
                <h5 className="font-semibold text-kilred-800 mb-2">Spesielle regler</h5>
                <ul className="text-sm text-kilred-700 space-y-1">
                  <li>• Maks 3 sekunder med ball</li>
                  <li>• Hjulene avgjør inn/ut av bane</li>
                  <li>• Hånd på hjul ved skudd (kontroll)</li>
                  <li>• Ball størrelse 2</li>
                  <li>• Dribbling tillatt</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-kilblue-50 to-kilblue-100 p-4 rounded-lg border border-kilblue-200">
                <h5 className="font-semibold text-kilblue-800 mb-2">4-a-side poeng (2 poeng for:)</h5>
                <ul className="text-kilblue-700 text-sm space-y-1">
                  <li>• 360° vending med mål</li>
                  <li>• Mål på 7-meter</li>
                  <li>• Målvaktsmål innenfor 6m</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'trening',
      title: 'Trening og utvikling',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-kilsvart-100 to-kilsvart-50 p-6 rounded-xl border border-kilsvart-200">
            <h4 className="font-anton text-anton-lg text-kilsvart mb-3 tracking-wide">TRENINGSOPPLEGG</h4>
            <div className="space-y-3">
              <div className="flex items-center text-kilsvart-800">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-semibold">Regelmessige treninger</span>
              </div>
              <p className="text-kilsvart-700 text-sm">
                Fokus på teknikk, taktikk og inkludering. Enkelt å delta uavhengig av tidligere erfaring.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-kilsvart mb-3">Treningsinnhold:</h4>
            {[
              'Grunnleggende ballbehandling og pasninger i rullestol',
              'Bevegelsesteknikk og manøvrering på banen',
              'Taktiske øvelser tilpasset rullestolhåndball',
              'Lagsamarbeid og kommunikasjon',
              'Fair Play og gode holdninger',
              'Forberedelse til turneringer og kamper'
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-start p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="w-2 h-2 bg-kilsvart rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'inkludering',
      title: 'Inkludering og fellesskap',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Et unikt aspekt ved rullestolhåndball er at funksjonsfriske spillere også kan delta. 
            Dette skaper et inkluderende miljø som beriker hele håndballmiljøet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-kilred-100 rounded-lg mr-3">
                  <Users className="w-4 h-4 text-kilred-600" />
                </div>
                <h5 className="font-semibold text-kilsvart">Fellestreniger</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Spillere fra ordinære lag kan delta og bidra til økt kvalitet og variasjon i treningene
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-kilblue-100 rounded-lg mr-3">
                  <Heart className="w-4 h-4 text-kilblue-600" />
                </div>
                <h5 className="font-semibold text-kilsvart">Forståelse</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Skaper forståelse og fellesskap på tvers av ulike forutsetninger og bakgrunn
              </p>
            </div>
          </div>

          <div className="bg-kilsvart-50 border-l-4 border-kilsvart p-4 rounded-r-lg">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-kilsvart-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-kilsvart-800 mb-2">Erfaring viser</h4>
                <p className="text-kilsvart-700 text-sm">
                  Mange håndballentusiaster synes det er både gøy og meningsfullt å delta 
                  på rullestolhåndballtreninger. Det gir nye perspektiver på idretten og skaper varige vennskaper.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'turneringer',
      title: 'Turneringer og landslag',
      icon: <Trophy className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Rullestolhåndball har vokst internasjonalt, og det er etablert turneringer for både 
            klubblag og landslag. Norge etablerte sitt eget rullestollandslag i 2020.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-kilred-50 to-kilred-100 p-4 rounded-lg border border-kilred-200">
              <div className="flex items-center mb-2">
                <Award className="w-4 h-4 text-kilred-600 mr-2" />
                <h5 className="font-semibold text-kilred-800">Nasjonale muligheter</h5>
              </div>
              <p className="text-kilred-700 text-sm">
                Deltakelse i norske mesterskap, turneringer og seriesystem for rullestolhåndball
              </p>
            </div>

            <div className="bg-gradient-to-r from-kilblue-50 to-kilblue-100 p-4 rounded-lg border border-kilblue-200">
              <div className="flex items-center mb-2">
                <Trophy className="w-4 h-4 text-kilblue-600 mr-2" />
                <h5 className="font-semibold text-kilblue-800">Internasjonalt</h5>
              </div>
              <p className="text-kilblue-700 text-sm">
                Europeiske turneringer og mulighet for uttak til landslag for ambisiøse spillere
              </p>
            </div>
          </div>

          <div className="bg-kilsvart-50 p-4 rounded-lg border-l-4 border-kilsvart">
            <div className="flex items-start">
              <Star className="w-5 h-5 text-kilsvart-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-kilsvart-800 mb-1">Landslag</h4>
                <p className="text-kilsvart-800 text-sm">
                  Ambisiøse spillere som ønsker å trene og utfordre seg ekstra kan få mulighet 
                  til uttak og deltakelse på landslaget.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'praktisk',
      title: 'Lisens og forsikring',
      icon: <Shield className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Norges Håndballforbund dekker lisens for alle registrerte rullestolhåndballag, 
            og spillerne er dekket av forsikring gjennom Gjensidige.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-kilred-100 rounded-lg mr-3">
                  <Shield className="w-4 h-4 text-kilred-600" />
                </div>
                <h5 className="font-semibold text-kilsvart">Gratis lisens</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Lagene og spillerne betaler ikke personlig lisens - dette dekkes av NHF
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-kilblue-100 rounded-lg mr-3">
                  <CheckCircle className="w-4 h-4 text-kilblue-600" />
                </div>
                <h5 className="font-semibold text-kilsvart">Forsikring</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Skader i forbindelse med trening eller kamper dekkes av Gjensidige (polise 82017958)
              </p>
            </div>
          </div>

          <div className="bg-kilsvart-50 border-l-4 border-kilsvart p-4 rounded-r-lg">
            <h4 className="font-semibold text-kilsvart-800 mb-2">Viktig å huske</h4>
            <ul className="text-kilsvart-700 text-sm space-y-1">
              <li>• Spillere må være registrert i klubben for forsikringsdekning</li>
              <li>• Spillelister oppdateres årlig innen 1. desember</li>
              <li>• Kontinuerlig oppdatering når nye spillere kommer til</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen pt-8">
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
            RULLESTOL&shy;HÅNDBALL
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
            En inkluderende aktivitet for alle - uavhengig av kjønn, alder og funksjonsnivå. 
            Rask og fartsfylt lagidrett som gir mestringsfølelse og fellesskap.
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
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Section Header */}
              <div className="px-6 py-4">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    whileHover={{ rotate: 5 }}
                  >
                    {React.cloneElement(section.icon, { className: "w-6 h-6 text-kilred-300" })}
                  </motion.div>
                  <h2 className="text-2xl font-anton font-semibold text-kilsvart">
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Section Content */}
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

        {/* Contact Section */}
        <section className="py-20 bg-kilred text-white overflow-hidden -mx-[calc((100vw-100%)/2)] mt-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <h2 className="font-anton text-anton-3xl md:text-anton-4xl text-white tracking-wide mb-6">
                INTERESSERT I Å DELTA?
              </h2>
              <p className="text-lg md:text-xl text-white/90 font-roboto leading-relaxed mb-12 max-w-2xl mx-auto">
                For påmelding eller mer informasjon om rullestolhåndball hos Kongsvinger IL Håndball, 
                ta kontakt med oss. Vi arrangerer jevnlig prøvetreninger og informasjonsmøter.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <motion.a
                  href="tel:91607759"
                  className="font-roboto font-medium bg-white text-kilred hover:bg-kilred hover:text-white hover:border-2 hover:border-white border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg w-full sm:w-auto rounded-lg inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Ring 916 07 759
                </motion.a>
                
                <motion.a
                  href="mailto:post@kilhandball.no"
                  className="font-roboto font-medium border-2 border-white text-white hover:bg-white hover:text-kilred px-8 py-4 text-lg w-full sm:w-auto rounded-lg inline-flex items-center justify-center transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Send e-post
                </motion.a>
              </div>

            </motion.div>
                    {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="p-6"
          >
            <p className="text-gray-100 text-base font-roboto mb-2">
              <strong>Kongsvinger IL Håndball</strong>
            </p>
            <p className="text-gray-50 text-sm font-roboto">
              Inkluderende håndball for alle - uansett forutsetninger
            </p>
                          
            <p className="text-gray-50 font-roboto text-sm mt-8">
                Kontakt: Sportslig utvalg
              </p>
          </motion.div>
        </motion.div>
          </div>
        </section>



      </div>
    </div>
  );
};

export default RullestolHandball;