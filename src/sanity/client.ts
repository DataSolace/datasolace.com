import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01', // Use today's date or a fixed version
  useCdn: false, // Set to false for fresh data, true for cached data
})

// Create image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: { _type: string; asset: { _type: string; _ref: string } }) {
  return builder.image(source)
}