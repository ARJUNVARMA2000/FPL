import './Toggle.css';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      className={`toggle ${checked ? 'toggle--on' : 'toggle--off'} ${disabled ? 'toggle--disabled' : ''}`}
      onClick={() => !disabled && onChange(!checked)}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
    >
      <span className="toggle__thumb" />
    </button>
  );
}
