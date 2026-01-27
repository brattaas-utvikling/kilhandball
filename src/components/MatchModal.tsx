// components/MatchModal.tsx
import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Trophy,
  Users,
  X
} from 'lucide-react';
import type { NIFMatch } from '../types/match.types';

interface MatchModalProps {
  match: NIFMatch;
  isOpen: boolean;
  onClose: () => void;
}

// Team colors mapping
const TEAM_COLORS: Record<string, { primary: string; secondary: string }> = {
  'kongsvinger': { primary: '#C40000', secondary: '#FEE2E2' },
  'lhf': { primary: '#0088CD', secondary: '#DBEAFE' },
  'lfh09': { primary: '#0088CD', secondary: '#DBEAFE' },
  'gjøvik': { primary: '#003C75', secondary: '#EBF4FF' },
  'flisa': { primary: '#1E40AF', secondary: '#DBEAFE' },
  'furnes': { primary: '#0369A1', secondary: '#E0F2FE' },
  'moelven': { primary: '#2563EB', secondary: '#DBEAFE' },
  'elverum': { primary: '#181414', secondary: '#F3F4F6' },
  'gausdal': { primary: '#DC2626', secondary: '#FEE2E2' },
  'veldre': { primary: '#DC2626', secondary: '#FFEDD5' },
  'trysil': { primary: '#DC2626', secondary: '#FECACA' },
  'grue': { primary: '#16A34A', secondary: '#DCFCE7' },
  'nordbygda': { primary: '#15803D', secondary: '#BBF7D0' },
  'varde': { primary: '#166534', secondary: '#ECFDF5' },
  'storhamar': { primary: '#EAB308', secondary: '#FEF3C7' },
  'ottestad': { primary: '#EAB308', secondary: '#FEF3C7' },
  'ring': { primary: '#EAB308', secondary: '#FEF3C7' },
  'jaren': { primary: '#EAB308', secondary: '#FEF3C7' },
  'vang': { primary: '#F5F5F5', secondary: '#1F2937' },
  'eidskog': { primary: '#F3F4F6', secondary: '#1F2937' },
  'default_home': { primary: '#181414', secondary: '#F9FAFB' },
  'default_away': { primary: '#4B5563', secondary: '#F3F4F6' },
};

const getTeamColors = (teamName: string, isHome: boolean = true) => {
  const normalizedName = teamName.toLowerCase();
  
  for (const [key, colors] of Object.entries(TEAM_COLORS)) {
    if (normalizedName.includes(key)) {
      return colors;
    }
  }
  
  return isHome ? TEAM_COLORS.default_home : TEAM_COLORS.default_away;
};

const getTeamInitials = (teamName: string): string => {
  const normalizedName = teamName.toLowerCase();
  
  const teamAbbreviations: Record<string, string> = {
    'kongsvinger': 'KIL',
    'elverum': 'EH',
    'storhamar': 'SIL',
    'skarnes': 'SH',
    'lfh09': 'LHF',
    'lhf': 'LHF',
    'larvik': 'LHK',
    'gjøvik': 'GHK',
    'flisa': 'FAL',
    'furnes': 'FH',
    'moelven': 'MIL',
    'gausdal': 'GHK',
    'veldre': 'VH',
    'trysil': 'TIL',
    'grue': 'GIL',
    'nordbygda': 'NIL',
    'varde': 'VIL',
    'ottestad': 'OIL',
    'ring': 'RIL',
    'jaren': 'JIL',
    'vang': 'VH',
    'eidskog': 'EHK'
  };
  
  for (const [key, abbreviation] of Object.entries(teamAbbreviations)) {
    if (normalizedName.includes(key)) {
      return abbreviation;
    }
  }
  
  const words = teamName.split(' ').filter(word => word.length > 0);
  
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  
  return words[0] ? words[0][0].toUpperCase() : 'X';
};

