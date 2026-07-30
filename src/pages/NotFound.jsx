import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '80px' }}>
      <h1>404</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        style={{
          color: 'var(--accent)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
