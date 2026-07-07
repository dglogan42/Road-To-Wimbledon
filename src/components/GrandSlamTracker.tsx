import type { Tournament } from '../types';
import { getGrandSlams, getTournamentStatus, formatDateRange } from '../data/tournaments';
import { SurfaceBadge } from './SurfaceBadge';

interface GrandSlamTrackerProps {
  today: Date;
}

export function GrandSlamTracker({ today }: GrandSlamTrackerProps) {
  const slams = getGrandSlams();

  return (
    <div className="slam-tracker">
      <h2 className="section-title">Grand Slam Road</h2>
      <p className="section-subtitle">The four pillars of the season</p>

      <div className="slam-tracker__grid">
        {slams.map((slam, i) => (
          <SlamCard key={slam.id} slam={slam} today={today} index={i} />
        ))}
      </div>
    </div>
  );
}

function SlamCard({ slam, today, index }: { slam: Tournament; today: Date; index: number }) {
  const status = getTournamentStatus(slam, today);

  return (
    <div className={`slam-card slam-card--${status} slam-card--${slam.surface}`}>
      <div className="slam-card__number">{index + 1}</div>
      <div className="slam-card__body">
        <h3 className="slam-card__name">{slam.shortName}</h3>
        <p className="slam-card__venue">{slam.city}</p>
        <SurfaceBadge surface={slam.surface} small />
        <p className="slam-card__dates">{formatDateRange(slam.startDate, slam.endDate)}</p>

        {status === 'completed' && slam.champion && (
          <div className="slam-card__winners">
            {slam.champion.atp && (
              <div className="slam-card__winner">
                <span className="slam-card__winner-label">Men</span>
                <span className="slam-card__winner-name">{slam.champion.atp}</span>
              </div>
            )}
            {slam.champion.wta && (
              <div className="slam-card__winner">
                <span className="slam-card__winner-label">Women</span>
                <span className="slam-card__winner-name">{slam.champion.wta}</span>
              </div>
            )}
          </div>
        )}

        {status === 'live' && (
          <span className="slam-card__status slam-card__status--live">In Progress</span>
        )}
        {status === 'upcoming' && (
          <span className="slam-card__status slam-card__status--upcoming">Upcoming</span>
        )}
      </div>
    </div>
  );
}