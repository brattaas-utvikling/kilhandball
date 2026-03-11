import * as React from "react"
import { motion } from "framer-motion"
import { Download, Loader2, AlertCircle, ChevronRight } from "lucide-react"
import { getFileDownload } from "../lib/appwrite"

/* ─────────────────────────────────────────────────────────────
   SaksagendaBanner
   Viser saksagenda for årsmøte + tre nedlastbare PDF-er fra Appwrite Storage.
   ───────────────────────────────────────────────────────────── */

// ── Saksdata fra docx ────────────────────────────────────────

const SAKER = [
  { nr: "01", tittel: "Godkjenning av de stemmeberettigede medlemmer" },
  { nr: "02", tittel: "Valg av dirigent" },
  { nr: "03", tittel: "Valg av protokollfører" },
  { nr: "04", tittel: "Valg av to medlemmer til å underskrive protokollen" },
  { nr: "05", tittel: "Godkjenning av forretningsorden" },
  { nr: "06", tittel: "Godkjenning av innkalling" },
  { nr: "07", tittel: "Godkjenning av sakliste" },
  {
    nr: "08",
    tittel: "Behandling av idrettslagets årsberetning",
    vedlegg: "Vedlegg 1 – Styrets årsberetning",
  },
  {
    nr: "09",
    tittel: "Behandling",
    underpunkter: [
      "a) Idrettslagets årsregnskap – vedlegg 2",
      "b) Styrets økonomiske beretning – vedlegg 3",
      "c) Kontrollutvalgets beretning",
      "d) Sportslig utvalg beretning",
    ],
  },
  { nr: "10", tittel: "Behandling av forslag og saker" },
  {
    nr: "11",
    tittel: "Fastsette medlemskontingent (minst kr 50,–) og treningsavgift",
  },
  { nr: "12", tittel: "Vedta idrettslagets budsjett" },
  { nr: "13", tittel: "Behandling av idrettslagets organisasjonsplan" },
  {
    nr: "14",
    tittel: "Valg v/Valgkomiteen",
    underpunkter: [
      "a) Styre",
      "b) Valg av kontrollutvalg",
      "c) Gi styret fullmakt til å oppnevne representanter til ting og møter i de organisasjonsledd idrettslaget har representasjonsrett.",
      "d) Valgkomité",
    ],
  },
  { nr: "15", tittel: "Signaturrettigheter og fullmakter til disposisjon av konto" },
  { nr: "16", tittel: "Beslutte om revisor skal engasjeres" },
  { nr: "17", tittel: "Avslutning" },
]

// ── Appwrite PDF-nedlasting ──────────────────────────────────

interface PdfDoc {
  label: string
  fileId: string // Appwrite Storage file ID
}

// Bytt ut file ID-ene med de faktiske fra Appwrite Storage
const BUCKET_ID = import.meta.env.VITE_STORAGE_BUCKET_ID as string

const PDF_DOCS: PdfDoc[] = [
  { label: "Årsberetning 2025",        fileId: import.meta.env.VITE_AARSBERETNING_FILE_ID     },
  { label: "Årsregnskap 2025",          fileId: import.meta.env.VITE_AARSREGNSKAP_FILE_ID      },
  { label: "Økonomisk beretning 2025",  fileId: import.meta.env.VITE_OKONOMISK_BERETNING_FILE_ID },
]

// ── PDF-knapp ────────────────────────────────────────────────

function PdfButton({ label, fileId }: PdfDoc) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle")

  const handleDownload = async () => {
    setStatus("loading")
    try {
      // Samme mønster som PraktiskInfo — getFileDownload returnerer URL direkte
      const downloadUrl = getFileDownload(BUCKET_ID, fileId).toString()
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `${label.replace(/\s+/g, "_")}.pdf`
      a.target = "_blank"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setStatus("idle")
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={status === "loading"}
      aria-label={`Last ned ${label} som PDF`}
      className={[
        "group flex items-center gap-2.5 w-full text-left",
        "py-3 transition-colors duration-150 border-b border-kilsvart-50 last:border-0",
        status === "error" ? "opacity-60" : "",
        status === "loading" ? "cursor-wait" : "cursor-pointer",
      ].join(" ")}
    >
      <ChevronRight
        className="w-4 h-4 text-kilsvart shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
      <span className="flex-1 text-sm text-kilsvart-600 font-roboto leading-relaxed group-hover:text-kilsvart transition-colors duration-150">
        {status === "error" ? "Kunne ikke laste ned – prøv igjen" : label}
      </span>
      {status === "loading" ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-kilsvart-400 shrink-0" />
      ) : status === "error" ? (
        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
      ) : (
        <Download className="w-3.5 h-3.5 text-kilsvart-300 group-hover:text-kilsvart shrink-0 transition-colors duration-150" aria-hidden="true" />
      )}
    </button>
  )
}

