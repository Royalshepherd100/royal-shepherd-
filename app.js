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
  const dashboardGrid = document.querySelector('#dashboardModal .dashboard-grid');
  const commanderDashboardGrid = document.querySelector('#commanderDashboardModal .dashboard-grid');
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
  const excoDashboardGrid = document.querySelector('#excoDashboardModal .dashboard-grid');
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
    { key: 'pro', label: 'PRO' },
    { key: 'assistant-secretary', label: 'Assistant Secretary' },
    { key: 'band-master', label: 'Band Master' },
    { key: 'assistant-band-master', label: 'Assistant Band Master' },
    { key: 'treasurer', label: 'Treasurer' }
  ];

  const defaultCompanyData = {
    1: { name: 'Company 1', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    2: { name: 'Company 2', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    3: { name: 'Company 3', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    4: { name: 'Company 4', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    5: { name: 'Company 5', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    6: { name: 'Company 6', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    7: { name: 'Company 7', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    8: { name: 'Company 8', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] },
    9: { name: 'Company 9', active: ['Enter names here'], inactive: ['Enter names here'], officers: ['Rank & Section'] }
  };

  const state = {
    companyData: JSON.parse(localStorage.getItem('royalShepherdCompanies') || 'null') || defaultCompanyData,
    captainAccounts: JSON.parse(localStorage.getItem('royalShepherdCaptains') || 'null') || {},
    commanderAccounts: JSON.parse(localStorage.getItem('royalShepherdCommanderAccounts') || 'null') || {},
    commanderVerificationCodes: JSON.parse(localStorage.getItem('royalShepherdCommanderVerificationCodes') || 'null') || {},
    captainRequests: JSON.parse(localStorage.getItem('royalShepherdCaptainRequests') || 'null') || {},
    commanderSettings: JSON.parse(localStorage.getItem('royalShepherdCommanderSettings') || 'null') || {},
    excoProfiles: JSON.parse(localStorage.getItem('royalShepherdExcoProfiles') || 'null') || {},
    activeCaptainCompany: null,
    galleryItems: []
  };

  const galleryData = window.galleryData || [];

  function saveCompanies() {
    localStorage.setItem('royalShepherdCompanies', JSON.stringify(state.companyData));
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
      trigger.addEventListener('click', () => openModal('captainModal'));
    });

    document.querySelectorAll('.commander-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => openModal('commanderModal'));
    });

    document.querySelectorAll('.exco-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => openExcoDashboard());
    });
  }

  function bindAuthTabs() {
    authTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const authGroup = tab.closest('.auth-toggle');
        const form = tab.closest('.modal')?.querySelector('form');
        if (!authGroup || !form) return;

        authGroup.querySelectorAll('.auth-tab').forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        form.dataset.mode = tab.dataset.mode;
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
      const card = event.target.closest('.gallery-item');
      if (!card) return;
      const index = Number(card.dataset.index);
      if (!Number.isNaN(index)) {
        const item = galleryData[index];
        if (item) {
          galleryPreviewImage.src = resolveImagePath(item.src);
          galleryPreviewImage.alt = item.title;
          galleryPreviewTitle.textContent = item.title;
          galleryPreviewDescription.textContent = item.description;
          galleryPreviewCategory.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
          openModal('galleryModal');
        }
      }
    });

    galleryFilters.forEach((button) => {
      button.addEventListener('click', () => applyGalleryFilter(button.dataset.filter));
    });
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
  }

  function buildCaptainDashboard(companyId) {
    if (!dashboardGrid) return;
    const company = state.companyData[companyId] || defaultCompanyData[companyId];
    dashboardGrid.innerHTML = '';
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
        <textarea name="active-${companyId}">${(company.active || []).join('\n')}</textarea>
      </label>
      <label>
        <span>None Active Members</span>
        <textarea name="inactive-${companyId}">${(company.inactive || []).join('\n')}</textarea>
      </label>
      <label>
        <span>Ranked Officers</span>
        <textarea name="officers-${companyId}">${(company.officers || []).join('\n')}</textarea>
      </label>
    `;
    dashboardGrid.appendChild(card);
  }

  function openCaptainDashboard(companyId) {
    state.activeCaptainCompany = companyId;
    openModal('dashboardModal');
    buildCaptainDashboard(companyId);
  }

  function buildCommanderDashboard() {
    if (!commanderDashboardGrid) return;
    commanderDashboardGrid.innerHTML = '';

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
          <textarea name="active-${companyId}">${(company.active || []).join('\n')}</textarea>
        </label>
        <label>
          <span>None Active Members</span>
          <textarea name="inactive-${companyId}">${(company.inactive || []).join('\n')}</textarea>
        </label>
        <label>
          <span>Ranked Officers</span>
          <textarea name="officers-${companyId}">${(company.officers || []).join('\n')}</textarea>
        </label>
      `;
      commanderDashboardGrid.appendChild(card);
    });
  }

  function openCommanderDashboard() {
    openModal('commanderDashboardModal');
    buildCommanderDashboard();
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
    openModal('excoDashboardModal');
    buildExcoDashboard();
  }

  function bindForms() {
    captainForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const mode = captainForm.dataset.mode || 'login';
      const email = captainEmail.value.trim();
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

        state.captainRequests[email] = { password, companyId, submittedAt: new Date().toISOString(), status: 'pending' };
        saveCaptainRequests();
        captainNotice.textContent = 'Captain creation request submitted. The Divisional Commander can approve it from the command dashboard.';
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
      const email = commanderEmail.value.trim();
      const password = commanderPassword.value.trim();

      if (!email || !password) {
        commanderNotice.textContent = 'Please enter your commander email and password.';
        commanderNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }

      if (mode === 'register') {
        if (state.commanderAccounts[email.toLowerCase()]) {
          commanderNotice.textContent = 'This email already has commander access.';
          commanderNotice.style.color = 'hsl(0, 70%, 60%)';
          return;
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        state.commanderVerificationCodes[email.toLowerCase()] = { code: verificationCode, password, verified: false };
        saveCommanderVerificationCodes();
        commanderNotice.textContent = `Verification code ${verificationCode} prepared for ${email}. Use it to complete setup.`;
        commanderNotice.style.color = 'var(--gold-400)';
        return;
      }

      const normalizedEmail = email.toLowerCase();
      const account = state.commanderAccounts[normalizedEmail];
      const pendingVerification = state.commanderVerificationCodes[normalizedEmail];

      if (!account || account.password !== password) {
        if (pendingVerification && password === pendingVerification.password) {
          state.commanderAccounts[normalizedEmail] = { password, verified: true };
          delete state.commanderVerificationCodes[normalizedEmail];
          saveCommanderAccounts();
          saveCommanderVerificationCodes();
          commanderNotice.textContent = 'Commander account verified. Opening the commander dashboard.';
          commanderNotice.style.color = 'var(--gold-400)';
          closeModal('commanderModal');
          openCommanderDashboard();
          return;
        }

        commanderNotice.textContent = 'Invalid commander email or password.';
        commanderNotice.style.color = 'hsl(0, 70%, 60%)';
        return;
      }

      if (!account.verified) {
        commanderNotice.textContent = 'Please verify your commander account before signing in.';
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

      Object.keys(state.companyData).forEach((companyId) => {
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
      });

      saveCompanies();
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

    openExcoDashboardBtn?.addEventListener('click', openExcoDashboard);

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
    renderCompanyLists();
    renderGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

