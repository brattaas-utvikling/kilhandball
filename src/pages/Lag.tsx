// components/Lag.tsx
import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, ChevronRight, X, Loader2 } from "lucide-react"
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "../lib/appwrite"
import type { Team } from "../types/Appwrite"

/* ── Tab type ── */
type TabKey = "jenter" | "gutter"

/* ── Theme helpers ── */
function teamTheme(isJenter: boolean) {
  return isJenter
    ? {
        accentText: "text-kilred",
        accentHoverText: "hover:text-kilred",
        accentFocus: "focus-visible:outline-kilred",

        headerBg: "bg-kilred",
        headerGradient: "bg-gradient-to-r from-kilred via-kilred-600 to-kilred-700",
        badgeBg: "bg-white/15",

        footerBg: "bg-kilred-700",
        footerBtnBg: "bg-kilred",
        footerBtnHover: "hover:bg-kilred-600",

        linkHover: "hover:text-kilred",
        rowHover: "hover:bg-kilred-50/50",

        softRing: "ring-kilred/15",
      }
    : {
        accentText: "text-kilblue",
        accentHoverText: "hover:text-kilblue",
        accentFocus: "focus-visible:outline-kilblue",

        headerBg: "bg-kilblue",
        headerGradient: "bg-gradient-to-r from-kilblue via-kilblue-600 to-kilblue-700",
        badgeBg: "bg-white/15",

        footerBg: "bg-kilblue-700",
        footerBtnBg: "bg-kilblue",
        footerBtnHover: "hover:bg-kilblue-600",

        linkHover: "hover:text-kilblue",
        rowHover: "hover:bg-kilblue-50/50",

        softRing: "ring-kilblue/15",
      }
}

/* ── Team Modal (dynamic color) ── */
// function TeamModal({
//   team,
//   isJenter,
//   onClose,
// }: {
//   team: Team | null
//   isJenter: boolean
//   onClose: () => void
// }) {
//   const th = teamTheme(isJenter)

//   useEffect(() => {
//     if (!team) return
//     const prev = document.body.style.overflow
//     document.body.style.overflow = "hidden"
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose()
//     }
//     document.addEventListener("keydown", handleKey)
//     return () => {
//       document.body.style.overflow = prev
//       document.removeEventListener("keydown", handleKey)
//     }
//   }, [team, onClose])

//   if (!team) return null

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       role="dialog"
//       aria-modal="true"
//       aria-label={`Lagdetaljer for ${team.team_name}`}
//     >
//       <div
//         className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//         onClick={onClose}
//         aria-hidden="true"
//       />

//       <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl bg-white">
//         {/* Header */}
//         <div
//           className={[
//             "sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-kilsvart-100 rounded-t-2xl",
//             th.headerBg,
//           ].join(" ")}
//         >
//           <h2 className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-white">
//             {team.team_name}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1.5 rounded-full hover:bg-white/15 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//             aria-label="Lukk dialog"
//             type="button"
//           >
//             <X className="w-5 h-5 text-white" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-6 py-6 space-y-5">

//           {/* Coach card */}
//           <div className="bg-kilsvart-50 rounded-xl border border-kilsvart-100 p-5">
//             <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-kilsvart-400 mb-3">
//               Hovedtrener
//             </p>
//             <p className="text-lg font-bold text-kilsvart mb-4">
//               {team.coach_name}
//             </p>

//             <div className="space-y-3">
//               <a
//                 href={`mailto:${team.coach_email}`}
//                 className={[
//                   "flex items-center gap-2.5 text-sm text-kilsvart-600 transition-colors rounded",
//                   th.linkHover,
//                   "focus-visible:outline-2 focus-visible:outline-offset-2",
//                   th.accentFocus,
//                 ].join(" ")}
//                 >
//                 <Mail className="w-4 h-4 text-kilsvart-400 shrink-0" aria-hidden="true" />
//                 {team.coach_email}
//               </a>
//               <a
//                 href={`tel:${team.coach_phone}`}
//                 className={[
//                   "flex items-center gap-2.5 text-sm text-kilsvart-600 transition-colors rounded",
//                   th.linkHover,
//                   "focus-visible:outline-2 focus-visible:outline-offset-2",
//                   th.accentFocus,
//                 ].join(" ")}
//                 >
//                 <Phone className="w-4 h-4 text-kilsvart-400 shrink-0" aria-hidden="true" />
//                 {team.coach_phone}
//               </a>
//             </div>
//           </div>
//                 {team.description && team.description.trim() !== "" && (
//                   <p className="text-sm text-kilsvart-500 leading-relaxed">
//                     {team.description}
//                   </p>
//                 )}
//         </div>

