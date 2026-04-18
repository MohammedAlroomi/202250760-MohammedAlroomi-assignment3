# AI Usage Report
**Assignment 3 – Advanced Functionality**  
**Mohammed Alroomi | 202250760 | SWE 363 | KFUPM | 2026**

---

## 1. Tools Used & Use Cases

### Claude (Anthropic)
The primary AI tool used throughout this assignment was Claude. I used it as a **thinking partner and reference**, not as a replacement for my own work. Specific use cases included:

- **API Integration guidance** — When integrating the GitHub API and the Quotable.io quotes API, I asked Claude to explain how the fetch API handles errors and how to structure a try/catch with a fallback. I then wrote the actual implementation myself based on that understanding.
- **Debugging help** — When my project filter stopped working after I added the sort feature, I described the problem to Claude and it helped me spot that the filter and sort were operating independently. I decided to refactor them into a unified `projectState` object myself.
- **Concept clarification** — I asked Claude to explain `IntersectionObserver`, `sessionStorage` vs `localStorage`, and `requestAnimationFrame` so I could understand when and why to use each one before applying them.
- **Code review** — After writing sections of my JS, I shared them with Claude to check for bugs or logic gaps. It pointed out potential issues and I decided which suggestions to apply.

---

## 2. Benefits & Challenges

### Benefits
- **Faster learning** — Instead of reading through long MDN documentation pages, I could ask a focused question and get a direct explanation. This saved time and helped me stay focused.
- **Catching blind spots** — AI helped me notice things I had not considered, such as sanitizing API data with `escapeHTML()` before inserting it into the DOM to prevent XSS issues.
- **Explaining trade-offs** — When I was deciding between `sessionStorage` and `localStorage` for login state, Claude explained the difference clearly, and I made the final decision based on what made sense for a session-based login simulation.

### Challenges
- **Over-trusting suggestions** — Early on, I noticed that AI-generated code sometimes worked but was not written the way I would write it. I had to slow down, read it carefully, and rewrite it in a style consistent with the rest of my codebase.
- **Context limitations** — AI does not know my exact file structure or what was already in Assignments 1 and 2. I had to provide context manually each time, which required me to think clearly about what I already had and what I still needed.
- **Verifying correctness** — AI suggestions are not always accurate. I tested every feature in the browser myself and checked that APIs returned the expected data before considering a feature complete.

---

## 3. Learning Outcomes

This assignment taught me several things that I would not have learned as deeply without actively engaging with the problems myself:

- **Unified state management** — I learned how to design a shared state object (`projectState`) that multiple UI components read from, rather than having each component manage its own logic independently. This pattern made the filter, skill level, and sort features work together cleanly.
- **Lazy loading with IntersectionObserver** — I understood not just how to use it, but *why* it matters for performance: deferring a network request until the user actually needs the data.
- **API error handling patterns** — I learned to always account for network failures, non-200 responses, and empty results — not just the happy path.
- **sessionStorage for temporary state** — I now understand the practical difference between session-scoped and persistent storage, and when each is appropriate.

---

## 4. Responsible Use & Modifications

I approached AI assistance with academic integrity as a priority:

- **I led every decision.** I defined what features to build, how to structure the code, and what the final implementation should look like. AI was consulted for help, not for answers.
- **I reviewed AI suggestions before using them.** I tried to understand what the suggested code was doing and adjusted it to fit my project rather than dropping it in as-is.
- **I tested everything myself.** Every feature was manually tested in the browser. If something did not behave as expected, I debugged it myself — sometimes asking AI for hints, but always resolving the issue through my own understanding.
- **I made sure to understand what I submitted.** Before finalizing any section, I went back through the code to make sure I understood the purpose of each part and could follow the logic on my own.

Overall, AI helped me work through this assignment more effectively, but the understanding and effort behind it are my own.
