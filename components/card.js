/**
 * components/card.js
 * ───────────────────
 * Builds one scholarship card HTML string.
 * Card design matches GradPilots-style UI:
 *   - Flag + Title + Bookmark button (top row)
 *   - Colored icon + Amount or "Full Funding" text
 *   - Calendar icon + Deadline
 *   - Small meta chips (stream, level)
 *   - Full-width blue "View Details" button
 */

/**
 * getAmountIcon
 * Returns a small colored square icon for the card value row.
 * Uses fundingType to pick the right color class.
 * @param {string} fundingType
 * @param {number} amount
 * @returns {string} HTML
 */
function getAmountIcon(fundingType) {
  const iconMap = {
    Full:    { cls: "icon-full",    label: "✓"  },
    Partial: { cls: "icon-partial", label: "$"  },
    Merit:   { cls: "icon-merit",   label: "★"  },
    Need:    { cls: "icon-need",    label: "♥"  },
  };
  const icon = iconMap[fundingType] || { cls: "icon-usd", label: "$" };
  return `<div class="card-amount-icon ${icon.cls}">${icon.label}</div>`;
}

/**
 * createCard
 * Builds HTML for a single scholarship card.
 * @param {Object} scholarship - Full scholarship data object
 * @param {number} animDelay   - CSS animation-delay in ms (staggered load)
 * @returns {string} HTML string
 */
function createCard(scholarship, animDelay = 0) {
  const { id, name, country, amount, fundingType, stream, level, deadline } = scholarship;

  const urgent  = isUrgent(deadline);
  const past    = isPast(deadline);
  const deadlineCls = past ? "deadline-past" : urgent ? "deadline-urgent" : "deadline-normal";
  const deadlinePrefix = past ? "Closed · " : urgent ? "⚡ " : "Deadline: ";

  // Show "Full Funding" text instead of dollar amount for Full type
  const valueHtml = fundingType === "Full"
    ? `<span class="card-funding-text">Full Funding</span>`
    : `<span class="card-amount">${formatAmount(amount)}</span>`;

  return `
    <article
      class="scholarship-card"
      style="animation-delay: ${animDelay}ms"
      data-id="${id}"
      role="listitem"
      aria-label="${name}"
    >
      <!-- ── Row 1: Flag + Name + Bookmark ── -->
      <div class="card-top">
        <div class="card-top-left">
          <span class="card-flag" aria-label="${country} flag">${getFlag(country)}</span>
          <h3 class="card-title">${name}</h3>
        </div>
        <button
          class="card-bookmark"
          aria-label="Save ${name}"
          onclick="event.stopPropagation()"
          title="Save scholarship"
        >
          <!-- Shopping cart / save icon -->
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </div>

      <!-- ── Row 2: Funding amount or "Full Funding" ── -->
      <div class="card-value-row">
        ${getAmountIcon(fundingType)}
        ${valueHtml}
      </div>

      <!-- ── Row 3: Deadline ── -->
      <div class="card-deadline ${deadlineCls}">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        ${deadlinePrefix}${formatDeadline(deadline)}
      </div>

      <!-- ── Row 4: Meta chips ── -->
      <div class="card-meta">
        <span class="meta-chip">${stream}</span>
        <span class="meta-chip">${level}</span>
        <span class="meta-chip">${country}</span>
      </div>

      <!-- ── Row 5: View Details button ── -->
      <button
        class="btn-details"
        data-id="${id}"
        aria-label="View details for ${name}"
        onclick="event.stopPropagation()"
      >
        View Details
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </article>
  `;
}
