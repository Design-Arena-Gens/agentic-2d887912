import type { NextApiRequest, NextApiResponse } from 'next';
import { processMessage } from '../../lib/chatbot';
import twilio from 'twilio';

const MessagingResponse = twilio.twiml.MessagingResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Health check
    return res.status(200).json({ status: 'ok', message: 'WhatsApp Bot API is running' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { Body, From } = req.body;

    if (!Body) {
      const twiml = new MessagingResponse();
      twiml.message('No message received.');
      res.setHeader('Content-Type', 'text/xml');
      return res.status(200).send(twiml.toString());
    }

    console.log(`Received message from ${From}: ${Body}`);

    // Process the message
    const response = await processMessage(Body);

    // Create Twilio response
    const twiml = new MessagingResponse();
    twiml.message(response.message);

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml.toString());
  } catch (error) {
    console.error('Error processing webhook:', error);

    const twiml = new MessagingResponse();
    twiml.message('⚠️ Sorry, an error occurred. Please try again later.');

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml.toString());
  }
}
