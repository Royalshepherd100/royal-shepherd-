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

// Dynamic command structure, training data, and enlistment state
const defaultCommandStructure = {
  'divisional-commander': 'Enter name here',
  'company-captain': 'Enter name here',
  'organising-secretary': 'Enter name here',
  'assistant-organising-secretary': 'Enter name here',
  'lowest-rank': 'Enter name here'
};

const defaultTrainingData = {
  focus: [
    'Drill and parade preparedness',
    'Leadership and character development',
    'Spiritual growth and devotion',
    'Health, discipline, and service excellence'
  ],
  officers: [
    'Enter training officer names here',
    'Enter section or unit assignment',
    'Enter schedule or next session'
  ],
  schedule: [
    'Weekly meeting: Enter day/time',
    'Special drill: Enter details',
    'Annual review: Enter date'
  ]
};

let commandStructure = JSON.parse(localStorage.getItem('royalShepherdCommandStructure') || 'null') || defaultCommandStructure;
let trainingData = JSON.parse(localStorage.getItem('royalShepherdTraining') || 'null') || defaultTrainingData;
let enlistments = JSON.parse(localStorage.getItem('royalShepherdEnlistments') || 'null') || [];

let pendingCommanderEmail = ''; // track email being registered/verified
const excoShowcaseGrid = document.getElementById('excoShowcaseGrid');
const trainingFocusList = document.getElementById('trainingFocusList');
const trainingOfficersList = document.getElementById('trainingOfficersList');
const trainingScheduleList = document.getElementById('trainingScheduleList');


window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Menu toggle with direct binding
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

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

function renderCommandStructure() {
  Object.entries(commandStructure).forEach(([rankKey, name]) => {
    const el = document.getElementById(`name-${rankKey}`);
    if (el) {
      el.textContent = name || 'Enter name here';
    }
  });
}

function renderTrainingData() {
  if (trainingFocusList) {
    trainingFocusList.innerHTML = '';
    (trainingData.focus || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      trainingFocusList.appendChild(li);
    });
  }
  if (trainingOfficersList) {
    trainingOfficersList.innerHTML = '';
    (trainingData.officers || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      trainingOfficersList.appendChild(li);
    });
  }
  if (trainingScheduleList) {
    trainingScheduleList.innerHTML = '';
    (trainingData.schedule || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      trainingScheduleList.appendChild(li);
    });
  }
}

