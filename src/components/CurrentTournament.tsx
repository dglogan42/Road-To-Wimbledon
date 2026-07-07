import type { Tournament } from '../types';
import { formatDateRange } from '../data/tournaments';
import { SurfaceBadge } from './SurfaceBadge';

interface CurrentTournamentProps {
  tournament: Tournament;
}

export function CurrentTournament({ tournament }: CurrentTournamentProps) {
  const daysRemaining = Math.ceil(
    (new Date(tournament.endDate + 'T23:59:59').getTime() - Date.now()) / 86400000,
  );

  return (
    <div className="current-tournament">
      <div className="current-tournament__badge">Live</div>
      <h2 className="current-tournament__name">{tournament.name}</h2>
      <p className="current-tournament__location">
        {tournament.city}, {tournament.country}
      </p>

      <div className="current-tournament__details">
        <SurfaceBadge surface={tournament.surface} />
        <span className="current-tournament__dates">
          {formatDateRange(tournament.startDate, tournament.endDate)}
        </span>
        {tournament.prizeMoney && (
          <span className="current-tournament__prize">{tournament.prizeMoney}</span>
        )}
      </div>

      {daysRemaining > 0 && (
        <p className="current-tournament__countdown">
          {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
        </p>
      )}

      {tournament.defendingChampion && (
        <div className="current-tournament__defending">
          <span className="current-tournament__defending-label">Defending Champions</span>
          {tournament.defendingChampion.atp && (
            <span>🎾 Men: {tournament.defendingChampion.atp}</span>
          )}
          {tournament.defendingChampion.wta && (
            <span>🎾 Women: {tournament.defendingChampion.wta}</span>
          )}
        </div>
      )}
    </div>
  );
}