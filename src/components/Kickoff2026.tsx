

  import * as React from "react"
  import { motion } from "framer-motion"
  import {
    CalendarDays,
    Clock,
    MapPin,
    Camera,
    Mail,
    ChevronRight,
  } from "lucide-react"
  import { cn } from "@/lib/utils"
  
  /* ─────────────────────────────────────────────────────────────
    Kickoff2026
    Samme oppsett som Handballskole2026:
    rød "full stripe"-header + tokolonne body.
    Plakat til venstre på desktop, øverst på mobil.
    Rekkefølgen i koden = rekkefølgen på skjermen (ingen order-klasser).
     ───────────────────────────────────────────────────────────── */
    const POSTER_SRC =
    "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/6ac757c10035654f7311/view?project=68a9f0da0014cb9bd6ad"
  
  const INFO_ITEMS = [
    { label: "Dato", value: "14. okt.", sub: "Onsdag", Icon: CalendarDays },
    { label: "Start", value: "17.30", sub: "Oppmøte 17.20", Icon: Clock },
    { label: "Sted", value: "Tråstad", sub: "Tråstadhallen", Icon: MapPin },
  ] as const
  
  type ScheduleRow = { time: string; what: string }
  type Schedule = {
    title: string
    kicker: string
    rows: readonly ScheduleRow[]
    footer: string
  }
  
  const PROGRAM: Schedule = {
    title: "Kveldens program",
    kicker: "Onsdag 14. oktober",
    rows: [
      { time: "", what: "Alle lagene presenteres på scenen" },
      { time: "", what: "Lagbilder og fellesbilde av hele klubben" },
      { time: "", what: "Allsang på tribunen" },
      { time: "", what: "Showkamp i rullestolhåndball" },
    ],
    footer: "Dørene åpner 17.30, og vi starter så raskt alle er på plass.",
  }
  
  const FOR_SPILLERE: Schedule = {
    title: "For spillere",
    kicker: "Alle lag",
    rows: [
      { time: "17.20", what: "Oppmøte utenfor hallen, i KIL-drakt" },
      { time: "", what: "Laget sitter sammen med trenere på gulvet på anviste plasser." },
      { time: "", what: "Presenteres oppe på scenen sammen med treneren" },
      { time: "", what: "Etterpå sitter laget på reserverte plasser på tribunen" },
    ],
    footer: "Mangler du drakt? Du får den på kickoffen.",
  }
  
  const SCHEDULES = [PROGRAM, FOR_SPILLERE]
  
  const DETAILS: React.ReactNode[] = [
    <>
      I år samler vi{" "}
      <strong className="text-kilsvart font-semibold">hele klubben</strong>.
      Alle lagene presenteres, fra 2020-kullet og helt opp til seniorspillere på herre- og damelaget.
    </>,
    <>
      Meld spilleren på i Spond-arrangementet til laget innen{" "}
      <strong className="text-kilsvart font-semibold">fredag 9. oktober</strong>.
    </>,
    <>
      Hallen åpner{" "}
      <strong className="text-kilsvart font-semibold">ikke før kl. 17.30</strong>. 
      Oppmøte utenfor hallen fra kl. 17.20. Alle spillere skal være i KIL-drakt.
      Mange kom tidlig i fjor for å få parkering, så lurt å beregne litt ekstra tid.
    </>,
    <>
      Foreldre, søsken, besteforeldre og alle andre som vil heie er hjertelig
      velkomne på tribunen.
    </>,
    <>Kiosken er åpen.</>,
  ]
  
  export function Kickoff2026() {
    return (
      <motion.section
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        aria-label="Kickoff 2026 i Kongsvinger IL Håndball"
        className="mb-14 rounded-2xl overflow-hidden shadow-lg border border-kilsvart-50"
      >
        {/* ═══════════ RED HEADER ═══════════ */}
        <div className="bg-kilred">
          <div className="flex flex-col sm:flex-row sm:items-stretch">
            {/* ── Title block ── */}
            <div className="flex-1 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-center">
              <p className="font-anton text-[11px] tracking-[0.25em] uppercase text-white/90 mb-2">
                Hele klubben samles
              </p>
              <h2 className="font-anton text-[36px] sm:text-[42px] leading-[0.95] uppercase tracking-wide text-white">
                Kickoff
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
          <div
            className={cn(
              "grid gap-8 items-start",
              POSTER_SRC && "lg:grid-cols-[1fr_1.2fr] lg:gap-10"
            )}
          >
            {/* ── Plakat: øverst på mobil, venstre på desktop ── */}
            {POSTER_SRC && (
  <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 lg:mx-0 lg:mt-0 lg:sticky lg:top-24">
    <div className="w-full overflow-hidden lg:rounded-xl lg:shadow-lg lg:border lg:border-kilsvart-50">
      <img
        src={POSTER_SRC}
        alt="Plakat for KIL Håndballs Kickoff onsdag 14. oktober 2026 i Tråstadhallen"
        loading="lazy"
        className="w-full h-auto object-cover lg:transition-transform lg:duration-500 lg:hover:scale-105"
      />
    </div>
  </div>
)}
  
            {/* ── Informasjon: under plakaten på mobil, høyre på desktop ── */}
            <div>
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
  
              {/* Bildeavstemning */}
              <div
                className="mb-7 rounded-xl bg-kilred/5 border border-kilred/10 px-4 py-4 sm:px-5"
                role="note"
              >
                <p className="flex items-center gap-2 font-anton text-sm uppercase tracking-[0.15em] text-kilred m-0 mb-1.5">
                  <Camera className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Husk å svare på bildeavstemningen
                </p>
                <p className="text-sm text-kilsvart-600 leading-relaxed m-0">
                  Vi tar lagbilder og bilder fra kvelden, og noen av dem vil vi
                  gjerne legge ut på kilhandball.no og i sosiale medier. Svar på
                  avstemningen i Spond-gruppa til laget innen{" "}
                  <strong className="text-kilsvart font-semibold">
                    9. oktober
                  </strong>
                  , så vet vi hva vi kan bruke.
                </p>
              </div>
  
              {/* Program + for spillere */}
              <h3 className="font-anton text-sm uppercase tracking-[0.2em] text-kilsvart mb-4">
                Program onsdag 14. oktober
              </h3>
              <div
                className={cn(
                  "grid gap-4 sm:grid-cols-2",
                  POSTER_SRC && "lg:grid-cols-1"
                )}
                role="list"
                aria-label="Program og oppmøte"
              >
                {SCHEDULES.map((group) => (
                  <article
                    key={group.title}
                    role="listitem"
                    className="rounded-xl border border-kilsvart-50 bg-kilsvart-50/30 px-4 py-4"
                  >
                    <div className="mb-3">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-kilred m-0">
                        {group.kicker}
                      </p>
                      <p className="font-anton text-lg text-kilsvart leading-tight tracking-wide mt-0.5 m-0">
                        {group.title}
                      </p>
                    </div>
  
                    <ul className="space-y-1.5 list-none p-0 m-0" role="list">
                      {group.rows.map((row) => (
                        <li key={row.what} className="flex gap-2.5 text-sm">
                          {row.time ? (
                            <span className="font-anton text-kilsvart tabular-nums shrink-0 tracking-wide">
                              {row.time}
                            </span>
                          ) : (
                            <ChevronRight
                              className="w-4 h-4 text-kilred shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                          )}
                          <span className="text-kilsvart-600 leading-snug">
                            {row.what}
                          </span>
                        </li>
                      ))}
                    </ul>
  
                    <p className="mt-3 pt-3 border-t border-kilsvart-50 text-xs text-kilsvart-500 m-0">
                      {group.footer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
  
          {/* ── Footer ── */}
          <div className="mt-8 pt-5 border-t border-kilsvart-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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