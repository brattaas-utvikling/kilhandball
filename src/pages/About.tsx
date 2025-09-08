import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "../lib/appwrite";
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
        Query.limit(1), // Hent kun den første (og sannsynligvis eneste) om oss-artikkelen
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

  // Get non-empty paragraphs
  const getAboutParagraphs = (article: AboutArticle): string[] => {
    const paragraphs = [
      article["paragraph-1"],
      article["paragraph-2"],
      article["paragraph-3"],
    ];

    return paragraphs.filter(
      (paragraph) => paragraph && paragraph.trim() !== "",
    );
  };

  // Render content with pullquote positioned correctly
  const renderAboutContent = (article: AboutArticle, paragraphs: string[]) => {
    if (paragraphs.length === 0) {
      return null;
    }

    const content = [];

    // Første paragraph
    content.push(
      <p key="paragraph-1" className="text-lg leading-relaxed font-roboto text-kilsvart-700 dark:text-kilsvart-300">
        {paragraphs[0]}
      </p>,
    );

    // Pullquote vises etter første paragraph hvis den eksisterer
    if (article.pullquote && article.pullquote.trim() !== "") {
      content.push(
        <blockquote
          key="pullquote"
          className="my-8 p-6 bg-gradient-to-r from-kilred-50/50 to-kilblue-50/30 dark:from-kilred-900/10 dark:to-kilblue-900/10 rounded-xl border-l-4 border-kilred relative"
        >
          <div className="absolute top-4 left-4 text-kilred-300 dark:text-kilred-600 text-4xl font-serif">
            "
          </div>
          <p className="text-xl font-medium text-kilred-700 dark:text-kilred-300 font-roboto leading-relaxed italic text-center px-8">
            {article.pullquote}
          </p>
          <div className="absolute bottom-4 right-4 text-kilred-300 dark:text-kilred-600 text-4xl font-serif rotate-180">
            "
          </div>
        </blockquote>,
      );
    }

    // Resten av paragraphene
    paragraphs.slice(1).forEach((paragraph, index) => {
      content.push(
        <p key={`paragraph-${index + 2}`} className="text-lg leading-relaxed font-roboto text-kilsvart-700 dark:text-kilsvart-300">
          {paragraph}
        </p>,
      );
    });

    return content;
  };

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

  const paragraphs = getAboutParagraphs(aboutData);

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)] text-white w-screen">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-anton font-bold text-anton-4xl md:text-anton-5xl mb-6 text-white tracking-wide uppercase text-center">
              {aboutData.headlines}
            </h1>
            <p className="text-lg text-white font-roboto leading-relaxed">
              {aboutData.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white dark:bg-kilsvart-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-kilred-lg">
                  <img
                    src={aboutData.img}
                    alt={aboutData.headlines}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kilsvart-900/20 to-transparent" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="order-1 lg:order-2"
              >
                <div className="space-y-6">
                  {renderAboutContent(aboutData, paragraphs)}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section - if there are multiple paragraphs */}
      {paragraphs.length > 1 && (
        <section className="py-16 bg-gradient-to-br from-kilblue-50 to-kildarkblue-50 dark:from-kilblue-900/20 dark:to-kildarkblue-900/20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="font-anton text-anton-2xl md:text-anton-3xl text-kilsvart-900 dark:text-white tracking-wide mb-4">
                  MER OM OSS
                </h2>
                <div className="w-20 h-1 bg-kilred mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Values/Mission Card */}
                <div className="bg-white dark:bg-kilsvart-800 rounded-xl p-6 shadow-kilblue border border-kilblue-100/50 dark:border-kilblue-700/30">
                  <h3 className="font-anton text-anton-lg text-kilsvart-900 dark:text-white tracking-wide mb-4">
                    VÅRE VERDIER
                  </h3>
                  <p className="text-kilsvart-600 dark:text-kilsvart-300 font-roboto leading-relaxed">
                    {paragraphs[1] || "Lagspill, respekt, dedikasjon og glede står i sentrum av alt vi gjør."}
                  </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white dark:bg-kilsvart-800 rounded-xl p-6 shadow-kilblue border border-kilblue-100/50 dark:border-kilblue-700/30">
                  <h3 className="font-anton text-anton-lg text-kilsvart-900 dark:text-white tracking-wide mb-4">
                    VÅR VISJON
                  </h3>
                  <p className="text-kilsvart-600 dark:text-kilsvart-300 font-roboto leading-relaxed">
                    {paragraphs[2] || "Vi ønsker å være en plass hvor alle kan utvikle seg som spillere og mennesker."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-16 bg-white dark:bg-kilsvart-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-anton text-anton-2xl md:text-anton-3xl text-kilsvart-900 dark:text-white tracking-wide mb-6">
              BLI MED OSS!
            </h2>
            <p className="text-lg text-kilsvart-600 dark:text-kilsvart-300 font-roboto leading-relaxed mb-8">
              Interessert i å bli en del av KIL Håndball? Ta kontakt med oss for mer informasjon om treninger og medlemskap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-roboto font-medium bg-kilred hover:bg-kilred-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
              >
                Kontakt oss
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-roboto font-medium border-kilblue text-kilblue hover:bg-kilblue hover:text-white dark:border-kilblue-400 dark:text-kilblue-400 dark:hover:bg-kilblue-600 dark:hover:text-white px-8 py-3"
              >
                Se treninger
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}