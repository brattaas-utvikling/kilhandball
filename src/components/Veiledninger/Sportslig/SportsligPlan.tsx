import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Menu, X, Target, Users, Award, BookOpen } from 'lucide-react';
import SpillformOgBanestorrelse from './SpillformOgBanestorrelse';
import Hovedstrategier from './Hovedstrategier';
import Hospiteringstabell from './Hospiteringstabell';
import AldersgrupperStrategiertabell from './AldersgrupperStrategiertabell';

const SportsligPlan = () => {
  const [activeSection, setActiveSection] = useState('');
  const [tocOpen, setTocOpen] = useState(false);

  // Table of Contents data
  const sections = [
    { id: 'innledning', title: 'Innledning' },
    { id: 'lojalitet', title: 'Lojalitet til sportsplanen' },
    { id: 'vare-mal', title: 'Våre mål' },
    { id: 'lover-regler', title: 'Lover og regler' },
    { id: 'trener-rolle', title: 'Trener- og laglederrollen' },
    { id: 'forventninger', title: 'Hva forventer KIL Håndball av deg som trener?' },
    { id: 'trenervett', title: 'Trenervett i barne- og ungdomshåndballen' },
    { id: 'trenerroller', title: 'Forskjellige trenerroller' },
    { id: 'kompetanse', title: 'Utvikling/kompetansekrav for trener' },
    { id: 'fair-play', title: 'Fair Play' },
    { id: 'lagsorganisering', title: 'Lagsorganisering' },
    { id: 'barnehandball', title: 'Barnehåndball' },
    { id: 'ungdomshandball', title: 'Ungdomshåndball' },
    { id: 'differensiering', title: 'Differensiering' },
    { id: 'hospitering', title: 'Hospitering' },
    { id: 'retningslinjer', title: 'Retningslinjer' },
    { id: 'turneringer', title: 'Turneringsdeltagelse' },
    { id: 'dommer', title: 'Dommer i KIL håndball' },
    { id: 'kjoreregler', title: 'Kjøreregler' }
  ];

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTocOpen(false);
    }
  };

  // Track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:flex lg:gap-8">
        {/* Desktop Sidebar TOC */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-lg shadow-md p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h3 className="text-lg font-bold text-kilsvart mb-4 flex items-center">
              <BookOpen size={20} className="mr-2 text-kilred" />
              Innholdsfortegnelse
            </h3>
            <nav className="space-y-2">
              {sections.map(({ id, title }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    activeSection === id
                      ? 'bg-kilred text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile TOC Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex items-center justify-between w-full bg-white rounded-lg shadow-md p-4 text-kilsvart"
          >
            <span className="flex items-center font-medium">
              <BookOpen size={20} className="mr-2 text-kilred" />
              Innholdsfortegnelse
            </span>
            {tocOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {tocOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-md mt-2 p-4 space-y-2"
            >
              {sections.map(({ id, title }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    activeSection === id
                      ? 'bg-kilred text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {title}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-kilred to-kilred/80 text-white rounded-lg p-8 mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">SPORTSPLAN KIL HÅNDBALL</h1>
            <p className="text-lg opacity-90 leading-relaxed">
              Et styringsverktøy som inneholder klubbens visjon, grunnleggende prinsipp, mål og gjeldende strategier. 
              Strategier er overordnede, langsiktige og handler om retning og veivalg. Denne planen er det <span className='font-bold'>første</span> steget mot klubbens sportsplan.
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-8">
            <ContentSection
              id="innledning"
              title="Innledning"
              icon={<BookOpen size={24} />}
            >
              <p className="text-gray-700 leading-relaxed">
                I håndballklubben jobber vi med felles mål og retningslinjer for sportslig utvikling. 
                Vi bruker disse som styringsverktøy i vårt arbeid og alle ledere og trenere følger retningslinjene. 
                Vi har et langsiktig perspektiv.
              </p>
            </ContentSection>

            <ContentSection
              id="lojalitet"
              title="Lojalitet til sportsplanen"
              icon={<Target size={24} />}
            >
              <p className="text-gray-700 leading-relaxed">
                Det forventes at alle trenere og ledere implementerer og følger sportsplanen. 
                Dette vil medføre et merarbeid og endringer, men dokumentet er forankret i klubbens styre og skal følges.
              </p>
              <div className="bg-kilred/10 border-l-4 border-kilred p-4 mt-4 rounded-r-lg">
                <h4 className="font-bold text-kilsvart mb-2">VISJON:</h4>
                <p className="text-lg font-medium text-kilred mb-3">Flest mulig – lengst mulig</p>
                <h4 className="font-bold text-kilsvart mb-2">VERDIER:</h4>
                <p className="text-lg font-medium text-kilred">Begeistring - Fair play - Respekt - Innsatsvilje</p>
              </div>
            </ContentSection>

            <ContentSection
              id="vare-mal"
              title="Våre mål"
              icon={<Target size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 font-medium">KIL Håndball har som mål:</p>
                <ul className="space-y-3">
                  {[
                    'å ha lag i alle årsklasser i både jente, guttehåndball og rullestolhåndballen',
                    'å legge til rette for både topp og breddehåndball',
                    'å ha fokus på gode rutiner for rekruttering av både spillere, trenere og dommere',
                    'at spillere, trenere, ledere og foreldre opptrer med god sportslig holdning på og utenfor banen (Følge #verdiløftet til NHF)',
                    'at alle som ønsker å være med føler seg velkommen',
                    'å finne fram til og implementere tiltak som motvirker at økonomi er en barriere for deltakelse',
                    'å prioritere og styrke kompetansen på trenere, dommere og ledere',
                    'å skape ett attraktivt miljø som både spillere, dommere, ledere og foreldre'
                  ].map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-kilred font-bold mr-3">•</span>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-lg mt-6">
                  <p className="text-gray-700 leading-relaxed italic">
                  Alle som ønsker det, skal få mulighet til å spille håndball i KIL Håndball. Vi skal så langt
                  det er mulig legge til rette for bredde/topp og mangfold i tilbudet. Utøveren står i
                  sentrum. Utfordringer, mestring og utvikling for den enkelte gir positive opplevelser.
                  Følelsen av å lykkes er viktig for alle. Vi bygger opp, ikke ned! Vinnerkultur er sentralt i all
                  idrett. Det samme gjelder i KIL Håndball, enten det er å vinne over seg selv og utvikle seg,
                  eller det er å bli Norges beste håndball-lag. KIL skal legge til rette for utvikling av, så vel
                  bredde, som topp, eliteutøvere innen håndball. Glede, samhold og trivsel skal gjøre
                  håndballbanen til et morsomt sted å være. Alvoret skal ikke overta for leken. Vår
                  virksomhet er basert på gjensidig respekt og likeverd. Respekt for medspillere uansett
                  bakgrunn, respekt for trenerne, støtteapparat, dommere og motstandere er av
                  grunnleggende betydning.
                  </p>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="lover-regler"
              title="Lover og regler"
              icon={<BookOpen size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700">For oppdaterte lover og regler, se:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="https://www.handball.no/regioner/nhf-sentralt/praktisk-info/lover-og-regler/spilleregler-handball/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-kilred text-white p-4 rounded-lg hover:bg-kilred/90 transition-colors"
                  >
                    <h4 className="font-bold mb-2">Spilleregler</h4>
                    <p className="text-sm opacity-90">https://www.handball.no/regioner/nhf-sentralt/praktisk-info/lover-og-regler/spilleregler-handball</p>
                  </a>
                  <a
                    href="https://www.handball.no/regioner/nhf-sentralt/praktisk-info/lover-og-regler/lover-og-bestemmelser/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-kilblue text-white p-4 rounded-lg hover:bg-kilblue/90 transition-colors"
                  >
                    <h4 className="font-bold mb-2">Lov, reglement og bestemmelser</h4>
                    <p className="text-sm opacity-90">https://www.handball.no/regioner/nhf-sentralt/praktisk-info/lover-og-regler/lover-og-bestemmelser/</p>
                  </a>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="trener-rolle"
              title="Trener- og laglederrollen"
              icon={<Users size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Alle lagledere og trenere i klubben må sette seg inn i og forholde seg til de overordnede 
                  føringene og bestemmelsene som er grunnleggende for all barneidrett i Norge.
                </p>
                <p className="text-gray-700 leading-relaxed">
                Kil håndball vet det er krevende å være trener og lagleder for barn. Klubben ønsker å
                støtte og trygge deg i denne rollen gjennom flere forskjellige aktiviteter gjennom et år.
                </p>
                <div className="bg-kilblue/10 border-l-4 border-kilblue p-4 rounded-r-lg">
                  <h4 className="font-bold text-kilsvart mb-3">For å støtte opp under denne utviklingen, vil klubben gjennomføre:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-kilblue font-bold mr-2">•</span>
                      <span className="text-gray-700">Oppstartsmøte for alle trenere i begynnelsen av sesongen med informasjon og
                      mulighet for informasjonsdeling med klubb og andre trenere – september.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kilblue font-bold mr-2">•</span>
                      <span className="text-gray-700">Inspirasjonssamlinger gjennom sesongen</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kilblue font-bold mr-2">•</span>
                      <span className="text-gray-700">Barnetrenerkurs i regi av NHF</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kilblue font-bold mr-2">•</span>
                      <span className="text-gray-700">Legge til rette for trenerutdanning</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                Kil håndball ved sportslig utvalg vil også være tilgjengelig med råd, tips, og sparring.
                Enten det er koordinering av praktiske ting, sportslig utvikling eller vanskelig valg.
                </p>
              </div>
            </ContentSection>

            <ContentSection
              id="forventninger"
              title="Hva forventer KIL Håndball av deg som trener?"
              icon={<Award size={24} />}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
              Klubben forventer at alle trenere og lagledere, i tillegg til de grunnleggende føringene
              som er gitt for barneidretten og klubbens verdier, er bevisst sin rolle som leder og
              forbilde. Kil håndball ønsker støttende trenere som skaper et trygt mestringsklima
              preget av idrettsglede, og er opptatt av utvikling og innsats som viktige kriterier for å
              mestre. Trenerne skal vite at tilhørighet i miljøet, opplevelse av kompetanse og opplevd
              eierskap i egen treningshverdag er viktig for utvikling og mestring, og for å begrense
              frafall. Et langsiktig perspektiv vektlegges der trenere legger til rette for den enkeltes
              mestring og utvikling over tid, uansett ferdighetsnivå. Et slikt miljø vil gjøre det lettere å
              gi oppgaver ut fra ferdigheter på en måte som fører til en positiv opplevelse for alle.
              Dette fremmer alles utvikling og sikrer at klubben oppnår sin visjon om at alle skal få
              mulighet til å bli best mulig.
              </p>
            </ContentSection>

            <ContentSection
              id="trenervett"
              title="Trenervett i barne- og ungdomshåndballen"
              icon={<Users size={24} />}
            >
              <div className="">
                <p className="text-gray-700 leading-relaxed mb-4">
                Klubbens trenere er et forbilde for spillerne i klubben. Treneren er ikke bare forbilde for
sitt lag, men for alle spillerne i hele klubben. Det er da viktig at trenere og lagledere er
bevisst dette i sitt virke. For å støtte trenerne i dette arbeidet, har klubben satt ned disse
retningslinjene for godt trenervett:
                </p>
                <ul className="space-y-3 bg-kilblue/10 border-l-4 border-kilblue p-4 rounded-r-lg">
                  {[
                    'Jeg er her for spillerne og fordi jeg ønsker å utvikle dem og meg selv',
                    'Jeg ser og hører meg selv «utenfra» og spillerne «innenfra» ',
                    'Jeg verdsetter gode holdninger og tror på klubbens verdier. Ved å vise dette, er det lettere å bevare gode holdninger i laget ',
                    'Jeg vet at når spillerne opplever trygghet og verdsettelse, vil de lære, mestre og utvikle seg lettere ',
                    'Jeg velger å være positiv fordi min oppførsel smitter over på andre: Spillere, «benken» min, tilskuere, dommere og motstanderlaget ',
                    'Jeg samarbeider med motstanderlaget for å skape mest mulig jevnbyrdighet i kampen ',
                    'Alle er like mye verdt. Jeg sprer spilletid og oppmerksomhet, og alle bør spille omtrent like mye. Jevnbyrdige kamper gjør det lettere med mye spilletid for alle ',
                    'Meld på nok lag slik at det blir mer spilletid til fordeling. Ved å fordele spilletid, gir man flest mulig mest mulig utvikling og beskytter enkeltspillere mot stor belastning ',
                    'Jeg er utviklingsorientert og veileder spillerne. Trivsels- og utviklingsfokus er viktigere enn resultatfokus ',
                    'Lagledelsen prøver hele tiden å ha spillerne på benken i sitt perspektiv',
                    'Jeg gjør dommeren god ',
                    'Jeg er forberedt på at temperaturen kan bli høy, men forsøker å bevare roen og forholde meg konstruktivt ',
                    'Jeg jobber med foreldregruppen for å sikre at de også utviser godt kampvett '
                  ].map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-kilblue font-bold mr-3">•</span>
                      <span className="text-gray-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ContentSection>

            <ContentSection
              id="trenerroller"
              title="Forskjellige trenerroller"
              icon={<Users size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                Kil håndball praktiserer foreldretrenere frem til G/J16. Dette er en utfordring, og det er derfor viktig med en god forståelse av sin egen rolle og en bevissthet rundt situasjoner som kan oppstå der rollene kan komme i konflikt. Åpenhet om mulige rollekonflikter er sentralt og for alle rollene er det viktig å være bevisst sin egen oppførsel i møte med barn og unge. 
                </p>
              </div>
            </ContentSection>

            <ContentSection
              id="kompetanse"
              title="Utvikling/kompetansekrav for trener"
              icon={<BookOpen size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                Kil håndball har fokus på og ønsker å tilby våre trenere mulighetene til videreutvikling gjennom opplæring og kurs, både internt i klubben og gjennom Norges Håndballforbunds trenerutdanning og generelle kurstilbud. 
                </p>
                <div className="space-y-4">
              </div>
              <div className="rounded-lg">
                  <h4 className="font-bold text-kilsvart mb-3">Klubben vil legge til rette for å oppnå følgende utdannelsesnivå for trenerne: </h4>
                  <div className="border-l-4 border-kilred rounded-r-lg overflow-hidden">
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 6-8</div>
                      <div className="text-gray-700 text-sm">Kurs i regi av klubben</div>
                    </div>
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 8-10</div>
                      <div className="text-gray-700 text-sm">Påbegynt trener 1</div>
                    </div>
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 11-12</div>
                      <div className="text-gray-700 text-sm">Fullført trener 1</div>
                    </div>
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 13-14</div>
                      <div className="text-gray-700 text-sm">Påbegynt trener 2</div>
                    </div>
                    <div className="p-3">
                      <div className="font-bold text-kilred text-sm">ÅR 15+</div>
                      <div className="text-gray-700 text-sm">Fullført trener 2 og videre kompetanse</div>
                    </div>
                  </div>
                  </div>
              </div>
            </ContentSection>

            <ContentSection
              id="fair-play"
              title="Fair Play"
              icon={<Award size={24} />}
            >
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed font-medium">
                Alle som er involvert i Kil håndball (trenere, lagledere, spillere og foreldre/foresatte) skal være med på å bidra til et trygt og positivt miljø både på og utenfor banen. 
                </p>
              </div>
            </ContentSection>

            <ContentSection
              id="lagsorganisering"
              title="Lagsorganisering"
              icon={<Users size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Lagsorganisering er i utgangspunktet organisert etter spillerårgang, og hver årgang skal være 
                  selvstyrt og ansvarlig for gjennomføring av aktiviteter i henhold til Sportsplanen.
                </p>
                <div className="bg-kilblue/10 p-4 rounded-lg">
                  <h4 className="font-bold text-kilsvart mb-3">Støtteapparat (minimum):</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-kilred rounded-full mr-3"></span>
                      <span className="text-gray-700">Ansvarlig Trener</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-kilred rounded-full mr-3"></span>
                      <span className="text-gray-700">Dugnadsansvarlig</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-kilred rounded-full mr-3"></span>
                      <span className="text-gray-700">Lagleder (frivillig)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-kilred rounded-full mr-3"></span>
                      <span className="text-gray-700">En/flere hjelpetrenere</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Kommunikasjonsplattform:</strong> Spond - alle lag skal bruke dette.
                  </p>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="barnehandball"
              title="Barnehåndball"
              icon={<Users size={24} />}
            >
              <div className="space-y-6">
                <SpillformOgBanestorrelse />
                <Hovedstrategier />
                <div>
                  <h3 className="text-lg font-bold text-kilsvart mb-3">Oppgaveorientert læringsmiljø</h3>
                  <div className="bg-kilblue/10 border-l-4 border-kilblue p-4 rounded-r-lg">
                    <p className="text-gray-700 mb-3 italic">
                      "Oppgaveorienterte spillere vil ved evaluering av egen mestring ha seg selv som referanse. De er lite opptatt av sosial sammenligning med andre som referansegrunnlag for egen mestringsfølelse. Mestringsfølelsen vil hos dem utløses når de har forbedret seg eller mestret en ny oppgave."
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium text-kilsvart mb-2">Eksempler på oppgaveorienterte mål:</h4>
                      <ul className="space-y-1">
                        <li className="text-gray-700">• "Hvordan kan jeg bli bedre på skudd?"</li>
                        <li className="text-gray-700">• "Hvordan kan jeg mestre å spille ving?"</li>
                        <li className="text-gray-700">• "Hva må til for at jeg blir bedre på snapping?"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="ungdomshandball"
              title="Ungdomshåndball"
              icon={<Target size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                Barne- og ungdomshåndballens generelle hovedmål er å gi så mange barn som mulig et godt tilbud og gode opplevelser. Dette oppnås ved å gi spillerne trygge sosiale rammer, gode mestringsopplevelser, et differensiert treningstilbud og et jevnbyrdig kamptilbud. Alle skal få utfordringer og spille kamper. 
                </p>
                
                <div className="bg-kilred/10 border-l-4 border-kilred p-4 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">
                    Tilbudet fra året spilleren fyller 13 år kan i større grad tilpasses spillernes ambisjoner, ferdighetsnivå og treningsvilje. På ungdomsnivået er fortsatt KIL håndballs hovedambisjon å tilby trening og glede for alle, men her vektlegges også å la de mest ivrige få utfordringene de ønsker og trenger. Innholdet i treningsøktene styres i all hovedsak av lagenes hovedtrenere. Spilletid er fortsatt en svært viktig del av spillernes følelse av mestring og tilhørighet, men det legges større vekt på å tilby spillerne spill på rett sportslig nivå.
                  </p>
                </div>

                <p className='text-gray-700 leading-relaxed'>Der det er spillergrunnlag for det i ungdomshåndballen, anbefales å tilby flere ferdighetsnivå. Det vil si at første- og andrelag blir en realitet, også på forskjellige divisjonsnivå. De mest ivrige og spillerne med størst eierskap til egen utvikling skal tilbys spill på et så godt nivå som mulig i forhold til egen og eget lags utvikling. Spill på flere nivå oppfordres til der spillergrunnlaget er til stede, da spilletid er en viktig faktor for alle. Mangel på spilletid, eller spill på feil nivå, kan medføre at spilleren slutter. 
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-kilsvart mb-2">Sammenslåing av årskull</h4>
                  <p className="text-gray-700">
                  Sammenslåing av årskull / spille opp en årsklasse. Der det er hensiktsmessig for å sikre et riktig sportslig tilbud, så kan kull slås sammen. Dette skal ikke forekomme før det året spilleren fyller 12 år. Dette gjelder eksempelvis årskull med få spillere, kull som ikke alene har nok spillere til å stille lag på ønsket eller anbefalt nivå, eller kull som er spesielt langt fremme sportslig. Sammenslåingen er klubbstyrt.
                  </p>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="differensiering"
              title="Differensiering"
              icon={<Target size={24} />}
            >
              <div className="space-y-4">
                
                  <p className="text-gray-700 leading-relaxed">
                  Differensiering i treningshverdagen handler om å tilby mestring og utfordring på rett nivå, og må ikke forveksles med topping/seleksjon. 
                  Det handler om å trene hele årskull sammen, men med god differensiering i økta
                  </p>
                
                
                <p className="text-gray-700 leading-relaxed">
                Differensiering i treningsøkten handler om tilpasning, og krever at treneren evner å tilpasse innholdet i øvelsen for den aktuelle spilleren eller den aktuelle treningsgruppen. Husk at differensiering ikke begrenser seg til å utfordre de mest ivrige og de som har kommet lengst i utviklingen, men om å tilpasse innholdet for alle, uavhengig av ferdighetsnivå.
                </p>

                {/* <div className="bg-kilblue/10 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Viktig:</strong> Differensiering begrenser seg ikke til å utfordre de mest ivrige, 
                    men om å tilpasse innholdet for alle, uavhengig av ferdighetsnivå.
                  </p>
                </div> */}
              </div>
            </ContentSection>

            <ContentSection
              id="hospitering"
              title="Hospitering"
              icon={<Users size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Hospitering er å gi en spiller mulighet for å trene eller spille kamper med lag over eller under 
                  sitt eget alderstrinn, annet lag på eget alderstrinn, på tvers av kjønn, eventuelt en annen klubb/gruppe. 
                  I KIL Håndball ser vi det hensiktsmessig å starte disse vurderingene fra fylte 12 år.
                </p>
                <p className="text-gray-700 leading-relaxed">Hospitering er et virkemiddel for enkeltspillere som har et behov for større utfordringer enn det man kan få på eget lag.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-kilred/10 p-4 rounded-lg">
                    <h4 className="font-bold text-kilsvart mb-2">Hvem bestemmer?</h4>
                    <p className="text-gray-700">
                      Hospitering er klubbstyrt, og skal organiseres av sportslig utvalg sammen med lagenes hovedtrenere (fra 12 års alder).
                    </p>
                  </div>
                  <div className="bg-kilblue/10 p-4 rounded-lg">
                    <h4 className="font-bold text-kilsvart mb-2">Vurderingsgrunnlag</h4>
                    <p className="text-gray-700">
                      Det er sportslige vurderinger som skal legges til grunn. <strong>Ved uenighet har sportslig utvalg siste ord.</strong>
                    </p>
                  </div>
                </div>
                <Hospiteringstabell />
              </div>
            </ContentSection>

            <ContentSection
              id="retningslinjer"
              title="Retningslinjer"
              icon={<BookOpen size={24} />}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-kilsvart mb-3">Retningslinjer for gjennomføring av kamper/cuper</h3>
                  <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                Kil håndball har fokus på og ønsker å tilby våre trenere mulighetene til videreutvikling gjennom opplæring og kurs, både internt i klubben og gjennom Norges Håndballforbunds trenerutdanning og generelle kurstilbud. 
                </p>
                <div className="space-y-4">
              </div>
              <div className="rounded-lg">
                  <div className="border-l-4 border-kilred rounded-r-lg overflow-hidden mb-4">
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 6-12</div>
                      <div className="text-gray-700 text-sm">Følge regionens spilltilbud og deltagelse for cup og seriespill.</div>
                      <div className="text-gray-700 text-sm">Ingen nivåinndeling i cup</div>
                    </div>
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 13-14</div>
                      <div className="text-gray-700 text-sm">Følge regionens spilltilbud og deltagelse på temaserie. </div>
                      <div className="text-gray-700 text-sm">Alle skal gis like muligheter til utvikling </div>
                      <div className="text-gray-700 text-sm">Nivåinndeling og forutsigbarhet; tydelig informasjon til spillere og foresatte </div>
                      <div className="text-gray-700 text-sm">Nivå 2: Lik spilletid </div>
                      <div className="text-gray-700 text-sm">Nivå 1: Tilnærmet lik spilletid</div>
                      <div className="text-gray-700 text-sm">Cup: 1-2 nivådifferensierte cuper </div>
                      <div className="text-gray-700 text-sm">Kvalifiserte trenere. Ønskelig å ha gjennomført trenerkurs 1.</div>
                    </div>
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 15-16</div>
                      <div className="text-gray-700 text-sm">Alle skal gis like muligheter til utvikling, tilbud på ønsket nivå iht. holdninger, innsats og ferdighet.</div>
                      <div className="text-gray-700 text-sm">Nivåinndeling og forutsigbarhet; tydelig informasjon til spillere og foresatte. 
                      </div>
                      <div className="text-gray-700 text-sm">Fra 15 år må man forvente differensiering av spilletid, men alle skal ha en kamparena for utvikling.
                      </div>
                      <div className="text-gray-700 text-sm">Akseptere at enkeltspillere spiller fast opp et nivå.
                      </div>
                      <div className="text-gray-700 text-sm">Målet er å kvalifisere til Bring.
                      </div>
                      <div className="text-gray-700 text-sm">Kvalifiserte trenere. Ønskelig å ha gjennomført trenerkurs 1.
                      </div>
                    </div>
                    <div className="p-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-bold text-kilred text-sm">ÅR 17-20</div>
                      <div className="text-gray-700 text-sm">Differensiert spilltilbud på ønsket- og kvalifisert nivå
                      </div>
                      <div className="text-gray-700 text-sm">Alle har ett tilbud i aldersgruppa, både de som ønsker å trene mye, og de som ønsker ett breddetilbud.</div>
                      <div className="text-gray-700 text-sm">God informasjon og samarbeid mellom klubbene og trenerne.</div>
                    </div>
                  </div>
                  </div>
              </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Rusmidler er ikke forenelig med deltagelser i kamper og cup.</strong> 
                      Dette gjelder tobakk i tillegg til alkohol og narkotiske stoffer.
                    </p>
                  </div>
                  <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      Etterleve NIFs barneidrettsbestemmelsene samt NHFs retningslinjer for ungdomshåndball.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-kilsvart mb-3">Retningslinjer for sosiale tiltak</h3>
                  <AldersgrupperStrategiertabell />

                  <div className="bg-kilblue/10 p-4 rounded-lg">
                    <h4 className="font-bold text-kilsvart mb-3">Forslag til praktiske tiltak:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-kilred rounded-full mr-2"></span>
                          Dra og se håndballkamp sammen
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-kilred rounded-full mr-2"></span>
                          Pizzakveld
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-kilred rounded-full mr-2"></span>
                          Foreldrekamp med "handicap"
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-kilred rounded-full mr-2"></span>
                          Cup – felles
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-kilred rounded-full mr-2"></span>
                          Sosialt jenter og gutter sammen
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-kilred rounded-full mr-2"></span>
                          Intern beach-cup m/grilling
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-kilblue/20">
                      <p className="text-gray-700 text-sm">
                        <strong>Bonus:</strong> KIL Håndball forsøker å tilby rabatterte kampbilletter til Elverum og Storhamar elite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="turneringer"
              title="Turneringsdeltagelse"
              icon={<Award size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Ved å dra på de samme turneringene, skapes flere og sterkere relasjoner mellom lagene og årgangene. Deltagelse i turneringer kan gi gode fellesskapsopplevelser og minner. Det enkelte lag står fritt til å delta på turneringer, men Kil håndball ønsker at anbefalte turneringer kan velges. Det er en merverdi at flere lag fra klubben deltar på samme turneringer. 
                </p>

                <div className="bg-kilred/10  border border-yellow-200 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Viktig:</strong> Klubben minner om at deltagelse også skal være bærekraftig med hensyn til økonomi for det enkelte lag og den enkelte familie. Det er også viktig at det enkelte lag balanserer deltagelse opp mot spilletid for enkeltspillere.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-kilsvart">KIL håndball anbefaler:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-bold text-kilsvart mb-2">6-8 år:</h5>
                      <p className="text-gray-700">Isbjørncup (spiller en dag)</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-bold text-kilsvart mb-2">9-11 år:</h5>
                      <p className="text-gray-700">Yngres cup på Elverum i april</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-bold text-kilsvart mb-2">12-14 år:</h5>
                      <p className="text-gray-700">Hellton Cup (Karlstad) i november*</p>
                      <p className="text-sm text-gray-700">(Andre aktuelle cuper kan være Fredrikstad Cup og Yngres Cup.)</p>
                      <p className="text-xs text-gray-600 mt-1">*Det må søkes regionen om deltakelse</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-bold text-kilsvart mb-2">15-16 år:</h5>
                      <p className="text-gray-700">Valgfrie turneringer</p>
                    </div>
                  </div>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="dommer"
              title="Dommer i KIL håndball"
              icon={<Award size={24} />}
            >
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Dommerrekruttering er generelt en utfordring på alle nivåer i håndballen. 
                  KIL håndball har som et av flere utviklingsmål på klubbnivå å utvikle flere dommere på alle nivåer.
                </p>
                
                <div className="bg-kilblue/10 border-l-4 border-kilblue p-4 rounded-r-lg">
                  <p className="text-gray-700">
                    <strong>Dommeransvarlig:</strong> KIL håndball har en egen dommeransvarlig, som har som ansvarsområde 
                    å sørge for utvikling av dommere, kontakt med regionen og dommeroppsett til kamper i klubbens regi.
                  </p>
                </div>
              </div>
            </ContentSection>

            <ContentSection
              id="kjoreregler"
              title="Kjøreregler"
              icon={<Target size={24} />}
            >
              <div className="space-y-4">
                <div className="bg-kilred/10 border-l-4 border-kilred p-4 rounded-r-lg">
                  <h4 className="font-bold text-kilsvart mb-3">Viktige prinsipper:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-kilred font-bold mr-3">•</span>
                      <span className="text-gray-700">Alle trenere plikter lojalt å følge vedtatt sportsplan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kilred font-bold mr-3">•</span>
                      <span className="text-gray-700">Viktigst er laget og vi må sikre like regler for alle uansett hvor god eller avgjørende man er</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kilred font-bold mr-3">•</span>
                      <span className="text-gray-700">Det viktigste er ikke å vinne, men å tenke utvikling og ha et lengre perspektiv</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kilred font-bold mr-3">•</span>
                      <span className="text-gray-700">Sikre åpenhet om uttak, hospitering, differensiering, spillerutviklingstiltak, etc. gjennom tydelig kommunikasjon og informasjon til foresatte</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="bg-kilblue/10 p-4 rounded-lg">
                    <h4 className="font-bold text-kilsvart mb-2">Samarbeid med naboklubber</h4>
                    <p className="text-gray-700">
                    Vi ønsker et godt samarbeid med naboklubber. Spilleroverganger og klubbsamarbeidet skal foregå på en formell og ryddig måte fra både vår og den aktuelle klubben. Leder/daglig leder/sportslig leder er den/de som skal ha dialog knyttet til dette. Trener skal ikke gjennomføre samtaler eller avtaler med andre klubbers spillere uten å involvere ledere i klubben
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-bold text-kilsvart mb-2">Alkoholfri klubb</h4>
                    <p className="text-gray-700">
                      <strong>Gjelder 24/7 når man er på reise med klubben som trener eller annet støtteapparat.</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full rounded-lg bg-kilred p-6 my-8'><p className='font-anton font-bold text-xl text-white italic'>Barn og unge skal ikke se trenere eller voksne ledsagere drikke alkohol eller opptre beruset i forbindelse med reiser, turneringer eller andre idrettsarrangementer</p></div>
            </ContentSection>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Content Section Component
interface ContentSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ id, title, icon, children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-lg shadow-md p-6 md:p-8 scroll-mt-24"
    >
      <div className="flex items-center mb-6">
        <div className="text-kilred mr-3">{icon}</div>
        <h2 className="text-2xl md:text-3xl font-bold text-kilsvart">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
};

export default SportsligPlan;