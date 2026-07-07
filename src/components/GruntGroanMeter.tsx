import { getGruntColor, getGruntLabel } from '../data/drama';

interface GruntGroanMeterProps {
  level: number;
  compact?: boolean;
  playerName?: string;
}

export function GruntGroanMeter({ level, compact, playerName }: GruntGroanMeterProps) {
  const label = getGruntLabel(level);
  const color = getGruntColor(level);

  return (
    <div
      className={`grunt-meter ${compact ? 'grunt-meter--compact' : ''}`}
      title={playerName ? `${playerName}: ${level}/10 — ${label}` : `${level}/10 — ${label}`}
      aria-label={`Grunt groan rating ${level} out of 10, ${label}`}
    >
      {!compact && <span className="grunt-meter__label">Grunt/Groan</span>}
      <div className="grunt-meter__body">
        <div className="grunt-meter__bars" aria-hidden>
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`grunt-meter__bar ${i < level ? 'grunt-meter__bar--active' : ''}`}
              style={i < level ? { background: color, boxShadow: `0 0 6px ${color}55` } : undefined}
            />
          ))}
        </div>
        <span className="grunt-meter__value" style={{ color }}>
          {level}
        </span>
      </div>
      {!compact && <span className="grunt-meter__tier">{label}</span>}
    </div>
  );
}