#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────
#  Venti UI — create-venti-app
# ──────────────────────────────────────────────
# Scaffolds a Next.js project with Venti UI
# components sourced from github.com/duckeydev/VentiUI.
#
# Usage:
#   bash install.sh                    # interactive
#   bash install.sh my-project         # quick mode
#   bash install.sh --help             # show help
# ──────────────────────────────────────────────
GITHUB_RAW="https://raw.githubusercontent.com/duckeydev/VentiUI/main"
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

# ─── Help ─────────────────────────────────────
if [ "${1:-}" = "--help" ] || [ "${1:-}" = "-h" ]; then
  echo "Usage: bash install.sh [project-name]"
  echo ""
  echo "Scaffolds a Next.js + Venti UI project."
  echo "Omitting project-name starts interactive mode."
  echo ""
  echo "Environment:"
  echo "  VENTI_PM    Package manager: npm, bun, pnpm, yarn  (default: auto)"
  exit 0
fi

# ─── Splash ───────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}  ╔══════════════════════════════╗${NC}"
echo -e "${CYAN}${BOLD}  ║     Venti UI  —  Install     ║${NC}"
echo -e "${CYAN}${BOLD}  ╚══════════════════════════════╝${NC}"
echo ""

# ─── Helpers ──────────────────────────────────
prompt() {
  local msg="$1" var="$2" default="$3"
  read -r -p "$(echo -e "${CYAN}?${NC} ${msg} (${default}): ")" input
  printf -v "$var" "%s" "${input:-$default}"
}
prompt_yn() {
  local msg="$1" var="$2" default="${3:-y}"
  local dsp="Y/n"; [ "$default" = "n" ] && dsp="y/N"
  read -r -p "$(echo -e "${CYAN}?${NC} ${msg} (${dsp}): ")" input
  input="${input:-$default}"
  case "$input" in [Yy]*) printf -v "$var" "y" ;; *) printf -v "$var" "n" ;; esac
}

