// types/match.types.ts
export interface MatchesResult {
  matches: NIFMatch[];
  isStale: boolean;
  lastFresh?: Date;
}


export interface NIFMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  status: 'scheduled' | 'postponed' | 'cancelled' | 'completed';
  startTime?: string;
  endTime?: string;
  tournament?: string;
  round?: string;
  organizer?: string;
}

export interface NIFApiMatch {
  id: number;
  matchId: number;
  matchNo: string;
  activityAreaName: string;
  hometeam: string;
  awayteam: string;
  matchDate: string;
  matchStartTime: number;
  matchEndTime: number;
  tournamentName: string;
  roundName: string;
  statusType: string;
  statusTypeId: number;
  arrOrgName: string; 
}

export interface NIFApiConfig {
  clientId: string;
  clientSecret: string;
  idServer: string;
  apiBaseUrl: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
