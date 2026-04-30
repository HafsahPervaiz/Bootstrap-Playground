# ⚡ Bootstrap Playground — Learn by Doing

> A gamified, interactive, single-page learning platform for mastering Bootstrap 5 — built for the **CAP916: Front-End Web UI Frameworks & Tools** university course.

---

## 📸 Overview

**Bootstrap Playground** transforms passive Bootstrap learning into an active, hands-on experience. Instead of reading documentation, learners *play* with live Bootstrap classes, see real-time results, earn XP, level up, and test their knowledge through interactive challenges.

The entire platform runs in a single HTML page — no build tools, no npm, no frameworks — just **HTML + CSS + vanilla JavaScript** powered by Bootstrap 5.3.3 via CDN.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎮 **Interactive Playgrounds** | Every module has clickable buttons that toggle Bootstrap classes on live elements in real-time |
| 📝 **Live HTML Editor** | Built-in code editor on every example — edit HTML and see the output update instantly |
| ⭐ **XP & Level System** | Earn XP for completing modules (+50), answering quizzes (+100), and interacting with demos (+10) |
| 🔥 **Streak Bonuses** | Complete 3+ modules in a row for bonus +25 XP per completion |
| 🏆 **6 Levels** | Progress from 🌱 Beginner → 📗 Learner → ⚡ Explorer → 🔥 Builder → 🏆 Master → 👑 Bootstrap King |
| 🌓 **Dark/Light Toggle** | One-click theme switch using Bootstrap's `data-bs-theme` attribute |
| 📊 **Progress Tracking** | Real-time progress bar in the navbar, hero section, and footer dashboard |
| 🎉 **Victory Celebration** | Complete all modules for an emoji-burst celebration with your total XP |
| 📱 **Fully Responsive** | Fixed sidebar on desktop, slide-in drawer on mobile (Bootstrap Offcanvas) |
| 🧠 **Quiz Challenges** | 4 multiple-choice questions (Easy → Hard) with instant visual feedback |

---

## 📚 Syllabus Coverage — 6 Units, 20+ Modules

### Unit I — Scaffolding
- Introduction to Bootstrap
- File Structure & HTML Template
- Containers & Responsive Design

### Unit II — Grid System
- Bootstrap 12-Column Grid System

### Unit III — Layout Components
- Navbar & Navigation
- Dropdown Menus
- Button Groups
- Breadcrumbs & Pagination
- Cards
- Badges & Spinners

### Unit IV — Bootstrap CSS
- Typography
- Tables & Code
- Forms
- Buttons
- Images & Icons

### Unit V — JavaScript Plugins
- Modals
- Carousel
- Collapse, Accordion & Tabs
- Tooltips & Popovers
- Scrollspy, Alerts & More

### Unit VI — Utilities
- Flexbox Utilities
- Display & Float Utilities
- Utilities API & Resources

### 🏆 Challenges
- 4 MCQ quiz questions (Easy, Easy, Medium, Hard)

---

## 🗂️ Project Structure

```
bootstrap-playground/
├── index.html      →  1816 lines  │  All content, structure, and layout
├── style.css       →   289 lines  │  Custom styles (colors, animations, layout)
├── script.js       →   449 lines  │  Gamification, XP, quizzes, live editors
├── Info.txt        →   841 lines  │  Detailed codebase guide (for presentation)
├── vision.txt      →   283 lines  │  Project vision & feature report
├── orders.txt      →   307 lines  │  Chronological log of all dev requests
└── README.md       →   this file
```

**Total codebase: 3 files (HTML + CSS + JS) — zero build tools, zero dependencies.**

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **HTML5** | — | Semantic structure, data attributes |
| **CSS3** | — | Transitions, keyframes, media queries, pseudo-elements |
| **Vanilla JavaScript** | ES5 | Gamification, DOM manipulation, event handling |
| **Bootstrap** | 5.3.3 | CSS framework — grid, components, utilities |
| **Bootstrap Icons** | 1.11.3 | 20+ UI icons via icon font |
| **Google Fonts** | Inter | Modern sans-serif typography (400, 600, 700, 800) |

> No jQuery · No React · No Vite · No npm · No build step

---

## 🚀 Getting Started

### Option 1: Open Directly
Simply double-click `index.html` in your browser. That's it — everything loads from CDN.

### Option 2: Local Server (optional)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000` (or the port shown).

> ⚠️ An internet connection is required to load Bootstrap and font assets from CDN.

---

## 🎮 Interactive Demos Per Module

Every module includes a **🎮 PLAYGROUND** section with clickable interactivity:

| Module | Interactive Feature |
|--------|-------------------|
| Containers | Width switcher — Fluid / Fixed / Small / Large |
| Grid System | Column resizer — col-3, col-4, col-6, col-8, col-10 |
| Navbar | Color changer — Primary / Dark / Success / Warning |
| Button Groups | Size toggler — Small / Default / Large |
| Breadcrumbs & Pagination | Clickable page numbers with active state |
| Cards | Color scheme changer — 5 variants |
| Badges & Spinners | Click-to-increment counter + Reset |
| Typography | Class toggler — Bold / Italic / Uppercase / Lead / Center / Color |
| Tables | Style toggler — Striped / Hover / Bordered / Dark |
| Buttons | Color changer — 6 colors + outline variant |
| Images & Icons | Shape toggler — Rounded / Circle / Thumbnail |
| Flexbox | Alignment playground — Start / Center / End / Between / Around / Column |
| Display & Float | Display type switcher — block / none / inline / inline-block |
| Utilities API | Padding & effects — p-1 / p-3 / p-5 / Shadow / Border |

---

## 🏅 Gamification System

