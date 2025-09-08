// components/Kamper.tsx - Komplett versjon med Lucide ikoner
import React, { useState } from 'react';
import { useMatches } from '../hooks/useMatches';
import type { NIFMatch } from '../types/match.types';
import { FaChevronRight } from 'react-icons/fa6';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Trophy,
  Users,
  X,
  Check
} from 'lucide-react';
import ErrorDisplay from './ErrorDisplay';

// Team colors mapping - harmonisk palett basert på KIL-farger
const TEAM_COLORS: Record<string, { primary: string; secondary: string }> = {
  // KIL variants - bruker dine eksisterende farger
  'kongsvinger': { primary: '#C40000', secondary: '#FEE2E2' }, // kilred

  
  // Blå-toner (basert på kilblue/kildarkblue)
  'lhf': { primary: '#0088CD', secondary: '#DBEAFE' }, // kilblue
  'lfh09': { primary: '#0088CD', secondary: '#DBEAFE' }, // kilblue
  'gjøvik': { primary: '#003C75', secondary: '#EBF4FF' }, // kildarkblue
  'flisa': { primary: '#1E40AF', secondary: '#DBEAFE' },
  'furnes': { primary: '#0369A1', secondary: '#E0F2FE' },
  'moelven': { primary: '#2563EB', secondary: '#DBEAFE' },
  
  // svart-toner (nøytrale)
  'elverum': { primary: '#181414', secondary: '#F3F4F6' },
  
  // Varme toner (komplementære til kilred)
  'gausdal': { primary: '#DC2626', secondary: '#FEE2E2' },
  'veldre': { primary: '#DC2626', secondary: '#FFEDD5' },
  'trysil': { primary: '#DC2626', secondary: '#FECACA' },
  
  // Lilla/violet toner (kontrasterende)
  'vipers': { primary: '#7C3AED', secondary: '#EDE9FE' },
  
  // Grønn-toner (naturlige farger)
  'grue': { primary: '#16A34A', secondary: '#DCFCE7' },
  'nordbygda': { primary: '#15803D', secondary: '#BBF7D0' },
  'varde': { primary: '#166534', secondary: '#ECFDF5' },

  // Gule toner (varme og energiske)
  'storhamar': { primary: '#EAB308', secondary: '#FEF3C7' },
  'ottestad': { primary: '#EAB308', secondary: '#FEF3C7' },
  'ring': { primary: '#EAB308', secondary: '#FEF3C7' },
  'jaren': { primary: '#EAB308', secondary: '#FEF3C7' },
  
  // hvite toner (nøytrale)
  'vang': { primary: '#F5F5F5', secondary: '#1F2937' },
  'eidskog': { primary: '#F3F4F6', secondary: '#1F2937' },
  
  // Fallback colors - basert på KIL-palett
  'default_home': { primary: '#181414', secondary: '#F9FAFB' }, // kilsvart
  'default_away': { primary: '#4B5563', secondary: '#F3F4F6' }, // medium grå
};

// Function to get team colors
const getTeamColors = (teamName: string, isHome: boolean = true) => {
  const normalizedName = teamName.toLowerCase();
  
  // Check for exact matches or partial matches
  for (const [key, colors] of Object.entries(TEAM_COLORS)) {
    if (normalizedName.includes(key)) {
      return colors;
    }
  }
  
  // Return fallback color based on home/away
  return isHome ? TEAM_COLORS.default_home : TEAM_COLORS.default_away;
};

