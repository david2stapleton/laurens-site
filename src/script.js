// Hero gallery — show one random image on mobile
const heroGallery = document.querySelector('.hero-gallery');
if (heroGallery && window.innerWidth <= 768) {
  const items = heroGallery.querySelectorAll('.hero-gallery-item');
  const random = Math.floor(Math.random() * items.length);
  items[random].classList.add('mobile-visible');
}

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLeft = document.getElementById('nav-links-left');
const navRight = document.getElementById('nav-links-right');

if (navToggle && navRight) {
  // On mobile, move left nav items into the right list so they all show in the hamburger
  if (navLeft && window.innerWidth <= 768) {
    const items = Array.from(navLeft.children);
    items.forEach(item => navRight.insertBefore(item, navRight.firstChild));
  }
  navToggle.addEventListener('click', () => {
    navRight.classList.toggle('open');
  });
}

// Contact form — AJAX submit to stay on page
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    }).then((res) => {
      if (res.ok) {
        btn.textContent = 'Message Sent!';
        contactForm.reset();
      } else {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }
    }).catch(() => {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    });
  });
}