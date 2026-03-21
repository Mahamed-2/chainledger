"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, BarChart2, FileText, Search, ShieldAlert, CheckCircle2, Download, RefreshCcw, Database, Server, Filter, ChevronRight, X, AlertCircle, Globe } from 'lucide-react';
import { FadeIn, SlideIn, StaggerContainer, NumberCounter } from '@/components/motion/MotionSystem';
import { motion, AnimatePresence } from 'framer-motion';
import SankeyChart from '@/components/SankeyChart';
import FootprintChart from '@/components/FootprintChart';

export default function DashboardClientView({ products, totalAccessLogs }: { products: any[], totalAccessLogs: number }) {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar relative z-20 so it stays above animations */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
           <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-slate-500"/></Link>
           <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
             <ShieldCheck className="w-6 h-6 text-indigo-600" />
             B2B Compliance Dashboard
             <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ml-2">InRiver Hub</span>
           </h1>
        </div>
        <div className="flex items-center gap-4">
           {/* Export Action */}
           <motion.button 
             whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleExport} disabled={isExporting}
             className="hidden sm:flex items-center gap-2 bg-indigo-600 border border-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70"
           >
             {isExporting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><RefreshCcw className="w-4 h-4" /></motion.div> : <Download className="w-4 h-4" />}
             {isExporting ? 'Generating Report...' : 'Wizard Report'}
           </motion.button>
           
           <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-slate-200">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative"><span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span></span>
             Auditor / Regulator Mode
           </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto w-full p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* KPIs */}
        <StaggerContainer staggerDelay={100} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors"></div>
            <div className="flex justify-between items-start mb-2 text-slate-500 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider">Active Passports</span>
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-black text-slate-800 relative z-10"><NumberCounter value={products.length} duration={1000} /></p>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 relative z-10"><span className="text-emerald-500 font-bold">↑ 14%</span> vs last month</p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors"></div>
            <div className="flex justify-between items-start mb-2 text-slate-500 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider">ESPR Compliance</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-800 relative z-10"><NumberCounter value={100} duration={1500} /><span className="text-lg text-slate-400 font-bold">%</span></p>
            <p className="text-xs text-slate-500 mt-2 relative z-10 flex items-center gap-1"><span className="text-slate-400 font-bold">- 0%</span> Change</p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-50 rounded-full blur-2xl group-hover:bg-purple-100 transition-colors"></div>
            <div className="flex justify-between items-start mb-2 text-slate-500 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider">Data Access Logs</span>
              <BarChart2 className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-3xl font-black text-slate-800 relative z-10"><NumberCounter value={totalAccessLogs} duration={1500} /></p>
            <p className="text-xs text-slate-500 mt-2 relative z-10 flex items-center gap-1"><span className="text-purple-500 font-bold">GDPR Art. 30 Tracker</span></p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-orange-50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors"></div>
            <div className="flex justify-between items-start mb-2 text-slate-500 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider">Pending Audit</span>
              <ShieldAlert className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-3xl font-black text-slate-800 relative z-10"><NumberCounter value={0} duration={500} /></p>
            <p className="text-xs text-slate-500 mt-2 relative z-10 flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 className="w-3 h-3"/> All clear</p>
          </motion.div>
        </StaggerContainer>

        {/* Middle Dual Data Vis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Sankey Supply Chain Volume Flow */}
           <SlideIn direction="up" delay={200} className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
                 <div className="flex justify-between items-end mb-6">
                    <div>
                       <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Globe className="w-5 h-5 text-indigo-500"/> Volume Flow Matrix</h2>
                       <p className="text-xs text-slate-500 mt-1">Material mass flow across the current supply chain network.</p>
                    </div>
                    <div className="bg-slate-100 rounded-lg p-1 hidden sm:flex">
                       <button className="px-3 py-1 text-xs font-bold bg-white text-slate-800 rounded shadow-sm">Global</button>
                       <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-700">Per SKU</button>
                    </div>
                 </div>
                 <div className="flex-1 min-h-[300px] w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative">
                    {/* Render the generic imported Sankey */}
                    <SankeyChart />
                 </div>
              </div>
           </SlideIn>

           {/* 6-Axis Compliance Radar */}
           <SlideIn direction="up" delay={300} className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
                 <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-emerald-500"/> ESG Compliance Radar</h2>
                    <p className="text-xs text-slate-500 mt-1">Aggregated scoring vs. Industry Baseline.</p>
                 </div>
                 <div className="flex-1 min-h-[300px] w-full flex items-center justify-center mt-4">
                    {/* FootprintChart doubles safely as our radar chart given its config */}
                    <div className="w-full max-w-[280px]">
                       <FootprintChart footprint={products[0]?.footprint} />
                    </div>
                 </div>
                 <div className="flex justify-center gap-4 mt-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500/80 rounded-sm inline-block border border-emerald-600"></span> Your Portfolio</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-200 rounded-sm inline-block border border-slate-300"></span> Industry Avg</span>
                 </div>
              </div>
           </SlideIn>
        </div>

        {/* Data Table */}
        <SlideIn direction="up" delay={500}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">Registered Passports Registry</h2>
              <div className="flex gap-2 w-full sm:w-auto">
                 <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"><Filter className="w-4 h-4"/></button>
                 <div className="relative w-full sm:w-64">
                   <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                   <input type="text" placeholder="Search by SKU, Brand..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm" />
                 </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">SKU / Identifier</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Audit Trail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {products.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No products found. Run seed script.</td></tr>
                  )}
                  {products.map((p, i) => (
                    <motion.tr 
                      key={p.id} 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.05 }}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedProduct(p)}
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                           <FileText className="w-4 h-4" />
                         </div>
                         {p.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-xs">{p.sku}</td>
                      <td className="px-6 py-4 text-slate-500">{p.brand}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 shadow-sm">
                          <CheckCircle2 className="w-3 h-3" />
                          {p.shaclValidationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-indigo-600 font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                          View details <ChevronRight className="w-4 h-4" />
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SlideIn>

        {/* Bottom Grid: Audit Timeline & InRiver Integration Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <SlideIn direction="up" delay={600}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full">
                 <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6"><AlertCircle className="w-5 h-5 text-amber-500"/> Global Audit Timeline</h2>
                 
                 <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                    {/* Horizontal Scroll Cards */}
                    {[1,2,3].map((_, i) => (
                       <div key={i} className="min-w-[280px] bg-slate-50 rounded-xl p-4 border border-slate-200 snap-center shrink-0">
                          <div className="flex justify-between items-center mb-3 text-xs font-bold uppercase text-slate-400">
                             <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Date {new Date().toLocaleDateString()}</span>
                             <ShieldCheck className="w-4 h-4 text-emerald-500"/>
                          </div>
                          <p className="font-bold text-slate-800 text-sm mb-1">Supplier Audit Approved</p>
                          <p className="text-xs text-slate-500 leading-relaxed">Tier 2 Facility (Gaziantep, Turkey). Passed Living Wage and ZDHC verification.</p>
                       </div>
                    ))}
                 </div>
              </div>
           </SlideIn>

           <SlideIn direction="up" delay={700}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-zinc-50 rounded-full blur-3xl pointer-events-none"></div>
                 <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6 z-10"><Database className="w-5 h-5 text-zinc-600"/> InRiver PIM Integration</h2>
                 
                 <div className="flex-1 grid grid-cols-2 gap-4 z-10">
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col justify-between">
                       <span className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-1 mb-2"><Server className="w-3 h-3"/> Data Sync Status</span>
                       <div className="flex items-center gap-2 text-2xl font-black text-zinc-800"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Online</div>
                       <span className="text-xs text-zinc-500 mt-1">Last synced: 2m ago</span>
                    </div>
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col justify-between">
                       <span className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-1 mb-2">Quality Score</span>
                       <div className="text-2xl font-black text-emerald-600">98.5%</div>
                       <span className="text-xs text-zinc-500 mt-1">Completeness Index</span>
                    </div>
                 </div>
              </div>
           </SlideIn>
        </div>

      </main>

      {/* Audit Trail Modal for Specifically Selected Products */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
              <motion.div drag dragMomentum={false} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] pointer-events-auto">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 cursor-grab active:cursor-grabbing rounded-t-2xl">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  Audit Trail Details
                </h3>
                <button onClick={() => setSelectedProduct(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="mb-6">
                  <p className="text-xs text-slate-400 font-mono mb-1">{selectedProduct.gs1Uri}</p>
                  <h4 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h4>
                  <p className="text-sm text-slate-500">Brand: {selectedProduct.brand} | SKU: {selectedProduct.sku}</p>
                </div>
                
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-slate-200">
                   {/* Mock Audit Log Entries */}
                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group border-none">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-white z-10 bg-emerald-100 text-emerald-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                         <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-slate-900 text-sm">ESPR Validated</h5>
                            <span className="text-[10px] text-slate-400 font-mono">Today, 09:41</span>
                         </div>
                         <p className="text-xs text-slate-500 leading-relaxed mt-2">System validated SHACL footprint against EU standards automatically.</p>
                      </div>
                   </div>

                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-white z-10 bg-indigo-100 text-indigo-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                         <Database className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-slate-900 text-sm">InRiver Sync</h5>
                            <span className="text-[10px] text-slate-400 font-mono">Yesterday, 14:22</span>
                         </div>
                         <p className="text-xs text-slate-500 leading-relaxed mt-2">GOTS and Recycled Claim Standard metadata synched via InRiver PIM API.</p>
                      </div>
                   </div>
                   
                   <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-[3px] border-white z-10 bg-slate-100 text-slate-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                         <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                         <div className="flex items-center justify-between mb-1">
                            <h5 className="font-bold text-slate-900 text-sm">Passport Minted</h5>
                            <span className="text-[10px] text-slate-400 font-mono">2 Days ago</span>
                         </div>
                         <p className="text-xs text-slate-500 leading-relaxed mt-2">Initial robust DPP generated. Assigned REO ID: {selectedProduct.reoId}.</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                 <Link href={`/passport/${encodeURIComponent(selectedProduct.gs1Uri)}`} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 rounded-lg text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500">
                   View Live Passport
                 </Link>
                 <button onClick={() => setSelectedProduct(null)} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                   Close Audit
                 </button>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
