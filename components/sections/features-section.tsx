"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { fadeUp, staggerContainer } from "@/lib/animations";

/* ── Illustrations ──────────────────────────────────────── */

function TaskSchedulingIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" role="img" aria-label="Task scheduling Gantt chart interface">
      <defs>
        <filter id="ts-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Main frame */}
      <rect x="10" y="8" width="200" height="134" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#ts-shadow)" />
      <rect x="10" y="8" width="200" height="24" rx={10} fill="#f8fafc" />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#f1f5f9" strokeWidth={1} />

      {/* Window dots */}
      <circle cx="24" cy="20" r={3.5} fill="#fca5a5" opacity={0.8} />
      <circle cx="34" cy="20" r={3.5} fill="#fde68a" opacity={0.8} />
      <circle cx="44" cy="20" r={3.5} fill="#86efac" opacity={0.8} />
      <text x="62" y="23" fill="#64748b" fontSize="7.5" fontWeight="700">Task Schedule</text>

      {/* Status badge */}
      <motion.rect x={162} y={14} width={38} height={12} rx={6} fill="#f0fdf4" stroke="#86efac" strokeWidth={0.8}
        animate={{ opacity: hovered ? [0.7, 1, 0.7] : 0.8 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }} />
      <text x={181} y={23} textAnchor="middle" fill="#16a34a" fontSize="5.5" fontWeight="600">12 Active</text>

      {/* Column headers */}
      <text x="20" y="44" fill="#94a3b8" fontSize="5.5" fontWeight="600">ROOM</text>
      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
        <text key={d} x={68 + i * 28} y="44" textAnchor="middle" fill="#94a3b8" fontSize="5.5" fontWeight="600">{d}</text>
      ))}
      <line x1="16" y1="48" x2="204" y2="48" stroke="#f1f5f9" strokeWidth={0.8} />

      {/* Task rows with Gantt bars */}
      {[
        { label: "Room A1", x: 54, w: 82, color: "#3b82f6", y: 55 },
        { label: "Room B3", x: 68, w: 56, color: "#22c55e", y: 73 },
        { label: "Room C2", x: 54, w: 110, color: "#8b5cf6", y: 91 },
        { label: "Room D1", x: 96, w: 42, color: "#f59e0b", y: 109 },
        { label: "Room E2", x: 54, w: 68, color: "#ec4899", y: 127 },
      ].map((task, i) => (
        <motion.g key={i}>
          <line x1="16" y1={task.y + 14} x2="204" y2={task.y + 14} stroke="#f8fafc" strokeWidth={0.5} />
          <text x="20" y={task.y + 9} fill="#334155" fontSize="6" fontWeight="500">{task.label}</text>

          {/* Bar background track */}
          <rect x={54} y={task.y + 1} width={150} height={10} rx={5} fill="#f8fafc" />

          {/* Gantt bar */}
          <motion.rect
            x={task.x} y={task.y + 1} height={10} rx={5}
            fill={task.color} opacity={0.75}
            initial={{ width: 0 }}
            animate={{
              width: hovered ? [task.w, task.w + 6, task.w] : task.w,
              opacity: hovered ? [0.75, 0.95, 0.75] : 0.75,
            }}
            transition={{ duration: 1.8, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
          />

          {/* Progress indicator */}
          <motion.circle
            cx={task.x + task.w - 4} cy={task.y + 6} r={2.5}
            fill="white" stroke={task.color} strokeWidth={1.2}
            animate={{ opacity: hovered ? [0.4, 1, 0.4] : 0.5 }}
            transition={{ duration: 1.2, delay: i * 0.08, repeat: hovered ? Infinity : 0 }}
          />

          {/* Checkmark for completed portions */}
          {i < 2 && (
            <g>
              <circle cx={task.x + 6} cy={task.y + 6} r={3} fill="white" opacity={0.9} />
              <path d={`M${task.x + 4},${task.y + 6} l1.5,1.5 l3,-3`} stroke={task.color} strokeWidth={1} strokeLinecap="round" />
            </g>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

function HealthObservationIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" role="img" aria-label="Health observation report with ECG waveform">
      <defs>
        <filter id="ho-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
        <linearGradient id="pulse-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Main frame */}
      <rect x="10" y="8" width="200" height="134" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#ho-shadow)" />
      <rect x="10" y="8" width="200" height="24" rx={10} fill="#f8fafc" />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#f1f5f9" strokeWidth={1} />
      <circle cx="24" cy="20" r={3.5} fill="#fca5a5" opacity={0.8} />
      <circle cx="34" cy="20" r={3.5} fill="#fde68a" opacity={0.8} />
      <circle cx="44" cy="20" r={3.5} fill="#86efac" opacity={0.8} />
      <text x="62" y="23" fill="#64748b" fontSize="7.5" fontWeight="700">Health Report</text>

      {/* Live pulse indicator */}
      <motion.circle cx={198} cy={20} r={3} fill="#ef4444"
        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }} />

      {/* ECG waveform area */}
      <rect x="18" y="36" width="184" height="38" rx={6} fill="#fef2f2" opacity={0.3} />
      <motion.polyline
        points="22,56 35,56 40,56 43,44 46,68 49,50 52,56 65,56 70,56 73,42 76,70 79,48 82,56 95,56 100,56 103,44 106,68 109,50 112,56 125,56 130,56 133,44 136,68 139,50 142,56 155,56 160,56 163,42 166,70 169,48 172,56 185,56 190,56 193,44 196,66 199,52 202,56"
        fill="none" stroke="#ef4444" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        animate={{ strokeDashoffset: hovered ? [0, -60] : 0 }}
        strokeDasharray="300 600"
        transition={{ duration: 4, repeat: hovered ? Infinity : 0, ease: "linear" }}
      />

      {/* Data cards row */}
      {[
        { x: 18, label: "Rack", value: "R-14", icon: "▦", color: "#3b82f6" },
        { x: 64, label: "Cage", value: "C-07", icon: "⬒", color: "#8b5cf6" },
        { x: 110, label: "Species", value: "Mouse", icon: "◉", color: "#22c55e" },
        { x: 156, label: "Faculty", value: "Dr. Kim", icon: "◈", color: "#f59e0b" },
      ].map((field, i) => (
        <motion.g key={i}
          animate={{ y: hovered ? [0, -2, 0] : 0 }}
          transition={{ duration: 1.5, delay: i * 0.12, repeat: hovered ? Infinity : 0 }}>
          <rect x={field.x} y={78} width={42} height={30} rx={6} fill="white" stroke="#e2e8f0" strokeWidth={1} />
          <rect x={field.x} y={78} width={42} height={3} rx={6} fill={field.color} opacity={0.4} />
          <text x={field.x + 21} y={93} textAnchor="middle" fill="#94a3b8" fontSize="5">{field.label}</text>
          <text x={field.x + 21} y={103} textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="700">{field.value}</text>
        </motion.g>
      ))}

      {/* Bottom status row */}
      <motion.g animate={{ opacity: hovered ? [0.6, 1, 0.6] : 0.7 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}>
        <rect x={18} y={114} width={58} height={16} rx={8} fill="#3b82f6" opacity={0.08} stroke="#3b82f6" strokeWidth={0.6} />
        <text x={47} y={125} textAnchor="middle" fill="#3b82f6" fontSize="6" fontWeight="600">Litter Report</text>
      </motion.g>
      <motion.g animate={{ opacity: hovered ? [0.6, 1, 0.6] : 0.7 }}
        transition={{ duration: 1.5, delay: 0.15, repeat: hovered ? Infinity : 0 }}>
        <rect x={82} y={114} width={62} height={16} rx={8} fill="#22c55e" opacity={0.08} stroke="#22c55e" strokeWidth={0.6} />
        <text x={113} y={125} textAnchor="middle" fill="#22c55e" fontSize="6" fontWeight="600">Normal</text>
      </motion.g>
      <motion.g animate={{ opacity: hovered ? [0.6, 1, 0.6] : 0.7 }}
        transition={{ duration: 1.5, delay: 0.3, repeat: hovered ? Infinity : 0 }}>
        <rect x={150} y={114} width={52} height={16} rx={8} fill="#f59e0b" opacity={0.08} stroke="#f59e0b" strokeWidth={0.6} />
        <text x={176} y={125} textAnchor="middle" fill="#f59e0b" fontSize="6" fontWeight="600">0 Deceased</text>
      </motion.g>
    </svg>
  );
}

function InventoryIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" role="img" aria-label="Rack and cage inventory dashboard">
      <defs>
        <filter id="inv-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Main frame */}
      <rect x="10" y="8" width="200" height="134" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#inv-shadow)" />
      <rect x="10" y="8" width="200" height="24" rx={10} fill="#f8fafc" />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#f1f5f9" strokeWidth={1} />
      <circle cx="24" cy="20" r={3.5} fill="#fca5a5" opacity={0.8} />
      <circle cx="34" cy="20" r={3.5} fill="#fde68a" opacity={0.8} />
      <circle cx="44" cy="20" r={3.5} fill="#86efac" opacity={0.8} />
      <text x="62" y="23" fill="#64748b" fontSize="7.5" fontWeight="700">Inventory</text>

      {/* Summary stats */}
      {[
        { x: 18, label: "Total Racks", value: "48", color: "#3b82f6" },
        { x: 70, label: "Active Cages", value: "312", color: "#22c55e" },
        { x: 122, label: "Buffer", value: "24", color: "#8b5cf6" },
        { x: 168, label: "Capacity", value: "86%", color: "#f59e0b" },
      ].map((stat, i) => (
        <motion.g key={i} animate={{ y: hovered ? [0, -1, 0] : 0 }}
          transition={{ duration: 1.5, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}>
          <rect x={stat.x} y={36} width={44} height={26} rx={6} fill="white" stroke="#e2e8f0" strokeWidth={0.8} />
          <rect x={stat.x} y={36} width={44} height={3} rx={6} fill={stat.color} opacity={0.5} />
          <text x={stat.x + 22} y={50} textAnchor="middle" fill="#334155" fontSize="9" fontWeight="700">{stat.value}</text>
          <text x={stat.x + 22} y={58} textAnchor="middle" fill="#94a3b8" fontSize="4.5">{stat.label}</text>
        </motion.g>
      ))}

      {/* Rack visualization */}
      {[
        { x: 18, label: "Rack A", pct: 85, color: "#3b82f6" },
        { x: 56, label: "Rack B", pct: 62, color: "#22c55e" },
        { x: 94, label: "Rack C", pct: 94, color: "#f59e0b" },
        { x: 132, label: "Rack D", pct: 45, color: "#8b5cf6" },
        { x: 170, label: "Rack E", pct: 78, color: "#3b82f6" },
      ].map((rack, i) => {
        const barH = rack.pct * 0.5;
        return (
          <motion.g key={i}
            animate={{ y: hovered ? [0, -2, 0] : 0 }}
            transition={{ duration: 2, delay: i * 0.12, repeat: hovered ? Infinity : 0 }}>
            {/* Bar track */}
            <rect x={rack.x} y={72} width={30} height={52} rx={4} fill="#f8fafc" stroke="#f1f5f9" strokeWidth={0.8} />
            {/* Fill bar from bottom */}
            <motion.rect
              x={rack.x + 3} y={72 + 52 - barH} width={24} height={barH} rx={3}
              fill={rack.color} opacity={0.6}
              animate={{ opacity: hovered ? [0.6, 0.85, 0.6] : 0.6 }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
            />
            {/* Shelf lines */}
            {[0, 1, 2, 3].map((s) => (
              <line key={s} x1={rack.x + 2} y1={82 + s * 10} x2={rack.x + 28} y2={82 + s * 10} stroke="#e2e8f0" strokeWidth={0.5} opacity={0.5} />
            ))}
            {/* Label */}
            <text x={rack.x + 15} y={134} textAnchor="middle" fill="#64748b" fontSize="5.5" fontWeight="600">{rack.label}</text>
            {/* Percentage */}
            <motion.text x={rack.x + 15} y={142} textAnchor="middle"
              fill={rack.pct > 90 ? "#ef4444" : rack.pct > 75 ? "#f59e0b" : "#22c55e"}
              fontSize="6" fontWeight="700"
              animate={{ opacity: hovered ? [0.5, 1, 0.5] : 0.7 }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}>
              {rack.pct}%
            </motion.text>
          </motion.g>
        );
      })}
    </svg>
  );
}

function ProtocolIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" role="img" aria-label="Protocol lifecycle pipeline with review stages">
      <defs>
        <filter id="pr-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Main frame */}
      <rect x="10" y="8" width="200" height="134" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#pr-shadow)" />
      <rect x="10" y="8" width="200" height="24" rx={10} fill="#f8fafc" />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#f1f5f9" strokeWidth={1} />
      <circle cx="24" cy="20" r={3.5} fill="#fca5a5" opacity={0.8} />
      <circle cx="34" cy="20" r={3.5} fill="#fde68a" opacity={0.8} />
      <circle cx="44" cy="20" r={3.5} fill="#86efac" opacity={0.8} />
      <text x="62" y="23" fill="#64748b" fontSize="7.5" fontWeight="700">Protocol #2847</text>

      {/* Status badge */}
      <motion.rect x={162} y={14} width={38} height={12} rx={6} fill="#fef3c7" stroke="#fcd34d" strokeWidth={0.8}
        animate={{ opacity: hovered ? [0.7, 1, 0.7] : 0.8 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }} />
      <text x={181} y={23} textAnchor="middle" fill="#d97706" fontSize="5.5" fontWeight="700">In Review</text>

      {/* Lifecycle pipeline */}
      {[
        { label: "Invite", done: true },
        { label: "Submit", done: true },
        { label: "Review", done: true },
        { label: "Approve", current: true, done: false },
        { label: "Active", done: false },
      ].map((stage, i) => {
        const x = 28 + i * 38;
        const isDone = stage.done;
        const isCurrent = 'current' in stage && stage.current;
        return (
          <g key={i}>
            {/* Connector line */}
            {i > 0 && (
              <motion.line x1={x - 20} y1={52} x2={x - 6} y2={52}
                stroke={isDone || isCurrent ? "#22c55e" : "#e2e8f0"} strokeWidth={2} strokeLinecap="round"
                animate={{ opacity: hovered ? [0.5, 1, 0.5] : 0.7 }}
                transition={{ duration: 1.5, delay: i * 0.08, repeat: hovered ? Infinity : 0 }} />
            )}
            {/* Circle */}
            <motion.circle cx={x} cy={52} r={9}
              fill={isDone ? "#22c55e" : isCurrent ? "white" : "#f8fafc"}
              stroke={isDone ? "#16a34a" : isCurrent ? "#f59e0b" : "#e2e8f0"}
              strokeWidth={isCurrent ? 2.5 : 1.5}
              filter="url(#pr-shadow)"
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: `${x}px 52px` }} />
            {/* Check icon */}
            {isDone && (
              <path d={`M${x - 3.5},52 l2.5,3 l5,-6`} stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            )}
            {/* Current dot */}
            {isCurrent && <circle cx={x} cy={52} r={3.5} fill="#f59e0b" />}
            {/* Label */}
            <text x={x} y={70} textAnchor="middle" fill={isDone ? "#16a34a" : isCurrent ? "#d97706" : "#94a3b8"} fontSize="5.5" fontWeight="600">{stage.label}</text>
          </g>
        );
      })}

      {/* Protocol details cards */}
      {[
        { label: "Species", value: "C57BL/6", color: "#3b82f6" },
        { label: "Survival", value: "Yes", color: "#22c55e" },
        { label: "PI", value: "Dr. Kim", color: "#8b5cf6" },
        { label: "Personnel", value: "4", color: "#f59e0b" },
      ].map((detail, i) => (
        <motion.g key={i}
          animate={{ y: hovered ? [0, -2, 0] : 0 }}
          transition={{ duration: 1.5, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}>
          <rect x={18 + i * 47} y={82} width={43} height={28} rx={6} fill="white" stroke="#e2e8f0" strokeWidth={0.8} />
          <rect x={18 + i * 47} y={82} width={43} height={3} rx={6} fill={detail.color} opacity={0.4} />
          <text x={39 + i * 47} y={96} textAnchor="middle" fill="#94a3b8" fontSize="5">{detail.label}</text>
          <text x={39 + i * 47} y={106} textAnchor="middle" fill="#334155" fontSize="7" fontWeight="700">{detail.value}</text>
        </motion.g>
      ))}

      {/* Amendment history */}
      <rect x={18} y={116} width={184} height={18} rx={5} fill="#f8fafc" stroke="#f1f5f9" strokeWidth={0.8} />
      <text x={28} y={128} fill="#94a3b8" fontSize="5">Last amended:</text>
      <text x={82} y={128} fill="#334155" fontSize="5" fontWeight="600">Feb 28, 2026</text>
      <text x={140} y={128} fill="#94a3b8" fontSize="5">Version:</text>
      <text x={168} y={128} fill="#334155" fontSize="5" fontWeight="600">v3.2</text>
    </svg>
  );
}

function OvercrowdingIllustration({ hovered }: { hovered: boolean }) {
  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" role="img" aria-label="Room capacity monitoring with overcrowding alerts">
      <defs>
        <filter id="oc-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Main frame */}
      <rect x="10" y="8" width="200" height="134" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#oc-shadow)" />
      <rect x="10" y="8" width="200" height="24" rx={10} fill="#f8fafc" />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#f1f5f9" strokeWidth={1} />
      <circle cx="24" cy="20" r={3.5} fill="#fca5a5" opacity={0.8} />
      <circle cx="34" cy="20" r={3.5} fill="#fde68a" opacity={0.8} />
      <circle cx="44" cy="20" r={3.5} fill="#86efac" opacity={0.8} />
      <text x="62" y="23" fill="#64748b" fontSize="7.5" fontWeight="700">Capacity Monitor</text>

      {/* Alert counter */}
      <motion.g animate={{ scale: hovered ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
        style={{ transformOrigin: "190px 20px" }}>
        <circle cx={190} cy={20} r={8} fill="#ef4444" />
        <text x={190} y={23} textAnchor="middle" fill="white" fontSize="7" fontWeight="700">2</text>
      </motion.g>

      {/* Room cards */}
      {[
        { x: 18, y: 38, label: "Room A1", count: "12", max: "15", ok: true },
        { x: 112, y: 38, label: "Room B3", count: "18", max: "15", ok: false },
        { x: 18, y: 88, label: "Room C2", count: "10", max: "15", ok: true },
        { x: 112, y: 88, label: "Room D1", count: "16", max: "15", ok: false },
      ].map((room, i) => {
        const pct = (parseInt(room.count) / parseInt(room.max)) * 100;
        const barW = Math.min(pct, 120) * 0.68;
        return (
          <motion.g key={i}>
            <rect x={room.x} y={room.y} width={88} height={42} rx={8}
              fill={room.ok ? "white" : "#fef2f2"}
              stroke={room.ok ? "#e2e8f0" : "#fecaca"} strokeWidth={1.2} />

            {/* Pulse glow for alerts */}
            {!room.ok && (
              <motion.rect x={room.x} y={room.y} width={88} height={42} rx={8}
                fill="#ef4444" opacity={0}
                animate={{ opacity: hovered ? [0, 0.05, 0] : 0 }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: hovered ? Infinity : 0 }} />
            )}

            {/* Header row */}
            <text x={room.x + 8} y={room.y + 13} fill="#334155" fontSize="6.5" fontWeight="700">{room.label}</text>

            {/* Status badge */}
            {!room.ok ? (
              <motion.g animate={{ opacity: hovered ? [0.5, 1, 0.5] : 0.6 }}
                transition={{ duration: 1, delay: i * 0.15, repeat: hovered ? Infinity : 0 }}>
                <rect x={room.x + 52} y={room.y + 4} width={30} height={12} rx={6} fill="#fef2f2" stroke="#fca5a5" strokeWidth={0.8} />
                <text x={room.x + 67} y={room.y + 13} textAnchor="middle" fill="#ef4444" fontSize="5" fontWeight="700">ALERT</text>
              </motion.g>
            ) : (
              <g>
                <circle cx={room.x + 76} cy={room.y + 10} r={5} fill="#dcfce7" stroke="#86efac" strokeWidth={0.8} />
                <path d={`M${room.x + 73.5},${room.y + 10} l2,2 l3.5,-4`} stroke="#22c55e" strokeWidth={1.2} strokeLinecap="round" />
              </g>
            )}

            {/* Cage count */}
            <text x={room.x + 8} y={room.y + 27} fill={room.ok ? "#334155" : "#ef4444"} fontSize="10" fontWeight="800">
              {room.count}
            </text>
            <text x={room.x + 8 + (room.count.length > 1 ? 16 : 10)} y={room.y + 27} fill="#94a3b8" fontSize="7" fontWeight="500">
              /{room.max}
            </text>

            {/* Capacity bar */}
            <rect x={room.x + 6} y={room.y + 32} width={76} height={4} rx={2} fill="#f1f5f9" />
            <motion.rect x={room.x + 6} y={room.y + 32} height={4} rx={2}
              fill={room.ok ? "#22c55e" : "#ef4444"} opacity={0.7}
              initial={{ width: 0 }}
              animate={{ width: barW, opacity: hovered ? [0.7, 0.95, 0.7] : 0.7 }}
              transition={{ duration: 1, delay: i * 0.1, repeat: hovered ? Infinity : 0 }} />
          </motion.g>
        );
      })}
    </svg>
  );
}

function AnalyticsIllustration({ hovered }: { hovered: boolean }) {
  const bars = [
    { h: 30, color: "#3b82f6" },
    { h: 48, color: "#3b82f6" },
    { h: 38, color: "#3b82f6" },
    { h: 62, color: "#22c55e" },
    { h: 52, color: "#3b82f6" },
    { h: 72, color: "#22c55e" },
    { h: 58, color: "#3b82f6" },
    { h: 68, color: "#22c55e" },
  ];

  return (
    <svg viewBox="0 0 220 150" className="h-full w-full" role="img" aria-label="Performance analytics with bar chart and trend line">
      <defs>
        <filter id="an-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
        <linearGradient id="trend-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {/* Main frame */}
      <rect x="10" y="8" width="200" height="134" rx={10} fill="white" stroke="#e2e8f0" strokeWidth={1.5} filter="url(#an-shadow)" />
      <rect x="10" y="8" width="200" height="24" rx={10} fill="#f8fafc" />
      <line x1="10" y1="32" x2="210" y2="32" stroke="#f1f5f9" strokeWidth={1} />
      <circle cx="24" cy="20" r={3.5} fill="#fca5a5" opacity={0.8} />
      <circle cx="34" cy="20" r={3.5} fill="#fde68a" opacity={0.8} />
      <circle cx="44" cy="20" r={3.5} fill="#86efac" opacity={0.8} />
      <text x="62" y="23" fill="#64748b" fontSize="7.5" fontWeight="700">Performance</text>

      {/* Growth badge */}
      <motion.rect x={155} y={14} width={46} height={12} rx={6} fill="#f0fdf4" stroke="#86efac" strokeWidth={0.8}
        animate={{ opacity: hovered ? [0.7, 1, 0.7] : 0.8 }}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }} />
      <text x={178} y={23} textAnchor="middle" fill="#16a34a" fontSize="6" fontWeight="700">↑ 24%</text>

      {/* KPI row */}
      {[
        { label: "Completion", value: "94%", color: "#22c55e" },
        { label: "Efficiency", value: "87%", color: "#3b82f6" },
        { label: "On-Time", value: "91%", color: "#8b5cf6" },
      ].map((kpi, i) => (
        <g key={i}>
          <rect x={18 + i * 64} y={36} width={56} height={22} rx={5} fill="#f8fafc" stroke="#f1f5f9" strokeWidth={0.8} />
          <text x={46 + i * 64} y={46} textAnchor="middle" fill={kpi.color} fontSize="9" fontWeight="800">{kpi.value}</text>
          <text x={46 + i * 64} y={54} textAnchor="middle" fill="#94a3b8" fontSize="4.5">{kpi.label}</text>
        </g>
      ))}

      {/* Grid lines */}
      {[72, 87, 102, 117].map((y, i) => (
        <line key={i} x1="22" y1={y} x2="202" y2={y} stroke="#f8fafc" strokeWidth={0.8} />
      ))}

      {/* Bar chart */}
      {bars.map((bar, i) => (
        <motion.rect key={i}
          x={24 + i * 23} width={16} rx={3}
          fill={bar.color} opacity={0.65}
          initial={{ y: 130, height: 0 }}
          animate={{
            y: hovered ? 130 - bar.h : 130 - bar.h * 0.85,
            height: hovered ? bar.h : bar.h * 0.85,
            opacity: hovered ? [0.65, 0.9, 0.65] : 0.65,
          }}
          transition={{ duration: hovered ? 1.5 : 0.8, delay: i * 0.06, repeat: hovered ? Infinity : 0, repeatType: "reverse" }}
        />
      ))}

      {/* Trend line */}
      <motion.polyline
        points="32,108 55,92 78,98 101,76 124,82 147,66 170,72 193,60"
        fill="none" stroke="url(#trend-grad)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: hovered ? 1 : 0.7 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* Data points */}
      {[
        { x: 32, y: 108 }, { x: 55, y: 92 }, { x: 78, y: 98 }, { x: 101, y: 76 },
        { x: 124, y: 82 }, { x: 147, y: 66 }, { x: 170, y: 72 }, { x: 193, y: 60 },
      ].map((pt, i) => (
        <motion.circle key={i} cx={pt.x} cy={pt.y} r={3}
          fill="white" stroke="#3b82f6" strokeWidth={2}
          animate={{ r: hovered ? [3, 4, 3] : 3, opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 1.5, delay: i * 0.08, repeat: hovered ? Infinity : 0 }}
        />
      ))}
    </svg>
  );
}

