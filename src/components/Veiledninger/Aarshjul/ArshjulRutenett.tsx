import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';

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
  kategoriStil,
  naavaerendeManed,
  type ArshjulHendelse,
} from '../../../lib/arshjul';
import HendelseKort from './HendelseKort';

/* ------------------------------------------------------------------ *
 * DESIGN 3 – «Rutenettet»
 * Hele året synlig på én skjerm. Trykk på en måned, og et bunnark
 * sklir opp med detaljene. Arket kan dras ned igjen med fingeren.
 * ------------------------------------------------------------------ */

function Bunnark({
  maned,
  hendelser,
  onLukk,
  onBytt,
}: {
  maned: number;
  hendelser: ArshjulHendelse[];
  onLukk: () => void;
  onBytt: (retning: 1 | -1) => void;
}) {
  const kortereBevegelse = useReducedMotion();
  const dragKontroll = useDragControls();
  const arkRef = useRef<HTMLDivElement>(null);

  // Esc lukker, og siden bak skal ikke scrolle mens arket er oppe.
  useEffect(() => {
    const onTast = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onLukk();
    };
    const forrigeOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onTast);
    arkRef.current?.focus();
    return () => {
      document.body.style.overflow = forrigeOverflow;
      document.removeEventListener('keydown', onTast);
    };
  }, [onLukk]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <motion.button
        type="button"
        onClick={onLukk}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: kortereBevegelse ? 0 : 0.2 }}
        className="absolute inset-0 h-full w-full cursor-default bg-kilsvart/50"
        aria-label="Lukk"
        tabIndex={-1}
      />

      <motion.div
        ref={arkRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bunnark-tittel"
        tabIndex={-1}
        drag={kortereBevegelse ? false : 'y'}
        dragListener={false}
        dragControls={dragKontroll}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.02, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onLukk();
        }}
        initial={{ y: kortereBevegelse ? 0 : '100%', opacity: kortereBevegelse ? 0 : 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: kortereBevegelse ? 0 : '100%', opacity: kortereBevegelse ? 0 : 1 }}
        transition={
          kortereBevegelse
            ? { duration: 0.15 }
            : { type: 'spring', bounce: 0.1, duration: 0.4 }
        }
        className="relative flex max-h-[86dvh] w-full max-w-lg flex-col rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] outline-none"
      >
        {/* Draghåndtak – bare herfra kan arket dras, så listen under kan scrolles fritt */}
        <div
          onPointerDown={(e) => dragKontroll.start(e)}
          style={{ touchAction: 'none' }}
          className="shrink-0 cursor-grab pt-3 active:cursor-grabbing"
        >
          <span className="mx-auto block h-1 w-10 rounded-full bg-gray-300" aria-hidden="true" />

          <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-3 sm:px-5">
            <button
              type="button"
              onClick={() => onBytt(-1)}
              className="flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full text-kilsvart transition-transform duration-150 ease-out active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred motion-reduce:active:scale-100"
              aria-label="Forrige måned"
            >
              <FaChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <h3
              id="bunnark-tittel"
              className="font-anton text-xl uppercase tracking-wide text-kilsvart sm:text-2xl"
            >
              {MANEDER[maned]}
            </h3>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onBytt(1)}
                className="flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full text-kilsvart transition-transform duration-150 ease-out active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred motion-reduce:active:scale-100"
                aria-label="Neste måned"
              >
                <FaChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onLukk}
                className="flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full text-kilsvart transition-transform duration-150 ease-out active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred motion-reduce:active:scale-100"
                aria-label="Lukk"
              >
                <FaXmark className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto overscroll-contain px-4 pb-6 sm:px-5">
          {hendelser.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center font-roboto text-sm text-gray-600">
              Ingenting er lagt inn i {MANEDER[maned].toLowerCase()} ennå.
            </p>
          ) : (
            <ul className="space-y-3">
              {hendelser.map((h, i) => (
                <motion.li
                  key={h._id}
                  initial={kortereBevegelse ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: kortereBevegelse ? 0 : 0.22,
                    delay: kortereBevegelse ? 0 : 0.04 + i * 0.04,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <HendelseKort hendelse={h} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

export default function ArshjulRutenett({ sesong }: { sesong?: string }) {
  const { perManed, laster, feil } = useArshjulData(sesong);
  const [apenManed, setApenManed] = useState<number | null>(null);
  const utloserRef = useRef<HTMLButtonElement | null>(null);
  const denneManeden = naavaerendeManed() - 1;

  const lukk = useCallback(() => {
    setApenManed(null);
    utloserRef.current?.focus(); // fokus tilbake dit brukeren kom fra
  }, []);

  const bytt = useCallback((retning: 1 | -1) => {
    setApenManed((n) => (n === null ? n : (n + retning + 12) % 12));
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white py-14 sm:py-20" aria-labelledby="arshjul-rutenett-tittel">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <header className="max-w-xl">
          <p className="font-roboto text-xs uppercase tracking-[0.2em] text-kilred">Klubbåret</p>
          <h2
            id="arshjul-rutenett-tittel"
            className="mt-2 font-anton text-3xl uppercase leading-tight tracking-wide text-kilsvart sm:text-4xl"
          >
            Hele året på én skjerm
          </h2>
          <p className="mt-3 font-roboto text-sm leading-relaxed text-gray-600 sm:text-base">
            Trykk på en måned for å se hva som skjer. Prikkene viser hva slags aktiviteter det er.
          </p>
        </header>

        {feil ? (
          <p role="alert" className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 font-roboto text-sm text-kilsvart">
            {feil}
          </p>
        ) : null}

        <ul className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
          {MANEDER.map((navn, i) => {
            const hendelser = perManed[i] ?? [];
            const erNa = i === denneManeden;
            const kategorier = Array.from(new Set(hendelser.map((h) => h.kategori))).slice(0, 4);

            return (
              <li key={navn}>
                <button
                  type="button"
                  onClick={(e) => {
                    utloserRef.current = e.currentTarget;
                    setApenManed(i);
                  }}
                  disabled={laster}
                  aria-haspopup="dialog"
                  aria-label={`${navn}, ${hendelser.length} ${
                    hendelser.length === 1 ? 'aktivitet' : 'aktiviteter'
                  }`}
                  className={[
                    'flex h-24 w-full cursor-pointer touch-manipulation flex-col items-start justify-between rounded-xl border p-3 text-left',
                    'transition-[transform,border-color,background-color] duration-150 ease-out',
                    'active:scale-[0.97] motion-reduce:active:scale-100',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kilred focus-visible:ring-offset-2',
                    'disabled:cursor-wait disabled:opacity-60',
                    erNa
                      ? 'border-kilred bg-kilred text-white'
                      : 'border-gray-200 bg-white text-kilsvart hover:border-gray-300 hover:bg-gray-50',
                  ].join(' ')}
                >
                  <span className="flex w-full items-start justify-between">
                    <span className="font-anton text-lg uppercase tracking-wider">{MANEDER_KORT[i]}</span>
                    {erNa ? (
                      <span className="font-roboto text-[10px] font-bold uppercase tracking-widest text-white/80">
                        Nå
                      </span>
                    ) : null}
                  </span>

                  <span className="w-full">
                    <span className="mb-1.5 flex items-center gap-1" aria-hidden="true">
                      {kategorier.map((k) => (
                        <span
                          key={k}
                          className={`h-1.5 w-1.5 rounded-full ${
                            erNa ? 'bg-white/80' : kategoriStil(k).prikk
                          }`}
                        />
                      ))}
                    </span>
                    <span
                      className={`font-roboto text-xs ${erNa ? 'text-white/80' : 'text-gray-500'}`}
                    >
                      {laster ? '—' : hendelser.length === 0 ? 'Rolig' : `${hendelser.length} ting`}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-200 pt-6">
          {KATEGORI_REKKEFOLGE.map((k) => (
            <li key={k} className="inline-flex items-center gap-2 font-roboto text-xs text-gray-600">
              <span className={`h-2 w-2 rounded-full ${KATEGORIER[k].prikk}`} aria-hidden="true" />
              {KATEGORIER[k].label}
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {apenManed !== null ? (
          <Bunnark
            key="bunnark"
            maned={apenManed}
            hendelser={perManed[apenManed] ?? []}
            onLukk={lukk}
            onBytt={bytt}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
