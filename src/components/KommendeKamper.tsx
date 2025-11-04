import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight, AlertTriangle, Trophy, ArrowRight } from 'lucide-react';
import { useMatches } from '../hooks/useMatches';
import ErrorDisplay from './ErrorDisplay';
import { MdStadium } from "react-icons/md";

export default function NextUpSpotlightAgenda() {
  const { matches, loading, error, lastUpdated, refreshMatches, isStale } = useMatches({
    clubId: '21554',
    refreshInterval: 15,
    autoRefresh: true,
  });

  // Parallax effect for background
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Utils
  const safeDate = (s: string) => { const d = new Date(s); return isNaN(d.getTime()) ? null : d; };
  const fmtShort = (s: string) => { const d = safeDate(s); return d ? d.toLocaleDateString('nb-NO', { weekday:'short', day:'numeric', month:'short' }) : 'Ugyldig dato'; };
  const fmtLong = (s: string) => { const d = safeDate(s); return d ? d.toLocaleDateString('nb-NO', { weekday:'long', day:'numeric', month:'long' }) : 'Ugyldig dato'; };

  // ISO uke-nummer
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

// lager en fin tittel: "Uke 45 (3. nov - 9. nov)"
const formatWeekHeader = (weekKey: string, matchesForWeek: typeof hallMatches) => {
  const [, weekNum] = weekKey.split('-');
  const firstMatch = matchesForWeek[0];
  const firstDate = safeDate(firstMatch.date);
  if (!firstDate) return `Uke ${weekNum}`;

  // mandag
  const monday = new Date(firstDate);
  const dayOfWeek = monday.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  monday.setDate(monday.getDate() - diff);

  // søndag
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const mondayStr = monday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
  const sundayStr = sunday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });

  return `Uke ${weekNum} (${mondayStr} - ${sundayStr})`;
};

  
  // Data: Tråstadhallen only
  const hallMatches = matches
    .filter(m => ((m.venue||'').toLowerCase().includes('tråstad') || (m.venue||'').toLowerCase().includes('trastad idrettshall')))
    .sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime());

  const now = new Date();
  const nextMatch = hallMatches.find(m => { const d = safeDate(m.date); return d && d >= now; }) || hallMatches[0];


  // finn ukegrupper for hall-kamper
const currentDate = new Date();
const currentWeek = getWeekNumber(currentDate);
const currentYear = currentDate.getFullYear();

// vi lager et lite objekt: { "2025-45": [kamper...] }
const weekGroups: Record<string, typeof hallMatches> = {};
hallMatches.forEach((m) => {
  const d = safeDate(m.date);
  if (!d) return;
  const w = getWeekNumber(d);
  const y = d.getFullYear();
  const key = `${y}-${w}`;
  if (!weekGroups[key]) weekGroups[key] = [];
  weekGroups[key].push(m);
});

// sorter uke-nøklene
const sortedWeekKeys = Object.keys(weekGroups).sort((a, b) => {
  const [ya, wa] = a.split('-').map(Number);
  const [yb, wb] = b.split('-').map(Number);
  return ya - yb || wa - wb;
});

// velg første uke å vise i agenda (enten inneværende, eller bare første fremover)
let agendaWeekKey = sortedWeekKeys[0];
let agendaWeekMatches = agendaWeekKey ? weekGroups[agendaWeekKey] : [];

// hvis det faktisk finnes kamper denne uken -> bruk den
const hasCurrentWeekMatches = sortedWeekKeys.some((key) => {
  const [year, week] = key.split('-').map(Number);
  return year === currentYear && week === currentWeek;
});
if (hasCurrentWeekMatches) {
  const key = `${currentYear}-${currentWeek}`;
  agendaWeekKey = key;
  agendaWeekMatches = weekGroups[key];
}

