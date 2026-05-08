// DOM Elements
console.log('Script loaded');
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const showLoginBtn = document.getElementById('show-login');
const showRegisterBtn = document.getElementById('show-register');
const showForgotBtn = document.getElementById('show-forgot');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotForm = document.getElementById('forgot-form');
const logoutButton = document.getElementById('logout-button');
const welcomeName = document.getElementById('welcome-name');
const messageElement = document.getElementById('message');

// Auth constants
const AUTH_TOKEN = 'jobhack_token';
const AUTH_USER = 'jobhack_user';
const RESUME_KEY = 'jobhack_resume';
const API_BASE_URL = 'https://jobhack-backend-app.vercel.app'; // Update this to your actual Vercel backend URL if different

// Form Elements
const fullName = document.getElementById('full-name');
const personalEmail = document.getElementById('personal-email');
const phone = document.getElementById('phone');
const countrySelect = document.getElementById('country-select');
const stateSelect = document.getElementById('state-select');
const citySelect = document.getElementById('city-select');
const linkedin = document.getElementById('linkedin');
const portfolio = document.getElementById('portfolio');
const summary = document.getElementById('summary');
const skillsSelect = document.getElementById('skills-select');
const addSkillBtn = document.getElementById('add-skill-btn');
const skillsContainer = document.getElementById('skills-container');
const addExperienceBtn = document.getElementById('add-experience-btn');
const experienceContainer = document.getElementById('experience-container');
const addEducationBtn = document.getElementById('add-education-btn');
const educationContainer = document.getElementById('education-container');
const addCertificationBtn = document.getElementById('add-certification-btn');
const certificationsContainer = document.getElementById('certifications-container');
const addProjectBtn = document.getElementById('add-project-btn');
const projectsContainer = document.getElementById('projects-container');
const addCustomSectionBtn = document.getElementById('add-custom-section-btn');
const customSectionsContainer = document.getElementById('custom-sections-container');
const themeSelect = document.getElementById('theme-select');
const saveButton = document.getElementById('save-resume-btn');
const loadBtn = document.getElementById('load-btn');
const pdfButton = document.getElementById('download-pdf-btn');
const previewElement = document.getElementById('preview');

// Dashboard Elements
const dashboardSection = document.getElementById('dashboard-section');
const dashboardBtn = document.getElementById('dashboard-btn');
const newResumeBtn = document.getElementById('new-resume-btn');
const resumesList = document.getElementById('resumes-list');

console.log('DOM elements loaded');

// Data for dropdowns
const countries = [
  { name: 'United States', code: 'US', states: ['California', 'Texas', 'New York', 'Florida'] },
  { name: 'Nigeria', code: 'NG', states: ['Lagos', 'Abuja', 'Kano', 'Rivers'] },
  { name: 'United Kingdom', code: 'GB', states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { name: 'Canada', code: 'CA', states: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'] },
  // Add more as needed
];

const skills = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin',
  'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel',
  'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS',
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
  'Git', 'Agile', 'Scrum', 'Project Management', 'Leadership',
  // Add more
];

// Populate dropdowns
const populateCountries = () => {
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });
};

const populateSkills = () => {
  skills.forEach(skill => {
    const option = document.createElement('option');
    option.value = skill;
    option.textContent = skill;
    skillsSelect.appendChild(option);
  });
};

const updateStates = () => {
  const selectedCountry = countries.find(c => c.code === countrySelect.value);
  stateSelect.innerHTML = '<option value="">Select State/Province</option>';
  citySelect.innerHTML = '<option value="">Select City</option>';
  citySelect.disabled = true;
  if (selectedCountry) {
    stateSelect.disabled = false;
    selectedCountry.states.forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  } else {
    stateSelect.disabled = true;
  }
};

