import type { CollectionConfig } from 'payload'

export const NewsletterEvents: CollectionConfig = {
  slug: 'newsletter-events',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['createdAt', 'status', 'email', 'newsletterId', 'provider'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'newsletterId',
      type: 'text',
      defaultValue: 'smart-home-index',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Provider Accepted', value: 'provider_accepted' },
        { label: 'Provider Failed', value: 'provider_failed' },
        { label: 'Invalid', value: 'invalid' },
        { label: 'Blocked Honeypot', value: 'blocked_honeypot' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'provider',
      type: 'text',
      defaultValue: 'kit',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'providerResponseId',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'errorCode',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'errorDetail',
      type: 'textarea',
    },
    {
      name: 'requestId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ipHash',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
    },
  ],
}
