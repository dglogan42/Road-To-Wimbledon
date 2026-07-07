import type { Tournament, TournamentStatus } from '../types';
import { formatDateRange } from '../data/tournaments';
import { SurfaceBadge } from './SurfaceBadge';

const TIER_LABELS: Record<string, string> = {
  'grand-slam': 'Grand Slam',
  masters: 'Masters 1000',
  '500': 'ATP/WTA 500',
  '250': 'ATP/WTA 250',
  finals: 'Tour Finals',
  'united-cup': 'United Cup',
};

interface TournamentCardProps {
  tournament: Tournament;
  status: TournamentStatus;
  selected?: boolean;
  onSelect?: () => void;
  compact?: boolean;
}

export function TournamentCard({ tournament, status, selected, onSelect, compact }: TournamentCardProps) {
  const tourLabel =
    tournament.tour === 'both' ? 'ATP & WTA' : tournament.tour === 'atp' ? 'ATP' : 'WTA';

  return (
    <button
      type="button"
      className={`tournament-card tournament-card--${status} ${selected ? 'tournament-card--selected' : ''} ${compact ? 'tournament-card--compact' : ''} ${tournament.highlight ? 'tournament-card--highlight' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="tournament-card__header">
        <span className={`status-dot status-dot--${status}`} aria-hidden />
        <div className="tournament-card__titles">
          <h3 className="tournament-card__name">{tournament.shortName}</h3>
          <p className="tournament-card__location">
            {tournament.city}, {tournament.country}
          </p>
        </div>
        {tournament.tier === 'grand-slam' && (
          <span className="tournament-card__slam-badge" aria-label="Grand Slam">
            ★
          </span>
        )}
      </div>

      {!compact && (
        <>
          <div className="tournament-card__meta">
            <SurfaceBadge surface={tournament.surface} small />
            <span className="tournament-card__tier">{TIER_LABELS[tournament.tier]}</span>
            <span className="tournament-card__tour">{tourLabel}</span>
          </div>

          <p className="tournament-card__dates">
            {formatDateRange(tournament.startDate, tournament.endDate)}
          </p>

          {status === 'completed' && tournament.champion && (
            <div className="tournament-card__champions">
              {tournament.champion.atp && (
                <span className="champion-tag champion-tag--atp">
                  <span className="champion-tag__label">ATP</span> {tournament.champion.atp}
                </span>
              )}
              {tournament.champion.wta && (
                <span className="champion-tag champion-tag--wta">
                  <span className="champion-tag__label">WTA</span> {tournament.champion.wta}
                </span>
              )}
            </div>
          )}

          {status === 'live' && (
            <span className="tournament-card__live-label">● Live Now</span>
          )}
        </>
      )}
    </button>
  );
}