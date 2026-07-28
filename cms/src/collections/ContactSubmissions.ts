import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['createdAt', 'status', 'email', 'newsletter', 'requestId'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Responded', value: 'responded' },
        { label: 'Invalid', value: 'invalid' },
        { label: 'Blocked Honeypot', value: 'blocked_honeypot' },
      ],
      admin: {
        position: 'sidebar',
      },
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
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'newsletter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Intent only for contact-form submissions in the initial migration; the contact endpoint does not subscribe via Kit.',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'ipHash',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'SHA-256 hash of client IP with server-side salt.',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'datasolace-public-app',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'errorDetail',
      type: 'textarea',
    },
  ],
}
