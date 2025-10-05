const UA = "Astronova-MVP/1.0 (+public demo; contact: your-email)";
const DEFAULT_TIMEOUT_MS = 10000;

export async function http<T>(url: string, init: RequestInit = {}): Promise<T> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Accept": init.headers?.["Accept"] ?? "application/json, text/csv;q=0.9",
        "Cache-Control": "no-cache",
        "X-Requested-With": "fetch",
        "User-Agent": UA, // some hosts log this
        ...(init.headers || {}),
      },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return (await res.json()) as T;
    return (await res.text()) as unknown as T;
  } finally {
    clearTimeout(id);
  }
}

export async function withFallback<T>(loader: () => Promise<T>, fallback: T): Promise<{ data: T; usedFallback: boolean }> {
  try {
    const data = await loader();
    return { data, usedFallback: false };
  } catch {
    return { data: fallback, usedFallback: true };
  }
}
