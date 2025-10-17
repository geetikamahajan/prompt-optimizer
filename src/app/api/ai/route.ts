import {OpenAI} from 'openai';
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(request: Request) {
  const { prompt } = await request.json();
  
  const response = await client.chat.completions.create({
    model: 'gpt-5',
    messages: [
      { role: 'system', content: 'Shorten the given prompt without changing intent or quality. Return only JSON: prompt, originalPromptTokens, optimizedPromptTokens.' },
      { role: 'user', content: prompt },
    ],
  });
  console.log(response);
  
  return new Response(JSON.stringify({ result: response.choices[0].message.content }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export async function handleClick() {
  const response = await client.responses.create({
    model: 'gpt-4o',
    instructions: 'You are a coding assistant that talks like a pirate',
    input: 'Are semicolons optional in JavaScript?',
  });

  console.log(response.output_text);
};