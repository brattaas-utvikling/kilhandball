// services/nifApiInstance.ts
import type { NIFApiConfig } from '../types/match.types';
import { NIFApiService } from './nfiApi';

const nifConfig: NIFApiConfig = {
  clientId: import.meta.env.VITE_NIF_CLIENT_ID || 'xxx',
  clientSecret: import.meta.env.VITE_NIF_CLIENT_SECRET || 'xxx',
  idServer: '/api/nif/connect/token',    // ← Proxy path
  apiBaseUrl: '/api/data/api/v1',        // ← Proxy path
};

export const nifApi = new NIFApiService(nifConfig);