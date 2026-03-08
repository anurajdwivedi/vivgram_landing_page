"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { benefits } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="bg-slate-50/70 py-24 md:py-32">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <SectionHeader
            overline="WHY VIVGRAM"
            heading="Built for Modern Research Facilities"
            subtext="Vivgram eliminates the complexity of managing research operations, giving your team more time to focus on what matters most: advancing groundbreaking research."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <Icon className="h-6 w-6 text-[#0D4297]" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#0F172A]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
