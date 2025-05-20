
// app/api/countries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { q } from '../../../src/lib/db';

export async function GET(request: NextRequest) {
  try {
    const querySql = `
      SELECT id, rus 
      FROM forums_phone_countries 
      WHERE is_show = 'Y'
      ORDER BY rus
    `;
    const result = await q({ query: querySql });
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error
      ? error.message
      : 'Unknown error';
    return NextResponse.json(
      { message: `Database query error: ${message}` },
      { status: 500 }
    );
  }
}
