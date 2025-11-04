// types/match.types.ts

// --------------
// Domene-typer
// --------------
export type NIFMatchStatus =
  | 'scheduled'
  | 'postponed'
  | 'cancelled'
  | 'completed';

export interface NIFMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  /**
   * Alltid normalisert til "yyyy-MM-dd" (UTC-basert) i nifApi.ts
   */
  date: string;
  venue: string;
  status: NIFMatchStatus;
  /**
   * "HH:mm" i lokal tid (Europe/Oslo) – kan mangle hvis NIF ikke har sendt
   */
  startTime?: string;
  endTime?: string;
  tournament?: string;
  round?: string;
  organizer?: string;
}

export interface MatchesResult {
  matches: NIFMatch[];
  /**
   * True hvis vi måtte falle tilbake på cache pga. NIF-feil
   */
  isStale: boolean;
  /**
   * Når vi sist hadde ferske data
   */
  lastFresh?: Date;
}

// --------------
// NIF-rådata
// --------------
// NIF er ikke helt konsekvent på feltnavn, så vi gjør alt optional her.
// Servicen vår plukker “beste” feltnavn og normaliserer dem.
export interface NIFApiMatch {
  // id-varianter
  id?: number | string;
  Id?: number | string;
  MatchId?: number | string;
  matchId?: number | string;
  matchNo?: string;

  // lag
  hometeam?: string;
  awayteam?: string;
  HomeTeamName?: string;
  AwayTeamName?: string;
  HomeTeam?: string;
  AwayTeam?: string;

  // sted/hall
  activityAreaName?: string;
  VenueName?: string;
  Hall?: string;

  // dato/tid – NIF er ustabil her, derfor mange muligheter
  matchDate?: string;
  DateTime?: string;
  MatchDateTime?: string;
  StartDateTime?: string;
  Date?: string;
  Time?: string;

  // tid som HHMM
  matchStartTime?: number;
  matchEndTime?: number;
  startTime?: number;

  // turnering
  tournamentName?: string;
  SeriesName?: string;

  // runde
  roundName?: string;
  Round?: string;

  // organisasjon
  arrOrgName?: string;
  Organizer?: string;
  ClubName?: string;

  // status
  statusType?: string;
  StatusType?: string;
  statusTypeId?: number;
}

// --------------
// Konfig / auth
// --------------
export interface NIFApiConfig {
  clientId: string;
  clientSecret: string;
  idServer: string;
  apiBaseUrl: string;
  // hvis du senere vil legge på Ocp-Apim-Subscription-Key:
  // subscriptionKey?: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// --------------
// Cache
// --------------
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
