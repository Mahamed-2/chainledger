import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';

  try {
    const whereClause = search ? {
      OR: [
        { name: { contains: search } },
        { sku: { contains: search } }
      ]
    } : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          footprint: true,
          certifications: true
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.product.count({ where: whereClause })
    ]);

    return NextResponse.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Database error fetching products' }, { status: 500 });
  }
}
