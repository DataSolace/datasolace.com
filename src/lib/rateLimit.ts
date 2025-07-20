interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
}

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async checkLimit(
    identifier: string,
    kv: KVNamespace
  ): Promise<RateLimitResult> {
    try {
      const now = Date.now();
      const windowStart = now - this.config.windowMs;
      const key = `rate_limit:${identifier}`;

      // Get current requests from KV
      const currentData = await kv.get(key);
      let requests: number[] = [];

      if (currentData) {
        requests = JSON.parse(currentData);
      }

      // Filter out old requests outside the current window
      requests = requests.filter(timestamp => timestamp > windowStart);

      // Check if limit exceeded
      if (requests.length >= this.config.maxRequests) {
        const oldestRequest = Math.min(...requests);
        const resetTime = oldestRequest + this.config.windowMs;
        
        return {
          success: false,
          remaining: 0,
          resetTime,
          error: 'Rate limit exceeded'
        };
      }

      // Add current request
      requests.push(now);

      // Store updated requests (with expiration)
      const expirationTtl = Math.ceil(this.config.windowMs / 1000);
      await kv.put(key, JSON.stringify(requests), { expirationTtl });

      return {
        success: true,
        remaining: this.config.maxRequests - requests.length,
        resetTime: now + this.config.windowMs
      };
    } catch (error) {
      console.error('Rate limiting error:', error);
      // If rate limiting fails, allow the request to proceed
      return {
        success: true,
        remaining: this.config.maxRequests - 1,
        resetTime: Date.now() + this.config.windowMs
      };
    }
  }

  getIdentifierFromRequest(request: Request): string {
    // Try to get real IP from Cloudflare headers
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    const xForwardedFor = request.headers.get('x-forwarded-for');
    const xRealIp = request.headers.get('x-real-ip');
    
    // Use the first available IP header, fallback to a default
    return cfConnectingIp || xForwardedFor?.split(',')[0] || xRealIp || 'unknown';
  }
}

// Default rate limit configuration
export const defaultRateLimit = new RateLimiter({
  maxRequests: 5, // 5 requests per window
  windowMs: 15 * 60 * 1000 // 15 minutes
}); 