"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
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

/* ── Hero Person Image with decorative background ────────── */

function HeroImage() {
  const { brand } = useBrand();
  return (
    <FadeUp delay={500} className="flex items-end justify-end">
      <Image
        src="/hero-person.png"
        alt={`Research professional confident in managing facility operations with ${brand}`}
        width={495}
        height={678}
        sizes="(max-width: 768px) 60vw, (max-width: 1024px) 45vw, 400px"
        className="w-[70%] md:w-[60%] lg:w-auto lg:h-[540px] xl:h-[600px] object-contain object-bottom"
        priority
      />
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
      <div className="relative z-10 pt-28 md:pt-36">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left: Copy — stays within max-width */}
          <div className="mx-auto w-full max-w-7xl px-6 lg:w-[50%] lg:shrink-0 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12">
            <FadeUp delay={100}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-200 backdrop-blur-sm">
                No More Spreadsheet Chaos
              </span>
            </FadeUp>

            <FadeUp delay={200}>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                Stop Managing Your Facility in Spreadsheets
              </h1>
            </FadeUp>

            <FadeUp delay={300}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-blue-100/90 md:text-lg">
                {brand} brings protocol management, daily observations, task
                scheduling, and compliance tracking into one intuitive platform
                — so your team can focus on the science.
              </p>
            </FadeUp>

            <FadeUp delay={400} className="mt-12">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-[1.02] hover:bg-blue-50"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </FadeUp>

            {/* Value props */}
            <FadeUp delay={500} className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-8">
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

          {/* Right: Person image */}
          <div className="mt-12 w-full lg:mt-0 lg:w-[45%] lg:flex-1 flex items-end justify-center">
            <HeroImage />
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
