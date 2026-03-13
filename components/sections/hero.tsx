"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { socialMetrics } from "@/lib/constants";
import { useBrand } from "@/lib/brand-context";

/* ── CSS fade-up animation (replaces framer-motion for hero) ── */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

/* ── CountUp (uses Intersection Observer instead of framer-motion) ── */

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        const isDecimal = target % 1 !== 0;
        const steps = 45;
        const increment = target / steps;
        let current = 0;
        const interval = 1500 / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
          }
        }, interval);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

/* ── Interactive Rack & Cage Illustration ────────────────── */

type CageStatus = "active" | "alert" | "monitoring" | "empty";

interface Cage {
  id: string;
  protocol: string;
  animals: number;
  day: number;
  status: CageStatus;
  strain: string;
  row: number;
}

const CAGES: Cage[] = [
  // Row A
  { id: "A-01", protocol: "IACUC-2024-001", animals: 5, day: 14, status: "active",     strain: "C57BL/6", row: 0 },
  { id: "A-02", protocol: "IACUC-2024-001", animals: 5, day: 14, status: "active",     strain: "C57BL/6", row: 0 },
  { id: "A-03", protocol: "IACUC-2024-003", animals: 3, day:  7, status: "monitoring", strain: "BALB/c",  row: 0 },
  { id: "A-04", protocol: "",               animals: 0, day:  0, status: "empty",      strain: "",       row: 0 },
  // Row B
  { id: "B-01", protocol: "IACUC-2024-002", animals: 4, day: 21, status: "alert",      strain: "FVB/N",   row: 1 },
  { id: "B-02", protocol: "IACUC-2024-002", animals: 4, day: 21, status: "active",     strain: "FVB/N",   row: 1 },
  { id: "B-03", protocol: "IACUC-2024-004", animals: 6, day:  3, status: "active",     strain: "C57BL/6", row: 1 },
  { id: "B-04", protocol: "IACUC-2024-004", animals: 6, day:  3, status: "active",     strain: "C57BL/6", row: 1 },
  // Row C
  { id: "C-01", protocol: "IACUC-2024-005", animals: 5, day: 45, status: "monitoring", strain: "NOD",     row: 2 },
  { id: "C-02", protocol: "IACUC-2024-005", animals: 4, day: 45, status: "alert",      strain: "NOD",     row: 2 },
  { id: "C-03", protocol: "IACUC-2024-006", animals: 3, day: 10, status: "active",     strain: "SCID",    row: 2 },
  { id: "C-04", protocol: "",               animals: 0, day:  0, status: "empty",      strain: "",       row: 2 },
];

const STATUS_CONFIG: Record<CageStatus, { dot: string; label: string; textColor: string; badgeBg: string; badgeBorder: string; grillGlow: string }> = {
  active:     { dot: "bg-emerald-400", label: "Active",     textColor: "text-emerald-300", badgeBg: "bg-emerald-500/15",  badgeBorder: "border-emerald-500/25", grillGlow: "bg-emerald-400/10" },
  alert:      { dot: "bg-orange-400",  label: "Alert",      textColor: "text-orange-300",  badgeBg: "bg-orange-500/15",   badgeBorder: "border-orange-500/25",  grillGlow: "bg-orange-400/15"  },
  monitoring: { dot: "bg-amber-400",   label: "Monitoring", textColor: "text-amber-300",   badgeBg: "bg-amber-500/15",    badgeBorder: "border-amber-500/25",   grillGlow: "bg-amber-400/10"   },
  empty:      { dot: "bg-slate-500",   label: "Empty",      textColor: "text-slate-400",   badgeBg: "bg-slate-500/10",    badgeBorder: "border-slate-500/20",   grillGlow: ""                  },
};

