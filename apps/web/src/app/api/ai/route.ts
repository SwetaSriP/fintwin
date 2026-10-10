import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!message) return NextResponse.json({ error: 'Ask a question first.' }, { status: 400 });
  if (!apiKey) return NextResponse.json({ configured: false });

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      temperature: 0.4,
      messages: [
        { role: 'system', content: 'You are FinTwin, a concise personal finance assistant. Give practical, cautious guidance. Do not claim to be a licensed financial adviser. Use INR when discussing amounts unless the user specifies another currency.' },
        { role: 'user', content: message },
      ],
    }),
  });

  if (!response.ok) {
    const upstream = await response.json().catch(() => null) as { error?: { message?: string } } | null;
    return NextResponse.json({ configured: true, error: upstream?.error?.message ?? 'The AI service is temporarily unavailable.' }, { status: 502 });
  }
  const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return NextResponse.json({ configured: true, reply: result.choices?.[0]?.message?.content ?? 'I could not generate a response just now.' });
}
