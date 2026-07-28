import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  createPayloadDocument,
  getClientIp,
  getUserAgent,
  hashIp,
  isValidEmail,
  normalizeEmail,
  normalizeText,
} from '../../../lib/payloadApi';

export const runtime = 'nodejs';

interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  newsletter?: boolean;
  message?: string;
  website?: string;
}

const MAX_BODY_LENGTH = 12_000;
const MAX_NAME_LENGTH = 120;
const MAX_PHONE_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 4_000;

async function persistContactSubmission(data: Record<string, unknown>) {
  return createPayloadDocument('contact-submissions', data);
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const ipHash = hashIp(getClientIp(request));
  const userAgent = getUserAgent(request);

  try {
    const contentLengthHeader = request.headers.get('content-length');
    if (contentLengthHeader) {
      const contentLength = Number.parseInt(contentLengthHeader, 10);
      if (Number.isFinite(contentLength) && contentLength > MAX_BODY_LENGTH) {
        await persistContactSubmission({
          requestId,
          status: 'invalid',
          email: 'unknown@example.invalid',
          message: 'Rejected contact submission: payload too large.',
          ipHash,
          userAgent,
          errorDetail: `content_length_${contentLength}`,
        });

        return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
      }
    }

    const rawBody = (await request.json().catch(() => null)) as ContactFormData | null;
    if (!rawBody || typeof rawBody !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const honeypot = normalizeText(rawBody.website, 200);
    const body = {
      firstName: normalizeText(rawBody.firstName, MAX_NAME_LENGTH),
      lastName: normalizeText(rawBody.lastName, MAX_NAME_LENGTH),
      email: normalizeEmail(rawBody.email),
      phone: normalizeText(rawBody.phone, MAX_PHONE_LENGTH),
      newsletter: Boolean(rawBody.newsletter),
      message: normalizeText(rawBody.message, MAX_MESSAGE_LENGTH),
    };

    if (honeypot) {
      await persistContactSubmission({
        requestId,
        status: 'blocked_honeypot',
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email || 'honeypot@example.invalid',
        phone: body.phone,
        newsletter: body.newsletter,
        message: body.message || 'Blocked honeypot contact submission.',
        ipHash,
        userAgent,
        errorDetail: `honeypot_field_populated:${honeypot.slice(0, 100)}`,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Contact form submitted successfully',
          id: requestId,
        },
        { status: 201 },
      );
    }

    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 },
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 },
      );
    }

    const result = await persistContactSubmission({
      requestId,
      status: 'new',
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || undefined,
      newsletter: body.newsletter,
      message: body.message,
      ipHash,
      userAgent,
      source: 'datasolace-public-app',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        id: result.id || requestId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 },
    );
  }
}
