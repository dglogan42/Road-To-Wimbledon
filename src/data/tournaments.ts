import type { Tournament, TournamentStatus } from '../types';

export const SEASON_YEAR = 2026;

export const tournaments: Tournament[] = [
  // ── January: Southern Hemisphere swing ──
  {
    id: 'united-cup',
    name: 'United Cup',
    shortName: 'United Cup',
    city: 'Sydney & Perth',
    country: 'Australia',
    startDate: '2025-12-27',
    endDate: '2026-01-04',
    surface: 'hard',
    tier: 'united-cup',
    tour: 'both',
    drawSize: 18,
    champion: { atp: 'Italy', wta: 'Italy' },
  },
  {
    id: 'brisbane',
    name: 'Brisbane International',
    shortName: 'Brisbane',
    city: 'Brisbane',
    country: 'Australia',
    startDate: '2025-12-28',
    endDate: '2026-01-04',
    surface: 'hard',
    tier: '250',
    tour: 'both',
    drawSize: 32,
    champion: { atp: 'Jannik Sinner', wta: 'Aryna Sabalenka' },
  },
  {
    id: 'asb-classic',
    name: 'ASB Classic',
    shortName: 'ASB Classic',
    city: 'Auckland',
    country: 'New Zealand',
    startDate: '2026-01-05',
    endDate: '2026-01-11',
    surface: 'hard',
    tier: '250',
    tour: 'both',
    drawSize: 32,
    prizeMoney: '$924,000',
    defendingChampion: { atp: 'Ben Shelton', wta: 'Clara Tauson' },
    champion: { atp: 'Ben Shelton', wta: 'Madison Keys' },
    highlight: true,
  },
  {
    id: 'adelaide',
    name: 'Adelaide International',
    shortName: 'Adelaide',
    city: 'Adelaide',
    country: 'Australia',
    startDate: '2026-01-12',
    endDate: '2026-01-18',
    surface: 'hard',
    tier: '500',
    tour: 'both',
    drawSize: 32,
    champion: { atp: 'Felix Auger-Aliassime', wta: 'Jessica Pegula' },
  },
  {
    id: 'australian-open',
    name: 'Australian Open',
    shortName: 'Australian Open',
    city: 'Melbourne',
    country: 'Australia',
    startDate: '2026-01-19',
    endDate: '2026-02-01',
    surface: 'hard',
    tier: 'grand-slam',
    tour: 'both',
    drawSize: 128,
    prizeMoney: 'A$96.5M',
    defendingChampion: { atp: 'Jannik Sinner', wta: 'Aryna Sabalenka' },
    champion: { atp: 'Jannik Sinner', wta: 'Coco Gauff' },
    highlight: true,
  },

  // ── February: Middle East & indoor ──
  {
    id: 'doha',
    name: 'Qatar Open',
    shortName: 'Doha',
    city: 'Doha',
    country: 'Qatar',
    startDate: '2026-02-09',
    endDate: '2026-02-15',
    surface: 'hard',
    tier: '500',
    tour: 'both',
    drawSize: 32,
    champion: { atp: 'Carlos Alcaraz', wta: 'Iga Świątek' },
  },
  {
    id: 'dubai',
    name: 'Dubai Tennis Championships',
    shortName: 'Dubai',
    city: 'Dubai',
    country: 'UAE',
    startDate: '2026-02-16',
    endDate: '2026-02-22',
    surface: 'hard',
    tier: '500',
    tour: 'both',
    drawSize: 32,
    champion: { atp: 'Stefanos Tsitsipas', wta: 'Mirra Andreeva' },
  },
  {
    id: 'rotterdam',
    name: 'ABN AMRO Open',
    shortName: 'Rotterdam',
    city: 'Rotterdam',
    country: 'Netherlands',
    startDate: '2026-02-09',
    endDate: '2026-02-15',
    surface: 'indoor',
    tier: '500',
    tour: 'atp',
    drawSize: 32,
    champion: { atp: 'Carlos Alcaraz' },
  },
  {
    id: 'dubai-wta',
    name: 'Dubai Duty Free',
    shortName: 'Dubai WTA',
    city: 'Dubai',
    country: 'UAE',
    startDate: '2026-02-16',
    endDate: '2026-02-22',
    surface: 'hard',
    tier: 'masters',
    tour: 'wta',
    drawSize: 56,
    champion: { wta: 'Aryna Sabalenka' },
  },

  // ── March: Sunshine Double ──
  {
    id: 'indian-wells',
    name: 'BNP Paribas Open',
    shortName: 'Indian Wells',
    city: 'Indian Wells',
    country: 'USA',
    startDate: '2026-03-04',
    endDate: '2026-03-15',
    surface: 'hard',
    tier: 'masters',
    tour: 'both',
    drawSize: 96,
    prizeMoney: '$9.8M',
    champion: { atp: 'Jack Draper', wta: 'Aryna Sabalenka' },
    highlight: true,
  },
  {
    id: 'miami',
    name: 'Miami Open',
    shortName: 'Miami',
    city: 'Miami',
    country: 'USA',
    startDate: '2026-03-18',
    endDate: '2026-03-29',
    surface: 'hard',
    tier: 'masters',
    tour: 'both',
    drawSize: 96,
    champion: { atp: 'Jannik Sinner', wta: 'Coco Gauff' },
    highlight: true,
  },

  // ── April: Clay season begins ──
  {
    id: 'monte-carlo',
    name: 'Monte-Carlo Masters',
    shortName: 'Monte Carlo',
    city: 'Monte Carlo',
    country: 'Monaco',
    startDate: '2026-04-05',
    endDate: '2026-04-12',
    surface: 'clay',
    tier: 'masters',
    tour: 'atp',
    drawSize: 56,
    champion: { atp: 'Carlos Alcaraz' },
  },
  {
    id: 'barcelona',
    name: 'Barcelona Open',
    shortName: 'Barcelona',
    city: 'Barcelona',
    country: 'Spain',
    startDate: '2026-04-14',
    endDate: '2026-04-20',
    surface: 'clay',
    tier: '500',
    tour: 'atp',
    drawSize: 32,
    champion: { atp: 'Carlos Alcaraz' },
  },
  {
    id: 'stuttgart',
    name: 'Porsche Tennis Grand Prix',
    shortName: 'Stuttgart',
    city: 'Stuttgart',
    country: 'Germany',
    startDate: '2026-04-14',
    endDate: '2026-04-20',
    surface: 'clay',
    tier: '500',
    tour: 'wta',
    drawSize: 32,
    champion: { wta: 'Iga Świątek' },
  },

  // ── May: Clay Masters & Roland Garros ──
  {
    id: 'madrid',
    name: 'Mutua Madrid Open',
    shortName: 'Madrid',
    city: 'Madrid',
    country: 'Spain',
    startDate: '2026-04-22',
    endDate: '2026-05-03',
    surface: 'clay',
    tier: 'masters',
    tour: 'both',
    drawSize: 96,
    champion: { atp: 'Jannik Sinner', wta: 'Iga Świątek' },
    highlight: true,
  },
  {
    id: 'rome',
    name: 'Internazionali BNL d\'Italia',
    shortName: 'Rome',
    city: 'Rome',
    country: 'Italy',
    startDate: '2026-05-05',
    endDate: '2026-05-17',
    surface: 'clay',
    tier: 'masters',
    tour: 'both',
    drawSize: 96,
    champion: { atp: 'Carlos Alcaraz', wta: 'Aryna Sabalenka' },
    highlight: true,
  },
  {
    id: 'roland-garros',
    name: 'Roland Garros',
    shortName: 'Roland Garros',
    city: 'Paris',
    country: 'France',
    startDate: '2026-05-25',
    endDate: '2026-06-08',
    surface: 'clay',
    tier: 'grand-slam',
    tour: 'both',
    drawSize: 128,
    prizeMoney: '€53.5M',
    defendingChampion: { atp: 'Carlos Alcaraz', wta: 'Iga Świątek' },
    champion: { atp: 'Carlos Alcaraz', wta: 'Aryna Sabalenka' },
    highlight: true,
  },

  // ── June: Grass season & Wimbledon prep ──
  {
    id: 'queens',
    name: 'Queen\'s Club Championships',
    shortName: 'Queen\'s',
    city: 'London',
    country: 'Great Britain',
    startDate: '2026-06-15',
    endDate: '2026-06-21',
    surface: 'grass',
    tier: '500',
    tour: 'atp',
    drawSize: 32,
    champion: { atp: 'Carlos Alcaraz' },
  },
  {
    id: 'berlin',
    name: 'Grass Court Championships Berlin',
    shortName: 'Berlin',
    city: 'Berlin',
    country: 'Germany',
    startDate: '2026-06-15',
    endDate: '2026-06-21',
    surface: 'grass',
    tier: '500',
    tour: 'wta',
    drawSize: 32,
    champion: { wta: 'Jessica Pegula' },
  },
  {
    id: 'halle',
    name: 'Terra Wortmann Open',
    shortName: 'Halle',
    city: 'Halle',
    country: 'Germany',
    startDate: '2026-06-15',
    endDate: '2026-06-21',
    surface: 'grass',
    tier: '500',
    tour: 'atp',
    drawSize: 32,
    champion: { atp: 'Jannik Sinner' },
  },
  {
    id: 'eastbourne',
    name: 'Rothesay International',
    shortName: 'Eastbourne',
    city: 'Eastbourne',
    country: 'Great Britain',
    startDate: '2026-06-22',
    endDate: '2026-06-27',
    surface: 'grass',
    tier: '250',
    tour: 'both',
    drawSize: 32,
    champion: { atp: 'Tommy Paul', wta: 'Madison Keys' },
  },
  {
    id: 'wimbledon',
    name: 'The Championships, Wimbledon',
    shortName: 'Wimbledon',
    city: 'London',
    country: 'Great Britain',
    startDate: '2026-06-29',
    endDate: '2026-07-12',
    surface: 'grass',
    tier: 'grand-slam',
    tour: 'both',
    drawSize: 128,
    prizeMoney: '£50M',
    defendingChampion: { atp: 'Carlos Alcaraz', wta: 'Barbora Krejčíková' },
    highlight: true,
  },

  // ── Post-Wimbledon (preview) ──
  {
    id: 'us-open',
    name: 'US Open',
    shortName: 'US Open',
    city: 'New York',
    country: 'USA',
    startDate: '2026-08-31',
    endDate: '2026-09-13',
    surface: 'hard',
    tier: 'grand-slam',
    tour: 'both',
    drawSize: 128,
    prizeMoney: '$75M',
    defendingChampion: { atp: 'Jannik Sinner', wta: 'Aryna Sabalenka' },
    highlight: true,
  },
];

