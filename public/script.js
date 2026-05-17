/* =========================================================
   Akhilesh Gowda K S — Portfolio JS
   ========================================================= */

// ===== Page loader =====
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 500);
});

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Theme toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.className = 'fa-solid fa-sun';
}
themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.className = 'fa-solid fa-moon';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.className = 'fa-solid fa-sun';
    localStorage.setItem('theme', 'light');
  }
});

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ===== Navbar scroll + active link =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
  document.getElementById('toTop')?.classList.toggle('show', window.scrollY > 400);
});

// ===== Back to top =====
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Typing effect =====
const words = ['Java Developer', 'Frontend Developer', 'Prompt Engineer', 'AI Enthusiast', 'REST API Developer'];
const typedEl = document.getElementById('typed');
let wi = 0, ci = 0, deleting = false;
function type() {
  const word = words[wi];
  typedEl.textContent = word.substring(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(type, 90); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 45); }
  else {
    deleting = !deleting;
    if (!deleting) wi = (wi + 1) % words.length;
    setTimeout(type, deleting ? 1500 : 250);
  }
}
type();

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll('.fill').forEach(fill => {
        const pct = fill.getAttribute('data-fill');
        requestAnimationFrame(() => fill.style.width = pct + '%');
      });
      // Animate counters
      e.target.querySelectorAll('.counter').forEach(c => {
        if (c.dataset.done) return;
        c.dataset.done = '1';
        const target = +c.dataset.target;
        let n = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const tick = () => {
          n += step;
          if (n >= target) { c.textContent = target + '+'; return; }
          c.textContent = n;
          requestAnimationFrame(tick);
        };
        tick();
      });
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Cursor glow =====
const cursor = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ===== Contact form =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`);
  window.location.href = `mailto:ahkileshgowdaksag05@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = 'Opening your mail client...';
  form.reset();
  setTimeout(() => formNote.textContent = '', 4000);
});

// ===== Particles =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function initParticles() {
  const count = Math.min(80, Math.floor(window.innerWidth / 20));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.4,
  }));
}
initParticles();
window.addEventListener('resize', initParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = isLight ? 'rgba(79,70,229,0.4)' : 'rgba(168,179,255,0.6)';
    ctx.fill();
  });
  // connect close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = isLight ? `rgba(79,70,229,${0.15 * (1 - dist/120)})` : `rgba(99,102,241,${0.25 * (1 - dist/120)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();