// scripts/sortAndNormalize.ts
// Dependency-free CSV normalizer for Lovable (Node/TS).
// Assumptions: CSVs are UTF-8, comma-separated, headers in first row,
// fields don't contain embedded line breaks; quoted commas handled minimally.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIR  = path.join(ROOT, "data", "processed");

// ---------- small CSV helpers (no deps) ----------
type Row = Record<string, string>;

function parseCsv(text: string): Row[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n").filter(l => l.trim() !== "");
  if (lines.length === 0) return [];
  const headers = splitCsvLine(lines[0]);
  const rows: Row[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    const r: Row = {};
    headers.forEach((h, idx) => { r[h] = (cols[idx] ?? "").trim(); });
    rows.push(r);
  }
  return rows;
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (q && line[i+1] === '"') { cur += '"'; i++; }
      else { q = !q; }
    } else if (c === ',' && !q) {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

function toCsv(rows: Row[], order?: string[]): string {
  if (rows.length === 0) return "";
  const cols = order && order.length ? order : Object.keys(rows[0]);
  const head = cols.join(",");
  const body = rows.map(r => cols.map(c => csvCell(r[c] ?? "")).join(",")).join("\n");
  return head + "\n" + body + "\n";
}

function csvCell(v: string): string {
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

// ---------- generic utils ----------
function load(file: string): { rows: Row[], path: string } | null {
  const p = path.join(DIR, file);
  if (!fs.existsSync(p)) { console.warn(`⚠️  ${file} not found, skipping`); return null; }
  const txt = fs.readFileSync(p, "utf8");
  const rows = parseCsv(txt);
  console.log(`→ loaded ${file}: ${rows.length} rows`);
  return { rows, path: p };
}

function save(file: string, rows: Row[], sortCols: string[]) {
  // put sortCols first for stable column order
  const colSet = new Set<string>(); rows.forEach(r => Object.keys(r).forEach(k => colSet.add(k)));
  const all = Array.from(colSet);
  const order = [...sortCols.filter(c => all.includes(c)), ...all.filter(c => !sortCols.includes(c))];
  const out = toCsv(rows, order);
  fs.writeFileSync(path.join(DIR, file), out, "utf8");
  console.log(`✓ saved ${file} rows=${rows.length} sorted by ${JSON.stringify(sortCols)}`);
}

function dedupe(rows: Row[], keys: string[]): Row[] {
  if (!keys.length) return rows;
  const seen = new Set<string>(), out: Row[] = [];
  for (const r of rows) {
    const k = keys.map(k => r[k] ?? "").join("::");
    if (seen.has(k)) continue;
    seen.add(k); out.push(r);
  }
  return out;
}

function num(v: string, decimals?: number): string {
  const n = Number(v);
  if (isNaN(n)) return "";
  return decimals != null ? n.toFixed(decimals) : String(n);
}

function toNumber(r: Row, k: string, decimals?: number) {
  r[k] = num(r[k] ?? "", decimals);
  if (r[k] === "") delete r[k];
}

function sortBy(rows: Row[], keys: string[], numeric: Record<string,boolean> = {}, dateKeys: string[] = []) {
  return [...rows].sort((a,b) => {
    for (const k of keys) {
      const av = a[k] ?? "", bv = b[k] ?? "";
      if (dateKeys.includes(k)) {
        const ad = Date.parse(av) || 0, bd = Date.parse(bv) || 0;
        if (ad !== bd) return ad - bd; continue;
      }
      if (numeric[k]) {
        const an = Number(av), bn = Number(bv);
        if (an !== bn) return (isNaN(an)?0:an) - (isNaN(bn)?0:bn); continue;
      }
      if (av !== bv) return av.localeCompare(bv);
    }
    return 0;
  });
}

// ---------- normalizers per file ----------
function normalizeAssets(){
  const file = "leo_asset_registry.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows) {
    toNumber(r,"norad_id"); toNumber(r,"altitude_km",0); toNumber(r,"inclination_deg",2);
    if (!r["status"]) r["status"]="active";
  }
  rows = rows.filter(r=>r["norad_id"] && r["name"]);
  rows = dedupe(rows,["norad_id","name"]);
  rows = sortBy(rows,["altitude_km","inclination_deg","norad_id"],{altitude_km:true,inclination_deg:true,norad_id:true});
  save(file,rows,["altitude_km","inclination_deg","norad_id"]);
}

function normalizeLaunches(){
  const file = "upcoming_launches.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows) if (r["date_utc"]) r["date_utc"] = new Date(r["date_utc"]).toISOString();
  for (const r of rows) toNumber(r,"mass_kg");
  rows = rows.filter(r=>r["provider"] && r["vehicle"] && r["date_utc"]);
  rows = dedupe(rows,["launch_id"]);
  rows = sortBy(rows,["date_utc"],{},["date_utc"]);
  save(file,rows,["date_utc","provider","vehicle"]);
}

function normalizeMicrog(){
  const file="microgravity_projects.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows) toNumber(r,"start_year");
  rows = rows.filter(r=>r["title"]);
  rows = dedupe(rows,["project_id","title"]);
  rows = sortBy(rows,["start_year","domain","project_id"],{start_year:true});
  save(file,rows,["start_year","domain","project_id"]);
}

function normalizeListings(){
  const file="marketplace_listings.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows){ toNumber(r,"price_usd"); toNumber(r,"lead_time_weeks"); }
  rows = rows.filter(r=>r["sku_id"] && r["name"]);
  rows = dedupe(rows,["sku_id"]);
  rows = sortBy(rows,["availability_qtr","type","price_usd"],{price_usd:true});
  save(file,rows,["availability_qtr","type","price_usd"]);
}

function normalizeBenchmarks(){
  const file="price_benchmarks.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows){ toNumber(r,"low_estimate"); toNumber(r,"high_estimate"); }
  for (const r of rows){
    const lo = Number(r["low_estimate"] ?? "0"), hi = Number(r["high_estimate"] ?? "0");
    r["avg_price"] = String(((isNaN(lo)?0:lo)+(isNaN(hi)?0:hi))/2);
  }
  rows = rows.filter(r=>r["service_type"]);
  rows = dedupe(rows,["service_type","citation"]);
  rows = sortBy(rows,["service_type","avg_price"],{avg_price:true});
  save(file,rows,["service_type","avg_price"]);
}

function normalizeProviders(){
  const file="service_providers.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows) if (r["category"]) r["category"]=r["category"].toLowerCase().trim();
  rows = rows.filter(r=>r["name"] && r["url"]);
  rows = dedupe(rows,["name"]);
  rows = sortBy(rows,["category","name"]);
  save(file,rows,["category","name"]);
}

function normalizeMarket(){
  const file="leo_market_context.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows){ toNumber(r,"value"); toNumber(r,"year"); }
  rows = rows.filter(r=>r["metric"] && r["value"]);
  rows = sortBy(rows,["year","metric"],{year:true});
  save(file,rows,["year","metric"]);
}

function normalizeRisk(){
  const file="sustainability_risk_index.csv";
  const d = load(file); if (!d) return;
  let rows = d.rows;
  for (const r of rows){
    toNumber(r,"objects_in_band"); toNumber(r,"bandwidth_km");
    toNumber(r,"object_density_index",4); toNumber(r,"risk_score",0);
  }
  rows = rows.filter(r=>r["altitude_band_km"]);
  rows = dedupe(rows,["altitude_band_km"]);
  rows = sortBy(rows,["risk_score","altitude_band_km"],{risk_score:true});
  save(file,rows,["risk_score","altitude_band_km"]);
}

function main(){
  console.log("Sorting & normalizing (TS, no deps) …");
  normalizeAssets();
  normalizeLaunches();
  normalizeMicrog();
  normalizeListings();
  normalizeBenchmarks();
  normalizeProviders();
  normalizeMarket();
  normalizeRisk();
  console.log("Done.");
}
main();
