(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const symbolCards = document.querySelectorAll('.symbol-card');
  const modal = document.getElementById('symbolModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalList = document.getElementById('modalList');
  const captainTrigger = document.querySelectorAll('.captain-trigger, .dashboard-trigger');
  const captainModal = document.getElementById('captainModal');
  const captainClose = document.getElementById('captainClose');
  const captainForm = document.getElementById('captainForm');
  const captainEmail = document.getElementById('captainEmail');
  const captainPassword = document.getElementById('captainPassword');
  const captainCompany = document.getElementById('captainCompany');
  const captainNotice = document.getElementById('captainNotice');
  const authTabs = document.querySelectorAll('.auth-tab');
  const dashboardModal = document.getElementById('dashboardModal');
  const dashboardClose = document.getElementById('dashboardClose');
  const dashboardGrid = document.querySelector('#dashboardModal .dashboard-grid, #captainDashboardGrid');
  const commanderDashboardGrid = document.querySelector('#commanderDashboardModal .dashboard-grid, #commanderDashboardGrid');
  const divisionTotalMembers = document.getElementById('divisionTotalMembers');
  const divisionTotalOfficers = document.getElementById('divisionTotalOfficers');
  const homeTotalMembers = document.getElementById('homeTotalMembers');
  const homeTotalOfficers = document.getElementById('homeTotalOfficers');
  const dashboardForm = document.getElementById('dashboardForm');
  const commanderDashboardForm = document.getElementById('commanderDashboardForm');
  const commanderModal = document.getElementById('commanderModal');
  const commanderClose = document.getElementById('commanderClose');
  const commanderDashboardModal = document.getElementById('commanderDashboardModal');
  const commanderForm = document.getElementById('commanderForm');
  const commanderEmail = document.getElementById('commanderEmail');
  const commanderPassword = document.getElementById('commanderPassword');
  const commanderNotice = document.getElementById('commanderNotice');
  const commanderDashboardClose = document.getElementById('commanderDashboardClose');
  const excoDashboardModal = document.getElementById('excoDashboardModal');
  const excoDashboardClose = document.getElementById('excoDashboardClose');
  const excoDashboardGrid = document.querySelector('#excoDashboardModal .dashboard-grid, #excoDashboardGrid');
  const excoDashboardForm = document.getElementById('excoDashboardForm');
  const openExcoDashboardBtn = document.getElementById('openExcoDashboardBtn');
  const commanderTrigger = document.querySelectorAll('.commander-trigger');
  const excoTrigger = document.querySelectorAll('.exco-trigger');
  const companyCards = document.querySelectorAll('.company-card');
  const form = document.getElementById('enlistmentForm');
  const formSuccess = document.getElementById('formSuccess');
  const fillAnother = document.getElementById('fillAnother');
  const galleryFilters = document.querySelectorAll('.filter-btn');
  const galleryGrid = document.querySelector('.gallery-grid');
  const galleryModal = document.getElementById('galleryModal');
  const galleryClose = document.getElementById('galleryClose');
  const galleryBackdrop = galleryModal?.querySelector('.modal-backdrop');
  const galleryPreviewImage = document.getElementById('galleryPreviewImage');
  const galleryPreviewTitle = document.getElementById('galleryPreviewTitle');
  const galleryPreviewDescription = document.getElementById('galleryPreviewDescription');
  const galleryPreviewCategory = document.getElementById('galleryPreviewCategory');

  const excoRoleDefinitions = [
    { key: 'general-secretary', label: 'General Secretary' },
    { key: 'assistant-secretary', label: 'Assistant Secretary' },
    { key: 'financial-secretary', label: 'Financial Secretary' },
    { key: 'treasurer', label: 'Treasurer' }
  ];

  const defaultCompanyData = {
    1: { name: 'Ikorodu Akiling Company', active: [], inactive: [], officers: [] },
    2: { name: '17th Akiling Company', active: [], inactive: [], officers: [] },
    3: { name: '28th Akiling Company', active: [], inactive: [], officers: [] },
    4: { name: 'Command Akiling Company', active: [], inactive: [], officers: [] },
    5: { name: 'Ipaja Akiling Company', active: [], inactive: [], officers: [] },
    6: { name: 'Ijaba Akiling Company', active: [], inactive: [], officers: [] },
    7: { name: '8th Akiling Company', active: [], inactive: [], officers: [] },
    8: { name: 'Mainland Akiling Company', active: [], inactive: [], officers: [] },
    9: { name: 'Lekki Akiling Company', active: [], inactive: [], officers: [] }
  };

  function readStoredJson(primaryKey, fallbackKey) {
    const primaryValue = localStorage.getItem(primaryKey);
    if (primaryValue) {
      try {
        return JSON.parse(primaryValue);
      } catch (error) {
        console.warn(`Could not parse ${primaryKey}.`, error);
      }
    }

    if (fallbackKey) {
      const fallbackValue = localStorage.getItem(fallbackKey);
      if (fallbackValue) {
        try {
          return JSON.parse(fallbackValue);
        } catch (error) {
          console.warn(`Could not parse ${fallbackKey}.`, error);
        }
      }
    }

    return null;
  }

  function normalizeAccountMap(rawData) {
    const parsed = {};
    if (!rawData || typeof rawData !== 'object') return parsed;

    if (Array.isArray(rawData)) {
      rawData.forEach((entry) => {
        if (!entry || typeof entry !== 'object') return;
        const emailKey = String(entry.email || entry.username || '').trim().toLowerCase();
        if (!emailKey) return;
        parsed[emailKey] = {
          ...entry,
          email: emailKey,
          password: entry.password || entry.pass || '',
          companyId: entry.companyId || entry.company || entry.company_id || ''
        };
      });
      return parsed;
    }

    Object.entries(rawData).forEach(([key, value]) => {
      if (!value || typeof value !== 'object') return;
      const emailKey = String(value.email || key || '').trim().toLowerCase();
      if (!emailKey) return;
      parsed[emailKey] = {
        ...value,
        email: emailKey,
        password: value.password || value.pass || '',
        companyId: value.companyId || value.company || value.company_id || ''
      };
    });

    return parsed;
  }

  const state = {
    companyData: JSON.parse(JSON.stringify(defaultCompanyData)),
    captainAccounts: normalizeAccountMap(readStoredJson('royalShepherdCaptains', 'royalShepherdCaptainAccounts')),
    commanderAccounts: normalizeAccountMap(readStoredJson('royalShepherdCommanderAccounts', 'royalShepherdCommanderAccount')),
    commanderVerificationCodes: readStoredJson('royalShepherdCommanderVerificationCodes', null) || {},
    captainRequests: readStoredJson('royalShepherdCaptainRequests', null) || {},
    commanderSettings: readStoredJson('royalShepherdCommanderSettings', null) || {},
    excoProfiles: readStoredJson('royalShepherdExcoProfiles', null) || {},
    divisionMembers: readStoredJson('royalShepherdDivisionMembers', null) || { active: [] },
    examScores: readStoredJson('royalShepherdExamScores', null) || {},
    activeExamYear: localStorage.getItem('royalShepherdActiveExamYear') || String(new Date().getFullYear()),
    activeCaptainCompany: null,
    galleryItems: []
  };

  const galleryData = window.galleryData || [];

  function ensureDefaultCommanderAccount() {
    const defaultEmail = 'commander@royalshepherd.com';
    const defaultPassword = 'royalshepherd2026';

    if (!state.commanderAccounts[defaultEmail]) {
      state.commanderAccounts[defaultEmail] = { password: defaultPassword, verified: true, email: defaultEmail };
      saveCommanderAccounts();
    }
  }

  function ensureLegacyCaptainAccounts() {
    const legacyEmails = ['captain@royalshepherd.com', 'admin@royalshepherd.com'];
    legacyEmails.forEach((email) => {
      if (!state.captainAccounts[email]) {
        state.captainAccounts[email] = { password: 'royalshepherd2026', companyId: '1', email, verified: true };
      }
    });
    saveCaptains();
  }

  function normalizeCompanyData(rawData) {
    const parsed = {};
    Object.entries(rawData || {}).forEach(([companyId, company]) => {
      if (company && typeof company === 'object') {
        parsed[companyId] = {
          name: company.name || defaultCompanyData[companyId]?.name || `Company ${companyId}`,
          active: Array.isArray(company.active) ? company.active : [],
          inactive: Array.isArray(company.inactive) ? company.inactive : [],
          officers: Array.isArray(company.officers) ? company.officers : []
        };
      }
    });
    return parsed;
  }

  async function loadCompaniesFromBackend() {
    try {
      const response = await fetch('http://127.0.0.1:8000/companies');
      if (!response.ok) return null;
      const data = await response.json();
      return normalizeCompanyData(data);
    } catch (error) {
      console.warn('Could not load backend company data.', error);
      return null;
    }
  }

  async function bootstrapCompanyData() {
    const backendData = await loadCompaniesFromBackend();
    if (backendData && Object.keys(backendData).length) {
      state.companyData = backendData;
    } else {
      const localData = JSON.parse(localStorage.getItem('royalShepherdCompanies') || 'null');
      if (localData && typeof localData === 'object') {
        state.companyData = normalizeCompanyData(localData);
      } else {
        state.companyData = JSON.parse(JSON.stringify(defaultCompanyData));
      }
    }
    await saveCompanies();
  }

  async function saveCompanies() {
    localStorage.setItem('royalShepherdCompanies', JSON.stringify(state.companyData));

    try {
      const payload = Object.entries(state.companyData).map(([companyId, company]) => ({
        companyId,
        name: company.name,
        active: company.active || [],
        inactive: company.inactive || [],
        officers: company.officers || []
      }));

      await fetch('http://127.0.0.1:8000/companies/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.warn('Backend unavailable, using local storage only.', error);
    }
  }

  function saveCaptains() {
    localStorage.setItem('royalShepherdCaptains', JSON.stringify(state.captainAccounts));
  }

  function saveCaptainRequests() {
    localStorage.setItem('royalShepherdCaptainRequests', JSON.stringify(state.captainRequests));
  }

  function saveCommanderAccounts() {
    localStorage.setItem('royalShepherdCommanderAccounts', JSON.stringify(state.commanderAccounts));
  }

  function saveCommanderVerificationCodes() {
    localStorage.setItem('royalShepherdCommanderVerificationCodes', JSON.stringify(state.commanderVerificationCodes));
  }

  function saveExcoProfiles() {
    localStorage.setItem('royalShepherdExcoProfiles', JSON.stringify(state.excoProfiles));
  }

  function saveDivisionMembers() {
    localStorage.setItem('royalShepherdDivisionMembers', JSON.stringify(state.divisionMembers));
  }

  function saveExamScores() {
    localStorage.setItem('royalShepherdExamScores', JSON.stringify(state.examScores));
    localStorage.setItem('royalShepherdActiveExamYear', state.activeExamYear || String(new Date().getFullYear()));
  }

  function openModal(id) {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;
    modalElement.classList.add('active');
    modalElement.setAttribute('aria-hidden', 'false');
  }

  function closeModal(id) {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;
    modalElement.classList.remove('active');
    modalElement.setAttribute('aria-hidden', 'true');
  }

  function closeAllModals() {
    closeModal('symbolModal');
    closeModal('captainModal');
    closeModal('dashboardModal');
    closeModal('commanderModal');
    closeModal('commanderDashboardModal');
    closeModal('excoDashboardModal');
    closeModal('galleryModal');
  }

  function bindMobileMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function bindSmoothScrolling() {
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        event.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');

        if (window.innerWidth <= 760) {
          navMenu?.classList.remove('open');
          menuToggle?.classList.remove('open');
          menuToggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function bindOpeners() {
    document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = trigger.getAttribute('data-open-modal');
        if (targetId) {
          openModal(targetId);
        }
      });
    });

    document.querySelectorAll('.captain-trigger, .dashboard-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const page = trigger.dataset.dashboardPage || 'captain-dashboard.html';
        if (window.location.pathname.includes('captain-dashboard.html')) {
          const url = new URL(window.location.href);
          url.searchParams.set('company', trigger.dataset.companyId || '');
          window.history.replaceState({}, '', url);
          return;
        }
        window.open(page, '_blank', 'noopener,noreferrer');
      });
    });

    document.querySelectorAll('.commander-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const page = trigger.dataset.dashboardPage || 'commander-dashboard.html';
        window.open(page, '_blank', 'noopener,noreferrer');
      });
    });

    document.querySelectorAll('.exco-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const page = trigger.dataset.dashboardPage || 'exco-dashboard.html';
        window.open(page, '_blank', 'noopener,noreferrer');
      });
    });
  }

  function bindAuthTabs() {
    authTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const authGroup = tab.closest('.auth-toggle');
        const form = tab.closest('.modal')?.querySelector('form')
          || tab.closest('.dashboard-page-card')?.querySelector('form')
          || tab.closest('section')?.querySelector('form')
          || tab.closest('form');
        if (!authGroup || !form) return;

        authGroup.querySelectorAll('.auth-tab').forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        form.dataset.mode = tab.dataset.mode || 'login';
        const notice = form.querySelector('.captain-notice');
        if (notice) notice.textContent = '';
      });
    });
  }

  function bindModalCloseButtons() {
    modalClose?.addEventListener('click', closeAllModals);
    modalBackdrops.forEach((backdrop) => {
      backdrop.addEventListener('click', closeAllModals);
    });
    captainClose?.addEventListener('click', () => closeModal('captainModal'));
    commanderClose?.addEventListener('click', () => closeModal('commanderModal'));
    commanderDashboardClose?.addEventListener('click', () => closeModal('commanderDashboardModal'));
    excoDashboardClose?.addEventListener('click', () => closeModal('excoDashboardModal'));
    dashboardClose?.addEventListener('click', () => closeModal('dashboardModal'));
    galleryClose?.addEventListener('click', () => closeModal('galleryModal'));
    galleryBackdrop?.addEventListener('click', () => closeModal('galleryModal'));
  }

  function bindEscapeKey() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  function bindSymbolCards() {
    symbolCards.forEach((card) => {
      card.addEventListener('click', () => {
        const title = card.dataset.title || 'Symbol Meaning';
        const items = JSON.parse(card.dataset.items || '[]');
        if (modalTitle && modalList) {
          modalTitle.textContent = title;
          modalList.innerHTML = '';
          items.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item;
            modalList.appendChild(li);
          });
          openModal('symbolModal');
        }
      });
    });
  }

  function resolveImagePath(src) {
    if (!src) return '';
    const normalized = String(src).trim().replace(/\\/g, '/');
    if (/^(https?:)?\/\//i.test(normalized) || normalized.startsWith('data:')) return normalized;
    if (normalized.startsWith('image/')) return normalized;
    return `image/${normalized}`;
  }

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    galleryData.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'gallery-item glass-card';
      article.dataset.category = item.category || 'parades';
      article.dataset.index = index;
      article.innerHTML = `
        <button type="button" class="gallery-thumb" aria-label="${item.title}">
          <img src="${resolveImagePath(item.src)}" alt="${item.title}" />
          <div class="gallery-overlay">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </button>
      `;
      galleryGrid.appendChild(article);
    });

    state.galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
    applyGalleryFilter('all');
  }

  function openGalleryPreview(item) {
    if (!item) return;
    if (galleryPreviewImage) {
      galleryPreviewImage.src = resolveImagePath(item.src);
      galleryPreviewImage.alt = item.title;
    }
    if (galleryPreviewTitle) {
      galleryPreviewTitle.textContent = item.title;
    }
    if (galleryPreviewDescription) {
      galleryPreviewDescription.textContent = item.description;
    }
    if (galleryPreviewCategory) {
      galleryPreviewCategory.textContent = (item.category || 'parades').charAt(0).toUpperCase() + (item.category || 'parades').slice(1);
    }
    openModal('galleryModal');
  }

  function applyGalleryFilter(filter) {
    galleryFilters.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });

    state.galleryItems.forEach((item) => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('is-hidden', !show);
    });
  }

  function bindGallery() {
    galleryGrid?.addEventListener('click', (event) => {
      const button = event.target.closest('.gallery-thumb');
      if (!button) return;
      const card = button.closest('.gallery-item');
      if (!card) return;
      const index = Number(card.dataset.index);
      if (!Number.isNaN(index)) {
        const item = galleryData[index];
        if (item) {
          openGalleryPreview(item);
        }
      }
    });

    galleryGrid?.addEventListener('keydown', (event) => {
      if (!['Enter', ' '].includes(event.key)) return;
      const button = event.target.closest('.gallery-thumb');
      if (!button) return;
      event.preventDefault();
      const card = button.closest('.gallery-item');
      if (!card) return;
      const index = Number(card.dataset.index);
      if (!Number.isNaN(index)) {
        const item = galleryData[index];
        if (item) {
          openGalleryPreview(item);
        }
      }
    });

    galleryFilters.forEach((button) => {
      button.addEventListener('click', () => applyGalleryFilter(button.dataset.filter));
    });
  }

  function parseTextareaLines(value) {
    return (value || '')
      .toString()
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const examGradeSections = [
    { key: 'intermediate1', label: 'Intermediate 1' },
    { key: 'intermediate2', label: 'Intermediate 2' },
    { key: 'senior1', label: 'Senior 1' },
    { key: 'senior2', label: 'Senior 2' },
    { key: 'seniorAdvance', label: 'Senior Advance' },
    { key: 'advancedJunior', label: 'Advanced Junior' }
  ];

  function parseScoreEntries(value) {
    return parseTextareaLines(value).map((line) => {
      const [namePart, scorePart] = line.split('|');
      const name = (namePart || '').trim();
      const score = (scorePart || '').trim();
      if (name && score) {
        return { name, score };
      }
      return { name: line, score: 'Pending' };
    });
  }

  function formatScoreEntries(items) {
    return (items || []).map((item) => `${item.name} | ${item.score}`);
  }

  function getExamYears() {
    return Object.keys(state.examScores || {})
      .filter((year) => /^\d+$/.test(year))
      .sort((a, b) => Number(b) - Number(a));
  }

  function getLatestExamYear() {
    return getExamYears()[0] || state.activeExamYear || String(new Date().getFullYear());
  }

  function getExamDataForCompany(companyId, year) {
    const data = state.examScores?.[year || getLatestExamYear()] || {};
    const companyData = data[String(companyId)] || {};
    return examGradeSections.reduce((accumulator, section) => {
      accumulator[section.key] = Array.isArray(companyData[section.key]) ? companyData[section.key] : [];
      return accumulator;
    }, {});
  }

  function renderDivisionSummary() {
    let totalMembers = 0;
    let totalOfficers = 0;
    const divisionActiveMembers = Array.isArray(state.divisionMembers?.active) ? state.divisionMembers.active : [];

    Object.values(state.companyData).forEach((company) => {
      totalMembers += (company.active || []).length + (company.inactive || []).length;
      totalOfficers += (company.officers || []).length;
    });

    totalMembers += divisionActiveMembers.length;

    if (divisionTotalMembers) {
      divisionTotalMembers.textContent = totalMembers;
    }
    if (divisionTotalOfficers) {
      divisionTotalOfficers.textContent = totalOfficers;
    }
    if (homeTotalMembers) {
      homeTotalMembers.textContent = totalMembers || '150+';
    }
    if (homeTotalOfficers) {
      homeTotalOfficers.textContent = totalOfficers || '15+';
    }
  }

  function renderCompanyLists() {
    companyCards.forEach((card) => {
      const companyId = card.dataset.company;
      const company = state.companyData[companyId] || defaultCompanyData[companyId];
      const title = card.querySelector('h3');
      const caption = card.querySelector('.company-caption');
      if (title) title.textContent = company.name;
      if (caption) caption.textContent = `Company ${companyId}`;

      card.querySelectorAll('.company-list').forEach((list) => {
        const type = list.dataset.list;
        const items = company[type] || [];
        list.innerHTML = '';
        items.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });
      });
    });

    renderDivisionSummary();
  }

  function buildCaptainDashboard(companyId) {
    if (!dashboardGrid) return;
    const company = state.companyData[companyId] || defaultCompanyData[companyId];
    const examYear = getLatestExamYear();
    const examData = getExamDataForCompany(companyId, examYear);
    dashboardGrid.innerHTML = '';

    const companyCard = document.createElement('div');
    companyCard.className = 'dashboard-card';
    companyCard.innerHTML = `
      <h4>${company.name}</h4>
      <label>
        <span>Company Name</span>
        <input type="text" name="company-name-${companyId}" value="${(company.name || '').replace(/"/g, '&quot;')}" readonly />
      </label>
      <label>
        <span>Active Members</span>
        <textarea name="active-${companyId}" placeholder="Add active members one per line" readonly>${(company.active || []).join('\n')}</textarea>
      </label>
      <label>
        <span>None Active Members</span>
        <textarea name="inactive-${companyId}" placeholder="Add inactive members one per line" readonly>${(company.inactive || []).join('\n')}</textarea>
      </label>
      <label>
        <span>Ranked Officers</span>
        <textarea name="officers-${companyId}" placeholder="Add officers one per line" readonly>${(company.officers || []).join('\n')}</textarea>
      </label>
    `;
    dashboardGrid.appendChild(companyCard);

    const scoreCard = document.createElement('div');
    scoreCard.className = 'dashboard-card';
    scoreCard.innerHTML = `
      <h4>ESTC Exam Results</h4>
      <p class="dashboard-intro">Scores posted by the admin for ${examYear} for your company only.</p>
      <div class="score-columns">
        ${examGradeSections.map((section) => `
          <div class="score-panel">
            <h5>${section.label}</h5>
            <ul class="score-list">
              ${(examData[section.key] || []).length ? (examData[section.key] || []).map((item) => `<li><strong>${(item.name || '').replace(/"/g, '&quot;')}</strong> — ${item.score}</li>`).join('') : '<li>No scores posted yet.</li>'}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
    dashboardGrid.appendChild(scoreCard);
  }

  function openCaptainDashboard(companyId) {
    state.activeCaptainCompany = companyId;
    buildCaptainDashboard(companyId);

    if (window.location.pathname.includes('captain-dashboard.html')) {
      const url = new URL(window.location.href);
      url.searchParams.set('company', companyId);
      window.history.replaceState({}, '', url);
      return;
    }

    const pageUrl = new URL('captain-dashboard.html', window.location.href);
    pageUrl.searchParams.set('company', companyId);
    window.open(pageUrl.toString(), '_blank', 'noopener,noreferrer');
  }

  function buildCommanderDashboard() {
    if (!commanderDashboardGrid) return;
    commanderDashboardGrid.innerHTML = '';

    const summaryCard = document.createElement('div');
    summaryCard.className = 'dashboard-card';
    summaryCard.innerHTML = `
      <h4>Division Setup</h4>
      <label>
        <span>ESTC Exam Year</span>
        <input type="number" name="exam-year" value="${(state.activeExamYear || getLatestExamYear()).replace(/"/g, '&quot;')}" />
      </label>
      <label>
        <span>Division Active Members</span>
        <textarea name="division-active-members" placeholder="Add division active members one per line">${(state.divisionMembers?.active || []).join('\n')}</textarea>
      </label>
    `;
    commanderDashboardGrid.appendChild(summaryCard);

    const requestCard = document.createElement('div');
    requestCard.className = 'dashboard-card';
    requestCard.innerHTML = `
      <h4>Pending Account Creation Requests</h4>
      <p class="dashboard-intro">Approve or deny captain creation requests submitted by members.</p>
      <div class="request-list"></div>
    `;
    commanderDashboardGrid.appendChild(requestCard);

    const requestList = requestCard.querySelector('.request-list');
    const pendingRequests = Object.entries(state.captainRequests).map(([email, request]) => ({
      email,
      request
    }));

    if (!pendingRequests.length) {
      requestList.innerHTML = '<p>No pending account creation requests.</p>';
    } else {
      pendingRequests.forEach(({ email, request }) => {
        const item = document.createElement('div');
        item.className = 'dashboard-card';
        item.innerHTML = `
          <h5>Captain Request: ${email}</h5>
          <p>Company ${request.companyId}</p>
          <p>Submitted: ${new Date(request.submittedAt).toLocaleString()}</p>
          <div class="request-actions">
            <button type="button" class="btn btn-gold request-action" data-request="approve" data-request-type="captain" data-email="${email}">Approve</button>
            <button type="button" class="btn btn-secondary request-action" data-request="deny" data-request-type="captain" data-email="${email}">Deny</button>
          </div>
        `;
        requestList.appendChild(item);
      });
    }

    Object.entries(state.companyData).forEach(([companyId, company]) => {
      const examData = getExamDataForCompany(companyId, state.activeExamYear || getLatestExamYear());
      const card = document.createElement('div');
      card.className = 'dashboard-card';
      card.innerHTML = `
        <h4>${company.name}</h4>
        <label>
          <span>Company Name</span>
          <input type="text" name="company-name-${companyId}" value="${(company.name || '').replace(/"/g, '&quot;')}" />
        </label>
        <label>
          <span>Active Members</span>
          <textarea name="active-${companyId}" placeholder="Add active members one per line">${(company.active || []).join('\n')}</textarea>
        </label>
        <label>
          <span>None Active Members</span>
          <textarea name="inactive-${companyId}" placeholder="Add inactive members one per line">${(company.inactive || []).join('\n')}</textarea>
        </label>
        <label>
          <span>Ranked Officers</span>
          <textarea name="officers-${companyId}" placeholder="Add officers one per line">${(company.officers || []).join('\n')}</textarea>
        </label>
        ${examGradeSections.map((section) => `
          <label>
            <span>${section.label} Scores</span>
            <textarea name="${section.key}-scores-${companyId}" placeholder="Name | Score per line">${formatScoreEntries(examData[section.key] || []).join('\n')}</textarea>
          </label>
        `).join('')}
      `;
      commanderDashboardGrid.appendChild(card);
    });
  }

  function openCommanderDashboard() {
    buildCommanderDashboard();

    if (window.location.pathname.includes('commander-dashboard.html')) {
      return;
    }

    window.open('commander-dashboard.html', '_blank', 'noopener,noreferrer');
  }

  function buildExcoDashboard() {
    if (!excoDashboardGrid) return;
    excoDashboardGrid.innerHTML = '';

    excoRoleDefinitions.forEach((role) => {
      const profile = state.excoProfiles[role.key] || {};
      const card = document.createElement('div');
      card.className = 'dashboard-card';
      card.innerHTML = `
        <h4>${role.label}</h4>
        <p class="dashboard-intro">Create or update the profile for ${role.label}.</p>
        <label>
          <span>Full Name</span>
          <input type="text" name="${role.key}-name" value="${(profile.name || '').replace(/"/g, '&quot;')}" />
        </label>
        <label>
          <span>Email Address</span>
          <input type="email" name="${role.key}-email" value="${(profile.email || '').replace(/"/g, '&quot;')}" />
        </label>
        <label>
          <span>Phone Number</span>
          <input type="tel" name="${role.key}-phone" value="${(profile.phone || '').replace(/"/g, '&quot;')}" />
        </label>
        <label>
          <span>Short Bio</span>
          <textarea name="${role.key}-bio">${(profile.bio || '').replace(/"/g, '&quot;')}</textarea>
        </label>
      `;
      excoDashboardGrid.appendChild(card);
    });
  }

  function openExcoDashboard() {
    buildExcoDashboard();

    if (window.location.pathname.includes('exco-dashboard.html')) {
      return;
    }

    window.open('exco-dashboard.html', '_blank', 'noopener,noreferrer');
  }

  function bindForms() {
    captainForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const mode = captainForm.dataset.mode || 'login';
      const email = captainEmail.value.trim().toLowerCase();
      const password = captainPassword.value.trim();
      const companyId = captainCompany.value;

      if (!email || !password || !companyId) {
        captainNotice.textContent = 'Please complete all required fields.';
        captainNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }

      if (mode === 'register') {
        if (state.captainAccounts[email]) {
          captainNotice.textContent = 'This email already has a captain account.';
          captainNotice.style.color = 'hsl(0, 70%, 60%)';
          return;
        }
        if (state.captainRequests[email]) {
          captainNotice.textContent = 'A request for this email is already pending approval.';
          captainNotice.style.color = 'hsl(0, 70%, 60%)';
          return;
        }

        state.captainAccounts[email] = { password, companyId, email, verified: true };
        saveCaptains();
        captainForm.reset();
        captainForm.dataset.mode = 'login';
        captainNotice.textContent = 'Captain account created successfully. You can now log in.';
        captainNotice.style.color = 'var(--gold-400)';
        return;
      }

      const account = state.captainAccounts[email];
      if (!account || account.password !== password) {
        captainNotice.textContent = 'Invalid captain email or password.';
        captainNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }
      if (account.companyId !== companyId) {
        captainNotice.textContent = 'This account is not assigned to the selected company.';
        captainNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }

      captainNotice.textContent = 'Access granted. Opening your company dashboard.';
      captainNotice.style.color = 'var(--gold-400)';
      closeModal('captainModal');
      openCaptainDashboard(companyId);
    });

    commanderForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const mode = commanderForm.dataset.mode || 'login';
      const email = commanderEmail.value.trim().toLowerCase();
      const password = commanderPassword.value.trim();

      if (!email || !password) {
        commanderNotice.textContent = 'Please enter your commander email and password.';
        commanderNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }

      const account = state.commanderAccounts[email];

      if (mode === 'register') {
        if (account) {
          commanderNotice.textContent = 'This email already has commander access.';
          commanderNotice.style.color = 'hsl(0, 70%, 60%)';
          return;
        }

        state.commanderAccounts[email] = { password, verified: true, email };
        saveCommanderAccounts();
        commanderNotice.textContent = `Admin account created for ${email}. Opening the admin dashboard.`;
        commanderNotice.style.color = 'var(--gold-400)';
        closeModal('commanderModal');
        openCommanderDashboard();
        return;
      }

      if (!account || account.password !== password) {
        commanderNotice.textContent = 'Invalid commander email or password.';
        commanderNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }

      if (!account.verified) {
        commanderNotice.textContent = 'Your commander account is not verified yet.';
        commanderNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }

      commanderNotice.textContent = 'Commander access granted. Opening the commander dashboard.';
      commanderNotice.style.color = 'var(--gold-400)';
      closeModal('commanderModal');
      openCommanderDashboard();
    });

    dashboardForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!state.activeCaptainCompany) return;

      const formData = new FormData(dashboardForm);
      const companyId = String(state.activeCaptainCompany);
      const active = (formData.get(`active-${companyId}`) || '')
        .toString()
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
      const inactive = (formData.get(`inactive-${companyId}`) || '')
        .toString()
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
      const officers = (formData.get(`officers-${companyId}`) || '')
        .toString()
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean);
      const name = (formData.get(`company-name-${companyId}`) || '')
        .toString()
        .trim() || state.companyData[companyId]?.name || `Company ${companyId}`;

      state.companyData[companyId] = { name, active, inactive, officers };
      saveCompanies();
      renderCompanyLists();
      closeModal('dashboardModal');
    });

    commanderDashboardForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(commanderDashboardForm);

      const divisionMembers = parseTextareaLines(formData.get('division-active-members'));
      state.divisionMembers = { active: divisionMembers };
      saveDivisionMembers();

      const examYear = (formData.get('exam-year') || '').toString().trim() || state.activeExamYear || String(new Date().getFullYear());
      state.activeExamYear = examYear;
      state.examScores[examYear] = state.examScores[examYear] || {};

      Object.keys(state.companyData).forEach((companyId) => {
        const active = parseTextareaLines(formData.get(`active-${companyId}`));
        const inactive = parseTextareaLines(formData.get(`inactive-${companyId}`));
        const officers = parseTextareaLines(formData.get(`officers-${companyId}`));
        const name = (formData.get(`company-name-${companyId}`) || '')
          .toString()
          .trim() || state.companyData[companyId]?.name || `Company ${companyId}`;

        const scoreSections = examGradeSections.reduce((accumulator, section) => {
          accumulator[section.key] = parseScoreEntries(formData.get(`${section.key}-scores-${companyId}`));
          return accumulator;
        }, {});

        state.companyData[companyId] = { name, active, inactive, officers };
        state.examScores[examYear][companyId] = scoreSections;
      });

      saveCompanies();
      saveExamScores();
      renderCompanyLists();
      closeModal('commanderDashboardModal');
    });

    excoDashboardForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(excoDashboardForm);

      excoRoleDefinitions.forEach((role) => {
        const name = (formData.get(`${role.key}-name`) || '').toString().trim();
        const email = (formData.get(`${role.key}-email`) || '').toString().trim();
        const phone = (formData.get(`${role.key}-phone`) || '').toString().trim();
        const bio = (formData.get(`${role.key}-bio`) || '').toString().trim();

        if (name || email || phone || bio) {
          state.excoProfiles[role.key] = { role: role.label, name, email, phone, bio };
        } else {
          delete state.excoProfiles[role.key];
        }
      });

      saveExcoProfiles();
      closeModal('excoDashboardModal');
    });

    openExcoDashboardBtn?.addEventListener('click', (event) => {
      event.preventDefault();
      openExcoDashboard();
    });

    commanderDashboardGrid?.addEventListener('click', (event) => {
      const actionButton = event.target.closest('.request-action');
      if (!actionButton) return;

      const requestType = actionButton.dataset.requestType;
      const email = actionButton.dataset.email;
      const requestAction = actionButton.dataset.request;
      if (!requestType || !email || !requestAction) return;

      if (requestType === 'captain') {
        if (requestAction === 'approve') {
          const request = state.captainRequests[email];
          if (request) {
            state.captainAccounts[email] = { password: request.password, companyId: request.companyId };
            delete state.captainRequests[email];
            saveCaptains();
            saveCaptainRequests();
          }
        } else if (requestAction === 'deny') {
          delete state.captainRequests[email];
          saveCaptainRequests();
        }
      }

      buildCommanderDashboard();
    });

    form?.addEventListener('submit', (event) => {
      event.preventDefault();

      const requiredFields = Array.from(form.querySelectorAll('[required]'));
      let valid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'hsl(0, 70%, 60%)';
        } else {
          field.style.borderColor = '';
        }
      });

      const emailField = form.querySelector('input[type="email"]');
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField?.value || '');
      if (emailField && !emailValid) {
        valid = false;
        emailField.style.borderColor = 'hsl(0, 70%, 60%)';
      }

      if (!valid) return;

      form.style.display = 'none';
      formSuccess?.classList.add('active');
      formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    fillAnother?.addEventListener('click', () => {
      form.reset();
      form.style.display = '';
      formSuccess?.classList.remove('active');
    });
  }

  function init() {
    window.addEventListener('scroll', () => {
      header?.classList.toggle('scrolled', window.scrollY > 50);
    });

    bindMobileMenu();
    bindSmoothScrolling();
    bindOpeners();
    bindAuthTabs();
    bindModalCloseButtons();
    bindEscapeKey();
    bindSymbolCards();
    bindGallery();
    bindForms();
    ensureDefaultCommanderAccount();
    ensureLegacyCaptainAccounts();
    bootstrapCompanyData().then(() => {
      renderCompanyLists();
    });
    renderGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

