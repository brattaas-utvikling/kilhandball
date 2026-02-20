// components/MatchModal.tsx
import React, { useEffect, useRef, useCallback } from "react"
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  X,
  Clock,
} from "lucide-react"
import type { NIFMatch } from "../types/match.types"
import { getTeamInfo, type TeamInfo  } from "@/lib/teaminfo"


interface MatchModalProps {
  match: NIFMatch
  isOpen: boolean
  onClose: () => void
}

/* ── Helpers ── */

function formatDate(s: string) {
  const d = new Date(s)
  if (isNaN(d.getTime())) return ""
  return d.toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/* ── Badge ── */

function TeamBadge({ info, name, label }: { info: TeamInfo; name: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-0">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg ring-[3px] ring-white/25"
        style={{
          backgroundColor: info.primary,
          color: info.lightPrimary ? "#1F2937" : "#fff",
        }}
        aria-hidden="true"
      >
        {info.initials}
      </div>
      <p className="font-roboto font-bold text-white text-xs sm:text-sm leading-tight text-center line-clamp-2 max-w-[120px]">
        {name}
      </p>
      <p className="text-[10px] text-white/50 uppercase tracking-wider">
        {label}
      </p>
    </div>
  )
}

/* ── Detail row ── */

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <Icon className="w-4 h-4 text-white/50 mt-0.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-0.5">
          {label}
        </p>
        <div className="text-sm text-white/90 leading-snug">{children}</div>
      </div>
    </div>
  )
}

/* ── Modal ── */

const MatchModal: React.FC<MatchModalProps> = ({ match, isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener("keydown", handleKey)
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, handleKey])

  if (!isOpen) return null

  const homeInfo = getTeamInfo(match.homeTeam, true)
  const awayInfo = getTeamInfo(match.awayTeam, false)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Kampdetaljer: ${match.homeTeam} mot ${match.awayTeam}`}
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl bg-gradient-to-b from-kilred via-kilred-600 to-kilred-700">
        {/* ── Header ── */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 border-b border-white/15 bg-kilred rounded-t-2xl">
          <h2 className="font-anton text-lg sm:text-xl uppercase text-white tracking-wide">
            Kampdetaljer
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/15 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Lukk dialog"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-5 py-6 sm:px-6 sm:py-7 space-y-6">
          {/* Teams face-off */}
          <div className="flex items-start justify-center gap-6 sm:gap-10">
            <TeamBadge info={homeInfo} name={match.homeTeam} label="Hjemme" />

            <div className="flex flex-col items-center pt-4">
              <div className="flex items-center gap-1 mb-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: homeInfo.primary }}
                  aria-hidden="true"
                />
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: awayInfo.primary }}
                  aria-hidden="true"
                />
              </div>
              <span className="font-anton text-3xl sm:text-4xl text-white/35">VS</span>
            </div>

            <TeamBadge info={awayInfo} name={match.awayTeam} label="Borte" />
          </div>

          {/* Details */}
          <div className="bg-white/10 rounded-xl border border-white/15 px-4 py-3 divide-y divide-white/10">
            <DetailRow icon={Calendar} label="Dato">
              {formatDate(match.date)}
            </DetailRow>

            {match.startTime && (
              <DetailRow icon={Clock} label="Tid">
                <span className="font-bold text-white">
                  {match.startTime}
                </span>
                {match.endTime && (
                  <span className="text-white/50"> – {match.endTime}</span>
                )}
              </DetailRow>
            )}

            <DetailRow icon={MapPin} label="Spillested">
              {match.venue || "Ikke oppgitt"}
            </DetailRow>

            {match.tournament && (
              <DetailRow icon={Trophy} label="Turnering">
                {match.tournament}
                {match.round && (
                  <span className="text-white/50 ml-1">({match.round})</span>
                )}
              </DetailRow>
            )}

            {match.organizer && (
              <DetailRow icon={Users} label="Arrangør">
                {match.organizer}
              </DetailRow>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="sticky bottom-0 z-20 px-5 py-4 bg-kilred-700 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-sm font-bold text-white hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Lukk
          </button>
        </div>
      </div>
    </div>
  )
}

export default MatchModal