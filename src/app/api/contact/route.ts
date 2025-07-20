import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { defaultRateLimit } from '../../../lib/rateLimit';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  newsletter: boolean;
  message: string;
}

// CloudflareEnv is now properly generated in env.d.ts

export async function POST(request: NextRequest) {
  try {
    // Get Cloudflare context for database and KV access
    const cfContext = getCloudflareContext();
    const db = cfContext?.env?.DB;
    const kv = cfContext?.env?.RATE_LIMIT_KV;
    
    if (!db) {
      console.error('D1 database binding not found');
      return NextResponse.json(
        { error: 'Database not available' },
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

    const body: ContactFormData = await request.json();
    // Validate required fields
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Insert the contact form submission into the database
    const result = await db.prepare(`
      INSERT INTO contact_submissions (
        first_name, 
        last_name, 
        email, 
        phone, 
        newsletter, 
        message, 
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      body.firstName || '',
      body.lastName || '',
      body.email,
      body.phone || null,
      body.newsletter || false,
      body.message,
      new Date().toISOString()
    ).run();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: result.meta.last_row_id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 