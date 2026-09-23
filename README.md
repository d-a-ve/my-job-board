# Dave's Job Board

Personal job board for **Dave Aronmwan** — React / TypeScript / Node / React Native roles that are remote-worldwide or may offer visa sponsorship.

Static Vite + React + TypeScript + Tailwind CSS app. Jobs are loaded from `public/jobs.json` (seeded from the curated dataset). No auth, backend, or database.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # optional: serve the production build
```

## Features

- Client-side search across title, company, location, tags, and snippet
- Filters: source, why included, fit tags, seniority, remote
- Default sort: `remote-anywhere` first, then newest `posted` date
- Stats: showing X of Y · remote-anywhere · needs review
- Dark, mobile-responsive UI

## Data

Seed file: `public/jobs.json`  
Schema: `{ generated_at, candidate, jobs: [...] }`
