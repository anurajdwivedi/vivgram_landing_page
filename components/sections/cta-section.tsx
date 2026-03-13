"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Container } from "@/components/shared/container";
import { useBrand } from "@/lib/brand-context";

type CubicBezier = [number, number, number, number];
const ease: CubicBezier = [0.22, 1, 0.36, 1];

interface FormData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  organization: string;
  email: string;
  phone: string;
  comment: string;
  consent: boolean;
}

export default function CTASection() {
  const { brand } = useBrand();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    console.log("Form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-[#082B63] via-[#0D4297] to-[#082B63] py-24 md:py-32"
    >
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-400/8 blur-3xl animate-orb" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/3 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-400/6 blur-3xl animate-orb-slow" aria-hidden="true" />
      <div className="pointer-events-none absolute right-1/3 bottom-1/3 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl animate-orb" aria-hidden="true" />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16"
        >
          {/* Left — Copy */}
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-200 backdrop-blur-sm">
              Get Started
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Ready to Transform Your Facility Operations?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-blue-100/90">
              Join research institutions that have already cut administrative
              time in half while staying 100% audit-ready.
            </p>

            <div className="mt-10 space-y-4">
              {[
                `Personalized demo of ${brand}`,
                "Expert consultation on your workflow",
                "No commitment required",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm text-blue-100/90">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-lg md:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[400px] flex-col items-center justify-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Thank you!</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-blue-100/90">
                  We&apos;ve received your request. Our team will reach out
                  within 24 hours to schedule your personalized demo.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-200/60">
                      First name <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      {...register("firstName", { required: "First name is required" })}
                      aria-required="true"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p id="firstName-error" role="alert" className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-200/60">
                      Last name <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      {...register("lastName", { required: "Last name is required" })}
                      aria-required="true"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p id="lastName-error" role="alert" className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-200/60">
                      Job title <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      {...register("jobTitle", { required: "Job title is required" })}
                      aria-required="true"
                      aria-invalid={!!errors.jobTitle}
                      aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30"
                      placeholder="Research Director"
                    />
                    {errors.jobTitle && (
                      <p id="jobTitle-error" role="alert" className="mt-1 text-xs text-red-400">{errors.jobTitle.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-200/60">
                      Organization <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      {...register("organization", { required: "Organization is required" })}
                      aria-required="true"
                      aria-invalid={!!errors.organization}
                      aria-describedby={errors.organization ? "organization-error" : undefined}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30"
                      placeholder="University / Institution"
                    />
                    {errors.organization && (
                      <p id="organization-error" role="alert" className="mt-1 text-xs text-red-400">{errors.organization.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-200/60">
                      Email <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30"
                      placeholder="john@institution.edu"
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-200/60">
                      Phone <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone", { required: "Phone is required" })}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30"
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                      <p id="phone-error" role="alert" className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-blue-200/60">
                    Comment or question
                  </label>
                  <textarea
                    {...register("comment")}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30"
                    placeholder="Tell us about your research operations challenges..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    id="consent"
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-blue-500"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs leading-relaxed text-blue-200/50"
                  >
                    Yes, I want {brand} to keep me up-to-date with recent
                    industry developments including insights, upcoming events,
                    and innovative solution capabilities according to the{" "}
                    <a href="/privacy-policy" className="text-blue-300/70 underline underline-offset-2 hover:text-blue-200">
                      privacy policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-[1.01] hover:bg-blue-50 disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
