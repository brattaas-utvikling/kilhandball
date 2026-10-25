import * as React from "react"
import { motion } from "framer-motion"
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   VeteranNM2026 – toppnyhet / reisebrev
   Eyebrow, tittel, ingress, bildekarusell og brødtekst.
   Rekkefølgen i koden = rekkefølgen på skjermen.
   ───────────────────────────────────────────────────────────── */

type Photo = { src: string; alt: string; caption?: string }

/* TODO: bytt ut med bildene fra turen (Appwrite-URLer) */
const PHOTOS: readonly Photo[] = [
  {
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/6addf45e000374b3c579/view?project=68a9f0da0014cb9bd6ad",
    alt: "KIL-laget samlet før første kamp i Veteran-NM",
    
  },
  {
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/6addf4650010705601f4/view?project=68a9f0da0014cb9bd6ad",
    alt: "Spiller skyter på mål i Veteran-NM",
    
  },
  {
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/6addf46d0028522ae9f1/view?project=68a9f0da0014cb9bd6ad",
    alt: "Pause på benken mellom to kamper",
    
  },
  {
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/6addf47800220c2b346f/view?project=68a9f0da0014cb9bd6ad",
    alt: "Jubel etter seier",
    
  },
  {
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/6addf47c003c261a7dc9/view?project=68a9f0da0014cb9bd6ad",
    alt: "Laget på tribunen etter siste kamp",
    
  },
] as const

/* TODO: dato og sted */
const META = {
  date: "23. - 25. oktober 2026",
  place: "Stavanger",
} as const

/* Ingressen – ett kort avsnitt som står alene over bildene */
const INGRESS =
  "Veteran-NM ble spilt i Stavanger i helgen og Kil håndball stilte to lag; Jenter 40 år og Gutter 33 år. ."

/* Brødteksten. Ett element = ett avsnitt. */
const PARAGRAPHS: React.ReactNode[] = [

  <>
  Jentene tok bronsjemedaljen i Bergen for 1 år siden og siktet nok enda høyere i år. Første kamp var en tett batalje mot Gjøvik hvor Kil-jentene seiret med 12-10. Deretter større seire mot henholdsvis Langhus og Holmen.

  </>,
  <>
Lørdag ventet derfor kvartfinale mot Aksla, hvor Kil-jentene hadde god kontroll gjennom kampen, men hvor en alvorlig kneskade på keeper Trine, påvirket kampen som endte med 12-11 seier.
  </>,
  <>
    Semifinale mot Vikhammer var tett og spennende, uavgjort etter fulltid, avgjort på golden goal av straffskytter Maiken for Kil. I finalen søndag ventet hjemmefavoritt Stavanger. Første omgang var tett og spennende, godt forsvarsspill fra begge lag, 5-5 til pause. 7-6 til Stavanger 8 minutter ut i andre omgang. Stavanger legger inn en sluttspurt å vinner til slutt 10-7.
  </>,
    <>
    Sølv er en strålende prestasjon. Bronse i fjor, sølv i år, da er vi spente på neste års veteran-NM i Trondheim. Kil håndball gratulerer med strålende innsats! 
  </>,
  <>
  Spillere for Kil J40: Trine Gusterud Eidlaug, Camilla Lund, Camilla Dræge Gagnes, Maiken Jakobsen, Marie Skarstad, Sarah Bourne Holtet, Helene Fulland, Cathrine de Geer, Anne Sofie Storsve, Linda Skarstad, Kristin Sveen Elseth, Elin Sveen Grønje. Trener: Camilla Veidahl Berg. 
  </>
]

/* ─────────────────────────────────────────────────────────────
   Bildekarusell – scroll-snap, ingen ekstra avhengigheter.
   Swipe på mobil, piler og prikker på desktop, piltaster.
   ───────────────────────────────────────────────────────────── */

function PhotoCarousel({ photos }: { photos: readonly Photo[] }) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)

  const goTo = React.useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(index, photos.length - 1))
      const slide = track.children[clamped] as HTMLElement | undefined
      if (!slide) return
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      })
    },
    [photos.length]
  )

  const handleScroll = () => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const index = Math.round(track.scrollLeft / track.clientWidth)
    setActive(Math.max(0, Math.min(index, photos.length - 1)))
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      goTo(active + 1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      goTo(active - 1)
    }
  }

  return (
    <div>
      <div
        className="relative overflow-hidden lg:rounded-xl lg:border lg:border-kilsvart-50"
        role="group"
        aria-roledescription="bildekarusell"
        aria-label="Bilder fra Veteran-NM"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* ── Spor ── */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className={cn(
            "flex overflow-x-auto snap-x snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className="relative m-0 min-w-full snap-start"
              aria-roledescription="bilde"
              aria-label={`${i + 1} av ${photos.length}`}
            >
              <div className="aspect-[4/3] w-full bg-kilsvart-50">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          ))}
        </div>

        {/* ── Teller ── */}
        <p
          className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-anton text-[11px] tracking-widest text-white m-0"
          aria-hidden="true"
        >
          {active + 1} / {photos.length}
        </p>

        {/* ── Piler ── */}
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Forrige bilde"
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center",
            "rounded-full bg-white/90 text-kilsvart shadow-md transition",
            "hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred",
            "disabled:opacity-0 disabled:pointer-events-none"
          )}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === photos.length - 1}
          aria-label="Neste bilde"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center",
            "rounded-full bg-white/90 text-kilsvart shadow-md transition",
            "hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred",
            "disabled:opacity-0 disabled:pointer-events-none"
          )}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* ── Prikker ── */}
      <div className="mt-3 flex items-center justify-center gap-2 px-6 sm:px-8 lg:px-0">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Gå til bilde ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred",
              i === active
                ? "w-6 bg-kilred"
                : "w-2 bg-kilsvart-50 hover:bg-kilsvart-500/40"
            )}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Bilde {active + 1} av {photos.length}
      </p>
    </div>
  )
}

/* ───────────────────────────────────────────────────────────── */

export function VeteranNM2026() {
  return (
    <motion.section
      id="veteran-nm"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-labelledby="veteran-nm-tittel"
      className="mb-14 rounded-2xl overflow-hidden bg-white shadow-lg border border-kilsvart-50 px-6 py-7 sm:px-8 sm:py-9"
    >
      {/* ═══════════ EYEBROW + TITTEL ═══════════ */}
      <header className="mb-6">

        <h2
          id="veteran-nm-tittel"
          className="font-anton text-[34px] sm:text-[44px] leading-[0.95] uppercase tracking-wide text-kilsvart m-0"
        >
          Veteran-NM <span className="text-kilred">2026</span>
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-kilsvart-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {META.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {META.place}
          </span>
        </div>
      </header>

      {/* ═══════════ INGRESS ═══════════ */}
      <p className="text-base sm:text-lg text-kilsvart font-medium leading-relaxed mb-7 max-w-2xl">
        {INGRESS}
      </p>

      {/* ═══════════ BILDER + BRØDTEKST ═══════════ */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10 items-start">
        {/* ── Karusell: over teksten på mobil, venstre på desktop ── */}
        <div className="-mx-6 sm:-mx-8 lg:mx-0 lg:sticky lg:top-24">
          <PhotoCarousel photos={PHOTOS} />
        </div>

        {/* ── Brødtekst ── */}
        <div className="space-y-4">
          {PARAGRAPHS.map((paragraph, i) => (
            <p key={i} className="text-sm text-kilsvart-600 leading-relaxed m-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  )
}