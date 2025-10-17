"use client"
import { useState } from "react";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';

export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [hasResponse, setHasResponse] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleChangeInPromptInput = (event: any) => {
    setPrompt(event.target.value);
  };

  const optimizePrompt = async (prompt: string) => {
    setHasResponse(false);
    setWaiting(true);
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log(data);
    setWaiting(false);
    setHasResponse(true);
    setOptimizedPrompt(data.result.prompt);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
       <div className="text-4xl font-bold text-blue-600">
          <TypeAnimation
            sequence={["Welcome to prompt optimizer", 1000]}
            wrapper="span"
            repeat={0}
            cursor={false}
          /> <br></br>
          <TypeAnimation
            sequence={["", 2000, "Get started by adding a prompt you'd like to optimize", 1000]}
            wrapper="span"
            repeat={0}
            cursor={false}
          />
          
        </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <ol className="font-mono text-sm/6 text-center sm:text-left">
            Save money on token usage by optimizing your prompts with AI. 
        </ol>

        <textarea
          onChange={handleChangeInPromptInput}
          className="field-sizing-content shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter prompt here"
        />
        <button onClick={() => optimizePrompt(prompt)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Optimize
        </button>
        {waiting && <TypeAnimation
            sequence={['optimizing..........................................................................................................................................................', 0]}
            wrapper="span"
            repeat={0}
            cursor={true}
        />}
        {hasResponse && <div>
            Optimized prompt: {" "}
            <TypeAnimation
              sequence={[prompt, 0]}
              wrapper="span"
              repeat={0}
              cursor={true}
            />
          </div>}

      
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/tikamahajan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin-svgrepo-com.svg"
            alt="LinkedIn logo"
            width={16}
            height={16}
          />
          Find me on LinkedIn →
        </a>
         <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/geetikamahajan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github-mark.png"
            alt="Github logo"
            width={16}
            height={16}
          />
          See my other projects →
        </a>
      </footer>
    </div>
  );
}