const updateCities = () => {
  // For simplicity, add some cities based on state. In real app, use a full database.
  const cities = {
    'California': ['Los Angeles', 'San Francisco', 'San Diego'],
    'Texas': ['Houston', 'Dallas', 'Austin'],
    'New York': ['New York City', 'Buffalo', 'Albany'],
    'Florida': ['Miami', 'Orlando', 'Tampa'],
    'Lagos': ['Lagos City', 'Ikeja', 'Victoria Island'],
    'Abuja': ['Abuja City', 'Wuse', 'Maitama'],
    'Kano': ['Kano City'],
    'Rivers': ['Port Harcourt'],
    'England': ['London', 'Manchester', 'Birmingham'],
    'Scotland': ['Edinburgh', 'Glasgow'],
    'Wales': ['Cardiff'],
    'Northern Ireland': ['Belfast'],
    'Ontario': ['Toronto', 'Ottawa'],
    'Quebec': ['Montreal', 'Quebec City'],
    'British Columbia': ['Vancouver'],
    'Alberta': ['Calgary', 'Edmonton']
  };
  const selectedState = stateSelect.value;
  citySelect.innerHTML = '<option value="">Select City</option>';
  if (selectedState && cities[selectedState]) {
    citySelect.disabled = false;
    cities[selectedState].forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  } else {
    citySelect.disabled = true;
  }
};

// Initialize dropdowns
populateCountries();
populateSkills();

// Event listeners for location dropdowns
countrySelect.addEventListener('change', updateStates);
stateSelect.addEventListener('change', updateCities);

// Event listeners for skills
addSkillBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'skill-input';
  input.placeholder = 'Enter custom skill';
  skillsContainer.appendChild(input);
  input.focus();
});

// Auth Tab Switching
const setActiveTab = (tab) => {
  console.log('Setting active tab:', tab);
  loginForm.classList.toggle('hidden', tab !== 'login');
  registerForm.classList.toggle('hidden', tab !== 'register');
  forgotForm.classList.toggle('hidden', tab !== 'forgot');
  showLoginBtn.classList.toggle('active', tab === 'login');
  showRegisterBtn.classList.toggle('active', tab === 'register');
  showForgotBtn.classList.toggle('active', tab === 'forgot');
};
const resumeThemes = {
  'modern-clean': {
    name: 'Modern Clean',
    cssClass: 'theme-modern-clean',
  },
  'elegant-minimal': {
    name: 'Elegant Minimal',
    cssClass: 'theme-elegant-minimal',
  },
  'bold-professional': {
    name: 'Bold Professional',
    cssClass: 'theme-bold-professional',
  },
  'tech-forward': {
    name: 'Tech Forward',
    cssClass: 'theme-tech-forward',
  },
  'creative-edge': {
    name: 'Creative Edge',
    cssClass: 'theme-creative-edge',
  },
  'luxury-dark': {
    name: 'Luxury Dark',
    cssClass: 'theme-luxury-dark',
  },
  'corporate-blue': {
    name: 'Corporate Blue',
    cssClass: 'theme-corporate-blue',
  },
  'creative-colorful': {
    name: 'Creative Colorful',
    cssClass: 'theme-creative-colorful',
  },
  'minimalist-gray': {
    name: 'Minimalist Gray',
    cssClass: 'theme-minimalist-gray',
  },
  'sophisticated-serif': {
    name: 'Sophisticated Serif',
    cssClass: 'theme-sophisticated-serif',
  },
  'startup-vibes': {
    name: 'Startup Vibes',
    cssClass: 'theme-startup-vibes',
  },
  'academic-formal': {
    name: 'Academic Formal',
    cssClass: 'theme-academic-formal',
  },
  'modern-gradient': {
    name: 'Modern Gradient',
    cssClass: 'theme-modern-gradient',
  },
  'executive-black': {
    name: 'Executive Black',
    cssClass: 'theme-executive-black',
  },
  'nature-green': {
    name: 'Nature Green',
    cssClass: 'theme-nature-green',
  },
  'retro-vintage': {
    name: 'Retro Vintage',
    cssClass: 'theme-retro-vintage',
  }
};

