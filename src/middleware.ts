import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_COUNT = 10;
const RATE_LIMIT_WINDOW = 60000; // 60 seconds

export function middleware(req: NextRequest) {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  } else {
    const rateLimitInfo = rateLimitMap.get(ip)!;
    if (now - rateLimitInfo.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    } else {
      rateLimitInfo.count += 1;
      if (rateLimitInfo.count > RATE_LIMIT_COUNT) {
        return NextResponse.json(
          { error: 'Too Many Requests' },
          { status: 429 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/chat',
};
