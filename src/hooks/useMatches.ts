// hooks/useMatches.ts - Oppdatert versjon
import { useState, useEffect, useCallback } from 'react';
import { nifApi } from '../services/nifApiInstance';
import type { NIFMatch, MatchesResult } from '../types/match.types';

interface UseMatchesOptions {
  clubId: string;
  refreshInterval?: number; // minutter
  autoRefresh?: boolean;
}

interface UseMatchesReturn {
  matches: NIFMatch[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshMatches: () => Promise<void>;
  clearError: () => void;
  isStale: boolean; // NYTT: viser om data er utdatert
}

export const useMatches = ({
  clubId,
  refreshInterval = 15, // Default 15 min
  autoRefresh = true,
}: UseMatchesOptions): UseMatchesReturn => {
  const [matches, setMatches] = useState<NIFMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isStale, setIsStale] = useState(false); // NYTT

  const fetchMatches = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Kall oppdatert API som returnerer MatchesResult
      const result: MatchesResult = await nifApi.getMatches(clubId, forceRefresh);
      
      setMatches(result.matches);
      setIsStale(result.isStale);
      setLastUpdated(result.lastFresh || new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'En feil oppstod');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  }, [clubId]);

  const refreshMatches = useCallback(() => {
    return fetchMatches(true);
  }, [fetchMatches]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  // Auto refresh interval
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      fetchMatches(false); // Bruk cache hvis tilgjengelig
    }, refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchMatches, refreshInterval, autoRefresh]);

  // NYTT: Page visibility detection - auto-refresh når bruker kommer tilbake
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastUpdated) {
        const timeSinceUpdate = Date.now() - lastUpdated.getTime();
        // Auto-refresh hvis mer enn 5 minutter siden siste oppdatering
        if (timeSinceUpdate > 5 * 60 * 1000) { 
          refreshMatches();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [lastUpdated, refreshMatches]);

  return {
    matches,
    loading,
    error,
    lastUpdated,
    refreshMatches,
    clearError,
    isStale, // NYTT: returnerer om data er stale
  };
};