# ─── 1. Project name ─────────────────────────
if [ $# -ge 1 ] && [ -n "$1" ]; then
  QUICK_MODE=true; PROJECT_NAME="$1"
else
  QUICK_MODE=false
  echo -e "${CYAN}?${NC} Let's set up a new Venti UI project."
  prompt "Project name" PROJECT_NAME "my-venti-app"
fi

TARGET="$(pwd)/$PROJECT_NAME"
if [ -d "$TARGET" ] && [ "$(ls -A "$TARGET" 2>/dev/null)" ]; then
  echo -e "${RED}Error:${NC} '$TARGET' already exists and is not empty."
  exit 1
fi
mkdir -p "$TARGET" && cd "$TARGET"

# ─── 2. Options ──────────────────────────────
if [ "$QUICK_MODE" = true ]; then
  USE_THEME_ENGINE="y"; USE_GIT="y"
else
  echo ""
  prompt_yn "Include theme engine (ThemeProvider, presets)?" USE_THEME_ENGINE "y"
  prompt_yn "Initialize a git repository?" USE_GIT "y"
  echo ""
fi

# ─── 3. Package manager ──────────────────────
detect_pm() {
  if [ -n "${VENTI_PM:-}" ]; then echo "$VENTI_PM"; return; fi
  if command -v bun &>/dev/null; then echo "bun"
  elif command -v pnpm &>/dev/null; then echo "pnpm"
  elif command -v yarn &>/dev/null; then echo "yarn"
  else echo "npm"; fi
}
PM="$(detect_pm)"
echo -e "  ${GREEN}✓${NC} Package manager: ${BOLD}$PM${NC}"

# ─── 4. Scaffold structure ───────────────────
echo ""
echo -e "${BOLD}Scaffolding project...${NC}"
mkdir -p components lib app
mkdir -p public

# ─── 5. Fetch components from GitHub ─────────
echo -e "  ${GREEN}→${NC} Downloading components from github.com/duckeydev/VentiUI..."

COMPONENTS=(
  index.ts
  accordion.tsx advanced-select.tsx alert.tsx avatar.tsx avatarGroup.tsx
  badge.tsx blockquote.tsx button.tsx buttonGroup.tsx card.tsx carousel.tsx
  chatBubbles.tsx checkbox.tsx collapse.tsx color-picker.tsx column.tsx
  combo-box.tsx container.tsx context-menu.tsx copy-markup.tsx datepicker.tsx
  devices.tsx divider.tsx dropdown.tsx file-input.tsx fileUploadingProgress.tsx
  grid.tsx images.tsx input.tsx input-group.tsx input-number.tsx kbd.tsx
  layoutSplitter.tsx legendIndicator.tsx link.tsx list.tsx listGroup.tsx
  marquee.tsx modal.tsx offcanvas.tsx pin-input.tsx popover.tsx progress.tsx
  radio.tsx range.tsx ratings.tsx scroll-area.tsx search-box.tsx select.tsx
  skeleton.tsx spinners.tsx strong-password.tsx styledIcon.tsx switch.tsx
  table.tsx tabs.tsx textarea.tsx time-picker.tsx timeline.tsx toasts.tsx
  toggle-count.tsx toggle-password.tsx tooltip.tsx treeView.tsx typography.tsx
)

failed=0
for f in "${COMPONENTS[@]}"; do
  if ! curl -sfL "$GITHUB_RAW/components/$f" -o "components/$f" --connect-timeout 10 --max-time 30; then
    echo -e "  ${RED}✗${NC} Failed to download components/$f"
    ((failed++))
  fi
done
if [ "$failed" -eq 0 ]; then
  echo -e "  ${GREEN}✓${NC} Downloaded ${#COMPONENTS[@]} component files"
else
  echo -e "  ${RED}${failed} component(s) failed to download${NC}"
fi

# ─── 6. Fetch lib files from GitHub ──────────
echo -e "  ${GREEN}→${NC} Downloading lib files..."
for f in utils.ts theme.ts; do
  curl -sfL "$GITHUB_RAW/lib/$f" -o "lib/$f" --connect-timeout 10 --max-time 30 || {
    echo -e "  ${RED}✗${NC} Failed to download lib/$f"
    ((failed++))
  }
done
if [ "$USE_THEME_ENGINE" = "y" ]; then
  if curl -sfL "$GITHUB_RAW/lib/theme-engine.tsx" -o "lib/theme-engine.tsx" --connect-timeout 10 --max-time 30; then
    echo -e "  ${GREEN}✓${NC} Theme engine included"
  else
    echo -e "  ${RED}✗${NC} Failed to download lib/theme-engine.tsx"
  fi
fi
echo -e "  ${GREEN}✓${NC} Downloaded lib files"

# ─── 7. globals.css (shadcn-style theme) ─────
cat > app/globals.css <<-'GLOBALS'
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --font-sans:
    var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:
    var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, monospace;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

/* Theme: Coffee */
:root {
  --background: oklch(0.995 0.008 80);
  --foreground: oklch(0.18 0.03 50);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.18 0.03 50);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.18 0.03 50);
  --primary: oklch(0.4 0.08 50);
  --primary-foreground: oklch(0.98 0.005 50);
  --secondary: oklch(0.93 0.01 55);
  --secondary-foreground: oklch(0.25 0.02 50);
  --muted: oklch(0.95 0.008 55);
  --muted-foreground: oklch(0.5 0.02 50);
  --accent: oklch(0.9 0.015 55);
  --accent-foreground: oklch(0.25 0.02 50);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.88 0.01 55);
  --input: oklch(0.88 0.01 55);
  --ring: oklch(0.45 0.07 50);
  --chart-1: oklch(0.5 0.07 50);
  --chart-2: oklch(0.45 0.05 70);
  --chart-3: oklch(0.55 0.06 30);
  --chart-4: oklch(0.4 0.05 90);
  --chart-5: oklch(0.6 0.08 10);
  --sidebar: oklch(0.985 0.005 55);
  --sidebar-foreground: oklch(0.18 0.03 50);
  --sidebar-primary: oklch(0.4 0.08 50);
  --sidebar-primary-foreground: oklch(0.98 0.005 50);
  --sidebar-accent: oklch(0.93 0.01 55);
  --sidebar-accent-foreground: oklch(0.25 0.02 50);
  --sidebar-border: oklch(0.88 0.01 55);
  --sidebar-ring: oklch(0.45 0.07 50);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.14 0.015 50);
  --foreground: oklch(0.92 0.008 50);
  --card: oklch(0.2 0.02 50);
  --card-foreground: oklch(0.92 0.008 50);
  --popover: oklch(0.2 0.02 50);
  --popover-foreground: oklch(0.92 0.008 50);
  --primary: oklch(0.65 0.1 50);
  --primary-foreground: oklch(0.14 0.015 50);
  --secondary: oklch(0.26 0.02 50);
  --secondary-foreground: oklch(0.92 0.008 50);
  --muted: oklch(0.22 0.015 50);
  --muted-foreground: oklch(0.6 0.02 50);
  --accent: oklch(0.28 0.025 50);
  --accent-foreground: oklch(0.92 0.008 50);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.65 0.08 50);
  --chart-1: oklch(0.65 0.08 50);
  --chart-2: oklch(0.6 0.06 70);
  --chart-3: oklch(0.7 0.07 30);
  --chart-4: oklch(0.55 0.06 90);
  --chart-5: oklch(0.75 0.09 10);
  --sidebar: oklch(0.17 0.015 50);
  --sidebar-foreground: oklch(0.92 0.008 50);
  --sidebar-primary: oklch(0.65 0.1 50);
  --sidebar-primary-foreground: oklch(0.14 0.015 50);
  --sidebar-accent: oklch(0.22 0.015 50);
  --sidebar-accent-foreground: oklch(0.92 0.008 50);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.65 0.08 50);
  --radius: 0.625rem;
}

