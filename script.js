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
        id: 'trektoo-mobile',
        title: 'TREKTOO - Mobile App',
        tags: ['React Native'],
        image: 'placeholder',
        description: 'Trektoo is a tour booking app, where users can search for tours, select and book hotels, and enjoy a streamlined travel experience. Built with React Native and Stripe.',
        status: 'In Progress',
        lastUpdated: 'Recent',
        githubUrl: null,
        liveUrl: null,
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false,
        placeholderText: 'Actively Working On This Project'
      },
      {
        id: 'mcp-developer-ctx',
        title: 'MCP Developer Context Server',
        tags: ['TypeScript', 'Node.js', 'MCP'],
        image: 'placeholder',
        description: 'MCP Server that exposes project context, codebase search, safe commands, and API spec summaries for any model or MCP client. Features include codebase search with ignore support, project structure analysis, runnable commands detection, OpenAPI spec summarization, JSON validation, and MCP prompts for code review, API usage, and test planning.',
        status: 'Completed',
        lastUpdated: 'Recent',
        githubUrl: 'https://github.com/AbdulRahmanMudasser/mcp-developer-ctx',
        liveUrl: null,
        hasImage: false,
        showGithubButton: true,
        showLiveButton: false,
        placeholderText: 'No Snapshots For This Project'
      },
      {
        id: 'cli-codebase-ctx',
        title: 'CLI Codebase Context',
        tags: ['Go', 'Ripgrep', 'CLI'],
        image: 'placeholder',
        description: 'Repo context and code search CLI for humans and agents. Built with Go 1.21+, featuring directory tree visualization, runnable commands detection, environment variable parsing, OpenAPI spec summarization, and ignore-aware codebase search using ripgrep or pure-Go fallback. Respects .gitignore and .codebase-ctxignore for reduced noise.',
        status: 'Completed',
        lastUpdated: 'Recent',
        githubUrl: 'https://github.com/AbdulRahmanMudasser/cli-codebase-ctx',
        liveUrl: null,
        hasImage: false,
        showGithubButton: true,
        showLiveButton: false,
        placeholderText: 'No Snapshots For This Project'
      },
      {
        id: 'ai-business-publisher',
        title: 'AI Business Publisher: Business Profile Optimization Platform',
        tags: ['React', 'Express', 'PostgreSQL'],
        image: null,
        description: 'Web platform built with React, Express, and PostgreSQL for AI assistant visibility management. Implements Google Places API integration, multi-stage website scraping with Playwright, GPT-4o content enhancement, schema.org JSON-LD structured data publishing, EEAT crawlability scoring, and Stripe pay-per-profile payments.',
        status: 'Completed',
        lastUpdated: 'Recent',
        githubUrl: null,
        liveUrl: null,
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
      },
      {
        id: 'automated-social-media',
        title: 'Automated Social Media Platform',
        tags: ['NestJS', 'Next.js', 'PostgreSQL'],
        image: null,
        description: 'Web platform built with NestJS, Next.js, and PostgreSQL for dealership social media management. Implements OAuth integration with Google/Facebook Business, automated review syndication, branded template engine, Bull Queue scheduling, and multi-franchise analytics dashboard.',
        status: 'Completed',
        lastUpdated: 'Recent',
        githubUrl: null,
        liveUrl: null,
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
      },
      {
        id: 'battery-electrode-detection',
        title: 'Battery Electrode Wrinkle Detection System',
        tags: ['Python', 'CustomTkinter', 'OpenCV', 'scikit-image'],
        image: null,
        description: 'Industrial quality control system developed using Python, CustomTkinter, OpenCV, and scikit-image for battery electrode manufacturing. Performs real-time defect detection using laser sensors and computer vision with multi-algorithm wrinkle detection and OPC-UA industrial integration to optimize production quality control.',
        status: 'Completed',
        lastUpdated: 'Recent',
        githubUrl: null,
        liveUrl: null,
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
      },
      {
        id: 'maqbool-fashion',
        title: 'Maqbool Fashion & Fabrics (ERP, Point of Sale)',
        tags: ['Django', 'Flutter', 'PostgreSQL'],
        image: null,
        description: 'Developed using Django, Flutter, and PostgreSQL, Maqbool Fashion is a point-of-sale, accounting, and personal management software for customizing bridal and groom dresses on demand. It features tailored order management, POS billing, financial tracking, customer records, and workflow tools to streamline dress customization and business operations.',
        status: 'Completed',
        lastUpdated: 'Recent',
        githubUrl: null,
        liveUrl: null,
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
      },
      {
        id: 'domesta',
        title: 'Domesta: Maid Hiring & Workforce Management System',
        tags: ['Next.js'],
        image: null,
        description: 'Developed using Next.js, Domesta is a multi-role platform for hiring maids, and managing employees, employers, agencies, and superadmins. It features job matching, multi-dashboard access, verification workflows, booking systems, and admin oversight tools for workforce coordination.',
        status: 'Completed',
        lastUpdated: 'Recent',
        githubUrl: null,
        liveUrl: null,
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
      },
      {
        id: 'trektoo',
        title: 'TREKTOO - Tour App',
        tags: ['Next.js'],
        image: 'projects/trektoo.png',
        description: 'Trektoo is a tour booking app, where users can search for tours, select and book hotels, and enjoy a streamlined travel experience. Built with Next.js and Stripe.',
        status: 'Completed',
        lastUpdated: 'May 26, 2025',
        githubUrl: null,
        liveUrl: 'https://trektoo.com/',
        hasImage: true,
        showGithubButton: false,
        showLiveButton: true
      },
      {
        id: 'nexlify',
        title: 'Nexlify SaaS',
        tags: ['Next.js'],
        image: null,
        description: 'Built with Next.js and Stripe, this SaaS platform enables users to access video lectures, select mentors, adjust learning at their own pace, and supports monetization for course creators.',
        status: 'Completed',
        lastUpdated: 'May 26, 2025',
        githubUrl: null,
        liveUrl: null,
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: true,
        showGithubButton: false,
        showLiveButton: true
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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
        hasImage: false,
        showGithubButton: false,
        showLiveButton: false
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

