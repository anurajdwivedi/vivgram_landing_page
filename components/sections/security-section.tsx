"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { fadeUp, staggerContainer } from "@/lib/animations";

/* ── Illustrations ──────────────────────────────────────── */

function RBACIllustration({ hovered }: { hovered: boolean }) {
  const roles = [
    { cx: 60, cy: 35, color: "#3b82f6", label: "Admin", level: 3 },
    { cx: 180, cy: 35, color: "#8b5cf6", label: "Manager", level: 2 },
    { cx: 60, cy: 105, color: "#22c55e", label: "Supervisor", level: 2 },
    { cx: 180, cy: 105, color: "#f59e0b", label: "Technician", level: 1 },
  ];

  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Role-based access control diagram with permission levels">
      {/* Central lock */}
      <motion.g
        animate={{ scale: hovered ? [1, 1.06, 1] : 1 }}
        transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
        style={{ transformOrigin: "120px 70px" }}
      >
        <circle cx={120} cy={70} r={16} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1.5} />
        <rect x={114} y={69} width={12} height={10} rx={2.5} fill="#3b82f6" opacity={0.8} />
        <path d="M117,69 L117,65 a3,3 0 0,1 6,0 L123,69" fill="none" stroke="#3b82f6" strokeWidth={1.8} strokeLinecap="round" />
      </motion.g>

      {/* Connection lines */}
      {roles.map((role, i) => (
        <motion.line
          key={`line-${i}`}
          x1={120} y1={70} x2={role.cx} y2={role.cy}
          stroke={role.color} strokeWidth={1.2} strokeDasharray="4 4"
          animate={{
            opacity: hovered ? [0.2, 0.6, 0.2] : 0.25,
            strokeDashoffset: hovered ? [0, -16] : 0,
          }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Role cards */}
      {roles.map((role, i) => (
        <motion.g
          key={`role-${i}`}
          animate={{ y: hovered ? [0, -3, 0] : 0 }}
          transition={{ duration: 2, delay: i * 0.2, repeat: hovered ? Infinity : 0 }}
        >
          <rect x={role.cx - 26} y={role.cy - 16} width={52} height={32} rx={8} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
          <rect x={role.cx - 26} y={role.cy - 16} width={52} height={3} rx={1.5} fill={role.color} opacity={0.5} />
          <circle cx={role.cx} cy={role.cy - 3} r={5} fill={role.color} opacity={0.12} stroke={role.color} strokeWidth={0.8} />
          <text x={role.cx} y={role.cy + 12} textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="600">{role.label}</text>
          {[0, 1, 2].map((dot) => (
            <motion.circle
              key={`lvl-${dot}`}
              cx={role.cx - 5 + dot * 5}
              cy={role.cy + 20}
              r={1.5}
              fill={dot < role.level ? role.color : "#e2e8f0"}
              animate={{ opacity: hovered ? [0.6, 1, 0.6] : 0.6 }}
              transition={{ duration: 1, delay: dot * 0.1, repeat: hovered ? Infinity : 0 }}
            />
          ))}
        </motion.g>
      ))}
    </svg>
  );
}

function AuditTrailIllustration({ hovered }: { hovered: boolean }) {
  const rows = [
    { action: "Protocol Approved", user: "Dr. Kim", time: "2m ago", color: "#22c55e" },
    { action: "Task Completed", user: "J. Smith", time: "8m ago", color: "#3b82f6" },
    { action: "Report Generated", user: "System", time: "15m ago", color: "#8b5cf6" },
    { action: "Access Granted", user: "M. Chen", time: "22m ago", color: "#f59e0b" },
    { action: "Inspection Logged", user: "R. Davis", time: "30m ago", color: "#22c55e" },
  ];

  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Real-time audit log with timestamped actions">
      <rect x="20" y="6" width="200" height="128" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.2} />
      {/* Header */}
      <rect x="20" y="6" width="200" height="22" rx={10} fill="#f8fafc" />
      <line x1="20" y1="28" x2="220" y2="28" stroke="#f1f5f9" strokeWidth={1} />
      <circle cx="32" cy="17" r={3} fill="#ef4444" opacity={0.6} />
      <circle cx="41" cy="17" r={3} fill="#f59e0b" opacity={0.6} />
      <circle cx="50" cy="17" r={3} fill="#22c55e" opacity={0.6} />
      <text x="72" y="20" fill="#94a3b8" fontSize="7" fontWeight="600">Audit Log</text>

      {rows.map((row, i) => {
        const y = 36 + i * 19;
        return (
          <motion.g
            key={i}
            animate={{
              opacity: hovered ? [0.7, 1, 0.7] : 0.85,
              x: hovered ? [0, 2, 0] : 0,
            }}
            transition={{ duration: 1.5, delay: i * 0.12, repeat: hovered ? Infinity : 0 }}
          >
            <line x1="28" y1={y + 16} x2="212" y2={y + 16} stroke="#f8fafc" strokeWidth={0.8} />
            <circle cx={34} cy={y + 7} r={3.5} fill={row.color} opacity={0.15} stroke={row.color} strokeWidth={0.8} />
            <circle cx={34} cy={y + 7} r={1.2} fill={row.color} opacity={0.6} />
            <text x={44} y={y + 9} fill="#334155" fontSize="6.5" fontWeight="500">{row.action}</text>
            <text x={140} y={y + 9} fill="#94a3b8" fontSize="6" fontWeight="400">{row.user}</text>
            <text x={195} y={y + 9} textAnchor="end" fill="#cbd5e1" fontSize="5.5">{row.time}</text>
          </motion.g>
        );
      })}

      {/* Live indicator */}
      <motion.circle
        cx={212} cy={17} r={3}
        fill="#22c55e"
        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function CloudInfraIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Cloud infrastructure with geographic redundancy">
      {/* Cloud shape */}
      <motion.path
        d="M80,75 a30,30 0 0,1 58,-12 a22,22 0 0,1 40,8 a18,18 0 0,1 -4,35 L78,106 a25,25 0 0,1 2,-31z"
        fill="white" stroke="#e2e8f0" strokeWidth={1.5}
        animate={{ y: hovered ? [0, -3, 0] : 0 }}
        transition={{ duration: 3, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
      />

      {/* Server nodes inside cloud */}
      {[
        { x: 95, y: 82 },
        { x: 125, y: 78 },
        { x: 155, y: 82 },
      ].map((pos, i) => (
        <motion.g
          key={i}
          animate={{ y: hovered ? [0, -3, 0] : 0 }}
          transition={{ duration: 3, delay: i * 0.15, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
        >
          <rect x={pos.x - 10} y={pos.y - 6} width={20} height={16} rx={3} fill="#f8fafc" stroke="#e2e8f0" strokeWidth={1} />
          <rect x={pos.x - 6} y={pos.y - 2} width={12} height={2} rx={1} fill="#3b82f6" opacity={0.4} />
          <rect x={pos.x - 6} y={pos.y + 3} width={8} height={2} rx={1} fill="#3b82f6" opacity={0.25} />
          <motion.circle
            cx={pos.x + 6} cy={pos.y + 6} r={1.5}
            fill="#22c55e"
            animate={{ opacity: hovered ? [0.4, 1, 0.4] : 0.5 }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        </motion.g>
      ))}

      {/* Connection lines to ground nodes */}
      {[85, 125, 165].map((x, i) => (
        <motion.line
          key={`conn-${i}`}
          x1={x} y1={100} x2={x} y2={120}
          stroke="#3b82f6" strokeWidth={1} strokeDasharray="3 4"
          animate={{
            opacity: hovered ? [0.2, 0.5, 0.2] : 0.2,
            strokeDashoffset: hovered ? [0, -14] : 0,
          }}
          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Ground nodes */}
      {[85, 125, 165].map((x, i) => {
        const labels = ["US-East", "US-West", "EU"];
        return (
          <g key={`node-${i}`}>
            <rect x={x - 16} y={120} width={32} height={14} rx={4} fill="white" stroke="#e2e8f0" strokeWidth={1} />
            <text x={x} y={129} textAnchor="middle" fill="#64748b" fontSize="5.5" fontWeight="600">{labels[i]}</text>
          </g>
        );
      })}

      {/* Uptime badge */}
      <motion.g
        animate={{ opacity: hovered ? [0.7, 1, 0.7] : 0.8 }}
        transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
      >
        <rect x={90} y={50} width={60} height={18} rx={9} fill="#f0fdf4" stroke="#86efac" strokeWidth={1} />
        <text x={120} y={62} textAnchor="middle" fill="#16a34a" fontSize="7" fontWeight="700">99.9% Uptime</text>
      </motion.g>
    </svg>
  );
}

function EncryptionIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" fill="none" role="img" aria-label="Data encryption with shield verification">
      {/* Data flow lines */}
      {[30, 55, 80, 105].map((y, i) => (
        <motion.g key={`flow-${i}`}>
          {/* Left plaintext block */}
          <rect x={20} y={y} width={55} height={14} rx={4} fill="white" stroke="#e2e8f0" strokeWidth={1} />
          <rect x={25} y={y + 4} width={20 + i * 5} height={3} rx={1.5} fill="#3b82f6" opacity={0.2} />
          <rect x={25} y={y + 8.5} width={15 + i * 3} height={2} rx={1} fill="#e2e8f0" opacity={0.5} />

          {/* Arrow with encryption */}
          <motion.line
            x1={80} y1={y + 7} x2={110} y2={y + 7}
            stroke="#3b82f6" strokeWidth={1} strokeDasharray="3 3"
            animate={{
              strokeDashoffset: hovered ? [0, -12] : 0,
              opacity: hovered ? [0.3, 0.7, 0.3] : 0.3,
            }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, ease: "linear" }}
          />

          {/* Right encrypted block */}
          <rect x={115} y={y} width={55} height={14} rx={4} fill="white" stroke="#22c55e" strokeWidth={1} />
          <motion.rect
            x={120} y={y + 4} width={20 + i * 5} height={3} rx={1.5}
            fill="#22c55e" opacity={0.25}
            animate={{ opacity: hovered ? [0.15, 0.35, 0.15] : 0.25 }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
          />
          <rect x={120} y={y + 8.5} width={15 + i * 3} height={2} rx={1} fill="#dcfce7" opacity={0.5} />

          {/* Lock icon on encrypted */}
          <motion.g
            animate={{ opacity: hovered ? [0.5, 1, 0.5] : 0.6 }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
          >
            <rect x={158} y={y + 2} width={8} height={6} rx={1.5} fill="#22c55e" opacity={0.5} />
            <path d={`M160,${y + 2} L160,${y} a2,2 0 0,1 4,0 L164,${y + 2}`} fill="none" stroke="#22c55e" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
          </motion.g>
        </motion.g>
      ))}

      {/* Central shield */}
      <motion.g
        animate={{ scale: hovered ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
        style={{ transformOrigin: "200px 70px" }}
      >
        <path d="M200,40 L222,50 L222,78 C222,95 212,105 200,110 C188,105 178,95 178,78 L178,50 Z" fill="white" stroke="#3b82f6" strokeWidth={1.5} />
        <motion.path
          d="M192,72 L198,78 L210,64"
          fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.6 }}
        />
      </motion.g>

      {/* Labels */}
      <text x={47} y={128} textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontWeight="500">Data at Rest</text>
      <text x={142} y={128} textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontWeight="500">Encrypted</text>
    </svg>
  );
}

/* ── Card Data ──────────────────────────────────────────── */

const securityCards = [
  {
    title: "Role-Based Access Control",
    description: "Granular permissions mapped to organizational roles. Each user sees only what they are authorized to access.",
    Illustration: RBACIllustration,
  },
  {
    title: "Complete Audit Trails",
    description: "Every action is automatically logged, timestamped, and permanently recorded for regulatory inspections and compliance.",
    Illustration: AuditTrailIllustration,
  },
  {
    title: "Cloud Infrastructure",
    description: "Hosted on secure, redundant cloud infrastructure with 99.9% uptime SLA, automated backups, and 24/7 monitoring.",
    Illustration: CloudInfraIllustration,
  },
  {
    title: "Data Encryption",
    description: "All data encrypted at rest and in transit. Secure authentication and access controls protect sensitive research information.",
    Illustration: EncryptionIllustration,
  },
];

/* ── Card Component ────────────────────────────────────── */

function SecurityCard({
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

/* ── Section ────────────────────────────────────────────── */

export default function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="security" className="relative bg-slate-50/70 py-24 md:py-32 overflow-hidden bg-mesh">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl animate-orb" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-blue-100/30 blur-3xl animate-orb-slow" aria-hidden="true" />
      <Container>
        <SectionHeader
          overline="ENTERPRISE SECURITY"
          heading="Built for Regulated Research Environments"
          subtext="Enterprise-grade security and compliance infrastructure designed for institutions handling sensitive research data and regulated operational processes."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {securityCards.map((card) => (
            <SecurityCard key={card.title} {...card} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
