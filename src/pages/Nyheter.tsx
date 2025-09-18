import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "../lib/appwrite";
import { NewsArticle } from "../types/Appwrite";


export default function NewsPage() {
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("no-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch news from Appwrite
  const fetchNewsFromAppwrite = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listDocuments(DATABASE_ID, COLLECTIONS.NYHETER, [
        Query.equal("published", true),
        Query.orderDesc("created_at"),
        Query.limit(50),
      ]);

      const articles = response.documents as unknown as NewsArticle[];
      setFilteredNews(articles);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Kunne ikke laste nyheter fra databasen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsFromAppwrite();
  }, []);

  const featuredArticle = filteredNews[0];
  const regularArticles = filteredNews.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mx-auto mb-4"></div>
          <p className="text-kilsvart-600 font-roboto">
            Laster nyheter...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-kilred-50 border border-kilred-200 rounded-xl p-6">
            <h2 className="font-anton text-anton-lg text-kilred-800  mb-2">
              KUNNE IKKE LASTE NYHETER
            </h2>
            <p className="text-kilred-600 font-roboto mb-4">
              {error}
            </p>
            <Button
              onClick={fetchNewsFromAppwrite}
              className="font-roboto font-medium bg-kilred hover:bg-kilred-600 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (filteredNews.length === 0) {
    return (
      <div className="min-h-screen w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-kilblue-50 to-kildarkblue-50 pt-24 pb-16 relative overflow-hidden">
          <div className="container mx-auto py-12 px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-base font-medium text-kilblue-600 uppercase tracking-wider mb-3 font-roboto">
                Nyheter
              </h1>
              <h2 className="font-anton text-anton-3xl md:text-anton-4xl mb-6 text-kilsvart-900 dark:text-white tracking-wide">
                INGEN PUBLISERTE NYHETER ENNÅ
              </h2>
              <p className="text-lg text-kilsvart-600 dark:text-kilsvart-300 font-roboto leading-relaxed mb-8">
                Vi jobber med å legge til spennende nyheter og oppdateringer.
                Kom tilbake snart!
              </p>
              <Button
                onClick={fetchNewsFromAppwrite}
                className="font-roboto font-medium bg-kilred hover:bg-kilred-600 text-white"
              >
                Last på nytt
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)]  text-white w-screed">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-anton font-bold text-anton-4xl md:text-anton-5xl mb-6 text-white tracking-wide uppercase text-center">
              Nyheter
            </h1>
            <p className="text-lg text-white font-roboto leading-relaxed">
              Hold deg oppdatert på alt som skjer! Fra nye produkter til spennende events og inspirerende historier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-white dark:bg-kilsvart-900">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="max-w-6xl mx-auto">
                <Link to={`/nyheter/${featuredArticle.$id}`}>
                  <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-kilblue-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-kilblue-100/50 dark:border-kilblue-700/30">
                    {/* Background Image */}
                    <img
                      src={featuredArticle.img}
                      alt={featuredArticle.headlines}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-kilsvart-900/90 via-kilsvart-900/40 to-kilsvart-900/20" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                      {/* Top Section - Meta Info */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2 text-sm font-roboto">
                              <CalendarIcon className="h-4 w-4 text-white/80" />
                              <span>{formatDate(featuredArticle.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-roboto">
                              <UserIcon className="h-4 w-4 text-white/80" />
                              <span>{featuredArticle.author}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - Headlines, Lead & CTA */}
                      <div className="space-y-6 max-w-4xl">
                        <div className="space-y-4">
                          <h3 className="font-anton text-anton-2xl md:text-anton-3xl lg:text-anton-4xl text-white leading-tight tracking-wide">
                            {featuredArticle.headlines}
                          </h3>
                          <p className="text-white/95 font-roboto text-lg md:text-xl leading-relaxed max-w-3xl">
                            {featuredArticle.lead}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center gap-4">
                          <Button
                            size="lg"
                            className="relative font-roboto font-medium rounded-full overflow-hidden bg-kilred hover:bg-kilred-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                          >
                            <span className="relative z-10 flex items-center">
                              Les hele artikkelen
                              <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <h2 className="font-anton text-anton-2xl md:text-anton-3xl text-kilsvart-900 dark:text-white text-center tracking-wide">
            ANDRE NYHETER ({regularArticles.length})
          </h2>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          {regularArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-kilsvart-500 dark:text-kilsvart-400 font-roboto text-lg mb-4">
                Ingen andre publiserte nyheter funnet.
              </p>
              <Button
                onClick={fetchNewsFromAppwrite}
                variant="outline"
                className="font-roboto font-medium border-kilred text-kilred hover:bg-kilred hover:text-white "
              >
                Last på nytt
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center max-w-7xl mx-auto"
            >
              {regularArticles.map((article, index) => (
                <motion.article
                  key={article.$id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group cursor-pointer w-full max-w-sm"
                >
                  <Link to={`/nyheter/${article.$id}`}>
                    <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-kilblue hover:shadow-kilblue-lg transition-all duration-300 group-hover:shadow-2xl border border-kilblue-100/50 dark:border-kilblue-700/30">
                      {/* Background Image */}
                      <img
                        src={article.img}
                        alt={article.headlines}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-kilsvart-900/90 via-kilsvart-900/30 to-kilsvart-900/50" />

                      {/* Content Container */}
                      <div className="absolute inset-0 h-full flex flex-col justify-between p-4 sm:p-6">
                        {/* Top Section - Meta Info */}
                        <div className="flex flex-col items-start space-y-2 sm:space-y-3">
                          <div className="space-y-1 sm:space-y-1.5 text-white/90">
                            <div className="flex items-center gap-1.5 text-xs font-roboto">
                              <CalendarIcon className="h-3 w-3 text-white/80 flex-shrink-0" />
                              <span className="truncate">{formatDate(article.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-roboto">
                              <UserIcon className="h-3 w-3 text-white/80 flex-shrink-0" />
                              <span className="truncate">{article.author}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section - Headlines, Lead & CTA */}
                        <div className="space-y-3 sm:space-y-4">
                          <div className="space-y-2 sm:space-y-3">
                            <h3 className="font-anton text-anton-base sm:text-anton-lg text-white leading-tight line-clamp-2 tracking-wide">
                              {article.headlines}
                            </h3>
                            <p className="text-white/90 font-roboto text-xs sm:text-sm leading-relaxed line-clamp-3">
                              {article.lead}
                            </p>
                          </div>

                          {/* CTA Button */}
                          <Button
                            size="sm"
                            className="relative font-roboto font-medium rounded-full overflow-hidden bg-kilred hover:bg-kilred-600 text-white border-0 shadow hover:shadow-md transition-all duration-200 text-xs sm:text-sm px-4 py-2"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              Les mer
                              <ArrowRightIcon className="ml-1.5 h-3 w-3 flex-shrink-0" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}