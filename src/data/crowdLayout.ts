import type { Celebrity } from '../types';

const TIER_ORDER: Record<Celebrity['tier'], number> = {
  royal: 0,
  'a-list': 1,
  sports: 2,
  wildcard: 3,
};

/** Preferred seat slots — front/center first, then spread outward */
const AUTO_SLOTS: [number, number][] = [
  [0, 4], [0, 3], [0, 5], [0, 2], [0, 6], [0, 1], [0, 7], [0, 0], [0, 8],
  [1, 4], [1, 3], [1, 5], [1, 2], [1, 6], [1, 1], [1, 7], [1, 0], [1, 8],
  [2, 4], [2, 3], [2, 5], [2, 2], [2, 6], [2, 1], [2, 7], [2, 0], [2, 8],
  [3, 4], [3, 3], [3, 5], [3, 2], [3, 6], [3, 1], [3, 7], [3, 0], [3, 8],
  [4, 4], [4, 3], [4, 5], [4, 2], [4, 6], [4, 1], [4, 7], [4, 0], [4, 8],
  [5, 4], [5, 3], [5, 5], [5, 2], [5, 6],
];

export function getGridDimensions(celebCount: number): { rows: number; cols: number } {
  const cols = 9;
  const rows = Math.max(5, Math.ceil(celebCount / cols) + (celebCount > 9 ? 1 : 0));
  return { rows: Math.min(rows, 6), cols };
}

export function layoutCrowdGrid(celebs: Celebrity[]): {
  grid: (Celebrity | null)[][];
  rows: number;
  cols: number;
} {
  const { rows, cols } = getGridDimensions(celebs.length);
  const grid: (Celebrity | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null),
  );
  const occupied = new Set<string>();

  const place = (celeb: Celebrity, row: number, col: number): boolean => {
    if (row >= rows || col >= cols || occupied.has(`${row},${col}`)) return false;
    grid[row][col] = celeb;
    occupied.add(`${row},${col}`);
    return true;
  };

  const sorted = [...celebs].sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
  );

  const unplaced: Celebrity[] = [];

  for (const celeb of sorted) {
    if (celeb.row !== undefined && celeb.col !== undefined) {
      if (!place(celeb, celeb.row, celeb.col)) unplaced.push(celeb);
    } else {
      unplaced.push(celeb);
    }
  }

  for (const celeb of unplaced) {
    for (const [row, col] of AUTO_SLOTS) {
      if (place(celeb, row, col)) break;
    }
  }

  return { grid, rows, cols };
}