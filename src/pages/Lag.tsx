import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { listDocuments, DATABASE_ID, COLLECTIONS, Query } from "../lib/appwrite";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { Team } from "../types/Appwrite";

// Modal komponent for lagdetaljer
function TeamModal({ 
  team, 
  isOpen, 
  onOpenChange 
}: { 
  team: Team | null; 
  isOpen: boolean; 
  onOpenChange: (open: boolean) => void;
}) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onOpenChange]);

  if (!team) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="w-[95vw] max-w-lg max-h-[95vh] overflow-y-auto bg-white dark:bg-kilsvart-900 
                   mx-auto my-2 sm:my-8 p-4 sm:p-6"
      >
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-xl sm:text-2xl font-anton text-kilsvart-900 dark:text-white pr-8 tracking-wide">
            {team.team_name}
          </DialogTitle>
          {team.description && team.description.trim() !== '' && (
            <DialogDescription className="text-sm sm:text-base text-start font-roboto text-kilsvart-600 dark:text-kilsvart-300">
              {team.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-4">
          {/* Trener Info */}
          <div className="p-4 sm:p-6  dark:bg-kilsvart-800 rounded-xl border-l-4 border-b-4 border-kilred">
            <h4 className="font-anton text-anton-lg text-kilsvart-900 dark:text-white tracking-wide mb-4">
              HOVEDTRENER
            </h4>
            
            <div className="space-y-4">
              {/* Navn */}
              <div className="flex justify-between items-center">
                <span className="font-roboto font-medium text-kilsvart-900 dark:text-white text-sm sm:text-base">
                  Navn
                </span>
                <span className="text-kilsvart-600 dark:text-kilsvart-300 font-roboto text-sm sm:text-base">
                  {team.coach_name}
                </span>
              </div>

              {/* E-post */}
              <div className="flex justify-between items-center">
                <span className="font-roboto font-medium text-kilsvart-900 dark:text-white text-sm sm:text-base">
                  E-post
                </span>
                <a 
                  href={`mailto:${team.coach_email}`}
                  className="text-kilred dark:text-kilred-300 font-roboto text-sm sm:text-base hover:underline flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  {team.coach_email}
                </a>
              </div>

              {/* Telefon */}
              <div className="flex justify-between items-center">
                <span className="font-roboto font-medium text-kilsvart-900 dark:text-white text-sm sm:text-base">
                  Telefon
                </span>
                <a 
                  href={`tel:${team.coach_phone}`}
                  className="text-kilred dark:text-kilred-300 font-roboto text-sm sm:text-base hover:underline flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  {team.coach_phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4 sm:mt-6">
          <Button
            className="w-full font-roboto font-medium bg-transparent border-2 border-kilred text-kilred hover:bg-kilred hover:text-white dark:border-kilred-400 dark:text-kilred-400 dark:hover:bg-kilred-600 dark:hover:text-white text-sm sm:text-base"
            onClick={() => onOpenChange(false)}
          >
            Lukk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Team List Component
function TeamList({ 
  teams, 
  title, 
  onTeamClick 
}: { 
  teams: Team[]; 
  title: string; 
  onTeamClick: (team: Team) => void;
}) {
  if (teams.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-kilred-lg border border-kilred-100/50 overflow-hidden">
        <div className="bg-kilsvart/5 px-6 py-4 border-b border-kilred-100/30">
          <h3 className="font-anton text-anton-lg font-bold text-kilsvart-900 dark:text-white tracking-wide uppercase">
            {title}
          </h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-kilsvart-600 dark:text-kilsvart-400 font-roboto">
            Ingen lag tilgjengelig ennå
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-kilred-lg border border-kilred-100/50 overflow-hidden">
      {/* Header */}
      <div className="bg-kilsvart/5 px-6 py-4 border-b border-kilred-100/30">
        <h3 className="font-anton text-anton-lg font-bold text-kilsvart-900 dark:text-white tracking-wide uppercase">
          {title}
        </h3>
        <p className="text-sm text-kilsvart-600 dark:text-kilsvart-400 font-roboto mt-1">
          Klikk på et lag for kontaktinformasjon til trener
        </p>
      </div>

      {/* Teams list */}
      <div className="divide-y divide-gray-100 dark:divide-kilsvart-700/50">
  {teams.map((team, index) => (
    <motion.div
      key={team.$id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden"
    >
      {/* Hover background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-kilred/0 to-kilred/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:border-l-2 group-hover:border-kilred" />
      
      <button
        onClick={() => onTeamClick(team)}
        className="relative w-full flex items-center justify-between py-4 px-6 transition-all duration-200 group-hover:translate-x-1 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-kilred focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-kilsvart-900 rounded-lg"
      >
        {/* Left side - Team name */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="min-w-0">
            <h4 className="font-anton text-anton-base text-kilsvart-900 dark:text-white group-hover:text-kilred dark:group-hover:text-kilred-400 transition-colors duration-200 truncate tracking-wide">
              {team.team_name}
            </h4>
          </div>
        </div>

        {/* Middle - Coach name */}
        <div className="flex-1 text-left hidden sm:block px-4">
          <div className="font-roboto font-medium text-sm text-kilsvart-900 dark:text-white">
            {team.coach_name}
          </div>
        </div>

        {/* Right side - Contact icons and arrow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Contact icons */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-kilred dark:text-kilred-400" />
            <Phone className="h-4 w-4 text-kilred dark:text-kilred-400" />
          </div>

          {/* Arrow */}
          <ArrowRight className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-kilred dark:group-hover:text-kilred-400 transition-all duration-200 group-hover:translate-x-1 flex-shrink-0" />
        </div>
      </button>
    </motion.div>
  ))}
</div>

      {/* Footer */}
      <div className="bg-gray-50/50 dark:bg-kilsvart-800/30 px-6 py-4 border-t border-gray-100/50 dark:border-kilsvart-700/30">
        <p className="text-xs text-kilsvart-600 dark:text-kilsvart-400 font-roboto text-center">
          Kontakt treneren direkte for informasjon om treninger og påmelding til laget.
        </p>
      </div>
    </div>
  );
}

export default function Lag() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Handle modal open with team selection
  const handleOpenModal = useCallback((team: Team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback((open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedTeam(null);
    }
  }, []);

  // Fetch teams from Appwrite
  const fetchTeamsFromAppwrite = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await listDocuments(
        DATABASE_ID,
        COLLECTIONS.LAG,
        [
          Query.equal("is_active", true), // Vis kun aktive lag
          Query.orderDesc("age_group"), // Sorter etter alder, yngst først
          Query.limit(50),
        ],
      );

      const teamData = response.documents as unknown as Team[];
      setTeams(teamData);
    } catch (err) {
      console.error("Error fetching teams:", err);
      setError("Kunne ikke laste lag fra databasen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamsFromAppwrite();
  }, []);

  // Separate teams by gender
  const separateTeamsByGender = (teams: Team[]) => {
    const jentelag: Team[] = [];
    const guttelag: Team[] = [];

    teams.forEach(team => {
      const teamName = team.team_name.toLowerCase();
      if (teamName.includes('jente') || teamName.startsWith('j')) {
        jentelag.push(team);
      } else if (teamName.includes('gutt') || teamName.startsWith('g')) {
        guttelag.push(team);
      } else {
        // For team names that don't clearly indicate gender, add to both or handle separately
        // You can adjust this logic based on your naming convention
        guttelag.push(team);
      }
    });

    return { jentelag, guttelag };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-kilsvart-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kilred mx-auto mb-4"></div>
          <p className="text-kilsvart-600 dark:text-kilsvart-300 font-roboto">
            Laster lag...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-kilsvart-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-kilred-50 dark:bg-kilred-900/20 border border-kilred-200 dark:border-kilred-800 rounded-xl p-6">
            <h2 className="font-anton text-anton-lg text-kilred-800 dark:text-kilred-200 mb-2 tracking-wide">
              KUNNE IKKE LASTE LAG
            </h2>
            <p className="text-kilred-600 dark:text-kilred-300 font-roboto mb-4">
              {error}
            </p>
            <Button
              onClick={fetchTeamsFromAppwrite}
              className="font-roboto font-medium bg-kilred hover:bg-kilred-600 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-kilred-50 to-kilred-900 pt-24 pb-16 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-base font-medium text-kilblue-600 dark:text-kilblue-400 uppercase tracking-wider mb-3 font-roboto">
                Lag
              </h1>
              <h2 className="font-anton text-anton-3xl md:text-anton-4xl mb-6 text-kilsvart-900 dark:text-white tracking-wide">
                INGEN LAG TILGJENGELIG ENNÅ
              </h2>
              <p className="text-lg text-kilsvart-600 dark:text-kilsvart-300 font-roboto leading-relaxed mb-8">
                Vi jobber med å legge til våre lag og trenere. Kom tilbake snart!
              </p>
              <Button
                onClick={fetchTeamsFromAppwrite}
                className="font-roboto font-medium bg-kilred hover:bg-kilred-600 text-white"
                variant="outline"
              >
                Last på nytt
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  const { jentelag, guttelag } = separateTeamsByGender(teams);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden -mx-[calc((100vw-100%)/2)] text-white">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-anton text-anton-4xl md:text-anton-5xl mb-6 text-white tracking-wide uppercase">
              Våre Lag
            </h1>
            <p className="text-lg text-white font-roboto leading-relaxed">
              Møt våre dyktige trenere og finn ut hvilket lag som passer for deg
            </p>
          </motion.div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-16 dark:bg-kilsvart-800">
        <div className="container mx-auto px-2 md:px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Mobile Layout - Single Column */}
            <div className="lg:hidden">
              <div className="bg-white rounded-2xl shadow-kilred-lg border border-kilred-100/50 overflow-hidden">
                {/* Header */}
                <div className="bg-kilsvart/5 px-6 py-4 border-b border-kilred-100/30">
                  <h3 className="font-anton text-anton-lg font-bold text-kilsvart-900 dark:text-white tracking-wide uppercase">
                    Oversikt over trenere og lagledere
                  </h3>
                  <p className="text-sm text-kilsvart-600 dark:text-kilsvart-400 font-roboto mt-1">
                    Klikk på et lag for kontaktinformasjon til trener
                  </p>
                </div>

                {/* Teams list */}
                <div className="divide-y divide-gray-100 dark:divide-kilsvart-700/50">
  {teams.map((team, index) => (
    <motion.div
      key={team.$id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden"
    >
      {/* Hover background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-kilred/0 to-kilred/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:border-l-2 group-hover:border-kilred" />
      
      <button
        onClick={() => handleOpenModal(team)}
        className="relative w-full flex items-center justify-between py-4 px-6 transition-all duration-200 group-hover:translate-x-1 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-kilred focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-kilsvart-900 rounded-lg"
      >
        {/* Left side - Team name */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="min-w-0">
            <h4 className="font-anton text-anton-base text-kilsvart-900 dark:text-white group-hover:text-kilred dark:group-hover:text-kilred-400 transition-colors duration-200 truncate tracking-wide">
              {team.team_name}
            </h4>
          </div>
        </div>

        {/* Middle - Coach name */}
        <div className="flex-1 text-left hidden sm:block px-4">
          <div className="font-roboto font-medium text-sm text-kilsvart-900 dark:text-white">
            {team.coach_name}
          </div>
        </div>

        {/* Right side - Contact icons and arrow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Contact icons */}
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-kilred dark:text-kilred-400" />
            <Phone className="h-4 w-4 text-kilred dark:text-kilred-400" />
          </div>

          {/* Arrow */}
          <ArrowRight className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-kilred dark:group-hover:text-kilred-400 transition-all duration-200 group-hover:translate-x-1 flex-shrink-0" />
        </div>
      </button>
    </motion.div>
  ))}
</div>

                {/* Footer */}
                <div className="bg-gray-50/50 dark:bg-kilsvart-800/30 px-6 py-4 border-t border-gray-100/50 dark:border-kilsvart-700/30">
                  <p className="text-xs text-kilsvart-600 dark:text-kilsvart-400 font-roboto text-center">
                    Kontakt treneren direkte for informasjon om treninger og påmelding til laget.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Two Columns */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Jentelag Column */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <TeamList 
                    teams={jentelag} 
                    title="Jentelag" 
                    onTeamClick={handleOpenModal} 
                  />
                </motion.div>

                {/* Guttelag Column */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <TeamList 
                    teams={guttelag} 
                    title="Guttelag" 
                    onTeamClick={handleOpenModal} 
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <TeamModal 
        team={selectedTeam} 
        isOpen={isModalOpen} 
        onOpenChange={handleCloseModal} 
      />
    </div>
  );
}