function CageCard({
  cage,
  showTooltipAbove,
  colIndex,
}: {
  cage: Cage;
  showTooltipAbove: boolean;
  colIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cfg = STATUS_CONFIG[cage.status];

  // Anchor tooltip to left edge for col 0-1, right edge for col 2-3
  // so it never overflows the rack frame
  const tooltipAlign =
    colIndex <= 1
      ? "left-0"
      : "right-0";

  return (
    <div
      className={`relative transition-[z-index] ${hovered ? "z-[50]" : "z-0"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card body */}
      <div
        className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${cfg.badgeBg} ${cfg.badgeBorder} ${
          hovered ? "scale-105 shadow-[0_6px_20px_rgba(0,0,0,0.35)]" : "hover:scale-[1.03]"
        }`}
      >
        {/* Grill window */}
        <div className="relative mb-2 h-14 w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
          {[0, 1, 2, 3].map((i) => (
            <div key={`h${i}`} className="absolute inset-x-0 border-t border-white/10" style={{ top: `${(i + 1) * 20}%` }} />
          ))}
          {[0, 1, 2].map((i) => (
            <div key={`v${i}`} className="absolute inset-y-0 border-l border-white/10" style={{ left: `${(i + 1) * 25}%` }} />
          ))}
          {cage.status !== "empty" && <div className={`absolute inset-0 ${cfg.grillGlow}`} />}
        </div>

        {/* Cage ID + status dot */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-white/55">{cage.id}</span>
          <div className="relative flex items-center">
            <div className={`h-2 w-2 rounded-full ${cfg.dot} ${cage.status === "alert" ? "animate-pulse" : ""}`} />
            {cage.status === "alert" && (
              <div className={`absolute h-2 w-2 animate-ping rounded-full ${cfg.dot} opacity-60`} />
            )}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && cage.status !== "empty" && (
        <div
          className={`absolute z-[200] w-52 rounded-xl border border-white/25 bg-[#061B3F] p-4 shadow-2xl ${tooltipAlign} ${
            showTooltipAbove ? "bottom-full mb-3" : "top-full mt-3"
          }`}
        >
          {/* Header */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-bold text-white">{cage.id}</span>
            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cfg.textColor} ${cfg.badgeBg} ${cfg.badgeBorder}`}>
              {cfg.label}
            </span>
          </div>
          {/* Divider */}
          <div className="mb-3 border-t border-white/10" />
          {/* Details */}
          <div className="space-y-2">
            {([
              ["Animals",   `${cage.animals} mice`],
              ["Strain",    cage.strain],
              ["Protocol",  cage.protocol],
              ["Study Day", `Day ${cage.day}`],
            ] as [string, string][]).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 text-xs">
                <span className="text-blue-300/60">{k}</span>
                <span className="font-medium text-white truncate text-right">{v}</span>
              </div>
            ))}
          </div>
          {/* Arrow */}
          <div
            className={`absolute border-[5px] border-transparent ${
              colIndex <= 1 ? "left-4" : "right-4"
            } ${
              showTooltipAbove
                ? "top-full border-t-[#061B3F]"
                : "bottom-full border-b-[#061B3F]"
            }`}
          />
        </div>
      )}
    </div>
  );
}

function RackIllustration() {
  const rows = [
    { label: "A", cages: CAGES.slice(0, 4) },
    { label: "B", cages: CAGES.slice(4, 8) },
    { label: "C", cages: CAGES.slice(8, 12) },
  ];

  return (
    <FadeUp delay={400} className="flex w-full items-center justify-center py-8">
      <div className="relative w-full max-w-lg" style={{ animation: "float 5s ease-in-out infinite" }}>

        {/* Rack frame — rendered first so badges stack on top */}
        <div className="relative overflow-visible rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-sm font-semibold text-white/75">Rack 3 · Room 2A</span>
            </div>
            <span className="text-xs text-blue-300/55">12 cages · 7 active</span>
          </div>

          {/* Rails + cage grid */}
          <div className="flex gap-3">
            <div className="w-2.5 shrink-0 rounded-full bg-gradient-to-b from-white/20 to-white/8" />

            <div className="flex flex-1 flex-col gap-1 overflow-visible">
              {rows.map((row, rowIdx) => (
                <div key={row.label}>
                  {rowIdx > 0 && (
                    <div className="my-1.5 mx-1 border-t border-white/15" />
                  )}
                  <div className="flex items-center gap-2">
                    <span className="w-4 shrink-0 font-mono text-[10px] font-bold text-white/30">{row.label}</span>
                    <div className="grid flex-1 grid-cols-4 gap-2 overflow-visible">
                      {row.cages.map((cage, colIdx) => (
                        <CageCard key={cage.id} cage={cage} showTooltipAbove={rowIdx === 2} colIndex={colIdx} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-2.5 shrink-0 rounded-full bg-gradient-to-b from-white/20 to-white/8" />
          </div>

          {/* Footer status bar */}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5 px-1">
            <div className="flex gap-4">
              {[
                { dot: "bg-emerald-400", label: "7 Active" },
                { dot: "bg-amber-400",   label: "2 Monitor" },
                { dot: "bg-orange-400",  label: "2 Alerts", pulse: true },
              ].map(({ dot, label, pulse }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${dot} ${pulse ? "animate-pulse" : ""}`} />
                  <span className="text-xs text-white/45">{label}</span>
                </div>
              ))}
            </div>
            <span className="text-xs text-blue-300/35">Updated just now</span>
          </div>
        </div>

        {/* Alert badge — after rack so it renders on top */}
        <div
          className="absolute -right-6 -top-6 z-10 flex items-center gap-2 rounded-xl border border-orange-500/30 bg-[#0D2244]/90 px-3 py-2 shadow-lg backdrop-blur-sm"
          style={{ animation: "float 5s ease-in-out infinite", animationDelay: "0.7s" }}
        >
          <div className="relative flex">
            <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.9)]" />
            <div className="absolute h-2 w-2 animate-ping rounded-full bg-orange-400 opacity-50" />
          </div>
          <span className="text-xs font-medium text-orange-200">2 cages need attention</span>
        </div>

        {/* Success badge — after rack so it renders on top */}
        <div
          className="absolute -bottom-6 -left-6 z-10 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-[#0D2244]/90 px-3 py-2 shadow-lg backdrop-blur-sm"
          style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1.4s" }}
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          <span className="text-xs font-medium text-emerald-200">Daily obs. logged ✓</span>
        </div>
      </div>
    </FadeUp>
  );
}

