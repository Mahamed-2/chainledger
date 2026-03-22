import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import PassportClientView from '@/components/PassportClientView';

export const dynamic = 'force-dynamic';


// Helper to resolve the DPP using the GS1 URI passed in the URL
async function getDppData(uri: string) {
  const decodedUri = decodeURIComponent(uri);
  const product = await prisma.product.findFirst({
    where: { gs1Uri: decodedUri },
    include: {
      materials: { 
        include: { supplier: true, quality: true } 
      },
      processes: { 
        include: { supplier: true, socialCompliance: true, weavingProcesses: true, dyeingProcesses: true, chemicalTreatments: true }, 
        orderBy: { timestamp: 'asc' } 
      },
      footprint: true,
      certifications: true,
      qualityControls: true,
      circularity: true
    }
  });
  
  return product;
}

export default async function PassportPage({ params }: { params: { id: string } }) {
  let product = null;
  try {
    product = await getDppData(params.id);
  } catch (error) {
    console.error("Prisma error on Passport page:", error);
    // Fallback or handle as needed - here we let it fall through to product check
  }

  if (!product) return notFound();

  return <PassportClientView product={product} />;
}
