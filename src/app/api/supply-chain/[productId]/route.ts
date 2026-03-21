import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
      include: {
        processes: {
          orderBy: { timestamp: 'asc' },
          include: { supplier: true }
        }
      }
    });

    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Format processes as GeoJSON-like features for the map
    const features = product.processes.map((proc, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [proc.longitude, proc.latitude]
      },
      properties: {
        step: index + 1,
        stage: proc.stage,
        location: proc.location,
        verified: proc.verified,
        hash: proc.hash,
        supplier: proc.supplier?.name || 'Unknown',
        date: proc.timestamp.toISOString().split('T')[0]
      }
    }));

    return NextResponse.json({
      type: 'FeatureCollection',
      features
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error fetching supply chain data' }, { status: 500 });
  }
}
