"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { fadeUp, staggerContainer } from "@/lib/animations";

/* ── Illustrations ──────────────────────────────────────── */

function AnimalResearchIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Laboratory flask illustration for animal research">
      {/* Flask */}
      <motion.g
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x={80} y={30} width={80} height={80} rx={16} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
        <rect x={80} y={30} width={80} height={18} rx={16} fill="#3b82f6" opacity={0.06} />
        {/* Flask body */}
        <path d="M108,60 L108,72 L100,88 A4,4 0 0 0 104,92 L136,92 A4,4 0 0 0 140,88 L132,72 L132,60" stroke="#3b82f6" strokeWidth={1.5} fill="#dbeafe" opacity={0.4} />
        <path d="M108,60 L132,60" stroke="#3b82f6" strokeWidth={1.5} />
        {/* Liquid */}
        <motion.path
          d="M103,84 Q110,80 120,84 Q130,88 137,84 L140,88 A4,4 0 0 1 136,92 L104,92 A4,4 0 0 1 100,88 Z"
          fill="#3b82f6"
          animate={{ opacity: hovered ? [0.2, 0.35, 0.2] : 0.2 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Bubbles */}
        <motion.circle
          cx={115} cy={82} r={2}
          fill="#3b82f6" opacity={0.3}
          animate={{ cy: hovered ? [82, 74, 82] : 82, opacity: hovered ? [0.3, 0.6, 0.3] : 0.3 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx={125} cy={86} r={1.5}
          fill="#3b82f6" opacity={0.25}
          animate={{ cy: hovered ? [86, 76, 86] : 86, opacity: hovered ? [0.25, 0.5, 0.25] : 0.25 }}
          transition={{ duration: 1.8, delay: 0.3, repeat: Infinity }}
        />
      </motion.g>
      {/* DNA helix accent */}
      <motion.path
        d="M52,50 Q60,60 52,70 Q44,80 52,90"
        stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 4" fill="none"
        animate={{ opacity: hovered ? 0.5 : 0.2 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d="M188,50 Q180,60 188,70 Q196,80 188,90"
        stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 4" fill="none"
        animate={{ opacity: hovered ? 0.5 : 0.2 }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
}

function ComplianceIllustration({ hovered }: { hovered: boolean }) {
  const items = [
    { y: 52, label: "IACUC Protocol", w: 56, done: true },
    { y: 66, label: "Safety Audit", w: 44, done: true },
    { y: 80, label: "Training Cert", w: 50, done: true },
    { y: 94, label: "Annual Review", w: 52, done: false },
  ];
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="IACUC compliance checklist with progress tracking">
      <motion.g
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x={60} y={24} width={120} height={92} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
        <rect x={60} y={24} width={120} height={16} rx={12} fill="#10b981" opacity={0.06} />
        {/* Shield icon */}
        <path d="M115,28 L120,30 L120,35 C120,37 118,39 115,40 C112,39 110,37 110,35 L110,30 Z" fill="#10b981" opacity={0.3} />
        <motion.path
          d="M113,33 L115,35 L118,31"
          stroke="#10b981" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" fill="none"
          animate={{ pathLength: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.5 }}
        />
        {items.map((item, i) => (
          <motion.g
            key={i}
            animate={{ x: hovered ? 2 : 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            {item.done ? (
              <g>
                <circle cx={76} cy={item.y + 4} r={5} fill="#ecfdf5" stroke="#a7f3d0" strokeWidth={1} />
                <motion.path
                  d={`M73.5,${item.y + 4} l2,2 l3.5,-3.5`}
                  stroke="#10b981" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" fill="none"
                  animate={{ opacity: hovered ? 1 : 0.6 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                />
              </g>
            ) : (
              <g>
                <circle cx={76} cy={item.y + 4} r={5} fill="#fef3c7" stroke="#fde68a" strokeWidth={1} />
                <rect x={75} y={item.y + 1} width={2} height={4} rx={1} fill="#f59e0b" opacity={0.6} />
                <circle cx={76} cy={item.y + 7} r={0.8} fill="#f59e0b" opacity={0.6} />
              </g>
            )}
            <rect x={86} y={item.y + 1.5} width={item.w} height={5} rx={2.5} fill={item.done ? "#10b981" : "#f59e0b"} opacity={0.12} />
            <rect x={86} y={item.y + 1.5} width={item.w * (item.done ? 1 : 0.5)} height={5} rx={2.5} fill={item.done ? "#10b981" : "#f59e0b"} opacity={0.25} />
          </motion.g>
        ))}
      </motion.g>
    </svg>
  );
}

function RolesIllustration({ hovered }: { hovered: boolean }) {
  const roles = [
    { cx: 90, cy: 48, color: "#3b82f6", label: "Tech" },
    { cx: 150, cy: 48, color: "#8b5cf6", label: "Sup" },
    { cx: 70, cy: 90, color: "#10b981", label: "Mgr" },
    { cx: 120, cy: 90, color: "#f59e0b", label: "Coord" },
    { cx: 170, cy: 90, color: "#64748b", label: "Dir" },
  ];
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Connected team roles on a single platform">
      {/* Center hub */}
      <motion.circle
        cx={120} cy={70} r={14}
        fill="#f0f9ff" stroke="#bfdbfe" strokeWidth={1.2}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.4 }}
      />
      <rect x={114} y={65} width={12} height={3} rx={1.5} fill="#3b82f6" opacity={0.4} />
      <rect x={116} y={70} width={8} height={3} rx={1.5} fill="#3b82f6" opacity={0.25} />

      {/* Connection lines */}
      {roles.map((role, i) => (
        <motion.line
          key={`line-${i}`}
          x1={120} y1={70} x2={role.cx} y2={role.cy}
          stroke={role.color} strokeWidth={1} strokeDasharray="3 3"
          animate={{ opacity: hovered ? 0.4 : 0.15, strokeDashoffset: hovered ? [0, -12] : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Role nodes */}
      {roles.map((role, i) => (
        <motion.g
          key={i}
          animate={{
            y: hovered ? (i % 2 === 0 ? -3 : -2) : 0,
            x: hovered ? (i < 2 ? -2 : i > 3 ? 2 : 0) : 0,
          }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx={role.cx} cy={role.cy} r={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
          <circle cx={role.cx} cy={role.cy - 2} r={3.5} fill={role.color} opacity={0.2} />
          <rect x={role.cx - 5} y={role.cy + 3} width={10} height={3} rx={1.5} fill={role.color} opacity={0.15} />
        </motion.g>
      ))}
    </svg>
  );
}

function QuickSetupIllustration({ hovered }: { hovered: boolean }) {
  const steps = [
    { x: 64, done: true, color: "#10b981" },
    { x: 100, done: true, color: "#10b981" },
    { x: 136, done: false, color: "#3b82f6" },
    { x: 172, done: false, color: "#e2e8f0" },
  ];
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Quick setup wizard with progress steps">
      <motion.g
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x={50} y={28} width={140} height={84} rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
        <rect x={50} y={28} width={140} height={16} rx={12} fill="#f59e0b" opacity={0.06} />
        {/* Zap icon */}
        <path d="M118,31 L114,37 L117,37 L116,41 L120,35 L117,35 Z" fill="#f59e0b" opacity={0.4} />

        {/* Progress steps */}
        {steps.map((step, i) => (
          <g key={i}>
            {i > 0 && (
              <motion.line
                x1={steps[i - 1].x + 10} y1={62} x2={step.x - 10} y2={62}
                stroke={step.done ? "#10b981" : "#e2e8f0"} strokeWidth={2} strokeLinecap="round"
                animate={{ opacity: hovered && i === 2 ? [0.4, 0.8, 0.4] : 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <motion.circle
              cx={step.x} cy={62} r={8}
              fill={step.done ? "#ecfdf5" : step.color === "#3b82f6" ? "#eff6ff" : "#f8fafc"}
              stroke={step.done ? "#a7f3d0" : step.color === "#3b82f6" ? "#bfdbfe" : "#e2e8f0"}
              strokeWidth={1.2}
              animate={!step.done && step.color === "#3b82f6" ? { scale: hovered ? [1, 1.15, 1] : 1 } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {step.done && (
              <path d={`M${step.x - 3},62 l2,2 l4,-4`} stroke="#10b981" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            )}
            {!step.done && step.color === "#3b82f6" && (
              <circle cx={step.x} cy={62} r={3} fill="#3b82f6" opacity={0.4} />
            )}
          </g>
        ))}

        {/* Bottom progress bar */}
        <rect x={66} y={82} width={108} height={6} rx={3} fill="#f1f5f9" />
        <motion.rect
          x={66} y={82} rx={3} height={6}
          fill="#10b981" opacity={0.5}
          animate={{ width: hovered ? 72 : 54 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <rect x={66} y={94} width={40} height={4} rx={2} fill="#e2e8f0" opacity={0.5} />
      </motion.g>
    </svg>
  );
}

function ExpertsIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Team iTek building with expertise signals">
      <motion.g
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Building */}
        <rect x={85} y={34} width={70} height={76} rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
        <rect x={85} y={34} width={70} height={16} rx={10} fill="#64748b" opacity={0.06} />
        {/* iTek badge */}
        <rect x={105} y={37} width={30} height={8} rx={4} fill="#64748b" opacity={0.15} />
        <rect x={109} y={40} width={22} height={2} rx={1} fill="#64748b" opacity={0.3} />

        {/* Windows / floor lines */}
        {[58, 72, 86].map((y) => (
          <g key={y}>
            <rect x={95} y={y} width={12} height={10} rx={2} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth={0.8} />
            <rect x={113} y={y} width={12} height={10} rx={2} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth={0.8} />
            <rect x={131} y={y} width={12} height={10} rx={2} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth={0.8} />
          </g>
        ))}

        {/* Pulse from building */}
        <motion.circle
          cx={120} cy={70} r={45}
          fill="none" stroke="#64748b" strokeWidth={0.8}
          animate={{ r: hovered ? [45, 52, 45] : 45, opacity: hovered ? [0.1, 0.2, 0.1] : 0.08 }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.circle
          cx={120} cy={70} r={55}
          fill="none" stroke="#64748b" strokeWidth={0.5}
          animate={{ r: hovered ? [55, 62, 55] : 55, opacity: hovered ? [0.05, 0.12, 0.05] : 0.04 }}
          transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  );
}

function LifecycleIllustration({ hovered }: { hovered: boolean }) {
  const nodes = [
    { cx: 120, cy: 36, label: "Submit", color: "#3b82f6" },
    { cx: 168, cy: 58, label: "Review", color: "#8b5cf6" },
    { cx: 156, cy: 100, label: "Operate", color: "#10b981" },
    { cx: 84, cy: 100, label: "Report", color: "#f59e0b" },
    { cx: 72, cy: 58, label: "Plan", color: "#06b6d4" },
  ];
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Complete research lifecycle circle diagram">
      {/* Connecting ring */}
      <motion.circle
        cx={120} cy={72} r={40}
        fill="none" stroke="#e2e8f0" strokeWidth={1.5} strokeDasharray="5 5"
        animate={{ strokeDashoffset: hovered ? [0, -20] : 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Flow arrows between nodes */}
      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const mx = (node.cx + next.cx) / 2;
        const my = (node.cy + next.cy) / 2;
        return (
          <motion.circle
            key={`dot-${i}`}
            cx={mx} cy={my} r={2}
            fill="#06b6d4"
            animate={{ opacity: hovered ? [0.2, 0.6, 0.2] : 0.15 }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={i}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
        >
          <circle cx={node.cx} cy={node.cy} r={14} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
          <circle cx={node.cx} cy={node.cy} r={5} fill={node.color} opacity={0.2} />
          <circle cx={node.cx} cy={node.cy} r={2.5} fill={node.color} opacity={0.4} />
        </motion.g>
      ))}

      {/* Center dot */}
      <motion.circle
        cx={120} cy={72} r={6}
        fill="#f0f9ff" stroke="#bfdbfe" strokeWidth={1}
        animate={{ scale: hovered ? [1, 1.15, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <circle cx={120} cy={72} r={2.5} fill="#3b82f6" opacity={0.35} />
    </svg>
  );
}

/* ── Card Data ──────────────────────────────────────── */

const trustPoints = [
  {
    title: "Purpose-Built for Animal Research",
    description:
      "Not a generic lab tool adapted for research. Vivgram is designed from the ground up for animal care and facility operations.",
    Illustration: AnimalResearchIllustration,
  },
  {
    title: "IACUC Compliance at the Core",
    description:
      "Every workflow, report, and audit trail is built around institutional compliance requirements, so you are always inspection-ready.",
    Illustration: ComplianceIllustration,
  },
  {
    title: "Every Role, One Platform",
    description:
      "Technicians, supervisors, managers, coordinators, and faculty directors all get tailored dashboards and tools in a single system.",
    Illustration: RolesIllustration,
  },
  {
    title: "Go Live in Days, Not Months",
    description:
      "Guided setup wizard, easy data import, and intuitive interfaces mean your team is productive from day one.",
    Illustration: QuickSetupIllustration,
  },
  {
    title: "Built by Research Operations Experts",
    description:
      "Developed by Team iTek with deep domain expertise in research facility management and institutional workflows.",
    Illustration: ExpertsIllustration,
  },
  {
    title: "Complete Lifecycle Coverage",
    description:
      "From protocol submission to daily tasks, health observations to compliance reports, every stage is connected and traceable.",
    Illustration: LifecycleIllustration,
  },
];

/* ── Section ──────────────────────────────────────── */

function AdvantageCard({
  title,
  description,
  Illustration,
}: (typeof trustPoints)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="card-border-hover group relative flex flex-col rounded-[20px] border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200/60 bg-slate-50/50 sm:h-56">
        <div className="relative h-full w-full p-3">
          <Illustration hovered={hovered} />
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-24 md:py-32 bg-mesh">
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-slate-100/50 blur-3xl animate-orb" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-blue-50/40 blur-3xl animate-orb-slow" aria-hidden="true" />
      <Container>
        <SectionHeader
          overline="The Vivgram Advantage"
          heading="Built Different. Built Better."
          subtext="Vivgram is not another generic tool. It is purpose-built for the unique challenges of animal research facility operations."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {trustPoints.map((point) => (
            <AdvantageCard key={point.title} {...point} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
