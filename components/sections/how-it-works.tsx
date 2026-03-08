"use client";

import { useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Settings2, Upload, Rocket, TrendingUp, Check } from "lucide-react";
import { Container } from "@/components/shared/container";

const steps = [
  {
    number: "01",
    icon: Settings2,
    title: "Configure Your Facility",
    description:
      "Set up your rooms, service areas, racks, and cages. Define your organizational structure and team roles through our guided setup wizard.",
    detail: "Guided wizard walks you through every step",
    accent: "#3b82f6",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    number: "02",
    icon: Upload,
    title: "Import & Onboard",
    description:
      "Migrate existing data, invite team members, and assign role-based permissions. Each user gets a tailored dashboard from their first login.",
    detail: "Bulk import for existing facility data",
    accent: "#10b981",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Operate",
    description:
      "Start scheduling tasks, logging health observations, managing protocols, and tracking compliance. Your team is productive from day one.",
    detail: "Full operations running within days",
    accent: "#8b5cf6",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    borderColor: "border-violet-200",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Scale & Optimize",
    description:
      "Use real-time analytics, completion reports, and efficiency scores to continuously improve operations across your entire facility.",
    detail: "Continuous improvement with live analytics",
    accent: "#f59e0b",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
  },
];

/* ── Step Illustrations ────────────────────────────────── */

