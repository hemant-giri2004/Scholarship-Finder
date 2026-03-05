/**
 * components/modal.js
 * ────────────────────
 * Handles the "View Details" modal popup.
 * Populates modal fields from a scholarship object and
 * manages open/close state with smooth CSS transitions.
 */

/**
 * openModal
 * Finds the scholarship by ID, populates all modal fields, and shows the overlay.
 * @param {number} scholarshipId
 */
function openModal(scholarshipId) {
  const scholarship = AppState.all.find((s) => s.id === scholarshipId);
  if (!scholarship) {
    console.warn(`[Modal] Scholarship ID ${scholarshipId} not found.`);
    return;
  }

  const { name, country, amount, fundingType, stream, level, deadline, description } = scholarship;

  // Populate modal fields
  document.getElementById("modal-flag").textContent = getFlag(country);
  document.getElementById("modal-title").textContent = name;
  document.getElementById("modal-amount").textContent = formatAmount(amount);
  document.getElementById("modal-country").textContent = `${getFlag(country)} ${country}`;
  document.getElementById("modal-level").textContent = level;
  document.getElementById("modal-stream").textContent = stream;
  document.getElementById("modal-funding").innerHTML = `<span class="funding-badge ${getFundingBadgeClass(fundingType)}">${fundingType}</span>`;
  document.getElementById("modal-deadline").innerHTML = buildDeadlineHTML(deadline);
  document.getElementById("modal-status").textContent = isPast(deadline) ? "❌ Closed" : "✅ Open";
  document.getElementById("modal-description").textContent = description;

  // Show overlay
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

/**
 * closeModal
 * Hides the modal overlay and restores body scroll.
 */
function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

/**
 * buildDeadlineHTML
 * Returns formatted deadline HTML with urgency styling if needed.
 * @param {string} isoDate
 * @returns {string}
 */
function buildDeadlineHTML(isoDate) {
  const urgent = isUrgent(isoDate);
  const past = isPast(isoDate);
  const cls = past ? "deadline-past" : urgent ? "deadline-urgent" : "";
  const prefix = past ? "Closed · " : urgent ? "⚡ " : "";
  return `<span class="${cls}">${prefix}${formatDeadline(isoDate)}</span>`;
}

/**
 * initModalListeners
 * Binds close events: X button, overlay backdrop click, and Escape key.
 * Called once on app init.
 */
function initModalListeners() {
  // Close button (×)
  document.getElementById("modal-close-btn").addEventListener("click", closeModal);

  // Click outside modal box closes it
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal-overlay")) {
      closeModal();
    }
  });

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
