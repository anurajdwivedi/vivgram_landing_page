"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useBrand } from "@/lib/brand-context";

export default function MidCTA() {
  const { brand } = useBrand();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#082B63] via-[#0D4297] to-[#082B63] py-16 md:py-20">
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-blue-400/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-violet-400/6 blur-3xl" aria-hidden="true" />
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"
        >
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Ready to see {brand} in action?
            </h2>
            <p className="mt-2 text-base text-blue-100/90">
              Join our early access program and be among the first to transform your facility operations.
            </p>
          </div>
          <a
            href="#cta"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-[1.02] hover:bg-blue-50"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
