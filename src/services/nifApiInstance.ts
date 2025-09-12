// services/nifApiInstance.ts
import type { NIFApiConfig } from '../types/match.types';
import { NIFApiService } from './nfiApi';

const isDev = import.meta.env.DEV;

const nifConfig: NIFApiConfig = {
  clientId: import.meta.env.VITE_NIF_CLIENT_ID || 'fallback',
  clientSecret: import.meta.env.VITE_NIF_CLIENT_SECRET || 'fallback',
  idServer: isDev ? '/api/nif/connect/token' : '/api/nif-token',
  apiBaseUrl: isDev ? '/api/data/api/v1' : '/api/nif-matches?clubId=', // Note the query param
};

console.log('Config URLs:', {
  idServer: nifConfig.idServer,
  apiBaseUrl: nifConfig.apiBaseUrl
});

export const nifApi = new NIFApiService(nifConfig);
