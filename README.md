![VentiBanner](/assets/image.png)
# Venti UI

A modern, accessible, and highly customizable React component library built with Tailwind CSS, TypeScript, and Framer Motion.

![Venti UI](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19+-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

Venti UI provides beautifully designed, production-ready React components that integrate seamlessly into existing Tailwind CSS projects. The library focuses on developer experience, accessibility, performance, and customization without introducing unnecessary complexity.

Built for teams who want modern UI components without sacrificing control over their design system.

## Features

* 🎨 Fully customizable with Tailwind CSS
* ♿ Accessibility-first (WAI-ARIA compliant)
* ⚡ Lightweight and optimized
* 📦 Modular imports
* 🔒 Strict TypeScript support
* 🎭 Framer Motion animations
* 🌙 Themeable via CSS variables
* 🚀 Next.js App Router compatible
* 🧩 Copy-paste component architecture
* 📦 CLI scaffold (`create-venti-app`)

## Component Catalog

### Form Components

* Advanced Select
* Checkbox
* Color Picker
* Combo Box
* File Input
* Range Slider
* Search Box
* Switch
* Textarea
* Time Picker

### Layout & Navigation

* Accordion
* Collapse
* Divider
* Dropdown
* Grid
* Link
* Modal
* Popover
* Scroll Area
* Tooltip

### Feedback & Display

* Alert
* Avatar
* Badge
* Blockquote
* Card
* Legend Indicator
* Progress
* Ratings
* Skeleton
* Toasts

### Advanced Components

* Chat Bubbles
* Timeline
* Toggle Count

## Installation

### Quick scaffold (recommended)

Scaffold a new Next.js project with all components pre-installed:

```bash
bash <(curl -s https://raw.githubusercontent.com/duckeydev/VentiUI/main/install.sh) my-app
cd my-app
npm run dev
```

Or run interactively:

```bash
bash <(curl -s https://raw.githubusercontent.com/duckeydev/VentiUI/main/install.sh)
```

This sets up:
- Next.js + TypeScript + Tailwind CSS v4
- All 65+ components in `components/`
- Utility library in `lib/` ( `cn()`, theme engine)
- shadcn-style CSS variables (Coffee theme) with light/dark mode

### Manual install (existing project)

```bash
# Required peer dependencies
npm install framer-motion class-variance-authority clsx tailwind-merge @tabler/icons-react

# Dev dependencies (Tailwind v4)
npm install -D tailwindcss @tailwindcss/postcss
```

Then copy the files you need from `components/`, `lib/`, and `app/globals.css` into your project.

Ensure your `tsconfig.json` has the `@/*` path alias:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

## Quick Start

```tsx
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";

export default function Home() {
  return (
    <Card className="max-w-md p-8 shadow-xl">
      <CardContent>
        <h1 className="mb-2 text-2xl font-bold">Hello Venti</h1>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## Design Philosophy

### Modular

Import only what you need. Components are designed to keep bundle sizes small and avoid unnecessary dependencies.

### Themable

Venti UI uses CSS variables and Tailwind configuration integration, allowing complete control over colors, spacing, typography, and design tokens.

### Accessible

Every component is designed with keyboard navigation, screen readers, focus management, and accessibility best practices in mind.

### Type Safe

Built with strict TypeScript to provide excellent autocomplete, type checking, and developer tooling.

## Framework Support

Venti UI works with:

* React
* Next.js
* Vite
* Tailwind CSS
* Framer Motion

## Performance

| Metric                 | Value |
| ---------------------- | ----- |
| Lighthouse Score       | 100%  |
| Average Component Size | < 5KB |
| Components Included    | 65+   |

## Next.js Support

Venti UI fully supports the Next.js App Router.

Interactive components use the `"use client"` directive only where necessary, allowing the rest of your application to benefit from server rendering and streaming.

## Customization

Venti UI integrates directly with existing Tailwind projects.

Simply copy the provided theme configuration into your project and customize variables as needed.

```css
:root {
  --primary: 210 100% 56%;
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
}
```

## Why Venti UI?

Instead of rebuilding common UI patterns for every project, Venti UI provides production-ready implementations for:

* Advanced Selects
* Search Interfaces
* Timelines
* Command Palettes
* Chat Interfaces
* Time Pickers
* Modals
* Toast Systems
* Complex Navigation

Focus on your application's business logic instead of rebuilding infrastructure.

## Roadmap

* [ ] More advanced data visualization components
* [ ] Design token generator
* [ ] Additional theme packs
* [ ] React Native compatibility exploration
* [x] Component CLI installer
* [ ] Visual theme editor

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Community

* GitHub
* Discord
* Documentation Site

## License

MIT License

---

**Venti UI** — Beautiful React components for teams that ship fast. 🚀
