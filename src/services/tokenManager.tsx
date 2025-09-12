// services/tokenManager.ts
import type { NIFApiConfig, TokenResponse } from '../types/match.types';

export class TokenManager {
  private token: string | null = null;
  private tokenExpiry: number = 0;
  private config: NIFApiConfig;

  constructor(config: NIFApiConfig) {
    this.config = config;
  }

  private async fetchNewToken(): Promise<string> {
    const isDev = import.meta.env.DEV;
    
    try {
      let response: Response;
      
      if (isDev) {
        // Development: Bruk direkte kall med proxy
        const tokenUrl = this.config.idServer;
        const params = new URLSearchParams({
          grant_type: 'client_credentials',
          scope: 'data_org_read data_venuematch_read data_ta_scheduledmatches_read',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        });

        response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params,
        });
      } else {
        // Production: Bruk serverless function
        response = await fetch('/api/nif-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const data: TokenResponse = await response.json();
      
      // Sett token og utløpstid (minus 5 min buffer)
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
      
      return this.token;
    } catch (error) {
      console.error('Failed to fetch access token:', error);
      throw new Error('Unable to authenticate with NIF API');
    }
  }

  async getValidToken(): Promise<string> {
    // Hvis token mangler eller er utløpt, hent ny
    if (!this.token || Date.now() >= this.tokenExpiry) {
      await this.fetchNewToken();
    }
    return this.token!;
  }

  clearToken(): void {
    this.token = null;
    this.tokenExpiry = 0;
  }
}