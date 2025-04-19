export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Blockchain Hogwarts 🧙‍♂️</h1>
      <p>This is the onchain Sorting Quiz built for Farcaster Frames</p>
      <a href="/api/frame?id=1">
        <button style={{ padding: '12px 24px', fontSize: '16px', marginTop: '20px' }}>
          Start Sorting
        </button>
      </a>
    </div>
  );
}
