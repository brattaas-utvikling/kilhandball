// components/Kamper.tsx
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useMatches } from "../hooks/useMatches";
import type { NIFMatch } from "../types/match.types";
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from "lucide-react";
import ErrorDisplay from "./ErrorDisplay";
import MatchModal from "./MatchModal";
import { getTeamInfo } from "@/lib/teaminfo";
import { trackEvent } from "@/lib/analytics";

/* ── Match Card ── */

interface MatchCardProps {
  match: NIFMatch;
  onClick: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "I dag";
    if (date.toDateString() === tomorrow.toDateString()) return "I morgen";

    return date.toLocaleDateString("nb-NO", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const homeInfo = getTeamInfo(match.homeTeam, true);
  const awayInfo = getTeamInfo(match.awayTeam, false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred"
      aria-label={`${match.homeTeam} mot ${match.awayTeam}, ${formatDate(match.date)}${
        match.startTime ? ` klokken ${match.startTime}` : ""
      }`}
    >
      {/* Team badges + match info */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {/* Mini team badges */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ring-2 ring-white shadow-sm"
            style={{
              backgroundColor: homeInfo.primary,
              color: homeInfo.lightPrimary ? "#1F2937" : "#fff",
            }}
            aria-hidden="true"
          >
            {homeInfo.initials}
          </div>
          <span className="text-[10px] text-kilsvart-400 font-bold" aria-hidden="true">
            vs
          </span>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ring-2 ring-white shadow-sm"
            style={{
              backgroundColor: awayInfo.primary,
              color: awayInfo.lightPrimary ? "#1F2937" : "#fff",
            }}
            aria-hidden="true"
          >
            {awayInfo.initials}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-kilsvart leading-tight">
            <span className="block sm:inline">{match.homeTeam}</span>
            <span className="hidden sm:inline mx-1 text-kilsvart-400 font-normal">vs</span>
            <span className="block sm:inline text-sm sm:text-base text-gray-600 sm:text-kilsvart">
              <span className="sm:hidden text-kilsvart-400 font-normal">vs </span>
              {match.awayTeam}
            </span>
          </h3>

          <div className="space-y-1">
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-kilred shrink-0" />
              <span className="font-medium truncate">{formatDate(match.date)}</span>
              {match.startTime && (
                <>
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2 sm:ml-4 mr-1 text-kilred shrink-0" />
                  <span className="font-semibold text-kilsvart">{match.startTime}</span>
                </>
              )}
            </div>

            {match.venue && (
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-kilred shrink-0" />
                <span className="truncate">{match.venue}</span>
              </div>
            )}

            {match.tournament && (
              <div className="hidden sm:flex items-center text-sm text-gray-600">
                <Trophy className="w-4 h-4 mr-2 text-kilred shrink-0" />
                <span className="truncate">{match.tournament}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-kilred group-hover:translate-x-0.5 transition-all shrink-0" />
    </button>
  );
};

/* ── Main Component ── */

const Kamper: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<NIFMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("all");

  const { pathname, search } = useLocation();
  const page = pathname + search;

  const { matches, loading, error, lastUpdated, refreshMatches, clearError } = useMatches({
    clubId: "21554",
    refreshInterval: 15,
    autoRefresh: true,
  });

  const getKongsvingerTeams = () => {
    const teams = new Set<string>();
    matches.forEach((match) => {
      if (match.homeTeam.toLowerCase().includes("kongsvinger")) teams.add(match.homeTeam);
      if (match.awayTeam.toLowerCase().includes("kongsvinger")) teams.add(match.awayTeam);
    });
    return Array.from(teams).sort();
  };

  const filteredMatches = useMemo(() => {
    return selectedTeam === "all"
      ? matches.filter(
          (m) =>
            m.homeTeam.toLowerCase().includes("kongsvinger") ||
            m.awayTeam.toLowerCase().includes("kongsvinger")
        )
      : matches.filter(
          (m) =>
            m.homeTeam.toLowerCase().includes(selectedTeam.toLowerCase()) ||
            m.awayTeam.toLowerCase().includes(selectedTeam.toLowerCase())
        );
  }, [matches, selectedTeam]);

  const sortedMatches = useMemo(() => {
    return [...filteredMatches].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateA - dateB;
      const timeA = a.startTime || "99:99";
      const timeB = b.startTime || "99:99";
      return timeA.localeCompare(timeB);
    });
  }, [filteredMatches]);

  const handleMatchClick = (match: NIFMatch) => {
    trackEvent("match_modal_open", {
      page,
      matchId: match.id,
      label: `${match.homeTeam} vs ${match.awayTeam}`,
      component: "Kamper/MatchCard",
    });

    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (selectedMatch) {
      trackEvent("match_modal_close", {
        page,
        matchId: selectedMatch.id,
        label: `${selectedMatch.homeTeam} vs ${selectedMatch.awayTeam}`,
        component: "Kamper/MatchModal",
      });
    }

    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  const handleRefreshClick = () => {
    trackEvent("match_refresh", { page, component: "Kamper/Controls" });
    refreshMatches();
  };

  const handleTeamChange = (value: string) => {
    trackEvent("match_filter_change", { page, value, component: "Kamper/Controls" });
    setSelectedTeam(value);
  };

  const handleClearFilter = () => {
    trackEvent("match_filter_clear", { page, component: "Kamper/Controls" });
    setSelectedTeam("all");
  };

  return (
    <div className="w-full min-h-screen bg-white pb-12">
      {/* Hero banner */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)] text-white w-screen">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <h1 className="font-anton font-bold text-anton-4xl md:text-anton-5xl mb-6 text-white tracking-wide uppercase text-center">
            Kampoversikt
          </h1>
          <p className="text-white/60 text-center text-sm font-roboto">
            Her kan du få oversikt over alle kampene til Kongsvinger IL Håndball.
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto mt-8 px-4">
        {loading && !matches.length ? (
          <div className="p-12 text-center" role="status">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mx-auto mb-4" />
            <p className="text-gray-600">Laster kamper…</p>
            <span className="sr-only">Laster kamper</span>
          </div>
        ) : error ? (
          <ErrorDisplay
            error={error}
            onRetry={() => {
              trackEvent("error_retry", { page, component: "Kamper/ErrorDisplay" });
              refreshMatches();
            }}
            onDismiss={() => {
              trackEvent("error_dismiss", { page, component: "Kamper/ErrorDisplay" });
              clearError();
            }}
            loading={loading}
            variant="detailed"
            className="mb-6"
          />
        ) : matches.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-kilsvart mb-2">Ingen kamper funnet</h3>
            <p className="text-gray-500">Det ser ut til at det ikke er noen kamper registrert.</p>
          </div>
        ) : (
          <>
            {/* Filter controls */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={handleRefreshClick}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-kilred text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <svg
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {loading ? "Oppdaterer…" : "Oppdater"}
                </button>

                {lastUpdated && (
                  <span className="text-sm text-gray-500 text-center sm:text-left">
                    Sist oppdatert: {lastUpdated.toLocaleTimeString("nb-NO")}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="team-filter" className="text-sm font-medium text-kilsvart sm:whitespace-nowrap">
                  Filtrer på lag:
                </label>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <select
                    id="team-filter"
                    value={selectedTeam}
                    onChange={(e) => handleTeamChange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-kilsvart focus:ring-2 focus:ring-kilred focus:border-kilred outline-none transition-colors w-full sm:min-w-48"
                  >
                    <option value="all">Alle Kongsvinger lag</option>
                    {getKongsvingerTeams().map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>

                  {selectedTeam !== "all" && (
                    <button
                      onClick={handleClearFilter}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-kilred transition-colors whitespace-nowrap self-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred"
                    >
                      Fjern filter
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results info */}
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Viser {sortedMatches.length} kamper
                {selectedTeam !== "all" && <span> for {selectedTeam}</span>}
                <span className="text-sm text-gray-500 block mt-1">Sortert etter dato og tid</span>
              </p>
            </div>

            {/* Matches grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {sortedMatches.map((match, index) => (
                <MatchCard key={`${match.id}-${index}`} match={match} onClick={() => handleMatchClick(match)} />
              ))}
            </div>

            {sortedMatches.length === 0 && selectedTeam !== "all" && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-kilsvart mb-2">Ingen kamper funnet</h3>
                <p className="text-gray-500">
                  Ingen kamper funnet for «{selectedTeam}». Prøv et annet lag eller fjern filteret.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedMatch && (
        <MatchModal match={selectedMatch} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Kamper;