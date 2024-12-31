import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama3-groq-70b-8192-tool-use-preview",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 0.65,
      stream: false,
      stop: null
    });

    return res.status(200).json(chatCompletion.choices[0]?.message);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 