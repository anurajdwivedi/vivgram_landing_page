"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  overline: string;
  heading: string;
  subtext?: string;
  align?: "center" | "left";
  dark?: boolean;
}

export function SectionHeader({
  overline,
  heading,
  subtext,
  align = "center",
  dark = false,
}: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16",
        align === "center" && "mx-auto max-w-2xl text-center"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]",
          dark
            ? "bg-white/10 text-blue-200 border border-white/20 backdrop-blur-sm"
            : "bg-slate-100 text-slate-600 border border-slate-200/60"
        )}
      >
        {overline}
      </span>
      <h2
        className={cn(
          "mt-5 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-[#0F172A]"
        )}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed md:text-xl",
            dark ? "text-blue-200/80" : "text-slate-500"
          )}
        >
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
