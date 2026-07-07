import { useState } from 'react';
import { TourFilter } from './components/TourFilter';
import { TournamentTimeline } from './components/TournamentTimeline';
import { PlayerStandings } from './components/PlayerStandings';
import { GrandSlamTracker } from './components/GrandSlamTracker';
import { CurrentTournament } from './components/CurrentTournament';
import { CourtDramaPanel } from './components/CourtDramaPanel';
import { TantrumTicker } from './components/TantrumTicker';
import { SpotTheCeleb } from './components/SpotTheCeleb';
import { useSeasonDate } from './hooks/useSeasonDate';
import {
  getCurrentTournament,
  getCompletedTournaments,
  getSeasonProgress,
  SEASON_YEAR,
} from './data/tournaments';
import type { FilterTour } from './types';

export default function App() {
  const today = useSeasonDate();
  const [tourFilter, setTourFilter] = useState<FilterTour>('all');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>('wimbledon');

  const currentTournament = getCurrentTournament(today);
  const completedCount = getCompletedTournaments(today).length;
  const seasonProgress = getSeasonProgress(today);

  return (
    <div className="app">
      <div className="grass-stripe" aria-hidden>
        <span /><span /><span /><span /><span />
      </div>

      <header className="header">
        <div className="header__brand">
          <div className="header__logo">
            <span className="header__ball" aria-hidden>🎾</span>
            <div>
              <h1>Road to Wimbledon</h1>
              <p className="header__tagline">ATP & WTA · {SEASON_YEAR} Season</p>
            </div>
          </div>
        </div>

        <TourFilter value={tourFilter} onChange={setTourFilter} />

        <div className="header__progress">
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${seasonProgress}%` }} />
          </div>
          <span className="progress-label">
            {seasonProgress}% to Wimbledon · {completedCount} events complete
          </span>
        </div>
      </header>

      {currentTournament && (
        <TantrumTicker
          tournamentId={currentTournament.id}
          tournamentName={currentTournament.shortName}
        />
      )}

      <main className="main">
        <section className="hero-section">
          {currentTournament ? (
            <CurrentTournament tournament={currentTournament} />
          ) : (
            <div className="hero-placeholder">
              <h2>Off-season</h2>
              <p>No tournament in progress — check the calendar below.</p>
            </div>
          )}
          <GrandSlamTracker today={today} />
        </section>

        <CourtDramaPanel
          tourFilter={tourFilter}
          selectedTournamentId={selectedTournamentId}
        />

        <SpotTheCeleb tournamentId={selectedTournamentId} />

        <section className="content-grid">
          <div className="content-grid__timeline">
            <TournamentTimeline
              today={today}
              tourFilter={tourFilter}
              selectedId={selectedTournamentId}
              onSelect={setSelectedTournamentId}
            />
          </div>

          <div className="content-grid__standings">
            <PlayerStandings
              tourFilter={tourFilter}
              selectedTournamentId={selectedTournamentId}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          {currentTournament
            ? `Now playing: ${currentTournament.name} — ${currentTournament.city}`
            : 'Tracking the journey from the ASB Classic to the All England Club'}
        </p>
        <p className="footer__note">2026 season data · Hard → Clay → Grass</p>
      </footer>
    </div>
  );
}