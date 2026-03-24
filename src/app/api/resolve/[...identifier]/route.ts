import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// CIRPASS §4: HTTP URI-based Resolution + InRiver Q5: Tech Stack Integration

export async function GET(
  request: NextRequest,
  { params }: { params: { identifier: string[] } }
) {
  try {
    // 1. Parse GS1 Digital Link URI (CIRPASS §3)
    // The identifier array might be ["01", "0725272847561", "21", "HM-OUTFIT-2026"]
    // We expect the database to store the gs1Uri as https://dpp.chainledger.io/01/...
    const path = params.identifier.join("/");
    const gs1Uri = `https://dpp.chainledger.io/${path}`;

    // 2. Authenticate requester (CIRPASS §5: eIDAS 2.0)
    const eidasLevel = request.headers.get("X-eIDAS-Level") || "low";
    const stakeholderType =
      request.headers.get("X-Stakeholder-Type") || "CONSUMER";

    // 3. Fetch product from PIM hub (InRiver: Single Source of Truth)
    const product = await prisma.product.findUnique({
      where: { gs1Uri },
      include: {
        materials: {
          include: { supplier: true },
        },
        footprint: true,
        circularity: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 4. Apply SHACL validation simulation (CIRPASS §5)
    // In a real implementation this would use an RDF/SHACL engine
    if (product.shaclValidationStatus === "Invalid") {
      return NextResponse.json(
        { error: "Validation failed", details: ["Missing required circularity attributes"] },
        { status: 400 }
      );
    }

    // 5. Filter data per access rules (InRiver Q1: Data Security)
    // Simulate attribute masking based on EIDAS level
    let filteredData: any = {
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      sku: product.sku,
      footprint: product.footprint,
      circularity: product.circularity,
    };

    if (eidasLevel !== "low" || stakeholderType !== "CONSUMER") {
      // Reveal more for B2B / High assurance
      filteredData.materials = product.materials;
    }

    // 6. Log access (GDPR Article 30 + InRiver Q1)
    await prisma.accessLog.create({
      data: {
        gs1Uri: product.gs1Uri,
        roleUser: stakeholderType,
        action: "RESOLVE_DPP",
        ipHash: "anonymized_hash_v1",
      },
    });

    // 7. Return CIRPASS-compliant response
    return NextResponse.json({
      "@context": "https://w3id.org/dpp/v1",
      id: product.gs1Uri,
      type: "DigitalProductPassport",
      reo: { id: product.reoId, name: "Chainledger REO" },
      dataModelVersion: product.dataModelVersion,
      data: filteredData,
      validation: {
        status: product.shaclValidationStatus,
        timestamp: new Date().toISOString(),
      },
      accessedAt: new Date().toISOString(),
      accessLevel: eidasLevel,
    });
  } catch (error) {
    console.error("REO Resolver Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
