import { useEffect, useRef } from "react";

type Milestone = {
  year: string;
  title: string;
  body: string;
  emoji?: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "1969",
    title: "Moon Landing",
    body:
      "Humanity proves what's possible beyond Earth — a catalyst for a century of orbital infrastructure.",
    emoji: "🌕",
  },
  {
    year: "1998",
    title: "International Space Station",
    body:
      "ISS becomes a permanent laboratory in orbit and a symbol of international cooperation.",
    emoji: "🛰️",
  },
  {
    year: "2010s",
    title: "10× Drop in Launch Costs",
    body:
      "Commercial launch innovation turns access to orbit from rare to routine — enabling new markets.",
    emoji: "🚀",
  },
  {
    year: "2030",
    title: "ISS End of Life (planned)",
    body:
      "A strategic handover: from a single station to a marketplace of private orbital platforms.",
    emoji: "🧭",
  },
  {
    year: "2025 →",
    title: "Astronova",
    body:
      "Decision intelligence for the commercial LEO economy: ROI modeling, sustainability scoring, policy navigation, and investor matching.",
    emoji: "✨",
  },
];

export default function Timeline() {
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // intersection observer to add 'in-view' class
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 }
    );

    itemsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">From Exploration to Economy</h2>
      <p className="mt-3 max-w-3xl text-slate-300">
        A brief history of how we arrived here — and why the next chapter needs decision intelligence.
      </p>

      {/* timeline */}
      <ol className="relative mt-10 border-l border-white/10 md:mt-12">
        {MILESTONES.map((m, i) => (
          <li
            key={m.year + i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="mb-10 translate-y-6 opacity-0 transition-all duration-700 will-change-transform last:mb-0"
          >
            {/* dot */}
            <span
              aria-hidden="true"
              className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-400 shadow-[0_0_0_3px_rgba(2,6,23,0.8)]"
            />

            <div className="ml-8 rounded-2xl bg-slate-900/70 p-5 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {m.year}
                </span>
                {m.emoji && <span className="text-lg" aria-hidden="true">{m.emoji}</span>}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-white">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{m.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* small helper style: when .in-view is set by IO, fade & slide up */}
      <style>{`
        li.in-view { opacity: 1; transform: translateY(0); }
      `}</style>
    </section>
  );
}
