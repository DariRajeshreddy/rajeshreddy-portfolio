# Premium 3D Portfolio

Interactive portfolio site for a frontend developer, built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, **GSAP + ScrollTrigger**, **React Three Fiber**, **Drei**, and **Lenis** smooth scrolling. **App shell state** (theme, loader, active section) uses **React Context** to avoid Vite pre-bundling issues with duplicate React copies.

## Features

- Lenis smooth scroll integrated with GSAP ScrollTrigger (`SmoothScroll` + `scrollerProxy`)
- Custom cursor (fine pointers only) with GSAP smoothing
- Full-screen page loader with lazy-loaded Three.js scene
- Hero with lazy **HeroCanvas**: icosahedron, torus, particles, sparkles, pointer-driven motion, scroll parallax camera
- About, Skills (scroll-driven stack + lazy **SkillsCube**), Projects (lazy chunk, 3D tilt cards, GSAP reveals), Experience timeline, Contact form
- React Context + `useAppStore` selector hook: theme (dark/light), loader state, active nav section (Intersection Observer)
- Glassmorphism UI, neon accents, responsive navbar with animated active pill
- `React.lazy` + `Suspense` for **Projects**, **HeroCanvas**, **LoaderCanvas**, **SkillsCubeCanvas**
- SEO meta tags in `index.html`

## Project layout

```
src/
  animations/     # Framer Motion variants
  assets/         # Static assets (SVGs, etc.)
  components/     # Navbar, PageLoader, CustomCursor, SmoothScroll, ErrorBoundary
  context/        # Lenis ref context (for optional Lenis access)
  hooks/          # useMediaQuery, useActiveSection, useThemeClass
  sections/       # Page sections (Hero, About, Skills, Projects, …)
  store/          # AppStoreProvider + useAppStore (React Context)
  three/          # R3F canvases and scenes
```

## Setup

Requirements: **Node.js 20+** (recommended).

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start Vite dev server with HMR |
| `npm run build` | Typecheck + production build     |
| `npm run preview` | Serve the `dist` folder        |
| `npm run lint`  | ESLint                         |

## Customization

- **Profile copy & links**: `src/sections/*`, `src/components/Navbar.tsx`, `src/sections/Footer.tsx`
- **Projects list**: `src/sections/Projects.tsx` (`projects` array)
- **Experience**: `src/sections/Experience.tsx`
- **3D tuning**: `src/three/HeroScene.tsx`, `src/three/SkillsCube.tsx`
- **Loader duration**: `src/components/PageLoader.tsx` (`setTimeout` ms)
- **Hero text timing** (after loader): `src/sections/Hero.tsx` (GSAP `delay` / Framer `transition.delay`)

## Performance notes

- 3D chunks are code-split; Drei `Text` on the skill cube pulls a font on first use.
- DPR is capped in canvases (`dpr={[1, 1.75]}` hero, `[1, 1.5]` elsewhere) to balance quality and GPU load.
- `ErrorBoundary` wraps heavy WebGL trees so a context loss does not blank the whole app.