// ── Saksrad ──────────────────────────────────────────────────

function Saksrad({
  sak,
  index,
}: {
  sak: (typeof SAKER)[number]
  index: number
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.025 }}
      className="flex items-start gap-2.5 py-3 border-b border-kilsvart-50 last:border-0"
    >
      <ChevronRight
        className="w-4 h-4 text-kilsvart shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-kilsvart-600 font-roboto leading-relaxed m-0">
          <span className="font-bold text-kilsvart-800 mr-1.5">Sak {parseInt(sak.nr)}.</span>
          {sak.tittel}
        </p>
        {"underpunkter" in sak && sak.underpunkter && (
          <ul className="mt-1.5 space-y-0.5 list-none p-0">
            {sak.underpunkter.map((punkt, i) => (
              <li key={i} className="text-xs text-kilsvart-500 font-roboto pl-3 border-l-2 border-kilsvart-100">
                {punkt}
              </li>
            ))}
          </ul>
        )}
        {"vedlegg" in sak && sak.vedlegg && (
          <p className="mt-1 text-xs text-kilsvart/70 font-roboto italic">{sak.vedlegg}</p>
        )}
      </div>
    </motion.li>
  )
}

// ── Hovedkomponent ───────────────────────────────────────────

export function SaksagendaBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-label="Saksagenda for årsmøte 2026"
      className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-kilsvart-50 max-w-4xl"
    >
      {/* ══ RØD HEADER — samme struktur som Aarsmoete2026 ═══ */}
      <div className="bg-kilsvart">
        <div className="flex flex-col sm:flex-row sm:items-stretch">

          {/* Title block */}
          <div className="flex-1 px-6 py-6 sm:px-8 sm:py-7 flex flex-col justify-center">
            <p className="font-anton text-[11px] tracking-[0.25em] uppercase text-white/90 mb-2">
              Saksagenda
            </p>
            <h2 className="font-anton text-[36px] sm:text-[42px] leading-[0.95] uppercase tracking-wide text-white m-0">
              Saksliste
              <span className="block text-white/70">2026</span>
            </h2>
          </div>

          {/* Info-kolonner */}
          <div className="grid grid-cols-3" role="list" aria-label="Praktisk informasjon">
            {[
              { label: "Dato",  value: "17. mars", sub: "Tirsdag"  },
              { label: "Tid",   value: "18:00",    sub: " "   },
              { label: "Sted",  value: "KUSK",     sub: "Auditorium" },
            ].map(({ label, value, sub }, i) => (
              <div
                key={label}
                role="listitem"
                className={"flex flex-col items-center justify-between py-5 px-3 sm:px-6 sm:py-7" + (i > 0 ? " border-l border-white/10" : "")}
                style={{ backgroundColor: `rgba(255,255,255,${0.03 + i * 0.02})` }}
              >
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/45 mb-0.5">{label}</p>
                <p className="font-anton text-lg sm:text-[26px] text-white leading-tight tracking-wide">{value}</p>
                <p className="text-xs text-white/55 mt-0.5" aria-hidden={sub === " "}>{sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══ HVIT BUNN ════════════════════════════════════════ */}
      <div className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] divide-y lg:divide-y-0 lg:divide-x divide-kilsvart-50">

          {/* ── Venstre: Saksliste ── */}
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            <p className="font-anton text-[11px] tracking-[0.25em] uppercase text-kilsvart-400 mb-4">
              Saker til behandling
            </p>
            <ul className="list-none p-0 m-0" role="list">
              {SAKER.map((sak, i) => (
                <Saksrad key={sak.nr} sak={sak} index={i} />
              ))}
            </ul>
          </div>

          {/* ── Høyre: PDF-nedlastinger ── */}
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            <p className="font-anton text-[11px] tracking-[0.25em] uppercase text-kilsvart-400 mb-4">
              Saksdokumenter
            </p>
            <ul className="list-none p-0 m-0" role="list">
              {PDF_DOCS.map((doc) => (
                <li key={doc.fileId}>
                  <PdfButton {...doc} />
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer — Velkommen-linje som Aarsmoete2026 */}
        <div className="px-6 pb-5 pt-4 sm:px-8 border-t border-kilsvart-50 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-kilsvart-500 italic m-0 font-roboto">
            Velkommen til årsmøte! — Styret i KIL Håndball
          </p>
        </div>
      </div>
    </motion.section>
  )
}