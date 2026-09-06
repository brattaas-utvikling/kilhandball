import React, { useState, useMemo } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

// ---------------------------------------------------------------- types

interface ScheduleData {
  [hall: string]: {
    [time: string]: {
      [day: string]: string;
    };
  };
}

interface HallStyle {
  /** Fylt bakgrunn for hall-header og valgt knapp */
  bg: string;
  /** Tone bak øktblokkene */
  tint: string;
  /**
   * Ramme rundt øktblokkene — 1 px hele veien + 4 px til venstre.
   * Dette er tilstandsindikatoren (WCAG 1.4.11, 3:1). Lagnavnet står i
   * slate-900, ikke i hall-fargen: kilblue og kildarkblue-500 er lyse nok
   * til å havne på 3,5–3,8:1 som tekst, og det stryker på AA.
   */
  accent: string;
}

interface HallStyles {
  [hall: string]: HallStyle;
}

interface Block {
  /** Indeks i timeSlots der økten starter */
  startIndex: number;
  /** Antall 30-minutters luker økten varer */
  span: number;
  team: string;
}

type Hall = 'TRÅSTAD' | 'KUSK' | 'MARIKOLLEN' | 'LANGELAND';
type Day = 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag';

const FREE_LABEL = 'Ledig halltid';
const SLOT_MINUTES = 30;

// ---------------------------------------------------------------- helpers

const toMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const toTime = (minutes: number): string =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/** Slår sammen påfølgende like økter til én blokk */
const buildBlocks = (
  schedule: ScheduleData[string],
  timeSlots: string[],
  day: string
): Block[] => {
  const blocks: Block[] = [];
  let i = 0;

  while (i < timeSlots.length) {
    const team = schedule[timeSlots[i]]?.[day] || '';
    let j = i + 1;
    if (team) {
      while (j < timeSlots.length && (schedule[timeSlots[j]]?.[day] || '') === team) j++;
    }
    blocks.push({ startIndex: i, span: j - i, team });
    i = j;
  }

  return blocks;
};

const blockRange = (block: Block, timeSlots: string[]): string => {
  const start = timeSlots[block.startIndex];
  const end = toTime(toMinutes(start) + block.span * SLOT_MINUTES);
  return `${start}–${end}`;
};

// ---------------------------------------------------------------- data

