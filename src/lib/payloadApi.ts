import { createHash } from 'node:crypto'

const DEFAULT_PAYLOAD_INTERNAL_URL = 'http://payload:3000'
const MAX_ERROR_DETAIL_LENGTH = 2_000

export function getPayloadInternalUrl(): string {
  return (process.env.PAYLOAD_INTERNAL_URL || DEFAULT_PAYLOAD_INTERNAL_URL).replace(/\/$/, '')
}

export function getClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  if (cfConnectingIp) {
    return cfConnectingIp.trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return 'unknown'
}

export function getUserAgent(request: Request): string {
  return (request.headers.get('user-agent') || 'unknown').trim().slice(0, 500) || 'unknown'
}

export function hashIp(ip: string): string {
  const salt = process.env.CONTACT_IP_HASH_SALT || process.env.PAYLOAD_SECRET || 'datasolace-local-ip-salt'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export function normalizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return ''
  }

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replaceAll('\r', '')
    .trim()
    .slice(0, maxLength)
}

export function normalizeEmail(value: unknown): string {
  return normalizeText(value, 254).toLowerCase()
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function createPayloadDocument<TData extends Record<string, unknown>>(
  collection: string,
  data: TData,
): Promise<{ id?: string | number } & Record<string, unknown>> {
  const response = await fetch(`${getPayloadInternalUrl()}/api/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Payload create failed for ${collection}: ${response.status} ${detail.slice(0, MAX_ERROR_DETAIL_LENGTH)}`)
  }

  const result = (await response.json().catch(() => ({}))) as { doc?: { id?: string | number } } & Record<string, unknown>
  return result.doc || result
}
