import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 600, height: 400, position: 'centre' },
      { name: 'square', width: 600, height: 600, position: 'centre' },
      { name: 'hero', width: 1200, height: 630, position: 'centre' },
      { name: 'large', width: 1600 },
    ],
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'sourceId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Original Sanity asset/ref or static source identifier, if migrated.',
      },
    },
  ],
}