const agenda =
agendaWeekMatches && agendaWeekMatches.length
  ? agendaWeekMatches.filter(m => !nextMatch || m.id !== nextMatch.id)
  : hallMatches.filter(m => !nextMatch || m.id !== nextMatch.id);

  // Loading state
  if (loading && !matches.length) {
    return (
      <section className="w-full sm:-mx-[calc((100vw-100%)/2)] sm:w-screen py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0"/>
        <div className="relative z-10 text-center">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mx-auto mb-4"></div>
          </div>
          <p className="text-kilsvart-600 font-roboto text-base sm:text-lg">Laster kamper…</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full sm:-mx-[calc((100vw-100%)/2)] sm:w-screen py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="w-11/12 max-w-5xl mx-auto px-4">
          <ErrorDisplay error={error} onRetry={refreshMatches} loading={loading} variant="default" />
        </div>
      </section>
    );
  }

  const hasData = !!nextMatch || agenda.length > 0;

  return (
    <section
      aria-label="Kommende hjemmekamper"
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 sm:-mx-[calc((100vw-100%)/2)] sm:w-screen"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0" />
      
      {/* Animated orbs - responsive sizes */}
      <motion.div
  style={{ y: y1 }}
  className="
    pointer-events-none absolute 
    -top-16 -right-12
    w-[clamp(12rem,25vw,22rem)] h-[clamp(12rem,25vw,22rem)]
    sm:top-0 sm:right-1/4
    bg-gradient-to-br from-kilred/20 to-purple/20
    rounded-full blur-3xl max-w-[400px] max-h-[400px]
  "
/>

<motion.div
  style={{ y: y2 }}
  className="
    pointer-events-none absolute 
    -bottom-16 -left-12
    w-[clamp(12rem,25vw,22rem)] h-[clamp(12rem,25vw,22rem)]
    sm:bottom-0 sm:left-1/4
    bg-gradient-to-br from-kilblue/20 to-purple/20
    rounded-full blur-3xl max-w-[400px] max-h-[400px]
  "
/>


      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto px-4">
        {/* Header - fully responsive */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10 md:mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="relative">
              <MdStadium className="w-4 h-4 sm:w-5 sm:h-5 text-kilsvart-500" />
            </div>
            <span className="text-xs sm:text-sm font-roboto font-bold text-kilsvart-500 uppercase tracking-wider">
              Tråstadhallen
            </span>
          </div>
          
          <h2 className="font-anton text-anton-2xl sm:text-anton-3xl md:text-anton-4xl lg:text-anton-5xl uppercase font-bold text-kilsvart mb-3 sm:mb-4 px-2">
            Hjemmekamper Tråstadhallen
          </h2>
          
          {lastUpdated && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-kilsvart-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-roboto">Oppdatert {lastUpdated.toLocaleTimeString('nb-NO')}</span>
              </div>
              {isStale && (
                <span className="text-amber-600 font-medium">(sjekker…)</span>
              )}
            </div>
          )}
        </motion.div>

        {/* Stale warning - responsive */}
        {isStale && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 sm:mb-8 mx-auto max-w-2xl"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-amber-200/50 bg-gradient-to-r from-amber-50 to-yellow-50 backdrop-blur-xl p-3 sm:p-4 shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 animate-pulse flex-shrink-0" />
                  <div>
                    <p className="font-roboto font-semibold text-sm sm:text-base text-amber-900">Viser siste kjente data</p>
                    <p className="text-xs sm:text-sm text-amber-700">Henter oppdateringer i bakgrunnen</p>
                  </div>
                </div>
                <button 
                  onClick={refreshMatches} 
                  disabled={loading}
                  className="w-full sm:w-auto group relative overflow-hidden rounded-lg sm:rounded-xl bg-amber-600 px-4 sm:px-5 py-2 sm:py-2.5 text-white text-sm sm:text-base font-roboto font-medium transition-all hover:bg-amber-700 disabled:opacity-50 hover:shadow-lg"
                >
                  <span className="relative z-10">{loading ? 'Oppdaterer…' : 'Oppdater nå'}</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {!hasData ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16 rounded-2xl sm:rounded-3xl bg-white/50 backdrop-blur-xl border border-white/60 shadow-xl"
          >
            <div className="relative inline-block mb-4 sm:mb-6">
              <Calendar className="w-16 h-16 sm:w-20 sm:h-20 text-kilsvart-300" />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-kilred/20"
              />
            </div>
            <h3 className="font-anton text-anton-lg sm:text-anton-xl md:text-anton-2xl text-kilsvart-600 mb-3 sm:mb-4 px-4">
              INGEN REGISTRERTE HJEMMEKAMPER
            </h3>
            <p className="text-kilsvart-500 font-roboto text-sm sm:text-base mb-4 sm:mb-6 px-4">
              Kom tilbake snart for oppdatert kampprogram
            </p>
            <button 
              onClick={refreshMatches} 
              disabled={loading}
              className="group relative overflow-hidden rounded-xl bg-kilred px-6 sm:px-8 py-2.5 sm:py-3 text-white text-sm sm:text-base font-roboto font-bold transition-all hover:shadow-2xl hover:scale-105 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Sjekk på nytt
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-kilred-600 to-kilred-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
            {/* LEFT: Next Match Spotlight */}
            {nextMatch && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
                  <div className="relative rounded-2xl sm:rounded-3xl bg-white overflow-hidden shadow-lg">
                    {/* Diagonal hero strip */}
                    <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden">
                      <motion.div 
                        animate={{ 
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-kilred via-white to-kilblue"
                        style={{ 
                          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
                          backgroundSize: '200% 200%'
                        }}
                      />
                      {/* Decorative circles - responsive */}
                      <div className="absolute right-8 sm:right-10 top-4 sm:top-5 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm" />
                      <div className="absolute right-4 sm:right-6 bottom-2 sm:bottom-3 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm" />
                    </div>

                    {/* Content - fully responsive padding */}
                    <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
                      {/* Meta info - stacked on mobile */}
                      <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
                        {/* ytre: sentrer på siden */}
                        <div className="flex justify-center">
                          {/* indre: venstrejustert innhold, men får bare så bredt som den trenger */}
                          <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center sm:gap-6">
                            
                            {/* dato */}
                            <div className="flex items-center gap-2 max-w-full">
                              <Calendar className="w-4 h-4 text-kilred shrink-0" />
                              <span className="text-xs sm:text-sm font-roboto text-kilsvart-500">
                                {fmtLong(nextMatch.date)}
                              </span>
                            </div>

                            {/* tid */}
                            {nextMatch.startTime && (
                              <div className="flex items-center gap-2 max-w-full">
                                <Clock className="w-4 h-4 text-kilred shrink-0" />
                                <span className="text-xs sm:text-sm font-roboto font-normal text-kilsvart-500">
                                  {nextMatch.startTime}
                                </span>
                              </div>
                            )}

                            {/* sted */}
                            <div className="flex items-center gap-2 max-w-full">
                              <MapPin className="w-4 h-4 text-kilred shrink-0" />
                              <span className="text-xs sm:text-sm font-roboto font-normal text-kilsvart-500">
                                {nextMatch.venue}
                              </span>
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* Teams - responsive text size and layout */}
                      <div className="text-center mb-4 sm:mb-6 py-4 sm:py-6 md:py-8 ">
                        <motion.h3 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="font-anton leading-tight"
                        >
                          <span className="text-kilsvart block text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-0 sm:inline">
                            {nextMatch.homeTeam}
                          </span>
                          
                          <span 
                            className="mx-2 sm:mx-3 md:mx-4 text-kilsvart-500 text-base sm:text-lg md:text-xl lg:text-2xl block sm:inline my-2 sm:my-0"
                          >
                            VS
                          </span>
                          
                          <span className="text-kilsvart block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 sm:mt-0 sm:inline">
                            {nextMatch.awayTeam}
                          </span>
                        </motion.h3>
                      </div>

                      {/* Tournament badge - responsive */}
                      {nextMatch.tournament && (
                        <div className="flex justify-center mb-4 sm:mb-6">
                          <div className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-kilsvart-50 to-kilsvart-100 border border-kilsvart-200 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 max-w-full">
                            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-kilsvart shrink-0" />
                            <span className="text-xs sm:text-sm font-roboto font-bold text-kilsvart uppercase tracking-wide text-center truncate">
                              {nextMatch.tournament}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* RIGHT: Agenda */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
                {/* Header - responsive */}
                <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 border-b border-gray-100 bg-gradient-to-r from-kilsvart via-kilsvart-300 to-transparent">
                  <div className="flex items-center justify-between gap-2">
                  <h4 className="font-anton text-base sm:text-lg md:text-xl text-white font-semibold uppercase">
      {agendaWeekKey && agendaWeekMatches.length > 0
        ? formatWeekHeader(agendaWeekKey, agendaWeekMatches)
        : 'Neste kamper'}
    </h4>
                    <a 
                      href="/kamper" 
                      className="group inline-flex items-center gap-1 text-xs sm:text-sm font-roboto font-bold text-kilsvart hover:text-kilsvart-600 transition-colors whitespace-nowrap"
                    >
                      Se alle
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Scrollable content - responsive height */}
                <div className="max-h-[24rem] sm:max-h-[28rem] md:max-h-[32rem] overflow-y-auto custom-scrollbar w-full">
                  {agenda.length === 0 ? (
                    <div className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <p className="text-kilsvart-500 font-roboto text-sm sm:text-base">Ingen flere kamper registrert.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {agenda.map((m, idx) => (
                        <motion.li
                          key={m.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group px-3 sm:px-4 md:px-6 py-3 sm:py-4 hover:bg-gradient-to-r hover:from-kilsvart-50 hover:to-transparent transition-all cursor-pointer"
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-kilsvart-600 mb-1 sm:mb-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-kilsvart-600 flex-shrink-0" />
                                <span className="font-roboto font-medium truncate">
                                  {fmtShort(m.date)}{m.startTime ? ` · ${m.startTime}` : ''}
                                </span>
                              </div>
                              
                              <p className="font-roboto font-bold text-xs sm:text-sm md:text-base text-kilsvart-900 mb-1 sm:mb-2 leading-tight">
                                <span className="break-words">{m.homeTeam}</span>
                                <span className="text-kilsvart-400 font-normal mx-1">vs</span>
                                <span className="break-words">{m.awayTeam}</span>
                              </p>
                              
                              {m.venue && (
                                <p className="text-xs sm:text-sm text-kilsvart-500 flex items-center gap-1.5 sm:gap-2 truncate">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span className="truncate">{m.venue}</span>
                                </p>
                              )}
                            </div>

                            {/* Arrow indicator */}
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-kilred group-hover:translate-x-1 transition-all flex-shrink-0 mt-1 sm:mt-2" />
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </div>
    </section>
  );
}

export const NextUpAndAgenda = NextUpSpotlightAgenda;