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

const KIT_API_BASE_URL = 'https://api.kit.com/v4';
const MAX_ERROR_DETAIL_LENGTH = 2_000;
const DEFAULT_NEWSLETTER_ID = 'datasolace';

const NEWSLETTER_TAG_ENV_VARS: Record<string, string> = {
  datasolace: 'KIT_TAG_ID_DATASOLACE',
  'smart-home-index': 'KIT_TAG_ID_SMART_HOME_INDEX',
};

interface KitConfig {
  apiKey: string;
  tagId: string;
}

function resolveKitConfig(newsletterId: string): KitConfig | null {
  const apiKey = process.env.KIT_API_KEY;
  const tagEnvVar = NEWSLETTER_TAG_ENV_VARS[newsletterId];
  const tagId = tagEnvVar ? process.env[tagEnvVar] : undefined;

  if (!apiKey || !tagId || !/^\d+$/.test(tagId)) {
    return null;
  }

  return { apiKey, tagId };
}

interface KitResponseData {
  text: string;
  json?: unknown;
  subscriberId?: string;
}

async function readKitResponse(response: Response): Promise<KitResponseData> {
  const text = await response.text().catch(() => '');
  if (!text) {
    return { text };
  }

  try {
    const json = JSON.parse(text) as Record<string, unknown>;
    const subscriber = json.subscriber && typeof json.subscriber === 'object'
      ? json.subscriber as Record<string, unknown>
      : undefined;
    const id = subscriber?.id;
    const subscriberId = typeof id === 'string' || typeof id === 'number' ? String(id) : undefined;
    return { text, json, subscriberId };
  } catch {
    return { text };
  }
}

async function kitPost(config: KitConfig, path: string, body: Record<string, unknown>): Promise<Response> {
  return fetch(`${KIT_API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': config.apiKey,
    },
    body: JSON.stringify(body),
  });
}

async function logNewsletterEvent(data: Record<string, unknown>) {
  return createPayloadDocument('newsletter-events', data);
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const ipHash = hashIp(getClientIp(request));
  const userAgent = getUserAgent(request);

  try {
    const rawBody = (await request.json().catch(() => null)) as NewsletterSubscriptionData | null;
    if (!rawBody || typeof rawBody !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const email = normalizeEmail(rawBody.email);
    const requestedNewsletterId = normalizeText(rawBody.newsletterId, 120);
    const newsletterId = requestedNewsletterId || DEFAULT_NEWSLETTER_ID;
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

    if (!(newsletterId in NEWSLETTER_TAG_ENV_VARS)) {
      await logNewsletterEvent({
        requestId,
        email: email || 'invalid@example.invalid',
        newsletterId,
        status: 'invalid',
        provider: 'kit',
        ipHash,
        userAgent,
        errorCode: 'invalid_newsletter_id',
      });

      return NextResponse.json(
        { error: 'Unknown newsletter' },
        { status: 400 },
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

    const kitConfig = resolveKitConfig(newsletterId);
    if (!kitConfig) {
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

      console.error('Kit API key or tag ID not configured for newsletter:', newsletterId);
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 },
      );
    }

    let subscriberResponse: Response;
    let tagResponse: Response | null = null;
    try {
      subscriberResponse = await kitPost(kitConfig, '/subscribers', { email_address: email });
      if (subscriberResponse.ok) {
        tagResponse = await kitPost(kitConfig, `/tags/${kitConfig.tagId}/subscribers`, { email_address: email });
      }
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
        errorDetail: detail.slice(0, MAX_ERROR_DETAIL_LENGTH),
      });

      console.error('Kit fetch failed:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 },
      );
    }

    if (!subscriberResponse.ok || !tagResponse || !tagResponse.ok) {
      const failedStep = !subscriberResponse.ok ? 'subscriber' : 'tag';
      const failedResponse = !subscriberResponse.ok ? subscriberResponse : tagResponse!;
      const failedData = await readKitResponse(failedResponse);

      await logNewsletterEvent({
        requestId,
        email,
        newsletterId,
        status: 'provider_failed',
        provider: 'kit',
        ipHash,
        userAgent,
        errorCode: `kit_${failedStep}_${failedResponse.status}`,
        errorDetail: failedData.text.slice(0, MAX_ERROR_DETAIL_LENGTH),
      });

      console.error(`Kit ${failedStep} request failed:`, failedResponse.status, failedData.text.slice(0, 500));
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 },
      );
    }

    const subscriberData = await readKitResponse(subscriberResponse);
    const tagData = await readKitResponse(tagResponse);

    // Kit returns 201 when the subscriber/tagging is new and 200 when it
    // already existed; 200 on both calls means this email was already on
    // this list.
    const alreadySubscribed = subscriberResponse.status === 200 && tagResponse.status === 200;

    await logNewsletterEvent({
      requestId,
      email,
      newsletterId,
      status: alreadySubscribed ? 'already_subscribed' : 'subscribed',
      provider: 'kit',
      providerResponseId: tagData.subscriberId || subscriberData.subscriberId,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
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
