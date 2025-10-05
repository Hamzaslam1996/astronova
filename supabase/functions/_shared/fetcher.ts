import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

export interface FetchOptions {
  timeoutMs?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface FetchResult<T> {
  data: T | null;
  error: string | null;
  statusCode: number;
  durationMs: number;
  ok: boolean;
}

/**
 * Production-grade fetch with timeout, retries, and exponential backoff
 */
export async function safeFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  const { timeoutMs = 8000, retries = 2, headers = {} } = options;
  const startTime = Date.now();
  
  let lastError: string | null = null;
  let statusCode = 0;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Add exponential backoff for retries
      if (attempt > 0) {
        const backoffMs = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, backoffMs));
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Astronova/1.0',
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      statusCode = response.status;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let data: T;

      // Auto-detect JSON or CSV
      if (contentType.includes('application/json')) {
        data = await response.json() as T;
      } else if (contentType.includes('text/csv')) {
        const text = await response.text();
        data = text as T;
      } else {
        // Default to JSON parsing
        try {
          data = await response.json() as T;
        } catch {
          const text = await response.text();
          data = text as T;
        }
      }

      const durationMs = Date.now() - startTime;

      return {
        data,
        error: null,
        statusCode,
        durationMs,
        ok: true,
      };
    } catch (error: any) {
      lastError = error.message || 'Unknown error';
      
      // Don't retry on client errors (4xx)
      if (statusCode >= 400 && statusCode < 500) {
        break;
      }
      
      // Continue to next retry
      if (attempt < retries) {
        console.log(JSON.stringify({
          level: 'warn',
          message: 'Fetch attempt failed, retrying',
          attempt: attempt + 1,
          maxRetries: retries,
          error: lastError,
          url,
        }));
      }
    }
  }

  const durationMs = Date.now() - startTime;

  return {
    data: null,
    error: lastError,
    statusCode,
    durationMs,
    ok: false,
  };
}

/**
 * Validate data against Zod schema with helpful error messages
 */
export function validateSchema<T>(data: unknown, schema: z.ZodType<T>): T {
  try {
    return schema.parse(data);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      throw new Error(`Schema validation failed: ${messages.join(', ')}`);
    }
    throw error;
  }
}

/**
 * Structured logging helper
 */
export function log(level: 'info' | 'warn' | 'error', message: string, meta: Record<string, any> = {}) {
  console.log(JSON.stringify({
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  }));
}
