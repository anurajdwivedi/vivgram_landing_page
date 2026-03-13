"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useBrand } from "@/lib/brand-context";

/* ── Illustrations ──────────────────────────────────────── */

function WorkspaceIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full">
      <defs>
        <filter id="ws-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Main dashboard frame */}
      <rect x="15" y="10" width="190" height="130" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#ws-shadow)" />
      {/* Sidebar */}
      <rect x="15" y="10" width="45" height="130" rx={10} fill="#f8fafc" />
      <line x1="60" y1="10" x2="60" y2="140" stroke="#e2e8f0" strokeWidth={1} />

      {/* Sidebar items */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.rect
          key={`nav-${i}`}
          x={22}
          y={24 + i * 22}
          width={30}
          height={12}
          rx={4}
          fill={i === 0 ? "#3b82f6" : "#e2e8f0"}
          opacity={i === 0 ? 0.9 : 0.5}
          animate={{
            fill: hovered && i === 0 ? "#3b82f6" : undefined,
            opacity: hovered ? (i === 0 ? 1 : 0.7) : (i === 0 ? 0.9 : 0.5),
          }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        />
      ))}

      {/* Top stat cards */}
      {[0, 1, 2].map((i) => {
        const x = 68 + i * 46;
        const colors = ["#3b82f6", "#22c55e", "#8b5cf6"];
        return (
          <motion.g key={`stat-${i}`}>
            <rect x={x} y={20} width={40} height={30} rx={6} fill="white" stroke="#e2e8f0" strokeWidth={1} />
            <motion.rect
              x={x + 8}
              y={26}
              width={24}
              height={6}
              rx={3}
              fill={colors[i]}
              opacity={0.7}
              animate={{
                width: hovered ? [24, 20 + i * 3, 24] : 24,
                opacity: hovered ? [0.7, 1, 0.7] : 0.7,
              }}
              transition={{ duration: 1.5, delay: i * 0.15, repeat: hovered ? Infinity : 0 }}
            />
            <rect x={x + 8} y={36} width={18} height={4} rx={2} fill="#e2e8f0" opacity={0.6} />
          </motion.g>
        );
      })}

      {/* Main content area - table rows */}
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={`row-${i}`}>
          <rect x={68} y={60 + i * 18} width={128} height={12} rx={4} fill={i === 0 ? "#f1f5f9" : "white"} stroke="#f1f5f9" strokeWidth={0.8} />
          <motion.rect
            x={72}
            y={63 + i * 18}
            width={8}
            height={6}
            rx={2}
            fill={i % 2 === 0 ? "#22c55e" : "#3b82f6"}
            opacity={0.6}
            animate={{ opacity: hovered ? [0.6, 1, 0.6] : 0.6 }}
            transition={{ duration: 1.2, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
          />
          <rect x={84} y={63 + i * 18} width={40 - i * 4} height={5} rx={2.5} fill="#cbd5e1" opacity={0.4} />
          <rect x={140} y={63 + i * 18} width={20} height={5} rx={2.5} fill="#cbd5e1" opacity={0.25} />
        </motion.g>
      ))}

      {/* Pulse dot - live indicator */}
      <motion.circle
        cx={198}
        cy={16}
        r={3}
        fill="#22c55e"
        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function ComplianceEngineIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full">
      <defs>
        <filter id="ce-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Central shield */}
      <motion.path
        d="M110,18 L150,35 L150,75 C150,100 130,118 110,128 C90,118 70,100 70,75 L70,35 Z"
        fill="white"
        stroke="#3b82f6"
        strokeWidth={2}
        filter="url(#ce-shadow)"
        animate={{
          stroke: hovered ? ["#3b82f6", "#22c55e", "#3b82f6"] : "#3b82f6",
        }}
        transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
      />

      {/* Shield checkmark */}
      <motion.path
        d="M95,72 L106,83 L128,58"
        fill="none"
        stroke="#22c55e"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.6 }}
      />

      {/* Shield inner lines */}
      <rect x={88} y={42} width={44} height={4} rx={2} fill="#3b82f6" opacity={0.15} />
      <rect x={94} y={50} width={32} height={4} rx={2} fill="#3b82f6" opacity={0.1} />

      {/* Orbiting automation dots */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * 90) * (Math.PI / 180);
        const rx = 58;
        const ry = 48;
        const cx = 110 + rx * Math.cos(angle);
        const cy = 73 + ry * Math.sin(angle);
        const icons = ["✓", "⟳", "📋", "⏱"];
        return (
          <motion.g
            key={`orb-${i}`}
            animate={{
              x: hovered ? [0, Math.cos(angle + 0.3) * rx - Math.cos(angle) * rx] : 0,
              y: hovered ? [0, Math.sin(angle + 0.3) * ry - Math.sin(angle) * ry] : 0,
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: hovered ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <circle cx={cx} cy={cy} r={14} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#ce-shadow)" />
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10">
              {icons[i]}
            </text>
          </motion.g>
        );
      })}

      {/* Connection arcs */}
      <motion.ellipse
        cx={110}
        cy={73}
        rx={58}
        ry={48}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={1}
        strokeDasharray="4 8"
        opacity={0.2}
        animate={{
          strokeDashoffset: hovered ? [0, -24] : 0,
          opacity: hovered ? 0.4 : 0.2,
        }}
        transition={{ duration: 3, repeat: hovered ? Infinity : 0, ease: "linear" }}
      />
    </svg>
  );
}

