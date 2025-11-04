import React, { useState, useMemo } from 'react';
import { ChevronDown, Calendar, MapPin, Clock } from 'lucide-react';

// Type definitions
interface ScheduleData {
  [hall: string]: {
    [time: string]: {
      [day: string]: string;
    };
  };
}

interface HallColors {
  [hall: string]: {
    bg: string;
    text: string;
    hover: string;
    accent: string;
  };
}

type Hall = 'TRÅSTAD' | 'KUSK' | 'MARIKOLLEN';
type Day = 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag';

// Custom hook for schedule logic
const useScheduleData = () => {
  const scheduleData: ScheduleData = {
    TRÅSTAD: {
      "16:00": { Mandag: "J13", Tirsdag: "J16", Onsdag: "G16", Torsdag: "J16", Fredag: "Ledig halltid" },
      "16:30": { Mandag: "J13", Tirsdag: "J16", Onsdag: "G16", Torsdag: "J16", Fredag: "J2016" },
      "17:00": { Mandag: "J13", Tirsdag: "J16", Onsdag: "G16", Torsdag: "J16", Fredag: "J2016" },
      "17:30": { Mandag: "G2017/J2017", Tirsdag: "D", Onsdag: "J2014+J2015/G2016", Torsdag: "D", Fredag: "J2016" },
      "18:00": { Mandag: "G2017/J2017", Tirsdag: "D", Onsdag: "J2014+J2015/G2016", Torsdag: "D", Fredag: "G2014" },
      "18:30": { Mandag: "G2017/J2017", Tirsdag: "D", Onsdag: "J2014+J2015/G2016", Torsdag: "D", Fredag: "G2014" },
      "19:00": { Mandag: "G2015/G2014", Tirsdag: "G2013", Onsdag: "J13", Torsdag: "J15/J16-2", Fredag: "G2014" },
      "19:30": { Mandag: "G2015/G2014", Tirsdag: "G2013", Onsdag: "J13", Torsdag: "J15/J16-2", Fredag: "Ledig halltid" },
      "20:00": { Mandag: "G2015/G2014", Tirsdag: "J16-2/J15", Onsdag: "J13/D40", Torsdag: "J15/J16-2", Fredag: "Ledig halltid" },
      "20:30": { Mandag: "H3", Tirsdag: "J16-2/J15", Onsdag: "D40", Torsdag: "G16", Fredag: "Ledig halltid" },
      "21:00": { Mandag: "H3", Tirsdag: "J16-2/J15", Onsdag: "D40", Torsdag: "G16", Fredag: "Ledig halltid" },
      "21:30": { Mandag: "H3", Tirsdag: "", Onsdag: "", Torsdag: "G16", Fredag: "Ledig halltid" }
    },
    KUSK: {
      "16:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "16:30": { Mandag: "", Tirsdag: "J2016", Onsdag: "", Torsdag: "", Fredag: "" },
      "17:00": { Mandag: "G2018", Tirsdag: "J2016", Onsdag: "", Torsdag: "", Fredag: "" },
      "17:30": { Mandag: "G2018", Tirsdag: "J2016/G2015", Onsdag: "", Torsdag: "J2013/J2014", Fredag: "" },
      "18:00": { Mandag: "J2013", Tirsdag: "G2015", Onsdag: "", Torsdag: "J2013/J2014", Fredag: "" },
      "18:30": { Mandag: "J2013", Tirsdag: "G2015", Onsdag: "", Torsdag: "J2013/J2014", Fredag: "" },
      "19:00": { Mandag: "", Tirsdag: "Rullestol", Onsdag: "", Torsdag: "G2013", Fredag: "" },
      "19:30": { Mandag: "", Tirsdag: "Rullestol", Onsdag: "", Torsdag: "G2013", Fredag: "" },
      "20:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "G2013", Fredag: "" },
      "20:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" }
    },
    MARIKOLLEN: {
      "16:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "16:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "17:00": { Mandag: "J2018", Tirsdag: "G2020", Onsdag: "", Torsdag: "J2020", Fredag: "" },
      "17:30": { Mandag: "J2018", Tirsdag: "G2020", Onsdag: "", Torsdag: "J2020", Fredag: "" },
      "18:00": { Mandag: "G2016", Tirsdag: "G2019", Onsdag: "", Torsdag: "J2019", Fredag: "" },
      "18:30": { Mandag: "G2016", Tirsdag: "G2019", Onsdag: "", Torsdag: "J2019", Fredag: "" },
      "19:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "19:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "20:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:00": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" },
      "21:30": { Mandag: "", Tirsdag: "", Onsdag: "", Torsdag: "", Fredag: "" }
    }
  };

  const timeSlots = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
  const days: Day[] = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"];

  return { scheduleData, timeSlots, days };
};

