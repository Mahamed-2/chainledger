import { NextResponse } from 'next/server';
import { z } from 'zod';

// Simulating a SHACL validator using Zod
// This represents the EU ESPR schema for textiles
const dppTextileSchema = z.object({
  sku: z.string().min(3),
  name: z.string().min(3),
  brand: z.string().min(2),
  materials: z.array(z.object({
    name: z.string(),
    percentage: z.number().min(0).max(100),
    certified: z.boolean()
  })).min(1, 'Product must have at least one material component'),
  footprint: z.object({
    co2: z.number().nonnegative(),
    water: z.number().nonnegative(),
    recycled: z.number().min(0).max(100)
  })
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Zod parse throws an error if validation fails
    dppTextileSchema.parse(data);
    
    return NextResponse.json({
      valid: true,
      status: 'Valid',
      message: 'DPP payload passes SHACL/ESPR validation rules.'
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        valid: false,
        status: 'Invalid',
        errors: error.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message
        }))
      }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }
}
