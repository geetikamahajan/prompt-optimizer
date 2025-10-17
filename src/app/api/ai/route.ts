import {OpenAI} from 'openai';
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(request: Request) {
  const { prompt } = await request.json();
  
  const response = await client.chat.completions.create({
    model: 'gpt-5',
    messages: [
      { role: 'system', content: 'Shorten the given prompt without changing intent or quality. Return only JSON: optimizedPrompt, originalPromptTokens, optimizedPromptTokens.' },
      { role: 'user', content: "This is the prompt: \"" + prompt + "\"" },
    ],
  });
  console.log('func', response);
  const cleanedContent = response.choices[0].message?.content?.replaceAll("\n", "").trim() || "";
  const optimizedPrompt = cleanedContent ? JSON.parse(cleanedContent).optimizedPrompt : "Prompt optimization failed. Please try again.";
  return new Response(JSON.stringify({ optimizedPrompt: optimizedPrompt }), {
    headers: { 'Content-Type': 'application/json' },
  });
};