/* Entry Animations */
.animate-in {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: forwards;
}
.fade-in { animation-name: fadeIn; }
.slide-in-from-top-2 { animation-name: slideInFromTop; }

/* Exit Animations */
.animate-out {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: forwards;
}
.fade-out { animation-name: fadeOut; }
.slide-out-to-right-8 { animation-name: slideOutToRight; }
.slide-out-to-left-8 { animation-name: slideOutToLeft; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes slideInFromTop {
  from { transform: translateY(-0.5rem); }
  to { transform: translateY(0); }
}
@keyframes slideOutToRight {
  from { transform: translateX(0); }
  to { transform: translateX(2rem); }
}
@keyframes slideOutToLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-2rem); }
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@layer utilities {
  .animate-marquee { animation: marquee 30s linear infinite; }
}

@layer utilities {
  .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--border) / 0.8);
    border-radius: 100px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground) / 0.4);
  }
  .custom-scrollbar { scrollbar-width: thin; scrollbar-color: hsl(var(--border) / 0.8) transparent; }
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground; }
}
GLOBALS

echo -e "  ${GREEN}✓${NC} Created app/globals.css (Coffee theme)"

# ─── 8. postcss.config.mjs ───────────────────
cat > postcss.config.mjs <<-'EOF'
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
EOF
echo -e "  ${GREEN}✓${NC} Created postcss.config.mjs"

# ─── 9. Root layout ─────────────────────────
cat > app/layout.tsx <<-LAYOUT
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$PROJECT_NAME",
  description: "Built with Venti UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
LAYOUT

# ─── 10. Home page ──────────────────────────
cat > app/page.tsx <<-PAGE
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="max-w-md p-8 text-center shadow-xl">
        <CardContent>
          <h1 className="mb-2 text-2xl font-bold">Venti UI</h1>
          <p className="mb-6 text-muted-foreground">
            Your project is ready. Start editing <code>app/page.tsx</code>.
          </p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </main>
  );
}
PAGE
echo -e "  ${GREEN}✓${NC} Created app/layout.tsx and app/page.tsx"

# ─── 11. package.json ───────────────────────
cat > package.json <<-EOF
{
  "name": "$PROJECT_NAME",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tabler/icons-react": "^3.44.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.40.0",
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
EOF

# ─── 12. tsconfig.json ──────────────────────
cat > tsconfig.json <<-EOF
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
echo "" > next-env.d.ts
echo -e "  ${GREEN}✓${NC} Created tsconfig.json"

# ─── 13. .gitignore ─────────────────────────
cat > .gitignore <<-'EOF'
node_modules/
.next/
out/
build/
.env*
.vercel
*.tsbuildinfo
next-env.d.ts
EOF

# ─── 14. Install ─────────────────────────────
echo ""
echo -e "${BOLD}Installing dependencies...${NC}"
case "$PM" in
  bun)   bun install ;;
  pnpm)  pnpm install ;;
  yarn)  yarn install ;;
  *)     npm install ;;
esac
echo -e "  ${GREEN}✓${NC} Dependencies installed via ${BOLD}$PM${NC}"

# ─── 15. Git init ────────────────────────────
if [ "$USE_GIT" = "y" ] && command -v git &>/dev/null; then
  git init --quiet && git add . && git commit --quiet -m "Initial commit — Venti UI"
  echo -e "  ${GREEN}✓${NC} Git repository initialized"
fi

# ─── Done ────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}  ┌──────────────────────────────────────────┐${NC}"
echo -e "${GREEN}${BOLD}  │  Venti UI project ready!                  │${NC}"
echo -e "${GREEN}${BOLD}  └──────────────────────────────────────────┘${NC}"
echo ""
echo -e "  ${BOLD}cd${NC} $PROJECT_NAME"
echo -e "  ${BOLD}$PM run dev${NC}"
echo ""
echo "  Components  →  components/   (sourced from GitHub)"
echo "  Library     →  lib/"
echo "  Theme       →  app/globals.css (Coffee theme)"
echo ""
echo "  import { Button } from '@/components/button';"
echo "  import { cn } from '@/lib/utils';"
echo ""
