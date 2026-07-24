type RateLimitEntry = {
  count: number;
  resetTime: number;
};

const store = new Map<string, RateLimitEntry>();

// Cleanup expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetTime) {
        store.delete(key);
      }
    }
  }, 60000);
}

export type RateLimitConfig = {
  limit: number; // max allowed requests
  windowMs: number; // time window in milliseconds
};

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
};

/**
 * Sliding window rate limiter to defend API routes against brute-force attacks and DDoS.
 */
export function checkRateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetTime) {
    store.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetMs: config.windowMs,
    };
  }

  if (entry.count >= config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      resetMs: Math.max(0, entry.resetTime - now),
    };
  }

  entry.count += 1;
  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    resetMs: Math.max(0, entry.resetTime - now),
  };
}

export const AUTH_RATE_LIMIT_CONFIG: RateLimitConfig = {
  limit: 5, // 5 login/register attempts
  windowMs: 15 * 60 * 1000, // per 15 minutes
};

export const API_RATE_LIMIT_CONFIG: RateLimitConfig = {
  limit: 100, // 100 requests
  windowMs: 60 * 1000, // per minute
};
