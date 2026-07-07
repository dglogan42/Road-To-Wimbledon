import { useMemo } from 'react';

export function useSeasonDate(): Date {
  return useMemo(() => new Date('2026-07-07'), []);
}