import { NextResponse } from 'next/server';

export async function POST() {
  // With authentication removed, just return success
  return NextResponse.json({ success: true });
}
