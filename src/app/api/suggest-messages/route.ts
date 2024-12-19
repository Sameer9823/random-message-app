import { NextApiResponse } from 'next';
import type { NextApiRequest } from 'next';

export const runtime = 'edge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GOOGLE_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);
      return res.status(response.status).json({ error: `Gemini API Error: ${response.status} - ${errorText}` });
    }

    const data: { generations: { text: string }[] } = await response.json(); // Explicitly type the data

    const questions = data.generations.map((generation: { text: string }) => generation.text).join(' || '); // Type the generation parameter

    res.status(200).json({ questions });

  } catch (error) {
    console.error("Request processing error:", error);
    return res.status(500).json({ error: "Request processing error" });
  }
}