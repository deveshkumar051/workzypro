# Workzy Platform — Futuristic UI v2.0
## Complete Integration Guide

---

## What Was Changed

This upgrade transforms the entire frontend into a **Cyberpunk / Glassmorphism / Neon Dark UI** while keeping all backend connections, routing, and functionality 100% intact.

---

## New Files Added

### frontend-client/
```
src/
├── styles/
│   └── global.css              ← Complete dark theme rewrite
├── components/common/
│   ├── Navbar.jsx              ← Glass navbar + scroll hide/show
│   ├── Footer.jsx              ← Futuristic footer with neon line
│   ├── CustomCursor.jsx        ← Custom cursor system (dot + ring)
│   ├── PageLoader.jsx          ← Animated progress loader
│   └── ThreeBackground.jsx     ← Three.js particle field + grid
├── hooks/
│   └── useAnimations.js        ← GSAP helpers + magnetic + scroll reveal
├── layouts/
│   └── MainLayout.jsx          ← Wraps ThreeBackground + Cursor + effects
└── pages/
    ├── Home.jsx                ← Full futuristic hero + sections
    ├── Login.jsx               ← Glass card login
    ├── Register.jsx            ← Glass card register
    ├── Dashboard.jsx           ← Dark stat cards
    └── Services.jsx            ← Dark service grid
```

### frontend-helper/
```
src/
├── styles/
│   └── global.css              ← Same dark theme
├── components/common/
│   ├── Sidebar.jsx             ← Collapsible neon sidebar
│   ├── CustomCursor.jsx        ← Shared cursor
│   ├── ThreeBackground.jsx     ← Shared Three.js
│   └── PageLoader.jsx          ← Shared loader
├── hooks/
│   └── useAnimations.js        ← Shared animations
├── layouts/
│   └── DashboardLayout.jsx     ← Updated with cursor + grid
└── pages/
    ├── Login.jsx               ← Helper login (purple theme)
    └── Register.jsx            ← Helper register
```

---

## Step 1 — Install Dependencies

### Client frontend
```bash
cd frontend-client
npm install
# (gsap and three are already in package.json)
```

### Helper frontend
```bash
cd frontend-helper
npm install
```

---

## Step 2 — Copy Files

Replace the following files in your project with the ones from this package:

**frontend-client:**
- `src/styles/global.css`
- `src/layouts/MainLayout.jsx`
- `src/components/common/Navbar.jsx`
- `src/components/common/Footer.jsx`
- `src/pages/Home.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/Services.jsx`

**Add these new files:**
- `src/components/common/CustomCursor.jsx`
- `src/components/common/PageLoader.jsx`
- `src/components/common/ThreeBackground.jsx`
- `src/hooks/useAnimations.js`

**frontend-helper:**
- `src/styles/global.css`
- `src/layouts/DashboardLayout.jsx`
- `src/components/common/Sidebar.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`

**Add these new files:**
- `src/components/common/CustomCursor.jsx`
- `src/components/common/PageLoader.jsx`
- `src/components/common/ThreeBackground.jsx`
- `src/hooks/useAnimations.js`

---

## Step 3 — Update Remaining Pages

All remaining pages (MyBookings, BookingDetails, Profile, etc.) will automatically look better because they use the global CSS classes that are now dark-themed. You can further enhance them by:

1. **Adding `.reveal` class** to any section wrapper for scroll-in animation:
```jsx
<div className="card reveal">
  ...your content...
</div>
```

2. **Using `.gradient-text`** on headings:
```jsx
<h2>Book a <span className="gradient-text">Helper</span></h2>
```

3. **Using `.section-label`** before section headings:
```jsx
<div className="section-label">Services</div>
<h2>...</h2>
```

4. **Using new button variants:**
```jsx
<button className="btn btn-primary">Cyan gradient</button>
<button className="btn btn-purple">Purple gradient</button>
<button className="btn btn-gold">Gold gradient</button>
<button className="btn btn-glass">Glass</button>
<button className="btn btn-outline">Outline</button>
```

---

## Step 4 — Upgrading Other Remaining Pages

For pages not fully rewritten, apply this pattern:

**Before (old):**
```jsx
<div style={{ background: '#1E3A8A', padding: '48px 0' }}>
  <h1 style={{ color: '#fff' }}>Page Title</h1>
</div>
```

**After (futuristic):**
```jsx
<div style={{
  background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(139,92,246,0.07))',
  borderBottom: '1px solid var(--border)',
  padding: '56px 0 48px',
}}>
  <div className="section-label">Section</div>
  <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: '-1px' }}>
    Page <span className="gradient-text">Title</span>
  </h1>
</div>
```

---

## Design Tokens Reference

```css
/* Backgrounds */
var(--bg)           /* #050508 - main dark */
var(--bg-2)         /* #0a0a12 - slightly lighter */
var(--glass)        /* rgba(255,255,255,0.04) */
var(--glass-border) /* rgba(255,255,255,0.09) */

/* Accent Colors */
var(--cyan)         /* #00e5ff */
var(--purple)       /* #8b5cf6 */
var(--blue)         /* #3b82f6 */
var(--gold)         /* #f59e0b */
var(--green)        /* #10b981 */
var(--red)          /* #ef4444 */

/* Text */
var(--text)         /* #f0f4ff */
var(--text-muted)   /* rgba(240,244,255,0.55) */
var(--text-dim)     /* rgba(240,244,255,0.30) */

/* Glows */
var(--cyan-dim)     /* rgba(0,229,255,0.12) */
var(--purple-dim)   /* rgba(139,92,246,0.12) */
var(--shadow-cyan)  /* 0 0 30px rgba(0,229,255,0.2) */
```

---

## Performance Tips

1. **Three.js is lazy-loaded** — it only loads when the component mounts, so initial bundle size is not affected.
2. **Particle count auto-scales** — 600 particles on mobile, 1400 on desktop.
3. **All animations use** `will-change: transform` and `requestAnimationFrame` — no layout thrashing.
4. **Scroll reveal uses** `IntersectionObserver` — zero scroll event listeners.
5. **Custom cursor is hidden on mobile** — no unnecessary JS running on touch devices.
6. **GSAP is only imported when needed** — dynamic imports with `await import('gsap')`.

---

## Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: Android Chrome, iOS Safari (cursor disabled, animations preserved)

---

## Backend

The backend (`/backend`) is completely untouched. All API calls, authentication, session management, and database connections remain identical.
