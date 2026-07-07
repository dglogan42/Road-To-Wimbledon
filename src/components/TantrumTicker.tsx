import { getPlayersByTour } from '../data/players';
import { getRecentTantrums } from '../data/drama';
import { ClipShareButton } from './ClipShareButton';

interface TantrumTickerProps {
  tournamentId: string;
  tournamentName: string;
}

export function TantrumTicker({ tournamentId, tournamentName }: TantrumTickerProps) {
  const players = getPlayersByTour('all');
  const tantrums = getRecentTantrums(players, tournamentId);

  if (tantrums.length === 0) return null;

  const items = tantrums.map(({ player, tantrum }, i) => (
    <span key={i} className={`tantrum-ticker__item tantrum-ticker__item--${tantrum.severity}`}>
      <strong>{player.name}</strong> ({tantrum.round}): &ldquo;{tantrum.quote}&rdquo;
      {tantrum.severity === 'mcenroe-level' && (
        <em className="tantrum-ticker__ycbs"> — You cannot be serious!</em>
      )}
      <ClipShareButton
        text={`${player.name}: ${tantrum.quote}`}
        announcerName="McEnroe Watch"
        announcer="mcenroe"
      />
    </span>
  ));

  return (
    <div className="tantrum-ticker" aria-live="polite">
      <span className="tantrum-ticker__label">🎾 McEnroe Watch · {tournamentName}</span>
      <div className="tantrum-ticker__viewport">
        <div className="tantrum-ticker__scroll">
          {items}
          {items}
        </div>
      </div>
    </div>
  );
}