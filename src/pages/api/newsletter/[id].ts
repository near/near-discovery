import mailchimp from '@mailchimp/mailchimp_marketing';
import type { NextApiRequest, NextApiResponse } from 'next';

import { mailchimpApiKey, mailchimpRegion } from '../../../config';

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpRegion,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Missing id parameter' });
    return;
  }

  try {
    const response = await mailchimp.campaigns.getContent(id.toString());
    if ('html' in response) {
      res.status(200).json(response.html);
    } else {
      res.status(500).json({ error: 'Invalid response from Mailchimp' });
    }
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
}
