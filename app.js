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
const captainPicture = document.getElementById('captainPicture');
const captainVerify = document.getElementById('captainVerify');
const captainNotice = document.getElementById('captainNotice');
const authTabs = document.querySelectorAll('.auth-tab');
const dashboardModal = document.getElementById('dashboardModal');
const dashboardClose = document.getElementById('dashboardClose');
const dashboardGrid = document.querySelector('.dashboard-grid');
const commanderDashboardGrid = document.querySelector('.commander-dashboard-grid');
const provostDashboardGrid = document.querySelector('.provost-dashboard-grid');
const dashboardForm = document.getElementById('dashboardForm');
const commanderDashboardForm = document.getElementById('commanderDashboardForm');
const provostDashboardForm = document.getElementById('provostDashboardForm');
const commanderModal = document.getElementById('commanderModal');
const commanderClose = document.getElementById('commanderClose');
const commanderDashboardModal = document.getElementById('commanderDashboardModal');
const provostModal = document.getElementById('provostModal');
const provostClose = document.getElementById('provostClose');
const provostDashboardModal = document.getElementById('provostDashboardModal');
const commanderForm = document.getElementById('commanderForm');
const commanderEmail = document.getElementById('commanderEmail');
const commanderPassword = document.getElementById('commanderPassword');
const commanderVerify = document.getElementById('commanderVerify');
const commanderNotice = document.getElementById('commanderNotice');
const provostForm = document.getElementById('provostForm');
const provostEmail = document.getElementById('provostEmail');
const provostPassword = document.getElementById('provostPassword');
const provostPicture = document.getElementById('provostPicture');
const provostVerify = document.getElementById('provostVerify');
const provostNotice = document.getElementById('provostNotice');
const commanderDashboardClose = document.getElementById('commanderDashboardClose');
const provostDashboardClose = document.getElementById('provostDashboardClose');
const commanderTrigger = document.querySelectorAll('.commander-trigger');
const provostTrigger = document.querySelectorAll('.provost-trigger');
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
const provostAccounts = JSON.parse(localStorage.getItem('royalShepherdProvostAccounts') || 'null') || {};
const captainRequests = JSON.parse(localStorage.getItem('royalShepherdCaptainRequests') || 'null') || {};
const provostRequests = JSON.parse(localStorage.getItem('royalShepherdProvostRequests') || 'null') || {};
const commanderSettings = JSON.parse(localStorage.getItem('royalShepherdCommanderSettings') || 'null') || {
  exco: {
    pro: '',
    proPhoto: '',
    secBandMaster1: '',
    secBandMaster1Photo: '',
    secBandMaster2: '',
    secBandMaster2Photo: '',
    treasurer: '',
    treasurerPhoto: ''
  }
};
const provostSettings = JSON.parse(localStorage.getItem('royalShepherdProvostSettings') || 'null') || {
  email: '',
  password: ''
};
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

function openProvostModal() {
  provostModal.classList.add('active');
  provostModal.setAttribute('aria-hidden', 'false');
}

function closeProvostModal() {
  provostModal.classList.remove('active');
  provostModal.setAttribute('aria-hidden', 'true');
}

function openProvostDashboard() {
  provostDashboardModal.classList.add('active');
  provostDashboardModal.setAttribute('aria-hidden', 'false');
  buildProvostDashboard();
}

function closeProvostDashboard() {
  provostDashboardModal.classList.remove('active');
  provostDashboardModal.setAttribute('aria-hidden', 'true');
}

