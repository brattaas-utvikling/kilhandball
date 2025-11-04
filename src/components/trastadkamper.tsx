// KommendeKamper2.tsx

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Trophy,
  AlertTriangle,
} from 'lucide-react';
import { useMatches } from '../hooks/useMatches';
import type { NIFMatch } from '../types/match.types';
import ErrorDisplay from './ErrorDisplay';

/**
 * Filtrer kamper for Tråstadhallen. Tillater variasjoner i navnet.
 */
const filterTrastadhallen = (matches: NIFMatch[]): NIFMatch[] => {
  return matches.filter((match) => {
    const venue = match.venue?.toLowerCase() || '';
    return venue.includes('tråstad') || venue.includes('trastad idrettshall');
  });
};

/**
 * Sikrer at vi kan parse en dato fra en streng. Returnerer null ved feil.
 */
const safeDate = (dateString: string): Date | null => {
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * Beregn ISO‑ukenummeret for en gitt dato. Uken starter på mandag.
 */
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

/**
 * Gruppér kamper pr. uke. Dersom det finnes kamper i inneværende uke, vis disse; ellers vis neste kommende kamp.
 */
const groupMatchesByWeek = (matches: NIFMatch[]): Record<string, NIFMatch[]> => {
  const weeks: Record<string, NIFMatch[]> = {};
  const now = new Date();
  const currentWeek = getWeekNumber(now);
  const currentYear = now.getFullYear();

  // Samle alle kamper fra inneværende uke
  const thisWeek: NIFMatch[] = [];
  matches.forEach((match) => {
    const dt = safeDate(match.date);
    if (!dt) return;
    if (getWeekNumber(dt) === currentWeek && dt.getFullYear() === currentYear) {
      thisWeek.push(match);
    }
  });

  if (thisWeek.length > 0) {
    const key = `${currentYear}-${currentWeek}`;
    weeks[key] = thisWeek.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return weeks;
  }

  // Hvis ingen kamper denne uken: finn første fremtidige kamp
  const future = matches
    .filter((m) => {
      const dt = safeDate(m.date);
      return dt && dt >= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  if (future.length > 0) {
    const first = future[0];
    const dt = safeDate(first.date)!;
    const key = `${dt.getFullYear()}-${getWeekNumber(dt)}`;
    weeks[key] = [first];
  }
  return weeks;
};

/**
 * Formatér en ukenøkkel til et menneskevennlig navn. Eks: "Uke 42 (14. okt – 20. okt)".
 */
const formatWeekHeader = (weekKey: string, matches: NIFMatch[]): string => {
  const [, weekNum] = weekKey.split('-');
  const firstMatch = matches[0];
  const firstDate = safeDate(firstMatch.date);
  if (!firstDate) return `Uke ${weekNum}`;
  const monday = new Date(firstDate);
  const weekday = monday.getDay();
  const subtract = weekday === 0 ? 6 : weekday - 1;
  monday.setDate(monday.getDate() - subtract);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const mondayStr = monday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
  const sundayStr = sunday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
  return `Uke ${weekNum} (${mondayStr} – ${sundayStr})`;
};

/**
 * Formatér en ISO‑dato til en kort form med ukedag, dag og måned (man. 1. jan). Returnerer tekst ved feil.
 */
const formatDate = (dateString: string): string => {
  const date = safeDate(dateString);
  if (!date) return 'Ugyldig dato';
  return date.toLocaleDateString('nb-NO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

/**
 * Sjekk om en gitt uke er inneværende uke.
 */
const isCurrentWeek = (weekKey?: string): boolean => {
  if (!weekKey) return false;
  const [yStr, wStr] = weekKey.split('-');
  const week = parseInt(wStr, 10);
  const year = parseInt(yStr, 10);
  const now = new Date();
  return year === now.getFullYear() && week === getWeekNumber(now);
};

/**
 * Varselkomponent for stale data. Vis en advarsel hvis dataen i hooken anses som utdatert.
 */
const StaleDataWarning: React.FC<{
  isStale: boolean;
  loading: boolean;
  refreshMatches: () => void;
}> = ({ isStale, loading, refreshMatches }) => {
  if (!isStale) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-roboto font-semibold text-yellow-800">Data kan være utdatert</h4>
            <p className="text-sm text-yellow-700">
              Viser siste kjente informasjon. Klikk oppdater for å hente nyeste data.
            </p>
          </div>
        </div>
        <button
          onClick={refreshMatches}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors text-sm font-roboto font-medium"
        >
          {loading ? 'Oppdaterer…' : 'Oppdater'}
        </button>
      </div>
    </motion.div>
  );
};

/**
 * Variants for container and card animations. Disse brukes av framer‑motion for å animere innholdet.
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Hovedkomponenten som rendrer kommende kamper‑seksjonen.
 */
const KommendeKamper2: React.FC = () => {
  const {
    matches,
    loading,
    error,
    lastUpdated,
    refreshMatches,
    isStale,
  } = useMatches({
    clubId: '21554',
    refreshInterval: 15,
    autoRefresh: true,
  });

  // Filtrer kamper til Tråstadhallen
  const hallMatches = filterTrastadhallen(matches);

  // Gruppér kamper pr. uke
  const weekGroups = groupMatchesByWeek(hallMatches);
  const sortedWeekKeys = Object.keys(weekGroups).sort((a, b) => {
    const [ay, aw] = a.split('-').map(Number);
    const [by, bw] = b.split('-').map(Number);
    return ay - by || aw - bw;
  });
  const currentWeekKey = sortedWeekKeys[0];
  const currentWeekMatches = currentWeekKey ? weekGroups[currentWeekKey] : [];

  // Lastetilstand: vis spinner
  if (loading && matches.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-kilblue/5 via-purple/5 to-kildarkblue/5 -mx-[calc((100vw-100%)/2)] w-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mr-3"></div>
            <p className="text-kilsvart-600 font-roboto">Laster kamper…</p>
          </div>
        </div>
      </section>
    );
  }

  // Feiltilstand: vis feilmelding via felleskomponent
  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-kilblue/5 via-purple/5 to-kildarkblue/5 -mx-[calc((100vw-100%)/2)] w-screen">
        <div className="container mx-auto px-4">
          <ErrorDisplay
            error={error}
            onRetry={refreshMatches}
            loading={loading}
            variant="detailed"
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden -mx-[calc((100vw-100%)/2)] w-screen">
      {/* Dekorative bakgrunnselementer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-kilred/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-kilred/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Seksjonsoverskrift */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-kilred-400" />
            <span className="text-sm font-roboto font-semibold text-kilred-400 uppercase tracking-wide">
              Hjemmekamper
            </span>
          </div>
          <h2 className="font-anton text-anton-3xl md:text-anton-4xl text-kilsvart-900 font-semibold mb-4 tracking-wide">
            KOMMENDE KAMPER I TRÅSTADHALLEN
          </h2>
          <p className="text-lg text-kilsvart-600 font-roboto max-w-2xl mx-auto">
            {(() => {
              const total = Object.values(weekGroups).flat().length;
              if (total === 0) {
                return 'Kom og støtt laget vårt! Her er de nærmeste hjemmekampene.';
              }
              if (isCurrentWeek(currentWeekKey)) {
                return `${total} ${total === 1 ? 'kamp' : 'kamper'} denne uken`;
              }
              return 'Ingen kamper denne uken. Neste hjemmekamp:';
            })()}
          </p>
          {/* Ukeheader dersom vi har kamper */}
          {currentWeekKey && currentWeekMatches.length > 0 && (
            <div className="mt-4">
              <h3 className="font-anton text-anton-lg text-kilsvart-700 font-semibold">
                {formatWeekHeader(currentWeekKey, currentWeekMatches)}
              </h3>
            </div>
          )}
          {/* Oppdatert tidspunkt */}
          {lastUpdated && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-kilsvart-500">
              <span className="font-roboto">
                Oppdatert: {lastUpdated.toLocaleTimeString('nb-NO')}
              </span>
              {isStale && <span className="text-yellow-600 font-medium">(kan være utdatert)</span>}
            </div>
          )}
        </motion.div>

        {/* Stale data advarsel */}
        <div className="max-w-4xl mx-auto">
          <StaleDataWarning
            isStale={isStale}
            loading={loading}
            refreshMatches={refreshMatches}
          />
        </div>

        {/* Ingen kamper */}
        {currentWeekMatches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-kilblue-100/50 max-w-2xl mx-auto"
          >
            <Calendar className="w-16 h-16 text-kilsvart-300 mx-auto mb-4" />
            <h3 className="font-anton text-anton-lg text-kilsvart-600 mb-2">
              INGEN KOMMENDE KAMPER
            </h3>
            <p className="text-kilsvart-500 font-roboto mb-6">
              Det er ingen registrerte kamper i Tråstadhallen for øyeblikket.
            </p>
            <button
              onClick={refreshMatches}
              disabled={loading}
              className="px-6 py-3 bg-kilred hover:bg-kilred-600 text-white rounded-lg font-roboto font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Oppdaterer…' : 'Sjekk på nytt'}
            </button>
          </motion.div>
        ) : (
          <>
            {/* Kortgrid med kamper */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            >
              {currentWeekMatches.map((match) => (
                <motion.div
                  key={match.id}
                  variants={cardVariants}
                  whileHover={{ y: 0, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {/* Kort */}
                  <div className="relative h-full bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-kilred hover:shadow-kilred-lg transition-all duration-300 overflow-hidden">
                   
                    {/* Innhold */}
                    <div className="relative p-6">
                      {/* Dato og tid */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-kilred" />
                          <span className="text-sm font-roboto font-semibold text-kilred">
                            {formatDate(match.date)}
                          </span>
                        </div>
                        {match.startTime && (
                          <div className="flex items-center gap-1.5 text-kilsvart-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-roboto font-medium">
                              {match.startTime}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Lag */}
                      <div className="space-y-4 mb-6">
                        <div className="text-center">
                          <h3 className="font-anton text-anton-xl text-kilsvart-900 mb-1">
                            {match.homeTeam}
                          </h3>
                          <div className="flex items-center justify-center gap-2 my-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-kilsvart-200 to-transparent"></div>
                            <span className="font-anton text-anton-lg text-kilsvart-400">VS</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-kilsvart-200 to-transparent"></div>
                          </div>
                          <h3 className="font-anton text-anton-xl text-kilsvart-700">
                            {match.awayTeam}
                          </h3>
                        </div>
                      </div>
                      {/* Liga‑info */}
                      {match.tournament && (
                        <div className="mb-4 px-3 py-2 bg-kilsvart/5 rounded-lg">
                          <p className="text-xs font-roboto text-kilsvart-700 text-center uppercase tracking-wide truncate">
                            {match.tournament}
                          </p>
                        </div>
                      )}
                      {/* Venue */}
                      <div className="flex items-center justify-center gap-2 text-kilsvart-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">{match.venue}</span>
                      </div>
                      {/* CTA */}
                      <div className="mt-6 pt-6 border-t border-kilsvart-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-kilred hover:bg-kilred-600 text-white rounded-lg font-roboto font-medium transition-colors duration-200">
                          Se detaljer
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {/* Hjørneaksent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-kilred/10 to-transparent rounded-bl-full"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Lenke til alle kamper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <a
                href="/kamper"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm border border-kilred-200 hover:border-kilred-400 text-kilred-700 hover:text-kilred-900 rounded-full font-roboto font-medium transition-all duration-300 hover:shadow-kilred"
              >
                Se alle kamper
                <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default KommendeKamper2;