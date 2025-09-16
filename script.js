function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    
    // Update ARIA attributes for accessibility
    const isOpen = menu.classList.contains("open");
    menu.setAttribute("aria-expanded", isOpen);
    icon.setAttribute("aria-expanded", isOpen);
  }
}

function handleHamburgerKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleMenu();
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus management for accessibility
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.focus();
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  } else {
    console.error(`Modal with ID "${modalId}" not found`);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
  } else {
    console.error(`Modal with ID "${modalId}" not found`);
  }
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modals = document.getElementsByClassName('modal');
  for (let modal of modals) {
    if (event.target === modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  }
}

// Keyboard navigation support for modals
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal[style*="flex"]');
    openModals.forEach(modal => {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    });
  }
});

// Initialize ARIA attributes on page load
document.addEventListener('DOMContentLoaded', function() {
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
  
  // Set up modal ARIA attributes
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.setAttribute('aria-label', 'Close modal');
    }
  });
});
