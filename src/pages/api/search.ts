import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!process.env.ALGOLIA_ENDPOINT || !process.env.ALGOLIA_API_KEY || !process.env.ALGOLIA_APP_ID) {
      throw new Error('Invalid algolia search environment variables');
    }

    const request = await fetch(process.env.ALGOLIA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Algolia-Api-Key': process.env.ALGOLIA_API_KEY,
        'X-Algolia-Application-Id': process.env.ALGOLIA_APP_ID,
      },
      body: JSON.stringify(req.body),
    });
    const data = await request.json();
    res.status(request.status).json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || 'Unknown error',
    });
  }
};

export default handler;
