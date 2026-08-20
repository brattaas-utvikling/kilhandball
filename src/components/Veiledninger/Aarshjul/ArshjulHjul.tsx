import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

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
  type ArshjulHendelse,
} from '../../../lib/arshjul';
import HendelseKort from './HendelseKort';

/* ------------------------------------------------------------------ *
 * DESIGN 1 – «Hjulet»
 * Fysisk hjul du drar rundt. 1:1 med fingeren mens du drar, farten din
 * kastes videre inn i en fjær ved slipp, og hjulet klikker på plass i
 * nærmeste måned. Kan gripes midt i bevegelsen.
 * ------------------------------------------------------------------ */

const SEG = 30; // 360 / 12
const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Normaliserer en vinkeldifferanse til [-180, 180] så vi ikke hopper ved ±180°. */
const normaliser = (grader: number) => ((((grader + 180) % 360) + 360) % 360) - 180;

function ManedKnapp({
  index,
  rotasjon,
  radius,
  aktiv,
  antall,
  onVelg,
}: {
  index: number;
  rotasjon: MotionValue<number>;
  radius: number;
  aktiv: boolean;
  antall: number;
  onVelg: (i: number) => void;
}) {
  // Motroter teksten like mye som hjulet + plasseringen: etikettene står alltid rett opp.
  const motrotasjon = useTransform(rotasjon, (r) => -(r + index * SEG));

  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: `rotate(${index * SEG}deg) translateY(${-radius}px)` }}
    >
      <motion.button
        type="button"
        onClick={() => onVelg(index)}
        style={{ rotate: motrotasjon, x: '-50%', y: '-50%' }}
        className={[
          'absolute left-0 top-0 flex h-11 w-14 cursor-pointer touch-manipulation flex-col items-center justify-center rounded-lg',
          'font-anton text-sm tracking-wider transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred focus-visible:ring-offset-2',
          aktiv ? 'bg-kilred text-white' : 'text-kilsvart hover:bg-gray-100',
        ].join(' ')}
        aria-pressed={aktiv}
        aria-label={`${MANEDER[index]}, ${antall} ${antall === 1 ? 'aktivitet' : 'aktiviteter'}`}
      >
        {MANEDER_KORT[index]}
        <span className="mt-0.5 flex h-1 items-center gap-[3px]" aria-hidden="true">
          {Array.from({ length: Math.min(antall, 3) }).map((_, i) => (
            <span
              key={i}
              className={`h-[3px] w-[3px] rounded-full ${aktiv ? 'bg-white/80' : 'bg-gray-400'}`}
            />
          ))}
        </span>
      </motion.button>
    </div>
  );
}

