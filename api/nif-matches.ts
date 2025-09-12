import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { clubId } = request.query;
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!clubId || !token) {
    return response.status(400).json({ error: 'Missing clubId or authorization' });
  }

  try {
    const url = `https://data.nif.no/api/v1/ta/ScheduledMatches/club/${clubId}`;
    const nifResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!nifResponse.ok) {
      throw new Error(`NIF API responded with ${nifResponse.status}`);
    }

    const data = await nifResponse.json();
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response.status(200).json(data);
  } catch (error) {
    console.error('Matches fetch error:', error);
    return response.status(500).json({ error: 'Matches fetch failed' });
  }
}