import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  NewspaperIcon,
} from "lucide-react";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "../lib/appwrite";
import { Button } from "./ui/button";
import { HomepageNewsProps, NewsArticle } from "../types/Appwrite";



export default function HjemmesideNyheter({
  maxArticles = 3,
  showFeatured = true,
  compact = false,
}: HomepageNewsProps) {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("no-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate reading time
  const calculateReadingTime = (article: NewsArticle): number => {
    const wordsPerMinute = 200;

    const allText = [
      article.lead || "",
      article["paragraph-1"] || "",
      article["paragraph-2"] || "",
      article["paragraph-3"] || "",
    ].join(" ");

    const words = allText
      .trim()
      .split(" ")
      .filter((word) => word.length > 0).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  // Fetch latest news from Appwrite
  const fetchLatestNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listDocuments(DATABASE_ID, COLLECTIONS.NYHETER, [
        Query.equal("published", true),
        Query.orderDesc("created_at"),
        Query.limit(maxArticles + (showFeatured ? 1 : 0)),
      ]);

      const articles = response.documents as unknown as NewsArticle[];
      setNewsData(articles);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Kunne ikke laste nyheter.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, [maxArticles, showFeatured]);

  const featuredArticle = showFeatured ? newsData[0] : null;

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-kilsvart-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kilred"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || newsData.length === 0) {
    return (
      <section className="py-16 bg-white dark:bg-kilsvart-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-12">
            <NewspaperIcon className="h-12 w-12 text-kilsvart-400 dark:text-kilsvart-500 mx-auto mb-4" />
            <p className="text-kilsvart-600 dark:text-kilsvart-400 font-roboto">
              {error || "Ingen nyheter tilgjengelig for øyeblikket."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-kilsvart-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-anton text-anton-3xl md:text-anton-4xl mb-6 text-kilsvart-900 dark:text-white tracking-wide">
            SISTE NYHETER
          </h2>
          <p className="text-lg text-kilsvart-600 dark:text-kilsvart-300 font-roboto max-w-2xl mx-auto">
            Hold deg oppdatert på alt som skjer
          </p>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && showFeatured && !compact && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-kilblue-50 to-kildarkblue-50 dark:from-kilblue-900/20 dark:to-kildarkblue-900/20 rounded-2xl p-8 border border-kilblue-200 dark:border-kilblue-700/30">
              {/* Featured Image */}
              <div className="relative rounded-xl overflow-hidden shadow-kilblue group">
                <Link to={`/nyheter/${featuredArticle.$id}`}>
                  <img
                    src={featuredArticle.img}
                    alt={featuredArticle.headlines}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kilsvart-900/30 to-transparent" />
                </Link>
              </div>

              {/* Featured Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-kilsvart-500 dark:text-kilsvart-400 font-roboto">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {formatDate(featuredArticle.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {calculateReadingTime(featuredArticle)} min
                  </div>
                </div>

                <h3 className="font-anton text-anton-xl md:text-anton-2xl text-kilsvart-900 dark:text-white tracking-wide">
                  {featuredArticle.headlines}
                </h3>

                <p className="text-kilsvart-600 dark:text-kilsvart-300 font-roboto leading-relaxed">
                  {featuredArticle.lead}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-kilsvart-500 dark:text-kilsvart-400 font-roboto">
                    <UserIcon className="h-4 w-4" />
                    {featuredArticle.author}
                  </div>

                  <Link to={`/nyheter/${featuredArticle.$id}`}>
                    <Button
                      size="sm"
                      className="rounded-full bg-kilred hover:bg-kilred-600 text-white border-0 shadow hover:shadow-md font-roboto font-medium transition-all duration-200"
                      aria-label={`Les artikkel: ${featuredArticle.headlines}`}
                    >
                      Les mer
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        {newsData.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {newsData.slice(showFeatured ? 1 : 0, showFeatured ? maxArticles + 1 : maxArticles).map((article, index) => (
              <motion.article
                key={article.$id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Link to={`/nyheter/${article.$id}`}>
                  <div className="relative h-80 rounded-xl overflow-hidden shadow-kilblue hover:shadow-kilblue-lg transition-all duration-300 border border-kilblue-200 dark:border-kilblue-700/30">
                    {/* Background Image */}
                    <img
                      src={article.img}
                      alt={article.headlines}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-kilsvart-900/90 via-kilsvart-900/40 to-kilsvart-900/20" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-1 text-xs font-roboto">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-roboto">
                          <UserIcon className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="font-anton text-anton-lg text-white leading-tight line-clamp-2">
                          {article.headlines}
                        </h3>
                        <p className="text-white/90 font-roboto text-sm leading-relaxed line-clamp-2">
                          {article.lead}
                        </p>
                        <Button
                          size="sm"
                          className="bg-kilred hover:bg-kilred-600 text-white border-0 shadow hover:shadow-md font-roboto font-medium transition-all duration-200 text-xs px-4 py-2"
                        >
                          <span className="flex items-center">
                            Les mer
                            <ArrowRightIcon className="ml-1.5 h-3 w-3" />
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/nyheter">
            <Button
              aria-label="Se alle nyheter"
              size="lg"
              variant="outline"
              className="rounded-full font-roboto font-medium border-kilred text-kilred hover:bg-kilred hover:text-white"
            >
              Se alle nyheter
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}