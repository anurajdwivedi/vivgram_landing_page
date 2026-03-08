import Link from "next/link";
import { footerColumns } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-sm bg-primary-500" />
              <span className="text-xl font-bold text-white">Vivgram</span>
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
            &copy; {new Date().getFullYear()} Vivgram. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Powered by{" "}
            <span className="font-medium text-slate-300">Team iTek</span>
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
