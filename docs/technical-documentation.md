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

### 1. Inspirational Quotes API
- Fetches a random quote from `https://api.quotable.io/quotes/random`
- If that request fails, falls back to `https://api.adviceslip.com/advice`
- Shows a loading state while fetching and a user-friendly error if both APIs fail
- A refresh button fetches a new quote without reloading the page

### 2. GitHub Repositories API
- Fetches the 6 most recently updated public repositories from `https://api.github.com/users/MohammedAlroomi/repos`
- Each card displays the repo name (linked), description, language with color dot, star count, fork count, and last updated date
- The API call is **lazy-loaded** — it only fires when the GitHub section scrolls into view, avoiding unnecessary network requests
- API data is sanitized with `escapeHTML()` before being inserted into the DOM

### 3. Project Filter, Skill Level, and Sort
- Three controls work together through a shared `projectState` object:
  - **Category filter** — All / Data Science / AI / Database
  - **Skill level filter** — All Levels / Beginner / Intermediate / Advanced
  - **Sort select** — Default / Name A→Z / Name Z→A / Date Oldest / Date Newest
- A card is visible only if it matches both the active category and the active skill level
- Sorting re-orders visible cards in the DOM without a full re-render
- If no cards match, an empty-state message is shown

### 4. Contact Form Validation
- Multi-step validation runs on submit and on blur:
  - Name: required
  - Email: required + regex format check
  - Message: required + minimum 10 characters
- Each field shows its own inline error message
- On successful submission, a success message is shown for 5 seconds and the form resets

### 5. Site Timer
- Starts counting when the page loads
- Updates every second using `setInterval`
- Displays elapsed time in a human-readable format (e.g. `0s`, `1m 04s`)
- Visible in the hero section on desktop

### 6. Login / Logout Simulation
- A Login button in the navbar triggers the logged-in state
- On login, the visitor's typed name is read from the greeting input (or defaults to "Visitor")
- State is saved to `sessionStorage` so it persists on page refresh within the same tab
- When logged in:
  - A welcome bar appears below the navbar
  - A private panel is revealed below the About section
  - The navbar button changes to "Logout"
- Logging out reverses all of the above and clears sessionStorage

### 7. Dark / Light Theme Toggle
- Toggled by the ☀️ button in the navbar
- Applies a CSS class (`dark-theme` or `light-theme`) to the body element
- All colors are defined as CSS custom properties in `:root`, so the entire site updates instantly
- Preference is saved to `localStorage` and restored on every page load

### 8. Personalised Greeting
- Visitor types their name into an input in the hero section
- The greeting updates in real time as they type
- Name is saved to `localStorage` and pre-filled on return visits
- A clear button removes the saved name

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
