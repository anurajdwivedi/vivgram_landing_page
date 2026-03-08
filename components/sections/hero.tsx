"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { socialMetrics } from "@/lib/constants";

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

/* ── Dashboard Screenshot Preview (bleeds right) ────────── */

function DashboardPreview() {
  return (
    <FadeUp delay={500} className="relative">
      {/* Glow behind */}
      <div className="absolute -inset-8 rounded-3xl bg-blue-400/10 blur-3xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-l-2xl border border-r-0 border-white/[0.12] bg-white shadow-[0_25px_80px_-12px_rgba(0,0,0,0.5)]">
        {/* Browser Chrome */}
        <div className="flex items-center gap-3 bg-slate-100 px-5 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <div className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1">
            <div className="mx-auto flex max-w-sm items-center justify-center gap-2 rounded-lg bg-white px-4 py-1.5 border border-slate-200">
              <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs text-slate-500">vivgram.com</span>
            </div>
          </div>
        </div>

        {/* Screenshot */}
        <Image
          src="/dashboard-preview.webp"
          alt="Vivgram dashboard showing task overview, compliance tracking, and performance metrics"
          width={1449}
          height={900}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="block w-full object-cover object-left-top"
          style={{ minHeight: 560 }}
          priority
        />
      </div>
    </FadeUp>
  );
}

/* ── Hero Section ───────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#082B63] via-[#0D4297] to-[#082B63]">
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-400/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" aria-hidden="true" />

      {/* Text content in container */}
      <div className="relative z-10 pt-24 md:pt-32">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left: Copy — stays within max-width */}
          <div className="mx-auto w-full max-w-7xl px-6 lg:w-[42%] lg:shrink-0 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-16">
            <FadeUp delay={100}>
              <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-200 backdrop-blur-sm">
                No More Spreadsheet Chaos
              </span>
            </FadeUp>

            <FadeUp delay={200}>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
                Stop Managing Your Facility in Spreadsheets
              </h1>
            </FadeUp>

            <FadeUp delay={300}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-blue-100/90 md:text-lg">
                Vivgram brings protocol management, daily observations, task
                scheduling, and compliance tracking into one intuitive platform
                — so your team can focus on the science.
              </p>
            </FadeUp>

            <FadeUp delay={400} className="mt-10 flex flex-col gap-4 sm:flex-row">
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
            </FadeUp>

            {/* Value props */}
            <FadeUp delay={500} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6">
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

          {/* Right: Dashboard — breaks out to the right edge */}
          <div className="mt-12 w-full lg:mt-0 lg:w-[58%] lg:flex-1">
            <div className="px-6 lg:pl-4 lg:pr-0">
              <DashboardPreview />
            </div>
          </div>
        </div>

        {/* Social metrics bar */}
        <Container>
          <FadeUp delay={700} className="mt-16 border-t border-white/10 pt-10 pb-12 md:mt-20">
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
