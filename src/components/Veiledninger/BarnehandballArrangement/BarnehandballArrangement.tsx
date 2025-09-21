import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Trophy,
  Mic,
  Camera,
  Music,
  Heart,
  Target,
  Gift,
  AlertCircle,
  Star,
  Gamepad2,
  Castle,
  FerrisWheel,
  Palette,
  Shirt,
  HeartHandshake,
  Smile
} from 'lucide-react';

const BarnehandballArrangement = () => {
  const sections = [
    {
      id: 'barneidrett',
      title: 'Barneidrett',
      icon: <Heart className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Barneidrett er idrettsaktivitet for barn til og med det året de fyller 12 år. 
            Idrettens barnerettigheter gjelder for alle barn, uten forskjellsbehandling og 
            uten hensyn til barnet og dets foreldres kjønn, etniske bakgrunn, livssyn, 
            seksuell orientering, vekt/fysiske utvikling og funksjonshemning.
          </p>
          <div className="bg-kilblue-50 p-4 rounded-lg border-l-4 border-kilblue">
            <p className="text-kilblue-800 text-sm">
              <strong>Kilde:</strong> Norges Idrettsforbund - 
              <a href="https://www.idrettsforbundet.no/tema/barneidrett/" className="underline ml-1">
                idrettsforbundet.no/tema/barneidrett/
              </a>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'arrangement',
      title: 'Hvordan arrangere barnehåndball',
      icon: <Users className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-kilred-50 border-l-4 border-kilred p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-kilred-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-kilred-800 mb-2">Forberedelser</h4>
                <p className="text-kilred-700 text-sm">
                  Klubbene henter selv ut oversikt over kampene fra <strong>handball.no</strong>: 
                  Velg kamper og banedagbok og deretter fylke, anlegg og dato.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-kilsvart mb-3">Generelle krav:</h4>
            {[
              'Sett opp et hovdesekretariat lett synlig for lagene',
              'Laglederne henvender seg her ved ankomst',
              'Ha en arrangementsansvarlig til stede i hallen til enhver tid',
              'Ha en Fair Play-vert ikledd Fair Play-vest i hallen',
              'Skriv ut og del ut Foreldrevett-kort i arenaen'
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-start p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="w-2 h-2 bg-kilblue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'arrangement-typer',
      title: 'Arrangement etter aldersgruppe',
      icon: <Trophy className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          {/* 4'er arrangement */}
          <div className="bg-gradient-to-r from-kilred-50 to-kilred-100 p-6 rounded-xl border border-kilred-200">
            <h4 className="font-bold font-anton text-anton-lg text-kilred mb-4 tracking-wide">4'ER ARRANGEMENT</h4>
            <div className="space-y-3">

              <p className="text-kilred-700 text-sm">
              Her er det ønskelig at arrangøren har både en arrangementsansvarlig og en
dommerkontakt til stede i hallen. Dommerkontakten skal sørge for at barnekamplederne
(dommerne) er godt kjent med reglementet, og at de er sin veilederrolle bevisst.
Arrangementsansvarlig har ansvar for at tilreisende lag med spillere, lagledere og
foreldre får en god opplevelse i hallen.
Arrangørklubb bør alltid ha en Fair Play-vert, ikledd Fair Play-vest, i hallen som skal
sørge for at arrangementet gjennomføres etter Fair Play-prinsippene. Dette kan gjerne
være arrangementsansvarlig. Skriv ut Foreldrevett-kort og del ut i arenaen.
              </p>
            </div>
          </div>

          {/* 5'er arrangement */}
          <div className="bg-gradient-to-r from-kilblue-50 to-kilblue-100 p-6 rounded-xl border border-kilblue-200">
            <h4 className="font-bold font-anton text-anton-lg text-kilblue mb-4 tracking-wide">5'ER ARRANGEMENT</h4>
            <div className="space-y-3">
              <p className="text-kilblue-700 text-sm">
              Her er det ønskelig at arrangøren har en arrangementsansvarlig til stede i hallen.
Dommerkontakten i klubben plikter på forhånd å sørge for at barnekamplederne
(dommerne) er godt kjent med reglementet, og at de er sin veilederrolle bevisst.
Arrangementsansvarlig har ansvar for at tilreisende lag med spillere, lagledere og
foreldre får en god opplevelse i hallen.
Arrangørklubb bør alltid ha en Fair Play-vert, ikledd Fair Play-vest, i hallen som skal
sørge for at arrangementet gjennomføres etter Fair Play-prinsippene. Dette kan gjerne
være arrangementsansvarlig. Skriv ut Foreldrevett-kort og del ut i arenaen.
I tillegg bør det være en kampvert i sekretariatet.
              </p>
            </div>
          </div>

          {/* 6'er arrangement */}
          <div className="bg-gradient-to-r from-kilsvart-50 to-white-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold font-anton text-anton-lg text-kilsvart mb-4 tracking-wide">6'ER ARRANGEMENT</h4>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm">
              Her er det ønskelig at arrangøren har en arrangementsansvarlig til stede i hallen.
Arrangementsansvarlig har ansvar for at tilreisende lag med spillere, lagledere og
foreldre får en god opplevelse i hallen.
I tillegg skal det være en sekretær og tidtaker i sekretariatet, lagene skal ha lagt inn
kamptropp og det føres enkel føring i LIVE. Det oppfordres til at enda flere klubber selv
setter opp dommere i 10 – 11 år – 5’ er- og 6’er håndball. De klubbene som selv setter
opp dommere i 10-11 år blir belønnet med 2 dommerkvoter. Regionen setter opp
dommere på 12 års kamper.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'aktiviteter-for',
      title: 'Aktiviteter før kamp',
      icon: <Star className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 text-sm mb-4">
          Før, under og etter kamp er det ulike aktiviteter man kan gjøre for å skape motivasjon og
glede for barna. I tillegg kan morsomme og kontinuerlige aktiviteter være med på å
skape en rød tråd i klubbens arrangementer. Eksempler på aktiviteter før, under og etter
kamp:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <Heart className="w-4 h-4" />,
                title: 'Inngangsparti',
                desc: 'Lag et hyggelig inngangsparti med ulike ting som bannere, en maskot som ønsker velkommen eller andre lignende elementer for å ønske lagene velkommen på en annerledes måte.'
              },
              {
                icon: <Users className="w-4 h-4" />,
                title: 'Felles oppvarming',
                desc: 'Oppfordre til en felles oppvarming for lagene, eksempelvis ute på gresset eller et område i nærheten, eller en felles seanse inne i hallen med passende musikk og aktivitet.'
              },
              {
                icon: <Camera className="w-4 h-4" />,
                title: 'Fotovegg',
                desc: 'Sett opp en fotovegg med f.eks. logoen til klubben, malt masse håndballer på et stort laken som henges opp, tegne en stor håndballbane på et laken eller ta bilde med klubbens maskot.'
              },
              {
                icon: <Mic className="w-4 h-4" />,
                title: 'Innløp med speaker',
                desc: 'Dersom det er mulig synes de aller fleste at det er stas med innløping til kampen og opplesing av navn på spillerne. Få gjerne speaker til å gjøre dette.'
              },
              {
                icon: <Music className="w-4 h-4" />,
                title: 'Musikk/DJ',
                desc: 'Ha en DJ på de største rundene, eller spill musikk som spillerne selv har fått lov til å ønske seg. Dette skaper god stemning.'
              },
              {
                icon: <Target className="w-4 h-4" />,
                title: 'Tipp resultat',
                desc: 'Ha en stand der man kan tippe resultat i de ulike kampene, x-antall riktige resultat gir premie.'
              }
            ].map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-kilred-100 rounded-lg mr-3">
                    {React.cloneElement(activity.icon, { className: "w-4 h-4 text-kilred-600" })}
                  </div>
                  <h5 className="font-semibold text-kilsvart">{activity.title}</h5>
                </div>
                <p className="text-gray-600 text-sm">{activity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'aktiviteter-under',
      title: 'Aktiviteter under kamp',
      icon: <Gamepad2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <Smile  className="w-4 h-4" />,
                title: 'Maskot',
                desc: 'Ha en maskot som danser med barn og heier på sidelinjen, samt bidrar til underholdning i pausen. Utdeling av giveaways etc.'
              },
              {
                icon: <Music className="w-4 h-4" />,
                title: 'Pauseunderholdning',
                desc: 'Tilrettelegg for en morsom pauseaktivitet eller konkurranse. Sett på musikk og ha en danselek, stolleken med barn i hallen etc.'
              },
              {
                icon: <Mic className="w-4 h-4" />,
                title: 'Speaker',
                desc: 'Ha en speaker som kan få opp stemningen i hallen, og hei frem alle lagene. Speakeren bør også informere om kampene, spilletid og Fair Play.'
              },
              {
                icon: <Users className="w-4 h-4" />,
                title: 'Pausedansing',
                desc: 'Få publikum til å danse en dans i pausen. F.eks. «floss dance».'
              }
            ].map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-kilblue-100 rounded-lg mr-3">
                    {React.cloneElement(activity.icon, { className: "w-4 h-4 text-kilblue-600" })}
                  </div>
                  <h5 className="font-semibold text-kilsvart">{activity.title}</h5>
                </div>
                <p className="text-gray-600 text-sm">{activity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'aktiviteter-etter',
      title: 'Aktiviteter etter kamp',
      icon: <Gift className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <HeartHandshake className="w-4 h-4" />,
                title: 'Takk for kampen',
                desc: 'Gjør som landslaget, og still opp på linje og takk motstanderlaget for kampen.'
              },
              {
                icon: <Target className="w-4 h-4" />,
                title: 'Skuddvegg',
                desc: 'Utnytt gjerne den delen av banen som er igjen når det spilles håndball. Bruk målet som ikke er i bruk og heng opp en skuddvegg e.l.'
              },
              {
                icon: <Shirt className="w-4 h-4" />,
                title: 'Lag din egen drakt',
                desc: 'Få en sponsor/leverandør til å donere helt hvite t-skjorter/drakter og tilrettelegg for et male-verksted der man kan male sin egen drakt.'
              },
              {
                icon: <Palette className="w-4 h-4" />,
                title: 'Ansiktsmaling',
                desc: 'Arranger ansiktsmaling, der barna kan bli malt i valgfritt motiv eller f. eks i klubbens farger.'
              }
            ].map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-kilred-100 rounded-lg mr-3">
                    {React.cloneElement(activity.icon, { className: "w-4 h-4 text-kilred-600" })}
                  </div>
                  <h5 className="font-semibold text-kilsvart">{activity.title}</h5>
                </div>
                <p className="text-gray-600 text-sm">{activity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'annet',
      title: 'Andre aktiviteter',
      icon: <Gamepad2 className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <Gift className="w-4 h-4" />,
                title: 'Stands',
                desc: 'Sett opp en stand, f.eks. Intersport for 4’er håndballen, og ha ulike aktiviteter/konkurranser der man kan vinne premier. F.eks.: Skuddvegg, ballkasting osv., der man kan vinne et gavekort, eller rabattkode.'
              },
              {
                icon: <Castle className="w-4 h-4" />,
                title: 'Hoppeslott',
                desc: 'Utnytt gjerne den delen av banen som er igjen når det spilles håndball. Hoppeslott er alltid en populær aktivitet.'
              },
              {
                icon: <FerrisWheel className="w-4 h-4" />,
                title: 'Lykkehjul',
                desc: 'Spinn lykkehjulet og vinn premier og giveaways fra samarbeidspartnere.'
              }
            ].map((activity, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-kilblue-100 rounded-lg mr-3">
                    {React.cloneElement(activity.icon, { className: "w-4 h-4 text-kilblue-600" })}
                  </div>
                  <h5 className="font-semibold text-kilsvart">{activity.title}</h5>
                </div>
                <p className="text-gray-600 text-sm">{activity.desc}</p>
              </motion.div>
            ))}
          </div>
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
            BARNEHÅNDBALLARRANGEMENT
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-kilsvart mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-gray-600 font-roboto max-w-3xl mx-auto leading-relaxed"
          >
            Hvordan gjennomføre vellykkede barnehåndball-arrangement
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
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="p-6"
            whileHover={{ scale: 1.00 }}
          >
    <div className="w-full h-auto flex items-center justify-center">
                        <img
                          src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68d03bd90025fb011d7f/view?project=68a9f0da0014cb9bd6ad&mode=admin"
                          alt="KIL Håndball Logo"
                          className="w-auto h-1/2 object-contain object-center aspect-video overflow-hidden"
                        />
                      </div>
          </motion.div>
                  {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="bg-kilblue-50 border border-kilblue-200 rounded-xl p-4 mb-8 text-center"
        >
          <p className="text-kilblue-800 text-sm">
            <strong>Kilde:</strong> Norges Håndballforbund - Guide for barnehåndballarrangement
          </p>
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BarnehandballArrangement;