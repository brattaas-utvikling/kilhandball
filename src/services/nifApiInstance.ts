// services/nifApiInstance.ts
import type { NIFApiConfig } from '../types/match.types';
import { NIFApiService } from './nfiApi';

const isDev = import.meta.env.DEV;
console.log('Environment check:', {
  isDev: import.meta.env.DEV,
  clientId: import.meta.env.VITE_NIF_CLIENT_ID,
  hasSecret: !!import.meta.env.VITE_NIF_CLIENT_SECRET, // Ikke log secret
});

const nifConfig: NIFApiConfig = {
  clientId: import.meta.env.VITE_NIF_CLIENT_ID || 'client_id',
  clientSecret: import.meta.env.VITE_NIF_CLIENT_SECRET || 'client_secret',
  idServer: isDev ? '/api/nif/connect/token' : 'https://id.nif.no/connect/token',
  apiBaseUrl: isDev ? '/api/data/api/v1' : 'https://data.nif.no/api/v1',
};

console.log('Config URLs:', {
  idServer: nifConfig.idServer,
  apiBaseUrl: nifConfig.apiBaseUrl
});

export const nifApi = new NIFApiService(nifConfig);
