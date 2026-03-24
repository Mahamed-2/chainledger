import Link from 'next/link';
import { QrCode, Leaf, ShieldCheck, ArrowRight, ScanLine, Building2, Recycle, User, Globe } from 'lucide-react';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: { id: string; sku: string; name: string; footprint: { score: string } | null }[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
      include: { footprint: true }
    });
  } catch (error) {
    console.error('Prisma error on Home page:', error);
  }

  const SKU_LABELS: Record<string, { emoji: string; accent: string }> = {
    'CL-TSHIRT-2026': { emoji: '👕', accent: 'text-emerald-500' },
    'CL-JEAN-2026': { emoji: '👖', accent: 'text-indigo-500' },
    'CL-JACKET-2026': { emoji: '🧥', accent: 'text-amber-500' },
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-emerald-50/60 blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-50/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xl tracking-tight">
            <Leaf className="w-6 h-6" />
            <span>ChainLedger DPP</span>
          </div>
          <div className="flex gap-6">
            <Link href="/scan" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition flex items-center gap-1">
              <QrCode className="w-4 h-4" /> QR Hub
            </Link>
            <Link href="/leaderboard" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition flex items-center gap-1">
              <Globe className="w-4 h-4" /> Leaderboard
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition">B2B Dashboard</Link>
            <Link href="/admin" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition">Admin</Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Hero copy */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Trace the Journey of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                Every Stitch
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Each garment carries a Digital Product Passport. Scan the QR code to trace the full journey — from raw fibre to your hands — and reveal tailored data for your role.
            </p>

            {/* Stakeholder pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <User className="w-3.5 h-3.5" />, label: 'Consumer: Story & Impact' },
                { icon: <Building2 className="w-3.5 h-3.5" />, label: 'Brand: Full Supply Chain' },
                { icon: <Recycle className="w-3.5 h-3.5" />, label: 'Recycler: Recovery Data' },
              ].map(p => (
                <span key={p.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {p.icon} {p.label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/scan"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <ScanLine className="w-5 h-5" />
                Open QR Scanner Hub
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition-all hover:shadow-md"
              >
                <Globe className="w-5 h-5" />
                View Leaderboard
              </Link>
            </div>
          </div>

          {/* Right: 3 product cards */}
          <div className="space-y-4">
            {products.length > 0 ? products.map(p => {
              const meta = SKU_LABELS[p.sku] ?? { emoji: '👗', accent: 'text-gray-500' };
              return (
                <Link
                  key={p.id}
                  href={`/journey/${p.id}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl shrink-0">
                    {meta.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Tap to start journey</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <span className={`text-2xl font-black ${meta.accent}`}>
                      {p.footprint?.score ?? '—'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                </Link>
              );
            }) : (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                <p className="font-bold mb-1">No products seeded yet</p>
                <p className="font-mono text-xs">Run: npx tsx prisma/seed.ts</p>
              </div>
            )}

            <Link
              href="/scan"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-dashed border-emerald-200 text-emerald-600 font-semibold text-sm hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              <QrCode className="w-5 h-5" /> View All QR Codes →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
