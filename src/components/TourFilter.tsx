import type { FilterTour } from '../types';

interface TourFilterProps {
  value: FilterTour;
  onChange: (tour: FilterTour) => void;
}

const OPTIONS: { value: FilterTour; label: string }[] = [
  { value: 'all', label: 'All Tours' },
  { value: 'atp', label: 'ATP Men' },
  { value: 'wta', label: 'WTA Women' },
];

export function TourFilter({ value, onChange }: TourFilterProps) {
  return (
    <div className="tour-filter" role="tablist" aria-label="Filter by tour">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          className={`tour-filter__btn ${value === opt.value ? 'tour-filter__btn--active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}