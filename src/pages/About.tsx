import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "../lib/appwrite";
import { ChevronDownIcon } from "lucide-react";
import { AboutArticle } from "../types/Appwrite";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about data from Appwrite
  const fetchAboutData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listDocuments(DATABASE_ID, COLLECTIONS.OM_OSS, [
        Query.limit(1),
      ]);

      if (response.documents.length > 0) {
        const aboutArticle = response.documents[0] as unknown as AboutArticle;
        setAboutData(aboutArticle);
      } else {
        setError("Ingen 'Om oss' innhold funnet i databasen.");
      }
    } catch (err) {
      console.error("Error fetching about data:", err);
      setError("Kunne ikke laste 'Om oss' innhold fra databasen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Timeline data
  const getTimelineData = (article: AboutArticle) => [
    {
      id: 1,
      title: "Vår Historie",
      subtitle: "Fra ydmyke begynnelser til dagens suksess - dette er historien om vårt lag",
      content: article["paragraph-1"],
      image: article.timeline_img_1 || "/placeholder-timeline-1.jpg",
    },
    {
      id: 2,
      title: "I Dag",
      subtitle: "Dagens klubb er et levende bevis på at tradisjon og innovasjon kan gå hånd i hånd",
      content: article["paragraph-2"],
      image: article.timeline_img_2 || "/placeholder-timeline-2.jpg",
    },
    {
      id: 3,
      title: "Fremtiden",
      subtitle: "Fremtiden for vår klubb er lysere enn noen gang",
      content: article["paragraph-3"],
      image: article.timeline_img_3 || "/placeholder-timeline-3.jpg",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-kilsvart-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mx-auto mb-4"></div>
          <p className="text-kilsvart-600 dark:text-kilsvart-300 font-roboto">
            Laster om oss...
          </p>
        </div>
      </div>
    );
  }

  if (error || !aboutData) {
    return (
      <div className="min-h-screen bg-white dark:bg-kilsvart-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-kilred-50 dark:bg-kilred-900/20 border border-kilred-200 dark:border-kilred-800 rounded-xl p-6">
            <h2 className="font-anton text-anton-lg text-kilred-800 dark:text-kilred-200 mb-2 tracking-wide">
              KUNNE IKKE LASTE INNHOLD
            </h2>
            <p className="text-kilred-600 dark:text-kilred-300 font-roboto mb-4">
              {error || "Vi kunne ikke finne 'Om oss' innholdet."}
            </p>
            <Button
              onClick={fetchAboutData}
              className="font-roboto font-medium bg-kilred hover:bg-kilred-600 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const timelineData = getTimelineData(aboutData);

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section - Fullscreen med bilde */}
      <section className="relative h-screen -mx-[calc((100vw-100%)/2)] w-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            // src={aboutData.img}
            src="https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/68cb14490009911eb3f6/view?project=68a9f0da0014cb9bd6ad&mode=admin"
            alt={aboutData.headlines}
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-kilsvart-900/60 via-kilsvart-900/40 to-kilsvart-900/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-anton text-anton-4xl md:text-anton-5xl lg:text-anton-6xl text-white mb-6 tracking-wide leading-tight uppercase">
              {aboutData.headlines}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-roboto leading-relaxed max-w-3xl mx-auto">
              {aboutData.lead}
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
        >
          <div className="flex flex-col items-center">
            {/* <span className="text-sm font-roboto mb-2 tracking-wider">SCROLL NED</span> */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDownIcon className="h-6 w-6" />
            </motion.div>
          </div>
        </motion.div>
      </section>
 {/* Pullquote Section */}
 {aboutData.pullquote && (
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative bg-white dark:bg-kilsvart-900 rounded-2xl p-8 md:p-12 shadow-lg border-l-4 border-kilred">
                
                {/* Quote content */}
                <blockquote className="mb-12">
                  <p className="text-2xl md:text-3xl font-medium text-kilred dark:text-kilred-300 font-roboto leading-relaxed">
                    {aboutData.pullquote}
                  </p>
                </blockquote>

                {/* Visjon og Verdier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Visjon */}
                  <div>
                    <h3 className="text-lg font-anton text-kilsvart-900 dark:text-white tracking-wide mb-4">
                      VISJON:
                    </h3>
                    <div className="space-y-2">
                      <p className="text-kilred dark:text-kilred-300 font-roboto font-medium">
                        Flest mulig – lengst mulig
                      </p>
                    </div>
                  </div>

                  {/* Verdier */}
                  <div>
                    <h3 className="text-lg font-anton text-kilsvart-900 dark:text-white tracking-wide mb-4">
                      VERDIER:
                    </h3>
                    <div className="space-y-2">
                      <p className="text-kilred dark:text-kilred-300 font-roboto font-medium">
                        Begeistring - Fair play - Respekt - Innsatsvilje
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Timeline Section - Vår Reise */}
      <section className="py-20 bg-white dark:bg-kilsvart-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-anton text-anton-3xl md:text-anton-4xl text-kilsvart-900 dark:text-white tracking-wide mb-4">
              VÅR REISE
            </h2>
            <p className="text-lg text-kilsvart-600 dark:text-kilsvart-300 font-roboto max-w-2xl mx-auto">
              Fra ydmyke begynnelser til dagens suksess - dette er historien om vårt lag
            </p>
          </motion.div>

          {/* Timeline Items */}
          <div className="max-w-7xl mx-auto">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-kilred-lg group">
                    {/* Gradient placeholder hvis ikke bilde */}
                    <div className="w-full h-[400px] flex items-center justify-center">
                      {item.image && 
                       item.image !== "/placeholder-timeline-1.jpg" && 
                       item.image !== "/placeholder-timeline-2.jpg" && 
                       item.image !== "/placeholder-timeline-3.jpg" ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl font-anton text-white">{item.id}</span>
                          </div>
                          <p className="text-white font-roboto text-sm opacity-80">Visuell representasjon</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-kilsvart-900/20 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="relative">
                    {/* Border line - kun synlig på desktop */}
                    <div className={`hidden lg:block absolute top-8 w-1 h-20 bg-kilred ${
                      index % 2 === 1 ? "-right-6" : "-left-6"
                    }`}></div>
                    
                    <div className="rounded-xl p-8 border-l-4 border-kilred">
                      <h3 className="font-anton text-anton-2xl text-kilsvart-900 dark:text-white tracking-wide mb-4">
                        {item.title}
                      </h3>
                      <p className="text-kilsvart-600 dark:text-kilsvart-400 font-roboto text-sm mb-6 italic">
                        {item.subtitle}
                      </p>
                      <p className="text-kilsvart-700 dark:text-kilsvart-300 font-roboto leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-kilred text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-anton text-anton-3xl md:text-anton-4xl text-white tracking-wide mb-6">
              BLI EN DEL AV FAMILIEN
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-roboto leading-relaxed mb-12 max-w-2xl mx-auto">
              Uansett om du er nybegynner eller erfaren spiller, har vi plass til deg. Kom og opplev håndballgleden sammen med oss.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to={"/kontakt"}>
                <Button
                  size="lg"
                  className="font-roboto font-medium bg-white text-kilred hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg w-full sm:w-auto"
                >
                  {aboutData.cta_primary_text || "Meld deg inn i dag"}
                </Button>
              </Link>
              <Link to={"/kontakt"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-roboto font-medium border-2 border-white text-white hover:bg-white hover:text-kilred px-8 py-4 text-lg w-full sm:w-auto"
                >
                  {aboutData.cta_secondary_text || "Kontakt oss"}
                </Button>
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-anton text-white mb-2">
                  {aboutData.years_tradition || 70}+
                </div>
                <div className="text-white/80 font-roboto text-sm tracking-widest uppercase">
                  ÅR MED TRADISJON
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-anton text-white mb-2">
                  {aboutData.active_members || 200}+
                </div>
                <div className="text-white/80 font-roboto text-sm tracking-widest uppercase">
                  AKTIVE MEDLEMMER
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-anton text-white mb-2">
                  {aboutData.number_of_teams || 15}+
                </div>
                <div className="text-white/80 font-roboto text-sm tracking-widest uppercase">
                  LAG PÅ ALLE NIVÅER
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}