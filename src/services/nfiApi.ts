// services/nifApi.ts
import { TokenManager } from './tokenManager';
import type { NIFApiConfig, NIFMatch, NIFApiMatch, CacheEntry, MatchesResult } from '../types/match.types';

export class NIFApiService {
  private tokenManager: TokenManager;
  private config: NIFApiConfig;
  private cache = new Map<string, CacheEntry<NIFMatch[]>>();
  private readonly CACHE_TTL = 2 * 60 * 1000; // 2 minutter cache

  constructor(config: NIFApiConfig) {
    this.config = config;
    this.tokenManager = new TokenManager(config);
  }

  private getCacheKey(clubId: string): string {
    return `matches_${clubId}`;
  }

  private isDataFresh(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }

  async getMatches(clubId: string, forceRefresh = false): Promise<MatchesResult> {
    const cacheKey = this.getCacheKey(clubId);
    const cached = this.cache.get(cacheKey);
  
    // Return cached data hvis den er fresh
    if (!forceRefresh && cached) {
      const isFresh = this.isDataFresh(cached.timestamp);
      
      if (isFresh) {
        return {
          matches: cached.data,
          isStale: false,
          lastFresh: new Date(cached.timestamp)
        };
      }
      // Hvis data er stale, la den falle gjennom til API-kall
    }
  
    try {
      const url = `${this.config.apiBaseUrl}/ta/ScheduledMatches/club/${clubId}`;
      const rawData = await this.makeAuthenticatedRequest<NIFApiMatch[]>(url);
      
      // Map API data til vår interface
      const data = rawData.map(match => this.mapApiMatchToNIFMatch(match));
      
      // Cache resultatet
      const now = Date.now();
      this.cache.set(cacheKey, {
        data,
        timestamp: now,
      });
  
      return {
        matches: data,
        isStale: false,
        lastFresh: new Date(now)
      };
    } catch (error) {
      console.error('Failed to fetch matches:', error);
      
      // Fallback til cached data hvis API feiler - men merk som stale
      if (cached) {
        return {
          matches: cached.data,
          isStale: true,
          lastFresh: new Date(cached.timestamp)
        };
      }
      
      throw error;
    }
  }


  private mapApiMatchToNIFMatch(apiMatch: NIFApiMatch): NIFMatch {
    // Konverter tid fra HHMM format til HH:MM string
    const formatTime = (time: number): string => {
      const timeStr = time.toString().padStart(4, '0');
      return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
    };

    // Map status
    const mapStatus = (statusType: string): NIFMatch['status'] => {
      switch (statusType.toLowerCase()) {
        case 'opprettet':
        case 'godkjent':
          return 'scheduled';
        case 'utsatt':
          return 'postponed';
        case 'avlyst':
          return 'cancelled';
        case 'ferdig':
          return 'completed';
        default:
          return 'scheduled';
      }
    };

    return {
      id: apiMatch.id.toString(),
      homeTeam: apiMatch.hometeam,
      awayTeam: apiMatch.awayteam,
      date: apiMatch.matchDate,
      venue: apiMatch.activityAreaName,
      status: mapStatus(apiMatch.statusType),
      startTime: formatTime(apiMatch.matchStartTime),
      endTime: formatTime(apiMatch.matchEndTime),
      tournament: apiMatch.tournamentName,
      round: apiMatch.roundName,
      organizer: apiMatch.arrOrgName,
    };
  }

  private async makeAuthenticatedRequest<T>(url: string): Promise<T> {
    const token = await this.tokenManager.getValidToken();
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Token kan være utløpt, prøv å fornye
      this.tokenManager.clearToken();
      const newToken = await this.tokenManager.getValidToken();
      
      // Prøv på nytt med nytt token
      const retryResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${newToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!retryResponse.ok) {
        throw new Error(`API request failed: ${retryResponse.status} ${retryResponse.statusText}`);
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }



  clearCache(clubId?: string): void {
    if (clubId) {
      const cacheKey = this.getCacheKey(clubId);
      this.cache.delete(cacheKey);
    } else {
      this.cache.clear();
    }
  }
}