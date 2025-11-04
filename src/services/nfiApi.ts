// services/nifApi.ts
import { DateTime } from 'luxon';
import { TokenManager } from './tokenManager';
import type {
  NIFApiConfig,
  NIFMatch,
  NIFApiMatch,
  CacheEntry,
  MatchesResult,
} from '../types/match.types';

const OSLO_TZ = 'Europe/Oslo';

interface ParsedNifDateTime {
  iso: string;
  date: string;
  time?: string;
}

function parseNifDateTime(raw?: string | number | null): ParsedNifDateTime | null {
  if (raw == null) return null;
  if (typeof raw === 'number') return null; // for lite info til å lage dato

  const value = raw.trim();
  if (!value) return null;

  let dt = DateTime.fromISO(value, { zone: OSLO_TZ });

  if (!dt.isValid) {
    const formats = [
      'yyyy-LL-dd HH:mm:ss',
      'yyyy-LL-dd HH:mm',
      "yyyy-LL-dd'T'HH:mm:ss",
    ];
    for (const f of formats) {
      const c = DateTime.fromFormat(value, f, { zone: OSLO_TZ });
      if (c.isValid) {
        dt = c;
        break;
      }
    }
  }

  if (!dt.isValid) {
    const c = DateTime.fromFormat(value, 'dd.LL.yyyy HH:mm', { zone: OSLO_TZ });
    if (c.isValid) {
      dt = c;
    }
  }

  if (!dt.isValid) return null;

  const utc = dt.toUTC();
  return {
    iso: utc.toISO()!,
    date: utc.toFormat('yyyy-LL-dd'),
    time: dt.toFormat('HH:mm'),
  };
}

export class NIFApiService {
  private tokenManager: TokenManager;
  private config: NIFApiConfig;
  private cache = new Map<string, CacheEntry<NIFMatch[]>>();
  private readonly CACHE_TTL = 2 * 60 * 1000; // 2 minutter

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

    // 1) bruk fersk cache
    if (!forceRefresh && cached && this.isDataFresh(cached.timestamp)) {
      return {
        matches: cached.data,
        isStale: false,
        lastFresh: new Date(cached.timestamp),
      };
    }

    try {
      const isDev =
        typeof import.meta !== 'undefined' &&
        typeof import.meta.env !== 'undefined' &&
        Boolean(import.meta.env.DEV);

      // NB: dette er URLen som i dev gir 500 hos deg
      const url = isDev
        ? `${this.config.apiBaseUrl}/ta/ScheduledMatches/club/${clubId}`
        : `${this.config.apiBaseUrl}${clubId}`;

      const rawData = await this.makeAuthenticatedRequest<NIFApiMatch[]>(url);

      const mapped = rawData
        .map((m) => this.mapApiMatchToNIFMatch(m))
        .filter((m): m is NIFMatch => m !== null && typeof m.date === 'string');

      const now = Date.now();
      this.cache.set(cacheKey, {
        data: mapped,
        timestamp: now,
      });

      return {
        matches: mapped,
        isStale: false,
        lastFresh: new Date(now),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Failed to fetch matches:', error);

      // 👇 2) KJENT NIF-FEIL: ikke kast – returner det vi har
      if (message.includes('DateTime')) {
        if (cached) {
          return {
            matches: cached.data,
            isStale: true,
            lastFresh: new Date(cached.timestamp),
          };
        }
        return {
          matches: [],
          isStale: true,
        };
      }

      // 3) andre feil → prøv cache
      if (cached) {
        return {
          matches: cached.data,
          isStale: true,
          lastFresh: new Date(cached.timestamp),
        };
      }

      // 4) hvis vi virkelig ikke har noen ting, da kan vi kaste
      throw error;
    }
  }

