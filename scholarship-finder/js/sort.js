/**
 * js/sort.js
 * ───────────
 * Sorting logic for the scholarship list.
 * Reads AppState.sortBy and sorts AppState.filtered in-place.
 */

/**
 * sortScholarships
 * Sorts AppState.filtered according to the current AppState.sortBy value.
 * Mutates AppState.filtered directly (no return value).
 */
function sortScholarships() {
  const sortBy = AppState.sortBy;

  switch (sortBy) {
    case "amount-desc":
      // Highest amount first
      AppState.filtered.sort((a, b) => b.amount - a.amount);
      break;

    case "amount-asc":
      // Lowest amount first
      AppState.filtered.sort((a, b) => a.amount - b.amount);
      break;

    case "deadline-asc":
      // Earliest deadline first
      AppState.filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      break;

    case "relevance":
    default:
      // Default: original insertion order (by id)
      AppState.filtered.sort((a, b) => a.id - b.id);
      break;
  }
}

/**
 * initSortListener
 * Binds the sort dropdown change event.
 * Called once on app init.
 */
function initSortListener() {
  document.getElementById("sort-select").addEventListener("change", (e) => {
    AppState.sortBy = e.target.value;
    AppState.displayedCount = AppState.PAGE_SIZE; // Reset pagination on sort change
    sortScholarships();
    renderScholarships();
  });
}