// Hall selector component
interface HallSelectorProps {
  halls: Hall[];
  currentHall: Hall;
  onHallChange: (hall: Hall) => void;
  hallColors: HallColors;
  isMobile?: boolean;
}

const HallSelector: React.FC<HallSelectorProps> = ({ 
  halls, 
  currentHall, 
  onHallChange, 
  hallColors, 
  isMobile = false 
}) => {
  if (isMobile) {
    return (
      <div className="relative">
        <select 
          value={currentHall} 
          onChange={(e) => onHallChange(e.target.value as Hall)}
          className="w-full bg-white border-2 border-slate-200 text-slate-700 px-4 py-3.5 pr-10 rounded-xl font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none shadow-sm"
        >
          {halls.map(hall => (
            <option key={hall} value={hall}>
              {hall}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-slate-100 p-1 rounded-xl shadow-inner">
        {halls.map((hall) => (
          <button
            key={hall}
            onClick={() => onHallChange(hall)}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              currentHall === hall
                ? `${hallColors[hall].bg} text-white shadow-lg transform scale-105`
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/70'
            }`}
          >
            {hall}
          </button>
        ))}
      </div>
    </div>
  );
};

// Day selector component
interface DaySelectorProps {
  days: Day[];
  currentDay: Day;
  onDayChange: (day: Day) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ days, currentDay, onDayChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onDayChange(day)}
          className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
            currentDay === day
              ? 'bg-blue-500 text-white shadow-lg transform scale-105'
              : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

// Schedule cell component
interface ScheduleCellProps {
  team: string;
  time: string;
  hallColors: HallColors;
  currentHall: Hall;
}

const ScheduleCell: React.FC<ScheduleCellProps> = ({ team, hallColors, currentHall }) => {
  const isEmpty = !team;
  const isOccupied = team.toLowerCase() === 'ledig halltid';
  
  return (
    <div className={`
      relative h-16 flex items-center justify-center text-sm font-medium transition-all duration-150
      ${isEmpty 
        ? 'bg-slate-50 text-slate-400' 
        : isOccupied
          ? 'bg-gray-100 text-gray-600 border-l-4 border-gray-400'
          : `bg-white ${hallColors[currentHall].text} border-l-4 ${hallColors[currentHall].accent}`
      }
    `}>
      {isEmpty ? (
        <span className="text-xs opacity-50">—</span>
      ) : (
        <div className="text-center">
          <div className={`font-semibold ${isOccupied ? 'italic' : ''}`}>{team}</div>
        </div>
      )}
    </div>
  );
};

// Main component
const Treningsoversikt: React.FC = () => {
  const [currentHall, setCurrentHall] = useState<Hall>('TRÅSTAD');
  const [currentDay, setCurrentDay] = useState<Day>('Mandag');
  const { scheduleData, timeSlots, days } = useScheduleData();

  const halls: Hall[] = ['TRÅSTAD', 'KUSK', 'MARIKOLLEN'];

  const hallColors: HallColors = {
    TRÅSTAD: { 
      bg: 'bg-kilred/80', 
      text: 'text-red-700', 
      hover: 'hover:bg-red-400',
      accent: 'border-red-400'
    },
    KUSK: { 
      bg: 'bg-kilblue/80', 
      text: 'text-blue-700', 
      hover: 'hover:bg-blue-400',
      accent: 'border-blue-400'
    },
    MARIKOLLEN: { 
      bg: 'bg-emerald-500', 
      text: 'text-emerald-700', 
      hover: 'hover:bg-emerald-400',
      accent: 'border-emerald-400'
    }
  };

  // Get current day's schedule for mobile
  const currentDaySchedule = useMemo(() => {
    return timeSlots.map(time => ({
      time,
      team: scheduleData[currentHall][time][currentDay] || ''
    }));
  }, [currentHall, currentDay, scheduleData, timeSlots]);

  // Get full week schedule for desktop
  const fullWeekSchedule = useMemo(() => {
    return timeSlots.map(time => ({
      time,
      days: days.map(day => ({
        day,
        team: scheduleData[currentHall][time][day] || ''
      }))
    }));
  }, [currentHall, scheduleData, timeSlots, days]);

  const renderMobileView = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className={`${hallColors[currentHall].bg} text-white p-6 text-center`}>
        <h3 className="text-2xl font-bold mb-1">{currentHall}</h3>
        <div className="flex items-center justify-center text-white/80 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          {currentDay}
        </div>
      </div>
      
      <div className="divide-y divide-slate-100">
        {currentDaySchedule.map(({ time, team }) => (
          <div key={time} className="flex">
            <div className="w-20 bg-slate-50 flex items-center justify-center py-4 border-r border-slate-100">
              <div className="text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                <div className="text-xs font-medium text-slate-600">{time}</div>
              </div>
            </div>
            <div className="flex-1">
              <ScheduleCell
                team={team}
                time={time}
                hallColors={hallColors}
                currentHall={currentHall}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDesktopView = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className={`${hallColors[currentHall].bg} text-white p-6 text-center`}>
        <h3 className="text-2xl font-bold flex items-center justify-center">
          <MapPin className="w-6 h-6 mr-3" />
          {currentHall}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <div 
          className="grid gap-px bg-slate-200 min-w-full" 
          style={{ gridTemplateColumns: '80px repeat(5, minmax(100px, 1fr))' }}
        >
          {/* Header row */}
          <div className="bg-slate-100 font-bold text-center py-4 text-sm text-slate-700 flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2" />
            Tid
          </div>
          {days.map(day => (
            <div key={day} className="bg-slate-100 font-bold text-center py-4 text-sm text-slate-700 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              {day}
            </div>
          ))}

          {/* Schedule rows */}
          {fullWeekSchedule.map(({ time, days: daySchedule }) => (
            <React.Fragment key={time}>
              <div className="bg-slate-50 text-sm text-center py-4 font-medium text-slate-600 flex items-center justify-center border-r border-slate-100">
                {time}
              </div>
              {daySchedule.map(({ day, team }) => (
                <ScheduleCell
                  key={`${time}-${day}`}
                  team={team}
                  time={time}
                  hallColors={hallColors}
                  currentHall={currentHall}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)]  text-white w-screed">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <h1 className="font-anton font-bold text-anton-4xl md:text-anton-5xl mb-6 text-white tracking-wide uppercase text-center">
            Treningsoversikt
          </h1>
          <p className='text-white/80 text-left text-base font-roboto mb-4'>Tabellen nedenfor viser oversikt over treningene til alle lag i KIL Håndball. Det er kun ledig tid der det står "Ledig halltid", alt annet er det andre idretter som disponerer i Kongsvinger Kommune. Ta kontakt med Sportslig utvalg, om man ønsker å benytte seg av treningstider i "Ledig halltid".</p>
          <p className="text-white/60 text-center text-sm font-roboto">
            Sist oppdatert 14. oktober 2025
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto space-y-6">
          {/* Mobile Controls */}
          <div className="md:hidden space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Velg dag
              </label>
              <DaySelector
                days={days}
                currentDay={currentDay}
                onDayChange={setCurrentDay}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Velg hall
              </label>
              <HallSelector
                halls={halls}
                currentHall={currentHall}
                onHallChange={setCurrentHall}
                hallColors={hallColors}
                isMobile={true}
              />
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:block">
            <HallSelector
              halls={halls}
              currentHall={currentHall}
              onHallChange={setCurrentHall}
              hallColors={hallColors}
              isMobile={false}
            />
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="md:hidden">
            {renderMobileView()}
          </div>
          <div className="hidden md:block">
            {renderDesktopView()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Treningsoversikt;