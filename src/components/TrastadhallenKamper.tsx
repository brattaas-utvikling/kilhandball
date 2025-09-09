// components/TrastadhallenKamper.tsx - Med stale data support
import React from 'react';
import { useMatches } from '../hooks/useMatches';
import type { NIFMatch } from '../types/match.types';
import { Calendar, AlertTriangle } from 'lucide-react';
import ErrorDisplay from './ErrorDisplay';

const TrastadhallenKamper: React.FC = () => {
  const {
    matches,
    loading,
    error,
    lastUpdated,
    refreshMatches,
    isStale, // NYTT: bruker stale status
  } = useMatches({
    clubId: '21554',
    refreshInterval: 15,
    autoRefresh: true,
  });

  // Filter kamper som spilles i Tråstadhallen (tolererer stavevariasjon)
  const trastadhallenMatches = matches.filter(match => {
    const venue = match.venue?.toLowerCase() || "";
    return venue.includes("tråstad") || venue.includes("trastad idrettshall");
  });

  // Safe date parsing
  const safeDate = (dateString: string) => {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? null : d;
  };

  // Get ISO week number
  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  // Group matches by week - først inneværende uke, deretter neste kamp
  const groupMatchesByWeek = () => {
    const weeks: { [key: string]: NIFMatch[] } = {};
    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    const currentYear = currentDate.getFullYear();
    
    // Først, prøv å finne kamper i inneværende uke
    const currentWeekMatches: NIFMatch[] = [];
    
    trastadhallenMatches.forEach(match => {
      const matchDate = safeDate(match.date);
      if (!matchDate) return;
  
      const weekNumber = getWeekNumber(matchDate);
      const matchYear = matchDate.getFullYear();
      
      // Samle kamper fra inneværende uke
      if (weekNumber === currentWeek && matchYear === currentYear) {
        currentWeekMatches.push(match);
      }
    });

    // Hvis det finnes kamper i inneværende uke, bruk dem
    if (currentWeekMatches.length > 0) {
      const weekKey = `${currentYear}-${currentWeek}`;
      weeks[weekKey] = currentWeekMatches;
    } else {
      // Ellers, finn neste kamp i fremtiden
      const futureMatches = trastadhallenMatches
        .filter(match => {
          const matchDate = safeDate(match.date);
          return matchDate && matchDate > currentDate;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      if (futureMatches.length > 0) {
        const nextMatch = futureMatches[0];
        const matchDate = safeDate(nextMatch.date);
        if (matchDate) {
          const weekNumber = getWeekNumber(matchDate);
          const matchYear = matchDate.getFullYear();
          const weekKey = `${matchYear}-${weekNumber}`;
          weeks[weekKey] = [nextMatch];
        }
      }
    }
  
    // Sort matches within each week by date
    Object.keys(weeks).forEach(weekKey => {
      weeks[weekKey].sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });
  
    return weeks;
  };  

  const formatDate = (dateString: string) => {
    const date = safeDate(dateString);
    if (!date) return "Ugyldig dato";

    return date.toLocaleDateString('nb-NO', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const formatWeekHeader = (weekKey: string, matches: NIFMatch[]) => {
    const [, weekNum] = weekKey.split('-');
    const firstMatch = matches[0];
    const firstDate = safeDate(firstMatch.date);
    if (!firstDate) return `Uke ${weekNum}`;

    // Calculate Monday of this week
    const monday = new Date(firstDate);
    const dayOfWeek = monday.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    monday.setDate(monday.getDate() - daysToSubtract);
    
    // Calculate Sunday of this week
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    const mondayStr = monday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
    const sundayStr = sunday.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
    
    return `Uke ${weekNum} (${mondayStr} - ${sundayStr})`;
  };

  // NYTT: Stale Data Warning komponent - tilpasset din styling
  const StaleDataWarning = () => {
    if (!isStale) return null;

    return (
      <div className="mb-4 p-4 bg-yellow-600/20 border border-yellow-400/30 rounded-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-300 mr-2" />
            <div>
              <h4 className="font-semibold text-yellow-200">Data kan være utdatert</h4>
              <p className="text-sm text-yellow-300/80">
                Viser siste kjente informasjon. Klikk oppdater for å hente nyeste data.
              </p>
            </div>
          </div>
          <button
            onClick={refreshMatches}
            disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition-colors text-sm font-medium"
          >
            {loading ? 'Oppdaterer...' : 'Oppdater'}
          </button>
        </div>
      </div>
    );
  };

  if (loading && !matches.length) {
    return (
      <div className="bg-transparent p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
          <p className="text-white/80">Laster kamper...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-transparent p-8">
        <ErrorDisplay
          error={error}
          onRetry={refreshMatches}
          loading={loading}
          variant="minimal"
          className="text-white"
        />
      </div>
    );
  }

  const weekGroups = groupMatchesByWeek();

  // Sort week keys properly (år + uke)
  const sortedWeeks = Object.keys(weekGroups).sort((a, b) => {
    const [yearA, weekA] = a.split("-").map(Number);
    const [yearB, weekB] = b.split("-").map(Number);
    return yearA - yearB || weekA - weekB;
  });

  return (
    <div className="bg-transparent">
      {/* Header */}
      <div className="pe-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold font-roboto text-white">Kommende hjemmekamper</h2>
        <div className="w-48 h-1 bg-white/30 mb-6"></div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/80 text-sm">
              {(() => {
                const matchCount = Object.values(weekGroups).flat().length;
                const currentDate = new Date();
                const currentWeek = getWeekNumber(currentDate);
                const currentYear = currentDate.getFullYear();
                
                const hasCurrentWeekMatches = Object.keys(weekGroups).some(weekKey => {
                  const [year, week] = weekKey.split('-').map(Number);
                  return year === currentYear && week === currentWeek;
                });

                if (hasCurrentWeekMatches) {
                  return `${matchCount} kamper denne uken`;
                } else if (matchCount > 0) {
                  return "Ingen kamper denne uken. Neste hjemmekamp:";
                } else {
                  return "Ingen kommende kamper";
                }
              })()}
            </p>
          </div>
          {lastUpdated && (
            <div className="text-right">
              <p className="text-xs text-white/60">
                Oppdatert: {lastUpdated.toLocaleTimeString('nb-NO')}
                {/* NYTT: Vis stale indikator i header */}
                {isStale && <span className="text-yellow-300 ml-2">(kan være utdatert)</span>}
              </p>
              <button
                onClick={refreshMatches}
                disabled={loading}
                className="group text-sm font-semibold text-white border rounded-md p-2 hover:bg-white hover:text-kilred transition-colors mt-2"
              >
                {loading && (
                  <div className="inline-block animate-spin rounded-full h-3 w-3 border border-white group-hover:border-kilred border-t-transparent group-hover:border-t-transparent mr-1"></div>
                )}
                Oppdater
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NYTT: Stale data warning */}
      <div className="px-6 pt-4">
        <StaleDataWarning />
      </div>

      {/* Matches List by Week */}
      <div className="py-6">
        {Object.values(weekGroups).flat().length === 0 ? (
          <div className="text-center py-8">
            <div className="text-white/40 mb-4">
              <Calendar className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-white/70 mb-2">
              Ingen kamper i Tråstadhallen
            </h3>
            <p className="text-white/50">
              Det er ingen registrerte kamper i Tråstadhallen denne uken.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedWeeks.map(weekKey => {
              const weekMatches = weekGroups[weekKey];
              return (
                <div key={weekKey}>
                  {/* Week Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white py-2 rounded-lg">
                      {formatWeekHeader(weekKey, weekMatches)}
                    </h3>
                  </div>
                  
                  {/* Week Matches */}
                  <div className="space-y-3">
                    {weekMatches.map(match => (
                      <div
                        key={match.id}
                        className="flex items-center justify-between my-2"
                      >
                        {/* Date */}
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-white mr-2" />
                          <span className="font-medium text-white/80 text-sm">
                            {formatDate(match.date)}
                          </span>
                          {match.startTime && (
                            <span className="text-white/80 text-sm ml-2">
                              {match.startTime}
                            </span>
                          )}
                        </div>
                        
                        {/* Teams */}
                        <div className="text-right">
                          <p className="font-semibold text-white/80">
                            {match.homeTeam} vs {match.awayTeam}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrastadhallenKamper;