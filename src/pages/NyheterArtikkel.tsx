import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserIcon,
  ArrowLeftIcon,
  Share2Icon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { getDocument, DATABASE_ID, COLLECTIONS } from "../lib/appwrite";
import { NewsArticle } from "../types/Appwrite";


export default function NyheterArtikkel() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string>("");

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("no-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch single article from Appwrite
  const fetchArticle = async () => {
    if (!id) {
      setError("Ingen artikkel ID funnet");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getDocument(DATABASE_ID, COLLECTIONS.NYHETER, id);
      const articleData = response as unknown as NewsArticle;

      if (!articleData.published) {
        setError("Denne artikkelen er ikke publisert ennå.");
        setLoading(false);
        return;
      }

      setArticle(articleData);
    } catch (err) {
      console.error("Error fetching article:", err);
      setError("Kunne ikke laste artikkelen. Den finnes kanskje ikke.");
    } finally {
      setLoading(false);
    }
  };

  // Get non-empty paragraphs
  const getArticleParagraphs = (article: NewsArticle): string[] => {
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
  const renderArticleContent = (article: NewsArticle, paragraphs: string[]) => {
    if (paragraphs.length === 0) {
      return null;
    }

    const content = [];

    // Første paragraph
    content.push(
      <p key="paragraph-1" className="text-lg leading-relaxed font-roboto">
        {paragraphs[0]}
      </p>,
    );

    // Pullquote vises etter første paragraph hvis den eksisterer
    if (article.pullquote && article.pullquote.trim() !== "") {
      content.push(
        <blockquote
          key="pullquote"
          className="my-8 p-6 bg-gradient-to-r from-kilblue-50/50 to-purple-50/30 dark:from-kilblue-900/10 dark:to-purple-900/10 rounded-xl border-l-4 border-kilred relative"
        >
          <div className="absolute top-4 left-4 text-kilblue-300 dark:text-kilblue-600 text-4xl font-serif">
            "
          </div>
          <p className="text-xl font-medium text-kilblue-700 dark:text-kilblue-300 font-roboto leading-relaxed italic text-center px-8">
            {article.pullquote}
          </p>
          <div className="absolute bottom-4 right-4 text-kilblue-300 dark:text-kilblue-600 text-4xl font-serif rotate-180">
            "
          </div>
        </blockquote>,
      );
    }

    // Resten av paragraphene
    paragraphs.slice(1).forEach((paragraph, index) => {
      content.push(
        <p key={`paragraph-${index + 2}`} className="text-lg leading-relaxed font-roboto">
          {paragraph}
        </p>,
      );
    });

    return content;
  };

  // Share functionality
  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.headlines,
      text: article.lead || "Sjekk ut denne artikkelen",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("Takk for at du deler!");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link kopiert til utklippstavlen!");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error("Kunne ikke dele:", error);

      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link kopiert til utklippstavlen!");
      } catch (clipboardError) {
        console.error("Kunne ikke kopiere link:", clipboardError);
        setShareMessage("Kunne ikke dele artikkelen");
      }
    }

    if (shareMessage) {
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (shareMessage) {
      const timer = setTimeout(() => setShareMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [shareMessage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-kilsvart-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mx-auto mb-4"></div>
          <p className="text-kilsvart-600 dark:text-kilsvart-300 font-roboto">
            Laster artikkel...
          </p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-kilsvart-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-kilred-50 dark:bg-kilred-900/20 border border-kilred-200 dark:border-kilred-800 rounded-xl p-6">
            <h1 className="font-anton text-anton-lg text-kilred-800 dark:text-kilred-200 mb-2 tracking-wide">
              ARTIKKEL IKKE FUNNET
            </h1>
            <p className="text-kilred-600 dark:text-kilred-300 font-roboto mb-4">
              {error || "Vi kunne ikke finne artikkelen du leter etter."}
            </p>
            <Button
              onClick={() => navigate("/nyheter")}
              className="font-roboto font-medium bg-kilred hover:bg-kilred-700 text-white"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Tilbake til nyheter
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const paragraphs = getArticleParagraphs(article);

  return (
    <div className="min-h-screen bg-white dark:bg-kilsvart-900">
      {/* Share message notification */}
      {shareMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-roboto"
        >
          {shareMessage}
        </motion.div>
      )}

      {/* Hero Section with Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={article.img}
          alt={article.headlines}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kilsvart-900/60 via-kilsvart-900/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-8 left-8 z-10">
          <Button
            onClick={() => navigate("/nyheter")}
            size="sm"
            className="font-roboto font-medium rounded-md overflow-hidden bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 transition-all duration-300 px-4 py-2"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Tilbake
          </Button>
        </div>

        {/* Article title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="font-anton text-anton-3xl md:text-anton-4xl lg:text-anton-5xl text-white mb-4 leading-tight tracking-wide">
                {article.headlines}
              </h1>
              <p className="text-xl text-gray-200 font-roboto leading-relaxed max-w-2xl">
                {article.lead}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Article Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-kilsvart-500 dark:text-kilsvart-400 font-roboto mb-8 pb-8 border-b border-kilsvart-200 dark:border-kilsvart-700"
            >
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <span>Av {article.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>{formatDate(article.created_at)}</span>
              </div>

              {/* Action buttons */}
              <div className="ml-auto flex gap-2">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-kilblue-300 text-kilblue-700 hover:bg-kilblue-50 hover:text-kilblue-800 dark:border-kilblue-700 dark:text-kilblue-400 dark:hover:bg-kilblue-900/30 dark:hover:text-kilblue-300"
                  aria-label={`Del artikkel: ${article.headlines}`}
                  title="Del denne artikkelen"
                >
                  <Share2Icon className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="space-y-6 text-kilsvart-700 dark:text-kilsvart-300 leading-relaxed">
                {renderArticleContent(article, paragraphs)}
              </div>
            </motion.div>

            {/* Article Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-kilsvart-200 dark:border-kilsvart-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-sm text-kilsvart-500 dark:text-kilsvart-400 font-roboto">
                    Sist oppdatert: {formatDate(article.$updatedAt)}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => navigate("/nyheter")}
                    variant="outline"
                    className="font-roboto font-medium rounded-full bg-white/80 border-kilblue-300 text-kilblue-700 hover:bg-kilblue-50 hover:text-kilblue-800 dark:bg-transparent dark:border-kilblue-700 dark:text-kilblue-400 dark:hover:bg-kilblue-900/30 dark:hover:text-kilblue-300"
                  >
                    Se flere artikler
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}