// Application State
let currentTheme = localStorage.getItem('jobhack_theme') || 'modern-clean';
let resumeData = {
  personalInfo: {},
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  customSections: []
};

// Utility Functions
const showMessage = (text, success = true) => {
  messageElement.textContent = text;
  messageElement.style.color = success ? '#0f5132' : '#b91c1c';
  setTimeout(() => {
    messageElement.textContent = '';
  }, 4000);
};

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN);
const setAuthSession = (token, user) => {
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(AUTH_USER, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_USER);
};

const getUser = () => {
  const raw = localStorage.getItem(AUTH_USER);
  return raw ? JSON.parse(raw) : null;
};

const getSaveKey = () => {
  const user = getUser();
  return user ? `${RESUME_KEY}_${user.id}` : RESUME_KEY;
};

const clearFormBlocks = () => {
  skillsContainer.innerHTML = '';
  experienceContainer.innerHTML = '';
  educationContainer.innerHTML = '';
  certificationsContainer.innerHTML = '';
  projectsContainer.innerHTML = '';
  customSectionsContainer.innerHTML = '';
};

const ensureDefaultBlocks = () => {
  if (!skillsContainer.children.length) {
    skillsContainer.appendChild(createSkillInput());
  }
  if (!experienceContainer.children.length) {
    experienceContainer.appendChild(createExperienceBlock());
  }
  if (!educationContainer.children.length) {
    educationContainer.appendChild(createEducationBlock());
  }
  if (!certificationsContainer.children.length) {
    certificationsContainer.appendChild(createCertificationBlock());
  }
  if (!projectsContainer.children.length) {
    projectsContainer.appendChild(createProjectBlock());
  }
};

