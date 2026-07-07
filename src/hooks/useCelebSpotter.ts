import { useCallback, useState } from 'react';

export function useCelebSpotter() {
  const [spotted, setSpotted] = useState<Set<string>>(new Set());
  const [hintsUsed, setHintsUsed] = useState<Set<string>>(new Set());
  const [lastSpot, setLastSpot] = useState<string | null>(null);

  const spot = useCallback((id: string) => {
    setSpotted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setLastSpot(id);
  }, []);

  const revealHint = useCallback((id: string) => {
    setHintsUsed((prev) => new Set(prev).add(id));
  }, []);

  const reset = useCallback(() => {
    setSpotted(new Set());
    setHintsUsed(new Set());
    setLastSpot(null);
  }, []);

  return { spotted, hintsUsed, lastSpot, spot, revealHint, reset };
}