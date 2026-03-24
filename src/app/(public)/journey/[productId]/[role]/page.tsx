// src/app/(public)/journey/[productId]/[role]/page.tsx
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import ConsumerView from '@/components/journey/ConsumerView';
import BrandView from '@/components/journey/BrandView';
import RecyclerView from '@/components/journey/RecyclerView';
import MarketAnalystView from '@/components/journey/MarketAnalystView';
import SupplyChainView from '@/components/journey/SupplyChainView';

export const dynamic = 'force-dynamic';

async function getProduct(productId: string) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      footprint: true,
      certifications: true,
      circularity: true,
      materials: { include: { supplier: true, quality: true } },
      processes: {
        include: {
          supplier: true,
          socialCompliance: true,
          weavingProcesses: true,
          dyeingProcesses: true,
          chemicalTreatments: true,
        },
        orderBy: { timestamp: 'asc' },
      },
      qualityControls: true,
    },
  });
}

const VALID_ROLES = ['consumer', 'brand', 'recycler', 'analyst', 'supplier'] as const;
type Role = typeof VALID_ROLES[number];

export default async function StakeholderViewPage({
  params,
}: {
  params: { productId: string; role: string };
}) {
  if (!VALID_ROLES.includes(params.role as Role)) return notFound();

  const product = await getProduct(params.productId);
  if (!product) return notFound();

  const role = params.role as Role;

  if (role === 'consumer') return <ConsumerView product={product} />;
  if (role === 'brand') return <BrandView product={product} />;
  if (role === 'recycler') return <RecyclerView product={product} />;
  if (role === 'analyst') return <MarketAnalystView product={product} />;
  if (role === 'supplier') return <SupplyChainView product={product} />;

  return notFound();
}