function renderExcoProfiles() {
  if (!excoShowcaseGrid) return;
  excoShowcaseGrid.innerHTML = '';
  
  let hasProfiles = false;
  excoRoleDefinitions.forEach((role) => {
    const profile = excoProfiles[role.key];
    if (profile && (profile.name || profile.bio)) {
      hasProfiles = true;
      const card = document.createElement('article');
      card.className = 'glass-card exco-card';
      card.innerHTML = `
        <div>
          <h3>${profile.name || 'Pending Assignment'}</h3>
          <div class="exco-role">${profile.role || role.label}</div>
          <p class="exco-bio">${profile.bio || 'Biography pending update.'}</p>
        </div>
        <div class="exco-contact">
          ${profile.email ? `<span><i class="fa-solid fa-envelope"></i> ${profile.email}</span>` : ''}
          ${profile.phone ? `<span><i class="fa-solid fa-phone"></i> ${profile.phone}</span>` : ''}
        </div>
      `;
      excoShowcaseGrid.appendChild(card);
    }
  });

  if (!hasProfiles) {
    excoShowcaseGrid.innerHTML = '<p class="dashboard-intro" style="grid-column: 1 / -1; text-align: center;">Executive Committee profiles are pending assignment by the Commander.</p>';
  }
}

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
  const requestsGrid = document.querySelector('.requests-dashboard-grid');
  const companiesGrid = document.querySelector('.companies-dashboard-grid');
  const settingsGrid = document.querySelector('.settings-dashboard-grid');

  // 1. POPULATE REQUESTS & ENLISTMENTS TAB
  if (requestsGrid) {
    requestsGrid.innerHTML = '';

    // Captain Requests
    const captainRequestsCard = document.createElement('div');
    captainRequestsCard.className = 'dashboard-card';
    captainRequestsCard.innerHTML = `
      <h4>Pending Captain Accounts</h4>
      <p class="dashboard-intro">Approve or deny captain account creation requests submitted by members.</p>
      <div class="captain-request-list"></div>
    `;
    requestsGrid.appendChild(captainRequestsCard);

    const captainListContainer = captainRequestsCard.querySelector('.captain-request-list');
    const pendingCaptains = Object.entries(captainRequests);
    if (pendingCaptains.length === 0) {
      captainListContainer.innerHTML = '<p class="dashboard-intro">No pending captain accounts.</p>';
    } else {
      pendingCaptains.forEach(([email, request]) => {
        const item = document.createElement('div');
        item.style.padding = '0.75rem';
        item.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
        item.innerHTML = `
          <h5>${email}</h5>
          <p class="dashboard-intro">Company ${request.companyId} (Submitted: ${new Date(request.submittedAt).toLocaleDateString()})</p>
          <div class="request-actions" style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
            <button type="button" class="btn btn-gold btn-sm request-action" data-request="approve" data-request-type="captain" data-email="${email}">Approve</button>
            <button type="button" class="btn btn-secondary btn-sm request-action" data-request="deny" data-request-type="captain" data-email="${email}">Deny</button>
          </div>
        `;
        captainListContainer.appendChild(item);
      });
    }

    // Enlistment Applications
    const enlistmentsCard = document.createElement('div');
    enlistmentsCard.className = 'dashboard-card';
    enlistmentsCard.innerHTML = `
      <h4>Pending Enlistment Applications</h4>
      <p class="dashboard-intro">Review and approve applications to join the division.</p>
      <div class="enlistment-list"></div>
    `;
    requestsGrid.appendChild(enlistmentsCard);

    const enlistmentListContainer = enlistmentsCard.querySelector('.enlistment-list');
    if (enlistments.length === 0) {
      enlistmentListContainer.innerHTML = '<p class="dashboard-intro">No pending enlistment applications.</p>';
    } else {
      enlistments.forEach((app, index) => {
        const item = document.createElement('div');
        item.style.padding = '0.75rem';
        item.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
        item.innerHTML = `
          <h5>${app.fullName} (${app.gender}, DOB: ${app.dob})</h5>
          <p class="dashboard-intro"><strong>Email:</strong> ${app.email} | <strong>Phone:</strong> ${app.phone}</p>
          <p class="dashboard-intro"><strong>Preferred Wing:</strong> ${app.wing}</p>
          <p class="dashboard-intro"><strong>Reason:</strong> ${app.reason}</p>
          <div class="request-actions" style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <select class="enlist-assign-company" data-index="${index}" style="width: auto; padding: 0.35rem 0.5rem; font-size: 0.9rem;">
              <option value="">Assign to Company</option>
              ${Object.entries(companyData).map(([id, c]) => `<option value="${id}">${c.name}</option>`).join('')}
            </select>
            <button type="button" class="btn btn-gold btn-sm enlistment-action" data-action="approve" data-index="${index}">Approve</button>
            <button type="button" class="btn btn-secondary btn-sm enlistment-action" data-action="reject" data-index="${index}">Reject</button>
          </div>
        `;
        enlistmentListContainer.appendChild(item);
      });
    }
  }

  // 2. POPULATE COMPANIES TAB
  if (companiesGrid) {
    companiesGrid.innerHTML = '';
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
      companiesGrid.appendChild(card);
    });
  }

  // 3. POPULATE SETTINGS (OFFICERS & TRAINING) TAB
  if (settingsGrid) {
    settingsGrid.innerHTML = '';

    // Command Structure card
    const officersCard = document.createElement('div');
    officersCard.className = 'dashboard-card';
    officersCard.innerHTML = `
      <h4>Command Structure Names</h4>
      <p class="dashboard-intro">Update the public names shown in the Officers command structure section.</p>
      <label>
        <span>Divisional Commander</span>
        <input type="text" name="officer-divisional-commander" value="${commandStructure['divisional-commander'] || ''}" />
      </label>
      <label>
        <span>Company Captain</span>
        <input type="text" name="officer-company-captain" value="${commandStructure['company-captain'] || ''}" />
      </label>
      <label>
        <span>Organising Secretary</span>
        <input type="text" name="officer-organising-secretary" value="${commandStructure['organising-secretary'] || ''}" />
      </label>
      <label>
        <span>Assistant Organising Secretary</span>
        <input type="text" name="officer-assistant-organising-secretary" value="${commandStructure['assistant-organising-secretary'] || ''}" />
      </label>
      <label>
        <span>Lowest Rank</span>
        <input type="text" name="officer-lowest-rank" value="${commandStructure['lowest-rank'] || ''}" />
      </label>
    `;
    settingsGrid.appendChild(officersCard);

    // Training details card
    const trainingCard = document.createElement('div');
    trainingCard.className = 'dashboard-card';
    trainingCard.innerHTML = `
      <h4>Training Department Configuration</h4>
      <p class="dashboard-intro">Update Training focus areas, officers list, and weekly schedules (one item per line).</p>
      <label>
        <span>Training Focus</span>
        <textarea name="training-focus">${(trainingData.focus || []).join('\n')}</textarea>
      </label>
      <label>
        <span>Training Officers</span>
        <textarea name="training-officers">${(trainingData.officers || []).join('\n')}</textarea>
      </label>
      <label>
        <span>Training Schedule</span>
        <textarea name="training-schedule">${(trainingData.schedule || []).join('\n')}</textarea>
      </label>
    `;
    settingsGrid.appendChild(trainingCard);
  }
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

