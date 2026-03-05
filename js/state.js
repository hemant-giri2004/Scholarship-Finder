/**
 * js/state.js
 * ────────────
 * Central application state shared across all modules.
 * All modules read/write this object directly — no Redux needed.
 */

const AppState = {
  /** All scholarships loaded from localStorage */
  all: [],

  /** Currently filtered + sorted subset for display */
  filtered: [],

  /** How many cards are currently visible (pagination) */
  displayedCount: 6,

  /** Number of items per "load more" page */
  PAGE_SIZE: 6,

  /** Current view mode: 'cards' | 'table' */
  currentView: "cards",

  /** Active filter values */
  filters: {
    countries: [],
    streams: [],
    levels: [],
    fundings: [],
    deadlineBefore: "",
  },

  /** Active sort value */
  sortBy: "relevance",
};
