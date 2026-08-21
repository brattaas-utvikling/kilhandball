import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Award,
} from 'lucide-react';
import { GiWhistle } from 'react-icons/gi';

const Dommere = () => {
  const sections = [
    {
      id: 'hvorfor-dommer',
      title: 'En viktig rolle i håndballen',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Kunne du tenkt deg å lede utøvere i kamp? I håndballen rekrutterer vi dommere i stor grad fra
            håndballklubbene selv - de har gjerne spilt håndball. Kanskje du bare har sett håndball på TV,
            eller har et søsken som spiller i KIL Håndball? Da vil vi gjerne ha tak i deg også!
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ofte kan det være vanskelig å finne frem til hvordan man melder seg på et dommerkurs - i KIL
            Håndball har vi gjort det enklere for deg som vil bli dommer. Ta kontakt med vår dommerkontakt,
            så hjelper vi deg videre.
          </p>

          <div className="bg-gradient-to-br from-kilblue-100 to-kilblue-50 p-6 rounded-xl border border-gray-200">
            <div className="flex items-start">
              <Award className="w-5 h-5 text-kilblue mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  "Regionene har et opplegg for å ivareta deg i din dommergjerningen, sammen med klubbene og dommerkontakt for at du skal få en god start. Vi håper at du vil vurdere å ta opp fløyta, ta på deg drakta og bli en leder for neste generasjon dommer. Ta dommerutdanningen - og du vil utvikle deg som ressurs for håndballen, både på og utenfor banen. "
                </p>
                <p className="text-gray-600 text-sm mt-3 font-semibold">
                  Tim-Nicolai Fjellvang, Dommerutviklingsansvarlig i NHF
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Håndball er en av verdens mest populære idretter, og vekker stor interesse i samfunnet. I
            håndballen er det mange roller som skal fylles, som spiller, leder, trener og ikke minst dommer.
            I KIL Håndball trenger vi dommere som vil være med å skape trygge og gode kamper på alle nivåer.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Som hjelp på veien inn i dommermiljøet vil du få utdanning, praksis og veiledning fra
            instruktører og dommerutviklere for å ta nye steg i din dommerkarriere. I KIL Håndball har vi en
            dommerkontakt og dommeransvarlig som kan hjelpe deg med de praktiske delene av dommergjerningen.
          </p>
        </div>
      )
    },
    {
      id: 'fordeler',
      title: 'Fordeler ved å dømme håndball',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Synes du dette høres interessant ut? Meld din interesse for dommerkurs i dag, og få gjerne med
            en venn eller to! Her er noen av fordelene du får som dommer i KIL Håndball:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Du blir en viktig del av håndballfamilien',
              'Du får personlig utvikling og ledererfaring',
              'Du tjener penger',
              'Arbeidsgivere legger merke til det på din CV',
              'Du bygger nettverk',
              'Du får være i fysisk aktivitet',
              'Du utvikler dine kommunikasjonsferdigheter',
              'Du får en dypere forståelse av håndballspillet',
              'Du får mulighet til å reise og bli kjent med mennesker fra andre deler av landet'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ x: 5 }}
                className="flex items-start p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <CheckCircle className="w-4 h-4 text-kilred-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'malsetting',
      title: '10 aktive dommere i sesongen',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            KIL Håndball har som mål å ha <strong>10 aktive dommere</strong> gjennom hele sesongen. Det er en
            klar økning fra tidligere år, og noe klubben jobber målrettet med sammen med dommerkontakt og
            dommeransvarlig.
          </p>

          <div className="bg-gradient-to-br from-kilsvart-100 to-kilsvart-50 p-6 rounded-xl border border-gray-200">
            <div className="flex items-center mb-3">
              <GiWhistle className="w-5 h-5 text-kilsvart mr-2" />
              <h4 className="font-anton text-kilsvart text-lg">HVORFOR TRENGER VI FLERE DOMMERE?</h4>
            </div>
            <p className="text-gray-700 text-sm">
              Flere aktive dommere gir bedre kampavvikling for alle lagene i klubben, mindre belastning på
              den enkelte dommer, og en tryggere og mer forutsigbar hverdag for både spillere, trenere og
              foresatte. Jo flere vi er, jo bedre blir tilbudet for alle i KIL Håndball.
            </p>
          </div>

        </div>
      )
    },
    {
      id: 'dommerkontakt-ansvarlig',
      title: 'Dommerkontakt og dommeransvarlig',
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            I KIL Håndball har vi to viktige roller som skal gjøre hverdagen enklere for våre dommere:
            dommerkontakten og dommeransvarlig. Ikke nøl med å ta kontakt om du lurer på noe - enten du
            allerede dømmer, eller vurderer å bli dommer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-kildarkblue-50 to-kildarkblue-50 p-5 rounded-lg border border-kildarkblue-200">
              <div className="flex items-center mb-3">

                <h5 className="font-semibold text-kildarkblue-800">Dommerkontakt</h5>
              </div>
              <p className="text-kildarkblue-700 text-sm mb-3">
                Dommerkontakten hjelper deg med de praktiske delene av dommergjerningen.
              </p>
              <p className="text-kildarkblue-800 text-sm font-semibold">Bent Rode-Christoffersen</p>
              <a
                href="mailto:bent.rode.christoffersen@gmail.com"
                className="text-kildarkblue-700 text-sm underline break-all"
              >
                bent.rode.christoffersen@gmail.com
              </a>
            </div>

            <div className="bg-gradient-to-r from-kilred-50 to-kilred-100 p-5 rounded-lg border border-kilred-200">
              <div className="flex items-center mb-3">
                <h5 className="font-semibold text-kilred-800">Dommeransvarlig</h5>
              </div>
              <p className="text-kilred-700 text-sm mb-3">
                Dommeransvarlig har det overordnede ansvaret for dommergruppa i klubben.
              </p>
              <p className="text-kilred-800 text-sm font-semibold">Filippa My Lindgren</p>
              <a
                href="mailto:filippamy08@icloud.com"
                className="text-kilred-700 text-sm underline break-all"
              >
                filippamy08@icloud.com
              </a>
            </div>
          </div>

          <div className="bg-kilsvart-50 border-l-4 border-kilsvart p-4 rounded-r-lg">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-kilsvart-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-kilsvart-800 mb-2">Lurer du på noe?</h4>
                <p className="text-kilsvart-700 text-sm">
                  Send gjerne en e-post til dommerkontakten dersom du vil melde din interesse for dommerkurs,
                  eller om du har spørsmål om dommeroppgaver i KIL Håndball.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen pt-8">
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
            DOMMERE
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
            Bli en del av håndballfamilien som dommer i KIL Håndball. Vi jobber for å ha 10 aktive dommere
            gjennom hele sesongen - og trenger deg med på laget.
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
        {/* <section className="py-20 bg-kilred text-white overflow-hidden -mx-[calc((100vw-100%)/2)] mt-12">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center max-w-5xl mx-auto"
            >
              <h2 className="font-anton text-anton-3xl md:text-anton-4xl text-white tracking-wide mb-6">
                VIL DU BLI DOMMER?
              </h2>
              <p className="text-lg md:text-xl text-white/90 font-roboto leading-relaxed mb-12 max-w-3xl mx-auto">
                For påmelding til dommerkurs eller mer informasjon om å dømme håndball hos KIL Håndball, ta
                kontakt med dommerkontakt Bent Rode-Christoffersen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <motion.a
                  href="mailto:bent.rode.christoffersen@gmail.com"
                  className="font-roboto font-medium bg-white text-kilred hover:bg-kilred hover:text-white hover:border-2 hover:border-white border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg w-full sm:w-auto rounded-lg inline-flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Send e-post til dommerkontakt
                </motion.a>
              </div>
            </motion.div>

          </div>
        </section> */}
      </div>
    </div>
  );
};

export default Dommere;