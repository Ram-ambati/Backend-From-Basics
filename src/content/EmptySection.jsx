import SectionPage from '../components/content/SectionPage';

/**
 * Placeholder section page — shown for sections that don't have content yet.
 */
export default function EmptySection() {
  return (
    <SectionPage>
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-10) 0',
        color: 'var(--text-muted)',
      }}>
        <p style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-4)' }}>
          📝
        </p>
        <p style={{ fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-2)' }}>
          Content coming soon
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)' }}>
          This section is being written. Check back later!
        </p>
      </div>
    </SectionPage>
  );
}
