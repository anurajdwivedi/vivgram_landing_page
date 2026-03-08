"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/shared/container";
import { institutionLogos, socialMetrics } from "@/lib/constants";

function CountUp({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

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
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  return (
    <section className="border-y border-slate-100 bg-white py-16">
      <Container>
        <p className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-slate-400">
          Trusted by leading research institutions
        </p>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {institutionLogos.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold text-slate-300 opacity-50 transition-opacity duration-300 hover:opacity-70"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
          {socialMetrics.map((metric, i) => (
            <div key={metric.label} className="flex items-center gap-8">
              {i > 0 && (
                <div className="hidden h-12 w-px bg-slate-200 sm:block" />
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`text-center ${i > 0 ? "sm:ml-8" : ""}`}
              >
                <div className="text-3xl font-bold text-primary-700 md:text-4xl">
                  <CountUp target={metric.value} suffix={metric.suffix} />
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {metric.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
