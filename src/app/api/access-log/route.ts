import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const logs = await prisma.accessLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch access logs' }, { status: 500 });
  }
}
