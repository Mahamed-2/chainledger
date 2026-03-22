import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, QrCode } from 'lucide-react';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Get the seeded demo product to link directly to its passport
  // Adding try-catch to prevent "Server-side exception" if DB is temporarily unreachable on Vercel
  let product = null;
  try {
    product = await prisma.product.findFirst();
  } catch (error) {
    console.error("Prisma error on Home page:", error);
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-emerald-50/50 blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xl tracking-tight">
            <Leaf className="w-6 h-6" />
            <span>Chainledger DPP EU</span>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition">B2B Dashboard</Link>
            <Link href="/admin" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition">Admin / PIM Hub</Link>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>EU ESPR Ready</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              The Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                Product Transparency
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Verify sustainability claims, track supply chain journeys, and ensure complete regulatory compliance with our end-to-end Digital Product Passport solution.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {product ? (
                <Link 
                  href={`/passport/${encodeURIComponent(product.gs1Uri)}`}
                  className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Scan Demo Product</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              ) : (
                <div className="px-8 py-4 rounded-full bg-gray-200 text-gray-500 font-semibold">
                  No Demo Product Found (Run Seed)
                </div>
              )}
            </div>
          </div>

          <div className="relative lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-white z-0" />
            <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
               {/* Decorative card showing the H&M Product */}
               <div className="glass-panel p-8 rounded-2xl w-full max-w-sm shadow-xl relative">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">H&M Sustainable Outfit</h3>
                  <div className="space-y-4 mb-6">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[68%]" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 flex justify-between">
                      <span>Recycled Content</span>
                      <span className="text-emerald-700 font-bold">68%</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Carbon</p>
                      <p className="font-bold text-gray-900">21.7 <span className="text-xs font-normal text-gray-500">kg</span></p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Water</p>
                      <p className="font-bold text-gray-900">6350 <span className="text-xs font-normal text-gray-500">L</span></p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
