"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import {
  IconLayersIntersect,
  IconChevronRight,
  IconSparkles,
  IconCode,
  IconCommand,
  IconCopy,
  IconBrandGithub,
  IconPuzzle,
  IconPalette,
  IconAccessible,
  IconTerminal2,
  IconCheck,
  IconSearch,
  IconSend,
  IconDots,
  IconLibrary,
  IconCloudUpload,
  IconGitBranch,
  IconRocket,
  IconBolt,
  IconShieldCheck,
  IconStar,
  IconBrandTwitter,
  IconBrandDiscord,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandVite,
  IconBrandTailwind,
  IconBrandFramerMotion,
} from "@tabler/icons-react";
import Link from "next/link";
import { Badge } from "@/components/badge";
import { Typography } from "@/components/typography";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { SearchBox } from "@/components/search-box";
import { useEffect, useState } from "react";
import { ChatBubbles } from "@/components/chatBubbles";
import { Timeline } from "@/components/timeline";
import { Accordion, AccordionItem } from "@/components/accordion";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const componentList = [
  "accordion.tsx",
  "chatBubbles.tsx",
  "divider.tsx",
  "legendIndicator.tsx",
  "range.tsx",
  "timeline.tsx",
  "advanced-select.tsx",
  "checkbox.tsx",
  "dropdown.tsx",
  "link.tsx",
  "ratings.tsx",
  "time-picker.tsx",
  "alert.tsx",
  "collapse.tsx",
  "file-input.tsx",
  "listGroup.tsx",
  "scroll-area.tsx",
  "toasts.tsx",
  "avatar.tsx",
  "color-picker.tsx",
  "grid.tsx",
  "search-box.tsx",
  "toggle-count.tsx",
  "badge.tsx",
  "combo-box.tsx",
  "modal.tsx",
  "skeleton.tsx",
  "tooltip.tsx",
  "blockquote.tsx",
  "popover.tsx",
  "progress.tsx",
  "switch.tsx",
  "textarea.tsx",
];

const GLYPHS = "§¶█▒▓░@#$%&*!?<>{}[]";

