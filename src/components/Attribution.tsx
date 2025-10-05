import React from "react";

type Props = { lines: string[] };

export default function Attribution({ lines }: Props) {
  return (
    <div className="mt-3 text-[11px] leading-snug text-slate-400">
      {lines.map((l) => <div key={l}>© {l}</div>)}
      <div className="italic">Usage for demo/educational purposes; no warranty.</div>
    </div>
  );
}