const fetchResumeData = async () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/resume`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

// Dynamic Section Handlers
const createSkillInput = (value = '') => {
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `
    <input type="text" class="skill-input" placeholder="e.g., Project Management" value="${value}" />
    <button type="button" class="button-remove">✕</button>
  `;
  return div;
};

const createExperienceBlock = (data = {}) => {
  const div = document.createElement('div');
  div.className = 'dynamic-item experience-block';
  div.innerHTML = `
    <div class="form-row">
      <div class="form-col">
        <label>Job Title</label>
        <input type="text" class="exp-title" placeholder="Senior Manager" value="${data.title || ''}" />
      </div>
      <div class="form-col">
        <label>Company</label>
        <input type="text" class="exp-company" placeholder="Acme Corp" value="${data.company || ''}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-col">
        <label>Location</label>
        <input type="text" class="exp-location" placeholder="Lagos, Nigeria" value="${data.location || ''}" />
      </div>
      <div class="form-col">
        <label>Start Date</label>
        <input type="date" class="exp-start-date" value="${data.startDate || ''}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-col">
        <label>End Date</label>
        <input type="date" class="exp-end-date" value="${data.endDate || ''}" />
      </div>
      <div class="form-col">
        <label>Current Position</label>
        <input type="checkbox" class="exp-current" ${data.current ? 'checked' : ''} />
      </div>
    </div>
    <label>Description / Achievements</label>
    <textarea class="exp-description" rows="3" placeholder="• Achievement 1\n• Achievement 2">${data.description || ''}</textarea>
    <button type="button" class="button-remove">✕ Remove</button>
  `;
  return div;
};

const createEducationBlock = (data = {}) => {
  const div = document.createElement('div');
  div.className = 'dynamic-item education-block';
  div.innerHTML = `
    <div class="form-row">
      <div class="form-col">
        <label>Degree</label>
        <select class="edu-degree">
          <option value="">Select Degree</option>
          <option value="High School Diploma" ${data.degree === 'High School Diploma' ? 'selected' : ''}>High School Diploma</option>
          <option value="Associate Degree" ${data.degree === 'Associate Degree' ? 'selected' : ''}>Associate Degree</option>
          <option value="Bachelor's Degree" ${data.degree === "Bachelor's Degree" ? 'selected' : ''}>Bachelor's Degree</option>
          <option value="Master's Degree" ${data.degree === "Master's Degree" ? 'selected' : ''}>Master's Degree</option>
          <option value="Doctorate" ${data.degree === 'Doctorate' ? 'selected' : ''}>Doctorate</option>
          <option value="Certificate" ${data.degree === 'Certificate' ? 'selected' : ''}>Certificate</option>
          <option value="Other" ${data.degree === 'Other' ? 'selected' : ''}>Other</option>
        </select>
      </div>
      <div class="form-col">
        <label>Field of Study</label>
        <input type="text" class="edu-field" placeholder="Computer Science" value="${data.field || ''}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-col">
        <label>Institution</label>
        <input type="text" class="edu-institution" placeholder="University Name" value="${data.institution || ''}" />
      </div>
      <div class="form-col">
        <label>Graduation Date</label>
        <input type="date" class="edu-graduation" value="${data.graduation || ''}" />
      </div>
    </div>
    <button type="button" class="button-remove">✕ Remove</button>
  `;
  return div;
};

const createCertificationBlock = (data = {}) => {
  const div = document.createElement('div');
  div.className = 'dynamic-item cert-block';
  div.innerHTML = `
    <div class="form-row">
      <div class="form-col">
        <label>Certification Name</label>
        <input type="text" class="cert-name" placeholder="Google Cloud Certification" value="${data.name || ''}" />
      </div>
      <div class="form-col">
        <label>Issuing Organization</label>
        <input type="text" class="cert-org" placeholder="Google" value="${data.org || ''}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-col">
        <label>Issue Date</label>
        <input type="date" class="cert-date" value="${data.date || ''}" />
      </div>
      <div class="form-col">
        <label>Credential ID (optional)</label>
        <input type="text" class="cert-id" placeholder="ABC123XYZ" value="${data.id || ''}" />
      </div>
    </div>
    <button type="button" class="button-remove">✕ Remove</button>
  `;
  return div;
};

const createProjectBlock = (data = {}) => {
  const div = document.createElement('div');
  div.className = 'dynamic-item project-block';
  div.innerHTML = `
    <div class="form-row">
      <div class="form-col">
        <label>Project Title</label>
        <input type="text" class="proj-title" placeholder="E-Commerce Platform" value="${data.title || ''}" />
      </div>
      <div class="form-col">
        <label>Technologies</label>
        <input type="text" class="proj-tech" placeholder="React, Node.js, MongoDB" value="${data.tech || ''}" />
      </div>
    </div>
    <label>Project Description</label>
    <textarea class="proj-description" rows="3" placeholder="Describe your role and the impact of the project">${data.description || ''}</textarea>
    <button type="button" class="button-remove">✕ Remove</button>
  `;
  return div;
};

const createCustomSectionBlock = (data = {}) => {
  const div = document.createElement('div');
  div.className = 'dynamic-item custom-section-block';
  div.innerHTML = `
    <div class="form-row">
      <div class="form-col">
        <label>Section Title</label>
        <input type="text" class="custom-title" placeholder="e.g., Languages, Awards, Volunteer Work" value="${data.title || ''}" />
      </div>
    </div>
    <label>Section Content</label>
    <textarea class="custom-content" rows="4" placeholder="Add your content here">${data.content || ''}</textarea>
    <button type="button" class="button-remove">✕ Remove</button>
  `;
  return div;
};

// Event Delegation for Remove Buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('button-remove')) {
    e.preventDefault();
    e.target.closest('.dynamic-item').remove();
    renderPreview();
  }
});

// Add Event Listeners
addSkillBtn.addEventListener('click', (e) => {
  e.preventDefault();
  skillsContainer.appendChild(createSkillInput());
  renderPreview();
});

addExperienceBtn.addEventListener('click', (e) => {
  e.preventDefault();
  experienceContainer.appendChild(createExperienceBlock());
  renderPreview();
});

addEducationBtn.addEventListener('click', (e) => {
  e.preventDefault();
  educationContainer.appendChild(createEducationBlock());
  renderPreview();
});

addCertificationBtn.addEventListener('click', (e) => {
  e.preventDefault();
  certificationsContainer.appendChild(createCertificationBlock());
  renderPreview();
});

addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  projectsContainer.appendChild(createProjectBlock());
  renderPreview();
});

addCustomSectionBtn.addEventListener('click', (e) => {
  e.preventDefault();
  customSectionsContainer.appendChild(createCustomSectionBlock());
  renderPreview();
});

// Build Resume Data from Form
const buildResumeData = () => {
  const skills = Array.from(document.querySelectorAll('#skills-select option:checked'))
    .map(option => option.value)
    .filter(Boolean);

  const experience = Array.from(document.querySelectorAll('.experience-block')).map(block => ({
    title: block.querySelector('.exp-title').value,
    company: block.querySelector('.exp-company').value,
    location: block.querySelector('.exp-location').value,
    startDate: block.querySelector('.exp-start-date').value,
    endDate: block.querySelector('.exp-end-date').value,
    current: block.querySelector('.exp-current').checked,
    description: block.querySelector('.exp-description').value
  }));

  const education = Array.from(document.querySelectorAll('.education-block')).map(block => ({
    degree: block.querySelector('.edu-degree').value,
    field: block.querySelector('.edu-field').value,
    institution: block.querySelector('.edu-institution').value,
    graduation: block.querySelector('.edu-graduation').value
  }));

  const certifications = Array.from(document.querySelectorAll('.cert-block')).map(block => ({
    name: block.querySelector('.cert-name').value,
    org: block.querySelector('.cert-org').value,
    date: block.querySelector('.cert-date').value,
    id: block.querySelector('.cert-id').value
  }));

  const projects = Array.from(document.querySelectorAll('.project-block')).map(block => ({
    title: block.querySelector('.proj-title').value,
    tech: block.querySelector('.proj-tech').value,
    description: block.querySelector('.proj-description').value
  }));

  const customSections = Array.from(document.querySelectorAll('.custom-section-block')).map(block => ({
    title: block.querySelector('.custom-title').value,
    content: block.querySelector('.custom-content').value
  }));

  return {
    personalInfo: {
      fullName: fullName.value.trim(),
      email: personalEmail.value.trim(),
      phone: phone.value.trim(),
      country: countrySelect.value,
      state: stateSelect.value,
      city: citySelect.value,
      linkedin: linkedin.value.trim(),
      portfolio: portfolio.value.trim(),
      summary: summary.value.trim()
    },
    skills,
    experience,
    education,
    certifications,
    projects,
    customSections
  };
};

// Render Preview
const renderPreview = () => {
  const data = buildResumeData();
  const { personalInfo, skills, experience, education, certifications, projects, customSections } = data;

  let html = `
    <article class="resume-document" data-theme="${currentTheme}">
      <div class="resume-header">
        <h1 class="resume-name">${personalInfo.fullName || 'Your Name'}</h1>
        <div class="resume-contact">
          ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
          ${(personalInfo.city || personalInfo.state || personalInfo.country) ? `<span>${[personalInfo.city, personalInfo.state, personalInfo.country].filter(Boolean).join(', ')}</span>` : ''}
        </div>
        <div class="resume-links">
          ${personalInfo.linkedin ? `<span><a href="${personalInfo.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
          ${personalInfo.portfolio ? `<span><a href="${personalInfo.portfolio}" target="_blank">Portfolio</a></span>` : ''}
        </div>
      </div>
  `;

  if (personalInfo.summary) {
    html += `
      <div class="resume-section">
        <h3 class="section-title">Professional Summary</h3>
        <p class="section-content">${personalInfo.summary}</p>
      </div>
    `;
  }

  if (skills.length > 0) {
    html += `
      <div class="resume-section">
        <h3 class="section-title">Core Skills</h3>
        <div class="skills-display">
          ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
    `;
  }

  if (experience.length > 0) {
    html += `
      <div class="resume-section">
        <h3 class="section-title">Work Experience</h3>
        ${experience.map(exp => {
          const start = exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
          const end = exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '');
          const duration = start && end ? `${start} - ${end}` : '';
          return `
          <div class="experience-item">
            <div class="experience-header">
              <h4>${exp.title || 'Job Title'}</h4>
              <span class="duration">${duration}</span>
            </div>
            <div class="company-info">${exp.company}${exp.location ? ` • ${exp.location}` : ''}</div>
            ${exp.description ? `<div class="experience-desc">${exp.description}</div>` : ''}
          </div>
        `}).join('')}
      </div>
    `;
  }

  if (education.length > 0) {
    html += `
      <div class="resume-section">
        <h3 class="section-title">Education</h3>
        ${education.map(edu => {
          const grad = edu.graduation ? new Date(edu.graduation).getFullYear() : '';
          return `
          <div class="education-item">
            <div class="education-header">
              <h4>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</h4>
              <span class="year">${grad}</span>
            </div>
            <div class="institution">${edu.institution || ''}</div>
          </div>
        `}).join('')}
      </div>
    `;
  }

  if (certifications.length > 0) {
    html += `
      <div class="resume-section">
        <h3 class="section-title">Certifications</h3>
        ${certifications.map(cert => `
          <div class="certification-item">
            <h4>${cert.name}</h4>
            <div class="cert-details">${cert.org}${cert.date ? ` • ${cert.date}` : ''}${cert.id ? ` • ID: ${cert.id}` : ''}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (projects.length > 0) {
    html += `
      <div class="resume-section">
        <h3 class="section-title">Projects</h3>
        ${projects.map(proj => `
          <div class="project-item">
            <div class="project-header">
              <h4>${proj.title}</h4>
              <span class="tech">${proj.tech || ''}</span>
            </div>
            ${proj.description ? `<div class="project-desc">${proj.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Custom sections
  customSections.forEach(section => {
    if (section.title && section.content) {
      html += `
        <div class="resume-section">
          <h3 class="section-title">${section.title}</h3>
          <div class="section-content">${section.content}</div>
        </div>
      `;
    }
  });

  html += '</article>';
  previewElement.innerHTML = html;
};

// Save and Load
const saveResumeData = async () => {
  const data = buildResumeData();
  localStorage.setItem(getSaveKey(), JSON.stringify(data));

  if (getAuthToken()) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        showMessage('Saved locally, but sync failed. Please try again.', false);
        return;
      }

      showMessage('✓ Resume saved and synced to your account.', true);
      return;
    } catch (error) {
      showMessage('Saved locally, but sync failed. Check your connection.', false);
      return;
    }
  }

  showMessage('✓ Resume saved locally. Sign in to sync across devices.', true);
};

const loadResumeData = async () => {
  clearFormBlocks();

  let data = null;
  const localRaw = localStorage.getItem(getSaveKey());
  if (localRaw) {
    data = JSON.parse(localRaw);
  }

  if (getAuthToken()) {
    const serverData = await fetchResumeData();
    if (serverData && serverData.length > 0) {
      data = serverData[0]; // Load first resume for now
    }
  }

  if (data?.personalInfo) {
    fullName.value = data.personalInfo.fullName || '';
    personalEmail.value = data.personalInfo.email || '';
    phone.value = data.personalInfo.phone || '';
    countrySelect.value = data.personalInfo.country || '';
    updateStates();
    stateSelect.value = data.personalInfo.state || '';
    updateCities();
    citySelect.value = data.personalInfo.city || '';
    linkedin.value = data.personalInfo.linkedin || '';
    portfolio.value = data.personalInfo.portfolio || '';
    summary.value = data.personalInfo.summary || '';
  }

  if (data?.skills?.length > 0) {
    data.skills.forEach(skill => {
      const option = Array.from(skillsSelect.options).find(opt => opt.value === skill);
      if (option) option.selected = true;
    });
  }

  if (data?.experience?.length > 0) {
    data.experience.forEach(exp => {
      experienceContainer.appendChild(createExperienceBlock(exp));
    });
  }

  if (data?.education?.length > 0) {
    data.education.forEach(edu => {
      educationContainer.appendChild(createEducationBlock(edu));
    });
  }

  if (data?.certifications?.length > 0) {
    data.certifications.forEach(cert => {
      certificationsContainer.appendChild(createCertificationBlock(cert));
    });
  }

  if (data?.projects?.length > 0) {
    data.projects.forEach(proj => {
      projectsContainer.appendChild(createProjectBlock(proj));
    });
  }

  if (data?.customSections?.length > 0) {
    data.customSections.forEach(section => {
      customSectionsContainer.appendChild(createCustomSectionBlock(section));
    });
  }

  ensureDefaultBlocks();
  renderPreview();
};

const loadResumeDataFromObject = (data) => {
  clearFormBlocks();

  if (data?.personalInfo) {
    fullName.value = data.personalInfo.fullName || '';
    personalEmail.value = data.personalInfo.email || '';
    phone.value = data.personalInfo.phone || '';
    countrySelect.value = data.personalInfo.country || '';
    updateStates();
    stateSelect.value = data.personalInfo.state || '';
    updateCities();
    citySelect.value = data.personalInfo.city || '';
    linkedin.value = data.personalInfo.linkedin || '';
    portfolio.value = data.personalInfo.portfolio || '';
    summary.value = data.personalInfo.summary || '';
  }

  if (data?.skills?.length > 0) {
    data.skills.forEach(skill => {
      const option = Array.from(skillsSelect.options).find(opt => opt.value === skill);
      if (option) option.selected = true;
    });
  }

  if (data?.experience?.length > 0) {
    data.experience.forEach(exp => {
      experienceContainer.appendChild(createExperienceBlock(exp));
    });
  }

  if (data?.education?.length > 0) {
    data.education.forEach(edu => {
      educationContainer.appendChild(createEducationBlock(edu));
    });
  }

  if (data?.certifications?.length > 0) {
    data.certifications.forEach(cert => {
      certificationsContainer.appendChild(createCertificationBlock(cert));
    });
  }

  if (data?.projects?.length > 0) {
    data.projects.forEach(proj => {
      projectsContainer.appendChild(createProjectBlock(proj));
    });
  }

  if (data?.customSections?.length > 0) {
    data.customSections.forEach(section => {
      customSectionsContainer.appendChild(createCustomSectionBlock(section));
    });
  }

  ensureDefaultBlocks();
  renderPreview();
};

// Theme Management
const setTheme = (themeName) => {
  currentTheme = themeName;
  localStorage.setItem('jobhack_theme', themeName);
  previewElement.className = `resume-preview ${resumeThemes[themeName].cssClass}`;
  renderPreview();
};

themeSelect.addEventListener('change', (e) => {
  setTheme(e.target.value);
});

// Auth Handlers
const toggleAuthView = async (authenticated) => {
  authSection.classList.toggle('hidden', authenticated);
  appSection.classList.toggle('hidden', !authenticated);
  if (authenticated) {
    const user = getUser();
    welcomeName.textContent = `${user?.name || 'Resume Studio'}`;
    await loadResumeData();
    setTheme(currentTheme);
  }
};

const setAuthState = async () => {
  const token = getAuthToken();
  if (!token) {
    toggleAuthView(false);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      clearSession();
      toggleAuthView(false);
      return;
    }
    const user = await response.json();
    setAuthSession(token, user);
    toggleAuthView(true);
  } catch (error) {
    clearSession();
    toggleAuthView(false);
  }
};

showLoginBtn.addEventListener('click', () => setActiveTab('login'));
showRegisterBtn.addEventListener('click', () => setActiveTab('register'));
showForgotBtn.addEventListener('click', () => setActiveTab('forgot'));

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    if (!response.ok) {
      showMessage(result.error || 'Sign in failed.', false);
      return;
    }

    setAuthSession(result.token, result.user);
    setAuthState();
  } catch (error) {
    showMessage('Unable to connect. Check your network.', false);
  }
});

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');

  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;

  if (password !== passwordConfirm) {
    showMessage('Passwords do not match.', false);
    return;
  }

  if (password.length < 8) {
    showMessage('Password must be at least 8 characters.', false);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const result = await response.json();
    if (!response.ok) {
      showMessage(result.error || 'Account creation failed.', false);
      return;
    }

    setAuthSession(result.token, result.user);
    setAuthState();
  } catch (error) {
    showMessage('Unable to connect. Check your network.', false);
  }
});

forgotForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');

  const email = document.getElementById('forgot-email').value.trim();

  try {
    showMessage('Sending password reset link to ' + email + '...', true);
    // Note: Password reset functionality requires backend support
    // For now, show a placeholder message
    setTimeout(() => {
      showMessage('Check your email for password reset instructions.', true);
      setActiveTab('login');
    }, 1500);
  } catch (error) {
    showMessage('Unable to process request. Check your network.', false);
  }
});

const showDashboard = () => {
  appSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  loadResumesList();
};

const showBuilder = () => {
  dashboardSection.classList.add('hidden');
  appSection.classList.remove('hidden');
};

const loadResumesList = async () => {
  resumesList.innerHTML = '<p>Loading...</p>';
  try {
    const resumes = await fetchResumeData();
    if (!resumes || resumes.length === 0) {
      resumesList.innerHTML = '<p>No resumes yet. Create your first one!</p>';
      return;
    }
    resumesList.innerHTML = resumes.map((resume, index) => `
      <div class="resume-card">
        <h3>${resume.personalInfo?.fullName || 'Untitled Resume'}</h3>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        <button class="button button-primary load-resume" data-index="${index}">Edit</button>
        <button class="button button-secondary delete-resume" data-index="${index}">Delete</button>
      </div>
    `).join('');
  } catch (error) {
    resumesList.innerHTML = '<p>Failed to load resumes.</p>';
  }
};

logoutButton.addEventListener('click', () => {
  clearSession();
  toggleAuthView(false);
  loginForm.reset();
  registerForm.reset();
});

dashboardBtn.addEventListener('click', showDashboard);
newResumeBtn.addEventListener('click', () => {
  clearFormBlocks();
  showBuilder();
});

resumesList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('load-resume')) {
    const index = e.target.dataset.index;
    const resumes = await fetchResumeData();
    if (resumes && resumes[index]) {
      loadResumeDataFromObject(resumes[index]);
      showBuilder();
    }
  } else if (e.target.classList.contains('delete-resume')) {
    // For now, just alert
    alert('Delete not implemented yet');
  }
});

saveButton.addEventListener('click', async (event) => {
  event.preventDefault();
  await saveResumeData();
});

pdfButton.addEventListener('click', (event) => {
  event.preventDefault();
  const resumeDocument = document.querySelector('.resume-document');
  if (!resumeDocument) return;

  const name = fullName.value.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'JOBHACK_Resume';
  const options = {
    margin: 12,
    filename: `${name}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(resumeDocument).save();
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  setActiveTab('login');
  themeSelect.value = currentTheme;
  setAuthState();
});

// Form Input Listeners (after functions are defined)
[fullName, personalEmail, phone, countrySelect, stateSelect, citySelect, linkedin, portfolio, summary].forEach(input => {
  input.addEventListener('input', renderPreview);
});