// Generate initials from team name
const getTeamInitials = (teamName: string): string => {
  const normalizedName = teamName.toLowerCase();
  
  // Spesielle forkortelser for kjente håndballag
  const teamAbbreviations: Record<string, string> = {
    'kongsvinger': 'KIL',
    'elverum': 'EH',
    'storhamar': 'SIL',
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
  
  // Sjekk om lagnavn inneholder noen av de kjente lagene
  for (const [key, abbreviation] of Object.entries(teamAbbreviations)) {
    if (normalizedName.includes(key)) {
      return abbreviation;
    }
  }
  
  // Fallback: Ta første bokstav av hvert ord, eller bare første bokstav hvis ett ord
  const words = teamName.split(' ').filter(word => word.length > 0);
  
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  
  // For enkeltord, ta kun første bokstav
  return words[0] ? words[0][0].toUpperCase() : 'X';
};

// Status functions with Lucide icons
const getStatusIcon = (status: string) => {
  const iconProps = { className: "w-3 h-3 sm:w-4 sm:h-4" };
  switch (status) {
    case 'scheduled': return <Calendar {...iconProps} />;
    case 'postponed': return <Clock {...iconProps} />;
    case 'cancelled': return <X {...iconProps} />;
    case 'completed': return <Check {...iconProps} />;
    default: return <Calendar {...iconProps} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'text-green-700 bg-green-100 border-green-300';
    case 'postponed': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    case 'cancelled': return 'text-red-700 bg-red-100 border-red-300';
    case 'completed': return 'text-blue-700 bg-blue-100 border-blue-300';
    default: return 'text-gray-700 bg-gray-100 border-gray-300';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'scheduled': return 'Planlagt';
    case 'postponed': return 'Utsatt';
    case 'cancelled': return 'Avlyst';
    case 'completed': return 'Ferdig';
    default: return status;
  }
};

// Modal Component
interface MatchModalProps {
  match: NIFMatch;
  isOpen: boolean;
  onClose: () => void;
}

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
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header with close button */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl flex items-center justify-between">
            <h2 className="text-2xl font-bold text-kilsvart">Kampdetaljer</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Teams with custom colors */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-8 mb-4">
                {/* Home team */}
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2"
                    style={{ backgroundColor: homeColors.primary }}
                  >
                    {getTeamInitials(match.homeTeam)}
                  </div>
                  <h3 className="font-semibold text-kilsvart max-w-32 text-sm leading-tight">
                    {match.homeTeam}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Hjemme</p>
                </div>
                
                <div className="text-4xl font-light text-gray-400">VS</div>
                
                {/* Away team */}
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2"
                    style={{ backgroundColor: awayColors.primary }}
                  >
                    {getTeamInitials(match.awayTeam)}
                  </div>
                  <h3 className="font-semibold text-kilsvart max-w-32 text-sm leading-tight">
                    {match.awayTeam}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Borte</p>
                </div>
              </div>
              
              {/* Status */}
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(match.status)}`}>
                {getStatusText(match.status)}
              </span>
            </div>

            {/* Match Details Grid - KIL style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date & Time */}
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-kilred mr-2" />
                  <h4 className="font-semibold text-kilsvart">Dato & Tid</h4>
                </div>
                <p className="text-gray-700">{formatDate(match.date)}</p>
                <p className="text-lg font-semibold text-kilsvart">
                  {match.startTime}
                  {match.endTime && ` - ${match.endTime}`}
                </p>
              </div>

              {/* Venue */}
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-kilred mr-2" />
                  <h4 className="font-semibold text-kilsvart">Spillested</h4>
                </div>
                <p className="text-gray-700">{match.venue || 'Ikke oppgitt'}</p>
              </div>

              {/* Tournament */}
              {match.tournament && (
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Trophy className="w-5 h-5 text-kilred mr-2" />
                    <h4 className="font-semibold text-kilsvart">Turnering</h4>
                  </div>
                  <p className="text-gray-700">{match.tournament}</p>
                  {match.round && (
                    <p className="text-sm text-gray-500 mt-1">{match.round}</p>
                  )}
                </div>
              )}

              {/* Arrangør - erstatt Match ID */}
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-kilred mr-2" />
                  <h4 className="font-semibold text-kilsvart">Arrangør</h4>
                </div>
                <p className="text-gray-700">{match.organizer || 'Ikke oppgitt'}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-xl border-t">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-kilsvart text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
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

// Match Card Component - OPPDATERT MED LUCIDE IKONER
interface MatchCardProps {
  match: NIFMatch;
  onClick: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'I dag';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'I morgen';
    } else {
      return date.toLocaleDateString('nb-NO', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
    }
  };

  const isUpcoming = () => {
    const matchDate = new Date(match.date);
    const now = new Date();
    return matchDate > now;
  };

  return (
    <div 
      onClick={onClick}
      className="relative flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* Status badge - MED LUCIDE IKONER */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)} flex items-center gap-1`}>
          {getStatusIcon(match.status)}
          <span className="hidden sm:inline">
            {match.status === 'scheduled' && isUpcoming() ? 'Kommende' : 
             match.status === 'completed' ? 'Ferdig' : 
             match.status === 'postponed' ? 'Utsatt' : 
             match.status === 'cancelled' ? 'Avlyst' : 'Planlagt'}
          </span>
        </span>
      </div>

      {/* Match info - OPPDATERT MED BEDRE MOBILE LAYOUT */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-16 sm:pr-20">
        <div className="text-left flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-kilsvart leading-tight">
            <span className="block sm:inline">{match.homeTeam}</span>
            <span className="hidden sm:inline mx-1">vs</span>
            <span className="block sm:inline text-sm sm:text-base text-gray-600 sm:text-kilsvart">
              <span className="sm:hidden">vs </span>{match.awayTeam}
            </span>
          </h3>
          
          {/* Match details - FORBEDRET FOR MOBIL */}
          <div className="space-y-1">
            {/* Date & Time */}
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-kilred flex-shrink-0" />
              <span className="font-medium truncate">{formatDate(match.date)}</span>
              {match.startTime && (
                <>
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-2 sm:ml-4 mr-1 text-kilred flex-shrink-0" />
                  <span className="font-semibold text-kilsvart">{match.startTime}</span>
                </>
              )}
            </div>

            {/* Venue - FORBEDRET TRUNCATION */}
            {match.venue && (
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-kilred flex-shrink-0" />
                <span className="truncate">{match.venue}</span>
              </div>
            )}

            {/* Tournament - SKJULES PÅ SMÅ SKJERMER HVIS NØDVENDIG */}
            {match.tournament && (
              <div className="hidden sm:flex items-center text-sm text-gray-600">
                <Trophy className="w-4 h-4 mr-2 text-kilred flex-shrink-0" />
                <span className="truncate">{match.tournament}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Arrow - JUSTERT POSISJON */}
      <div className="absolute right-3 bottom-3 sm:relative sm:right-auto sm:bottom-auto">
        <FaChevronRight className="text-gray-400 group-hover:text-kilred transition-colors w-3 h-3 sm:w-4 sm:h-4" />
      </div>
    </div>
  );
};

