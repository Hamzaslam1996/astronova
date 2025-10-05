export default function PowerHero({
  primaryHref = "/prototype",
  secondaryHref = "/orbit-hub",
}: {
  primaryHref?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 text-white">
      <h2 className="text-2xl font-bold md:text-3xl">ROI Tools</h2>
      <p className="mt-2 text-neutral-300">
        Prototype modules to model return on investment for LEO ventures:
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-neutral-900/70 p-5 ring-1 ring-white/5">
          <h3 className="text-lg font-semibold">💸 Cost Estimator</h3>
          <p className="mt-1 text-sm text-neutral-300">
            Estimate launch + operations costs based on current market data.
          </p>
        </div>

        <div className="rounded-xl bg-neutral-900/70 p-5 ring-1 ring-white/5">
          <h3 className="text-lg font-semibold">📊 Revenue Forecast</h3>
          <p className="mt-1 text-sm text-neutral-300">
            Model revenue streams for research, manufacturing, or tourism.
          </p>
        </div>

        <div className="rounded-xl bg-neutral-900/70 p-5 ring-1 ring-white/5">
          <h3 className="text-lg font-semibold">🌱 Sustainability ROI</h3>
          <p className="mt-1 text-sm text-neutral-300">
            Balance profitability with debris mitigation and compliance costs.
          </p>
        </div>
      </div>
    </section>
  );
}
