"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getNavLinks } from "@/lib/constants";
import { useBrand, type BrandName } from "@/lib/brand-context";
import { cn } from "@/lib/utils";

const brands: { name: BrandName; href: string }[] = [
  { name: "Vivgram", href: "/" },
  { name: "MousApp", href: "/mousapp" },
];

export default function Navbar() {
  const { brand } = useBrand();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const navLinks = getNavLinks(brand);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close switcher on click outside
  useEffect(() => {
    if (!switcherOpen) return;
    const close = () => setSwitcherOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [switcherOpen]);

  return (
    <>
      {/* Brand switcher bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#061B3F] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-6 lg:px-8 py-1.5">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSwitcherOpen(!switcherOpen);
              }}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium text-white/80 hover:text-white transition-colors"
            >
              {brand}
              <ChevronDown className={cn("h-3 w-3 transition-transform", switcherOpen && "rotate-180")} />
            </button>
            {switcherOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-white/10 bg-[#0A2548] py-1 shadow-xl">
                {brands.map((b) => (
                  <Link
                    key={b.name}
                    href={b.href}
                    className={cn(
                      "block px-4 py-2 text-xs font-medium transition-colors",
                      b.name === brand
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                    onClick={() => setSwitcherOpen(false)}
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <header
        className={cn(
          "fixed top-[34px] left-0 right-0 z-50 transition-all duration-300",
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
          <Link href={pathname.startsWith("/mousapp") ? "/mousapp" : "/"} className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt={`${brand} logo`}
              width={36}
              height={35}
              className={cn(
                "transition-all duration-300",
                scrolled ? "" : "brightness-0 invert"
              )}
              priority
            />
            <div className="flex flex-col gap-0.5">
              <span
                className={cn(
                  "text-xl font-bold leading-none transition-colors duration-300",
                  scrolled ? "text-primary-700" : "text-white"
                )}
              >
                {brand}
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
                "rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                scrolled
                  ? "bg-primary-700 text-white hover:bg-primary-600 shadow-btn-primary opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              )}
            >
              Contact Us
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 top-0 z-40 bg-white md:hidden"
            >
              {/* Header area matching navbar height */}
              <div className="flex items-center justify-between px-6 py-4">
                <Link href={pathname.startsWith("/mousapp") ? "/mousapp" : "/"} className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt={`${brand} logo`}
                    width={36}
                    height={35}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xl font-bold leading-none text-primary-700">
                      {brand}
                    </span>
                    <span className="text-[9px] font-medium tracking-wide text-slate-500">
                      Powered by Team iTek
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-6 w-6 text-slate-700" />
                </button>
              </div>

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
                  Contact Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
