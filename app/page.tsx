export default function Page() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🪄 Welcome to Blockchain Hogwarts</h1>
      <p>Discover your crypto destiny by answering a few questions.</p>
      <a
        href="/api/frame"
        style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          padding: '1rem 2rem',
          fontSize: '1.25rem',
          backgroundColor: '#4B0082',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
        }}
      >
        Start Sorting 🧙‍♂️
      </a>
    </div>
  );
}
