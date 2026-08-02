/* ==========================================================================
   certificates.js
   Rendering, search/filter, and accordion behavior for certificates.html.
   Reads content from the certificates data file [see certificates-data.js]
   ========================================================================== */

(function () {
  'use strict';

  const { CATEGORY, CERTS } = window.CERTIFICATE_DATA;

  /* DOM references */
  const archiveRoot = document.getElementById('archive-root');
  const resultCountEl = document.getElementById('result-count');
  const searchInput = document.getElementById('search');
  const searchBox = document.querySelector('.search-box');
  const searchClearBtn = document.getElementById('search-clear');
  const openAllBtn = document.getElementById('open-all');
  const closeAllBtn = document.getElementById('close-all');

  /* State */
  let openCategories = new Set();

  /* Returns certificates whose name, institution, category, date
      or year contain the given term */
  function getFilteredCerts(term) {
    if (!term) return CERTS.slice();
    return CERTS.filter(cert =>
      cert.name.toLowerCase().includes(term) ||
      cert.institution.toLowerCase().includes(term) ||
      cert.category.toLowerCase().includes(term) ||
      cert.date.toLowerCase().includes(term) ||
      String(cert.year).includes(term)
    );
  }

  function getSearchTerm() {
    return searchInput.value.trim().toLowerCase();
  }

  function groupByCategory(certs) {
    const groups = {};
    certs.forEach(cert => {
      if (!groups[cert.category]) groups[cert.category] = [];
      groups[cert.category].push(cert);
    });
    return groups;
  }

  function sortCategoryKeys(keys) {
    return keys.sort((a, b) => CATEGORY.indexOf(a) - CATEGORY.indexOf(b));
  }

  /** Wraps the first match of `term` inside `text` in a highlight span. */
  function highlight(text, term) {
    if (!term) return text;
    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + term.length);
    const after = text.slice(index + term.length);
    return `${before}<mark class="cert-highlight">${match}</mark>${after}`;
  }

  /* Rendering */

  function buildEmptyState() {
    const empty = document.createElement('div');
    empty.className = 'empty-state show';
    empty.innerHTML = '<h3>No matches</h3><p>Try a different name, institution, or year.</p>';
    return empty;
  }

  function buildCertRow(cert, term) {
    const row = document.createElement('div');
    row.className = 'cert-row';
    row.innerHTML = `
      <span class="cert-row-left">
        <span class="cert-title">${highlight(cert.name, term)}</span>
        <span class="cert-meta">${highlight(cert.institution, term)} — ${highlight(cert.date, term)}</span>
      </span>
    `;
    return row;
  }

  function buildGroup(category, certs, term) {
    const isOpen = openCategories.has(category);

    const group = document.createElement('div');
    group.className = 'group' + (isOpen ? ' open' : '');

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'group-trigger';
    trigger.innerHTML = `
      <span class="group-trigger-left">
        <span class="group-name">${category}</span>
        <span class="group-count">${certs.length} ${certs.length === 1 ? 'certificate' : 'certificates'}</span>
      </span>
      <span class="group-icon" aria-hidden="true"></span>
    `;

    const panel = document.createElement('div');
    panel.className = 'group-panel';

    const panelInner = document.createElement('div');
    panelInner.className = 'group-panel-inner';

    const sortedCerts = certs
      .slice()
      .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));

    sortedCerts.forEach(cert => {
      panelInner.appendChild(buildCertRow(cert, term));
    });

    panel.appendChild(panelInner);

    trigger.addEventListener('click', () => {
      const nowOpen = group.classList.toggle('open');
      if (nowOpen) {
        openCategories.add(category);
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        openCategories.delete(category);
        panel.style.maxHeight = '0px';
      }
    });

    group.appendChild(trigger);
    group.appendChild(panel);

    if (isOpen) {
      requestAnimationFrame(() => {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
    }

    return group;
  }

  /** Rebuilds the archive list for the current search term / open state. */
  function renderArchive() {
    const term = getSearchTerm();
    const filtered = getFilteredCerts(term);

    archiveRoot.innerHTML = '';
    resultCountEl.textContent =
      `${filtered.length} ${filtered.length === 1 ? 'certificate' : 'certificates'}`;

    if (!filtered.length) {
      archiveRoot.appendChild(buildEmptyState());
      return;
    }

    const groups = groupByCategory(filtered);
    sortCategoryKeys(Object.keys(groups)).forEach(category => {
      archiveRoot.appendChild(buildGroup(category, groups[category], term));
    });
  }

  /** Re-renders with a brief height transition, so the list doesn't jump. */
  function renderArchiveAnimated() {
    const startHeight = archiveRoot.offsetHeight;
    archiveRoot.style.height = startHeight + 'px';
    archiveRoot.style.overflow = 'hidden';
    archiveRoot.style.transition = 'none';

    renderArchive();

    const endHeight = archiveRoot.scrollHeight;
    requestAnimationFrame(() => {
      archiveRoot.style.transition = 'height .2s ease';
      archiveRoot.style.height = endHeight + 'px';
    });

    clearTimeout(renderArchiveAnimated.timeoutId);
    renderArchiveAnimated.timeoutId = setTimeout(() => {
      archiveRoot.style.height = '';
      archiveRoot.style.overflow = '';
      archiveRoot.style.transition = '';
    }, 220);
  }

  /* Event wiring */

  searchInput.addEventListener('input', () => {
    searchBox.classList.toggle('has-value', searchInput.value.length > 0);

    const term = getSearchTerm();
    openCategories = term
      ? new Set(getFilteredCerts(term).map(cert => cert.category))
      : new Set();

    renderArchiveAnimated();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchBox.classList.remove('has-value');
    openCategories = new Set();
    searchInput.focus();
    renderArchiveAnimated();
  });

  openAllBtn.addEventListener('click', () => {
    const term = getSearchTerm();
    openCategories = new Set(getFilteredCerts(term).map(cert => cert.category));
    renderArchiveAnimated();
  });

  closeAllBtn.addEventListener('click', () => {
    openCategories = new Set();
    renderArchiveAnimated();
  });

  renderArchive();
})();
