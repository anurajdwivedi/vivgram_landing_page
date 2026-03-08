import { marqueeItems } from "@/lib/constants";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="marquee-gradient border-y border-indigo-100/40 py-5 overflow-hidden">
      <div className="animate-marquee flex w-max">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            {i > 0 && (
              <span className="mx-5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
            )}
            <span className="text-sm font-semibold bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 bg-clip-text text-transparent whitespace-nowrap">
              {item}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
