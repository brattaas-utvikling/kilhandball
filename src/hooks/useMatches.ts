// hooks/useMatches.ts - Oppdatert versjon med forbedret error handling
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
      // Forbedret error handling - behold original error for ErrorDisplay
      const errorMessage = err instanceof Error ? err.message : 'En ukjent feil oppstod ved henting av kamper';
      setError(errorMessage);
      
      // Forbedret logging med mer context
      console.error('Error fetching matches:', {
        error: err,
        clubId,
        forceRefresh,
        timestamp: new Date().toISOString()
      });

      // Hvis vi har eksisterende data, behold dem men marker som stale
      if (matches.length > 0) {
        setIsStale(true);
        console.log('API failed, keeping existing data but marking as stale');
      }
    } finally {
      setLoading(false);
    }
  }, [clubId, matches.length]);

  const refreshMatches = useCallback(() => {
    return fetchMatches(true);
  }, [fetchMatches]);

  const clearError = useCallback(() => {
    setError(null);
    // Når error cleares, sjekk om data er stale
    if (matches.length > 0 && isStale) {
      setIsStale(false); // Reset stale status når error cleares
    }
  }, [matches.length, isStale]);

  // Initial fetch
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  // Auto refresh interval med adaptive logikk
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      // Ikke auto-refresh hvis vi har en aktiv error - la brukeren håndtere det manuelt
      if (!error) {
        fetchMatches(false); // Bruk cache hvis tilgjengelig
      }
    }, refreshInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchMatches, refreshInterval, autoRefresh, error]);

  // NYTT: Page visibility detection - auto-refresh når bruker kommer tilbake
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastUpdated && !error) {
        const timeSinceUpdate = Date.now() - lastUpdated.getTime();
        // Auto-refresh hvis mer enn 5 minutter siden siste oppdatering
        if (timeSinceUpdate > 5 * 60 * 1000) {
          console.log('Page became visible, auto-refreshing stale data');
          refreshMatches();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [lastUpdated, refreshMatches, error]);

  // NYTT: Cleanup og error recovery logic
  useEffect(() => {
    // Hvis vi har vært uten data i lang tid og har en error, prøv å hente data igjen
    if (error && matches.length === 0) {
      const retryTimeout = setTimeout(() => {
        console.log('Attempting automatic retry after sustained error');
        fetchMatches(false);
      }, 30000); // Prøv igjen etter 30 sekunder

      return () => clearTimeout(retryTimeout);
    }
  }, [error, matches.length, fetchMatches]);

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