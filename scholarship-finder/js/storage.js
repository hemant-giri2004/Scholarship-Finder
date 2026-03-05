/**
 * js/storage.js
 * ─────────────
 * Handles all localStorage operations for the scholarship data.
 * On first visit, seeds storage with dummy data.
 * Exports: initStorage(), getScholarships(), saveScholarships()
 */

const STORAGE_KEY = "scholarships_v1";

/**
 * initStorage
 * If localStorage has no data yet, seed it from DUMMY_SCHOLARSHIPS.
 * Otherwise, load existing data as-is.
 */
function initStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    // First visit — seed dummy data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_SCHOLARSHIPS));
    console.log(
      `[Storage] Seeded ${DUMMY_SCHOLARSHIPS.length} dummy scholarships into localStorage.`
    );
  } else {
    console.log(`[Storage] Loaded scholarships from localStorage.`);
  }
}

/**
 * getScholarships
 * Returns the full array of scholarships from localStorage.
 * @returns {Array}
 */
function getScholarships() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * saveScholarships
 * Persists an updated array back to localStorage.
 * @param {Array} data
 */
function saveScholarships(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
