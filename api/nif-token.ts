import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const tokenUrl = 'https://id.nif.no/connect/token';
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: 'data_org_read data_venuematch_read data_ta_scheduledmatches_read',
    client_id: process.env.NIF_CLIENT_ID!,
    client_secret: process.env.NIF_CLIENT_SECRET!,
  });

  try {
    const nifResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!nifResponse.ok) {
      throw new Error(`NIF API responded with ${nifResponse.status}`);
    }

    const data = await nifResponse.json();
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return response.status(200).json(data);
  } catch (error) {
    console.error('Token fetch error:', error);
    return response.status(500).json({ error: 'Token fetch failed' });
  }
}