import skillsHtml from './data/skills.js';
import { experience, leadership } from './data/experience.js';
import projects from './data/projects.js';

// Modern ES6+ JavaScript with proper error handling and pagination
class PortfolioApp {
  constructor() {
    this.projects = projects;
    this.filteredProjects = [];
    this.currentPage = 1;
    this.projectsPerPage = 9;
    this.activeFilter = 'all';
    this.availableFilters = ['all', 'frontend', 'backend', 'mobile', 'database', 'ai-ml', 'other'];
    this.filterMapping = {
      'all': 'All Projects',
      'frontend': ['React', 'Next.js', 'React Native', 'Vite', 'THREE.js', 'GSAP', 'Blender', 'CorelDRAW'],
      'backend': ['Node.js', 'Django', 'Python', 'Express', 'NestJS', 'Laravel', 'PHP', 'DRF', 'FastAPI'],
      'mobile': ['Flutter', 'React Native', 'Dart', 'Firebase', 'ArcCloud', 'JWT', 'Cloudinary', 'Shared Preferences', 'Rx Shared Preferences'],
      'database': ['PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'SQL Server'],
      'ai-ml': ['Machine Learning', 'Deep Learning', 'OpenCV', 'scikit-image', 'Google Gemini', 'CustomTkinter'],
      'other': ['Go', 'C#', 'TypeScript', 'MCP', 'CLI', 'Visual Basic']
    };
    this.filterDisplayNames = {
      'all': 'All Projects',
      'frontend': 'Frontend',
      'backend': 'Backend',
      'mobile': 'Mobile',
      'database': 'Database',
      'ai-ml': 'AI/ML',
      'other': 'Other'
    };
    this.init();
  }

  init() {
    this.renderExperience();
    this.renderLeadership();
    this.renderSkills();
    this.setupEventListeners();
    this.initializeAccessibility();
    this.initializeFiltering();
    this.initializePagination();
    this.initializeSkillsTabs();
  }

  setupEventListeners() {
    // Use modern event delegation
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleClick(event) {
    const { target } = event;

    // Handle hamburger menu toggle
    const hamburgerIcon = target.closest('#hamburger-icon');
    if (hamburgerIcon) {
      this.toggleMenu();
      return;
    }

    // Handle menu backdrop click
    if (target.id === 'menu-backdrop') {
      this.closeMenu();
      return;
    }

    // Handle menu link clicks (to close the menu after navigating)
    if (target.closest('.menu-links a')) {
      this.closeMenu();
    }

    // Handle modal close buttons
    if (target.classList.contains('modal-close')) {
      const modal = target.closest('.modal');
      if (modal) {
        this.closeModal(modal.id);
      }
      return;
    }

    // Handle modal backdrop clicks
    if (target.classList.contains('modal')) {
      this.closeModal(target.id);
      return;
    }

    // Handle "View More" buttons
    if (target.classList.contains('project-btn') && target.textContent.includes('View More')) {
      const modalId = target.getAttribute('onclick')?.match(/openModal\('([^']+)'\)/)?.[1];
      if (modalId) {
        this.openModal(modalId);
      }
      return;
    }

    // Handle clicking anywhere on the project card to view more
    const projectCard = target.closest('.project-card');
    if (projectCard && !target.closest('.project-btn')) {
      const viewMoreBtn = projectCard.querySelector('.project-btn[onclick*="openModal"]');
      if (viewMoreBtn) {
        const modalId = viewMoreBtn.getAttribute('onclick')?.match(/openModal\('([^']+)'\)/)?.[1];
        if (modalId) {
          this.openModal(modalId);
        }
      }
    }
  }

  toggleMenu() {
    const menu = document.getElementById('menu-drawer');
    const icon = document.getElementById('hamburger-icon');
    const backdrop = document.getElementById('menu-backdrop');
    const menuLinks = document.getElementById('menu-links');

    if (menu && icon && backdrop) {
      menu.classList.toggle('open');
      icon.classList.toggle('open');
      backdrop.classList.toggle('open');
      
      const isOpen = menu.classList.contains('open');
      icon.setAttribute('aria-expanded', isOpen.toString());
      if (menuLinks) {
        menuLinks.setAttribute('aria-expanded', isOpen.toString());
      }
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }
  }

  closeMenu() {
    const menu = document.getElementById('menu-drawer');
    const icon = document.getElementById('hamburger-icon');
    const backdrop = document.getElementById('menu-backdrop');
    const menuLinks = document.getElementById('menu-links');

    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      if (icon) icon.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      
      if (icon) icon.setAttribute('aria-expanded', 'false');
      if (menuLinks) menuLinks.setAttribute('aria-expanded', 'false');
      
      document.body.style.overflow = 'auto';
    }
  }

  handleKeydown(event) {
    // Handle escape key for modals
    if (event.key === 'Escape') {
      this.closeAllModals();
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with ID "${modalId}" not found`);
      return;
    }

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus management for accessibility
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.focus();
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal with ID "${modalId}" not found`);
      return;
    }

    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  closeAllModals() {
    const openModals = document.querySelectorAll('.modal[style*="flex"]');
    openModals.forEach(modal => {
      this.closeModal(modal.id);
    });
  }


  renderSkills() {
    const container = document.getElementById('skillsContentContainer');
    if (!container) return;
    
    let html = '';
    for (const [tab, content] of Object.entries(skillsHtml)) {
      const activeClass = tab === 'frontend' ? ' active' : '';
      html += `<div class="tab-content${activeClass}" id="${tab}">\n${content}\n</div>\n`;
    }
    container.innerHTML = html;
  }

  renderExperience() {
    const container = document.getElementById('experienceTimeline');
    if (!container) return;
    
    container.innerHTML = experience.map(exp => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3>${exp.company}</h3>
              <span class="timeline-date">${exp.date}</span>
            </div>
            <span class="timeline-role">${exp.role}</span>
            <ul class="timeline-responsibilities">
              ${exp.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>
    `).join('');
  }

  renderLeadership() {
    const container = document.getElementById('leadershipGrid');
    if (!container) return;
    
    container.innerHTML = leadership.map(item => `
        <div class="leadership-card">
          <h3>${item.title}</h3>
          <span class="leadership-company">${item.company}</span>
          <p>${item.description}</p>
        </div>
    `).join('');
  }

  renderProjects() {
    const projectGrid = document.getElementById('projectGrid');
    const modalsContainer = document.getElementById('modalsContainer');

    if (!projectGrid || !modalsContainer) {
      console.error('Project grid or modals container not found');
      return;
    }

    // Clear existing content
    projectGrid.innerHTML = '';
    modalsContainer.innerHTML = '';

    // Handle no results state
    if (this.filteredProjects.length === 0) {
      this.renderNoResults();
      return;
    }

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;
    const currentProjects = this.filteredProjects.slice(startIndex, endIndex);

    // Render projects
    currentProjects.forEach(project => {
      const projectCard = this.createProjectCard(project);
      projectGrid.appendChild(projectCard);

      const modal = this.createProjectModal(project);
      modalsContainer.appendChild(modal);
    });

    this.updatePaginationInfo();
    this.updateProjectCount();
  }

  createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-image-container">
        ${project.hasImage
          ? `<img src="${project.image}" alt="${project.title} screenshot" class="project-image" loading="lazy" />`
          : `<div class="project-image-placeholder">${project.placeholderText || 'Project Is Confidential & Cannot Be Showcased'}</div>`
        }
      </div>
      <h2 class="project-title">${project.title}</h2>
      <div class="project-tags"><strong>Tags:</strong> <span>${project.tags.join(', ')}</span></div>
      <div class="project-actions">
        ${project.showGithubButton ? `
        <button class="project-btn" ${project.githubUrl ? '' : 'disabled'} onclick="${project.githubUrl ? `location.href='${project.githubUrl}'` : ''}">
          Github
        </button>
        ` : ''}
        ${project.showLiveButton ? `
        <button class="project-btn" ${project.liveUrl ? '' : 'disabled'} onclick="${project.liveUrl ? `location.href='${project.liveUrl}'` : ''}">
          Live Demo
        </button>
        ` : ''}
        <button class="project-btn" onclick="openModal('projectModal${project.id}')">
          View More
        </button>
      </div>
    `;
    return card;
  }

  createProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = `projectModal${project.id}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', `${project.id}-title`);
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="closeModal('projectModal${project.id}')" aria-label="Close ${project.title} project modal">×</button>
        <h2 class="modal-title" id="${project.id}-title">${project.title}</h2>
        <div class="modal-image-container">
          ${project.hasImage
            ? `<img src="${project.image}" alt="${project.title} screenshot" class="project-image" loading="lazy" />`
            : `<div class="project-image-placeholder">${project.placeholderText || 'Project Is Confidential & Cannot Be Showcased'}</div>`
          }
        </div>
        <div class="modal-details">
          <p><strong>Description:</strong> ${project.description}</p>
          <p class="tags"><strong>Tags:</strong> <span>${project.tags.join(', ')}</span></p>
          <p><strong>Last Updated:</strong> ${project.lastUpdated}</p>
          <p><strong>Project Status:</strong> ${project.status}</p>
        </div>
        <div class="project-actions">
          ${project.showGithubButton ? `
          <button class="project-btn" ${project.githubUrl ? '' : 'disabled'} onclick="${project.githubUrl ? `location.href='${project.githubUrl}'` : ''}">
            Github
          </button>
          ` : ''}
          ${project.showLiveButton ? `
          <button class="project-btn" ${project.liveUrl ? '' : 'disabled'} onclick="${project.liveUrl ? `location.href='${project.liveUrl}'` : ''}">
            Live Demo
          </button>
          ` : ''}
        </div>
      </div>
    `;
    return modal;
  }

  initializePagination() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousPage());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPage());
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderProjects();
      this.scrollToProjects();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.projects.length / this.projectsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.renderProjects();
      this.scrollToProjects();
    }
  }

  updatePaginationInfo() {
    const paginationInfo = document.getElementById('paginationInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (paginationInfo) {
      const totalPages = Math.ceil(this.filteredProjects.length / this.projectsPerPage);
      
      if (this.filteredProjects.length === 0) {
        paginationInfo.textContent = 'No results';
      } else if (totalPages === 0) {
        paginationInfo.textContent = `Page ${this.currentPage} of 1`;
      } else {
        paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
      }
    }

    if (prevBtn) {
      prevBtn.disabled = this.currentPage === 1;
    }

    if (nextBtn) {
      const totalPages = Math.ceil(this.filteredProjects.length / this.projectsPerPage);
      nextBtn.disabled = this.currentPage >= totalPages || this.filteredProjects.length === 0;
    }
  }

  scrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  initializeAccessibility() {
    // Set up hamburger menu ARIA attributes
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    
    if (menu && icon) {
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Navigation menu");
      icon.setAttribute("aria-expanded", "false");
      icon.setAttribute("aria-label", "Toggle navigation menu");
      icon.setAttribute("role", "button");
      icon.setAttribute("tabindex", "0");
    }
  }

  initializeSkillsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
      });
    });
  }

  // ==========================================================================
  // PROJECT FILTERING METHODS
  // ==========================================================================

  initializeFiltering() {
    this.filteredProjects = [...this.projects];
    this.renderFilterButtons();
    this.updateProjectCount();
    this.renderProjects();
  }

  renderFilterButtons() {
    const filterContainer = document.getElementById('projectFilters');
    if (!filterContainer) {
      console.error('Filter container not found');
      return;
    }

    filterContainer.innerHTML = '';

    this.availableFilters.forEach(filterKey => {
      const btn = document.createElement('button');
      const isActive = filterKey === 'all';
      
      btn.className = 'filter-btn';
      if (isActive) {
        btn.classList.add('active');
      }
      btn.dataset.filter = filterKey;
      btn.textContent = this.filterDisplayNames[filterKey];
      btn.setAttribute('aria-pressed', isActive.toString());
      btn.setAttribute('type', 'button');

      btn.addEventListener('click', () => {
        this.filterProjects(filterKey);
      });

      filterContainer.appendChild(btn);
    });
  }

  filterProjects(tag) {
    this.activeFilter = tag;
    
    if (tag === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      const filterTags = this.filterMapping[tag] || [];
      this.filteredProjects = this.projects.filter(project => {
        return project.tags.some(projectTag => filterTags.includes(projectTag));
      });
    }
    
    this.resetPagination();
    this.updateFilterUI(tag);
    this.renderProjects();
  }

  resetPagination() {
    this.currentPage = 1;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = true;
    
    if (nextBtn) {
      const totalPages = Math.ceil(this.filteredProjects.length / this.projectsPerPage);
      nextBtn.disabled = this.filteredProjects.length === 0 || totalPages <= 1;
    }
  }

  updateFilterUI(activeTag) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      const isActive = btn.dataset.filter === activeTag;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive.toString());
    });
  }

  renderNoResults() {
    const projectGrid = document.getElementById('projectGrid');
    const modalsContainer = document.getElementById('modalsContainer');
    
    if (!projectGrid) return;
    
    projectGrid.innerHTML = `
      <div class="no-results" role="status">
        <h3>No projects found</h3>
        <p>Try selecting a different filter category.</p>
      </div>
    `;
    
    if (modalsContainer) modalsContainer.innerHTML = '';
    
    this.updatePaginationInfo();
  }

  updateProjectCount() {
    const countElement = document.getElementById('projectCount');
    if (countElement) {
      const total = this.projects.length;
      const showing = this.filteredProjects.length;
      if (showing === total) {
        countElement.textContent = `Showing all ${total} projects`;
      } else {
        countElement.textContent = `Showing ${showing} of ${total} projects`;
      }
    }
  }
}

// Legacy function support for backward compatibility
function openModal(modalId) {
  if (window.portfolioApp) {
    window.portfolioApp.openModal(modalId);
  }
}

function closeModal(modalId) {
  if (window.portfolioApp) {
    window.portfolioApp.closeModal(modalId);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

