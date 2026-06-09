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

```bash
bun add framer-motion
```

or

```bash
npm install framer-motion
```

### Peer Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "framer-motion": "^12.0.0",
  "tailwindcss": "^4.0.0"
}
```

## Quick Start

```tsx
import { AdvancedSelect, TimePicker } from "venti-ui";

export default function Dashboard() {
  return (
    <Card className="p-6 shadow-xl">
      <AdvancedSelect
        data={users}
        searchable
        placeholder="Select an assignee..."
      />

      <TimePicker
        format="24h"
        step={15}
      />
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
| Components Included    | 50+   |

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
* [ ] Component CLI installer
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