/* ── Hero Section ───────────────────────────────────────── */

export default function Hero() {
  const { brand } = useBrand();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#082B63] via-[#0D4297] to-[#082B63]">
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-400/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" aria-hidden="true" />

      {/* Text content in container */}
      <div className="relative z-10 pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
            {/* Left: Copy */}
            <div className="w-full lg:w-[45%] lg:shrink-0">
              <FadeUp delay={100}>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-200 backdrop-blur-sm">
                  No More Spreadsheet Chaos
                </span>
              </FadeUp>

              <FadeUp delay={200}>
                <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                  Stop Managing Your Facility in Spreadsheets
                </h1>
              </FadeUp>

              <FadeUp delay={300}>
                <p className="mt-5 text-base leading-[1.65] text-blue-100/90 md:text-lg">
                  {brand} brings protocol management, daily observations, task
                  scheduling, and compliance tracking into one intuitive platform
                  so your team can focus on the science.
                </p>
              </FadeUp>

              <FadeUp delay={400} className="mt-7">
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-[1.02] hover:bg-blue-50"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </a>
              </FadeUp>

              {/* Value props */}
              <FadeUp delay={500} className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                {[
                  "Save hours on manual tasks",
                  "Stay audit-ready, always",
                  "One platform for your entire team",
                ].map((prop) => (
                  <div key={prop} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
                      <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-blue-100/90">{prop}</span>
                  </div>
                ))}
              </FadeUp>
            </div>

            {/* Right: Rack & cage illustration */}
            <div className="mt-10 w-full lg:mt-0 lg:flex-1 flex items-center justify-center">
              <RackIllustration />
            </div>
          </div>
        </div>

        {/* Social metrics bar */}
        <Container>
          <FadeUp delay={700} className="mt-12 border-t border-white/10 pt-8 pb-10 md:mt-14">
            <div className="grid grid-cols-3 gap-4">
              {socialMetrics.map((metric, i) => (
                <FadeUp
                  key={metric.label}
                  delay={800 + i * 100}
                  className="relative text-center"
                >
                  {i > 0 && (
                    <div className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/10 sm:block" />
                  )}
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    <CountUp target={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-medium tracking-wide text-blue-200/70 sm:text-sm">
                    {metric.label}
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </Container>
      </div>
    </section>
  );
}
