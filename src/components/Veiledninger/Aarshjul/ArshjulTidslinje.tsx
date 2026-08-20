import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ── Datakilde ───────────────────────────────────────────────────────
 * Nå: hardkodet liste i src/data/aarshjul-data.ts
 * Når Sanity er klart: bytt de to linjene under om på hverandre.
 * Resten av komponenten trenger ingen endringer. */
import { useArshjulLokal as useArshjulData } from '../../../hooks/useArshjulLokal';
// import { useArshjul as useArshjulData } from '../../hooks/useArshjul';

import {
  KATEGORI_REKKEFOLGE,
  KATEGORIER,
  MANEDER,
  MANEDER_KORT,
  naavaerendeManed,
} from '../../../lib/arshjul';
import HendelseKort from './HendelseKort';

/* ------------------------------------------------------------------ *
 * DESIGN 2 – «Tidslinjen»
 * Månedsraden ligger fast øverst mens du scroller. Den aktive måneden
 * følger scrollen, og trykker du på en måned hopper siden dit.
 * Mobil: vannrett rail. Desktop: rail som loddrett kolonne til venstre.
 * ------------------------------------------------------------------ */

interface Props {
  sesong?: string;
  /** Høyden på den faste toppmenyen, i piksler. Rail-en legger seg rett under. */
  toppOffset?: number;
}

