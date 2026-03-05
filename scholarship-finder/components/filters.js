/**
 * components/filters.js
 * ──────────────────────
 * Handles all sidebar filter UI interactions.
 * Reads checkbox/date values, updates AppState.filters,
 * and triggers a re-render via the main renderer.
 */

/**
 * getCheckedValues
 * Helper: returns array of checked values for a checkbox group.
 * @param {string} groupId  - ID of the container element
 * @returns {string[]}
 */
function getCheckedValues(groupId) {
  const checkboxes = document.querySelectorAll(`#${groupId} input[type="checkbox"]:checked`);
  return Array.from(checkboxes).map((cb) => cb.value);
}

/**
 * readFilters
 * Reads all sidebar inputs and returns a filters object.
 * @returns {Object}
 */
function readFilters() {
  return {
    countries: getCheckedValues("filter-country"),
    streams: getCheckedValues("filter-stream"),
    levels: getCheckedValues("filter-level"),
    fundings: getCheckedValues("filter-funding"),
    deadlineBefore: document.getElementById("filter-deadline").value,
  };
}

/**
 * applyFilters
 * Reads sidebar inputs → filters AppState.all → updates AppState.filtered.
 * Then resets pagination and triggers a full re-render.
 */
function applyFilters() {
  const f = readFilters();
  AppState.filters = f;

  AppState.filtered = AppState.all.filter((s) => {
    // Country filter
    if (f.countries.length > 0 && !f.countries.includes(s.country)) return false;

    // Stream filter
    if (f.streams.length > 0 && !f.streams.includes(s.stream)) return false;

    // Level filter
    if (f.levels.length > 0 && !f.levels.includes(s.level)) return false;

    // Funding type filter
    if (f.fundings.length > 0 && !f.fundings.includes(s.fundingType)) return false;

    // Deadline before filter
    if (f.deadlineBefore && new Date(s.deadline) > new Date(f.deadlineBefore)) return false;

    return true;
  });

  // Reset to first page after filtering
  AppState.displayedCount = AppState.PAGE_SIZE;

  // Apply current sort to freshly filtered data
  sortScholarships();

  // Re-render cards and update result count
  renderScholarships();
  updateResultCount();
}

/**
 * resetFilters
 * Unchecks all checkboxes, clears date, resets state, re-renders.
 */
function resetFilters() {
  // Uncheck all filter checkboxes
  document.querySelectorAll(".filter-checkbox").forEach((cb) => {
    cb.checked = false;
  });

  // Clear deadline input
  document.getElementById("filter-deadline").value = "";

  // Reset state
  AppState.filters = {
    countries: [],
    streams: [],
    levels: [],
    fundings: [],
    deadlineBefore: "",
  };
  AppState.filtered = [...AppState.all];
  AppState.displayedCount = AppState.PAGE_SIZE;

  sortScholarships();
  renderScholarships();
  updateResultCount();
}

/**
 * initFiltersListeners
 * Binds click events to the Apply and Reset filter buttons.
 * Called once on app init.
 */
function initFiltersListeners() {
  document.getElementById("btn-apply-filters").addEventListener("click", applyFilters);
  document.getElementById("btn-reset-filters").addEventListener("click", resetFilters);
}
