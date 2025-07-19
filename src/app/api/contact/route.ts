import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

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
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.email || !body.message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Get the D1 database binding from the environment
    // Get the D1 database binding from the environment
    // Try using OpenNext's getCloudflareContext function
    const cfContext = getCloudflareContext();
    const db = cfContext?.env?.DB;
    
    if (!db) {
      console.error('D1 database binding not found');
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
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