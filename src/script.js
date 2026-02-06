// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// Tab switching
const tabLinks = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');

function switchTab(tabId) {
  // Hide all panels
  tabPanels.forEach(panel => panel.classList.remove('active'));

  // Remove active from all nav links
  tabLinks.forEach(link => link.classList.remove('active'));

  // Show target panel
  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active');
  }

  // Mark the matching nav link as active
  const activeLink = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Nav link clicks
tabLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab(link.dataset.tab);
    // Close mobile menu
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Logo click → show About tab
document.querySelector('.nav-logo').addEventListener('click', (e) => {
  e.preventDefault();
  switchTab('about');
});

// Default to About tab on page load
switchTab('about');

// Contact form handling (frontend only)
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('#name').value.trim();
  const email = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();

  if (!name || !email || !message) return;

  // Show confirmation (no backend)
  const btn = contactForm.querySelector('.btn');
  const originalText = btn.textContent;
  btn.textContent = 'Message Sent!';
  btn.disabled = true;
  btn.style.background = '#2e2e2e';

  contactForm.reset();

  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.background = '';
  }, 3000);
});