function resolveImagePath(src) {
  if (!src) return '';
  const normalized = String(src).trim().replace(/\\/g, '/');
  if (/^(https?:)?\/\//i.test(normalized) || normalized.startsWith('data:')) return normalized;
  if (normalized.startsWith('image/')) return normalized;
  return `image/${normalized}`;
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
        <img src="${resolveImagePath(item.src)}" alt="${item.title}" />
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
  galleryPreviewImage.src = resolveImagePath(item.src);
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
  trigger.addEventListener('click', openCaptainModal);
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

    // Reset Commander verification state if Commander Modal tab toggles
    const authFields = form.querySelector('.commander-auth-fields');
    const verifyFields = form.querySelector('.commander-verify-fields');
    const submitBtn = form.querySelector('#commanderSubmitBtn');
    if (authFields && verifyFields) {
      authFields.style.display = 'block';
      verifyFields.style.display = 'none';
      if (submitBtn) submitBtn.textContent = 'Continue';
      pendingCommanderEmail = '';
    }
  });
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

  if (mode === 'register-verify') {
    const enteredCode = document.getElementById('commanderVerificationCodeInput').value.trim();
    const pendingVerification = commanderVerificationCodes[pendingCommanderEmail];

    if (!enteredCode) {
      commanderNotice.textContent = 'Please enter the verification code.';
      commanderNotice.style.color = 'hsl(0, 70%, 60%)';
      return;
    }

    if (pendingVerification && enteredCode === pendingVerification.code) {
      commanderAccounts[pendingCommanderEmail] = { password: pendingVerification.password, verified: true };
      delete commanderVerificationCodes[pendingCommanderEmail];
      localStorage.setItem('royalShepherdCommanderAccounts', JSON.stringify(commanderAccounts));
      localStorage.setItem('royalShepherdCommanderVerificationCodes', JSON.stringify(commanderVerificationCodes));
      
      commanderNotice.textContent = 'Commander account verified successfully! Opening dashboard.';
      commanderNotice.style.color = 'var(--gold-400)';

      // Reset form UI
      const authFields = commanderForm.querySelector('.commander-auth-fields');
      const verifyFields = commanderForm.querySelector('.commander-verify-fields');
      const submitBtn = commanderForm.querySelector('#commanderSubmitBtn');
      if (authFields && verifyFields) {
        authFields.style.display = 'block';
        verifyFields.style.display = 'none';
        if (submitBtn) submitBtn.textContent = 'Continue';
      }
      commanderForm.dataset.mode = 'login';
      
      closeCommanderModal();
      openCommanderDashboard();
    } else {
      commanderNotice.textContent = 'Incorrect verification code. Please try again.';
      commanderNotice.style.color = 'hsl(0, 70%, 60%)';
    }
    return;
  }

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

    pendingCommanderEmail = email.toLowerCase();
    commanderNotice.textContent = `Verification code ${verificationCode} prepared for ${email}. Enter it below to complete setup.`;
    commanderNotice.style.color = 'var(--gold-400)';

    // Switch to verify mode UI
    const authFields = commanderForm.querySelector('.commander-auth-fields');
    const verifyFields = commanderForm.querySelector('.commander-verify-fields');
    const submitBtn = commanderForm.querySelector('#commanderSubmitBtn');
    if (authFields && verifyFields) {
      authFields.style.display = 'none';
      verifyFields.style.display = 'block';
      if (submitBtn) submitBtn.textContent = 'Verify Account';
    }
    commanderForm.dataset.mode = 'register-verify';
    return;
  }

  // Login mode
  const normalizedEmail = email.toLowerCase();
  const account = commanderAccounts[normalizedEmail];
  const pendingVerification = commanderVerificationCodes[normalizedEmail];

  if (!account || account.password !== password) {
    // If they have a pending verification, let them verify now
    if (pendingVerification && password === pendingVerification.password) {
      pendingCommanderEmail = normalizedEmail;
      commanderNotice.textContent = `Pending verification code: ${pendingVerification.code}. Enter it below.`;
      commanderNotice.style.color = 'var(--gold-400)';

      // Switch to verify mode UI
      const authFields = commanderForm.querySelector('.commander-auth-fields');
      const verifyFields = commanderForm.querySelector('.commander-verify-fields');
      const submitBtn = commanderForm.querySelector('#commanderSubmitBtn');
      if (authFields && verifyFields) {
        authFields.style.display = 'none';
        verifyFields.style.display = 'block';
        if (submitBtn) submitBtn.textContent = 'Verify Account';
      }
      commanderForm.dataset.mode = 'register-verify';
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

  // 1. Save Companies details
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
  localStorage.setItem('royalShepherdCompanies', JSON.stringify(companyData));

  // 2. Save Command Structure officers
  commandStructure['divisional-commander'] = (formData.get('officer-divisional-commander') || '').toString().trim();
  commandStructure['company-captain'] = (formData.get('officer-company-captain') || '').toString().trim();
  commandStructure['organising-secretary'] = (formData.get('officer-organising-secretary') || '').toString().trim();
  commandStructure['assistant-organising-secretary'] = (formData.get('officer-assistant-organising-secretary') || '').toString().trim();
  commandStructure['lowest-rank'] = (formData.get('officer-lowest-rank') || '').toString().trim();
  localStorage.setItem('royalShepherdCommandStructure', JSON.stringify(commandStructure));

  // 3. Save Training data
  trainingData.focus = (formData.get('training-focus') || '')
    .toString()
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  trainingData.officers = (formData.get('training-officers') || '')
    .toString()
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  trainingData.schedule = (formData.get('training-schedule') || '')
    .toString()
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  localStorage.setItem('royalShepherdTraining', JSON.stringify(trainingData));

  // Rerender lists and static page sections
  renderCompanyLists();
  renderCommandStructure();
  renderTrainingData();
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
  renderExcoProfiles(); // instantly update landing page!
  closeExcoDashboard();
});

