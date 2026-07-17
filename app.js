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
const dashboardGrid = document.querySelector('.dashboard-grid');
const commanderDashboardGrid = document.querySelector('.commander-dashboard-grid');
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
const excoDashboardGrid = document.querySelector('.exco-dashboard-grid');
const excoDashboardForm = document.getElementById('excoDashboardForm');
const openExcoDashboardBtn = document.getElementById('openExcoDashboardBtn');
const commanderTrigger = document.querySelectorAll('.commander-trigger');
const excoTrigger = document.querySelectorAll('.exco-trigger');
const companyCards = document.querySelectorAll('.company-card');
const companyLists = document.querySelectorAll('.company-list');
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
const commanderAccounts = JSON.parse(localStorage.getItem('royalShepherdCommanderAccounts') || 'null') || {};
const commanderVerificationCodes = JSON.parse(localStorage.getItem('royalShepherdCommanderVerificationCodes') || 'null') || {};
const commanderPendingResets = JSON.parse(localStorage.getItem('royalShepherdCommanderPendingResets') || 'null') || {};
const captainRequests = JSON.parse(localStorage.getItem('royalShepherdCaptainRequests') || 'null') || {};
const commanderSettings = JSON.parse(localStorage.getItem('royalShepherdCommanderSettings') || 'null') || {};
const excoProfiles = JSON.parse(localStorage.getItem('royalShepherdExcoProfiles') || 'null') || {};
const excoRoleDefinitions = [
  { key: 'general-secretary', label: 'General Secretary' },
  { key: 'pro', label: 'PRO' },
  { key: 'assistant-secretary', label: 'Assistant Secretary' },
  { key: 'band-master', label: 'Band Master' },
  { key: 'assistant-band-master', label: 'Assistant Band Master' },
  { key: 'treasurer', label: 'Treasurer' }
];
let galleryItems = []; 

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

let companyData = JSON.parse(localStorage.getItem('royalShepherdCompanies') || 'null') || defaultCompanyData;
const captainAccounts = JSON.parse(localStorage.getItem('royalShepherdCaptains') || 'null') || {};
let activeCaptainCompany = null;

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

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
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

function openModal(title, items) {
  modalTitle.textContent = title;
  modalList.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    modalList.appendChild(li);
  });
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

function openCaptainModal() {
  captainModal.classList.add('active');
  captainModal.setAttribute('aria-hidden', 'false');
}

function closeCaptainModal() {
  captainModal.classList.remove('active');
  captainModal.setAttribute('aria-hidden', 'true');
}

