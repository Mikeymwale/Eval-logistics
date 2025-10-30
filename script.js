// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Animated counters when impact section enters viewport
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length) {
  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400; // ms
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(eased * target);
      el.textContent = val.toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(animate);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const impact = document.getElementById('impact');
  if (impact) io.observe(impact);
}

// Simple form validation and mailto fallback
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const role = document.getElementById('role');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const roleError = document.getElementById('roleError');

    let valid = true;
    if (!name.value.trim()) { nameError.textContent = 'Please enter your name.'; valid = false; } else { nameError.textContent = ''; }
    if (!email.validity.valid) { emailError.textContent = 'Enter a valid email.'; valid = false; } else { emailError.textContent = ''; }
    if (!role.value) { roleError.textContent = 'Please select a role.'; valid = false; } else { roleError.textContent = ''; }

    if (!valid) return;

    const subject = encodeURIComponent('Eval Logistics Network — Early Access');
    const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\nRole: ${role.value}`);
    window.location.href = `mailto:hello@evalharvest.com?subject=${subject}&body=${body}`;
  });
}

// Dynamic favicon (inline SVG) for a crisp look without assets
const favicon = document.getElementById('dynamic-favicon');
if (favicon) {
  const svg = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#10B981'/>
        <stop offset='1' stop-color='#0EA5E9'/>
      </linearGradient>
      <rect width='64' height='64' rx='12' fill='white'/>
      <path d='M50 14c0 18-14 32-32 32' stroke='url(#g)' stroke-width='6' stroke-linecap='round'/>
      <circle cx='22' cy='46' r='4' fill='#10B981'/>
      <circle cx='42' cy='18' r='4' fill='#0EA5E9'/>
    </svg>`);
  favicon.setAttribute('href', `data:image/svg+xml,${svg}`);
}