  private mapApiMatchToNIFMatch(apiMatch: NIFApiMatch): NIFMatch | null {
    const rawDateTime: string | undefined =
      apiMatch.DateTime ??
      apiMatch.MatchDateTime ??
      apiMatch.StartDateTime ??
      apiMatch.matchDate ??
      (apiMatch.Date && apiMatch.Time
        ? `${apiMatch.Date} ${apiMatch.Time}`
        : undefined);

    const parsed = parseNifDateTime(rawDateTime);

    const formatTime = (time?: number): string | undefined => {
      if (typeof time !== 'number' || Number.isNaN(time)) return undefined;
      const str = time.toString().padStart(4, '0');
      return `${str.slice(0, 2)}:${str.slice(2)}`;
    };

    const startTimeFromNumber =
      formatTime(apiMatch.matchStartTime) ??
      formatTime(apiMatch.startTime);

    const startTime = startTimeFromNumber ?? parsed?.time;

    const mapStatus = (statusType?: string): NIFMatch['status'] => {
      const v = (statusType ?? '').toLowerCase();
      switch (v) {
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

    if (!parsed) {
      console.warn('Dropping match due to invalid DateTime from NIF', {
        id: apiMatch.MatchId ?? apiMatch.id ?? apiMatch.matchId,
        rawDateTime,
      });
      return null;
    }

    const idSource =
      apiMatch.MatchId ??
      apiMatch.matchId ??
      apiMatch.id ??
      apiMatch.Id ??
      apiMatch.matchNo;

    const id =
      typeof idSource === 'number'
        ? idSource.toString()
        : idSource ?? `nif-${Math.random().toString(36).slice(2, 9)}`;

    return {
      id,
      homeTeam:
        apiMatch.hometeam ??
        apiMatch.HomeTeamName ??
        apiMatch.HomeTeam ??
        '',
      awayTeam:
        apiMatch.awayteam ??
        apiMatch.AwayTeamName ??
        apiMatch.AwayTeam ??
        '',
      date: parsed.date,
      startTime,
      endTime: formatTime(apiMatch.matchEndTime),
      venue:
        apiMatch.activityAreaName ??
        apiMatch.VenueName ??
        apiMatch.Hall ??
        '',
      status: mapStatus(apiMatch.statusType ?? apiMatch.StatusType),
      tournament: apiMatch.tournamentName ?? apiMatch.SeriesName ?? '',
      round: apiMatch.roundName ?? apiMatch.Round ?? '',
      organizer: apiMatch.arrOrgName ?? apiMatch.Organizer ?? apiMatch.ClubName ?? '',
    };
  }

  private async makeAuthenticatedRequest<T>(url: string): Promise<T> {
    const token = await this.tokenManager.getValidToken();

    const doFetch = async (u: string, bearer: string) => {
      return fetch(u, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearer}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    };

    let response = await doFetch(url, token);

    if (response.status === 401) {
      this.tokenManager.clearToken();
      const newToken = await this.tokenManager.getValidToken();
      response = await doFetch(url, newToken);
    }

    if (!response.ok) {
      const bodyText = await response.text();

      const isDateTimeBug =
        bodyText?.includes('parsing column') &&
        bodyText?.includes('DateTime');

      if (isDateTimeBug) {
        // prøv snillere kall → dette er det du ser i dev nå
        const fallbackUrl = this.addOrUpdateQuery(url, 'nextDays', '30');
        const retry = await doFetch(fallbackUrl, token);
        if (retry.ok) {
          return retry.json();
        }
        // la getMatches ta over videre håndtering
        throw this.createStructuredError(
          retry.status,
          retry.statusText,
          await retry.text()
        );
      }

      throw this.createStructuredError(
        response.status,
        response.statusText,
        bodyText
      );
    }

    return response.json();
  }

  private addOrUpdateQuery(url: string, key: string, value: string): string {
    try {
      const base =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost';
      const u = new URL(url, base);
      u.searchParams.set(key, value);
      return u.toString();
    } catch {
      return url.includes('?')
        ? `${url}&${key}=${value}`
        : `${url}?${key}=${value}`;
    }
  }

  private createStructuredError(
    status: number,
    statusText: string,
    responseBody?: string
  ): Error {
    if (
      responseBody?.includes('parsing column') &&
      responseBody.includes('DateTime')
    ) {
      return new Error(
        'Error parsing column DateTime - NIF API har problemer med dato-håndtering'
      );
    }

    if (status === 500) {
      return new Error(
        `500 Internal Server Error - Serverfeil hos NIF API: ${statusText}`
      );
    }

    if (status === 401) {
      return new Error(`401 Unauthorized - Autorisasjonsfeil: ${statusText}`);
    }

    return new Error(`API request failed: ${status} ${statusText}`);
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
