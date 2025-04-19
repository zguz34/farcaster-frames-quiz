// route.ts
import { NextRequest, NextResponse } from 'next/server';

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
  // Each question maps 3 buttons to a chain house
  ['solana', 'ethereum', 'bitcoin'], // Q1
  ['bitcoin', 'solana', 'avalanche'], // Q2
  ['solana', 'avalanche', 'ethereum'], // Q3
  ['ethereum', 'bitcoin', 'solana'], // Q4
];

const answerOptions = [
  ['Speed', 'Security', 'Decentralization'],
  ['Regulate', 'Build', 'Ignore'],
  ['Brag on CT', 'Code quietly', 'Shill memes'],
  ['Flip JPEGs', 'Ship DeFi', 'Hold BTC'],
];

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
    const imageUrl = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${house}.png`;

    return new NextResponse(`<!DOCTYPE html><html><head>
      <title>Your Chain House</title>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${imageUrl}" />
      <meta property="fc:frame:button:1" content="Play Again" />
      <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1" />
    </head></html>`);
  }

  const queryParams = `id=${nextId}&solana=${currentScores.solana}&ethereum=${currentScores.ethereum}&bitcoin=${currentScores.bitcoin}&avalanche=${currentScores.avalanche}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/q${id}.png`;

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

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest): Promise<Response> {
  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Welcome to Blockchain Hogwarts</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://placekitten.com/1200/630" />
    <meta property="fc:frame:button:1" content="Start Sorting" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  </head></html>`);
}

