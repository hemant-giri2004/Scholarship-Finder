# ScholarPath — Scholarship Finder

A responsive, multi-file scholarship discovery web application built with **HTML, CSS, and Vanilla JavaScript**.

## Project Structure

```
scholarship-finder/
│
├── index.html                  ← Main entry point (open this in browser)
├── styles.css                  ← All global styles & design tokens
│
├── data/
│   └── dummyScholarships.js    ← 30 dummy scholarships (seeds localStorage)
│
├── components/
│   ├── card.js                 ← Builds a single scholarship card HTML
│   ├── filters.js              ← Sidebar filter read/apply/reset logic
│   └── modal.js                ← View Details modal open/close logic
│
└── js/
    ├── state.js                ← Central AppState object (shared data)
    ├── utils.js                ← Pure helpers (flags, formatting, dates)
    ├── storage.js              ← localStorage read/write/seed
    ├── sort.js                 ← Sorting logic (amount, deadline, relevance)
    ├── renderer.js             ← All DOM rendering (cards, table, stats)
    └── app.js                  ← App init — wires everything together
```

## How to Run

Just open `index.html` in any modern browser. No server or build step needed.

```bash
# Option 1: Double-click index.html
# Option 2: Use VS Code Live Server extension
# Option 3: Python quick server
python -m http.server 3000
# then visit http://localhost:3000
```

## Features

| Feature | Details |
|---|---|
| 📦 LocalStorage | Auto-seeds 30 scholarships on first load |
| 📊 Stats Bar | Total, Full Funding, Quarter Deadlines, Countries |
| 🔍 Filters | Country, Stream, Level, Funding Type, Deadline Date |
| 🔃 Sorting | Relevance, Amount High/Low, Deadline Earliest |
| 🃏 Cards View | Grid with staggered animations & hover effects |
| 📋 Table View | Compact tabular view |
| 📄 Load More | Loads 6 at a time (pagination) |
| 🪟 Modal | Full scholarship detail popup |
| 📱 Responsive | Works on mobile, tablet, and desktop |

## Script Load Order

Scripts must load in this order (already set up in `index.html`):

1. `data/dummyScholarships.js` — raw data array
2. `js/state.js` — AppState object
3. `js/utils.js` — pure helpers
4. `js/storage.js` — localStorage
5. `js/sort.js` — sorting
6. `components/card.js` — card builder
7. `components/filters.js` — filter logic
8. `components/modal.js` — modal logic
9. `js/renderer.js` — DOM renderer
10. `js/app.js` — init (runs last)