export function getTournamentStatus(tournament: Tournament, today: Date): TournamentStatus {
  const start = new Date(tournament.startDate + 'T00:00:00');
  const end = new Date(tournament.endDate + 'T23:59:59');
  if (today > end) return 'completed';
  if (today >= start && today <= end) return 'live';
  return 'upcoming';
}

export function getCurrentTournament(today: Date): Tournament | undefined {
  return tournaments.find((t) => getTournamentStatus(t, today) === 'live');
}

export function getCompletedTournaments(today: Date): Tournament[] {
  return tournaments.filter((t) => getTournamentStatus(t, today) === 'completed');
}

export function getUpcomingTournaments(today: Date): Tournament[] {
  return tournaments.filter((t) => getTournamentStatus(t, today) === 'upcoming');
}

export function getGrandSlams(): Tournament[] {
  return tournaments.filter((t) => t.tier === 'grand-slam');
}

export function getSeasonProgress(today: Date): number {
  const wimbledon = tournaments.find((t) => t.id === 'wimbledon')!;
  const seasonStart = new Date(tournaments[0].startDate + 'T00:00:00');
  const wimbledonEnd = new Date(wimbledon.endDate + 'T23:59:59');
  const total = wimbledonEnd.getTime() - seasonStart.getTime();
  const elapsed = Math.min(Math.max(today.getTime() - seasonStart.getTime(), 0), total);
  return Math.round((elapsed / total) * 100);
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start + 'T12:00:00');
  const e = new Date(end + 'T12:00:00');
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  if (s.getMonth() === e.getMonth()) {
    return `${s.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} – ${e.getDate()}, ${e.getFullYear()}`;
  }
  return `${s.toLocaleDateString('en-GB', opts)} – ${e.toLocaleDateString('en-GB', opts)}, ${e.getFullYear()}`;
}