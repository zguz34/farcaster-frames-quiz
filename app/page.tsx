// app/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

const questions = [
  {
    text: 'What matters most to you?',
    options: ['Speed', 'Security', 'Decentralization'],
    mapping: ['solana', 'ethereum', 'bitcoin'],
    image: 'https://i.imgur.com/TPx5JQH.png'
  },
  {
    text: 'How should we handle crypto regulation?',
    options: ['Regulate', 'Build', 'Ignore'],
    mapping: ['bitcoin', 'solana', 'avalanche'],
    image: 'https://i.imgur.com/VieOz1U.png'
  },
  {
    text: 'What’s your vibe?',
    options: ['Brag on CT', 'Code quietly', 'Shill memes'],
    mapping: ['solana', 'avalanche', 'ethereum'],
    image: 'https://i.imgur.com/GRza507.png'
  },
  {
    text: 'What’s your favorite crypto pastime?',
    options: ['Flip JPEGs', 'Ship DeFi', 'Hold BTC'],
    mapping: ['ethereum', 'bitcoin', 'solana'],
    image: 'https://i.imgur.com/VP8KZnj.png'
  },
  {
    text: 'Should you be allowed to use unforgivable spells on your enemies?',
    options: ['Only if they dump the token.', 'No. Code is law.', "I am Michael Saylor, I'm above the law."],
    mapping: ['solana', 'ethereum', 'bitcoin'],
    image: 'https://i.imgur.com/4IUt3U8.png'
  },
];

const results = {
  bitcoin: 'https://i.imgur.com/zQCfXiS.png',
  ethereum: 'https://i.imgur.com/jsHhCJU.png',
  solana: 'https://i.imgur.com/A135ToH.png',
  avalanche: 'https://i.imgur.com/XGKf6Iz.png'
};

export default function Page() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState({
    solana: 0,
    ethereum: 0,
    bitcoin: 0,
    avalanche: 0,
  });

  const handleAnswer = (index: number) => {
    const house = questions[step].mapping[index];
    setScore((prev) => ({ ...prev, [house]: prev[house as keyof typeof prev] + 1 }));
    setStep((prev) => prev + 1);
  };

  const getWinner = () => {
    const max = Math.max(...Object.values(score));
    const [winner] = Object.entries(score).find(([_, val]) => val === max) || [];
    return winner;
  };

  if (step >= questions.length) {
    const winner = getWinner();
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">You’ve been sorted into {winner}!</h1>
        <img src={results[winner as keyof typeof results] || ''} alt={winner || ''} className="rounded-xl w-full max-w-xl shadow-md" />
        <button
          className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => {
            setStep(0);
            setScore({ solana: 0, ethereum: 0, bitcoin: 0, avalanche: 0 });
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-semibold mb-2">Question {step + 1}</h1>
      <p className="text-lg mb-4">{q.text}</p>
      <img src={q.image} alt="Question image" className="rounded-xl w-full max-w-xl mb-6 shadow-md" />
      <div className="flex flex-col gap-2 w-full max-w-md">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
