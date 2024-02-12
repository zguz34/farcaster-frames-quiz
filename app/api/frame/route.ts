import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams
  const idString:any = searchParams.get("id")
  const id = parseInt(idString)
  const nextId = id + 1
  const data = await req.json();
  const buttonId = data.untrustedData.buttonIndex;

  const answerOptions = [
    ["Moscow", "Paris", "Amsterdam"],
    ["London", "Berlin", "Copenhagen"],
    ["Madrid", "Tokyo", "Lisbon"],
  ]

  const correctAnswers = [1, 0, 2];

  if (id > 1 && buttonId-1 !== correctAnswers[id - 2]) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <title>Wrong! Try again.</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/QmYZgqhhhJJJh897Q7X65dg2YAgsbfUxm74aqNnc6SdXe7/wrong.png" />
    <meta property="fc:frame:button:1" content="Play again"} />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/end" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  </head></html>`);
  }

  if(id === 4){
      return new NextResponse(`<!DOCTYPE html><html><head>
    <title>You won</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/QmYZgqhhhJJJh897Q7X65dg2YAgsbfUxm74aqNnc6SdXe7/win.png" />
    <meta property="fc:frame:button:1" content="Play again"} />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/end" />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
  </head></html>`);
  } else {
  return new NextResponse(`<!DOCTYPE html><html><head>
    <title>This is frame ${id}</title>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/QmYZgqhhhJJJh897Q7X65dg2YAgsbfUxm74aqNnc6SdXe7/${id}.png" />
    <meta property="fc:frame:button:1" content=${answerOptions[id-1][0]} />
    <meta property="fc:frame:button:2" content=${answerOptions[id-1][1]} />
    <meta property="fc:frame:button:3" content=${answerOptions[id-1][2]} />
    <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
    <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=${nextId}" />
  </head></html>`);
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';