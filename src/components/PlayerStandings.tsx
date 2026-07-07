import type { FilterTour } from '../types';
import { getPlayersByTour, getPlayerRoadResult, countGrandSlamWins } from '../data/players';
import { tournaments } from '../data/tournaments';
import { getTantrumsAtTournament } from '../data/drama';
import { GruntGroanMeter } from './GruntGroanMeter';
import { InjuryMeter } from './InjuryMeter';

interface PlayerStandingsProps {
  tourFilter: FilterTour;
  selectedTournamentId: string | null;
}

const ROAD_TOURNAMENTS = tournaments.filter(
  (t) =>
    t.highlight ||
    t.tier === 'grand-slam' ||
    t.id === 'asb-classic',
);

export function PlayerStandings({ tourFilter, selectedTournamentId }: PlayerStandingsProps) {
  const players = getPlayersByTour(tourFilter === 'all' ? 'all' : tourFilter);

  const displayPlayers =
    tourFilter === 'all'
      ? players
      : players.filter((p) => p.tour === tourFilter);

  const focusTournament = selectedTournamentId
    ? tournaments.find((t) => t.id === selectedTournamentId)
    : null;

  return (
    <div className="standings">
      <h2 className="section-title">
        {tourFilter === 'atp' ? 'ATP Rankings' : tourFilter === 'wta' ? 'WTA Rankings' : 'Player Tracker'}
      </h2>
      {focusTournament && (
        <p className="section-subtitle">
          Results at {focusTournament.shortName}
        </p>
      )}

      <div className="standings__table-wrap">
        <table className="standings__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Pts</th>
              <th>Slams</th>
              <th title="Grunt/Groan rating">Grunt</th>
              <th title="Injury meter">Inj</th>
              <th title="McEnroe wannabe">🎾</th>
              {ROAD_TOURNAMENTS.map((t) => (
                <th key={t.id} className="standings__road-col" title={t.name}>
                  {t.shortName.split(' ').map((w) => w[0]).join('')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayPlayers.map((player) => (
              <tr key={player.id} className={`standings__row standings__row--${player.tour}`}>
                <td className="standings__rank">{player.ranking}</td>
                <td className="standings__player">
                  <span className="standings__flag" title={player.country}>
                    {countryFlag(player.countryCode)}
                  </span>
                  <span className="standings__name">{player.name}</span>
                  {tourFilter === 'all' && (
                    <span className={`standings__tour-tag standings__tour-tag--${player.tour}`}>
                      {player.tour.toUpperCase()}
                    </span>
                  )}
                </td>
                <td className="standings__points">{player.points.toLocaleString()}</td>
                <td className="standings__slams">{countGrandSlamWins(player)}</td>
                <td className="standings__vital">
                  <GruntGroanMeter level={player.gruntGroan} compact playerName={player.name} />
                </td>
                <td className="standings__vital">
                  <InjuryMeter level={player.injury} compact playerName={player.name} />
                </td>
                <td className="standings__mcenroe">
                  {(() => {
                    const atEvent = selectedTournamentId
                      ? getTantrumsAtTournament(player, selectedTournamentId)
                      : [];
                    const hasTantrum = atEvent.length > 0 || player.tantrums.length > 0;
                    const isLive = atEvent.some((t) => t.severity === 'mcenroe-level');
                    if (!hasTantrum) return <span className="standings__calm">✓</span>;
                    return (
                      <span
                        className={`standings__mcenroe-badge ${isLive ? 'standings__mcenroe-badge--live' : ''}`}
                        title={atEvent[0]?.quote ?? player.tantrums.at(-1)?.quote}
                      >
                        McE
                      </span>
                    );
                  })()}
                </td>
                {ROAD_TOURNAMENTS.map((t) => {
                  const result = getPlayerRoadResult(player, t.id);
                  const isFocus = selectedTournamentId === t.id;
                  return (
                    <td
                      key={t.id}
                      className={`standings__result ${result ? `standings__result--${result.toLowerCase()}` : ''} ${isFocus ? 'standings__result--focus' : ''}`}
                    >
                      {result ?? '·'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="standings__legend">
        <span><strong>W</strong> Champion</span>
        <span><strong>F</strong> Finalist</span>
        <span><strong>SF</strong> Semifinal</span>
        <span><strong>QF</strong> Quarterfinal</span>
      </div>
    </div>
  );
}

function countryFlag(code: string): string {
  const flags: Record<string, string> = {
    ITA: '🇮🇹', ESP: '🇪🇸', GBR: '🇬🇧', GER: '🇩🇪', USA: '🇺🇸',
    SRB: '🇸🇷', GRE: '🇬🇷', BLR: '🇧🇾', POL: '🇵🇱', RUS: '🇷🇺',
    KAZ: '🇰🇿',
  };
  return flags[code] ?? '🏳️';
}