//         {/* Footer */}
//         <div
//           className={[
//             "sticky bottom-0 z-10 px-6 py-4 border-t border-kilsvart-100 rounded-b-2xl flex justify-end",
//           ].join(" ")}
//         >
//           <button
//             onClick={onClose}
//             type="button"
//             className={[
//               "px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-colors",
//               th.footerBtnBg,
//               th.footerBtnHover,
//               "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
//             ].join(" ")}
//           >
//             Lukk
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

function TeamModal({
  team,
  isJenter,
  onClose,
}: {
  team: Team | null
  isJenter: boolean
  onClose: () => void
}) {
  const th = teamTheme(isJenter)

  useEffect(() => {
    if (!team) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", handleKey)
    }
  }, [team, onClose])

  if (!team) return null

  const label = isJenter ? "Jentelag" : "Guttelag"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Lagdetaljer for ${team.team_name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className={["relative px-6 pt-6 pb-5", th.headerGradient].join(" ")}>
          {/* subtle pattern */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2">
                <span
                  className={[
                    "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white",
                    th.badgeBg,
                  ].join(" ")}
                >
                  {label}
                </span>
              </div>

              <h2 className="mt-3 font-anton text-2xl uppercase tracking-wide text-white leading-tight">
                {team.team_name}
              </h2>

              <p className="mt-1 text-sm text-white/75">
                Kontakt treneren for treningstider og påmelding.
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="shrink-0 rounded-full p-2 hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Lukk dialog"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Body (scroll area) */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 space-y-5">
          {/* Description */}
          {team.description && team.description.trim() !== "" && (
            <div className={["rounded-2xl bg-kilsvart-50 p-4 ring-1", th.softRing].join(" ")}>
              <p className="text-sm text-kilsvart-600 leading-relaxed">
                {team.description}
              </p>
            </div>
          )}

          {/* Coach card */}
          <div className="rounded-2xl border border-kilsvart-100 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-kilsvart-400">
              Hovedtrener
            </p>
            <p className="mt-2 text-lg font-bold text-kilsvart">{team.coach_name}</p>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <a
                href={`mailto:${team.coach_email}`}
                className={[
                  "group flex items-center gap-3 rounded-xl border border-kilsvart-100 bg-kilsvart-50/60 px-4 py-3 transition-all",
                  "hover:bg-white hover:shadow-sm",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  th.accentFocus,
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-kilsvart-100",
                    "transition-colors",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <Mail className="h-4 w-4 text-kilsvart-500" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-kilsvart-400">E-post</span>
                  <span className={["block text-sm font-semibold truncate", th.accentHoverText].join(" ")}>
                    {team.coach_email}
                  </span>
                </span>
              </a>

              <a
                href={`tel:${team.coach_phone}`}
                className={[
                  "group flex items-center gap-3 rounded-xl border border-kilsvart-100 bg-kilsvart-50/60 px-4 py-3 transition-all",
                  "hover:bg-white hover:shadow-sm",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  th.accentFocus,
                ].join(" ")}
              >
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-kilsvart-100"
                  aria-hidden="true"
                >
                  <Phone className="h-4 w-4 text-kilsvart-500" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-kilsvart-400">Telefon</span>
                  <span className={["block text-sm font-semibold truncate", th.accentHoverText].join(" ")}>
                    {team.coach_phone}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-kilsvart-100 bg-white/80 backdrop-blur px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-kilsvart-400">
              Tips: Du kan trykke <kbd className="rounded border border-kilsvart-200 bg-kilsvart-50 px-1.5 py-0.5 font-mono text-[11px] text-kilsvart-500">Esc</kbd> for å lukke.
            </p>

            <button
              onClick={onClose}
              type="button"
              className={[
                "px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors shadow-sm",
                th.footerBtnBg,
                th.footerBtnHover,
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              ].join(" ")}
            >
              Lukk
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Tabs + List ── */
function TeamTabs({
  jentelag,
  guttelag,
  onSelect,
}: {
  jentelag: Team[]
  guttelag: Team[]
  onSelect: (team: Team, isJenter: boolean) => void
}) {
  const [tab, setTab] = useState<TabKey>("jenter")
  const mobileTeams = tab === "jenter" ? jentelag : guttelag
  const mobileIsJenter = tab === "jenter"

  return (
    <>
      {/* ═══ MOBILE: Tabs (< lg) ═══ */}
      <div className="lg:hidden rounded-2xl overflow-hidden border border-kilsvart-50 shadow-lg">
        {/* Tabs */}
        <div className="grid grid-cols-2" role="tablist" aria-label="Velg jente- eller guttelag">
          <button
            role="tab"
            aria-selected={tab === "jenter"}
            aria-controls="panel-jenter-mobile"
            id="tab-jenter-mobile"
            onClick={() => setTab("jenter")}
            type="button"
            className={`py-4 px-4 font-anton text-base uppercase tracking-wide transition-colors border-b-[3px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-kilred ${
              tab === "jenter"
                ? "bg-kilred-50 text-kilred border-kilred-500"
                : "bg-kilsvart-50/50 text-kilsvart-400 border-transparent hover:text-kilsvart-600"
            }`}
          >
            Jentelag
            <span className="ml-1.5 text-xs font-roboto font-normal opacity-60">({jentelag.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={tab === "gutter"}
            aria-controls="panel-gutter-mobile"
            id="tab-gutter-mobile"
            onClick={() => setTab("gutter")}
            type="button"
            className={`py-4 px-4 font-anton text-base uppercase tracking-wide transition-colors border-b-[3px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-kilblue ${
              tab === "gutter"
                ? "bg-kilblue-50 text-kilblue border-kilblue-500"
                : "bg-kilsvart-50/50 text-kilsvart-400 border-transparent hover:text-kilsvart-600"
            }`}
          >
            Guttelag
            <span className="ml-1.5 text-xs font-roboto font-normal opacity-60">({guttelag.length})</span>
          </button>
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${tab}-mobile`}
          aria-labelledby={`tab-${tab}-mobile`}
          className="bg-white"
        >
          <TeamList
            teams={mobileTeams}
            isJenter={mobileIsJenter}
            onSelect={(t) => onSelect(t, mobileIsJenter)}
          />
        </div>

        <ListFooter />
      </div>

      {/* ═══ DESKTOP: Side-by-side columns (≥ lg) ═══ */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
        {/* Jentelag */}
        <div className="rounded-2xl overflow-hidden border border-kilsvart-50 shadow-lg">
          <div className="bg-kilred px-6 py-4 border-b-[3px] border-kilred-500">
            <h3 className="font-anton text-lg uppercase tracking-wide text-white">
              Jentelag
              <span className="ml-2 text-sm font-roboto font-normal text-white/60">({jentelag.length})</span>
            </h3>
          </div>
          <div className="bg-white">
            <TeamList teams={jentelag} isJenter onSelect={(t) => onSelect(t, true)} />
          </div>
          <ListFooter />
        </div>

        {/* Guttelag */}
        <div className="rounded-2xl overflow-hidden border border-kilsvart-50 shadow-lg">
          <div className="bg-kilblue px-6 py-4 border-b-[3px] border-kilblue-500">
            <h3 className="font-anton text-lg uppercase tracking-wide text-white">
              Guttelag
              <span className="ml-2 text-sm font-roboto font-normal text-white/60">({guttelag.length})</span>
            </h3>
          </div>
          <div className="bg-white">
            <TeamList teams={guttelag} isJenter={false} onSelect={(t) => onSelect(t, false)} />
          </div>
          <ListFooter />
        </div>
      </div>
    </>
  )
}

/* ── Shared team list ── */
function TeamList({
  teams,
  isJenter,
  onSelect,
}: {
  teams: Team[]
  isJenter: boolean
  onSelect: (team: Team) => void
}) {
  if (teams.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-kilsvart-400 text-sm font-roboto">Ingen lag tilgjengelig ennå</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-kilsvart-50 list-none m-0 p-0" role="list">
      {teams.map((team, i) => (
        <motion.li
          key={team.$id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
        >
          <button
            type="button"
            onClick={() => onSelect(team)}
            className={`group w-full flex items-center justify-between gap-4 py-4 px-5 sm:px-6 text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
              isJenter
                ? "hover:bg-kilred-50/50 focus-visible:outline-kilred"
                : "hover:bg-kilblue-50/50 focus-visible:outline-kilblue"
            }`}
            aria-label={`${team.team_name}, trener: ${team.coach_name}`}
          >
            <div className="flex-1 min-w-0">
              <p
                className={`font-anton text-base sm:text-lg tracking-wide text-kilsvart transition-colors ${
                  isJenter ? "group-hover:text-kilred" : "group-hover:text-kilblue"
                }`}
              >
                {team.team_name}
              </p>
              <p className="text-xs sm:text-sm text-kilsvart-400 mt-0.5 truncate">
                {team.coach_name}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5">
                <Mail
                  className={`w-3.5 h-3.5 ${isJenter ? "text-kilred-300" : "text-kilblue-300"}`}
                  aria-hidden="true"
                />
                <Phone
                  className={`w-3.5 h-3.5 ${isJenter ? "text-kilred-300" : "text-kilblue-300"}`}
                  aria-hidden="true"
                />
              </div>
              <ChevronRight
                className="w-4 h-4 text-kilsvart-200 group-hover:text-kilsvart-400 group-hover:translate-x-0.5 transition-all"
                aria-hidden="true"
              />
            </div>
          </button>
        </motion.li>
      ))}
    </ul>
  )
}

/* ── Shared footer ── */
function ListFooter() {
  return (
    <div className="bg-kilsvart-50/50 px-5 sm:px-6 py-3 border-t border-kilsvart-50">
      <p className="text-xs text-kilsvart-400 font-roboto text-center">
        Kontakt treneren direkte for informasjon om treninger og påmelding.
      </p>
    </div>
  )
}

/* ── Main Page ── */
export default function Lag() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // track both team + gender to avoid mismatch
  const [selected, setSelected] = useState<{ team: Team; isJenter: boolean } | null>(null)

  const handleSelectTeam = useCallback((team: Team, isJenter: boolean) => {
    setSelected({ team, isJenter })
  }, [])

  const fetchTeams = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await listDocuments(DATABASE_ID, COLLECTIONS.LAG, [
        Query.equal("is_active", true),
        Query.orderDesc("age_group"),
        Query.limit(50),
      ])
      setTeams(response.documents as unknown as Team[])
    } catch (err) {
      console.error("Error fetching teams:", err)
      setError("Kunne ikke laste lag fra databasen.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  const separateTeams = (allTeams: Team[]) => {
    const jentelag: Team[] = []
    const guttelag: Team[] = []
    allTeams.forEach((team) => {
      const name = team.team_name.toLowerCase()
      if (name.includes("jente") || name.startsWith("j")) {
        jentelag.push(team)
      } else {
        guttelag.push(team)
      }
    })
    return { jentelag, guttelag }
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" role="status">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-kilred animate-spin mx-auto mb-4" aria-hidden="true" />
          <p className="text-kilsvart-500 font-roboto">Laster lag…</p>
          <span className="sr-only">Laster lag</span>
        </div>
      </div>
    )
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-kilred-50 border border-kilred-200 rounded-xl p-6">
            <h2 className="font-anton text-lg text-kilred uppercase tracking-wide mb-2">
              Kunne ikke laste lag
            </h2>
            <p className="text-kilred-600 text-sm font-roboto mb-4">{error}</p>
            <button
              onClick={fetchTeams}
              type="button"
              className="px-5 py-2.5 bg-kilred text-white text-sm font-bold rounded-lg hover:bg-kilred-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Prøv igjen
            </button>
          </div>
        </div>
      </div>
    )
  }

  const { jentelag, guttelag } = separateTeams(teams)

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)] w-screen">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-anton text-anton-4xl md:text-anton-5xl mb-4 text-white tracking-wide uppercase">
              Våre Lag
            </h1>
            <p className="text-lg text-white/70 font-roboto leading-relaxed">
              Møt våre dyktige trenere og finn ut hvilket lag som passer for deg
            </p>
          </motion.div>
        </div>
      </section>

      {/* Teams */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <TeamTabs jentelag={jentelag} guttelag={guttelag} onSelect={handleSelectTeam} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <TeamModal
          team={selected.team}
          isJenter={selected.isJenter}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}