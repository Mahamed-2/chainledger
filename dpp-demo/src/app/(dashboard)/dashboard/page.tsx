import prisma from '@/lib/db';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, BarChart2, Bell, FileText, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';
import DashboardClientView from '@/components/DashboardClientView';

export default async function B2BDashboard() {
  const [products, totalAccessLogs] = await Promise.all([
    prisma.product.findMany({
      include: { footprint: true, certifications: true },
      take: 10
    }),
    prisma.accessLog.count()
  ]);

  return <DashboardClientView products={products} totalAccessLogs={totalAccessLogs} />;
}
