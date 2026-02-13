// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
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