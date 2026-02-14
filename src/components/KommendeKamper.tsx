// components/KommendeKamperModern.tsx
import { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Trophy } from 'lucide-react';
import { useMatches } from '../hooks/useMatches';
import ErrorDisplay from './ErrorDisplay';
import StaleDataBanner from './StaleDataBanner';
import MatchModal from './MatchModal';
import { MdStadium } from "react-icons/md";
import type { NIFMatch } from '../types/match.types';

export default function KommendeKamper() {
  const [selectedMatch, setSelectedMatch] = useState<NIFMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { matches, loading, error, lastUpdated, refreshMatches, isStale } = useMatches({
    clubId: '21554',
    refreshInterval: 15,
    autoRefresh: true,
  });

  // Utils
  const safeDate = (s: string) => { 
    const d = new Date(s); 
    return isNaN(d.getTime()) ? null : d; 
  };
  
  const fmtShort = (s: string) => { 
    const d = safeDate(s); 
    return d ? d.toLocaleDateString('nb-NO', { 
      weekday:'short', 
      day:'numeric', 
      month:'short' 
    }) : 'Ugyldig dato'; 
  };
  
  const fmtLong = (s: string) => { 
    const d = safeDate(s); 
    return d ? d.toLocaleDateString('nb-NO', { 
      weekday:'long', 
      day:'numeric', 
      month:'long',
      year: 'numeric'
    }) : 'Ugyldig dato'; 
  };

  // ISO uke-nummer
  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  // Lager fin uke-tittel: "Uke 45 (3. nov - 9. nov)"
  const formatWeekHeader = (weekKey: string, matchesForWeek: NIFMatch[]) => {
    const [, weekNum] = weekKey.split('-');
    const firstMatch = matchesForWeek[0];
    const firstDate = safeDate(firstMatch.date);
    if (!firstDate) return `Uke ${weekNum}`;

    // Mandag
    const monday = new Date(firstDate);
    const dayOfWeek = monday.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    monday.setDate(monday.getDate() - diff);

    // Søndag
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const mondayStr = monday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
    const sundayStr = sunday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });

    return `Uke ${weekNum} (${mondayStr} - ${sundayStr})`;
  };

  // Data: Tråstadhallen only
  const hallMatches = matches
  .filter(m => (
    (m.venue||'').toLowerCase().includes('tråstad') || 
    (m.venue||'').toLowerCase().includes('trastad idrettshall')
  ))
  .sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateA !== dateB) return dateA - dateB;
    
    // Samme dato → sorter på startTime (f.eks. "11:00" vs "15:00")
    const timeA = a.startTime || '99:99';
    const timeB = b.startTime || '99:99';
    return timeA.localeCompare(timeB);
  });

  const now = new Date();
  const upcomingMatches = hallMatches.filter(m => {
    const d = safeDate(m.date);
    return d && d >= now;
  });

  // Grupper kamper etter uke
  const currentDate = new Date();
  const currentWeek = getWeekNumber(currentDate);
  const currentYear = currentDate.getFullYear();

  const weekGroups: Record<string, NIFMatch[]> = {};
  upcomingMatches.forEach((m) => {
    const d = safeDate(m.date);
    if (!d) return;
    const w = getWeekNumber(d);
    const y = d.getFullYear();
    const key = `${y}-${w}`;
    if (!weekGroups[key]) weekGroups[key] = [];
    weekGroups[key].push(m);
  });

  // Sorter uke-nøkler
  const sortedWeekKeys = Object.keys(weekGroups).sort((a, b) => {
    const [ya, wa] = a.split('-').map(Number);
    const [yb, wb] = b.split('-').map(Number);
    return ya - yb || wa - wb;
  });

  // Finn kamper for INNEVÆRENDE UKE eller neste uke med kamper
  let currentWeekKey = `${currentYear}-${currentWeek}`;
  let currentWeekMatches = weekGroups[currentWeekKey];

  // Hvis ingen kamper inneværende uke, finn neste uke med kamper
  if (!currentWeekMatches || currentWeekMatches.length === 0) {
    const nextWeekWithMatches = sortedWeekKeys.find((key) => {
      const [year, week] = key.split('-').map(Number);
      return (year > currentYear) || (year === currentYear && week >= currentWeek);
    });
    
    if (nextWeekWithMatches) {
      currentWeekKey = nextWeekWithMatches;
      currentWeekMatches = weekGroups[nextWeekWithMatches];
    } else {
      currentWeekMatches = [];
    }
  }

  const nextMatch = currentWeekMatches[0];
  const otherMatches = currentWeekMatches.slice(1);

  const handleMatchClick = (match: NIFMatch) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  // Loading state - full section
  if (loading && !matches.length) {
    return (
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-kilred via-kilred/95 to-kilsvart overflow-hidden min-h-[600px] flex items-center justify-center -mx-[calc((100vw-100%)/2)] w-screen">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-6"></div>
          <p className="text-white font-roboto text-lg">Laster kamper…</p>
        </div>
      </section>
    );
  }

  // Error state - full section
  if (error) {
    return (
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-kilred via-kilred/95 to-kilsvart overflow-hidden min-h-[600px] -mx-[calc((100vw-100%)/2)] w-screen">
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorDisplay 
            error={error} 
            onRetry={refreshMatches} 
            loading={loading} 
            variant="default" 
          />
        </div>66
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-kilred via-kilred/95 to-kilsvart overflow-hidden min-h-800px lg:max-h-screen -mx-[calc((100vw-100%)/2)] w-screen">
      
      {/* Subtle pattern overlay */}
      {/* <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        
        {/* Section Header with current week */}
        <div className="mb-10 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2">
            <MdStadium className="w-5 h-5 text-white" />
            <span className="text-sm font-roboto font-bold text-white uppercase tracking-wider">
              Tråstadhallen
            </span>
          </div>
          
          <h2 className="font-anto font-semibold text-4xl sm:text-5xl md:text-6xl uppercase text-white mb-3">
            Hjemmekamper
          </h2>
          

          
          {lastUpdated && (
            <p className="text-sm text-white/80 font-roboto">
              Oppdatert {lastUpdated.toLocaleTimeString('nb-NO', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </div>

        {/* Stale data warning */}
        {isStale && (
          <div className="mb-8 max-w-4xl mx-auto">
            <StaleDataBanner
              lastUpdated={lastUpdated}
              onRefresh={refreshMatches}
              loading={loading}
              variant="inline"
            />
          </div>
        )}

        {!nextMatch ? (
          // Empty state
          <div className="max-w-2xl mx-auto text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Calendar className="w-16 h-16 text-white/60 mx-auto mb-4" />
            <p className="text-white text-lg font-roboto mb-2">
              Ingen kamper i inneværende uke.
            </p>
            <p className="text-white/70 text-sm font-roboto">
              Se <a href="/kamper" className="underline hover:text-white">alle kamper</a> for kommende uker
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-full">
            
            {/* 🎯 NESTE KAMP - Featured (venstre kolonne) */}
            <article 
              className="space-y-6 text-center lg:text-left cursor-pointer group min-w-0"
              onClick={() => handleMatchClick(nextMatch)}
            >
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-roboto font-bold text-white uppercase tracking-wider">
                  Neste hjemmekamp
                </span>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-roboto font-medium">
                    {fmtLong(nextMatch.date)}
                  </span>
                </div>
                
                {nextMatch.startTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-roboto font-medium">
                      {nextMatch.startTime}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-roboto font-medium">
                    {nextMatch.venue}
                  </span>
                </div>
              </div>

              {/* Teams */}
              <div>
                <h3 className="font-anton text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  <span className="block mb-4">{nextMatch.homeTeam}</span>
                  <span className="text-white/50 text-3xl md:text-4xl block mb-4">VS</span>
                  <span className="block">{nextMatch.awayTeam}</span>
                </h3>
              </div>

              {/* Tournament */}
              {nextMatch.tournament && (
                <div className="flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2.5">
                    <Trophy className="w-4 h-4 text-white" />
                    <span className="text-sm font-roboto font-bold text-white uppercase tracking-wide">
                      {nextMatch.tournament}
                    </span>
                  </div>
                </div>
              )}
            </article>

            {/* 📋 ANDRE KAMPER - List (høyre kolonne) */}
            <div className="space-y-4 min-w-0">
              
              {otherMatches.length > 0 ? (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/20">
                  {/* Current week subtitle */}
                    {currentWeekKey && currentWeekMatches.length > 0 && (
                    <h3 className="font-anton text-2xl md:text-3xl uppercase text-white">
                  {formatWeekHeader(currentWeekKey, currentWeekMatches)}
                    </h3>
                    )}
                    <a 
                      href="/kamper" 
                      className="text-sm font-roboto font-bold text-white/80 hover:text-white transition-colors inline-flex items-center gap-1 flex-shrink-0"
                    >
                      Se alle
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Match list - scrollable */}
                  <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto overflow-x-hidden space-y-1 pr-2 custom-scrollbar">
                    {otherMatches.map((match) => (
                      <div 
                        key={match.id}
                        onClick={() => handleMatchClick(match)}
                        className="group py-5 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer rounded-lg px-4 -mx-4"
                      >
                        <div className="flex items-start justify-between gap-4 min-w-0">
                          
                          {/* Match info */}
                          <div className="flex-1 min-w-0 space-y-2 overflow-hidden">
                            
                            {/* Date & time */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span className="font-roboto font-semibold">
                                  {fmtShort(match.date)}
                                </span>
                              </div>
                              
                              {match.startTime && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 flex-shrink-0" />
                                  <span className="font-roboto font-semibold">
                                    {match.startTime}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Teams */}
                            <p className="font-roboto text-lg text-white leading-snug break-words">
                              <span className="font-bold">{match.homeTeam}</span>
                              <span className="text-white/50 font-normal mx-2">vs</span>
                              <span className="font-bold">{match.awayTeam}</span>
                            </p>

                            {/* Venue & tournament */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                              {match.venue && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="font-roboto truncate">{match.venue}</span>
                                </div>
                              )}
                              {match.tournament && (
                                <div className="flex items-center gap-1.5">
                                  <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="font-roboto truncate">{match.tournament}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // Kun én kamp denne uken
                <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <Calendar className="w-12 h-12 text-white/40 mx-auto mb-3" />
                  <p className="text-white/70 font-roboto text-sm">
                    Ingen flere kamper denne uken
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedMatch && (
        <MatchModal
          match={selectedMatch}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}