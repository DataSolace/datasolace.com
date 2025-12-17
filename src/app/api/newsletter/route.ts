import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { defaultRateLimit } from '../../../lib/rateLimit';

interface NewsletterSubscriptionData {
  email: string;
  newsletterId?: string; // Optional: if you have multiple newsletters
}

export async function POST(request: NextRequest) {
  try {
    // Get Cloudflare context for KV access (rate limiting)
    const cfContext = getCloudflareContext();
    const kv = cfContext?.env?.RATE_LIMIT_KV;
    
    // Get Kit.com API key from environment variables (set as Cloudflare secret)
    // In Cloudflare Workers, secrets are accessed via process.env
    const kitApiKey = process.env.KIT_API_KEY;
    const kitWebhookUrl = process.env.KIT_WEBHOOK_URL;
    
    if (!kitApiKey || !kitWebhookUrl) {
      console.error('Kit.com API key or webhook URL not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    // Rate limiting check
    if (kv) {
      const identifier = defaultRateLimit.getIdentifierFromRequest(request);
      const rateLimitResult = await defaultRateLimit.checkLimit(identifier, kv);
      if (!rateLimitResult.success) {
        const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
        return NextResponse.json(
          {
            error: 'Too many requests. Please try again later.',
            retryAfter,
            resetTime: rateLimitResult.resetTime
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
              'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
            }
          }
        );
      }
    }

    const body: NewsletterSubscriptionData = await request.json();
    
    // Validate email
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Call Kit.com webhook/API
    // Adjust the request format based on Kit.com's API requirements
    const kitResponse = await fetch(kitWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${kitApiKey}`, // Adjust based on Kit.com's auth method
        // Or might be: 'X-API-Key': kitApiKey
      },
      body: JSON.stringify({
        email: body.email,
        newsletter_id: body.newsletterId || 'smart-home-index', // Default newsletter ID
        // Add any other required fields based on Kit.com's API
      }),
    });

    if (!kitResponse.ok) {
      const errorText = await kitResponse.text();
      console.error('Kit.com API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }

    const kitData = await kitResponse.json();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        data: kitData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

