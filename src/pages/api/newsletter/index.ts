import mailchimp from '@mailchimp/mailchimp_marketing';
import type { NextApiRequest, NextApiResponse } from 'next';

import { mailchimpApiKey, mailchimpRegion } from '../../../config';

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpRegion,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await mailchimp.campaigns.list({
      fields: ['campaigns.settings.subject_line', 'campaigns.send_time', 'campaigns.id'],
      count: 5,
      status: 'sent',
      sortField: 'send_time',
      sortDir: 'DESC',
    });

    if ('campaigns' in response) {
      res.status(200).json(response.campaigns);
    } else {
      res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
}