const useScheduleData = () => {
  const scheduleData: ScheduleData = {
    TRÅSTAD: {
      "16:00": { Mandag: "J14/J13", Tirsdag: "J16", Onsdag: "Junior", Torsdag: "J16", Fredag: "G2017" },
      "16:30": { Mandag: "J14/J13", Tirsdag: "J16", Onsdag: "Junior", Torsdag: "J16", Fredag: "G2017" },
      "17:00": { Mandag: "J14/J13", Tirsdag: "J16", Onsdag: "Junior", Torsdag: "J16", Fredag: "G2017" },
      "17:30": { Mandag: "G2014/G2015", Tirsdag: "K2/K3", Onsdag: "J2014", Torsdag: "K2/K3", Fredag: FREE_LABEL },
      "18:00": { Mandag: "G2014/G2015", Tirsdag: "K2/K3", Onsdag: "J2014", Torsdag: "K2/K3", Fredag: FREE_LABEL },
      "18:30": { Mandag: "G2014/G2015", Tirsdag: "K2/K3", Onsdag: "J2014", Torsdag: "K2/K3", Fredag: FREE_LABEL },
      "19:00": { Mandag: "G2016", Tirsdag: "J2016", Onsdag: "J14/J13", Torsdag: FREE_LABEL, Fredag: FREE_LABEL },
      "19:30": { Mandag: "G2016", Tirsdag: "J2016", Onsdag: "J14/J13", Torsdag: FREE_LABEL, Fredag: FREE_LABEL },
      "20:00": { Mandag: "G2016", Tirsdag: "J2016", Onsdag: "J14/J13", Torsdag: "Junior", Fredag: FREE_LABEL },
      "20:30": { Mandag: FREE_LABEL, Tirsdag: "D40", Onsdag: "H3", Torsdag: "Junior", Fredag: FREE_LABEL },
      "21:00": { Mandag: FREE_LABEL, Tirsdag: "D40", Onsdag: "H3", Torsdag: "Junior", Fredag: FREE_LABEL },
      "21:30": { Mandag: FREE_LABEL, Tirsdag: "D40", Onsdag: "H3", Torsdag: FREE_LABEL, Fredag: FREE_LABEL }
    },
    KUSK: {
      "16:00": { Mandag: FREE_LABEL, Tirsdag: "", Onsdag: "J2016", Torsdag: "", Fredag: "" },
      "16:30": { Mandag: "J2017", Tirsdag: "", Onsdag: "J2016", Torsdag: "", Fredag: "" },
      "17:00": { Mandag: "J2017", Tirsdag: "", Onsdag: "J2016", Torsdag: "", Fredag: "" },
      "17:30": { Mandag: "J2017", Tirsdag: "", Onsdag: "G13", Torsdag: "", Fredag: "" },
      "18:00": { Mandag: "Rullestol", Tirsdag: "", Onsdag: "G13", Torsdag: "", Fredag: "" },
      "18:30": { Mandag: "Rullestol", Tirsdag: "", Onsdag: "G13", Torsdag: "", Fredag: "" },
      "19:00": { Mandag: "Rullestol", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "19:30": { Mandag: "G13", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:00": { Mandag: "G13", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:30": { Mandag: "G13", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:00": { Mandag: FREE_LABEL, Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:30": { Mandag: FREE_LABEL, Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" }
    },
    MARIKOLLEN: {
      "16:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "16:30": { Mandag: "G2020", Tirsdag: "J2019", Onsdag: "J2018", Torsdag: "J2020", Fredag: "" },
      "17:00": { Mandag: "G2020", Tirsdag: "J2019", Onsdag: "J2018", Torsdag: "J2020", Fredag: "" },
      "17:30": { Mandag: FREE_LABEL, Tirsdag: "G2016", Onsdag: "G2015", Torsdag: "G2019", Fredag: "" },
      "18:00": { Mandag: FREE_LABEL, Tirsdag: "G2016", Onsdag: "G2015", Torsdag: "G2019", Fredag: "" },
      "18:30": { Mandag: "", Tirsdag: "G2017", Onsdag: "", Torsdag: "G2018", Fredag: "" },
      "19:00": { Mandag: "", Tirsdag: "G2017", Onsdag: "", Torsdag: "G2018", Fredag: "" },
      "19:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" }
    },
    LANGELAND: {
      "16:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "16:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "17:00": { Mandag: "", Tirsdag: "J2014", Onsdag: "", Torsdag: "G2014", Fredag: "" },
      "17:30": { Mandag: "", Tirsdag: "J2014", Onsdag: "", Torsdag: "G2014", Fredag: "" },
      "18:00": { Mandag: "", Tirsdag: "J2014", Onsdag: "", Torsdag: "G2014", Fredag: "" },
      "18:30": { Mandag: FREE_LABEL, Tirsdag: FREE_LABEL, Onsdag: "", Torsdag: "", Fredag: "" },
      "19:00": { Mandag: FREE_LABEL, Tirsdag: FREE_LABEL, Onsdag: "", Torsdag: "", Fredag: "" },
      "19:30": { Mandag: FREE_LABEL, Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:00": { Mandag: FREE_LABEL, Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:30": { Mandag: FREE_LABEL, Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" }
    }
  };

  const timeSlots = [
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];
  const days: Day[] = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];

  return { scheduleData, timeSlots, days };
};

// ---------------------------------------------------------------- selectors

interface HallSelectorProps {
  halls: Hall[];
  currentHall: Hall;
  onHallChange: (hall: Hall) => void;
  hallStyles: HallStyles;
  isMobile?: boolean;
}

const HallSelector: React.FC<HallSelectorProps> = ({
  halls,
  currentHall,
  onHallChange,
  hallStyles,
  isMobile = false
}) => {
  if (isMobile) {
    return (
      <div className="relative">
        <select
          value={currentHall}
          onChange={(e) => onHallChange(e.target.value as Hall)}
          aria-label="Velg hall"
          className="w-full appearance-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 pr-10 text-sm font-semibold text-slate-700 shadow-sm transition-[border-color,box-shadow] duration-150 ease-out focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
        >
          {halls.map((hall) => (
            <option key={hall} value={hall}>{hall}</option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        aria-label="Velg hall"
        className="inline-flex flex-wrap justify-center gap-0.5 rounded-xl bg-slate-100 p-1"
      >
        {halls.map((hall) => {
          const isActive = currentHall === hall;
          return (
            <button
              key={hall}
              role="tab"
              aria-selected={isActive}
              onClick={() => onHallChange(hall)}
              className={[
                'rounded-lg px-6 py-3 text-sm font-semibold tracking-[0.005em]',
                'transition-[transform,background-color,color,box-shadow] duration-150',
                'ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]',
                'motion-reduce:transition-none motion-reduce:active:scale-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20',
                isActive
                  ? `${hallStyles[hall].bg} text-white shadow-[0_1px_2px_rgba(15,23,42,0.16),0_4px_12px_rgba(15,23,42,0.10)]`
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
              ].join(' ')}
            >
              {hall}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface DaySelectorProps {
  days: Day[];
  currentDay: Day;
  onDayChange: (day: Day) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ days, currentDay, onDayChange }) => (
  <div role="tablist" aria-label="Velg dag" className="grid grid-cols-3 gap-2 sm:grid-cols-5">
    {days.map((day) => {
      const isActive = currentDay === day;
      return (
        <button
          key={day}
          role="tab"
          aria-selected={isActive}
          onClick={() => onDayChange(day)}
          className={[
            'rounded-xl border-2 px-3 py-3 text-sm font-semibold',
            'transition-[transform,background-color,color,border-color] duration-150',
            'ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]',
            'motion-reduce:transition-none motion-reduce:active:scale-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20',
            isActive
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
          ].join(' ')}
        >
          {day}
        </button>
      );
    })}
  </div>
);

// ---------------------------------------------------------------- legend

const Legend: React.FC<{ style: HallStyle }> = ({ style }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 px-4 py-3 text-xs text-slate-600 md:px-6">
    <span className="flex items-center gap-2">
      <span className={`inline-block h-4 w-4 rounded-[4px] border border-l-4 ${style.tint} ${style.accent}`} />
      Trening
    </span>
    <span className="flex items-center gap-2">
      <span className="inline-block h-4 w-4 rounded-[4px] border-2 border-dashed border-slate-500 bg-white" />
      Ledig halltid
    </span>
    <span className="flex items-center gap-2">
      <span className="inline-block h-4 w-4 rounded-[4px] bg-white ring-1 ring-inset ring-slate-200" />
      Disponert av andre idretter
    </span>
  </div>
);

// ---------------------------------------------------------------- blocks

interface SessionBlockProps {
  block: Block;
  timeSlots: string[];
  style: HallStyle;
  /** 'grid' = ukesrutenett (desktop), 'row' = agenda (mobil) */
  variant?: 'grid' | 'row';
}

const SessionBlock: React.FC<SessionBlockProps> = ({ block, timeSlots, style, variant = 'grid' }) => {
  const isFree = block.team === FREE_LABEL;

  /**
   * Tre tilstander, tre ulike FORMER — ikke tre nyanser av lysegrå:
   *   trening → tonet fyll + heldekkende 1px ramme + 4px kant i hall-fargen
   *   ledig   → hvit + stiplet 2px ramme hele veien rundt
   *   tomt    → helt blankt (ingen ramme, ingen tekst)
   * Et lyst fyll når aldri 3:1 mot hvitt, så fyllet kan ikke bære skillet.
   * Rammene kan: 3,9–5,9:1 mot hvitt for alle fire hallene.
   */
  const shell = isFree
    ? 'border-2 border-dashed border-slate-500 bg-white'
    : `border border-l-4 ${style.accent} ${style.tint}`;

  const label = isFree
    ? 'italic font-medium text-slate-700'
    : 'font-bold text-slate-900';

  if (variant === 'row') {
    return (
      <div className={`flex items-center rounded-xl px-4 py-3.5 ${shell}`}>
        <span className={`text-base tracking-[-0.01em] ${label}`}>{block.team}</span>
      </div>
    );
  }

  return (
    <div className={`m-0.5 flex h-[calc(100%-4px)] flex-col justify-center gap-1 rounded-[10px] px-3 py-2 ${shell}`}>
      <span className={`text-sm leading-tight tracking-[-0.005em] ${label}`}>{block.team}</span>
      <span className="text-[11px] leading-tight tabular-nums text-slate-600">
        {blockRange(block, timeSlots)}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------- main

const Treningsoversikt: React.FC = () => {
  const [currentHall, setCurrentHall] = useState<Hall>('TRÅSTAD');
  const [currentDay, setCurrentDay] = useState<Day>('Mandag');
  const { scheduleData, timeSlots, days } = useScheduleData();

  const halls: Hall[] = ['TRÅSTAD', 'KUSK', 'MARIKOLLEN', 'LANGELAND'];

  const hallStyles: HallStyles = {
    TRÅSTAD: {
      bg: 'bg-kilred',
      tint: 'bg-kilred/15',
      accent: 'border-kilred'
    },
    KUSK: {
      bg: 'bg-kilblue',
      tint: 'bg-kilblue/15',
      accent: 'border-kilblue'
    },
    MARIKOLLEN: {
      bg: 'bg-kildarkblue-500',
      tint: 'bg-kildarkblue-500/15',
      accent: 'border-kildarkblue-500'
    },
    LANGELAND: {
      bg: 'bg-kilsvart-500',
      tint: 'bg-kilsvart-500/15',
      accent: 'border-kilsvart-500'
    }
  };

  const style = hallStyles[currentHall];
  const hallSchedule = scheduleData[currentHall];

  /** Blokker for valgt dag (mobil) */
  const dayBlocks = useMemo(
    () => buildBlocks(hallSchedule, timeSlots, currentDay).filter((b) => b.team),
    [hallSchedule, timeSlots, currentDay]
  );

  /** Blokker for hele uken (desktop) */
  const weekBlocks = useMemo(
    () => days.map((day) => ({ day, blocks: buildBlocks(hallSchedule, timeSlots, day) })),
    [hallSchedule, timeSlots, days]
  );

  // ------------------------------------------------------------ mobil

  const renderMobileView = () => (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.05)]">
      <div className={`${style.bg} px-5 py-4 text-white`}>
        <h3 className="text-lg font-bold tracking-[0.01em]">{currentHall}</h3>
        <p className="mt-0.5 text-sm text-white/75">{currentDay}</p>
      </div>

      {dayBlocks.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-slate-600">
          Ingen oppsatte tider i {currentHall} på {currentDay.toLowerCase()}.
        </p>
      ) : (
        <div className="py-2">
          {dayBlocks.map((block) => (
            <div
              key={`${block.startIndex}-${block.team}`}
              className="grid grid-cols-[84px_1fr] items-stretch gap-3 px-4 py-2"
            >
              <div className="pt-2.5 text-center tabular-nums">
                <span className="block text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
                  {timeSlots[block.startIndex]}
                </span>
                <span className="mt-0.5 block text-[11px] font-medium text-slate-500">
                  til {toTime(toMinutes(timeSlots[block.startIndex]) + block.span * SLOT_MINUTES)}
                </span>
              </div>
              <SessionBlock block={block} timeSlots={timeSlots} style={style} variant="row" />
            </div>
          ))}
        </div>
      )}

      <Legend style={style} />
    </div>
  );

  // ------------------------------------------------------------ desktop

  const renderDesktopView = () => (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.05)]">
      <div className={`${style.bg} px-6 py-4 text-white`}>
        <h3 className="flex items-center text-lg font-bold tracking-[0.01em]">
          <MapPin aria-hidden="true" className="mr-2.5 h-5 w-5" />
          {currentHall}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid min-w-full gap-px bg-slate-200"
          style={{ gridTemplateColumns: '84px repeat(5, minmax(124px, 1fr))' }}
        >
          {/* Header */}
          <div className="bg-white px-2 py-3 text-[11px] font-bold uppercase tracking-[0.045em] text-slate-400">
            Tid
          </div>
          {days.map((day) => (
            <div
              key={day}
              className="bg-white px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.045em] text-slate-500"
            >
              {day}
            </div>
          ))}

          {/* Tidsskinne + bakgrunnsceller */}
          {timeSlots.map((time, rowIndex) => {
            const isFullHour = time.endsWith(':00');
            return (
              <React.Fragment key={time}>
                <div
                  className={[
                    'flex min-h-[54px] items-start justify-end bg-white pr-3 pt-2 text-[11px] tabular-nums',
                    isFullHour ? 'font-bold text-slate-700' : 'font-medium text-slate-500'
                  ].join(' ')}
                  style={{ gridColumn: 1, gridRow: rowIndex + 2 }}
                >
                  {time}
                </div>

                {days.map((day, dayIndex) => {
                  const isEmpty = !(hallSchedule[time]?.[day] || '');
                  return (
                    <div
                      key={`${time}-${day}`}
                      className="min-h-[54px] bg-white"
                      style={{ gridColumn: dayIndex + 2, gridRow: rowIndex + 2 }}
                    >
                      {isEmpty && (
                        <span aria-hidden="true" className="flex h-full items-center justify-center text-xs text-slate-400">
                          —
                        </span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}

          {/* Sammenslåtte øktblokker, lagt oppå rutenettet */}
          {weekBlocks.map(({ day, blocks }, dayIndex) =>
            blocks
              .filter((block) => block.team)
              .map((block) => (
                <div
                  key={`${day}-${block.startIndex}`}
                  style={{
                    gridColumn: dayIndex + 2,
                    gridRow: `${block.startIndex + 2} / span ${block.span}`
                  }}
                >
                  <SessionBlock block={block} timeSlots={timeSlots} style={style} />
                </div>
              ))
          )}
        </div>
      </div>

      <Legend style={style} />
    </div>
  );

  // ------------------------------------------------------------ render

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <section className="-mx-[calc((100vw-100%)/2)] w-screen overflow-hidden bg-gradient-to-b from-kilred to-kilred/70 text-white">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <h1 className="mb-6 text-center font-anton text-anton-4xl font-bold uppercase tracking-[-0.01em] text-white md:text-anton-5xl">
            Treningsoversikt
          </h1>
          <p className="mb-4 max-w-[68ch] mx-auto font-roboto text-base text-white/80">
            Tabellen nedenfor viser oversikt over treningene til alle lag i KIL Håndball. Det er kun
            ledig tid der det står «Ledig halltid», alt annet er det andre idretter som disponerer i
            Kongsvinger Kommune. Ta kontakt med Sportslig utvalg om man ønsker å benytte seg av
            treningstider i «Ledig halltid».
          </p>
          <p className="text-center font-roboto text-sm text-white/60">
            Sist oppdatert 6. september 2026
          </p>
        </div>
      </section>

      {/* Kontroller */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto space-y-6 px-4 md:px-6">
          {/* Mobil */}
          <div className="space-y-4 md:hidden">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Velg dag</label>
              <DaySelector days={days} currentDay={currentDay} onDayChange={setCurrentDay} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Velg hall</label>
              <HallSelector
                halls={halls}
                currentHall={currentHall}
                onHallChange={setCurrentHall}
                hallStyles={hallStyles}
                isMobile
              />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <HallSelector
              halls={halls}
              currentHall={currentHall}
              onHallChange={setCurrentHall}
              hallStyles={hallStyles}
            />
          </div>
        </div>
      </section>

      {/* Oversikt */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="md:hidden">{renderMobileView()}</div>
          <div className="hidden md:block">{renderDesktopView()}</div>
        </div>
      </section>
    </div>
  );
};

export default Treningsoversikt;