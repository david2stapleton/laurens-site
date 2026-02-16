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

// Reviews carousel
document.querySelectorAll('.reviews-carousel').forEach(carousel => {
  const slides = carousel.querySelectorAll('.review-slide');
  const dots = carousel.querySelectorAll('.reviews-dot');
  if (slides.length <= 1) return;

  let current = 0;
  let timer = null;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  carousel.querySelector('.reviews-prev').addEventListener('click', () => {
    goTo(current - 1);
    resetTimer();
  });

  carousel.querySelector('.reviews-next').addEventListener('click', () => {
    goTo(current + 1);
    resetTimer();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      resetTimer();
    });
    dot.style.cursor = 'pointer';
  });

  function resetTimer() {
    if (timer) clearInterval(timer);
    if (carousel.dataset.autoplay === 'true') {
      const interval = (parseInt(carousel.dataset.interval) || 5) * 1000;
      timer = setInterval(() => goTo(current + 1), interval);
    }
  }

  resetTimer();
});

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