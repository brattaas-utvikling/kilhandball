import { motion } from "framer-motion";
import { CalendarIcon, UserIcon } from "lucide-react";

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

{/* Regular Articles */}
<section className="py-16">
  <div className="container mx-auto px-4 md:px-6 space-y-16">

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto"
      >
        {/* Left - Image */}
        <div className="w-full h-auto overflow-hidden rounded-xl shadow-lg">
          <img
            src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68cb21cd002120e5d452/view?project=68a9f0da0014cb9bd6ad&mode=admin"
            alt="Håndballskole plakat 2025"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right - Hardcoded Content */}
        <div className="space-y-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-kilsvart-500 font-roboto">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>{formatDate("2025-09-17")}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserIcon className="h-3 w-3" />
              <span>KIL Håndball</span>
            </div>
          </div>

          {/* Headlines */}
          <h3 className="font-anton text-anton-xl text-kilsvart-900 tracking-wide">
          HÅNDBALLSKOLE 27. SEPTEMBER
          </h3>

          {/* Lead */}
          <p className="text-kilred font-roboto text-base">KIL Håndball inviterer til håndballskole</p>

          {/* Full Hardcoded Content */}
          <div className="text-kilsvart-700 font-roboto leading-relaxed space-y-4 text-sm">
            <p>
              Lørdag 27. september arrangerer KIL Håndball håndballskole for alle barn fra 1. til 6. trinn (født 2019–2014). Treningene foregår i KUSK-hallen, Markensveien 20, og avsluttes på kvelden med disco for alle deltakere i Tråstadhallen fra kl. 18.00.
            </p>

            <p>
              Håndballskolen koster 200 kroner, og prisen inkluderer frukt, t-skjorte, drikkeflaske, samt brus og pizza på discoen. Det er begrensede plasser, og påmelding gjøres via Spond med gruppekode: IHIFJ. Påmeldingen stenger ved fristen, og vi oppfordrer alle til å melde på barna tidlig. Husk å opplyse om eventuelle allergier!
            </p>

            <p>
              Alle barn må følges inn av en voksen ved oppmøte og sjekkes inn. Det samme gjelder ved henting, der en voksen må hente barnet og krysse ut på listen ved utgangen.
            </p>

            <h4 className="font-anton text-anton-lg text-kilsvart-900 mt-4">Dagsplan for håndballskolen</h4>

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
              <li>16.30 Avslutning</li>
            </ul>

            <p>
              Vi takker våre sponsorer: Sparebank1 Østlandet, REMA 1000, Rimfeldt Eiendom, SCHUTZ, ibas Ontrack, eskoleia og Kjell Trandem AS.
            </p>

            <p>
              Bli med på en spennende dag med trening, moro og sosialt samvær – vi gleder oss til å se dere på håndballskolen og discoen!
            </p>
          </div>
        </div>
      </motion.article>

    {/* Hvis du vil ha denne hardkodet for håndballskole alene, kan du legge den til som et eget <motion.article> under */}
  </div>
</section>
      {/* Featured Article - Fullscreen */}
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
          <div className="bg-kilred/90 text-white rounded-xl p-8 max-w-3xl shadow-lg">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-white/90 mb-4">
              <div className="flex items-center gap-2 text-sm font-roboto">
                <CalendarIcon className="h-4 w-4 text-white/80" />
                <span>{formatDate(featuredArticle.created_at)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-roboto">
                <UserIcon className="h-4 w-4 text-white/80" />
                <span>{featuredArticle.author}</span>
              </div>
            </div>

            {/* Headlines & Content */}
            <h2 className="font-anton text-anton-3xl md:text-anton-4xl mb-4 tracking-wide">
              {featuredArticle.headlines}
            </h2>
            <p className="font-roboto text-lg md:text-xl leading-relaxed mb-6">
              {featuredArticle.lead}
            </p>
            <p className="font-roboto leading-relaxed">
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