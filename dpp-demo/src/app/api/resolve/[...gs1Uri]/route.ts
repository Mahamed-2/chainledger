import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Simulate eIDAS 2.0 Identity Management
function filterDataByRole(product: any, role: string) {
  try {
    const rules = JSON.parse(product.accessRules);
    const allowedFields = rules[role] || rules.public || [];
    
    // Always include base identifiers and public fields
    const baseFields = ['id', 'gs1Uri', 'reoId', 'sku', 'name', 'brand'];
    const fieldsToInclude = [...new Set([...baseFields, ...allowedFields])];
    
    const filtered: any = {};
    for (const field of fieldsToInclude) {
      if (product[field] !== undefined) {
        filtered[field] = product[field];
      }
    }
    
    return filtered;
  } catch (error) {
    // Fallback to minimal public data
    return {
      gs1Uri: product.gs1Uri,
      status: 'Access parsing error, reverting to public'
    };
  }
}

export async function GET(
  request: Request,
  { params }: { params: { gs1Uri: string[] } }
) {
  const uriPath = params.gs1Uri.join('/');
  // Construct full URI if necessary based on your env or assumed GS1_BASE_URI
  const fullUri = uriPath.startsWith('http') ? uriPath : `https://dpp.hm.com/01/${uriPath}`;

  // Read mock role from header (Simulates eIDAS JWT)
  const role = request.headers.get('X-User-Role') || 'public';
  // Read anonymized IP or client ID for GDPR access logging
  const ipHash = request.headers.get('X-Forwarded-For') || 'anonymous-client';

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { gs1Uri: fullUri },
          { gs1Uri: { contains: uriPath } } // Fallback for testing
        ]
      },
      include: {
        materials: { include: { supplier: true } },
        processes: { include: { supplier: true }, orderBy: { timestamp: 'asc' } },
        footprint: true,
        certifications: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // 1. Run Role-Based Access Control (RBAC) filtering
    const visibleData = filterDataByRole(product, role);

    // 2. Log access for GDPR Article 30 compliance (asynchronous, don't block response)
    prisma.accessLog.create({
      data: {
        gs1Uri: product.gs1Uri,
        roleUser: role,
        action: 'RESOLVE_DPP_READ',
        ipHash: ipHash
      }
    }).catch(console.error);

    // 3. Return Chainledger-compliant JSON-LD structure
    return NextResponse.json({
      '@context': 'https://schema.chainledger.eu/dpp/v1',
      '@type': 'DigitalProductPassport',
      resolver: process.env.GS1_BASE_URI || 'local-resolver',
      timestamp: new Date().toISOString(),
      role: role,
      data: visibleData
    });
    
  } catch (error) {
    console.error('Resolver API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