/* ── Card Data ──────────────────────────────────────────── */

const featureCards = [
  {
    title: "Smart Task Scheduling",
    description: "Create task groups, set frequency modes, select rooms, and assign date ranges with automated overdue tracking.",
    Illustration: TaskSchedulingIllustration,
  },
  {
    title: "Health Observation Reports",
    description: "Log rack, cage, faculty, animal type, and disease data directly from task details. Includes litter and deceased reports.",
    Illustration: HealthObservationIllustration,
  },
  {
    title: "Rack & Cage Inventory",
    description: "Manage racks with manufacturer, type, and capacity data. Track cage inventory and buffer management.",
    Illustration: InventoryIllustration,
  },
  {
    title: "Protocol Management",
    description: "Full protocol lifecycle, from faculty invitation to director approval. Track species, survival status, and personnel.",
    Illustration: ProtocolIllustration,
  },
  {
    title: "Overcrowding Alerts",
    description: "Automatic detection of overcrowded cages across all rooms with pending and resolved counts.",
    Illustration: OvercrowdingIllustration,
  },
  {
    title: "Performance Analytics",
    description: "Completion rates, efficiency scores, and room-level progress tracking to optimize operations.",
    Illustration: AnalyticsIllustration,
  },
];

/* ── Card Component ────────────────────────────────────── */

function FeatureCard({
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

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative bg-[#f8fafc] py-24 md:py-32 overflow-hidden bg-mesh">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl animate-orb" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-40 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl animate-orb-slow" aria-hidden="true" />
      <Container>
        <SectionHeader
          overline="The Vivgram Platform"
          heading="Everything You Need, Nothing You Don't"
          subtext="Purpose-built tools for every aspect of animal research facility management."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
