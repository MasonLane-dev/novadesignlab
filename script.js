/* ========== NAV SCROLL ========== */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  navbar.classList.toggle('scrolled', currentScroll > 40);

  // Hide/show nav on scroll direction
  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});

/* ========== MOBILE MENU ========== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

/* ========== COUNTER ANIMATION ========== */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    let current = 0;

    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(update);
    };
    update();
  });
}

const heroStats = document.querySelector('.hero-stats');
let countersAnimated = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      animateCounters();
    }
  });
}, { threshold: 0.5 });

if (heroStats) observer.observe(heroStats);

/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ========== CONTACT FORM ========== */
const contactForm = document.getElementById('contactForm');
const gsheetFrame = document.querySelector('iframe[name="gsheet-frame"]');

function resetFormBtn(btn, originalContent) {
  btn.innerHTML = originalContent;
  btn.style.background = '';
  btn.style.boxShadow = '';
  btn.disabled = false;
}

function handleFormSuccess(btn, originalContent) {
  btn.innerHTML = '✓ Message Sent!';
  btn.style.background = '#28c840';
  btn.style.boxShadow = '0 4px 16px rgba(40,200,64,0.3)';
  contactForm.reset();

  setTimeout(() => {
    resetFormBtn(btn, originalContent);
  }, 4000);
}

if (contactForm && gsheetFrame) {
  // Listen for iframe load — fires when Apps Script responds
  gsheetFrame.addEventListener('load', function onFrameLoad() {
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn && btn.disabled) {
      const originalContent = btn.innerHTML;
      handleFormSuccess(btn, originalContent.replace('⏳ Sending...', '⏳ Sending…'));
    }
  });

  contactForm.addEventListener('submit', function() {
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    // Safety timeout — if iframe doesn't load within 15s, still reset
    setTimeout(function() {
      if (btn.disabled) {
        resetFormBtn(btn, originalContent);
      }
    }, 15000);
  });
}

/* ========== FADE-IN ON SCROLL ========== */
const fadeElements = document.querySelectorAll(
  '.service-card, .work-card, .testimonial-card, .about-grid, .contact-card, .process-step, .hero-card'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05 });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  fadeObserver.observe(el);
});

/* ========== PARALLAX SHAPES ========== */
document.querySelectorAll('.shape').forEach((shape, i) => {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    shape.style.transform = `translate(${x * (i + 1)}px, ${y * (i + 1)}px)`;
  });
});
