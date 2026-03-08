"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/shared/container";
import { socialMetrics } from "@/lib/constants";

type CubicBezier = [number, number, number, number];
const ease: CubicBezier = [0.22, 1, 0.36, 1];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
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
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

/* ── Slide Cards Data ───────────────────────────────────── */

function DashboardSlide() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-sm bg-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/50">Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] text-emerald-400/70">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Active Studies", value: "24", badge: "+3", color: "text-emerald-400" },
          { label: "Reviews", value: "87%", badge: "+12%", color: "text-emerald-400" },
          { label: "Compliance", value: "96%", badge: "↑ 4%", color: "text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-white/[0.05] px-3 py-3 text-center">
            <div className="text-xl font-bold text-white/90">{s.value}</div>
            <div className="text-[10px] text-white/40">{s.label}</div>
            <div className={`mt-0.5 text-[10px] font-medium ${s.color}`}>{s.badge}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { label: "Protocol Reviews", pct: 87, color: "bg-blue-400" },
          { label: "Task Completion", pct: 94, color: "bg-emerald-400" },
        ].map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-white/40">{bar.label}</span>
              <span className="text-white/60">{bar.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${bar.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${bar.pct}%` }}
                transition={{ duration: 1, delay: 0.5, ease }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProtocolSlide() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-sm bg-amber-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-white/50">Protocols</span>
      </div>
      <div className="space-y-0">
        {[
          { name: "Motor Function Study", status: "Under Review", sColor: "text-amber-300 bg-amber-400/15", date: "Mar 5" },
          { name: "Behavioral Analysis", status: "Approved", sColor: "text-emerald-300 bg-emerald-400/15", date: "Mar 3" },
          { name: "Cognitive Assessment v2.1", status: "Draft", sColor: "text-white/40 bg-white/[0.06]", date: "Mar 1" },
          { name: "Neuroplasticity Protocol", status: "Submitted", sColor: "text-blue-300 bg-blue-400/15", date: "Feb 28" },
          { name: "Pain Response Study", status: "Approved", sColor: "text-emerald-300 bg-emerald-400/15", date: "Feb 25" },
        ].map((row) => (
          <div key={row.name} className="flex items-center justify-between border-t border-white/[0.06] py-2.5">
            <div>
              <div className="text-[12px] text-white/60">{row.name}</div>
              <div className="text-[10px] text-white/25">{row.date}</div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${row.sColor}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceSlide() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-sm bg-emerald-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-white/50">Compliance</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-5xl font-bold text-emerald-400">96%</div>
        <div>
          <div className="text-sm font-semibold text-white/70">Overall Score</div>
          <div className="text-[11px] text-emerald-400/60">↑ 4% from last month</div>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "IACUC Protocol Review", status: "Current", color: "bg-emerald-400/15 text-emerald-300" },
          { label: "Training Certification", status: "Current", color: "bg-emerald-400/15 text-emerald-300" },
          { label: "Annual Safety Audit", status: "Due in 12d", color: "bg-amber-400/15 text-amber-300" },
          { label: "Documentation Review", status: "Current", color: "bg-emerald-400/15 text-emerald-300" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
            <span className="text-[11px] text-white/50">{item.label}</span>
            <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSlide() {
  const bars = [35, 52, 40, 65, 48, 72, 58, 44, 68, 55];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-sm bg-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white/50">Analytics</span>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">+24%</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Avg Review Time", value: "4.2d", sub: "↓ 1.3d" },
          { label: "Approval Rate", value: "89%", sub: "↑ 7%" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-lg bg-white/[0.05] p-3">
            <div className="text-[10px] text-white/35">{kpi.label}</div>
            <div className="text-lg font-bold text-white/85">{kpi.value}</div>
            <div className="text-[10px] font-medium text-emerald-400/70">{kpi.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="mb-2 text-[10px] text-white/30">Study Activity (12 months)</div>
        <div className="flex items-end gap-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-blue-400/50"
              initial={{ height: 0 }}
              animate={{ height: h * 0.7 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowSlide() {
  const steps = [
    { label: "Plan", active: true, current: false },
    { label: "Submit", active: true, current: false },
    { label: "Review", active: true, current: false },
    { label: "Operate", active: false, current: true },
    { label: "Comply", active: false, current: false },
    { label: "Report", active: false, current: false },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-sm bg-purple-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-white/50">Workflow</span>
      </div>
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <motion.div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                  step.current
                    ? "bg-purple-400/30 text-purple-300 ring-2 ring-purple-400/50"
                    : step.active
                    ? "bg-emerald-400/20 text-emerald-300"
                    : "bg-white/[0.06] text-white/25"
                }`}
                animate={step.current ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {step.active && !step.current ? "✓" : i + 1}
              </motion.div>
              <span className="text-[8px] font-medium text-white/35">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px w-full ${step.active ? "bg-emerald-400/30" : "bg-white/[0.08]"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { task: "Equipment calibration", assignee: "J. Smith", status: "In Progress", sColor: "text-blue-300 bg-blue-400/15" },
          { task: "Data collection, Phase 2", assignee: "K. Chen", status: "Pending", sColor: "text-amber-300 bg-amber-400/15" },
          { task: "Safety checklist review", assignee: "M. Davis", status: "Complete", sColor: "text-emerald-300 bg-emerald-400/15" },
        ].map((t) => (
          <div key={t.task} className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2">
            <div>
              <div className="text-[11px] text-white/55">{t.task}</div>
              <div className="text-[9px] text-white/25">{t.assignee}</div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${t.sColor}`}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Carousel ───────────────────────────────────────────── */

const slides = [
  { key: "dashboard", label: "Dashboard", Component: DashboardSlide },
  { key: "protocols", label: "Protocols", Component: ProtocolSlide },
  { key: "compliance", label: "Compliance", Component: ComplianceSlide },
  { key: "analytics", label: "Analytics", Component: AnalyticsSlide },
  { key: "workflow", label: "Workflow", Component: WorkflowSlide },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleClick = (i: number) => {
    setActive(i);
    startTimer();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.06] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      >
        {/* Tab bar */}
        <div className="flex border-b border-white/[0.08] px-1 pt-1">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              onClick={() => handleClick(i)}
              className={`relative flex-1 px-2 py-2.5 text-[10px] font-semibold tracking-wide transition-colors ${
                active === i ? "text-white/90" : "text-white/30 hover:text-white/50"
              }`}
            >
              {slide.label}
              {active === i && (
                <motion.div
                  layoutId="hero-tab"
                  className="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-blue-400"
                  transition={{ duration: 0.3, ease }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="relative min-h-[300px] p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[active].key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease }}
            >
              {(() => {
                const SlideComponent = slides[active].Component;
                return <SlideComponent />;
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 pb-4">
          {slides.map((_, i) => (
            <button key={i} onClick={() => handleClick(i)} className="group p-1">
              <div className={`h-1 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-blue-400" : "w-1.5 bg-white/20 group-hover:bg-white/30"
              }`} />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Hero Section ───────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#082B63] via-[#0D4297] to-[#082B63]">
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-400/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" aria-hidden="true" />

      <Container className="relative z-10 pb-0 pt-32 md:pt-40">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-200 backdrop-blur-sm"
            >
              Research Operations Platform
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              One Platform. Full Lifecycle. Effortless Management, Tracking &amp; Reporting.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="mt-6 max-w-lg text-base leading-relaxed text-blue-100/90 md:text-lg"
            >
              Seamlessly manage your entire animal care and facility operations
              with one connected, cloud-based platform, because your team should
              be focused on groundbreaking research, not chasing down paperwork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-[1.02] hover:bg-blue-50"
              >
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                <Play className="h-4 w-4" />
                Watch Overview
              </a>
            </motion.div>

            {/* Value props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6"
            >
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
            </motion.div>
          </div>

          {/* Right: Feature Carousel */}
          <HeroCarousel />
        </div>

        {/* Social metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          className="mt-16 border-t border-white/10 pt-10 pb-12 md:mt-20"
        >
          <div className="grid grid-cols-3 gap-4">
            {socialMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
