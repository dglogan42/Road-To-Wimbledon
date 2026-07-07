import { useMemo } from 'react';
import type { FilterTour, Tournament } from '../types';
import { tournaments, getTournamentStatus } from '../data/tournaments';
import { TournamentCard } from './TournamentCard';

interface TournamentTimelineProps {
  today: Date;
  tourFilter: FilterTour;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function matchesTourFilter(tournament: Tournament, filter: FilterTour): boolean {
  if (filter === 'all') return true;
  return tournament.tour === filter || tournament.tour === 'both';
}

export function TournamentTimeline({ today, tourFilter, selectedId, onSelect }: TournamentTimelineProps) {
  const filtered = useMemo(
    () => tournaments.filter((t) => matchesTourFilter(t, tourFilter)),
    [tourFilter],
  );

  const grouped = useMemo(() => {
    const months: { label: string; items: Tournament[] }[] = [];
    let currentMonth = '';

    for (const t of filtered) {
      const month = new Date(t.startDate + 'T12:00:00').toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      });
      if (month !== currentMonth) {
        currentMonth = month;
        months.push({ label: month, items: [] });
      }
      months[months.length - 1].items.push(t);
    }
    return months;
  }, [filtered]);

  return (
    <div className="timeline">
      <h2 className="section-title">Season Calendar</h2>
      <p className="section-subtitle">From Auckland to the All England Club</p>

      {grouped.map((group) => (
        <div key={group.label} className="timeline__month">
          <h3 className="timeline__month-label">{group.label}</h3>
          <div className="timeline__events">
            {group.items.map((t) => {
              const status = getTournamentStatus(t, today);
              return (
                <TournamentCard
                  key={t.id}
                  tournament={t}
                  status={status}
                  selected={selectedId === t.id}
                  onSelect={() => onSelect(selectedId === t.id ? null : t.id)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}