export function GlitchText({
  text,
  speed = 100,
}: {
  text: string;
  speed?: number;
}) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char) => {
            // There is a 30% chance each character will turn into a glitchy symbol
            if (Math.random() < 0.3) {
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            return char;
          })
          .join(""),
      );
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span style={{ fontFamily: "monospace" }}>{displayText}</span>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [liveSearch, setLiveSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 antialiased selection:bg-neutral-800 selection:text-neutral-50 overflow-x-hidden font-sans">
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/60 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-lg font-bold tracking-tight"
            >
              <span>Venti</span>
              <span className="text-neutral-500 font-light">UI</span>
            </Link>
            <span className="hidden h-4 w-px bg-neutral-800 sm:inline-block" />
            <nav className="hidden items-center gap-5 text-sm font-medium text-neutral-400 sm:flex">
              <Link
                href="/docs/components"
                className="hover:text-neutral-50 transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/docs/themes"
                className="transition-colors hover:text-neutral-50"
              >
                Themes
              </Link>
              <Link
                href="https://github.com/duckeydev/ventiui"
                className="transition-colors hover:text-neutral-50"
              >
                GitHub
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative container mx-auto max-w-5xl pt-32 pb-20 px-4 sm:px-6 text-center">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/30 to-transparent blur-3xl rounded-full" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8 relative z-10"
        >
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto px-4 py-2"
          >
            <Typography
              variant="h1"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-50 leading-[1.1]"
            >
              A{" "}
              <span className="inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 text-neutral-50 font-medium text-[0.65em] sm:text-[0.6em] rounded-lg mx-1 align-middle shadow-sm select-none border border-neutral-800 -translate-y-[0.05em]">
                <svg
                  className="h-[0.95em] w-auto shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 54 33"
                >
                  <g clipPath="url(#prefix__clip0)">
                    <path
                      fill="#38bdf8"
                      fillRule="evenodd"
                      d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                      clipRule="evenodd"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0">
                      <path fill="#fff" d="M0 0h54v32.4H0z" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ml-2">Tailwind CSS</span>
              </span>{" "}
              Component Library
            </Typography>
            <Typography className="text-xl text-neutral-400 max-w-2xl font-light">
              Beautifully designed, highly customizable, and accessible React
              components. Built for speed, modularity, and an uncompromising
              developer experience.
            </Typography>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="w-full sm:w-auto">
              Start Building
              <IconChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Browse Components
              <IconLibrary className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="py-12 border-y border-neutral-800/40 bg-neutral-950/40 overflow-hidden relative w-full">
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950/40 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950/40 to-transparent z-10" />

        <div className="flex whitespace-nowrap gap-12 animate-marquee inline-flex">
          {componentList.concat(componentList).map((comp, idx) => (
            <span
              key={idx}
              className="font-mono text-sm text-neutral-600 flex items-center gap-2 select-none hover:text-neutral-400 transition-colors"
            >
              <span className="text-sky-500/40">&lt;</span>
              {comp.replace(".tsx", "")}
              <span className="text-sky-500/40">/&gt;</span>
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section className="py-24 border-b border-neutral-800/50 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              Everything you need to build faster.
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-neutral-400 max-w-2xl text-lg"
            >
              Over 50+ meticulously crafted components out of the box. From
              simple buttons to complex data grids, command palettes, and time
              pickers.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: <IconPuzzle className="w-5 h-5" />,
                title: "Modular",
                desc: "Import only what you need. Zero bloat, keeping your bundles light.",
              },
              {
                icon: <IconPalette className="w-5 h-5" />,
                title: "Themable",
                desc: "CSS variables out of the box. Integrates directly with Tailwind configs.",
              },
              {
                icon: <IconAccessible className="w-5 h-5" />,
                title: "Accessible",
                desc: "WAI-ARIA compliant components with focus management and keyboard nav.",
              },
              {
                icon: <IconTerminal2 className="w-5 h-5" />,
                title: "Strictly Typed",
                desc: "Written in strict TypeScript to catch errors before they reach production.",
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUpVariants}>
                <Card className="h-full p-6 bg-neutral-900/40 border-neutral-800 backdrop-blur-sm hover:bg-neutral-900/80 hover:border-neutral-700 transition-all cursor-default group">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800/80 flex items-center justify-center text-neutral-400 group-hover:text-sky-400 group-hover:bg-sky-500/10 transition-colors mb-4 border border-neutral-700/50">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PERFORMANCE & STATS SECTION */}
      <section className="py-24 bg-neutral-950 relative border-b border-neutral-800/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-800/60">
            <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <IconShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-4xl font-extrabold text-neutral-50">100%</h4>
              <p className="text-neutral-400 font-medium text-sm tracking-wide uppercase">
                Lighthouse Score
              </p>
            </div>
            <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2">
                <IconBolt className="w-6 h-6" />
              </div>
              <h4 className="text-4xl font-extrabold text-neutral-50">
                &lt; 5kb
              </h4>
              <p className="text-neutral-400 font-medium text-sm tracking-wide uppercase">
                Average Component Size
              </p>
            </div>
            <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                <IconStar className="w-6 h-6" />
              </div>
              <h4 className="text-4xl font-extrabold text-neutral-50">50+</h4>
              <p className="text-neutral-400 font-medium text-sm tracking-wide uppercase">
                Ready-to-use Components
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE ARCHITECTURE / INTERACTIVE SECTION */}
      <section className="py-24 bg-neutral-950/50 relative border-b border-neutral-800/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <Typography
                variant="h2"
                className="text-3xl md:text-5xl font-extrabold tracking-tight"
              >
                Live Interactive Architecture
              </Typography>
              <Typography className="text-neutral-400 text-lg">
                Venti UI fits seamlessly into your React application, utilizing
                the same token-based styling as your core components to ensure
                perfect harmony.
              </Typography>

              <Accordion
                variant="carded"
                allowMultiple={false}
                className="pt-2"
              >
                <AccordionItem
                  id="customization"
                  title="How does customization work?"
                  defaultOpen
                >
                  Venti uses pure Tailwind configurations mapping directly into
                  system CSS variables for painless configuration adjustments.
                  Simply copy the `theme.css` into your global stylesheet.
                </AccordionItem>
                <AccordionItem
                  id="server-components"
                  title="Is Next.js App Router supported?"
                >
                  Yes, fully supported. Our components use the `"use client"`
                  directive strictly where interactivity requires it, ensuring
                  your root static hydration streams stay unblocked.
                </AccordionItem>
                <AccordionItem
                  id="framer-motion"
                  title="Do I need Framer Motion?"
                >
                  Yes, Venti relies on Framer Motion for complex layout
                  animations and exit transitions. It's listed as a peer
                  dependency.
                </AccordionItem>
              </Accordion>
            </div>

            <div className="lg:col-span-7 bg-[#0f0f0f] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
              <div className="bg-neutral-900/80 px-4 py-3 border-b border-neutral-800 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    components-preview.tsx
                  </span>
                </div>
                <IconDots className="w-4 h-4 text-neutral-600" />
              </div>

              <div className="p-6 space-y-8">
                {/* Search / Command Example */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-medium text-neutral-500 flex items-center gap-2">
                    <IconCommand className="w-3.5 h-3.5" />
                    search-box.tsx
                  </span>
                  <SearchBox
                    value={query}
                    onChange={setQuery}
                    onDebounceSearch={setLiveSearch}
                    debounceDelay={400}
                    shortcutKey="/"
                    placeholder="Search documentation, components, or tutorials..."
                    variant="modern"
                  />
                </div>

                {/* Chat Bubbles Example */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-medium text-neutral-500 flex items-center gap-2">
                    <IconSend className="w-3.5 h-3.5" />
                    chat-bubbles.tsx
                  </span>
                  <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/30 p-4 text-left text-sm text-neutral-300">
                    <ChatBubbles
                      messages={[
                        {
                          id: "1",
                          author: "System Bot",
                          text: "Deployment initiated for production environment.",
                          side: "left",
                          avatar: (
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center rounded-full border border-neutral-700">
                              <IconRocket className="w-4 h-4 text-sky-400" />
                            </div>
                          ),
                        },
                        {
                          id: "2",
                          author: "You",
                          text: "Can we rollback to the previous commit?",
                          side: "right",
                          avatar: (
                            <div className="w-full h-full bg-sky-900 flex items-center justify-center rounded-full border border-sky-700">
                              <span className="text-xs font-bold text-sky-200">
                                U
                              </span>
                            </div>
                          ),
                        },
                      ]}
                      defaultVariant="modern"
                      showTimestamps
                    />
                  </div>
                </div>

                {/* Timeline Example */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-medium text-neutral-500 flex items-center gap-2">
                    <IconGitBranch className="w-3.5 h-3.5" />
                    timeline.tsx distribution track
                  </span>
                  <div className="p-6 border border-neutral-800/60 rounded-xl w-full bg-neutral-900/30 backdrop-blur-sm text-left">
                    <Timeline
                      items={[
                        {
                          id: "step-1",
                          title: "Branch Hook Intercepted",
                          description:
                            "Web hook validated successfully for main distribution trunk arrays. Launching transient container isolation environments.",
                          date: "14:22 PM",
                          icon: <IconGitBranch className="w-4 h-4" />,
                          isActive: false,
                        },
                        {
                          id: "step-2",
                          title: "Optimizing Asset Artifacts",
                          description:
                            "Injecting global design system tokens. Minifying bundle size payload maps down below structural target indicators.",
                          date: "14:24 PM",
                          icon: <IconCloudUpload className="w-4 h-4" />,
                          isActive: true,
                        },
                        {
                          id: "step-3",
                          title: "Distribution Edge Sync",
                          description:
                            "Awaiting cluster health initialization verification tracks. Edge proxies staging upcoming system variations.",
                          date: "Pending",
                          icon: <IconRocket className="w-4 h-4" />,
                          isActive: false,
                        },
                      ]}
                      align="left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DEVELOPER EXPERIENCE / CODE SNIPPET SECTION */}
      <section className="py-32 bg-[#0a0a0a] relative border-b border-neutral-800/40">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-neutral-300"
              >
                <IconCode className="w-4 h-4 text-emerald-400" />
                Developer Experience
              </motion.div>
              <motion.h2
                variants={fadeUpVariants}
                className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
              >
                Write less code. <br />
                <span className="text-neutral-500">Ship more products.</span>
              </motion.h2>
              <motion.p
                variants={fadeUpVariants}
                className="text-lg text-neutral-400"
              >
                Stop reinventing the wheel. Venti UI provides complex,
                interactive components like advanced selects, date pickers, and
                layout splitters with a simple, intuitive API. Focus on your
                business logic, not building custom dropdowns.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-3 pt-4">
                {[
                  "Copy and paste markup directly into your app",
                  "Zero complex configuration required",
                  "Seamless Framer Motion animation integration",
                  "Fully customizable via standard Tailwind utility classes",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUpVariants}
                    className="flex items-center gap-3 text-neutral-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <IconCheck className="w-3 h-3" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-xl border border-neutral-800 bg-neutral-900/50 p-2 backdrop-blur-sm shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-10">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 bg-neutral-900 border-neutral-700 hover:bg-neutral-800"
                >
                  <IconCopy className="w-4 h-4" />
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden bg-[#0d0d0d] font-mono text-sm p-6 text-neutral-300 overflow-x-auto shadow-inner border border-neutral-800/50">
                <div className="flex gap-2 mb-4 opacity-50">
                  <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
                  <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
                </div>
                <pre>
                  <code>
                    <span className="text-pink-500">import</span> {"{ "}
                    <span className="text-sky-300">AdvancedSelect</span>,{" "}
                    <span className="text-sky-300">TimePicker</span>
                    {" }"} <span className="text-pink-500">from</span>{" "}
                    <span className="text-emerald-300">
                      "<GlitchText text="venti-ui" />"
                    </span>
                    ;{"\n\n"}
                    <span className="text-neutral-500">
                      {"// No extra config, just import and use"}
                    </span>
                    {"\n"}
                    <span className="text-pink-500">
                      export default function
                    </span>{" "}
                    <span className="text-sky-300">Dashboard</span>() {"{\n"}
                    {"  "}
                    <span className="text-pink-500">return</span> ({"\n"}
                    {"    "}&lt;<span className="text-sky-300">Card</span>{" "}
                    className=
                    <span className="text-emerald-300">"p-6 shadow-xl"</span>
                    &gt;{"\n"}
                    {"      "}&lt;
                    <span className="text-sky-300">AdvancedSelect</span>
                    {"\n        "}data=
                    {"{"}users{"}"}
                    {"\n        "}searchable
                    {"\n        "}placeholder=
                    <span className="text-emerald-300">
                      "Select an assignee..."
                    </span>
                    {"\n      "}/&gt;{"\n"}
                    {"      "}&lt;
                    <span className="text-sky-300">TimePicker</span>
                    {"\n        "}format=
                    <span className="text-emerald-300">"24h"</span>
                    {"\n        "}step=
                    {"{"}15{"}"}
                    {"\n      "}/&gt;{"\n"}
                    {"    "}&lt;/<span className="text-sky-300">Card</span>&gt;
                    {"\n"}
                    {"  "});{"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-neutral-950/30 border-b border-neutral-800/40 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-neutral-50">
              Works with your stack.
            </h2>
            <p className="text-neutral-400">
              Venti UI components are built to be framework agnostic where
              possible, prioritizing standard React architecture.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              {
                icon: <IconBrandNextjs className="w-5 h-5" />,
                name: "Next.js",
              },
              { icon: <IconBrandReact className="w-5 h-5" />, name: "React" },
              { icon: <IconBrandVite className="w-5 h-5" />, name: "Vite" },
              {
                icon: <IconBrandTailwind className="w-5 h-5" />,
                name: "Tailwind CSS",
              },
              {
                icon: <IconBrandFramerMotion className="w-5 h-5" />,
                name: "Framer Motion",
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-900/50 border border-neutral-800 text-neutral-300 font-medium">
                  {tech.icon}
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS / SOCIAL PROOF SECTION */}
      <section className="py-24 bg-neutral-950/30 border-b border-neutral-800/40 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Loved by Frontend Engineers
            </h2>
            <p className="text-neutral-400">
              See what the community is saying about Venti UI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                name: "Alex Rivera",
                handle: "@arivera_dev",
                text: "I was spending hours building custom comboboxes and accessible modals. Venti UI gave me everything I needed in minutes. Absolute game changer.",
              },
              {
                name: "Sarah Chen",
                handle: "@schen_codes",
                text: "The integration with standard Tailwind configurations is flawless. It doesn't fight my existing design system, it enhances it.",
              },
              {
                name: "Marcus Johnson",
                handle: "@marcusj_ui",
                text: "Framer Motion animations out of the box makes the UI feel incredibly premium. Best open source library I've used this year.",
              },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 bg-neutral-900/20 border-neutral-800 h-full flex flex-col justify-between">
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-neutral-500">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-200">
                        {review.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {review.handle}
                      </p>
                    </div>
                    <IconBrandTwitter className="w-4 h-4 text-neutral-600 ml-auto" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENT LIST SECTION */}
      <section className="py-24 bg-[#0a0a0a] overflow-hidden border-b border-neutral-800/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold mb-8 text-neutral-50">
              Explore the Catalog
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl opacity-80">
              {componentList.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-md text-xs font-mono text-neutral-400 hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all cursor-pointer"
                >
                  {comp}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-32 bg-neutral-950 relative overflow-hidden flex items-center justify-center text-center">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Ready to upgrade your UI?
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Join thousands of developers building better, faster, and more
            beautiful applications with Venti UI. Open source and free forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-lg shadow-sky-500/20"
            >
              Get Started Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base bg-neutral-900/50"
            >
              <IconBrandGithub className="w-5 h-5 mr-2" />
              View Repository
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060606] pb-8">
        <div className="container mx-auto max-w-7xl">
          <div className="pt-8 border-t border-neutral-800/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
            <p>
              © {new Date().getFullYear()} Venti UI Labs. Expressive
              architecture.
            </p>
            <p>Designed and built with ♥ in the open.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
