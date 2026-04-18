/**
 * script.js – Mohammed Alroomi Portfolio
 * SWE 363 | KFUPM | 2026
 * Assignment 2 – Interactive Features
 *
 * Features:
 *  1. Time-based greeting
 *  2. Personalised greeting via name input (saved in localStorage)
 *  3. Dark / Light theme toggle (saved in localStorage)
 *  4. Project filter by category
 *  5. Navbar shrink on scroll
 *  6. Hamburger menu for mobile
 *  7. Scroll-triggered fade-in animations
 *  8. Contact form validation with success feedback
 */

/* ============================================================
   1. TIME-BASED GREETING
   ============================================================ */
function setGreeting(name) {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let timeGreeting;

  if (hour >= 5 && hour < 12) {
    timeGreeting = '☀️ Good morning';
  } else if (hour >= 12 && hour < 17) {
    timeGreeting = '🌤️ Good afternoon';
  } else if (hour >= 17 && hour < 21) {
    timeGreeting = '🌆 Good evening';
  } else {
    timeGreeting = '🌙 Good night';
  }

  // Append visitor name if provided
  greetingEl.textContent = name ? `${timeGreeting}, ${name}!` : timeGreeting;
}

/* ============================================================
   2. PERSONALISED GREETING INPUT
      - Updates greeting in real time as the user types
      - Saves the name in localStorage so it persists on return visits
      - Clear button removes the saved name and resets the greeting
   ============================================================ */
function initPersonalisedGreeting() {
  const input    = document.getElementById('visitorName');
  const clearBtn = document.getElementById('greetingClear');
  if (!input) return;

  // Load saved name on page load
  const savedName = localStorage.getItem('visitorName') || '';
  if (savedName) {
    input.value = savedName;
    setGreeting(savedName);
  }

  // Update greeting and save on every keystroke
  input.addEventListener('input', () => {
    const name = input.value.trim();
    setGreeting(name);
    if (name) {
      localStorage.setItem('visitorName', name);
    } else {
      localStorage.removeItem('visitorName');
    }
  });

  // Clear button — resets name and greeting
  clearBtn?.addEventListener('click', () => {
    input.value = '';
    setGreeting('');
    localStorage.removeItem('visitorName');
    input.focus();
  });
}

/* ============================================================
   3. DARK / LIGHT THEME TOGGLE
      - Saves preference to localStorage (persists across sessions)
   ============================================================ */
function initTheme() {
  const toggle    = document.getElementById('themeToggle');
  const themeIcon = toggle?.querySelector('.theme-icon');

  // Apply saved preference, default to dark
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  toggle?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    applyTheme(isDark ? 'light' : 'dark');
  });

  function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ============================================================
   4. PROJECT FILTER BY CATEGORY
      - Clicking All / Data Science / AI / Database shows
        only matching project cards
      - Shows an empty-state message if no cards match
   ============================================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('emptyState');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide cards
      let visibleCount = 0;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) visibleCount++;
      });

      // Show empty state if nothing is visible
      if (emptyState) emptyState.hidden = visibleCount > 0;
    });
  });
}

/* ============================================================
   5. NAVBAR SCROLL BEHAVIOUR
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 60
      ? '0 2px 24px rgba(0,0,0,0.3)'
      : 'none';
  }, { passive: true });
}

/* ============================================================
   6. HAMBURGER MOBILE MENU
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ============================================================
   7. SMOOTH SCROLLING
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   8. SCROLL FADE-IN ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.project-card, .about-grid, .contact-wrapper, .section-title, .exp-card, .achievement-badge'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   9. CONTACT FORM VALIDATION
   ============================================================ */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const nameInput  = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const msgInput   = document.getElementById('message');
  const nameError  = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError   = document.getElementById('messageError');
  const successBox = document.getElementById('formSuccess');

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address.';
      valid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    if (!msgInput.value.trim()) {
      msgError.textContent = 'Please enter a message.';
      valid = false;
    } else if (msgInput.value.trim().length < 10) {
      msgError.textContent = 'Message must be at least 10 characters.';
      valid = false;
    } else {
      msgError.textContent = '';
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      successBox.classList.add('visible');
      form.reset();
      setTimeout(() => successBox.classList.remove('visible'), 5000);
    }
  });

  [nameInput, emailInput, msgInput].forEach(input => {
    input.addEventListener('blur', validate);
  });
}

/* ============================================================
   FEATURE 3: ADVICE API
      - Fetches a random advice from api.adviceslip.com on load
      - Shows a loading state while fetching
      - Shows a friendly error message if fetch fails
      - Refresh button fetches new advice
      - localStorage already handles theme + name (Data Handling req.)
   ============================================================ */
async function fetchAdvice() {
  const textEl    = document.getElementById('adviceText');
  const errorEl   = document.getElementById('adviceError');
  const refreshBtn = document.getElementById('adviceRefresh');

  if (!textEl) return;

  // Show loading state
  textEl.style.opacity = '0.4';
  textEl.textContent   = 'Loading advice…';
  if (errorEl) errorEl.hidden = true;
  if (refreshBtn) refreshBtn.disabled = true;

  try {
    // Fetch from public Advice Slip API — no key required
    const res  = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    textEl.textContent   = `"${data.slip.advice}"`;
    textEl.style.opacity = '1';
  } catch {
    // Show error message — never leave the user without feedback
    textEl.textContent = '';
    if (errorEl) errorEl.hidden = false;
  } finally {
    if (refreshBtn) refreshBtn.disabled = false;
  }
}

function initAdviceWidget() {
  const refreshBtn = document.getElementById('adviceRefresh');
  // Load advice on page load
  fetchAdvice();
  // Refresh button fetches new advice
  refreshBtn?.addEventListener('click', fetchAdvice);
}

/* ============================================================
   INIT – Run everything when DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  setGreeting();               // Time-based greeting (no name yet)
  initPersonalisedGreeting();  // Name input + localStorage
  initTheme();                 // Theme toggle + localStorage
  initProjectFilter();         // Project category filter
  initNavbar();                // Navbar scroll shadow
  initHamburger();             // Mobile hamburger menu
  initSmoothScroll();          // Smooth scroll for nav links
  initScrollAnimations();      // Fade-in on scroll
  initContactForm();           // Form validation
  initAdviceWidget();          // Advice API fetch

  console.log('%c Mohammed Alroomi | Portfolio', 'color: #00d4aa; font-size: 14px; font-weight: bold;');
  console.log('%c Assignment 2 – Interactive Features | SWE 363 | KFUPM', 'color: #9090a0;');
});
