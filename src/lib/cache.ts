type Entry = { at: number; ttl: number; data: unknown };
const store = new Map<string, Entry>();

export async function cached<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key);
  if (hit && now - hit.at < hit.ttl) return hit.data as T;

  try {
    const data = await loader();
    store.set(key, { at: now, ttl: ttlMs, data });
    return data;
  } catch (e) {
    if (hit) return hit.data as T; // serve stale on error (polite)
    throw e;
  }
}
