import * as React from "react"
import { motion } from "framer-motion"
import {
  CalendarDays,
  MapPin,
  Ticket,
  Music,
  Mail,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   Handballskole2026
   Rød "full stripe"-header + tokolonne body:
   tekst til venstre, plakat til høyre (øverst på mobil).
   ───────────────────────────────────────────────────────────── */

const POSTER_SRC =
  // TODO: bytt til plakaten for 2026 når den er lastet opp i Appwrite
  "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/6aa564fd003069ba92d2/view?project=68a9f0da0014cb9bd6ad&impersonateuserid=&mode=admin"

const INFO_ITEMS = [
  { label: "Dato", value: "27. sept.", sub: "Søndag", Icon: CalendarDays },
  { label: "Sted", value: "KUSK", sub: "Markensveien 20", Icon: MapPin },
  { label: "Pris", value: "100,–", sub: "per deltaker", Icon: Ticket },
] as const

const PROGRAM = [
  {
    trinn: "1. trinn",
    kull: "2020-kullet",
    spond: "LIVQJ",
    disco: "Disco kl. 11.00",
    rows: [
      { time: "09.00", what: "Oppmøte ved inngangen til KUSK-hallen" },
      { time: "09.45", what: "Håndballøkt med fruktpause underveis" },
      { time: "11.00", what: "Takk for treningen – rett på disco!" },
    ],
  },
  {
    trinn: "2. og 3. trinn",
    kull: "2018- og 2019-kullet",
    spond: "EBXWW",
    disco: "Disco kl. 17.00",
    rows: [
      { time: "11.30", what: "Oppmøte ved inngangen til KUSK-hallen" },
      { time: "11.45", what: "Økt 1" },
      { time: "12.30", what: "Fruktpause" },
      { time: "12.45", what: "Økt 2" },
      { time: "13.30", what: "Takk for treningen" },
    ],
  },
  {
    trinn: "4., 5. og 6. trinn",
    kull: "2015-, 2016- og 2017-kullet",
    spond: "XCNLF",
    disco: "Disco kl. 17.00",
    rows: [
      { time: "14.00", what: "Oppmøte ved inngangen til KUSK-hallen" },
      { time: "14.15", what: "Økt 1" },
      { time: "15.00", what: "Fruktpause" },
      { time: "15.15", what: "Økt 2" },
      { time: "16.00", what: "Takk for treningen" },
    ],
  },
] as const

const DETAILS: React.ReactNode[] = [
  <>
    Håndballskolen er for alle barn fra{" "}
    <strong className="text-kilsvart font-semibold">1. til 6. trinn</strong>{" "}
    (2015–2020), og holdes i KUSK-hallen, Markensveien 20.
  </>,
  <>
    Prisen på 100 kroner inkluderer frukt, t-skjorte og drikkeflaske, samt
    saft/brus og pizza på discoen.
  </>,
  <>
    Det er begrensede plasser. Meld på via Spond med gruppekoden for barnets
    kull – se dagsplanen under. Påmeldingsfristen er{" "}
    <strong className="text-kilsvart font-semibold">én uke før</strong>, og det
    er ikke mulig å melde seg på etter fristen.
  </>,
  <>
    Viktig at dere opplyser om eventuelle{" "}
    <strong className="text-kilsvart font-semibold">allergier</strong> ved
    påmelding.
  </>,
  <>
    Alle barn må følges inn av en voksen og sjekkes inn. Det samme gjelder ved
    henting – en voksen må komme inn og krysse ut barnet på lista ved utgangen.
  </>,
]

export function Handballskole2026() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-label="Håndballskole 2026 i Kongsvinger IL Håndball"
      className="mb-14 rounded-2xl overflow-hidden shadow-lg border border-kilsvart-50"
    >
      {/* ═══════════ RED HEADER ═══════════ */}
      <div className="bg-kilred">
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          {/* ── Title block ── */}
          <div className="flex-1 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-center">
            <p className="font-anton text-[11px] tracking-[0.25em] uppercase text-white/90 mb-2">
              Invitasjon til
            </p>
            <h2 className="font-anton text-[36px] sm:text-[42px] leading-[0.95] uppercase tracking-wide text-white">
              Håndballskole
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
                <p className="text-xs text-white/55 mt-0.5 text-center">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ WHITE BODY – 2 kolonner ═══════════ */}
      <div className="bg-white px-6 py-6 sm:px-8 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10 items-start">
          {/* ── Venstre: informasjon (order-2 mobil, order-1 desktop) ── */}
          <div className="order-2 lg:order-1">
            <ul className="space-y-3 mb-7 list-none p-0" role="list">
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

            {/* Disco */}
            <div className="mb-7 rounded-xl bg-kilred/5 border border-kilred/10 px-4 py-4 sm:px-5">
              <p className="flex items-center gap-2 font-anton text-sm uppercase tracking-[0.15em] text-kilred m-0 mb-1.5">
                <Music className="w-4 h-4 shrink-0" aria-hidden="true" />
                Disco i Tråstadhallen
              </p>
              <p className="text-sm text-kilsvart-600 leading-relaxed m-0">
                Etter håndballskolen blir det disco for alle deltakerne, med
                pizza og saft/brus – og kanskje noen premier i
                dansestoppkonkurransen.{" "}
                <strong className="text-kilsvart font-semibold">
                  2020-kullet
                </strong>{" "}
                går rett fra økta til disco kl. 11.00. For{" "}
                <strong className="text-kilsvart font-semibold">
                  2015–2019
                </strong>{" "}
                er discoen kl. 17.00.
              </p>
            </div>

            {/* Dagsplan */}
            <h3 className="font-anton text-sm uppercase tracking-[0.2em] text-kilsvart mb-4">
              Dagsplan søndag 27. september
            </h3>
            <div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
              role="list"
              aria-label="Dagsplan per kull"
            >
              {PROGRAM.map((group) => (
                <article
                  key={group.kull}
                  role="listitem"
                  className="rounded-xl border border-kilsvart-50 bg-kilsvart-50/30 px-4 py-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-3">
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-kilred m-0">
                        {group.trinn}
                      </p>
                      <p className="font-anton text-lg text-kilsvart leading-tight tracking-wide mt-0.5 m-0">
                        {group.kull}
                      </p>
                    </div>
                    <p className="text-xs text-kilsvart-500 m-0">
                      Spond:{" "}
                      <span className="font-anton text-sm text-kilred tracking-widest">
                        {group.spond}
                      </span>
                    </p>
                  </div>

                  <ul className="space-y-1.5 list-none p-0 m-0" role="list">
                    {group.rows.map((row) => (
                      <li key={row.time} className="flex gap-2.5 text-sm">
                        <span className="font-anton text-kilsvart tabular-nums shrink-0 tracking-wide">
                          {row.time}
                        </span>
                        <span className="text-kilsvart-600 leading-snug">
                          {row.what}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 pt-3 border-t border-kilsvart-50 text-xs text-kilsvart-500 m-0">
                    {group.disco}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* ── Høyre: plakat (order-1 mobil, order-2 desktop) ── */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="w-full overflow-hidden rounded-xl shadow-lg border border-kilsvart-50">
              <img
                src={POSTER_SRC}
                alt="Plakat for KIL Håndballs håndballskole 27. september 2026"
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* ── Sponsorer ── */}
        <p className="text-xs text-kilsvart-500 leading-relaxed mt-8 mb-5">
          Takk til våre sponsorer: Sparebank1 Østlandet, REMA 1000, Rimfeldt
          Eiendom, SCHUTZ, ibas Ontrack, eskoleia og Kjell Trandem AS.
        </p>

        {/* ── Footer ── */}
        <div className="pt-5 border-t border-kilsvart-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-kilsvart-500 m-0">
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Spørsmål?{" "}
              <a
                href="mailto:jon.are.br@gmail.com"
                className="text-kilred underline underline-offset-2 hover:text-kilred-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred transition-colors"
              >
                jon.are.br@gmail.com
              </a>
            </span>
          </p>
          <p className="text-sm text-kilsvart-500 italic m-0">
            Vi gleder oss til å se dere! — KIL Håndball
          </p>
        </div>
      </div>
    </motion.section>
  )
}