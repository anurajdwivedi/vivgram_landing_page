"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ImageIcon } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { roles } from "@/lib/constants";
import { useBrand, brandText } from "@/lib/brand-context";

const accentMap: Record<string, { tab: string; icon: string; iconBg: string; badge: string }> = {
  blue: {
    tab: "border-blue-500 text-blue-700",
    icon: "text-blue-600",
    iconBg: "bg-blue-50",
    badge: "bg-blue-50 text-blue-700",
  },
  purple: {
    tab: "border-purple-500 text-purple-700",
    icon: "text-purple-600",
    iconBg: "bg-purple-50",
    badge: "bg-purple-50 text-purple-700",
  },
  emerald: {
    tab: "border-emerald-500 text-emerald-700",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-50",
    badge: "bg-emerald-50 text-emerald-700",
  },
  amber: {
    tab: "border-amber-500 text-amber-700",
    icon: "text-amber-600",
    iconBg: "bg-amber-50",
    badge: "bg-amber-50 text-amber-700",
  },
  slate: {
    tab: "border-slate-500 text-slate-700",
    icon: "text-slate-600",
    iconBg: "bg-slate-100",
    badge: "bg-slate-100 text-slate-700",
  },
};

export default function RolesSection() {
  const { brand } = useBrand();
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const activeRole = roles[activeIndex];
  const colors = accentMap[activeRole.accentColor];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const tabCount = roles.length;
    let newIndex = index;
    switch (e.key) {
      case "ArrowRight":
        newIndex = (index + 1) % tabCount;
        break;
      case "ArrowLeft":
        newIndex = (index - 1 + tabCount) % tabCount;
        break;
      case "Home":
        newIndex = 0;
        break;
      case "End":
        newIndex = tabCount - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActiveIndex(newIndex);
    document.getElementById(`role-tab-${newIndex}`)?.focus();
  };

  return (
    <section id="roles" className="relative bg-[#f8fafc] py-24 md:py-32 overflow-hidden bg-mesh">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl animate-orb" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-cyan-100/30 blur-3xl animate-orb-slow" aria-hidden="true" />
      <Container>
        <SectionHeader
          overline="Platform Roles"
          heading="Designed for every role in your team."
          subtext="Each user gets a tailored experience with the views, tools, and permissions they need. Nothing more, nothing less."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {/* Tab bar */}
          <div className="relative mb-0 border-b border-slate-200">
            <div className="flex justify-center overflow-x-auto scrollbar-none" role="tablist" aria-label="Roles">
              {roles.map((role, i) => {
                const tabColors = accentMap[role.accentColor];
                const isActive = i === activeIndex;
                return (
                  <button
                    key={role.title}
                    id={`role-tab-${i}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`role-panel-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={(e) => handleTabKeyDown(e, i)}
                    className={`relative shrink-0 px-5 py-4 text-sm font-semibold transition-colors duration-200 lg:px-8 ${
                      isActive
                        ? tabColors.tab
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {role.title}
                    {isActive && (
                      <motion.div
                        layoutId="role-tab-indicator"
                        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${
                          tabColors.tab.split(" ")[0]
                        }`}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              id={`role-panel-${activeIndex}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="grid items-start gap-10 pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:pt-12"
            >
              {/* Left: Role info & capabilities */}
              <div>
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colors.iconBg}`}>
                  <activeRole.icon className={`h-7 w-7 ${colors.icon}`} />
                </div>
                <h3 className="text-2xl font-semibold text-[#0F172A] md:text-3xl">
                  {activeRole.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#64748B]">
                  {brandText(activeRole.description, brand)}
                </p>

                <ul className="mt-6 space-y-3">
                  {activeRole.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-sm leading-relaxed text-[#334155]">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  See how it works for {activeRole.title}s
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Right: Image placeholder */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F8FAFC] shadow-card">
                <div className="flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${colors.iconBg}`}>
                    <ImageIcon className={`h-8 w-8 ${colors.icon}`} />
                  </div>
                  <p className="text-center text-sm font-medium text-slate-500">
                    {activeRole.imagePlaceholder}
                  </p>
                  <span className="mt-2 text-xs text-slate-400">
                    Screenshot / product image coming soon
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
