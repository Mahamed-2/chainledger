import Link from 'next/link';
import { ArrowLeft, Settings, Database, UploadCloud, Link as LinkIcon, Users, CheckCircle } from 'lucide-react';

export default function AdminPIMHub() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar segment */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
           <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition"><ArrowLeft className="w-5 h-5"/></Link>
           <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
             <Database className="w-5 h-5 text-indigo-600" />
             Admin PIM Hub
           </h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-indigo-100">
             <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
             Role: Admin (Brand/Manufacturer)
           </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 lg:p-8 space-y-8">
        
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
           <div>
             <h2 className="text-lg font-bold text-gray-900">DPP Data Onboarding</h2>
             <p className="text-sm text-gray-500">Map your existing ERP/PIM data to the Chainledger / ESPR standard.</p>
           </div>
           <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
             <UploadCloud className="w-4 h-4" />
             Upload JSON/CSV
           </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Validation & Mapping Status */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500"/>
              Data Validation (SHACL)
            </h3>
            <div className="space-y-4">
              <div className="border border-emerald-100 bg-emerald-50 rounded-lg p-4">
                 <p className="text-sm font-semibold text-emerald-800">1 Product(s) Ready to Mint</p>
                 <p className="text-xs text-emerald-600 mt-1">H&M Men's Sustainable Outfit passes all mandatory ESPR textile requirements.</p>
              </div>
              <div className="border border-orange-100 bg-orange-50 rounded-lg p-4">
                 <p className="text-sm font-semibold text-orange-800">5 Product(s) Require Attention</p>
                 <p className="text-xs text-orange-600 mt-1">Missing lifecycle data or material composition percentages.</p>
                 <button className="mt-3 text-xs bg-white border border-orange-200 text-orange-700 px-3 py-1 rounded font-medium shadow-sm hover:bg-orange-100 transition">Review Errors</button>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-gray-500"/>
              Active Integrations
            </h3>
            <div className="divide-y divide-gray-100 border rounded-xl overflow-hidden">
               <div className="p-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition">
                 <div>
                   <p className="text-sm font-bold text-gray-900">InRiver PIM</p>
                   <p className="text-xs text-gray-500">Last sync: 2 hours ago</p>
                 </div>
                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
               </div>
               <div className="p-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition">
                 <div>
                   <p className="text-sm font-bold text-gray-900">SAP ERP</p>
                   <p className="text-xs text-gray-500">Live API connection</p>
                 </div>
                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
               </div>
               <div className="p-4 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 transition">
                 <div>
                   <p className="text-sm font-bold text-gray-900">Tier 2 Suppliers Portal</p>
                   <p className="text-xs text-gray-500">Awaiting 3 vendor uploads</p>
                 </div>
                 <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,36,0.6)]" />
               </div>
            </div>
          </div>
        </div>

        {/* Generic UI placeholder for mapping tool */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 filter grayscale-[0.8] opacity-60 pointer-events-none">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500"/>
            Schema Mapping (Preview)
          </h3>
          <div className="grid grid-cols-5 gap-4 items-center p-4 bg-gray-50 border rounded-lg">
             <div className="col-span-2 text-sm font-mono text-gray-600 bg-white p-2 rounded border">source.internal_sku</div>
             <div className="col-span-1 text-center text-gray-400">→</div>
             <div className="col-span-2 text-sm font-mono text-indigo-700 bg-indigo-50 p-2 rounded border border-indigo-100">dpp.espr.sku</div>
          </div>
          <div className="grid grid-cols-5 gap-4 items-center p-4 bg-gray-50 border rounded-lg">
             <div className="col-span-2 text-sm font-mono text-gray-600 bg-white p-2 rounded border">source.composition_str</div>
             <div className="col-span-1 text-center text-gray-400">→</div>
             <div className="col-span-2 text-sm font-mono text-indigo-700 bg-indigo-50 p-2 rounded border border-indigo-100">dpp.material.array</div>
          </div>
        </div>

      </main>
    </div>
  );
}
