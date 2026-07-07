import type { CSSProperties } from 'react';
import type { Surface } from '../types';

const SURFACE_CONFIG: Record<Surface, { label: string; color: string }> = {
  hard: { label: 'Hard', color: '#4a90d9' },
  clay: { label: 'Clay', color: '#c45c26' },
  grass: { label: 'Grass', color: '#5a9e3f' },
  indoor: { label: 'Indoor', color: '#7b68a6' },
};

interface SurfaceBadgeProps {
  surface: Surface;
  small?: boolean;
}

export function SurfaceBadge({ surface, small }: SurfaceBadgeProps) {
  const config = SURFACE_CONFIG[surface];
  return (
    <span
      className={`surface-badge ${small ? 'surface-badge--small' : ''}`}
      style={{ '--surface-color': config.color } as CSSProperties}
    >
      {config.label}
    </span>
  );
}