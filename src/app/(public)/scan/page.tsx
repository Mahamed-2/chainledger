// src/app/(public)/scan/page.tsx
import prisma from '@/lib/db';
import ScanHubClient from './ScanHubClient';

export const dynamic = 'force-dynamic';

export default async function ScanPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' },
    include: { footprint: true }
  });

  return <ScanHubClient products={products} />;
}
