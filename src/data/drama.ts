import type { Player, TantrumSeverity } from '../types';

export function getGruntLabel(level: number): string {
  if (level <= 2) return 'Silent assassin';
  if (level <= 4) return 'Polite exhale';
  if (level <= 6) return 'Standard issue';
  if (level <= 8) return 'Opera rehearsal';
  return 'Seismic event';
}

export function getInjuryLabel(level: number): string {
  if (level <= 20) return 'Match fit';
  if (level <= 40) return 'Niggling';
  if (level <= 60) return 'Tape & prayers';
  if (level <= 80) return 'Physio on speed dial';
  return 'Retirement watch';
}

export function getInjuryColor(level: number): string {
  if (level <= 20) return '#5a9e3f';
  if (level <= 40) return '#c9e265';
  if (level <= 60) return '#d4a843';
  if (level <= 80) return '#e67e22';
  return '#e74c3c';
}

export function getGruntColor(level: number): string {
  if (level <= 4) return '#7b9eb8';
  if (level <= 6) return '#9cb09c';
  if (level <= 8) return '#d4568a';
  return '#e74c3c';
}

export function isMcEnroeWannabe(player: Player): boolean {
  return player.tantrums.some((t) => t.severity === 'mcenroe-level' || t.severity === 'heated');
}

export function getMcEnroeScore(player: Player): number {
  const weights: Record<TantrumSeverity, number> = {
    mild: 1,
    heated: 2,
    'mcenroe-level': 3,
  };
  return player.tantrums.reduce((sum, t) => sum + weights[t.severity], 0);
}

export function getTantrumsAtTournament(player: Player, tournamentId: string) {
  return player.tantrums.filter((t) => t.tournamentId === tournamentId);
}

export function getRecentTantrums(players: Player[], tournamentId: string) {
  return players
    .flatMap((p) =>
      getTantrumsAtTournament(p, tournamentId).map((t) => ({ player: p, tantrum: t })),
    )
    .sort((a, b) => {
      const order: Record<TantrumSeverity, number> = {
        'mcenroe-level': 0,
        heated: 1,
        mild: 2,
      };
      return order[a.tantrum.severity] - order[b.tantrum.severity];
    });
}