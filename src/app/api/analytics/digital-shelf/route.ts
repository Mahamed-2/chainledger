import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// InRiver Q9: Digital Shelf Analytics
// PURPOSE: Provide analytics on product performance across digital channels

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");
    const channel = searchParams.get("channel");

    // In a real implementation this would query a data warehouse or analytics DB
    // e.g., ClickHouse or BigQuery
    
    // Check if we have some access logs to simulate engagement
    const recentAccesses = await prisma.accessLog.count({
      where: productId ? { gs1Uri: { contains: productId } } : undefined,
    });

    const totalViews = 12450 + recentAccesses * 10;
    const conversionRate = 3.2; 
    const sustainabilityEngagement = 67;

    return NextResponse.json({
      metrics: {
        totalViews,
        conversionRate,
        sustainabilityEngagement,
        topChannels: [
          { channel: "shopify", views: Math.floor(totalViews * 0.65), conversions: 245 },
          { channel: "amazon", views: Math.floor(totalViews * 0.35), conversions: 136 },
        ],
      },
      trends: {
        weekOverWeek: "+12% views",
        sustainabilityInterest: "+23% engagement",
      },
      recommendations: [
        "Highlight circularity grade on product page to boost conversions",
        "Add sustainability badge to search results for better CTR",
      ],
      filtersApplied: {
        productId: productId || "all",
        channel: channel || "all",
      }
    });
  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