### XP Rewards
| Action | XP Earned |
|--------|-----------|
| Complete a module | +50 XP |
| Correct quiz answer | +100 XP |
| First playground interaction | +10 XP |
| Live edit a code example | +2 XP per keystroke |
| Streak bonus (3+ in a row) | +25 XP extra |

### Level Progression
| Level | XP Required | Badge |
|-------|-------------|-------|
| Beginner | 0 | 🌱 |
| Learner | 100 | 📗 |
| Explorer | 300 | ⚡ |
| Builder | 600 | 🔥 |
| Master | 1000 | 🏆 |
| Bootstrap King | 1500 | 👑 |

### Streak System
- Consecutive module completions increase your streak counter
- Streak ≥ 3 awards a **bonus +25 XP** per completion
- Wrong quiz answer resets streak to 0

---

## 🎨 Custom CSS Highlights

| Feature | CSS Technique |
|---------|--------------|
| Hero gradient animation | `@keyframes heroPulse` — subtle breathing gradient |
| Card hover lift | `transform: translateY(-3px)` + box-shadow |
| Playground label | `::before` pseudo-element — "🎮 PLAYGROUND" floating badge |
| Fade-in on scroll | `.fade-in` → `.fade-in.visible` transition (controlled by JS) |
| Bounce animation | `@keyframes bounce` — scale pop on button clicks |
| Badge glow | `box-shadow` on hover for XP/Level/Streak badges |
| Theme toggle spin | `transform: rotate(30deg) scale(1.2)` on hover |
| Fixed sidebar | `position: fixed` with `calc(100vh - 64px)` height |
| Responsive layout | `@media (max-width: 991px)` — sidebar collapses, margins adjust |

---

## 🧠 JavaScript Architecture

The entire JS logic resides in `script.js`, wrapped in a single `DOMContentLoaded` listener:

1. **Tooltip & Popover Init** — Manual Bootstrap JS initialization (required by Bootstrap)
2. **Sidebar Management** — Auto-close on mobile, active link highlighting on scroll
3. **Fade-In Controller** — IntersectionObserver-style scroll detection for section animations
4. **Theme Toggle** — Swaps `data-bs-theme` on `<html>` + adjusts body background
5. **XP Engine** — `addXP()` function with floating "+50 XP" popup animation
6. **Auto Complete Buttons** — Dynamically injects "✅ Complete" buttons into every module
7. **Progress Tracker** — Calculates `(completed / total) × 100` and updates 4 display locations
8. **Quiz Handler** — Correct/wrong feedback with visual states and streak management
9. **Live HTML Editors** — Auto-injected `<textarea>` editors that sync to preview output
10. **Typing Effect** — Character-by-character animation on the hero heading
11. **Victory Screen** — Full-screen overlay with emoji burst when all modules are completed

---

## 📦 Bootstrap Components Demonstrated

The project showcases **40+ Bootstrap components and utilities**, including:

- **Layout:** Container, Container-fluid, Row, Col, Grid breakpoints, Offcanvas
- **Navigation:** Navbar, Nav-tabs, Nav-pills, Breadcrumbs, Pagination
- **Content:** Cards, Badges, Spinners, Alerts, Tables, Typography, Images
- **Forms:** Form-control, Form-select, Form-check, Form-switch, Input-group, Floating labels
- **Interactive:** Modals, Carousel, Collapse, Accordion, Tabs, Tooltips, Popovers, Dropdowns
- **Buttons:** btn-primary/success/danger/warning/info, outline variants, btn-group, sizing
- **Utilities:** Flexbox, Display, Float, Spacing, Sizing, Borders, Shadows, Opacity, Colors
- **Data Attributes:** `data-bs-toggle`, `data-bs-target`, `data-bs-dismiss`, `data-bs-theme`

---

## 📄 Documentation Files

| File | Purpose |
|------|---------|
| **Info.txt** | Complete codebase walkthrough — explains every HTML section, CSS rule, and JS function in plain language. Designed to help prepare for class presentations. |
| **vision.txt** | Project vision report — requirements, tech stack, module list, gamification features, component inventory, and line counts. |
| **orders.txt** | Chronological log of every modification request across all development conversations — useful for understanding the project's evolution. |

---

## 🔄 Project Evolution

| Version | Date | Description | Lines |
|---------|------|-------------|-------|
| v1 | Mar 2026 | Initial build — live editors, glassmorphism, confetti | ~4,060 |
| v2 | Apr 16 | Advanced lab — Ghost Grid, Breakpoint Simulator | More complex |
| v3 | Apr 17 | Identified issues — too advanced for student project | Analysis phase |
| v4 | Apr 19 | Major simplification — standard Bootstrap + simple JS | ~1,501 |
| v5 | Apr 19 | Added interactive playgrounds to all modules | ~1,608 |
| v6 | Apr 19+ | Added live HTML editors, expanded gamification, quiz XP | Current |

---

## 📋 Key Design Decisions

1. **Vanilla JS only** — No frameworks, no build tools, explainable line-by-line
2. **Bootstrap via CDN** — No local install, no package management
3. **All 22 modules kept** — Full CAP916 syllabus coverage, nothing trimmed
4. **MCQ challenges** — Replaced code editors with simpler multiple-choice quizzes
5. **Dark theme default** — Using Bootstrap's native `data-bs-theme="dark"`
6. **Interactive everything** — Every module has a clickable playground demo
7. **Defensible code** — Every line can be explained in a class presentation
8. **Mobile-first responsive** — Offcanvas sidebar, fluid containers, breakpoint-aware layout

---

## 📝 License

© 2026 — Built for **CAP916: Front-End Web UI Frameworks & Tools**

---

<p align="center">
  Built with ❤️ to help you learn Bootstrap
</p>
