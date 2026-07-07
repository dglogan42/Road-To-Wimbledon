import type { Tantrum } from '../types';
import { tournaments } from '../data/tournaments';

interface McEnroeWannabeProps {
  tantrums: Tantrum[];
  playerName: string;
  showQuotes?: boolean;
}

const TARGET_EMOJI: Record<Tantrum['target'], string> = {
  umpire: '👨‍⚖️',
  crowd: '📢',
  racket: '🎾💥',
  'ball-kid': '😬',
  self: '🪞',
};

export function McEnroeWannabe({ tantrums, playerName, showQuotes = true }: McEnroeWannabeProps) {
  if (tantrums.length === 0) return null;

  const worst = tantrums.reduce((a, b) => {
    const rank = { 'mcenroe-level': 3, heated: 2, mild: 1 };
    return rank[b.severity] > rank[a.severity] ? b : a;
  });

  return (
    <div
      className={`mcenroe mcenroe--${worst.severity}`}
      role="status"
      aria-label={`${playerName} McEnroe wannabe alert`}
    >
      <div className="mcenroe__badge">
        <span className="mcenroe__headband" aria-hidden>🎾</span>
        <span className="mcenroe__title">McEnroe Wannabe</span>
        {tantrums.length > 1 && (
          <span className="mcenroe__count">×{tantrums.length}</span>
        )}
      </div>

      {showQuotes &&
        tantrums.map((t, i) => {
          const event = tournaments.find((ev) => ev.id === t.tournamentId);
          return (
            <blockquote key={i} className="mcenroe__quote">
              <p>&ldquo;{t.quote}&rdquo;</p>
              <footer>
                {TARGET_EMOJI[t.target]} {t.round}
                {event ? ` · ${event.shortName}` : ''}
                {t.severity === 'mcenroe-level' && (
                  <span className="mcenroe__you-cannot"> — You cannot be serious!</span>
                )}
              </footer>
            </blockquote>
          );
        })}
    </div>
  );
}