export default function ArshjulTidslinje({ sesong, toppOffset = 64 }: Props) {
  const { perManed, laster, feil } = useArshjulData(sesong);
  const kortereBevegelse = useReducedMotion();

  const [aktiv, setAktiv] = useState(naavaerendeManed() - 1);
  const seksjonRefs = useRef<Array<HTMLElement | null>>([]);
  const railRef = useRef<HTMLUListElement>(null);
  const chipRefs = useRef<Array<HTMLLIElement | null>>([]);
  const denneManeden = naavaerendeManed() - 1;

  // Aktiv måned følger scrollposisjonen. rAF-strupet, så det er gratis.
  useEffect(() => {
    let ventende = false;
    const grense = toppOffset + 96;

    const oppdater = () => {
      ventende = false;
      let ny = 0;
      seksjonRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= grense) ny = i;
      });
      setAktiv((forrige) => (forrige === ny ? forrige : ny));
    };

    const onScroll = () => {
      if (ventende) return;
      ventende = true;
      requestAnimationFrame(oppdater);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    oppdater();
    return () => window.removeEventListener('scroll', onScroll);
  }, [toppOffset]);

  // Hold den aktive chipen synlig i den vannrette rail-en – uten å flytte selve siden.
  useEffect(() => {
    const rail = railRef.current;
    const chip = chipRefs.current[aktiv];
    if (!rail || !chip) return;
    if (rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({
      left: chip.offsetLeft - rail.clientWidth / 2 + chip.offsetWidth / 2,
      behavior: kortereBevegelse ? 'auto' : 'smooth',
    });
  }, [aktiv, kortereBevegelse]);

  const hoppTil = useCallback(
    (i: number) => {
      seksjonRefs.current[i]?.scrollIntoView({
        behavior: kortereBevegelse ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [kortereBevegelse],
  );

  return (
    <section className="w-full overflow-hidden bg-white pb-16 pt-14 sm:pt-20" aria-labelledby="arshjul-tidslinje-tittel">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <header className="max-w-xl">
          <p className="font-roboto text-xs uppercase tracking-[0.2em] text-kilred">Klubbåret</p>
          <h2
            id="arshjul-tidslinje-tittel"
            className="mt-2 font-anton text-3xl uppercase leading-tight tracking-wide text-kilsvart sm:text-4xl"
          >
            Måned for måned
          </h2>
          <p className="mt-3 font-roboto text-sm leading-relaxed text-gray-600 sm:text-base">
            Hele sesongen i rekkefølge, fra oppstart til sommerferie. Trykk på en måned for å hoppe rett dit.
          </p>
        </header>

        {feil ? (
          <p role="alert" className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 font-roboto text-sm text-kilsvart">
            {feil}
          </p>
        ) : null}

        <div className="mt-8 lg:grid lg:grid-cols-[9rem_minmax(0,1fr)] lg:items-start lg:gap-10">
          {/* Månedsrail */}
          <nav
            aria-label="Velg måned"
            className="sticky z-10 -mx-4 border-b border-gray-200 bg-white px-4 py-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:self-start lg:border-b-0 lg:px-0 lg:py-0"
            style={{ top: toppOffset }}
          >
            <ul
              ref={railRef}
              className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-1 lg:overflow-visible"
            >
              {MANEDER.map((navn, i) => {
                const erAktiv = i === aktiv;
                const antall = perManed[i]?.length ?? 0;
                return (
                  <li
                    key={navn}
                    ref={(el) => {
                      chipRefs.current[i] = el;
                    }}
                    className="shrink-0 lg:w-full"
                  >
                    <button
                      type="button"
                      onClick={() => hoppTil(i)}
                      aria-current={erAktiv ? 'true' : undefined}
                      className={[
                        'relative flex h-11 w-14 cursor-pointer touch-manipulation items-center justify-center rounded-lg',
                        'font-anton text-sm tracking-wider transition-colors duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred focus-visible:ring-offset-2',
                        'lg:h-10 lg:w-full lg:justify-start lg:px-3',
                        erAktiv ? 'text-white' : 'text-kilsvart hover:bg-gray-100',
                      ].join(' ')}
                    >
                      {erAktiv ? (
                        <motion.span
                          layoutId="arshjul-maned-pille"
                          className="absolute inset-0 rounded-lg bg-kilred"
                          transition={
                            kortereBevegelse
                              ? { duration: 0 }
                              : { type: 'spring', bounce: 0, duration: 0.35 }
                          }
                        />
                      ) : null}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {MANEDER_KORT[i]}
                        {i === denneManeden && !erAktiv ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-kilred" aria-label="denne måneden" />
                        ) : null}
                        {antall > 0 ? (
                          <span
                            className={`hidden font-roboto text-[11px] font-normal lg:inline ${
                              erAktiv ? 'text-white/70' : 'text-gray-500'
                            }`}
                          >
                            {antall}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Tidslinjen */}
          <div className="relative mt-8 lg:mt-0">
            <span
              className="absolute bottom-4 left-[7px] top-3 w-px bg-gray-200 lg:left-[7px]"
              aria-hidden="true"
            />

            {laster ? (
              <div className="space-y-4 pl-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-24 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
                ))}
              </div>
            ) : (
              MANEDER.map((navn, i) => {
                const hendelser = perManed[i] ?? [];
                return (
                  <section
                    key={navn}
                    ref={(el) => {
                      seksjonRefs.current[i] = el;
                    }}
                    aria-labelledby={`maned-${i}`}
                    className="relative pb-8 pl-8"
                    style={{ scrollMarginTop: toppOffset + 88 }}
                  >
                    <span
                      className={`absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 ${
                        i === denneManeden ? 'border-kilred bg-kilred' : 'border-gray-300 bg-white'
                      }`}
                      aria-hidden="true"
                    />

                    <div className="flex items-baseline gap-3">
                      <h3
                        id={`maned-${i}`}
                        className="font-anton text-xl uppercase tracking-wide text-kilsvart sm:text-2xl"
                      >
                        {navn}
                      </h3>
                      {i === denneManeden ? (
                        <span className="rounded-full bg-kilred px-2 py-0.5 font-roboto text-[11px] font-bold uppercase tracking-wider text-white">
                          Nå
                        </span>
                      ) : null}
                    </div>

                    {hendelser.length === 0 ? (
                      <p className="mt-2 font-roboto text-sm text-gray-500">Rolig måned – ingenting planlagt.</p>
                    ) : (
                      <motion.ul
                        initial={kortereBevegelse ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        transition={{ duration: kortereBevegelse ? 0 : 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className="mt-3 space-y-3"
                      >
                        {hendelser.map((h) => (
                          <li key={h._id}>
                            <HendelseKort hendelse={h} />
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </section>
                );
              })
            )}
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-200 pt-6">
          {KATEGORI_REKKEFOLGE.map((k) => (
            <li key={k} className="inline-flex items-center gap-2 font-roboto text-xs text-gray-600">
              <span className={`h-2 w-2 rounded-full ${KATEGORIER[k].prikk}`} aria-hidden="true" />
              {KATEGORIER[k].label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
