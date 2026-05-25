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

interface NewsletterSubscriptionData {
  email?: string;
  newsletterId?: string;
  website?: string;
}

async function logNewsletterEvent(data: Record<string, unknown>) {
  return createPayloadDocument('newsletter-events', data);
}

async function readKitResponse(response: Response): Promise<{ text: string; json?: unknown; id?: string }> {
  const text = await response.text().catch(() => '');
  if (!text) {
    return { text };
  }

  try {
    const json = JSON.parse(text) as Record<string, unknown>;
    const subscriber = json.subscriber && typeof json.subscriber === 'object' ? json.subscriber as Record<string, unknown> : undefined;
    const subscription = json.subscription && typeof json.subscription === 'object' ? json.subscription as Record<string, unknown> : undefined;
    const idCandidates = [json.id, subscriber?.id, subscription?.id];
    const id = idCandidates.find((candidate): candidate is string => typeof candidate === 'string');
    return { text, json, id };
  } catch {
    return { text };
  }
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const ipHash = hashIp(getClientIp(request));
  const userAgent = getUserAgent(request);
  const kitApiKey = process.env.KIT_API_KEY;
  const kitWebhookUrl = process.env.KIT_WEBHOOK_URL;

  try {
    const rawBody = (await request.json().catch(() => null)) as NewsletterSubscriptionData | null;
    if (!rawBody || typeof rawBody !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const email = normalizeEmail(rawBody.email);
    const newsletterId = normalizeText(rawBody.newsletterId, 120) || 'smart-home-index';
    const honeypot = normalizeText(rawBody.website, 200);

    if (honeypot) {
      await logNewsletterEvent({
        requestId,
        email: email || 'honeypot@example.invalid',
        newsletterId,
        status: 'blocked_honeypot',
        provider: 'kit',
        ipHash,
        userAgent,
        errorDetail: `honeypot_field_populated:${honeypot.slice(0, 100)}`,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Successfully subscribed to newsletter',
        },
        { status: 200 },
      );
    }

    if (!email || !isValidEmail(email)) {
      await logNewsletterEvent({
        requestId,
        email: email || 'invalid@example.invalid',
        newsletterId,
        status: 'invalid',
        provider: 'kit',
        ipHash,
        userAgent,
        errorCode: 'invalid_email',
      });

      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 },
      );
    }

    if (
      !kitApiKey ||
      !kitWebhookUrl ||
      !kitWebhookUrl.startsWith('https://') ||
      kitWebhookUrl.includes('your-kit-webhook-url-here')
    ) {
      await logNewsletterEvent({
        requestId,
        email,
        newsletterId,
        status: 'provider_failed',
        provider: 'kit',
        ipHash,
        userAgent,
        errorCode: 'kit_not_configured',
      });

      console.error('Kit.com API key or webhook URL not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 },
      );
    }

    let kitResponse: Response;
    try {
      kitResponse = await fetch(kitWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${kitApiKey}`,
        },
        body: JSON.stringify({
          email,
          newsletter_id: newsletterId,
        }),
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      await logNewsletterEvent({
        requestId,
        email,
        newsletterId,
        status: 'provider_failed',
        provider: 'kit',
        ipHash,
        userAgent,
        errorCode: 'kit_fetch_failed',
        errorDetail: detail.slice(0, 2_000),
      });

      console.error('Kit.com fetch failed:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 },
      );
    }

    const kitData = await readKitResponse(kitResponse);

    if (!kitResponse.ok) {
      await logNewsletterEvent({
        requestId,
        email,
        newsletterId,
        status: 'provider_failed',
        provider: 'kit',
        ipHash,
        userAgent,
        errorCode: `kit_${kitResponse.status}`,
        errorDetail: kitData.text.slice(0, 2_000),
      });

      console.error('Kit.com API error:', kitData.text);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 },
      );
    }

    await logNewsletterEvent({
      requestId,
      email,
      newsletterId,
      status: kitResponse.status === 200 || kitResponse.status === 201 ? 'subscribed' : 'provider_accepted',
      provider: 'kit',
      providerResponseId: kitData.id,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
        data: kitData.json ?? null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 },
    );
  }
}
