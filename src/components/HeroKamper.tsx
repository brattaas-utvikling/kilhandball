// components/HeroKamper.tsx
// Kompakt kampvisning tilpasset hero-seksjonens høyre kolonne.
// Identisk filtrering og ukegruppering som KommendeKamper.

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Clock, MapPin, Trophy, ChevronRight, Loader2 } from "lucide-react";

import { useMatches } from "../hooks/useMatches";
import MatchModal from "./MatchModal";
import type { NIFMatch } from "../types/match.types";
import { trackEvent } from "@/lib/analytics";

/* ── Helpers ── */

const safeDate = (s: string) => {
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};

const fmtShort = (s: string) => {
  const d = safeDate(s);
  return d
    ? d.toLocaleDateString("nb-NO", { weekday: "short", day: "numeric", month: "short" })
    : "Ugyldig dato";
};

const fmtLong = (s: string) => {
  const d = safeDate(s);
  return d
    ? d.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })
    : "Ugyldig dato";
};

// ISO uke-nummer
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

// "Uke 45 (3. nov – 9. nov)"
const formatWeekHeader = (weekKey: string, matchesForWeek: NIFMatch[]) => {
  const [, weekNum] = weekKey.split("-");
  const firstMatch = matchesForWeek[0];
  const firstDate = safeDate(firstMatch.date);
  if (!firstDate) return `Uke ${weekNum}`;

  const monday = new Date(firstDate);
  const dayOfWeek = monday.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  monday.setDate(monday.getDate() - diff);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const mondayStr = monday.toLocaleDateString("nb-NO", { day: "numeric", month: "short" });
  const sundayStr = sunday.toLocaleDateString("nb-NO", { day: "numeric", month: "short" });

  return `Uke ${weekNum} (${mondayStr} – ${sundayStr})`;
};

/* ── Component ── */

