"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { staggerContainer, fadeUp } from "@/lib/animations";

/* ── Illustrations ──────────────────────────────────────── */

function FragmentedIllustration({ hovered }: { hovered: boolean }) {
  const cards = [
    { x: 30, y: 44, color: "#3b82f6" },
    { x: 100, y: 28, color: "#22c55e" },
    { x: 170, y: 50, color: "#f59e0b" },
  ];
  const drift = [
    { x: -8, y: -4 },
    { x: 0, y: -6 },
    { x: 8, y: -4 },
  ];

  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Illustration of fragmented research workflows">
      <motion.path
        d="M68,62 C84,62 84,46 100,46"
        stroke="#ef4444"
        strokeWidth={1.5}
        strokeDasharray="4 6"
        strokeLinecap="round"
        animate={{
          opacity: hovered ? [0.2, 0.5, 0.2] : 0.25,
          strokeDashoffset: hovered ? [0, -20] : 0,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M138,46 C154,46 154,68 170,68"
        stroke="#ef4444"
        strokeWidth={1.5}
        strokeDasharray="4 6"
        strokeLinecap="round"
        animate={{
          opacity: hovered ? [0.2, 0.5, 0.2] : 0.25,
          strokeDashoffset: hovered ? [0, -20] : 0,
        }}
        transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "linear" }}
      />

      {cards.map((card, i) => (
        <motion.g
          key={i}
          animate={{
            x: hovered ? drift[i].x : 0,
            y: hovered ? drift[i].y : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x={card.x} y={card.y} width={38} height={36} rx={8} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
          <rect x={card.x} y={card.y} width={38} height={10} rx={8} fill={card.color} opacity={0.08} />
          <circle cx={card.x + 7} cy={card.y + 5} r={1.5} fill={card.color} opacity={0.4} />
          <circle cx={card.x + 12} cy={card.y + 5} r={1.5} fill={card.color} opacity={0.25} />
          <rect x={card.x + 6} y={card.y + 16} width={26} height={3} rx={1.5} fill={card.color} opacity={0.18} />
          <rect x={card.x + 6} y={card.y + 22} width={18} height={3} rx={1.5} fill={card.color} opacity={0.1} />
          <rect x={card.x + 6} y={card.y + 28} width={22} height={3} rx={1.5} fill={card.color} opacity={0.07} />
        </motion.g>
      ))}

      {[{ x: 83, y: 54 }, { x: 153, y: 56 }].map((pos, i) => (
        <motion.g
          key={`x-${i}`}
          animate={{ opacity: hovered ? [0.35, 0.8, 0.35] : 0.4 }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        >
          <circle cx={pos.x} cy={pos.y} r={7} fill="#fef2f2" stroke="#fecaca" strokeWidth={1} />
          <path d={`M${pos.x - 2.5},${pos.y - 2.5} l5,5 M${pos.x + 2.5},${pos.y - 2.5} l-5,5`} stroke="#ef4444" strokeWidth={1.5} strokeLinecap="round" />
        </motion.g>
      ))}

      {[
        { x: 55, y: 96, w: 32, color: "#8b5cf6" },
        { x: 108, y: 92, w: 28, color: "#ec4899" },
        { x: 155, y: 98, w: 35, color: "#64748b" },
      ].map((block, i) => (
        <motion.g
          key={`b-${i}`}
          animate={{
            x: hovered ? (i === 0 ? -5 : i === 2 ? 5 : 0) : 0,
            y: hovered ? 4 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x={block.x} y={block.y} width={block.w} height={24} rx={6} fill="white" stroke="#e2e8f0" strokeWidth={1} />
          <rect x={block.x + 5} y={block.y + 6} width={block.w - 10} height={3} rx={1.5} fill={block.color} opacity={0.15} />
          <rect x={block.x + 5} y={block.y + 12} width={block.w - 14} height={3} rx={1.5} fill={block.color} opacity={0.08} />
        </motion.g>
      ))}
    </svg>
  );
}

function ComplianceIllustration({ hovered }: { hovered: boolean }) {
  const items = [
    { done: true, label: "Protocol Review" },
    { done: true, label: "Training Cert" },
    { done: false, overdue: true, label: "Safety Audit" },
    { done: false, overdue: true, label: "Annual Report" },
  ];

  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" fill="none" role="img" aria-label="Illustration of manual compliance tracking with overdue items">
      <rect x="30" y="8" width="140" height="124" rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
      <rect x="72" y="2" width="56" height="14" rx={7} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth={1.2} />
      <rect x="86" y="5.5" width="28" height="7" rx={3.5} fill="#d1d5db" opacity={0.6} />

      {items.map((item, i) => {
        const y = 30 + i * 24;
        return (
          <g key={i}>
            {item.overdue && (
              <motion.rect
                x={38} y={y - 2} width={124} height={20} rx={5} fill="#fef2f2"
                animate={{ opacity: hovered ? [0.4, 0.7, 0.4] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <rect
              x={44} y={y} width={16} height={16} rx={4}
              fill={item.done ? "#22c55e" : "white"}
              stroke={item.done ? "#16a34a" : (item.overdue ? "#fca5a5" : "#d1d5db")}
              strokeWidth={1.3}
            />
            {item.done && (
              <path d={`M${48},${y + 8} l2.5,3 l5,-6`} stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            )}
            <text x={68} y={y + 12} fill={item.done ? "#94a3b8" : "#334155"} fontSize="9" fontWeight="500" textDecoration={item.done ? "line-through" : "none"}>
              {item.label}
            </text>
            {item.overdue && (
              <motion.g animate={{ opacity: hovered ? [0.6, 1, 0.6] : 0.7 }} transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}>
                <rect x={128} y={y + 1} width={30} height={14} rx={7} fill="#fef2f2" stroke="#fca5a5" strokeWidth={0.8} />
                <text x={143} y={y + 11} textAnchor="middle" fill="#ef4444" fontSize="5.5" fontWeight="700">LATE</text>
              </motion.g>
            )}
          </g>
        );
      })}

      <text x={44} y={125} fill="#94a3b8" fontSize="7">2 of 4</text>
      <rect x={74} y={120} width={88} height={5} rx={2.5} fill="#f1f5f9" />
      <motion.rect
        x={74} y={120} height={5} rx={2.5} fill="#ef4444" opacity={0.7}
        initial={{ width: 0 }}
        animate={{ width: hovered ? 44 : 38 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function SilosIllustration({ hovered }: { hovered: boolean }) {
  const nodes = [
    { cx: 55, cy: 40, color: "#3b82f6", label: "Faculty" },
    { cx: 145, cy: 40, color: "#8b5cf6", label: "Ops" },
    { cx: 55, cy: 105, color: "#22c55e", label: "Facilities" },
    { cx: 145, cy: 105, color: "#f59e0b", label: "Admin" },
  ];
  const drift = [
    { x: -8, y: -6 },
    { x: 8, y: -6 },
    { x: -8, y: 6 },
    { x: 8, y: 6 },
  ];

  return (
    <svg viewBox="0 0 200 145" className="h-full w-full" fill="none" role="img" aria-label="Illustration of disconnected teams working in silos">
      {[
        "M75,40 L125,40", "M75,105 L125,105",
        "M55,60 L55,85", "M145,60 L145,85",
        "M73,55 L127,90", "M127,55 L73,90",
      ].map((d, i) => (
        <motion.path
          key={`c-${i}`} d={d} stroke="#ef4444" strokeWidth={1.2}
          strokeDasharray="4 7" strokeLinecap="round"
          animate={{
            opacity: hovered ? [0.12, 0.35, 0.12] : 0.15,
            strokeDashoffset: hovered ? [0, -22] : 0,
          }}
          transition={{ duration: 2.5, delay: i * 0.1, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {nodes.map((node, i) => (
        <motion.g
          key={i}
          animate={{ x: hovered ? drift[i].x : 0, y: hovered ? drift[i].y : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x={node.cx - 24} y={node.cy - 18} width={48} height={36} rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
          <rect x={node.cx - 24} y={node.cy - 18} width={48} height={3} rx={1.5} fill={node.color} opacity={0.5} />
          <circle cx={node.cx} cy={node.cy - 3} r={7} fill={node.color} opacity={0.1} stroke={node.color} strokeWidth={1} />
          <circle cx={node.cx} cy={node.cy - 5.5} r={2.5} fill={node.color} opacity={0.35} />
          <path d={`M${node.cx - 4},${node.cy + 2} a4,3 0 0,1 8,0`} fill={node.color} opacity={0.25} />
          <text x={node.cx} y={node.cy + 14} textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">{node.label}</text>
        </motion.g>
      ))}

      <motion.g
        animate={{ opacity: hovered ? [0.4, 0.85, 0.4] : 0.45, scale: hovered ? [1, 1.08, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "100px 72px" }}
      >
        <circle cx={100} cy={72} r={11} fill="#fef2f2" stroke="#fecaca" strokeWidth={1} />
        <path d="M96,68 l3,3 M104,72 l-3,3" stroke="#ef4444" strokeWidth={2} strokeLinecap="round" />
        <path d="M96,76 l-2,2 M104,68 l2,-2" stroke="#ef4444" strokeWidth={1.5} strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function VisibilityIllustration({ hovered }: { hovered: boolean }) {
  const bars = [40, 28, 52, 35, 48, 24];

  return (
    <svg viewBox="0 0 210 145" className="h-full w-full" fill="none" role="img" aria-label="Illustration of lack of real-time operational visibility">
      <rect x="18" y="8" width="174" height="128" rx={12} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
      <rect x="18" y="8" width="174" height="24" rx={12} fill="#f8fafc" />
      <line x1="18" y1="32" x2="192" y2="32" stroke="#f1f5f9" strokeWidth={1} />
      <circle cx="32" cy="20" r={3.5} fill="#fca5a5" opacity={0.8} />
      <circle cx="42" cy="20" r={3.5} fill="#fde68a" opacity={0.8} />
      <circle cx="52" cy="20" r={3.5} fill="#86efac" opacity={0.8} />
      <rect x="72" y="16" width="60" height={8} rx={4} fill="#e2e8f0" opacity={0.4} />

      {[0, 1, 2].map((i) => {
        const x = 28 + i * 56;
        return (
          <g key={`s-${i}`}>
            <rect x={x} y={38} width={48} height={22} rx={6} fill="#f8fafc" stroke="#f1f5f9" strokeWidth={1} />
            <rect x={x + 10} y={44} width={28} height={5} rx={2.5} fill="#e2e8f0" opacity={0.45} />
            <rect x={x + 14} y={52} width={20} height={3} rx={1.5} fill="#e2e8f0" opacity={0.25} />
          </g>
        );
      })}

      {[78, 94, 110].map((y, i) => (
        <line key={`g-${i}`} x1="28" y1={y} x2="182" y2={y} stroke="#f8fafc" strokeWidth={1} />
      ))}

      {bars.map((h, i) => {
        const x = 32 + i * 26;
        return (
          <motion.rect
            key={`b-${i}`} x={x} y={126 - h} width={16} height={h} rx={4}
            fill="#93c5fd" opacity={0.45}
            animate={{ opacity: hovered ? [0.45, 0.12, 0.45] : 0.45 }}
            transition={{ duration: 2.5, delay: i * 0.12, repeat: hovered ? Infinity : 0 }}
          />
        );
      })}

      <motion.g
        animate={{ opacity: hovered ? [0, 1] : 0, scale: hovered ? [0.7, 1] : 0.7 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "105px 96px" }}
      >
        <circle cx={105} cy={96} r={20} fill="white" stroke="#fca5a5" strokeWidth={1.2} />
        <text x={105} y={103} textAnchor="middle" fill="#ef4444" fontSize="22" fontWeight="700">?</text>
      </motion.g>

      <motion.g animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }} transition={{ duration: 0.35, delay: 0.25 }}>
        <rect x={58} y={120} width={94} height={16} rx={8} fill="#fef2f2" stroke="#fca5a5" strokeWidth={0.8} />
        <text x={105} y={131} textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="700" letterSpacing="0.05em">NO REAL-TIME DATA</text>
      </motion.g>
    </svg>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const problems = [
  {
    title: "Fragmented Workflows",
    description: "Research tasks scattered across email, spreadsheets, and disconnected systems. Teams waste hours searching and syncing.",
    Illustration: FragmentedIllustration,
  },
  {
    title: "Manual Compliance",
    description: "Checklists, email reminders, and spreadsheet audit logs create constant exposure to missed deadlines.",
    Illustration: ComplianceIllustration,
  },
  {
    title: "Disconnected Teams",
    description: "Faculty, operations, and administration work in isolation. Critical info gets lost between handoffs.",
    Illustration: SilosIllustration,
  },
  {
    title: "Zero Visibility",
    description: "Leadership lacks real-time insight into progress, compliance, and operational health.",
    Illustration: VisibilityIllustration,
  },
];

/* ── Card ────────────────────────────────────────────────── */

function ProblemCard({
  title,
  description,
  Illustration,
}: {
  title: string;
  description: string;
  Illustration: React.ComponentType<{ hovered: boolean }>;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="card-border-hover group relative flex flex-col rounded-[20px] border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Illustration area */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-200/60 bg-slate-50/50 sm:h-56">
        <div className="relative h-full w-full p-3">
          <Illustration hovered={hovered} />
        </div>
      </div>

      {/* Text area */}
      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────── */

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-vivgram" className="relative bg-[#f8fafc] py-24 md:py-32 overflow-hidden bg-mesh">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-red-100/40 blur-3xl animate-orb" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-orange-100/30 blur-3xl animate-orb-slow" aria-hidden="true" />
      <Container>
        <SectionHeader
          overline="The Challenge"
          heading="Research operations are broken."
          subtext="Most institutions run on disconnected tools, manual processes, and fragmented data, creating risk, inefficiency, and zero visibility into research status."
        />
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} {...problem} index={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