export default function ArshjulHjul({ sesong }: { sesong?: string }) {
  const { perManed, laster, feil } = useArshjulData(sesong);
  const kortereBevegelse = useReducedMotion();

  const hjulRef = useRef<HTMLDivElement>(null);
  const rotasjon = useMotionValue(-(naavaerendeManed() - 1) * SEG);

  const [aktiv, setAktiv] = useState(naavaerendeManed() - 1);
  const aktivRef = useRef(aktiv);
  const drarRef = useRef(false);
  const flyttetRef = useRef(0);

  const [storrelse, setStorrelse] = useState(0);
  const radius = storrelse ? storrelse * 0.375 : 0;

  useEffect(() => {
    const el = hjulRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([oppf]) => setStorrelse(oppf.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Aktiv måned utledes av rotasjonen, ikke av klikk – da stemmer den også midt i en spinn.
  useEffect(() => {
    return rotasjon.on('change', (r) => {
      const i = mod(Math.round(-r / SEG), 12);
      if (i === aktivRef.current) return;
      aktivRef.current = i;
      setAktiv(i);
      // Liten «detent» mens du drar, slik at hakkene kjennes i fingeren.
      if (drarRef.current && typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(3);
    });
  }, [rotasjon]);

  const snapTil = useCallback(
    (mal: number, fart = 0) => {
      if (kortereBevegelse) {
        rotasjon.set(mal);
        return;
      }
      animate(rotasjon, mal, {
        type: 'spring',
        // Bounce bare når brukeren faktisk kastet hjulet – ikke på et rolig klikk.
        bounce: Math.abs(fart) > 250 ? 0.18 : 0,
        duration: 0.45,
        velocity: fart,
      });
    },
    [kortereBevegelse, rotasjon],
  );

  const velgManed = useCallback(
    (i: number) => {
      if (flyttetRef.current > 8) return; // det var en dra-bevegelse, ikke et trykk
      const naa = rotasjon.get();
      const mal = naa + normaliser(-i * SEG - naa);
      snapTil(mal);
    },
    [rotasjon, snapTil],
  );

  // const flyttManed = useCallback(
  //   (retning: 1 | -1) => {
  //     const naa = rotasjon.get();
  //     snapTil(Math.round(naa / SEG) * SEG - retning * SEG);
  //   },
  //   [rotasjon, snapTil],
  // );

  const vinkelFra = useCallback((x: number, y: number) => {
    const boks = hjulRef.current?.getBoundingClientRect();
    if (!boks) return 0;
    return (Math.atan2(y - (boks.top + boks.height / 2), x - (boks.left + boks.width / 2)) * 180) / Math.PI;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      rotasjon.stop(); // grip hjulet der det står akkurat nå
      drarRef.current = true;
      flyttetRef.current = 0;

      let forrigeVinkel = vinkelFra(e.clientX, e.clientY);
      const historikk: { r: number; t: number }[] = [{ r: rotasjon.get(), t: performance.now() }];

      const beveg = (ev: PointerEvent) => {
        const vinkel = vinkelFra(ev.clientX, ev.clientY);
        const delta = normaliser(vinkel - forrigeVinkel);
        forrigeVinkel = vinkel;
        flyttetRef.current += Math.abs(delta);
        rotasjon.set(rotasjon.get() + delta);

        historikk.push({ r: rotasjon.get(), t: performance.now() });
        if (historikk.length > 6) historikk.shift();
      };

      const slipp = () => {
        window.removeEventListener('pointermove', beveg);
        window.removeEventListener('pointerup', slipp);
        window.removeEventListener('pointercancel', slipp);
        drarRef.current = false;

        const naa = performance.now();
        const eldste = historikk.find((p) => naa - p.t < 120) ?? historikk[0];
        const tid = Math.max(naa - eldste.t, 1);
        const fart = Math.max(-1500, Math.min(1500, ((rotasjon.get() - eldste.r) / tid) * 1000));

        // Kast farten framover, og lås på nærmeste hakk.
        const projisert = rotasjon.get() + fart * 0.12;
        snapTil(Math.round(projisert / SEG) * SEG, fart);

        // Slipp klikk igjen etter at bevegelsen er avsluttet
        window.setTimeout(() => {
          flyttetRef.current = 0;
        }, 0);
      };

      window.addEventListener('pointermove', beveg, { passive: true });
      window.addEventListener('pointerup', slipp);
      window.addEventListener('pointercancel', slipp);
    },
    [rotasjon, snapTil, vinkelFra],
  );

  const hendelser: ArshjulHendelse[] = perManed[aktiv] ?? [];

  return (
    <section className="w-full overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="arshjul-hjul-tittel">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <header className="text-center">
          {/* <h2
            id="arshjul-hjul-tittel"
            className="mt-2 font-anton text-3xl uppercase leading-tight tracking-wide text-kilsvart font-semibold sm:text-4xl"
          >
            Årshjul KIL HÅNDBALL
          </h2>
          <p className="mx-auto mt-3 max-w-md font-roboto text-sm leading-relaxed text-gray-600 sm:text-base">
            Dra hjulet rundt, eller trykk på en måned. Da ser du hva som skjer i klubben akkurat da.
          </p> */}
                  {/* Header */}
        <div
          className="text-center mb-12"
        >
          <h1 
            className="uppercase text-anton-4xl md:text-anton-5xl font-anton text-kilsvart mb-4"
          >
            Årshjul KIL Håndball
          </h1>
          <div 
            className="h-1 bg-kilsvart mx-auto mb-6 w-1/4"
          ></div>
          <p 
            className="text-lg text-gray-600 font-roboto max-w-3xl mx-auto leading-relaxed"
          >
            Oversikt over viktige frister og hv asom skjer i klubben.
          </p>
        </div>
        </header>

        {feil ? (
          <p role="alert" className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-5 text-center font-roboto text-sm text-kilsvart">
            {feil}
          </p>
        ) : null}

        {/* Hjulet */}
        <div className="relative mx-auto mt-10 w-[min(88vw,380px)] select-none">
          {/* Pekeren står stille – hjulet snurrer under den */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1">
            <div className="h-0 w-0 border-x-[9px] border-t-[12px] border-x-transparent border-t-kilred" />
          </div>

          <div
            ref={hjulRef}
            onPointerDown={onPointerDown}
            style={{ touchAction: 'none' }}
            className="relative aspect-square w-full cursor-grab rounded-full border-2 border-gray-200 bg-white active:cursor-grabbing"
          >
            {/* Roterende lag */}
            <motion.div className="absolute inset-0" style={{ rotate: rotasjon }}>
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#E5E7EB" strokeWidth="0.4" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const v = ((i * SEG + SEG / 2) * Math.PI) / 180;
                  const sin = Math.sin(v);
                  const cos = Math.cos(v);
                  return (
                    <line
                      key={i}
                      x1={50 + 30 * sin}
                      y1={50 - 30 * cos}
                      x2={50 + 46 * sin}
                      y2={50 - 46 * cos}
                      stroke="#E5E7EB"
                      strokeWidth="0.4"
                    />
                  );
                })}
              </svg>

              {radius > 0 &&
                Array.from({ length: 12 }).map((_, i) => (
                  <ManedKnapp
                    key={i}
                    index={i}
                    rotasjon={rotasjon}
                    radius={radius}
                    aktiv={i === aktiv}
                    antall={perManed[i]?.length ?? 0}
                    onVelg={velgManed}
                  />
                ))}
            </motion.div>

            {/* Navet står stille */}
            <div className="pointer-events-none absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-kilsvart px-3 text-center">
              {/* <FaHandFist className="mb-1.5 h-4 w-4 text-kilred" aria-hidden="true" /> */}
              <img src="/kil-logo.svg" alt="" className="mb-1.5 h-11 w-11 sm:h-16 sm:w-16" />
              <span className="font-anton text-xl uppercase leading-none tracking-wide text-white sm:text-2xl">
                {MANEDER[aktiv]}
              </span>
              <span className="mt-1.5 font-roboto text-[11px] uppercase tracking-widest text-white/60">
                {laster ? '—' : `${hendelser.length} ${hendelser.length === 1 ? 'aktivitet' : 'aktiviteter'}`}
              </span>
            </div>
          </div>

          {/* Alternativ styring: tastatur, mus, og alle som ikke vil dra */}
          {/* <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => flyttManed(-1)}
              className="flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white text-kilsvart transition-transform duration-150 ease-out active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred focus-visible:ring-offset-2 motion-reduce:active:scale-100"
              aria-label="Forrige måned"
            >
              <FaChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="font-roboto text-xs uppercase tracking-[0.2em] text-gray-500">Bla i året</span>
            <button
              type="button"
              onClick={() => flyttManed(1)}
              className="flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-gray-200 bg-white text-kilsvart transition-transform duration-150 ease-out active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred focus-visible:ring-offset-2 motion-reduce:active:scale-100"
              aria-label="Neste måned"
            >
              <FaChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div> */}
        </div>

        {/* Innhold for valgt måned */}
        <div className="mt-8" aria-live="polite">
          {laster ? (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl border border-gray-200 bg-gray-50" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={aktiv}
                initial={{ opacity: 0, y: kortereBevegelse ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: kortereBevegelse ? 0 : -4 }}
                transition={{ duration: kortereBevegelse ? 0 : 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-3"
              >
                {hendelser.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center font-roboto text-sm text-gray-600">
                    Ingenting er lagt inn i {MANEDER[aktiv].toLowerCase()} ennå. Snurr videre til neste måned.
                  </p>
                ) : (
                  hendelser.map((h) => <HendelseKort key={h._id} hendelse={h} />)
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Legende */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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
