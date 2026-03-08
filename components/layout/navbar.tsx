"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 py-4"
        aria-label="Main navigation"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-700 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                "text-xl font-bold leading-none transition-colors duration-300",
                scrolled ? "text-primary-700" : "text-white"
              )}
            >
              Vivgram
            </span>
            <span
              className={cn(
                "text-[9px] font-medium tracking-wide transition-colors duration-300",
                scrolled ? "text-slate-500" : "text-white/70"
              )}
            >
              Powered by Team iTek
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                scrolled
                  ? "text-slate-600 hover:text-primary-700"
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://staging.compmed.io/auth/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-sm font-medium transition-colors duration-300",
              scrolled
                ? "text-slate-600 hover:text-primary-700"
                : "text-white/80 hover:text-white"
            )}
          >
            Log In
          </a>
          <a
            href="#cta"
            className={cn(
              "rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
              scrolled
                ? "bg-primary-700 text-white hover:bg-primary-600 shadow-btn-primary"
                : "bg-white text-primary-700 hover:bg-blue-50"
            )}
          >
            Request a Demo
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <X
              className={cn(
                "h-6 w-6",
                scrolled ? "text-slate-700" : "text-white"
              )}
            />
          ) : (
            <Menu
              className={cn(
                "h-6 w-6",
                scrolled ? "text-slate-700" : "text-white"
              )}
            />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-slate-100" />
              <a
                href="https://staging.compmed.io/auth/sign-in"
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </a>
              <a
                href="#cta"
                className="mt-2 rounded-xl bg-primary-700 px-6 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Request a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
