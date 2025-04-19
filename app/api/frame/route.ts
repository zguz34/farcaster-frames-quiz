// route.ts
import { NextRequest, NextResponse } from 'next/server';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, '');

function getHouseResult(score: Record<string, number>) {
  const max = Math.max(...Object.values(score));
  const winners = Object.keys(score).filter((house) => score[house] === max);
  return winners[0]; // simple tiebreaker
}

function parseScoreParams(searchParams: URLSearchParams) {
  return {
    solana: parseInt(searchParams.get('solana') || '0'),
    ethereum: parseInt(searchParams.get('ethereum') || '0'),
    bitcoin: parseInt(searchParams.get('bitcoin') || '0'),
    avalanche: parseInt(searchParams.get('avalanche') || '0'),
  };
}

const answerMappings = [
  ['solana', 'ethereum', 'bitcoin'],     // Q1
  ['bitcoin', 'solana', 'avalanche'],    // Q2
  ['solana', 'avalanche', 'ethereum'],   // Q3
  ['ethereum', 'bitcoin', 'solana'],     // Q4
  ['solana', 'ethereum', 'bitcoin'],     // Q5
];

const answerOptions = [
  ['Speed', 'Security', 'Decentralization'],
  ['Regulate', 'Build', 'Ignore'],
  ['Brag on CT', 'Code quietly', 'Shill memes'],
  ['Flip JPEGs', 'Ship DeFi', 'Hold BTC'],
  ['Only if they dump the token.', 'No. Code is law.', "I am Michael Saylor, I'm above the law."],
];

const questionImages = [
  'https://i.imgur.com/TPx5JQH.png', // Q1: Climbing mountain
  'https://i.imgur.com/VieOz1U.png', // Q2: Potions professor
  'https://i.imgur.com/GRza507.png', // Q3: Broomstick flying
  'https://i.imgur.com/VP8KZnj.png', // Q4: Three-headed dog
  'https://i.imgur.com/4IUt3U8.png', // Q5: Wand duel
];

const resultImages: Record<string, string> = {
  bitcoin: 'https://i.imgur.com/zQCfXiS.png',
  ethereum: 'https://i.imgur.com/jsHhCJU.png',
  solana: 'https://i.imgur.com/A135ToH.png',
  avalanche: 'https://i.imgur.com/XGKf6Iz.png',
};

export async function POST(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams;
  const id = parseInt(searchParams.get('id') || '1');
  const nextId = id + 1;
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex - 1;

  const currentScores = parseScoreParams(searchParams);
  const updatedHouse = answerMappings[id - 1][buttonId];
  currentScores[updatedHouse as keyof typeof currentScores] += 1;

  if (id >= answerOptions.length) {
    const house = getHouseResult(currentScores);
    const imageUrl = resultImages[house];

    return new NextResponse(`<!DOCTYPE html><html><head>
      <title>Your Chain House</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${imageUrl}" />
      <meta property="fc:frame:button:1" content="Play Again" />
      <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />

    </head></html>`);
  }

  const queryParams = `id=${nextId}&solana=${currentScores.solana}&ethereum=${currentScores.ethereum}&bitcoin=${currentScores.bitcoin}&avalanche=${currentScores.avalanche}`;
  const imageUrl = questionImages[id - 1];

  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Question ${id}</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="${answerOptions[id - 1][0]}" />
    <meta property="fc:frame:button:2" content="${answerOptions[id - 1][1]}" />
    <meta property="fc:frame:button:3" content="${answerOptions[id - 1][2]}" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?${queryParams}" />
  </head></html>`);
}

export async function GET(req: NextRequest): Promise<Response> {
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://i.imgur.com/bf63Ujd.png" />
    <meta property="fc:frame:button:1" content="Start Sorting" />
<meta property="fc:frame:post_url" content="${baseUrl}/api/frame?id=1&solana=0&ethereum=0&bitcoin=0&avalanche=0" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  </head><body></body></html>`);
}
