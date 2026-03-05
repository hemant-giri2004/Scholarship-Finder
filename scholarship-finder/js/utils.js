/**
 * js/utils.js
 * ────────────
 * Pure helper functions used across components.
 * No DOM manipulation here — only data/string utilities.
 */

/** Country → emoji flag map */
const COUNTRY_FLAGS = {
  USA: "🇺🇸",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Australia: "🇦🇺",
  Japan: "🇯🇵",
};

/**
 * getFlag
 * Returns the emoji flag for a given country name.
 * @param {string} country
 * @returns {string}
 */
function getFlag(country) {
  return COUNTRY_FLAGS[country] || "🌍";
}

/**
 * formatDeadline
 * Converts an ISO date string to a human-readable format.
 * e.g. "2026-10-14" → "Oct 14, 2026"
 * @param {string} isoDate
 * @returns {string}
 */
function formatDeadline(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * isUrgent
 * Returns true if the deadline is within the next 30 days (and not past).
 * @param {string} isoDate
 * @returns {boolean}
 */
function isUrgent(isoDate) {
  const d = new Date(isoDate);
  const now = new Date();
  const diffDays = (d - now) / (1000 * 60 * 60 * 24);
  return diffDays > 0 && diffDays < 30;
}

/**
 * isPast
 * Returns true if the deadline has already passed.
 * @param {string} isoDate
 * @returns {boolean}
 */
function isPast(isoDate) {
  return new Date(isoDate) < new Date();
}

/**
 * getFundingBadgeClass
 * Returns the CSS class name for a funding type badge.
 * @param {string} type  "Full" | "Partial" | "Merit" | "Need"
 * @returns {string}
 */
function getFundingBadgeClass(type) {
  const map = {
    Full: "badge-full",
    Partial: "badge-partial",
    Merit: "badge-merit",
    Need: "badge-need",
  };
  return map[type] || "badge-partial";
}

/**
 * formatAmount
 * Formats a numeric amount to a dollar string.
 * e.g. 50000 → "$50,000"
 * @param {number} amount
 * @returns {string}
 */
function formatAmount(amount) {
  return "$" + amount.toLocaleString("en-US");
}

/**
 * deadlinesThisQuarter
 * Given an array of scholarships, returns how many have deadlines
 * within the current calendar quarter.
 * @param {Array} scholarships
 * @returns {number}
 */
function deadlinesThisQuarter(scholarships) {
  const now = new Date();
  const qStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
  const qEnd = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0);
  return scholarships.filter((s) => {
    const d = new Date(s.deadline);
    return d >= qStart && d <= qEnd;
  }).length;
}

/**
 * getUniqueCountries
 * Returns the number of unique countries in the dataset.
 * @param {Array} scholarships
 * @returns {number}
 */
function getUniqueCountries(scholarships) {
  return new Set(scholarships.map((s) => s.country)).size;
}