// Main Component - UENDRET
const Kamper: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<NIFMatch | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  const {
    matches,
    loading,
    error,
    lastUpdated,
    refreshMatches,
    clearError
  } = useMatches({
    clubId: '21554',
    refreshInterval: 15,
    autoRefresh: true,
  });

  // Get unique Kongsvinger teams for filter dropdown
  const getKongsvingerTeams = () => {
    const teams = new Set<string>();
    matches.forEach(match => {
      if (match.homeTeam.toLowerCase().includes('kongsvinger')) {
        teams.add(match.homeTeam);
      }
      if (match.awayTeam.toLowerCase().includes('kongsvinger')) {
        teams.add(match.awayTeam);
      }
    });
    return Array.from(teams).sort();
  };

  // Filter matches based on selected team
  const filteredMatches = selectedTeam === 'all' 
    ? matches.filter(match => 
        match.homeTeam.toLowerCase().includes('kongsvinger') ||
        match.awayTeam.toLowerCase().includes('kongsvinger')
      )
    : matches.filter(match => 
        match.homeTeam.toLowerCase().includes(selectedTeam.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(selectedTeam.toLowerCase())
      );

  const handleMatchClick = (match: NIFMatch) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  const handleTeamFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-white pb-12">
      {/* Hero banner - Vises alltid */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)] text-white w-screen">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <h1 className="font-anton font-bold text-anton-4xl md:text-anton-5xl mb-6 text-white tracking-wide uppercase text-center">
            Kampoversikt
          </h1>
          <p className="text-white/60 text-center text-sm font-roboto">
            Her kan du få oversikt over alle kampene til Kongsvinger IL Håndball.
          </p>
        </div>
      </section>

      {/* Main content container */}
      <div className="container mx-auto mt-8 px-4">
        {/* Loading state */}
        {loading && !matches.length ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mx-auto mb-4"></div>
            <p className="text-gray-600">Laster kamper...</p>
          </div>
        ) : error ? (
          /* Error state with ErrorDisplay */
          <ErrorDisplay
            error={error}
            onRetry={refreshMatches}
            onDismiss={clearError}
            loading={loading}
            variant="detailed"
            className="mb-6"
          />
        ) : matches.length === 0 ? (
          /* No matches */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-kilsvart mb-2">Ingen kamper funnet</h3>
            <p className="text-gray-500">Det ser ut til at det ikke er noen kamper registrert.</p>
          </div>
        ) : (
          /* Main content with matches */
          <>
            {/* Filter controls */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8 max-w-7xl mx-auto">
              {/* Left side - Update button and last updated */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={refreshMatches}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-kilred text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  <svg 
                    className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {loading ? 'Oppdaterer...' : 'Oppdater'}
                </button>
                
                {lastUpdated && (
                  <span className="text-sm text-gray-500 text-center sm:text-left">
                    Sist oppdatert: {lastUpdated.toLocaleTimeString('nb-NO')}
                  </span>
                )}
              </div>

              {/* Right side - Filter dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="team-filter" className="text-sm font-medium text-kilsvart sm:whitespace-nowrap">
                  Filtrer på lag:
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <select
                    id="team-filter"
                    value={selectedTeam}
                    onChange={handleTeamFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-kilsvart focus:ring-2 focus:ring-kilred focus:border-kilred outline-none transition-colors w-full sm:min-w-48"
                  >
                    <option value="all">Alle Kongsvinger lag</option>
                    {getKongsvingerTeams().map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                  
                  {/* Clear filter button */}
                  {selectedTeam !== 'all' && (
                    <button
                      onClick={() => setSelectedTeam('all')}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-kilred transition-colors whitespace-nowrap self-start"
                    >
                      Fjern filter
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Results info */}
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Viser {filteredMatches.length} kamper
                {selectedTeam !== 'all' && (
                  <span> for {selectedTeam}</span>
                )}
              </p>
            </div>
            
            {/* Matches grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredMatches.map((match, index) => (
                <MatchCard
                  key={`${match.id}-${index}`}
                  match={match}
                  onClick={() => handleMatchClick(match)}
                />
              ))}
            </div>

            {/* No results message */}
            {filteredMatches.length === 0 && selectedTeam !== 'all' && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-kilsvart mb-2">Ingen kamper funnet</h3>
                <p className="text-gray-500">Ingen kamper funnet for "{selectedTeam}". Prøv et annet lag eller fjern filteret.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {selectedMatch && (
        <MatchModal
          match={selectedMatch}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Kamper;