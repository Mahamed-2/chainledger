// src/app/(public)/journey/[productId]/page.tsx
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import JourneyRevealClient from './JourneyRevealClient';

export const dynamic = 'force-dynamic';

async function getProduct(productId: string) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      footprint: true,
      certifications: true,
      circularity: true,
      materials: { include: { supplier: true } },
      processes: { include: { supplier: true }, orderBy: { timestamp: 'asc' } },
    },
  });
}

export default async function JourneyPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProduct(params.productId);
  if (!product) return notFound();
  return <JourneyRevealClient product={product} />;
}
