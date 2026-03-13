"use client";

import Link from "next/link";
import Image from "next/image";
import { footerColumns } from "@/lib/constants";
import { useBrand } from "@/lib/brand-context";

export default function Footer() {
  const { brand } = useBrand();
  return (
    <footer className="bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt={`${brand} logo`}
                width={36}
                height={35}
                className="brightness-0 invert"
              />
              <span className="text-xl font-bold text-white">{brand}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              The command center for modern research operations.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Powered by{" "}
            <a href="https://teamitekllc.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-300 hover:text-white transition-colors">Team iTek</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