export default function HeroKamper() {
  const [selectedMatch, setSelectedMatch] = useState<NIFMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pathname, search } = useLocation();
  const page = pathname + search;

  const { matches, loading, error } = useMatches({
    clubId: "21554",
    refreshInterval: 15,
    autoRefresh: true,
  });

  /* ── Filtrering: identisk med KommendeKamper ── */

  // 1. Kun Tråstadhallen, sortert dato → tid
  const hallMatches = matches
    .filter((m) => {
      const v = (m.venue || "").toLowerCase();
      return v.includes("tråstad") || v.includes("trastad idrettshall");
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateA - dateB;
      const timeA = a.startTime || "99:99";
      const timeB = b.startTime || "99:99";
      return timeA.localeCompare(timeB);
    });

  // 2. Kun fremtidige
  const now = new Date();
  const upcomingMatches = hallMatches.filter((m) => {
    const d = safeDate(m.date);
    return d && d >= now;
  });

  // 3. Grupper etter ISO uke
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

  const sortedWeekKeys = Object.keys(weekGroups).sort((a, b) => {
    const [ya, wa] = a.split("-").map(Number);
    const [yb, wb] = b.split("-").map(Number);
    return ya - yb || wa - wb;
  });

  // 4. Inneværende uke eller neste uke med kamper
  let currentWeekKey = `${currentYear}-${currentWeek}`;
  let currentWeekMatches = weekGroups[currentWeekKey];

  if (!currentWeekMatches || currentWeekMatches.length === 0) {
    const nextWeekWithMatches = sortedWeekKeys.find((key) => {
      const [year, week] = key.split("-").map(Number);
      return year > currentYear || (year === currentYear && week >= currentWeek);
    });

    if (nextWeekWithMatches) {
      currentWeekKey = nextWeekWithMatches;
      currentWeekMatches = weekGroups[nextWeekWithMatches];
    } else {
      currentWeekMatches = [];
    }
  }

  const nextMatch = currentWeekMatches?.[0] ?? null;
  const otherMatches = currentWeekMatches?.slice(1) ?? [];

  const openModal = (m: NIFMatch, source: "featured" | "list") => {
    trackEvent("match_modal_open", {
      page,
      matchId: m.id,
      label: `${m.homeTeam} vs ${m.awayTeam}`,
      component: "HeroKamper",
      source, // ekstra nyttig
    });

    setSelectedMatch(m);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (selectedMatch) {
      trackEvent("match_modal_close", {
        page,
        matchId: selectedMatch.id,
        label: `${selectedMatch.homeTeam} vs ${selectedMatch.awayTeam}`,
        component: "HeroKamper",
      });
    }

    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  /* ── Loading ── */
  if (loading && !matches.length) {
    return (
      <div className="flex h-full items-center justify-center" role="status">
        <Loader2 className="w-8 h-8 text-white/60 animate-spin" aria-hidden="true" />
        <span className="sr-only">Laster kamper…</span>
      </div>
    );
  }

  /* ── Error / empty ── */
  if (error || !nextMatch) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center px-4">
        <Calendar className="w-10 h-10 text-white/30 mb-3" aria-hidden="true" />
        <p className="text-white/70 text-sm font-roboto">
          {error ? "Kunne ikke laste kamper." : "Ingen kommende hjemmekamper."}
        </p>

        <a
          href="/kamper"
          onClick={() => {
            trackEvent("page_view", {
              page: "/kamper",
              component: "HeroKamper",
              action: "navigate_all_matches",
            });
          }}
          className="mt-2 text-sm text-white underline underline-offset-2 hover:text-white/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Se alle kamper
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ═══ NESTE KAMP – featured ═══ */}
      <button
        type="button"
        onClick={() => openModal(nextMatch, "featured")}
        className="group text-left w-full shrink-0 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 sm:p-6 transition-colors hover:bg-white/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
        aria-label={`Neste kamp: ${nextMatch.homeTeam} mot ${nextMatch.awayTeam}, ${fmtLong(nextMatch.date)}${
          nextMatch.startTime ? ` klokken ${nextMatch.startTime}` : ""
        }`}
      >
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
            Neste hjemmekamp
          </span>
        </div>

        {/* Teams */}
        <h3 className="font-anton text-2xl sm:text-3xl md:text-4xl leading-[1.05] text-white uppercase mb-4">
          <span className="block">{nextMatch.homeTeam}</span>
          <span className="block text-white/40 text-lg sm:text-xl md:text-2xl my-1">VS</span>
          <span className="block">{nextMatch.awayTeam}</span>
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-white/70 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {fmtLong(nextMatch.date)}
          </span>
          {nextMatch.startTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {nextMatch.startTime}
            </span>
          )}
          {nextMatch.venue && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {nextMatch.venue}
            </span>
          )}
        </div>

        {/* Tournament */}
        {nextMatch.tournament && (
          <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 rounded-md px-2.5 py-1">
            <Trophy className="w-3 h-3 text-white/60" aria-hidden="true" />
            <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
              {nextMatch.tournament}
            </span>
          </div>
        )}
      </button>

      {/* ═══ RESTEN AV UKEN – scrollbar liste ═══ */}
      {otherMatches.length > 0 ? (
        <div className="mt-4 flex-1 min-h-0 flex flex-col overflow-hidden">
          {/* Uke-header + "Alle"-lenke */}
          <div className="flex items-center justify-between mb-2 px-1 shrink-0">
            <h4 className="font-anton text-sm sm:text-base uppercase text-white/70 tracking-wide">
              {formatWeekHeader(currentWeekKey, currentWeekMatches)}
            </h4>

            <a
              href="/kamper"
              onClick={() => {
                trackEvent("page_view", {
                  page: "/kamper",
                  component: "HeroKamper",
                  action: "navigate_all_matches",
                });
              }}
              className="text-[11px] font-bold text-white/50 hover:text-white/80 transition-colors inline-flex items-center gap-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Alle
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>

          {/* Scrollable area */}
          <ul
            className="flex-1 overflow-y-auto overflow-x-hidden space-y-0.5 pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            role="list"
            aria-label="Kommende hjemmekamper denne uken"
          >
            {otherMatches.map((match) => (
              <li key={match.id}>
                <button
                  type="button"
                  onClick={() => openModal(match, "list")}
                  className="group w-full text-left rounded-lg px-3 py-3 hover:bg-white/[0.07] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white"
                  aria-label={`${match.homeTeam} mot ${match.awayTeam}, ${fmtShort(match.date)}${
                    match.startTime ? ` klokken ${match.startTime}` : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 min-w-0">
                    <div className="flex-1 min-w-0 space-y-1">
                      {/* Date + time */}
                      <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-white/50">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {fmtShort(match.date)}
                        </span>
                        {match.startTime && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                            {match.startTime}
                          </span>
                        )}
                      </div>

                      {/* Teams */}
                      <p className="text-sm text-white leading-snug truncate">
                        <span className="font-bold">{match.homeTeam}</span>
                        <span className="text-white/40 mx-1.5">vs</span>
                        <span className="font-bold">{match.awayTeam}</span>
                      </p>

                      {/* Tournament */}
                      {match.tournament && (
                        <p className="text-[10px] text-white/35 truncate">
                          <Trophy className="w-3 h-3 inline-block mr-1 -mt-px" aria-hidden="true" />
                          {match.tournament}
                        </p>
                      )}
                    </div>

                    <ChevronRight
                      className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all shrink-0 mt-2"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        /* Bare én kamp denne uken */
        <div className="mt-4 text-center py-6">
          <p className="text-white/40 text-xs font-roboto">Ingen flere kamper denne uken</p>
          <a
            href="/kamper"
            onClick={() => {
              trackEvent("page_view", {
                page: "/kamper",
                component: "HeroKamper",
                action: "navigate_all_matches",
              });
            }}
            className="text-xs text-white/60 underline underline-offset-2 hover:text-white/80 mt-1 inline-block transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Se alle kamper
          </a>
        </div>
      )}

      {/* Modal */}
      {selectedMatch && (
        <MatchModal match={selectedMatch} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}