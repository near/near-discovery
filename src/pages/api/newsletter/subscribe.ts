import mailchimp from '@mailchimp/mailchimp_marketing';
import type { NextApiRequest, NextApiResponse } from 'next';

import { mailchimpApiKey, mailchimpRegion, newsletterAudienceId } from '../../../config';

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpRegion,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const response = await mailchimp.lists.addListMember(newsletterAudienceId, {
        email_address: email,
        status: 'pending',
      });

      console.log(`response: ${response}`);

      // Respond to the client
      res.status(200).json({
        success: true,
        message: 'Form submitted successfully! Please confirm your email',
      });
    } catch (error: any) {
      console.error('Error adding to list:', error);

      if (error.status === 400 && error.response.body.title === 'Member Exists') {
        res.status(500).json({
          success: false,
          message: 'Email already subscribed.',
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request.',
        });
      }
    }
  }
}
