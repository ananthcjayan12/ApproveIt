import type { AuditEvent } from '../api/client';

interface AuditTrailProps {
  events: AuditEvent[];
  isLoading: boolean;
  error: string | null;
}

export function AuditTrail({ events, isLoading, error }: AuditTrailProps) {
  if (isLoading) {
    return <p>Loading audit trail…</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (events.length === 0) {
    return <p>No audit events yet.</p>;
  }

  return (
    <section>
      <h2>Audit Trail</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.action} · {event.actorName} · {new Date(event.timestamp).toLocaleString()} · {event.note ?? '—'}
          </li>
        ))}
      </ul>
    </section>
  );
}