function AnalyticsIllustration({ hovered }: { hovered: boolean }) {
  const bars = [
    { h: 35, color: "#3b82f6" },
    { h: 55, color: "#3b82f6" },
    { h: 42, color: "#3b82f6" },
    { h: 70, color: "#22c55e" },
    { h: 58, color: "#3b82f6" },
    { h: 80, color: "#22c55e" },
    { h: 65, color: "#3b82f6" },
  ];

  return (
    <svg viewBox="0 0 220 150" className="h-full w-full">
      <defs>
        <filter id="an-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
        <linearGradient id="chart-line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {/* Card frame */}
      <rect x="10" y="8" width="200" height="134" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#an-shadow)" />

      {/* Header area */}
      <text x="24" y="28" fill="#334155" fontSize="9" fontWeight="700">Real-Time Analytics</text>
      <motion.rect
        x={150}
        y={18}
        width={48}
        height={16}
        rx={8}
        fill="#f0fdf4"
        stroke="#86efac"
        strokeWidth={1}
        animate={{ opacity: hovered ? [0.8, 1, 0.8] : 0.8 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
      />
      <text x={174} y={29} textAnchor="middle" fill="#16a34a" fontSize="7" fontWeight="600">↑ 24%</text>

      {/* Grid lines */}
      {[50, 70, 90, 110].map((y, i) => (
        <line key={`g-${i}`} x1="24" y1={y} x2="196" y2={y} stroke="#f1f5f9" strokeWidth={0.8} />
      ))}

      {/* Bar chart */}
      {bars.map((bar, i) => {
        const x = 28 + i * 24;
        return (
          <motion.rect
            key={`b-${i}`}
            x={x}
            width={16}
            rx={4}
            fill={bar.color}
            opacity={0.7}
            initial={{ y: 130, height: 0 }}
            animate={{
              y: hovered ? 130 - bar.h : 130 - bar.h * 0.85,
              height: hovered ? bar.h : bar.h * 0.85,
              opacity: hovered ? [0.7, 0.95, 0.7] : 0.7,
            }}
            transition={{
              duration: hovered ? 1.5 : 0.8,
              delay: i * 0.08,
              repeat: hovered ? Infinity : 0,
              repeatType: "reverse",
            }}
          />
        );
      })}

      {/* Trend line overlay */}
      <motion.polyline
        points="36,100 60,82 84,90 108,62 132,72 156,50 180,58"
        fill="none"
        stroke="url(#chart-line-grad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0.7 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* Data points on trend line */}
      {[
        { x: 36, y: 100 }, { x: 60, y: 82 }, { x: 84, y: 90 },
        { x: 108, y: 62 }, { x: 132, y: 72 }, { x: 156, y: 50 }, { x: 180, y: 58 },
      ].map((pt, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={pt.x}
          cy={pt.y}
          r={3}
          fill="white"
          stroke="#3b82f6"
          strokeWidth={2}
          animate={{
            r: hovered ? [3, 4.5, 3] : 3,
            opacity: hovered ? 1 : 0.6,
          }}
          transition={{ duration: 1.5, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
        />
      ))}
    </svg>
  );
}

function AccessIllustration({ hovered }: { hovered: boolean }) {
  const roles = [
    { cx: 50, cy: 45, color: "#3b82f6", label: "Director", level: 3 },
    { cx: 170, cy: 45, color: "#8b5cf6", label: "Manager", level: 2 },
    { cx: 50, cy: 115, color: "#22c55e", label: "Supervisor", level: 2 },
    { cx: 170, cy: 115, color: "#f59e0b", label: "Technician", level: 1 },
  ];

  return (
    <svg viewBox="0 0 220 150" className="h-full w-full">
      <defs>
        <filter id="ac-shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Central lock icon */}
      <motion.g
        animate={{
          scale: hovered ? [1, 1.08, 1] : 1,
        }}
        transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
        style={{ transformOrigin: "110px 80px" }}
      >
        <circle cx={110} cy={80} r={18} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1.5} />
        <rect x={103} y={78} width={14} height={12} rx={3} fill="#3b82f6" opacity={0.8} />
        <path d="M107,78 L107,73 a3,3 0 0,1 6,0 L113,78" fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinecap="round" />
      </motion.g>

      {/* Connection lines from center to roles */}
      {roles.map((role, i) => (
        <motion.line
          key={`line-${i}`}
          x1={110}
          y1={80}
          x2={role.cx}
          y2={role.cy}
          stroke={role.color}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          animate={{
            opacity: hovered ? [0.3, 0.7, 0.3] : 0.3,
            strokeDashoffset: hovered ? [0, -16] : 0,
          }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Role cards */}
      {roles.map((role, i) => (
        <motion.g
          key={`role-${i}`}
          animate={{
            y: hovered ? [0, -3, 0] : 0,
          }}
          transition={{ duration: 2, delay: i * 0.2, repeat: hovered ? Infinity : 0 }}
        >
          <rect
            x={role.cx - 28}
            y={role.cy - 20}
            width={56}
            height={40}
            rx={8}
            fill="white"
            stroke={role.color}
            strokeWidth={1.5}
            filter="url(#ac-shadow)"
          />
          {/* Person icon */}
          <circle cx={role.cx} cy={role.cy - 8} r={5} fill={role.color} opacity={0.2} />
          <circle cx={role.cx} cy={role.cy - 8} r={5} fill="none" stroke={role.color} strokeWidth={1.2} opacity={0.6} />
          {/* Label */}
          <text x={role.cx} y={role.cy + 8} textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="600">
            {role.label}
          </text>
          {/* Access level dots */}
          {[0, 1, 2].map((dot) => (
            <motion.circle
              key={`lvl-${dot}`}
              cx={role.cx - 6 + dot * 6}
              cy={role.cy + 15}
              r={2}
              fill={dot < role.level ? role.color : "#e2e8f0"}
              animate={{
                fill: hovered && dot < role.level ? [role.color, role.color] : undefined,
                opacity: hovered ? [0.7, 1, 0.7] : 0.7,
              }}
              transition={{ duration: 1, delay: dot * 0.1, repeat: hovered ? Infinity : 0 }}
            />
          ))}
        </motion.g>
      ))}
    </svg>
  );
}

/* ── Card Data ──────────────────────────────────────────── */

const solutions = [
  {
    title: "Unified Research Workspace",
    description: "Manage all research activity from a single, intelligent dashboard. No more switching between tools.",
    Illustration: WorkspaceIllustration,
  },
  {
    title: "Automated Compliance Engine",
    description: "Built-in regulatory workflows with automated deadline tracking and compliance monitoring.",
    Illustration: ComplianceEngineIllustration,
  },
  {
    title: "Real-Time Analytics",
    description: "Instant visibility into operational metrics. Generate reports for leadership in minutes, not weeks.",
    Illustration: AnalyticsIllustration,
  },
  {
    title: "Role-Based Access",
    description: "Granular permissions ensure every stakeholder sees exactly what they need, nothing more.",
    Illustration: AccessIllustration,
  },
];

/* ── Interactive Card ───────────────────────────────────── */

function SolutionCard({
  title,
  description,
  Illustration,
}: {
  title: string;
  description: string;
  Illustration: React.ComponentType<{ hovered: boolean }>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col rounded-[20px] border border-slate-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/50 sm:h-56">
        <div className="relative h-full w-full p-3">
          <Illustration hovered={hovered} />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────── */

export default function SolutionSection() {
  const { brand } = useBrand();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="platform" className="relative bg-[#f8fafc] py-24 md:py-32">
      <Container>
        {/* Top area — heading + subtext centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <SectionHeader
            overline={`The ${brand} Platform`}
            heading="One platform. Complete control."
            subtext={`Replace fragmented tools with a single source of truth. ${brand} connects workflows, automates compliance, and delivers real-time reporting across every stage of the research lifecycle.`}
            align="left"
          />
        </motion.div>

        {/* Cards grid — 4 inline */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {solutions.map((card) => (
            <SolutionCard key={card.title} {...card} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
