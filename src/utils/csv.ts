export function parseCsvLoose(csv: string): string[][] {
  // Simple, resilient parser: splits lines, respects quotes for basic cases.
  // Good enough for ISS Research Explorer CSV.
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    const next = csv[i + 1];

    if (c === '"' && inQuotes && next === '"') {
      field += '"'; i++; // escaped quote
    } else if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      row.push(field.trim()); field = "";
    } else if ((c === "\n" || c === "\r") && !inQuotes) {
      if (field.length || row.length) { row.push(field.trim()); rows.push(row); }
      row = []; field = "";
      if (c === "\r" && next === "\n") i++; // handle CRLF
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field.trim()); rows.push(row); }
  return rows;
}
