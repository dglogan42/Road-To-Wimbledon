import type { FilterTour } from '../types';
import { getPlayersByTour } from '../data/players';
import { getTantrumsAtTournament, isMcEnroeWannabe } from '../data/drama';
import { GruntGroanMeter } from './GruntGroanMeter';
import { InjuryMeter } from './InjuryMeter';
import { McEnroeWannabe } from './McEnroeWannabe';

interface CourtDramaPanelProps {
  tourFilter: FilterTour;
  selectedTournamentId: string | null;
}

export function CourtDramaPanel({ tourFilter, selectedTournamentId }: CourtDramaPanelProps) {
  const players = getPlayersByTour(tourFilter === 'all' ? 'all' : tourFilter);
  const displayPlayers =
    tourFilter === 'all' ? players : players.filter((p) => p.tour === tourFilter);

  const sorted = [...displayPlayers].sort((a, b) => {
    const dramaA = a.gruntGroan + a.injury + a.tantrums.length * 5;
    const dramaB = b.gruntGroan + b.injury + b.tantrums.length * 5;
    return dramaB - dramaA;
  });

  return (
    <section className="court-drama">
      <h2 className="section-title">Court Side Drama</h2>
      <p className="section-subtitle">
        Grunt/groan ratings, injury meters &amp; McEnroe wannabe alerts
      </p>

      <div className="court-drama__grid">
        {sorted.map((player) => {
          const eventTantrums = selectedTournamentId
            ? getTantrumsAtTournament(player, selectedTournamentId)
            : [];
          const tantrumsToShow =
            eventTantrums.length > 0 ? eventTantrums : player.tantrums.slice(-1);

          return (
            <article
              key={player.id}
              className={`drama-card drama-card--${player.tour} ${isMcEnroeWannabe(player) ? 'drama-card--mcenroe' : ''}`}
            >
              <header className="drama-card__header">
                <span className="drama-card__rank">#{player.ranking}</span>
                <h3 className="drama-card__name">{player.name}</h3>
                <span className={`drama-card__tour drama-card__tour--${player.tour}`}>
                  {player.tour.toUpperCase()}
                </span>
              </header>

              <div className="drama-card__meters">
                <GruntGroanMeter level={player.gruntGroan} playerName={player.name} />
                <InjuryMeter
                  level={player.injury}
                  note={player.injuryNote}
                  playerName={player.name}
                />
              </div>

              {tantrumsToShow.length > 0 ? (
                <McEnroeWannabe
                  tantrums={tantrumsToShow}
                  playerName={player.name}
                  showQuotes
                />
              ) : (
                <p className="drama-card__clean">No tantrums logged. Suspiciously calm.</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}