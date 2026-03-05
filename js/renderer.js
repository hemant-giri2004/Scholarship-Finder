/**
 * js/renderer.js
 * ───────────────
 * All DOM rendering logic lives here.
 * Reads from AppState and writes to the DOM.
 * Functions: renderScholarships(), renderStats(), updateResultCount(), setView()
 */

/* ─────────────────────────────────────────
   STATS BAR
───────────────────────────────────────── */

/**
 * renderStats
 * Calculates and displays summary statistics from the full dataset.
 */
function renderStats() {
  const all = AppState.all;

  document.getElementById("stat-total").textContent = all.length;
  document.getElementById("stat-full").textContent = all.filter((s) => s.fundingType === "Full").length;
  document.getElementById("stat-quarter").textContent = deadlinesThisQuarter(all);
  document.getElementById("stat-countries").textContent = getUniqueCountries(all);
}

/* ─────────────────────────────────────────
   RESULT COUNT
───────────────────────────────────────── */

/**
 * updateResultCount
 * Updates the "Showing X of Y" text above the grid.
 */
function updateResultCount() {
  const showing = Math.min(AppState.displayedCount, AppState.filtered.length);
  const total = AppState.filtered.length;
  document.getElementById("result-count").innerHTML =
    `Showing <strong>${showing}</strong> of <strong>${total}</strong> scholarships`;
}

/* ─────────────────────────────────────────
   CARDS VIEW
───────────────────────────────────────── */

/**
 * renderCardsView
 * Renders scholarship cards into the grid container.
 * Uses staggered animation delays for a polished entrance.
 */
function renderCardsView() {
  const grid = document.getElementById("cards-grid");
  const slice = AppState.filtered.slice(0, AppState.displayedCount);

  if (slice.length === 0) {
    grid.innerHTML = ""; // Empty state handled separately
    return;
  }

  grid.innerHTML = slice.map((s, i) => createCard(s, i * 60)).join("");

  // Delegate click events for "View Details" buttons
  grid.querySelectorAll(".btn-details").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute("data-id"));
      openModal(id);
    });
  });

  // Clicking the whole card also opens modal
  grid.querySelectorAll(".scholarship-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = parseInt(card.getAttribute("data-id"));
      openModal(id);
    });
  });
}

/* ─────────────────────────────────────────
   TABLE VIEW
───────────────────────────────────────── */

/**
 * renderTableView
 * Renders scholarships as rows in the table body.
 */
function renderTableView() {
  const tbody = document.getElementById("table-body");
  const slice = AppState.filtered.slice(0, AppState.displayedCount);

  if (slice.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:2rem;color:#999;">No scholarships found.</td></tr>`;
    return;
  }

  tbody.innerHTML = slice
    .map(
      (s) => `
      <tr>
        <td>${getFlag(s.country)} ${s.country}</td>
        <td class="table-name">${s.name}</td>
        <td>${s.stream}</td>
        <td><span class="meta-chip">${s.level}</span></td>
        <td class="table-amount">${formatAmount(s.amount)}</td>
        <td><span class="funding-badge ${getFundingBadgeClass(s.fundingType)}">${s.fundingType}</span></td>
        <td class="${isUrgent(s.deadline) ? "deadline-urgent" : isPast(s.deadline) ? "deadline-past" : ""}">${formatDeadline(s.deadline)}</td>
        <td>
          <button class="btn-details btn-details-sm" data-id="${s.id}">Details</button>
        </td>
      </tr>
    `
    )
    .join("");

  // Bind table detail buttons
  tbody.querySelectorAll(".btn-details").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      openModal(id);
    });
  });
}

/* ─────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────── */

/**
 * toggleEmptyState
 * Shows or hides the empty state message.
 * @param {boolean} show
 */
function toggleEmptyState(show) {
  document.getElementById("empty-state").style.display = show ? "block" : "none";

  // When hiding the empty state, restore exactly ONE view based on currentView.
  // Never fall back to "" (empty string) — that lets the CSS default re-enable both panels.
  if (show) {
    // Empty state visible → hide both content panels
    document.getElementById("cards-grid").style.display = "none";
    document.getElementById("table-view").style.display = "none";
  } else {
    // Content visible → show only the active view, explicitly hide the other
    document.getElementById("cards-grid").style.display =
      AppState.currentView === "cards" ? "grid" : "none";
    document.getElementById("table-view").style.display =
      AppState.currentView === "table" ? "block" : "none";
  }
}

/* ─────────────────────────────────────────
   LOAD MORE BUTTON
───────────────────────────────────────── */

/**
 * updateLoadMoreBtn
 * Shows "Load More" only when there are hidden results.
 */
function updateLoadMoreBtn() {
  const btn = document.getElementById("btn-load-more");
  btn.style.display =
    AppState.displayedCount >= AppState.filtered.length ? "none" : "inline-block";
}

/* ─────────────────────────────────────────
   MAIN RENDER
───────────────────────────────────────── */

/**
 * renderScholarships
 * Main render call: decides which view to use, renders it, and updates UI controls.
 */
function renderScholarships() {
  const isEmpty = AppState.filtered.length === 0;
  toggleEmptyState(isEmpty);

  if (!isEmpty) {
    if (AppState.currentView === "cards") {
      renderCardsView();
    } else {
      renderTableView();
    }
  }

  updateLoadMoreBtn();
  updateResultCount();
}

/* ─────────────────────────────────────────
   VIEW MODE TOGGLE
───────────────────────────────────────── */

/**
 * setView
 * Switches between 'cards' and 'table' view modes.
 * @param {'cards'|'table'} viewName
 */
function setView(viewName) {
  AppState.currentView = viewName;

  // Toggle grid / table visibility
  document.getElementById("cards-grid").style.display = viewName === "cards" ? "grid" : "none";
  document.getElementById("table-view").style.display = viewName === "table" ? "block" : "none";

  // Toggle active button styles
  document.getElementById("btn-view-cards").classList.toggle("active", viewName === "cards");
  document.getElementById("btn-view-table").classList.toggle("active", viewName === "table");

  // Re-render for the new view
  renderScholarships();
}
