// Modern ES6+ JavaScript with proper error handling and pagination
class PortfolioApp {
  constructor() {
    this.projects = [];
    this.currentPage = 1;
    this.projectsPerPage = 9;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeAccessibility();
    this.loadProjects();
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

  loadProjects() {
    // Project data with all the projects
    this.projects = [
      {
        id: 'trektoo',
        title: 'Trektoo - Tour App',
        tags: ['Next.js', 'Supabase', 'Stripe'],
        image: 'projects/trektoo.png',
        description: 'Trektoo is a tour booking app, where users can search for tours, select and book hotels, and enjoy a streamlined travel experience. Built with Next.js, Supabase, and Stripe.',
        status: 'In Progress',
        lastUpdated: 'May 26, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: true
      },
      {
        id: 'nexlify',
        title: 'Nexlify SaaS',
        tags: ['Next.js', 'Supabase', 'Stripe'],
        image: null,
        description: 'Built with Next.js, Supabase, and Stripe, this SaaS platform enables users to access video lectures, select mentors, adjust learning at their own pace, and supports monetization for course creators.',
        status: 'In Progress',
        lastUpdated: 'May 26, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'brewhub',
        title: 'BrewHub',
        tags: ['PHP', 'Laravel', 'MySQL'],
        image: 'projects/bean-and-brew.jpeg',
        description: 'Built with PHP, Laravel, and MySQL, this coffee shop app allows customers to browse menus, place orders, make payments online, and includes an admin panel for managing inventory and orders.',
        status: 'Completed',
        lastUpdated: 'May 27, 2025',
        githubUrl: null,
        liveUrl: 'https://brew-and-bean.rf.gd/index.php',
        hasImage: true
      },
      {
        id: 'agrosmart',
        title: 'AgroSmart: Marketplace, Fertilizer & Spray Advisor',
        tags: ['Django', 'Python', 'Deep Learning'],
        image: null,
        description: 'Built with Django, Python, and Deep Learning, this app identifies crops and diseases, recommends fertilizer and spray, and includes a smart agro marketplace.',
        status: 'Completed',
        lastUpdated: 'May 20, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'lesson-summarizer',
        title: 'Lesson Summarizer',
        tags: ['Flutter', 'Dart', 'Firebase', 'Machine Learning'],
        image: null,
        description: 'Built with Flutter, Dart, Firebase, and Machine Learning, this app turns long lessons into short summaries and lets users ask questions based on the content.',
        status: 'Completed',
        lastUpdated: 'April 15, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'trip-planner',
        title: 'Trip Planner',
        tags: ['React', 'Vite', 'Deep Learning'],
        image: null,
        description: 'Built with React, Vite, and Deep Learning, this app helps users plan perfect, budget-friendly trips with personalized places, routes, and activities based on interests.',
        status: 'Completed',
        lastUpdated: 'March 10, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'pop-roll',
        title: 'POP & ROLL: Beverages',
        tags: ['THREE.js', 'GSAP', 'Blender', 'CorelDRAW'],
        image: null,
        description: 'Built with THREE.js, GSAP, Blender, and CorelDRAW, this app showcases beverages with stunning 3D visuals, smooth animations, and creative brand design.',
        status: 'Completed',
        lastUpdated: 'February 28, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'greatkart',
        title: 'GreatKart',
        tags: ['Django', 'Python'],
        image: null,
        description: 'Built with Django and Python, this e-commerce marketplace features product listings, secure checkout, and an admin panel for managing users, roles, and orders.',
        status: 'Completed',
        lastUpdated: 'January 15, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'crm',
        title: 'CRM',
        tags: ['Django', 'Python'],
        image: null,
        description: 'Built with Django and Python, this complex CRM manages customer data, tracks interactions, and improves business relationships with powerful, user-friendly tools.',
        status: 'Completed',
        lastUpdated: 'December 10, 2024',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'edutrack',
        title: 'EduTrack',
        tags: ['Flutter', 'GetX', 'DRF'],
        image: null,
        description: 'Built with Flutter, GetX, and DRF, this app manages students efficiently, available on iOS and Android for seamless education tracking and user friendly.',
        status: 'Completed',
        lastUpdated: 'November 5, 2024',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'tune-finder',
        title: 'Tune Finder',
        tags: ['Flutter', 'Riverpod', 'ArcCloud', 'Firebase'],
        image: null,
        description: 'Built with Flutter, Riverpod, ArcCloud, and Firebase, this app helps users find music tunes easily on iOS, Android, and web platforms.',
        status: 'Completed',
        lastUpdated: 'October 20, 2024',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'lingogem',
        title: 'LingoGem',
        tags: ['Flutter', 'Google Gemini', 'Firebase'],
        image: null,
        description: 'Built with Flutter, Google Gemini, and Firebase, this app helps users translate languages easily on iOS, Android, and web with smart features.',
        status: 'Completed',
        lastUpdated: 'September 15, 2024',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'posales',
        title: 'POSales',
        tags: ['C#', 'SQL Server', 'Visual Basic'],
        image: null,
        description: 'Built with C#, SQL Server, and Visual Basic, this app manages point-of-sale and inventory efficiently for smooth business operations.',
        status: 'Completed',
        lastUpdated: 'August 10, 2024',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'fashionext',
        title: 'FashioNext',
        tags: ['Flutter', 'Hooks', 'Django', 'Django REST Framework'],
        image: null,
        description: 'Built with Flutter, Hooks, Django, and Django REST Framework, this fashion e-commerce app offers a smooth shopping experience on mobile.',
        status: 'Completed',
        lastUpdated: 'July 5, 2024',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'spotiflyer',
        title: 'Spotiflyer',
        tags: ['Flutter', 'FastAPI', 'RiverPod', 'JWT', 'Cloudinary'],
        image: null,
        description: 'Built with Flutter, FastAPI, RiverPod, JWT, and Cloudinary, this music app streams songs smoothly on iOS and Android devices.',
        status: 'Completed',
        lastUpdated: 'June 20, 2024',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'body-metric',
        title: 'Body Metric',
        tags: ['Flutter', 'GetX', 'Rx Shared Preferences'],
        image: null,
        description: 'Built with Flutter, GetX, and Rx Shared Preferences, this app calculates Body Mass Index quickly and tracks health data easily on mobile devices.',
        status: 'Completed',
        lastUpdated: 'May 15, 2023',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'metatube',
        title: 'Metatube',
        tags: ['Flutter', 'Riverpod', 'Node.js'],
        image: null,
        description: 'Built with Flutter, Riverpod, and Node.js, this tool extracts YouTube video metadata easily, available for Windows, Linux, and macOS platforms.',
        status: 'Completed',
        lastUpdated: 'April 10, 2023',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'split-easy',
        title: 'SplitEasy',
        tags: ['Flutter', 'GetX', 'Shared Preferences'],
        image: null,
        description: 'Built with Flutter, GetX, and Shared Preferences, this app splits bills easily and fairly for groups on both iOS and Android devices.',
        status: 'Completed',
        lastUpdated: 'March 5, 2023',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'neurocare',
        title: 'NeuroCare Hub',
        tags: ['Flutter', 'Bloc', 'Machine Learning'],
        image: null,
        description: 'Built with Flutter, Bloc, and Machine Learning, this app detects tumors early, helping users monitor brain health on mobile devices.',
        status: 'Completed',
        lastUpdated: 'February 20, 2022',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'skycast',
        title: 'SkyCast',
        tags: ['Flutter', 'Riverpod', 'Shared Preferences'],
        image: null,
        description: 'Built with Flutter, Riverpod, and Shared Preferences, this weather app delivers accurate forecasts and personalized updates on iOS and Android devices.',
        status: 'Completed',
        lastUpdated: 'January 15, 2022',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      },
      {
        id: 'whatsapp-helper',
        title: 'WhatsApp Helper Tool',
        tags: ['Flutter', 'GetX', 'Shared Preferences'],
        image: null,
        description: 'Built with Flutter, GetX, and Shared Preferences, this app saves WhatsApp statuses, downloads images and videos, and enables easy sharing with friends.',
        status: 'Completed',
        lastUpdated: 'December 10, 2022',
        githubUrl: null,
        liveUrl: null,
        hasImage: false
      }
    ];

    this.renderProjects();
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

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;
    const currentProjects = this.projects.slice(startIndex, endIndex);

    // Render projects
    currentProjects.forEach(project => {
      const projectCard = this.createProjectCard(project);
      projectGrid.appendChild(projectCard);

      const modal = this.createProjectModal(project);
      modalsContainer.appendChild(modal);
    });

    this.updatePaginationInfo();
  }

  createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-image-container">
        ${project.hasImage 
          ? `<img src="${project.image}" alt="${project.title} screenshot" class="project-image" loading="lazy" />`
          : `<div class="project-image-placeholder">Project Is Confidential & Cannot Be Showcased</div>`
        }
      </div>
      <h2 class="project-title">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#000" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" fill="#fff" />
        </svg>
        ${project.title}
      </h2>
      <div class="project-tags"><strong>Tags:</strong> <span>${project.tags.join(', ')}</span></div>
      <div class="project-actions">
        <button class="project-btn" ${project.githubUrl ? '' : 'disabled'} onclick="${project.githubUrl ? `location.href='${project.githubUrl}'` : ''}">
          Github
        </button>
        <button class="project-btn" ${project.liveUrl ? '' : 'disabled'} onclick="${project.liveUrl ? `location.href='${project.liveUrl}'` : ''}">
          Live Demo
        </button>
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
            : `<div class="project-image-placeholder">Project Is Confidential & Cannot Be Showcased</div>`
          }
        </div>
        <div class="modal-details">
          <p><strong>Description:</strong> ${project.description}</p>
          <p class="tags"><strong>Tags:</strong> <span>${project.tags.join(', ')}</span></p>
          <p><strong>Last Updated:</strong> ${project.lastUpdated}</p>
          <p><strong>Project Status:</strong> ${project.status}</p>
        </div>
        <div class="project-actions">
          <button class="project-btn" ${project.githubUrl ? '' : 'disabled'} onclick="${project.githubUrl ? `location.href='${project.githubUrl}'` : ''}">
            Github
          </button>
          <button class="project-btn" ${project.liveUrl ? '' : 'disabled'} onclick="${project.liveUrl ? `location.href='${project.liveUrl}'` : ''}">
            Live Demo
          </button>
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
      const totalPages = Math.ceil(this.projects.length / this.projectsPerPage);
      paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    }

    if (prevBtn) {
      prevBtn.disabled = this.currentPage === 1;
    }

    if (nextBtn) {
      const totalPages = Math.ceil(this.projects.length / this.projectsPerPage);
      nextBtn.disabled = this.currentPage === totalPages;
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

