"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Vivgram and who is it built for?",
    answer:
      "Vivgram is a research operations and lifecycle management platform purpose-built for animal research facilities. It serves technicians, facility supervisors, operations managers, project coordinators, and faculty, giving each role a tailored dashboard and workflow.",
  },
  {
    question: "How does Vivgram handle task scheduling?",
    answer:
      "Vivgram lets you create task groups with customizable frequency modes, assign them to specific rooms and service areas, and set date ranges. Overdue tasks are automatically detected and flagged, ensuring nothing falls through the cracks.",
  },
  {
    question: "Can Vivgram integrate with our existing systems?",
    answer:
      "Vivgram is designed to work alongside your existing institutional infrastructure. Our team works with you during onboarding to ensure smooth data migration and setup. Contact us to discuss your specific integration needs.",
  },
  {
    question: "How does role-based access control work?",
    answer:
      "Every user is assigned a role (Technician, Supervisor, Manager, Coordinator, or Faculty) with granular permissions. Each role sees only the data and tools they are authorized to access, ensuring security and a focused experience.",
  },
  {
    question: "Is our data secure and compliant?",
    answer:
      "Absolutely. All data is encrypted at rest and in transit. Vivgram provides complete audit trails, automated compliance dashboards, and is hosted on secure cloud infrastructure with 99.9% uptime SLA and geographic redundancy.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "Most facilities are up and running within days. Our guided setup wizard helps you configure your facility structure, import existing data, invite team members, and start scheduling tasks right away.",
  },
  {
    question: "What kind of reports and analytics does Vivgram provide?",
    answer:
      "Vivgram offers health observation reports, disease trend charts, room-wise breakdowns, completion rates, efficiency scores, capacity utilization tracking, and compliance dashboards, all accessible in real time from your dashboard.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We offer personalized demos and pilot programs tailored to your facility. Request a demo through our contact form and our team will walk you through the platform and discuss the best plan for your needs.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  isLast,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
  index: number;
}) {
  return (
    <motion.div variants={fadeUp} className={isLast ? "" : "border-b border-slate-200/80"}>
      <button
        id={`faq-trigger-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <h3
          className={cn(
            "m-0 text-base font-semibold transition-colors duration-200 md:text-lg",
            isOpen ? "text-primary-700" : "text-slate-800"
          )}
        >
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-colors duration-200",
              isOpen ? "text-primary-600" : "text-slate-400"
            )}
          />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-slate-500">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Decorative orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl animate-orb" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-2/3 h-64 w-64 rounded-full bg-violet-100/25 blur-3xl animate-orb-slow" />
      <Container>
        <SectionHeader
          overline="FAQ"
          heading="Frequently Asked Questions"
          subtext="Everything you need to know about Vivgram and how it can transform your facility operations."
        />
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-3xl rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 px-8 py-2 shadow-lg shadow-slate-100/50"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isLast={i === faqs.length - 1}
              index={i}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
