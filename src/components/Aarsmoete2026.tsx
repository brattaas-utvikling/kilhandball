import * as React from "react"
import { motion } from "framer-motion"
import { CalendarDays, Clock, MapPin, Mail, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   AarsmoeteBanner – "Full stripe"-variant
   Responsiv, UU-vennlig, klikkbar e-post
   ───────────────────────────────────────────────────────────── */

const INFO_ITEMS = [
  { label: "Dato", value: "17. mars", sub: "Tirsdag", Icon: CalendarDays },
  { label: "Tid", value: "18:00", sub: "\u00A0", Icon: Clock },
  { label: "Sted", value: "KUSK", sub: "Auditorium", Icon: MapPin },
] as const

const DETAILS: React.ReactNode[] = [
  <>
    Saker som et medlem ønsker behandlet på årsmøtet, må sendes styret senest{" "}
    <strong className="text-kilsvart font-semibold">2. mars 2026</strong> til{" "}
    <a
      href="mailto:post@kilhandball.no"
      className="text-kilred underline underline-offset-2 hover:text-kilred-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred transition-colors"
    >
      post@kilhandball.no
    </a>
    .
  </>,
  <>
    Fullstendig sakliste med alle saksdokumenter vil bli gjort tilgjengelig for
    medlemmene senest én uke før årsmøtet her på vår egen hjemmeside.
  </>,
  <>
    For å ha stemmerett og kunne velges til verv må man ha vært medlem i minst
    én måned, fylle minst 15 år i det kalenderåret årsmøtet avholdes, og ha
    gjort opp sine økonomiske forpliktelser til Kongsvinger IL Håndball.
  </>,
  <>Alle medlemmer har møterett, talerett og forslagsrett.</>,
  <>
    For mer informasjon om årsmøte samt regler om stemmerett, valgbarhet,
    forslagsrett mv., se Kongsvinger IL Håndballs lov.
  </>,
]

export function Aarsmoete2026() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-label="Innkalling til årsmøte 2026 i Kongsvinger IL Håndball"
      className="mb-14 rounded-2xl overflow-hidden shadow-lg border border-kilsvart-50 max-w-4xl"
    >
      {/* ═══════════ RED HEADER ═══════════ */}
      <div className="bg-kilred">
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          {/* ── Title block ── */}
          <div className="flex-1 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-center">
            <p className="font-anton text-[11px] tracking-[0.25em] uppercase text-white/90 mb-2">
              Innkalling til
            </p>
            <h2 className="font-anton text-[36px] sm:text-[42px] leading-[0.95] uppercase tracking-wide text-white">
              Årsmøte
              <span className="block text-white/70">2026</span>
            </h2>
          </div>

          {/* ── Info columns ── */}
          <div
            className="grid grid-cols-3"
            role="list"
            aria-label="Praktisk informasjon"
          >
            {INFO_ITEMS.map(({ label, value, sub, Icon }, i) => (
              <div
                key={label}
                role="listitem"
                className={cn(
                  "flex flex-col items-center justify-between py-5 px-3 sm:px-6 sm:py-7",
                  i > 0 && "border-l border-white/10"
                )}
                style={{
                  backgroundColor: `rgba(0,0,0,${0.04 + i * 0.03})`,
                }}
              >
                <Icon
                  className="w-4 h-4 text-white/40 mb-1.5 hidden sm:block"
                  aria-hidden="true"
                />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/45 mb-0.5">
                  {label}
                </p>
                <p className="font-anton text-lg sm:text-[26px] text-white leading-tight tracking-wide">
                  {value}
                </p>
                <p
                  className="text-xs text-white/55 mt-0.5"
                  aria-hidden={sub === "\u00A0"}
                >
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ WHITE DETAILS ═══════════ */}
      <div className="bg-white px-6 py-6 sm:px-8 sm:py-7">
        <ul className="space-y-3 mb-6 list-none p-0" role="list">
          {DETAILS.map((detail, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <ChevronRight
                className="w-4 h-4 text-kilred shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm text-kilsvart-600 leading-relaxed m-0">
                {detail}
              </p>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="pt-5 border-t border-kilsvart-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-kilsvart-500 m-0">
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Spørsmål?{" "}
              <a
                href="mailto:post@kilhandball.no"
                className="text-kilred underline underline-offset-2 hover:text-kilred-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred transition-colors"
              >
                post@kilhandball.no
              </a>
            </span>
          </p>
          <p className="text-sm text-kilsvart-500 italic m-0">
            Velkommen til årsmøte! — Styret i KIL Håndball
          </p>
        </div>
      </div>
    </motion.section>
  )
}