"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { workflowSteps } from "@/lib/constants";

export default function WorkflowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="workflow" className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeader
          overline="HOW IT WORKS"
          heading="From Onboarding to Full Operational Control"
          subtext="Get your facility running on Vivgram in days, not months. Our structured implementation ensures every team member is productive from day one."
        />

        {/* Desktop horizontal flow */}
        <div ref={ref} className="hidden lg:block">
          <div className="relative">
            {/* Connecting line between circles */}
            <div className="absolute left-[calc(8.33%+28px)] right-[calc(8.33%+28px)] top-7 h-px">
              <motion.div
                className="h-full bg-slate-200"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <div className="relative grid grid-cols-6 gap-6">
              {workflowSteps.map((step, i) => {
                const stepNumber = String(i + 1).padStart(2, "0");
                const isFirst = i === 0;

                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    }}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold ${
                        isFirst
                          ? "bg-[#0D4297] text-white"
                          : "border-2 border-slate-300 text-slate-400 bg-white"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <h3 className="mt-5 text-sm font-semibold text-[#0F172A]">
                      {step.label}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#64748B]">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical flow */}
        <div ref={ref} className="lg:hidden">
          <div className="relative ml-6 pl-10">
            {/* Left connecting line */}
            <div className="absolute left-0 top-0 bottom-0 w-px">
              <motion.div
                className="h-full w-full bg-slate-200"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                style={{ transformOrigin: "top" }}
              />
            </div>

            {workflowSteps.map((step, i) => {
              const stepNumber = String(i + 1).padStart(2, "0");
              const isFirst = i === 0;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  className="relative pb-10 last:pb-0"
                >
                  <div
                    className={`absolute -left-[calc(2.5rem+21px)] flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold ${
                      isFirst
                        ? "bg-[#0D4297] text-white"
                        : "border-2 border-slate-300 text-slate-400 bg-white"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
