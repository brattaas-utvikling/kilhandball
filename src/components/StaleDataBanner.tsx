// components/StaleDataBanner.tsx
import { AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface StaleDataBannerProps {
  lastUpdated?: Date | null;
  onRefresh?: () => void;
  loading?: boolean;
  variant?: 'inline' | 'floating';
}

export default function StaleDataBanner({
  lastUpdated,
  onRefresh,
  loading = false,
  variant = 'inline',
}: StaleDataBannerProps) {
  const getTimeSinceUpdate = () => {
    if (!lastUpdated) return 'ukjent tid siden';
    
    const diffMs = Date.now() - lastUpdated.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'dag' : 'dager'} siden`;
    }
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'time' : 'timer'} siden`;
    }
    return `${minutes} ${minutes === 1 ? 'minutt' : 'minutter'} siden`;
  };

  const isWeekend = () => {
    const day = new Date().getDay();
    return day === 0 || day === 6; // Søndag eller lørdag
  };

  const baseClasses = variant === 'floating'
    ? 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[calc(100%-2rem)]'
    : 'w-full';

  return (
    <motion.div
      initial={{ opacity: 0, y: variant === 'floating' ? 20 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: variant === 'floating' ? 20 : -10 }}
      className={baseClasses}
    >
      <div className="rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 shadow-lg">
        <div className="px-4 sm:px-5 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* Icon + Message */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              
              <div className="min-w-0 flex-1">
                <p className="font-roboto font-bold text-sm sm:text-base text-amber-900 mb-1">
                  {isWeekend() 
                    ? 'Kampdata kan være utdatert (helg)'
                    : 'Kampdata kan være utdatert'
                  }
                </p>
                
                <p className="font-roboto text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {isWeekend() ? (
                    <>
                      NIFs kampsystem har ofte problemer i helgene. 
                      Sist oppdatert <strong>{getTimeSinceUpdate()}</strong>.
                      {' '}
                      <span className="inline-block mt-1 sm:mt-0">
                        Dobbeltsjekk{' '}
                        <a
                          href="https://minidrett.nif.no/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-amber-900 hover:text-amber-950 font-bold underline decoration-dotted underline-offset-2"
                        >
                          Min Idrett
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </span>
                    </>
                  ) : (
                    <>
                      Data hentet <strong>{getTimeSinceUpdate()}</strong>. 
                      For siste endringer, sjekk{' '}
                      <a
                        href="https://www.handball.no/system/kamper/?t=t&regionId=472394&s=201060"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-900 hover:text-amber-950 font-bold underline decoration-dotted underline-offset-2"
                      >
                        NHF Kamoer
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Refresh button */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                className="
                  flex items-center justify-center gap-2 
                  px-4 py-2 
                  rounded-md 
                  bg-amber-600 hover:bg-amber-700 
                  text-white font-roboto font-bold text-sm
                  transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                  whitespace-nowrap
                  self-start sm:self-auto
                "
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {loading ? 'Oppdaterer...' : 'Prøv igjen'}
                </span>
                <span className="sm:hidden">
                  {loading ? 'Laster...' : 'Oppdater'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}