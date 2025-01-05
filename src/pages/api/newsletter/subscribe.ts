import mailchimp from '@mailchimp/mailchimp_marketing';
import type { NextApiRequest, NextApiResponse } from 'next';

import { mailchimpApiKey, mailchimpAudienceId, mailchimpRegion } from '../../../config';

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpRegion,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const response = await mailchimp.lists.addListMember(mailchimpAudienceId, {
        email_address: email,
        status: 'pending',
      });

      console.log(`response: ${response}`);

      // Respond to the client
      res.status(200).json({
        success: true,
        message: 'Form submitted successfully! Please confirm your email',
      });
    } catch (error) {
      console.error('Error adding to list:', error);

      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request.',
      });
    }
  }
}
