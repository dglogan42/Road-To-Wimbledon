import { getInjuryColor, getInjuryLabel } from '../data/drama';

interface InjuryMeterProps {
  level: number;
  note?: string;
  compact?: boolean;
  playerName?: string;
}

export function InjuryMeter({ level, note, compact, playerName }: InjuryMeterProps) {
  const label = getInjuryLabel(level);
  const color = getInjuryColor(level);

  return (
    <div
      className={`injury-meter ${compact ? 'injury-meter--compact' : ''}`}
      title={
        playerName
          ? `${playerName}: ${level}% — ${label}${note ? ` (${note})` : ''}`
          : `${level}% — ${label}`
      }
      aria-label={`Injury level ${level} percent, ${label}`}
    >
      {!compact && <span className="injury-meter__label">Injury Meter</span>}
      <div className="injury-meter__track">
        <div
          className="injury-meter__fill"
          style={{ width: `${level}%`, background: color }}
        />
        {level > 50 && (
          <span className="injury-meter__pulse" style={{ left: `${level}%`, background: color }} aria-hidden />
        )}
      </div>
      <div className="injury-meter__meta">
        <span className="injury-meter__value" style={{ color }}>
          {level}%
        </span>
        {!compact && <span className="injury-meter__tier">{label}</span>}
      </div>
      {!compact && note && <span className="injury-meter__note">{note}</span>}
    </div>
  );
}