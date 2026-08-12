# livescore

[한국어](README.md) · [日本語](README.ja.md) · **English**

> A livescore app I built for myself — baseball (KBO/MLB) and football fixtures and live scores at a glance

## About

**livescore** is a personal livescore web app for checking baseball and football fixtures, scores, standings, and lineups. Switch between baseball and football in the per-date fixture list, open a match for details (scoreboard, lineups, batter/pitcher stats), or look up league standings.

It is written in React + TypeScript with Vite for the dev server and builds. Match data comes from an external sports API (`sports-api.named.com`); standings come from Daum Sports (`sports.daum.net`) through a proxy.

## ✨ Features (as implemented)

- **Fixtures by date**: the main screen steps backward/forward through dates and lists that day's popular matches (`GetBaseballListTable`, `GetSoccerList` — calling `/popular-games?date=`).
- **Baseball / football toggle**: icons at the top of the main screen switch between the two lists.
- **Baseball match detail**: scoreboard, lineups, and batter/pitcher stats per match (`BaseballMatchPage`, `GetBaseballMatch`, `GetBaseballLineup`, `GetBaseballBatter`, `GetBaseballPitcher`, `BaseballScoreBoard`).
- **Football match detail**: per-match details (`SoccerMatchPage`, `GetSoccerMatch`).
- **Standings**: team standings for leagues such as the KBO (`RankPage`, `BaseballRank`, `BaseballMLB`, `SoccerRank` — calling Daum Sports `team/rank.json`).
- **Sign-in / sign-up modals**: MUI-based modal UI. Purely client-side — it validates input and shows success/failure toasts via `react-toastify`, with no auth backend wired up (`LoginBar`, `SignInModal`, `SignUpModal`).

## 🛠 Tech stack

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-5-007FFF?logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)

- **React 18**, **TypeScript**, **Vite 5** (`@vitejs/plugin-react`)
- **react-router-dom 6** (routing)
- **@mui/material** · **@mui/icons-material** · **@emotion**, plus some **@material-ui/core** (v4) theming
- **styled-components**, **react-toastify**
- **axios** (data fetching)

## 🏗 How it works / architecture

- The entry point `src/index.jsx` renders `App.tsx`. `App` wraps a `BrowserRouter` in a `ThemeProvider` (custom MUI theme) and a `ToastContainer`.
- **Routing** (`react-router-dom`):
  - `/` — main fixture list (`pages/index.tsx`)
  - `/match/baseball/:id` — baseball match detail
  - `/match/soccer/:id` — football match detail
  - `/rank` — standings
- **Data sources**:
  - Fixtures, details, lineups: `https://sports-api.named.com/v1.0/...` (e.g. `/popular-games?date=`, `/sports/baseball/games/{id}/...`)
  - Standings: Daum Sports `team/rank.json`. The proxy in `vite.config.js` forwards `/api` requests to `https://sports.daum.net/prx/hermes/api`.
- **Components**: list, detail, standings, and auth components live in `src/components/`; `src/components/JS/` and `src/pages/js/` keep the pre-TypeScript JavaScript versions.

## 🚀 Getting started

### Prerequisites

- Node.js

### Install

```bash
npm install
```

### Environment variables

`.env` only disables source-map generation. No API keys or secrets are needed.

```env
GENERATE_SOURCEMAP=false
```

### Run

```bash
npm start        # Vite dev server (port 81)
```

> The `start` script is `set PORT=81 && vite` (Windows shell style); the actual dev-server port is set to `81` in `vite.config.js`. Open `http://localhost:81`.

### Build

```bash
npm run build    # vite build (output dir: dist, assetsDir: static)
```

## 📁 Structure

```
livescore/
├── index.html
├── vite.config.js            # dev-server port, /api proxy, build settings
├── src/
│   ├── index.jsx             # entry point
│   ├── App.tsx               # routing, theme, toasts
│   ├── CustomMuiTheme.jsx    # custom MUI theme
│   ├── pages/                # index, BaseballMatchPage, SoccerMatchPage, RankPage
│   │   └── js/               # (legacy) JS versions of the pages
│   └── components/           # fixture list / detail / standings / auth components
│       └── JS/               # (legacy) JS versions of the components
└── public/                   # icons, logos, sports imagery
```

---

## 👤 Contribution & development environment

| Item | Detail |
|---|---|
| **Contribution share** | **100%** (solo development) |
| **Commits** | 15 / 15 (mine / all human commits) |
| **Contributors** | 1 |

<sub>Contribution share is counted by commit author email; bot and automation commits are excluded.</sub>
