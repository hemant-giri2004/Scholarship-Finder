/**
 * js/app.js
 * ──────────
 * Application entry point.
 * Initializes localStorage, loads data into state,
 * wires up all event listeners, and triggers the first render.
 *
 * Load order in index.html:
 *   1. data/dummyScholarships.js   (raw data array)
 *   2. js/state.js                 (AppState object)
 *   3. js/utils.js                 (pure helpers)
 *   4. js/storage.js               (localStorage)
 *   5. js/sort.js                  (sort logic)
 *   6. components/card.js          (card HTML builder)
 *   7. components/filters.js       (filter logic)
 *   8. components/modal.js         (modal logic)
 *   9. js/renderer.js              (DOM renderer)
 *  10. js/app.js                   (this file — init)
 */

/**
 * initLoadMore
 * Binds the "Load More" button to increase displayedCount and re-render.
 */
function initLoadMore() {
  document.getElementById("btn-load-more").addEventListener("click", () => {
    AppState.displayedCount += AppState.PAGE_SIZE;
    renderScholarships();
  });
}

/**
 * initViewToggle
 * Binds the Cards / Table toggle buttons.
 */
function initViewToggle() {
  document.getElementById("btn-view-cards").addEventListener("click", () => setView("cards"));
  document.getElementById("btn-view-table").addEventListener("click", () => setView("table"));
}

/**
 * init
 * Main bootstrap function.
 * Runs after the DOM is fully loaded.
 */
function init() {
  console.log("[App] Initializing ScholarPath...");

  // 1. Seed or load localStorage
  initStorage();

  // 2. Load all scholarships into state
  AppState.all = getScholarships();
  AppState.filtered = [...AppState.all];

  // 3. Render stats bar
  renderStats();

  // 4. Apply default sort (relevance) and render
  sortScholarships();
  renderScholarships();

  // 5. Set default view
  setView("cards");

  // 6. Wire up all event listeners
  initFiltersListeners();
  initSortListener();
  initModalListeners();
  initLoadMore();
  initViewToggle();

  console.log(`[App] Ready. ${AppState.all.length} scholarships loaded.`);
}

// Run after full DOM load
document.addEventListener("DOMContentLoaded", init);
