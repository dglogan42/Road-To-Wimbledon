import { useMemo } from 'react';
import type { Celebrity } from '../types';
import { getCelebsForTournament, getCelebTierLabel } from '../data/celebrities';
import { layoutCrowdGrid } from '../data/crowdLayout';
import { tournaments } from '../data/tournaments';
import { useCelebSpotter } from '../hooks/useCelebSpotter';

interface SpotTheCelebProps {
  tournamentId: string | null;
}

export function SpotTheCeleb({ tournamentId }: SpotTheCelebProps) {
  const { spotted, hintsUsed, lastSpot, spot, revealHint, reset } = useCelebSpotter();

  const activeId = tournamentId ?? 'wimbledon';
  const celebs = useMemo(() => getCelebsForTournament(activeId), [activeId]);
  const tournament = tournaments.find((t) => t.id === activeId);

  const spottedCount = celebs.filter((c) => spotted.has(c.id)).length;
  const allFound = celebs.length > 0 && spottedCount === celebs.length;

  const { grid, rows: crowdRows } = useMemo(
    () => layoutCrowdGrid(celebs),
    [celebs],
  );

  if (celebs.length === 0) {
    return (
      <section className="spot-celeb">
        <h2 className="section-title">Spot the Celeb</h2>
        <p className="section-subtitle">No celebrity sightings logged for this event yet.</p>
      </section>
    );
  }

  return (
    <section className="spot-celeb">
      <div className="spot-celeb__header">
        <div>
          <h2 className="section-title">Spot the Celeb in the Crowd</h2>
          <p className="section-subtitle">
            {tournament
              ? `${tournament.shortName} · ${tournament.city} — scan the stands`
              : 'Binoculars at the ready'}
          </p>
        </div>
        <div className="spot-celeb__score">
          <span className="spot-celeb__score-value">
            {spottedCount}/{celebs.length}
          </span>
          <span className="spot-celeb__score-label">spotted</span>
          {spottedCount > 0 && (
            <button type="button" className="spot-celeb__reset" onClick={reset}>
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="spot-celeb__progress">
        <div
          className="spot-celeb__progress-fill"
          style={{ width: `${(spottedCount / celebs.length) * 100}%` }}
        />
      </div>

      <div className="spot-celeb__arena">
        <div className="spot-celeb__court" aria-hidden>
          <span className="spot-celeb__net" />
          <span className="spot-celeb__court-label">
            {celebs[0]?.court ?? 'Centre Court'}
          </span>
        </div>

        <div
          className={`spot-celeb__stands ${crowdRows > 5 ? 'spot-celeb__stands--tall' : ''}`}
          role="group"
          aria-label="Crowd seating — click to spot celebrities"
        >
          {grid.map((row, ri) => (
            <div key={ri} className={`spot-celeb__row spot-celeb__row--${ri} ${ri >= 5 ? 'spot-celeb__row--upper' : ''}`}>
              {row.map((celeb, ci) => (
                <CrowdSeat
                  key={`${ri}-${ci}`}
                  celeb={celeb}
                  isSpotted={celeb ? spotted.has(celeb.id) : false}
                  hintRevealed={celeb ? hintsUsed.has(celeb.id) : false}
                  justSpotted={celeb?.id === lastSpot}
                  onSpot={() => celeb && spot(celeb.id)}
                  onHint={() => celeb && revealHint(celeb.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {allFound && (
        <div className="spot-celeb__victory" role="status">
          🎾 Eagle eyes! You spotted every celeb in the crowd. Pimm&apos;s on the house.
        </div>
      )}

      <div className="spot-celeb__tier-legend">
        <span className="spot-celeb__tier-chip spot-celeb__tier-chip--royal">Royal / VIP</span>
        <span className="spot-celeb__tier-chip spot-celeb__tier-chip--a-list">A-List</span>
        <span className="spot-celeb__tier-chip spot-celeb__tier-chip--sports">Sports Legend</span>
        <span className="spot-celeb__tier-chip spot-celeb__tier-chip--wildcard">Wildcard</span>
      </div>

      <div className="spot-celeb__roster">
        <h3 className="spot-celeb__roster-title">Sighting Log · {celebs.length} famous faces</h3>
        <ul className="spot-celeb__list">
          {celebs.map((c) => {
            const found = spotted.has(c.id);
            return (
              <li
                key={c.id}
                className={`spot-celeb__entry spot-celeb__entry--${c.tier} ${found ? 'spot-celeb__entry--found' : ''}`}
              >
                <span className="spot-celeb__entry-emoji">{found ? c.emoji : '🔍'}</span>
                <div className="spot-celeb__entry-body">
                  {found ? (
                    <>
                      <strong>{c.name}</strong>
                      <span className="spot-celeb__entry-tier">{getCelebTierLabel(c.tier)}</span>
                      <p className="spot-celeb__entry-doing">{c.spottedDoing}</p>
                      <p className="spot-celeb__entry-seat">{c.seat} · {c.court}</p>
                    </>
                  ) : (
                    <>
                      <span className="spot-celeb__entry-hidden">??? in the crowd</span>
                      <p className="spot-celeb__entry-clue">
                        {hintsUsed.has(c.id) ? c.clue : 'Click a pulsing seat or reveal hint'}
                      </p>
                      <button
                        type="button"
                        className="spot-celeb__hint-btn"
                        onClick={() => revealHint(c.id)}
                        disabled={hintsUsed.has(c.id)}
                      >
                        {hintsUsed.has(c.id) ? 'Clue revealed' : 'Reveal hint'}
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

interface CrowdSeatProps {
  celeb: Celebrity | null;
  isSpotted: boolean;
  hintRevealed: boolean;
  justSpotted: boolean;
  onSpot: () => void;
  onHint: () => void;
}

function CrowdSeat({ celeb, isSpotted, hintRevealed, justSpotted, onSpot, onHint }: CrowdSeatProps) {
  if (!celeb) {
    return <span className="crowd-seat crowd-seat--empty" aria-hidden />;
  }

  if (isSpotted) {
    return (
      <button
        type="button"
        className={`crowd-seat crowd-seat--spotted crowd-seat--${celeb.tier} ${justSpotted ? 'crowd-seat--pop' : ''}`}
        title={`${celeb.name}: ${celeb.spottedDoing}`}
        onClick={onSpot}
        aria-label={`Spotted: ${celeb.name}`}
      >
        <span className="crowd-seat__emoji">{celeb.emoji}</span>
        <span className="crowd-seat__name">{celeb.name.split(' ').pop()}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`crowd-seat crowd-seat--hidden ${hintRevealed ? 'crowd-seat--hint' : ''}`}
      title={hintRevealed ? celeb.clue : 'Someone famous might be here…'}
      onClick={onSpot}
      onContextMenu={(e) => {
        e.preventDefault();
        onHint();
      }}
      aria-label={hintRevealed ? `Hint: ${celeb.clue}` : 'Mystery spectator — click to identify'}
    >
      <span className="crowd-seat__silhouette" aria-hidden />
      {hintRevealed && <span className="crowd-seat__clue">?</span>}
    </button>
  );
}