function buildCommanderDashboard() {
  if (!commanderDashboardGrid) return;
  commanderDashboardGrid.innerHTML = '';

  const excoCard = document.createElement('div');
  excoCard.className = 'dashboard-card';
  excoCard.innerHTML = `
    <h4>EXCO Assignments</h4>
    <p class="dashboard-intro">Only the Divisional Commander can assign or update the EXCO team.</p>
    <label>
      <span>Public Relations Officer (PRO)</span>
      <input type="text" name="exco-pro" value="${commanderSettings.exco.pro || ''}" />
    </label>
    <label>
      <span>PRO Picture URL</span>
      <input type="url" name="exco-pro-photo" value="${commanderSettings.exco.proPhoto || ''}" placeholder="https://example.com/pro-photo.jpg" />
    </label>
    <label>
      <span>Secretary Band Master 1</span>
      <input type="text" name="exco-secBandMaster1" value="${commanderSettings.exco.secBandMaster1 || ''}" />
    </label>
    <label>
      <span>Secretary Band Master 1 Picture URL</span>
      <input type="url" name="exco-secBandMaster1-photo" value="${commanderSettings.exco.secBandMaster1Photo || ''}" placeholder="https://example.com/sec1-photo.jpg" />
    </label>
    <label>
      <span>Secretary Band Master 2</span>
      <input type="text" name="exco-secBandMaster2" value="${commanderSettings.exco.secBandMaster2 || ''}" />
    </label>
    <label>
      <span>Secretary Band Master 2 Picture URL</span>
      <input type="url" name="exco-secBandMaster2-photo" value="${commanderSettings.exco.secBandMaster2Photo || ''}" placeholder="https://example.com/sec2-photo.jpg" />
    </label>
    <label>
      <span>Treasurer</span>
      <input type="text" name="exco-treasurer" value="${commanderSettings.exco.treasurer || ''}" />
    </label>
    <label>
      <span>Treasurer Picture URL</span>
      <input type="url" name="exco-treasurer-photo" value="${commanderSettings.exco.treasurerPhoto || ''}" placeholder="https://example.com/treasurer-photo.jpg" />
    </label>
  `;
  commanderDashboardGrid.appendChild(excoCard);

  const requestCard = document.createElement('div');
  requestCard.className = 'dashboard-card';
  requestCard.innerHTML = `
    <h4>Pending Account Creation Requests</h4>
    <p class="dashboard-intro">Approve or deny captain and provost creation requests submitted by members. Only the Divisional Commander can complete this step.</p>
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

  Object.entries(provostRequests).forEach(([email, request]) => {
    pendingRequests.push({
      key: `provost-${email}`,
      title: `Provost Request: ${email}`,
      body: 'Provost account creation request',
      type: 'provost',
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

function buildProvostDashboard() {
  if (!provostDashboardGrid) return;
  provostDashboardGrid.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'dashboard-card';
  card.innerHTML = `
    <h4>Provost Department Account</h4>
    <label>
      <span>Gmail Address</span>
      <input type="email" name="provost-dashboard-email" value="${provostSettings.email || ''}" required />
    </label>
    <label>
      <span>Password</span>
      <input type="password" name="provost-dashboard-password" value="${provostSettings.password || ''}" required />
    </label>
    <label>
      <span>Notes</span>
      <textarea name="provost-dashboard-notes">${provostSettings.notes || ''}</textarea>
    </label>
  `;
  provostDashboardGrid.appendChild(card);
}

function closeAllModals() {
  closeModal();
  closeCaptainModal();
  closeDashboard();
  closeCommanderModal();
  closeCommanderDashboard();
  closeProvostModal();
  closeProvostDashboard();
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

  companyData[companyId] = {
    name: companyData[companyId]?.name || `Company ${companyId}`,
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

provostTrigger.forEach((trigger) => {
  trigger.addEventListener('click', openProvostModal);
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
  const pictureUrl = captainPicture.value.trim();
  const verified = captainVerify.checked;

  if (!email || !password || !companyId || !verified || (captainForm.dataset.mode === 'register' && !pictureUrl)) {
    captainNotice.textContent = 'Please complete all fields, include a picture URL for registration, and confirm your captain status.';
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
    captainRequests[email] = { password, companyId, pictureUrl, submittedAt: new Date().toISOString(), status: 'pending' };
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
  const verified = commanderVerify.checked;

  if (!email || !password || !verified) {
    commanderNotice.textContent = 'Please complete all fields and confirm your commander status.';
    commanderNotice.style.color = 'hsl(0, 70%, 60%)';
    return;
  }

  if (mode === 'register') {
    if (commanderAccounts[email]) {
      commanderNotice.textContent = 'This email already has commander access.';
      commanderNotice.style.color = 'hsl(0, 70%, 60%)';
      return;
    }
    commanderAccounts[email] = { password };
    localStorage.setItem('royalShepherdCommanderAccounts', JSON.stringify(commanderAccounts));
    commanderNotice.textContent = 'Commander account created. Please login to continue.';
    commanderNotice.style.color = 'var(--gold-400)';
    return;
  }

  const account = commanderAccounts[email];
  if (!account || account.password !== password) {
    commanderNotice.textContent = 'Invalid commander email or password.';
    commanderNotice.style.color = 'hsl(0, 70%, 60%)';
    return;
  }

  commanderNotice.textContent = 'Commander access granted. Opening commander dashboard.';
  commanderNotice.style.color = 'var(--gold-400)';
  closeCommanderModal();
  openCommanderDashboard();
});

provostForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const mode = provostForm.dataset.mode;
  const email = provostEmail.value.trim();
  const password = provostPassword.value.trim();
  const pictureUrl = provostPicture.value.trim();
  const verified = provostVerify.checked;

  if (!email || !password || !verified || (provostForm.dataset.mode === 'register' && !pictureUrl)) {
    provostNotice.textContent = 'Please complete all fields, include a picture URL for registration, and confirm your provost status.';
    provostNotice.style.color = 'hsl(0, 70%, 60%)';
    return;
  }

  if (mode === 'register') {
    if (provostAccounts[email]) {
      provostNotice.textContent = 'This Gmail already has provost access.';
      provostNotice.style.color = 'hsl(0, 70%, 60%)';
      return;
    }
    if (provostRequests[email]) {
      provostNotice.textContent = 'A creation request for this Gmail is already pending approval.';
      provostNotice.style.color = 'hsl(0, 70%, 60%)';
      return;
    }
    provostRequests[email] = { password, pictureUrl, submittedAt: new Date().toISOString(), status: 'pending' };
    localStorage.setItem('royalShepherdProvostRequests', JSON.stringify(provostRequests));
    provostNotice.textContent = 'Provost creation request submitted. Divisional Commander approval is required.';
    provostNotice.style.color = 'var(--gold-400)';
    return;
  }

  const account = provostAccounts[email];
  if (!account || account.password !== password) {
    provostNotice.textContent = 'Invalid provost email or password.';
    provostNotice.style.color = 'hsl(0, 70%, 60%)';
    return;
  }

  provostNotice.textContent = 'Provost access granted. Opening provost dashboard.';
  provostNotice.style.color = 'var(--gold-400)';
  closeProvostModal();
  openProvostDashboard();
});

commanderDashboardForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(commanderDashboardForm);

  commanderSettings.exco.pro = formData.get('exco-pro')?.toString().trim() || '';
  commanderSettings.exco.proPhoto = formData.get('exco-pro-photo')?.toString().trim() || '';
  commanderSettings.exco.secBandMaster1 = formData.get('exco-secBandMaster1')?.toString().trim() || '';
  commanderSettings.exco.secBandMaster1Photo = formData.get('exco-secBandMaster1-photo')?.toString().trim() || '';
  commanderSettings.exco.secBandMaster2 = formData.get('exco-secBandMaster2')?.toString().trim() || '';
  commanderSettings.exco.secBandMaster2Photo = formData.get('exco-secBandMaster2-photo')?.toString().trim() || '';
  commanderSettings.exco.treasurer = formData.get('exco-treasurer')?.toString().trim() || '';
  commanderSettings.exco.treasurerPhoto = formData.get('exco-treasurer-photo')?.toString().trim() || '';

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
  });

  localStorage.setItem('royalShepherdCommanderSettings', JSON.stringify(commanderSettings));
  localStorage.setItem('royalShepherdCompanies', JSON.stringify(companyData));
  renderCompanyLists();
  closeCommanderDashboard();
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
      const request = captainRequests[email];
      if (request) {
        captainAccounts[email] = { password: request.password, companyId: request.companyId, pictureUrl: request.pictureUrl };
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

  if (requestType === 'provost') {
    if (requestAction === 'approve') {
      const request = provostRequests[email];
      if (request) {
        provostAccounts[email] = { password: request.password, pictureUrl: request.pictureUrl };
        delete provostRequests[email];
        localStorage.setItem('royalShepherdProvostAccounts', JSON.stringify(provostAccounts));
        localStorage.setItem('royalShepherdProvostRequests', JSON.stringify(provostRequests));
      }
    }
    if (requestAction === 'deny') {
      delete provostRequests[email];
      localStorage.setItem('royalShepherdProvostRequests', JSON.stringify(provostRequests));
    }
  }

  buildCommanderDashboard();
});
provostDashboardForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(provostDashboardForm);
  provostSettings.email = formData.get('provost-dashboard-email')?.toString().trim() || '';
  provostSettings.password = formData.get('provost-dashboard-password')?.toString().trim() || '';
  provostSettings.notes = formData.get('provost-dashboard-notes')?.toString().trim() || '';
  localStorage.setItem('royalShepherdProvostSettings', JSON.stringify(provostSettings));
  closeProvostDashboard();
});

captainClose?.addEventListener('click', closeCaptainModal);
commanderClose?.addEventListener('click', closeCommanderModal);
commanderDashboardClose?.addEventListener('click', closeCommanderDashboard);
provostClose?.addEventListener('click', closeProvostModal);
provostDashboardClose?.addEventListener('click', closeProvostDashboard);

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
    } else if (provostDashboardModal?.classList.contains('active')) {
      closeProvostDashboard();
    } else if (captainModal.classList.contains('active')) {
      closeCaptainModal();
    } else if (commanderModal.classList.contains('active')) {
      closeCommanderModal();
    } else if (provostModal.classList.contains('active')) {
      closeProvostModal();
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