openExcoDashboardBtn?.addEventListener('click', openExcoDashboard);
excoDashboardClose?.addEventListener('click', closeExcoDashboard);

// Click listener for Commander Dashboard actions (approving captains and managing enlistments)
commanderDashboardModal?.addEventListener('click', (event) => {
  const actionButton = event.target.closest('.request-action');
  if (actionButton) {
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
      buildCommanderDashboard();
    }
  }

  // Handle Enlistment Actions
  const enlistmentButton = event.target.closest('.enlistment-action');
  if (enlistmentButton) {
    const index = parseInt(enlistmentButton.dataset.index, 10);
    const action = enlistmentButton.dataset.action;
    const app = enlistments[index];

    if (!app) return;

    if (action === 'approve') {
      const selectElement = commanderDashboardModal.querySelector(`.enlist-assign-company[data-index="${index}"]`);
      const companyId = selectElement ? selectElement.value : '';

      if (!companyId) {
        alert('Please assign the applicant to a company first.');
        return;
      }

      // Add applicant to active members list of selected company
      if (companyData[companyId]) {
        companyData[companyId].active = companyData[companyId].active || [];
        companyData[companyId].active.push(app.fullName);
        localStorage.setItem('royalShepherdCompanies', JSON.stringify(companyData));
        renderCompanyLists();
      }

      // Remove enlistment request
      enlistments.splice(index, 1);
      localStorage.setItem('royalShepherdEnlistments', JSON.stringify(enlistments));
    } else if (action === 'reject') {
      enlistments.splice(index, 1);
      localStorage.setItem('royalShepherdEnlistments', JSON.stringify(enlistments));
    }

    buildCommanderDashboard();
  }
});

// Tab switching logic for Commander Dashboard
document.addEventListener('click', (e) => {
  const tabButton = e.target.closest('.commander-dash-tab');
  if (!tabButton) return;

  const tabName = tabButton.dataset.tab;
  const modal = tabButton.closest('#commanderDashboardModal');
  if (!modal) return;

  // Toggle tab buttons active state
  modal.querySelectorAll('.commander-dash-tab').forEach(btn => btn.classList.remove('active'));
  tabButton.classList.add('active');

  // Toggle tab content visibility
  modal.querySelectorAll('.commander-dashboard-tab-content').forEach(content => {
    if (content.dataset.content === tabName) {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
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

  // Save enlistment application data
  const formData = new FormData(form);
  const newEnlistment = {
    fullName: formData.get('fullName'),
    dob: formData.get('dob'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    gender: formData.get('gender'),
    wing: formData.get('wing'),
    reason: formData.get('reason'),
    submittedAt: new Date().toISOString()
  };

  enlistments.push(newEnlistment);
  localStorage.setItem('royalShepherdEnlistments', JSON.stringify(enlistments));

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
renderCommandStructure();
renderTrainingData();
renderExcoProfiles();
