# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install     # Install dependencies
bun run dev     # Start dev server on port 3000
bun run build   # Type-check and build for production
bun run lint    # Format code with Biome
bun run preview # Preview production build
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling and dev server
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin - custom theme defined in `src/index.css` using oklch color values
- **React Router v7** for client-side routing
- **Lenis** for smooth scrolling with snap functionality
- **Jotai** for atomic state management
- **Framer Motion** for animations
- **Biome** for formatting and linting (not ESLint)
- Path alias: `@` resolves to `src/`

## Architecture

### Routing
Pages are lazy-loaded via `React.lazy()` and rendered through `createBrowserRouter` in `src/app/App.tsx`. Routes: `/` (Home), `/project`, `/experience`.

### Smooth Scrolling
Lenis is initialized in `src/app/providers/LenisProvider.tsx` with snap scrolling enabled. Both `window.lenis` and `window.snap` are exposed globally for debugging.

### Styling
Global CSS variables and custom utilities are defined in `src/index.css`. The `@theme` block defines custom radius, color, spacing, and animation tokens. Custom fonts are loaded via `@font-face`.

### Component Organization
Components are grouped by domain:
- `home/` - Hero section, talent cards
- `project/` - Project list and preview cards
- `experience/` - Work experience timeline
- `achievement/` - Academic achievements and credentials
- `layout/` - Navigation, footer, page layout wrapper
- `ui/` - Reusable UI primitives (buttons, timelines, code blocks, 3D/physics components)

### State Management
Jotai atoms in `src/atoms/` (e.g., `scrollAtom.ts`). UI components communicate via atoms rather than prop drilling.

### Utilities
- `src/lib/utils.ts` - `cn()` function combining `clsx` and `tailwind-merge` for className merging
- `src/utils/` - SVG path manipulation, position calculation utilities
