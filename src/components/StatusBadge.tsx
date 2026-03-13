import './StatusBadge.css';

interface StatusBadgeProps {
  status: 'connected' | 'disconnected' | 'warning' | 'pending';
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" />
      {label}
    </span>
  );
}
