# Rate Limiting Implementation

This project implements rate limiting for the contact form API to prevent spam and abuse while staying within Cloudflare's free tier limits.

## Configuration

### Rate Limits
- **Requests per window**: 5 submissions
- **Window duration**: 15 minutes
- **Storage**: Cloudflare KV (Key-Value) store

### Files Modified
- `src/lib/rateLimit.ts` - Rate limiting utility class
- `src/app/api/contact/route.ts` - Updated API route with rate limiting
- `src/app/page.tsx` - Frontend error handling for rate limits
- `wrangler.jsonc` - KV namespace configuration
- `env.d.ts` - TypeScript types for KV binding

## How It Works

1. **Request Identification**: Each request is identified by the client's IP address using Cloudflare headers (`cf-connecting-ip`, `x-forwarded-for`, etc.)

2. **Rate Check**: Before processing a contact form submission, the system checks if the client has exceeded the rate limit within the current time window.

3. **Storage**: Request timestamps are stored in Cloudflare KV with automatic expiration based on the window duration.

4. **Response**: If rate limited, the API returns a 429 status with retry information. If not rate limited, the request proceeds normally.

## Error Handling

### API Response (429 Rate Limited)
```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 900,
  "resetTime": 1640995200000
}
```

### Frontend Display
- Shows a yellow warning message when rate limited
- Displays retry time in minutes
- Prevents form submission during rate limit period

## Deployment

The rate limiting uses Cloudflare KV storage which is included in the free tier with generous limits:
- 100,000 read operations per day
- 1,000 write operations per day
- 1,000 delete operations per day

This should be more than sufficient for typical contact form usage.

## Monitoring

You can monitor KV usage in the Cloudflare dashboard under Workers > KV > Usage.

## Customization

To adjust rate limits, modify the configuration in `src/lib/rateLimit.ts`:

```typescript
export const defaultRateLimit = new RateLimiter({
  maxRequests: 5, // Change this number
  windowMs: 15 * 60 * 1000 // Change this duration (in milliseconds)
});
``` 