export type Tour = 'atp' | 'wta' | 'both';

export type Surface = 'hard' | 'clay' | 'grass' | 'indoor';

export type TournamentTier = 'grand-slam' | 'masters' | '500' | '250' | 'finals' | 'united-cup';

export type TournamentStatus = 'completed' | 'live' | 'upcoming';

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  surface: Surface;
  tier: TournamentTier;
  tour: Tour;
  drawSize: number;
  prizeMoney?: string;
  defendingChampion?: { atp?: string; wta?: string };
  champion?: { atp?: string; wta?: string };
  highlight?: boolean;
}

export interface PlayerResult {
  tournamentId: string;
  round: string;
  outcome: 'champion' | 'finalist' | 'semifinal' | 'quarterfinal' | 'round-of-16' | 'lost';
}

export type TantrumSeverity = 'mild' | 'heated' | 'mcenroe-level';

export interface Tantrum {
  tournamentId: string;
  round: string;
  quote: string;
  target: 'umpire' | 'crowd' | 'racket' | 'ball-kid' | 'self';
  severity: TantrumSeverity;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  ranking: number;
  points: number;
  age: number;
  tour: 'atp' | 'wta';
  results: PlayerResult[];
  /** Grunt/groan intensity 1 (silent) – 10 (seismic) */
  gruntGroan: number;
  /** Injury level 0 (fit) – 100 (retirement watch) */
  injury: number;
  injuryNote?: string;
  tantrums: Tantrum[];
}

export type FilterTour = 'all' | 'atp' | 'wta';

export type CelebTier = 'royal' | 'a-list' | 'sports' | 'wildcard';

export interface Celebrity {
  id: string;
  name: string;
  title: string;
  tournamentId: string;
  court: string;
  seat: string;
  clue: string;
  spottedDoing: string;
  tier: CelebTier;
  emoji: string;
  /** Grid position in the crowd scene (auto-assigned if omitted) */
  row?: number;
  col?: number;
}