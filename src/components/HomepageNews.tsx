import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

// Hardkodede nyhetsdata
const hardcodedNews = [
  {
    id: 1,
    headlines: "Oppstartsmøte torsdag 18. september 2025",
    lead: "Vi gleder oss til å ønske både gamle og nye trenere/lagledere velkommen til en spennende sesong med KIL Håndball.",
    content: "KIL håndball inviterer trenere og lagledere til oppstartsmøte. Det vil bli informsjon om kommende sesong fra både styret og sportslig utvalg. Klubbhus, informasjonskanaler, Learn Handball etc.",
    img: "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68cb21d90037395dd274/view?project=68a9f0da0014cb9bd6ad&mode=admin",
    author: "Styret",
    created_at: "2025-09.17",
  }
];

export default function HomepageNews() {
  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("no-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const featuredArticle = hardcodedNews[0];

  return (
    <div className="min-h-screen w-full">

{/* Kick Off Article - FIRST */}
<section className="py-16">
  <div className="container mx-auto px-4 md:px-6">
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto"
    >
      {/* Left - Image */}
      <div className="w-full h-auto overflow-hidden rounded-xl shadow-lg">
        <img
          src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68ee729c001a54496cea/view?project=68a9f0da0014cb9bd6ad&mode=admin"
          alt="Kick Off 2025"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Right - Content */}
      <div className="space-y-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 font-roboto">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate("2025-10-18")}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>Styret</span>
          </div>
        </div>

        {/* Headlines */}
        <h3 className="font-anton text-2xl md:text-3xl text-kilsvart tracking-wide">
          VELKOMMEN TIL KICK OFF!
        </h3>

        {/* Lead */}
        <p className="text-kilred font-roboto text-base md:text-lg font-semibold">
          KIL håndball ønsker å invitere til Kick Off 2025!!
        </p>

        {/* Full Content */}
        <div className="text-gray-700 font-roboto leading-relaxed space-y-4 text-sm md:text-base">
          <p>
            <strong>Frist for påmelding:</strong> 18. oktober i egne laggrupper på Spond.
          </p>
          
          <p>
            Husk at man må samtykke med Ja/Nei i forhold til lagbilde og bruk av bilder i sosiale medier (spond). 
            Alle har på seg drakter som de kan ha på seg. Hvis man ikke har fått drakt av laget, så får man på arrangementet.
          </p>

          <div className="bg-kilred-50 border-l-4 border-kilred-500 p-4 rounded-r-lg">
            <h4 className="font-semibold text-kilsvart-800 mb-2">Øvrige spillere i KIL Håndball</h4>
            <p className="text-kilsvart-700 text-sm">
              Det er kun barnehåndballen som vil bli presentert i KUSK-hallen før kampen i Tråstad, 
              pga. potensiell plassmangel. MEN vi ønsker alle velkommen til å lage liv på tribunen 
              da K2 spiller.
            </p>
          </div>

          <p>
            Vi jobber med noen goodiebags til alle spillere og trenger derfor også å vite hvor mange 
            som kommer fra ungdomslagene. Meld fra til din trener på spond.  <strong>Frist: 18. oktober.</strong>
          </p>

          <p className="text-kilred font-semibold">
            Vi håper dette blir en super kveld med skikkelig god stemning og håndballglede!
          </p>

          <p className="text-sm text-gray-600 italic">
            Mvh KIL Håndball styre
          </p>
        </div>
      </div>
    </motion.article>
  </div>
</section>

{/* Håndballskole Article - SECOND */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4 md:px-6">
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto"
    >
      {/* Left - Content (order-2 on mobile, order-1 on desktop) */}
      <div className="space-y-6 order-2 lg:order-1">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 font-roboto">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate("2025-09-17")}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>KIL Håndball</span>
          </div>
        </div>

        {/* Headlines */}
        <h3 className="font-anton text-2xl md:text-3xl text-kilsvart tracking-wide">
          HÅNDBALLSKOLE 27. SEPTEMBER
        </h3>

        {/* Lead */}
        <p className="text-kilred font-roboto text-base md:text-lg font-semibold">
          KIL Håndball inviterer til håndballskole
        </p>

        {/* Full Hardcoded Content */}
        <div className="text-gray-700 font-roboto leading-relaxed space-y-4 text-sm md:text-base">
          <p>
            Lørdag 27. september arrangerer KIL Håndball håndballskole for alle barn fra 1. til 6. trinn (født 2019–2014). Treningene foregår i KUSK-hallen, Markensveien 20, og avsluttes på kvelden med disco for alle deltakere i Tråstadhallen fra kl. 18.00.
          </p>

          <p>
            Håndballskolen koster 200 kroner, og prisen inkluderer frukt, t-skjorte, drikkeflaske, samt brus og pizza på discoen. Det er begrensede plasser, og påmelding gjøres via Spond med gruppekode: IHIFJ. Påmeldingen stenger ved fristen, og vi oppfordrer alle til å melde på barna tidlig. Husk å opplyse om eventuelle allergier!
          </p>

          <p>
            Alle barn må følges inn av en voksen ved oppmøte og sjekkes inn. Det samme gjelder ved henting, der en voksen må hente barnet og krysse ut på listen ved utgangen.
          </p>

          <h4 className="font-anton text-lg md:text-xl text-kilsvart mt-4">Dagsplan for håndballskolen</h4>

          <h5 className="font-roboto font-semibold mt-2">4.–6. trinn (2016–2014)</h5>
          <ul className="list-disc list-inside">
            <li>09.30 Oppmøte</li>
            <li>09.45 Økt 1</li>
            <li>10.30 Fruktpause</li>
            <li>10.45 Økt 2</li>
            <li>11.30 Avslutning</li>
          </ul>

          <h5 className="font-roboto font-semibold mt-2">2.–3. trinn (2018–2017)</h5>
          <ul className="list-disc list-inside">
            <li>12.00 Oppmøte</li>
            <li>12.15 Økt 1</li>
            <li>13.00 Fruktpause</li>
            <li>13.15 Økt 2</li>
            <li>14.00 Avslutning</li>
          </ul>

          <h5 className="font-roboto font-semibold mt-2">1. trinn (2019)</h5>
          <ul className="list-disc list-inside">
            <li>14.30 Oppmøte</li>
            <li>14.45 Økt 1</li>
            <li>15.30 Fruktpause</li>
            <li>15.45 Økt 2</li>
            <li>16.00 Avslutning</li>
          </ul>

          <p>
            Vi takker våre sponsorer: Sparebank1 Østlandet, REMA 1000, Rimfeldt Eiendom, SCHUTZ, ibas Ontrack, eskoleia og Kjell Trandem AS.
          </p>

          <p>
            Bli med på en spennende dag med trening, moro og sosialt samvær – vi gleder oss til å se dere på håndballskolen og discoen!
          </p>
        </div>
      </div>

      {/* Right - Image (order-1 on mobile, order-2 on desktop) */}
      <div className="w-full h-auto overflow-hidden rounded-xl shadow-lg order-1 lg:order-2">
        <img
          src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68cb21cd002120e5d452/view?project=68a9f0da0014cb9bd6ad&mode=admin"
          alt="Håndballskole plakat 2025"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </motion.article>
  </div>
</section>

{/* Featured Article - Fullscreen - THIRD */}
<section className="relative w-full">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="w-full"
  >
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={featuredArticle.img}
        alt={featuredArticle.headlines}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content with red background */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 md:px-6 pb-12">
          <div className="bg-red-600/90 text-white rounded-xl p-8 max-w-3xl shadow-lg">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-white/90 mb-4">
              <div className="flex items-center gap-2 text-sm font-roboto">
                <Calendar className="h-4 w-4 text-white/80" />
                <span>{formatDate(featuredArticle.created_at)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-roboto">
                <User className="h-4 w-4 text-white/80" />
                <span>{featuredArticle.author}</span>
              </div>
            </div>

            {/* Headlines & Content */}
            <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl mb-4 tracking-wide">
              {featuredArticle.headlines}
            </h2>
            <p className="font-roboto text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              {featuredArticle.lead}
            </p>
            <p className="font-roboto text-sm sm:text-base leading-relaxed">
              {featuredArticle.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</section>

    </div>
  );
}