const MatchModal: React.FC<MatchModalProps> = ({ match, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nb-NO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const homeColors = getTeamColors(match.homeTeam, true);
  const awayColors = getTeamColors(match.awayTeam, false);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          
          {/* Modal content - Red gradient background */}
          <div className="relative bg-gradient-to-br from-kilred via-kilred/95 to-kilsvart rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Subtle pattern overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Header with close button */}
            <div className="relative z-10 px-6 py-5 border-b border-white/20 flex items-center justify-between">
              <h2 className="font-anton text-2xl md:text-3xl uppercase text-white">
                Kampdetaljer
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 space-y-8">
              
              {/* Teams with badges */}
              <div className="text-center">
                <div className="grid grid-cols-[1fr_auto_1fr] items-start justify-items-center gap-6 md:gap-8 mb-6 max-w-2xl mx-auto">
                  
                  {/* Home team */}
                  <div className="text-center w-full">
                    <div 
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mb-3 shadow-2xl ring-4 ring-white/30 mx-auto"
                      style={{ 
                        backgroundColor: homeColors.primary,
                        color: homeColors.primary === '#F5F5F5' || homeColors.primary === '#F3F4F6' 
                          ? '#1F2937' 
                          : 'white'
                      }}
                    >
                      {getTeamInitials(match.homeTeam)}
                    </div>
                    <h3 className="font-roboto font-bold text-white text-sm md:text-base leading-tight min-h-[2.5rem] flex items-center justify-center px-2">
                      <span className="line-clamp-2">{match.homeTeam}</span>
                    </h3>
                    <p className="text-xs text-white/60 mt-1">Hjemme</p>
                  </div>
                  
                  {/* VS - centered */}
                  <div className="font-anton text-4xl md:text-5xl text-white/50 self-center">VS</div>
                  
                  {/* Away team */}
                  <div className="text-center w-full">
                    <div 
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mb-3 shadow-2xl ring-4 ring-white/30 mx-auto"
                      style={{ 
                        backgroundColor: awayColors.primary,
                        color: awayColors.primary === '#F5F5F5' || awayColors.primary === '#F3F4F6' 
                          ? '#1F2937' 
                          : 'white'
                      }}
                    >
                      {getTeamInitials(match.awayTeam)}
                    </div>
                    <h3 className="font-roboto font-bold text-white text-sm md:text-base leading-tight min-h-[2.5rem] flex items-center justify-center px-2">
                      <span className="line-clamp-2">{match.awayTeam}</span>
                    </h3>
                    <p className="text-xs text-white/60 mt-1">Borte</p>
                  </div>
                </div>
              </div>

              {/* Match Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                
                {/* Date & Time */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <h4 className="font-roboto font-bold text-white">Dato & Tid</h4>
                  </div>
                  <p className="text-white/80 text-sm mb-2">{formatDate(match.date)}</p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {match.startTime}
                    {match.endTime && <span className="text-white/70"> - {match.endTime}</span>}
                  </p>
                </div>

                {/* Venue */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-white" />
                    <h4 className="font-roboto font-bold text-white">Spillested</h4>
                  </div>
                  <p className="text-white/90 text-lg">{match.venue || 'Ikke oppgitt'}</p>
                </div>

                {/* Tournament */}
                {match.tournament && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="w-5 h-5 text-white" />
                      <h4 className="font-roboto font-bold text-white">Turnering</h4>
                    </div>
                    <p className="text-white/90 text-lg">{match.tournament}</p>
                    {match.round && (
                      <p className="text-sm text-white/60 mt-2">{match.round}</p>
                    )}
                  </div>
                )}

                {/* Organizer */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-white" />
                    <h4 className="font-roboto font-bold text-white">Arrangør</h4>
                  </div>
                  <p className="text-white/90 text-lg">{match.organizer || 'Ikke oppgitt'}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 px-6 py-5 border-t border-white/20 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-colors font-roboto font-bold border border-white/20"
              >
                Lukk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;