# Technical Documentation
**Assignment 3 – Advanced Functionality**  
**Mohammed Alroomi | 202250760 | SWE 363 | KFUPM | 2026**

---

## Overview

This document describes the technical implementation of the portfolio website built for Assignment 3. It covers the project structure, each major feature, the external APIs used, and the decisions made during development.

---

## Project Structure

```
202250760-MohammedAlroomi-assignment3/
├── index.html              — Page structure and content
├── css/
│   └── styles.css          — All styling, theming, and responsive layout
├── js/
│   └── script.js           — All interactivity and API logic
├── assets/
│   └── images/             — Project images (webp / jpeg)
├── docs/
│   ├── ai-usage-report.md  — AI tool usage documentation
│   └── technical-documentation.md
└── README.md
```

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, CSS variables, animations, responsive layout |
| Vanilla JavaScript (ES6+) | Interactivity, API calls, state management |
| GitHub API | Fetching live repository data |
| Quotable.io API | Fetching inspirational quotes |
| Advice Slip API | Fallback quotes source |
| localStorage | Persisting theme and visitor name across sessions |
| sessionStorage | Persisting login state within a browser tab |
| IntersectionObserver API | Scroll animations and lazy loading |
| GitHub Pages | Live deployment |

---

## Features

### API Integration
**Inspirational Quotes** — Fetches a random quote from `api.quotable.io` with a fallback to `api.adviceslip.com`. Shows a loading state, error message, and a refresh button.

**GitHub Repositories** — Fetches the 6 most recently updated public repos from the GitHub API and renders them as cards showing name, description, language, stars, forks, and last updated date. Lazy-loaded — the request only fires when the section scrolls into view.

### Complex Logic
**Project Filter + Sort** — Category filter (All / Data Science / AI / Database) and a sort dropdown (name or date, ascending or descending) share a unified state object and apply together on every interaction.

**Skill Level Filter** — A second filter dimension (Beginner / Intermediate / Advanced) works simultaneously with the category filter. A card is only visible if it matches both active filters.

**Contact Form Validation** — Validates on submit and on blur. Name is required, email must pass a format check, and message must be at least 10 characters. Each field shows its own inline error message.

**Site Timer** — Counts elapsed time from page load, displayed in the hero section and updated every second.

### State Management
**Dark / Light Theme Toggle** — Toggles between dark and light themes using CSS custom properties. Preference is saved to `localStorage` and restored on every page load.

**Visitor Name** — Visitor types their name in the hero input and the greeting updates in real time. Name is saved to `localStorage` and restored on return visits.

**Login / Logout Simulation** — A navbar button toggles a logged-in state saved in `sessionStorage`. On login, a welcome bar appears and a private panel is revealed. State persists across page refreshes within the same tab.

**Show / Hide Sections** — The private panel is hidden by default and only revealed when the user is logged in.

---

## API Error Handling

All API calls follow the same pattern:

1. Show a loading state before the request
2. Attempt the primary API
3. If it fails, attempt a fallback (quotes only) or show an error message
4. Always re-enable interactive controls in a `finally` block so the UI never gets stuck

---

## Performance Decisions

| Technique | Where Applied |
|---|---|
| `loading="lazy"` + `decoding="async"` | All project images in HTML |
| `defer` on script tag | `index.html` — non-blocking script load |
| `dns-prefetch` | GitHub, Quotable, and Advice Slip API domains |
| Lazy API fetch via IntersectionObserver | GitHub repositories section |
| `requestAnimationFrame` throttle | Navbar scroll shadow handler |
| `contain: layout style` | Project cards and experience cards |

---

## Browser Compatibility

The site uses standard web APIs that are supported in all modern browsers including Chrome, Firefox, Safari, and Edge. No polyfills are required.

---

## Live Deployment

Deployed via GitHub Pages:  
[https://mohammedalroomi.github.io/202250760-MohammedAlroomi-assignment3/](https://mohammedalroomi.github.io/202250760-MohammedAlroomi-assignment3/)
