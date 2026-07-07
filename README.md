# Road to Wimbledon · 2026 Season

Track ATP and WTA players from the **ASB Classic** through **Roland Garros** to the **All England Club** — with a season calendar, Grand Slam road map, court-side drama meters, and a celebrity spotter mini-game.

![Season](https://img.shields.io/badge/Season-2026-green?style=flat-square)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

### Season tracker

- **Full 2026 calendar** — United Cup → Brisbane → ASB Classic → Australian Open → Sunshine Double → clay masters → grass prep → Wimbledon → US Open preview
- **ATP & WTA** — both tours at every event; filter by All Tours, ATP Men, or WTA Women
- **Grand Slam Road** — visual tracker for all four majors with champions and live status
- **Player standings** — top 8 per tour with results (W/F/SF/QF) across key meets on the road
- **Live hero card** — highlights the current tournament with surface, dates, prize money, and defending champions

### Court Side Drama

- **Grunt/Groan Rater** — 1–10 sound-wave meter per player (Silent assassin → Seismic event)
- **Injury Meter** — 0–100% health bar with notes (Match fit → Retirement watch)
- **McEnroe Wannabe** — tantrum alerts with quoted outbursts; *"You cannot be serious!"* at max severity
- **McEnroe Watch ticker** — scrolling banner of live tantrums during the current event

### Spot the Celeb in the Crowd

Interactive mini-game with **101 famous faces** across **23 tournaments**:

- Click pulsing seats in a tiered crowd scene to identify celebrities
- Reveal hints from the sighting log (or right-click a seat)
- Royal/VIP, A-List, Sports Legend, and Wildcard tiers
- Roster switches when you select a tournament in the calendar

## Quick Start

**Requirements:** Node.js 18+

```bash
cd road-to-wimbledon
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other commands

```bash
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run lint     # run Oxlint
```

## Usage

| Action | What happens |
|--------|--------------|
| **Tour filter** (header) | Switch between All Tours, ATP Men, WTA Women |
| **Tournament calendar** | Click an event to focus it; updates player results and celeb roster |
| **Progress bar** (header) | Season % complete from United Cup to Wimbledon |
| **Spot the Celeb seats** | Click a pulsing silhouette to reveal a celebrity |
| **Reveal hint** | Unlocks a clue for an unspotted celeb in the sighting log |
| **Reset** (celeb score) | Clears your spotted count for the current event |

## Data

Season data is bundled for the **2026 tennis calendar**. The app is seeded for **7 July 2026** (Wimbledon in progress).

To simulate a different date, change the constant in `src/hooks/useSeasonDate.ts`:

```ts
return useMemo(() => new Date('2026-07-07'), []);
```

Live scores and rankings are not fetched automatically. Update these files as the season progresses:

| File | Contents |
|------|----------|
| `src/data/tournaments.ts` | Event dates, surfaces, champions |
| `src/data/players.ts` | Rankings, results, grunt/injury/tantrum data |
| `src/data/celebrities.ts` | Celebrity sightings per tournament |
| `src/data/drama.ts` | Grunt/injury labels and tantrum helpers |

## Celebrity coverage

Every tournament on the calendar has a celebrity roster. Examples:

| Event | Celebs | Sample sightings |
|-------|--------|------------------|
| ASB Classic | 4 | Lorde, Jacinda Ardern, Taika Waititi |
| Australian Open | 6 | Kidman, Cathy Freeman, Hemsworth, Barty |
| Indian Wells | 5 | Oprah, Billie Jean King, DiCaprio, Serena |
| Roland Garros | 7 | Macron, Phoenix, Adele, Zidane |
| Wimbledon | 12 | Royal Box, Cumberbatch, Zendaya, Stormzy |
| US Open | 6 | Beyoncé, Spike Lee, Serena, Michelle Obama |

## Project Structure

```
src/
├── components/     # UI (timeline, standings, drama, celeb spotter)
├── data/           # Tournaments, players, celebrities, drama helpers
├── hooks/          # Season date, celeb spotter state
└── types.ts
```

## Tech Stack

- [Vite](https://vite.dev/) 8
- [React](https://react.dev/) 19 + TypeScript
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

## License

MIT — see [LICENSE](LICENSE).

## Acknowledgements

- Tournament calendar inspired by the ATP/WTA and Grand Slam schedules
- Celebrity sightings are fictional fan scenarios for entertainment — not reporting of real attendance
- *"You cannot be serious!"* — John McEnroe, 1981. Used here with affection and zero commercial intent