import prisma from '@/lib/db';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, BarChart2, Bell, FileText, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';
import DashboardClientView from '@/components/DashboardClientView';

export const dynamic = 'force-dynamic';

export default async function B2BDashboard() {
  let products = [];
  let totalAccessLogs = 0;

  try {
    const [productsResult, totalAccessLogsResult] = await Promise.all([
      prisma.product.findMany({
        include: { footprint: true, certifications: true },
        take: 10
      }),
      prisma.accessLog.count()
    ]);
    products = productsResult;
    totalAccessLogs = totalAccessLogsResult;
  } catch (error) {
    console.error("Prisma error on Dashboard page:", error);
  }

  return <DashboardClientView products={products} totalAccessLogs={totalAccessLogs} />;
}