function openDashboard(companyId = activeCaptainCompany) {
  if (!companyId) return;
  dashboardModal.classList.add('active');
  dashboardModal.setAttribute('aria-hidden', 'false');
  const company = companyData[companyId] || defaultCompanyData[companyId];
  dashboardGrid.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'dashboard-card';
  card.innerHTML = `
    <h4>${company.name}</h4>
    <label>
      <span>Company Name</span>
      <input type="text" name="company-name-${companyId}" value="${company.name || ''}" />
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

function closeDashboard() {
  dashboardModal.classList.remove('active');
  dashboardModal.setAttribute('aria-hidden', 'true');
}

function openCommanderModal() {
  commanderModal.classList.add('active');
  commanderModal.setAttribute('aria-hidden', 'false');
}

function closeCommanderModal() {
  commanderModal.classList.remove('active');
  commanderModal.setAttribute('aria-hidden', 'true');
}

function openCommanderDashboard() {
  commanderDashboardModal.classList.add('active');
  commanderDashboardModal.setAttribute('aria-hidden', 'false');
  buildCommanderDashboard();
}

function closeCommanderDashboard() {
  commanderDashboardModal.classList.remove('active');
  commanderDashboardModal.setAttribute('aria-hidden', 'true');
}


function openExcoDashboard() {
  excoDashboardModal.classList.add('active');
  excoDashboardModal.setAttribute('aria-hidden', 'false');
  buildExcoDashboard();
}

function closeExcoDashboard() {
  excoDashboardModal.classList.remove('active');
  excoDashboardModal.setAttribute('aria-hidden', 'true');
}

function buildExcoDashboard() {
  if (!excoDashboardGrid) return;
  excoDashboardGrid.innerHTML = '';

  excoRoleDefinitions.forEach((role) => {
    const profile = excoProfiles[role.key] || {};
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

function buildCommanderDashboard() {
  if (!commanderDashboardGrid) return;
  commanderDashboardGrid.innerHTML = '';

  const requestCard = document.createElement('div');
  requestCard.className = 'dashboard-card';
  requestCard.innerHTML = `
    <h4>Pending Account Creation Requests</h4>
    <p class="dashboard-intro">Approve or deny captain creation requests submitted by members. Only the Divisional Commander can complete this step.</p>
    <div class="request-list"></div>
  `;
  commanderDashboardGrid.appendChild(requestCard);

  const requestList = requestCard.querySelector('.request-list');
  const pendingRequests = [];

  Object.entries(captainRequests).forEach(([email, request]) => {
    pendingRequests.push({
      key: `captain-${email}`,
      title: `Captain Request: ${email}`,
      body: `Company ${request.companyId}`,
      type: 'captain',
      email,
      details: request
    });
  });

  if (pendingRequests.length === 0) {
    requestList.innerHTML = '<p>No pending account creation requests.</p>';
  } else {
    pendingRequests.forEach((request) => {
      const requestItem = document.createElement('div');
      requestItem.className = 'dashboard-card';
      requestItem.innerHTML = `
        <h5>${request.title}</h5>
        <p>${request.body}</p>
        <p>Submitted: ${new Date(request.details.submittedAt).toLocaleString()}</p>
        <div class="request-actions">
          <button type="button" class="btn btn-gold request-action" data-request="approve" data-request-type="${request.type}" data-email="${request.email}">Approve</button>
          <button type="button" class="btn btn-secondary request-action" data-request="deny" data-request-type="${request.type}" data-email="${request.email}">Deny</button>
        </div>
      `;
      requestList.appendChild(requestItem);
    });
  }

  Object.entries(companyData).forEach(([companyId, company]) => {
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.innerHTML = `
      <h4>${company.name}</h4>
      <label>
        <span>Company Name</span>
        <input type="text" name="company-name-${companyId}" value="${company.name || ''}" />
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


function closeAllModals() {
  closeModal();
  closeCaptainModal();
  closeDashboard();
  closeCommanderModal();
  closeCommanderDashboard();

  closeExcoDashboard();
}

function renderCompanyLists() {
  companyCards.forEach((card) => {
    const companyId = card.dataset.company;
    const company = companyData[companyId] || defaultCompanyData[companyId];
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

function renderGalleryItems() {
  if (!galleryGrid || !Array.isArray(galleryData)) return;
  galleryGrid.innerHTML = '';

  galleryData.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'gallery-item glass-card';
    article.dataset.category = item.category || 'parades';
    article.dataset.index = index;
    article.innerHTML = `
      <button type="button" class="gallery-thumb" aria-label="${item.title}">
        <img src="${item.src}" alt="${item.title}" />
        <div class="gallery-overlay">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </button>
    `;
    galleryGrid.appendChild(article);
  });

  galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
}

function openGalleryPreview(index) {
  const item = galleryData[index];
  if (!item || !galleryModal) return;
  galleryPreviewImage.src = item.src;
  galleryPreviewImage.alt = item.title;
  galleryPreviewTitle.textContent = item.title;
  galleryPreviewDescription.textContent = item.description;
  galleryPreviewCategory.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
  galleryModal.classList.add('active');
  galleryModal.setAttribute('aria-hidden', 'false');
}

function closeGalleryPreview() {
  if (!galleryModal) return;
  galleryModal.classList.remove('active');
  galleryModal.setAttribute('aria-hidden', 'true');
  if (galleryPreviewImage) {
    galleryPreviewImage.src = '';
    galleryPreviewImage.alt = 'Gallery preview';
  }
}

function buildDashboardFields() {
  dashboardGrid.innerHTML = '';
  Object.entries(companyData).forEach(([companyId, company]) => {
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.innerHTML = `
      <h4>${company.name}</h4>
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
  });
}

function saveDashboard(event) {
  event.preventDefault();
  if (!activeCaptainCompany) return;

  const formData = new FormData(dashboardForm);
  const companyId = String(activeCaptainCompany);
  const active = (formData.get(`active-${companyId}`) || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const inactive = (formData.get(`inactive-${companyId}`) || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const officers = (formData.get(`officers-${companyId}`) || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const name = (formData.get(`company-name-${companyId}`) || '')
    .toString()
    .trim() || companyData[companyId]?.name || `Company ${companyId}`;

  companyData[companyId] = {
    name,
    active,
    inactive,
    officers
  };

  localStorage.setItem('royalShepherdCompanies', JSON.stringify(companyData));
  renderCompanyLists();
  closeDashboard();
}

symbolCards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.dataset.title || 'Symbol Meaning';
    const items = JSON.parse(card.dataset.items || '[]');
    openModal(title, items);
  });
});

captainTrigger.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    openCaptainModal();
  });
});

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

captainTrigger.forEach((trigger) => {
  trigger.addEventListener('click', openCaptainModal);
});

commanderTrigger.forEach((trigger) => {
  trigger.addEventListener('click', openCommanderModal);
});

excoTrigger.forEach((trigger) => {
  trigger.addEventListener('click', openExcoDashboard);
});


galleryGrid?.addEventListener('click', (event) => {
  const card = event.target.closest('.gallery-item');
  if (!card) return;
  const index = Number(card.dataset.index);
  if (!Number.isNaN(index)) {
    openGalleryPreview(index);
  }
});

galleryClose?.addEventListener('click', closeGalleryPreview);
galleryBackdrop?.addEventListener('click', closeGalleryPreview);

galleryFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    galleryFilters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    galleryItems.forEach((item) => {
      const category = item.dataset.category;
      const show = filter === 'all' || filter === category;
      item.classList.toggle('is-hidden', !show);
    });
  });
});

captainForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const mode = captainForm.dataset.mode;
  const email = captainEmail.value.trim();
  const password = captainPassword.value.trim();
  const companyId = captainCompany.value;

  if (!email || !password || !companyId) {
    captainNotice.textContent = 'Please complete all fields.';
    captainNotice.style.color = 'hsl(0, 70%, 60%)';
    return;
  }

  if (mode === 'register') {
    if (captainAccounts[email]) {
      captainNotice.textContent = 'This email already has a captain account.';
      captainNotice.style.color = 'hsl(0, 70%, 60%)';
      return;
    }
    if (captainRequests[email]) {
      captainNotice.textContent = 'A creation request for this email is already pending approval.';
      captainNotice.style.color = 'hsl(0, 70%, 60%)';
      return;
    }
    captainRequests[email] = { password, companyId, submittedAt: new Date().toISOString(), status: 'pending' };
    localStorage.setItem('royalShepherdCaptainRequests', JSON.stringify(captainRequests));
    captainNotice.textContent = 'Captain creation request submitted. Divisional Commander approval is required.';
    captainNotice.style.color = 'var(--gold-400)';
    return;
  } else {
    const account = captainAccounts[email];
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
  }

  activeCaptainCompany = companyId;
  closeCaptainModal();
  openDashboard(companyId);
});

commanderForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const mode = commanderForm.dataset.mode;
  const email = commanderEmail.value.trim();
  const password = commanderPassword.value.trim();

  if (!email || !password) {
    commanderNotice.textContent = 'Please enter your commander email and password.';
    commanderNotice.style.color = 'hsl(0, 70%, 60%)';
    return;
  }

  if (mode === 'register') {
    if (commanderAccounts[email]) {
      commanderNotice.textContent = 'This email already has commander access.';
      commanderNotice.style.color = 'hsl(0, 70%, 60%)';
      return;
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    commanderVerificationCodes[email.toLowerCase()] = { code: verificationCode, password, verified: false };
    localStorage.setItem('royalShepherdCommanderVerificationCodes', JSON.stringify(commanderVerificationCodes));

    commanderNotice.textContent = `Verification code ${verificationCode} prepared for ${email}. Use it to complete setup.`;
    commanderNotice.style.color = 'var(--gold-400)';
    return;
  }

  const normalizedEmail = email.toLowerCase();
  const account = commanderAccounts[normalizedEmail];
  const pendingVerification = commanderVerificationCodes[normalizedEmail];

  if (!account || account.password !== password) {
    if (pendingVerification && password === pendingVerification.password) {
      commanderAccounts[normalizedEmail] = { password: pendingVerification.password, verified: true };
      delete commanderVerificationCodes[normalizedEmail];
      localStorage.setItem('royalShepherdCommanderAccounts', JSON.stringify(commanderAccounts));
      localStorage.setItem('royalShepherdCommanderVerificationCodes', JSON.stringify(commanderVerificationCodes));
      commanderNotice.textContent = 'Commander account verified. Opening commander dashboard.';
      commanderNotice.style.color = 'var(--gold-400)';
      closeCommanderModal();
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

  commanderNotice.textContent = 'Commander access granted. Opening commander dashboard.';
  commanderNotice.style.color = 'var(--gold-400)';
  closeCommanderModal();
  openCommanderDashboard();
});


commanderDashboardForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(commanderDashboardForm);

  Object.keys(companyData).forEach((companyId) => {
    companyData[companyId].active = (formData.get(`active-${companyId}`) || '')
      .toString()
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    companyData[companyId].inactive = (formData.get(`inactive-${companyId}`) || '')
      .toString()
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    companyData[companyId].officers = (formData.get(`officers-${companyId}`) || '')
      .toString()
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    const name = (formData.get(`company-name-${companyId}`) || '')
      .toString()
      .trim() || companyData[companyId]?.name || `Company ${companyId}`;

    companyData[companyId] = {
      name,
      active: companyData[companyId].active,
      inactive: companyData[companyId].inactive,
      officers: companyData[companyId].officers
    };
  });

  localStorage.setItem('royalShepherdCommanderSettings', JSON.stringify(commanderSettings));
  localStorage.setItem('royalShepherdCompanies', JSON.stringify(companyData));
  renderCompanyLists();
  closeCommanderDashboard();
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
      excoProfiles[role.key] = { role: role.label, name, email, phone, bio };
    } else {
      delete excoProfiles[role.key];
    }
  });

  localStorage.setItem('royalShepherdExcoProfiles', JSON.stringify(excoProfiles));
  closeExcoDashboard();
});

openExcoDashboardBtn?.addEventListener('click', openExcoDashboard);
excoDashboardClose?.addEventListener('click', closeExcoDashboard);

commanderDashboardGrid?.addEventListener('click', (event) => {
  const actionButton = event.target.closest('.request-action');
  if (!actionButton) return;

  const requestType = actionButton.dataset.requestType;
  const email = actionButton.dataset.email;
  const requestAction = actionButton.dataset.request;

  if (!requestType || !email || !requestAction) return;

  if (requestType === 'captain') {
    if (requestAction === 'approve') {
      const request = captainRequests[email];
      if (request) {
        captainAccounts[email] = { password: request.password, companyId: request.companyId };
        delete captainRequests[email];
        localStorage.setItem('royalShepherdCaptains', JSON.stringify(captainAccounts));
        localStorage.setItem('royalShepherdCaptainRequests', JSON.stringify(captainRequests));
      }
    }
    if (requestAction === 'deny') {
      delete captainRequests[email];
      localStorage.setItem('royalShepherdCaptainRequests', JSON.stringify(captainRequests));
    }
  }

  buildCommanderDashboard();
});

captainClose?.addEventListener('click', closeCaptainModal);
commanderClose?.addEventListener('click', closeCommanderModal);
commanderDashboardClose?.addEventListener('click', closeCommanderDashboard);

galleryClose?.addEventListener('click', closeGalleryPreview);
galleryBackdrop?.addEventListener('click', closeGalleryPreview);

modalClose?.addEventListener('click', closeAllModals);
modalBackdrops.forEach((backdrop) => {
  backdrop.addEventListener('click', closeAllModals);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (dashboardModal.classList.contains('active')) {
      closeDashboard();
    } else if (commanderDashboardModal?.classList.contains('active')) {
      closeCommanderDashboard();
    } else if (excoDashboardModal?.classList.contains('active')) {
      closeExcoDashboard();
    } else if (captainModal.classList.contains('active')) {
      closeCaptainModal();
    } else if (commanderModal.classList.contains('active')) {
      closeCommanderModal();
    } else if (galleryModal?.classList.contains('active')) {
      closeGalleryPreview();
    } else if (modal.classList.contains('active')) {
      closeModal();
    }
  }
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

  if (!valid) {
    return;
  }

  form.style.display = 'none';
  formSuccess.classList.add('active');
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

fillAnother?.addEventListener('click', () => {
  form.reset();
  form.style.display = 'block';
  formSuccess.classList.remove('active');
  form.querySelector('input, select, textarea')?.focus();
});

dashboardForm?.addEventListener('submit', saveDashboard);

renderGalleryItems();
renderCompanyLists();