function ConfigureIllustration({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 280 180" className="h-full w-full" fill="none" role="img" aria-label="Facility configuration wizard with room grid setup">
      {/* Main window */}
      <motion.g animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <rect x={40} y={20} width={200} height={140} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
        <rect x={40} y={20} width={200} height={20} rx={12} fill="#3b82f6" opacity={0.05} />
        <circle cx={54} cy={30} r={3} fill="#ef4444" opacity={0.5} />
        <circle cx={64} cy={30} r={3} fill="#f59e0b" opacity={0.5} />
        <circle cx={74} cy={30} r={3} fill="#22c55e" opacity={0.5} />
        <rect x={100} y={27} width={80} height={6} rx={3} fill="#f1f5f9" />

        {/* Room grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <motion.rect
              key={`${row}-${col}`}
              x={56 + col * 46}
              y={50 + row * 34}
              width={38}
              height={26}
              rx={6}
              fill="#3b82f6"
              animate={{ opacity: active ? [0.04, 0.12, 0.04] : 0.04 }}
              transition={{ duration: 2, delay: (row * 4 + col) * 0.15, repeat: Infinity }}
            />
          ))
        )}
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <g key={`label-${row}-${col}`}>
              <rect x={60 + col * 46} y={54 + row * 34} width={20 + (col % 3) * 4} height={4} rx={2} fill="#3b82f6" opacity={0.15} />
              <rect x={60 + col * 46} y={62 + row * 34} width={14} height={3} rx={1.5} fill="#3b82f6" opacity={0.08} />
            </g>
          ))
        )}

        {/* Active highlight */}
        <motion.rect
          x={56} y={50} width={38} height={26} rx={6}
          fill="none" stroke="#3b82f6" strokeWidth={2}
          animate={{ opacity: active ? [0.3, 0.7, 0.3] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  );
}

function ImportIllustration({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 280 180" className="h-full w-full" fill="none" role="img" aria-label="Team onboarding with data import and user invitations">
      <motion.g animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        {/* Upload card */}
        <rect x={60} y={25} width={160} height={130} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />

        {/* Users being added */}
        {[0, 1, 2, 3].map((i) => (
          <motion.g
            key={i}
            animate={{ x: active ? 0 : -20, opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect x={76} y={42 + i * 28} width={128} height={22} rx={6} fill={i < 3 ? "#ecfdf5" : "#f1f5f9"} stroke={i < 3 ? "#a7f3d0" : "#e2e8f0"} strokeWidth={0.8} />
            <circle cx={92} cy={53 + i * 28} r={6} fill="#10b981" opacity={i < 3 ? 0.15 : 0.06} />
            <circle cx={92} cy={51 + i * 28} r={3} fill="#10b981" opacity={i < 3 ? 0.2 : 0.08} />
            <rect x={104} y={48 + i * 28} width={40 + i * 6} height={4} rx={2} fill="#10b981" opacity={i < 3 ? 0.18 : 0.06} />
            <rect x={104} y={55 + i * 28} width={24} height={3} rx={1.5} fill="#10b981" opacity={i < 3 ? 0.1 : 0.04} />
            {i < 3 && (
              <motion.g animate={{ scale: active ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}>
                <circle cx={188} cy={53 + i * 28} r={5} fill="#ecfdf5" stroke="#a7f3d0" strokeWidth={0.8} />
                <path d={`M185.5,${53 + i * 28} l2,2 l3.5,-3.5`} stroke="#10b981" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
            )}
          </motion.g>
        ))}

        {/* Upload arrow */}
        <motion.g
          animate={{ y: active ? [0, -4, 0] : 0, opacity: active ? 0.5 : 0.15 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path d="M140,140 L140,152" stroke="#10b981" strokeWidth={2} strokeLinecap="round" />
          <path d="M136,144 L140,139 L144,144" stroke="#10b981" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </motion.g>
    </svg>
  );
}

function LaunchIllustration({ active }: { active: boolean }) {
  const tasks = [
    { w: 85, color: "#3b82f6", done: 100 },
    { w: 60, color: "#10b981", done: 75 },
    { w: 100, color: "#8b5cf6", done: 100 },
    { w: 45, color: "#f59e0b", done: 50 },
  ];
  return (
    <svg viewBox="0 0 280 180" className="h-full w-full" fill="none" role="img" aria-label="Operations launch with task progress tracking">
      <motion.g animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <rect x={40} y={20} width={200} height={140} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
        <rect x={40} y={20} width={200} height={20} rx={12} fill="#8b5cf6" opacity={0.05} />
        <circle cx={54} cy={30} r={3} fill="#ef4444" opacity={0.5} />
        <circle cx={64} cy={30} r={3} fill="#f59e0b" opacity={0.5} />
        <circle cx={74} cy={30} r={3} fill="#22c55e" opacity={0.5} />

        {/* Task rows */}
        {tasks.map((task, i) => (
          <g key={i}>
            <rect x={56} y={50 + i * 28} width={168} height={20} rx={5} fill="#f8fafc" stroke="#f1f5f9" strokeWidth={0.8} />
            <rect x={60} y={54 + i * 28} width={10} height={10} rx={2.5} fill={task.color} opacity={0.1} stroke={task.color} strokeWidth={0.6} strokeOpacity={0.3} />
            <rect x={76} y={56 + i * 28} width={task.w} height={4} rx={2} fill="#e2e8f0" />
            <motion.rect
              x={76} y={56 + i * 28} height={4} rx={2}
              fill={task.color} opacity={0.5}
              animate={{ width: active ? (task.w * task.done) / 100 : 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
            {task.done === 100 && (
              <motion.g animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.6 + i * 0.15 }}>
                <circle cx={210} cy={60 + i * 28} r={5} fill="#ecfdf5" />
                <path d={`M207.5,${60 + i * 28} l2,2 l3,-3`} stroke="#10b981" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
            )}
          </g>
        ))}
      </motion.g>

      {/* Rocket */}
      <motion.g
        animate={{ y: active ? [0, -6, 0] : 10, opacity: active ? 1 : 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx={246} cy={40} r={12} fill="#f5f3ff" stroke="#ddd6fe" strokeWidth={0.8} />
        <path d="M246,34 L243,40 L246,38 L249,40 Z" fill="#8b5cf6" opacity={0.5} />
        <path d="M244,41 L246,44 L248,41" stroke="#8b5cf6" strokeWidth={0.8} opacity={0.3} strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function ScaleIllustration({ active }: { active: boolean }) {
  const bars = [35, 48, 42, 58, 52, 68, 60, 75];
  return (
    <svg viewBox="0 0 280 180" className="h-full w-full" fill="none" role="img" aria-label="Performance optimization analytics with KPIs and trend line">
      <motion.g animate={{ y: active ? 0 : 8, opacity: active ? 1 : 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <rect x={40} y={20} width={200} height={140} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
        <rect x={40} y={20} width={200} height={20} rx={12} fill="#f59e0b" opacity={0.05} />
        <circle cx={54} cy={30} r={3} fill="#ef4444" opacity={0.5} />
        <circle cx={64} cy={30} r={3} fill="#f59e0b" opacity={0.5} />
        <circle cx={74} cy={30} r={3} fill="#22c55e" opacity={0.5} />

        {/* KPI cards */}
        {[
          { x: 56, val: "94%", label: "Done", color: "#10b981" },
          { x: 116, val: "87%", label: "Eff.", color: "#3b82f6" },
          { x: 176, val: "91%", label: "Time", color: "#8b5cf6" },
        ].map((kpi, i) => (
          <motion.g
            key={i}
            animate={{ y: active ? 0 : 5, opacity: active ? 1 : 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <rect x={kpi.x} y={48} width={52} height={28} rx={6} fill={kpi.color} opacity={0.06} stroke={kpi.color} strokeWidth={0.5} strokeOpacity={0.15} />
            <text x={kpi.x + 8} y={63} fontSize={11} fontWeight={700} fill={kpi.color} opacity={0.7}>{kpi.val}</text>
            <text x={kpi.x + 8} y={72} fontSize={7} fill={kpi.color} opacity={0.35}>{kpi.label}</text>
          </motion.g>
        ))}

        {/* Bar chart */}
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={60 + i * 22}
            width={14}
            rx={3}
            fill="#f59e0b"
            animate={{
              height: active ? h : 4,
              y: active ? 140 - h : 136,
              opacity: active ? 0.35 : 0.1,
            }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}

        {/* Trend line */}
        <motion.path
          d="M67,128 Q90,115 112,118 Q134,122 156,108 Q178,94 200,86 L220,80"
          stroke="#f59e0b" strokeWidth={2} fill="none" strokeLinecap="round"
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.6 : 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={220} cy={80} r={4}
          fill="#f59e0b" opacity={0.5}
          animate={{ scale: active ? [1, 1.3, 1] : 0, opacity: active ? [0.5, 0.8, 0.5] : 0 }}
          transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  );
}

const illustrations = [ConfigureIllustration, ImportIllustration, LaunchIllustration, ScaleIllustration];

/* ── Main Component ──────────────────────────────────── */

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track progress to determine active step
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map 0-1 progress to 0-3 steps
    const step = Math.min(3, Math.floor(latest * 4.5));
    setActiveStep(step);
  });

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      {/* Sticky viewport — top offset accounts for fixed navbar */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-white pt-20">
        <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl animate-orb" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 bottom-1/4 h-80 w-80 rounded-full bg-violet-50/40 blur-3xl animate-orb-slow" aria-hidden="true" />

        <Container className="relative z-10">
          {/* Header */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] bg-slate-100 text-slate-600 border border-slate-200/60">
              How It Works
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#0F172A] md:text-4xl lg:text-5xl">
              Up and running in days, not months.
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            {/* Left: Steps list */}
            <div className="relative">
              <div className="space-y-2">
                {steps.map((step, i) => {
                  const isActive = i === activeStep;
                  const isDone = i < activeStep;
                  const isLast = i === steps.length - 1;

                  return (
                    <motion.div
                      key={step.number}
                      className="relative flex items-start gap-5 pl-0"
                      animate={{ opacity: isActive ? 1 : isDone ? 0.5 : 0.3 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Connector line segment — rendered per step, not as one long line */}
                      {!isLast && (
                        <div className="absolute left-5 top-10 bottom-0 flex w-px -translate-x-1/2 justify-center">
                          <div className="h-full w-px bg-slate-200" />
                          <motion.div
                            className="absolute top-0 w-px bg-gradient-to-b from-blue-500 to-violet-500"
                            animate={{ height: isDone ? "100%" : isActive ? "50%" : "0%" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      )}

                      {/* Step dot — z-20 to sit above the connector lines */}
                      <motion.div
                        className="relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-white shadow-md"
                        animate={{
                          backgroundColor: isActive ? step.accent : isDone ? "#10b981" : "#f1f5f9",
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {isDone ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <span className={`text-xs font-bold ${isActive ? "text-white" : "text-slate-400"}`}>
                            {step.number}
                          </span>
                        )}
                      </motion.div>

                      {/* Step content */}
                      <motion.div
                        className={`rounded-xl border px-5 py-4 transition-colors duration-300 flex-1 ${
                          isActive
                            ? `bg-white border-slate-200 shadow-md`
                            : "border-transparent bg-transparent"
                        }`}
                        animate={{ y: isActive ? 0 : 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${isActive ? step.bgLight : "bg-slate-50"}`}>
                            <step.icon className={`h-4 w-4 ${isActive ? step.textColor : "text-slate-300"}`} />
                          </div>
                          <h3 className={`text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                            {step.title}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                            {step.description}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full" style={{ backgroundColor: step.accent }} />
                            <span className="text-xs font-medium" style={{ color: step.accent }}>
                              {step.detail}
                            </span>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl border border-slate-200/60 bg-slate-50/50 p-6">
                {illustrations.map((Illus, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 p-6"
                    animate={{ opacity: i === activeStep ? 1 : 0, scale: i === activeStep ? 1 : 0.95 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Illus active={i === activeStep} />
                  </motion.div>
                ))}

                {/* Step counter badge */}
                <div className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm border border-slate-100">
                  Step {activeStep + 1} of {steps.length}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
