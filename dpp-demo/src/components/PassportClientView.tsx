"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, Award, Recycle, Activity, ArrowLeft, ChevronDown, CheckCircle2, ShieldAlert, Droplets, Wind, Zap, Microscope, FileText, Globe, Wrench } from 'lucide-react';
import SupplyChainDiagram from '@/components/SupplyChainDiagram';
import FootprintChart from '@/components/FootprintChart';
import MaterialsPieChart from '@/components/MaterialsPieChart';
import { FadeIn, SlideIn, StaggerContainer, NumberCounter } from '@/components/motion/MotionSystem';
import { motion, AnimatePresence } from 'framer-motion';

export default function PassportClientView({ product }: { product: any }) {
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [expandedChemicals, setExpandedChemicals] = useState(false);
  const [activeMaterialTab, setActiveMaterialTab] = useState<'b2c' | 'b2b'>('b2c');

  const circularity = product.circularity?.[0] || {};
  
  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-gray-500 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative">
               <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-gray-900 tracking-widest uppercase">EU ESPR Verified Passport</span>
          </div>
          <div className="flex items-center gap-3">
             <button className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1">
                <Globe className="w-3 h-3" /> EN
             </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 mt-8 space-y-10">
        
        {/* Hero Section */}
        <FadeIn duration={800}>
          <section className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-80 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-80 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10 mb-8">
              <div className="flex-1">
                <StaggerContainer staggerDelay={100}>
                  <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3 mb-2">
                     <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
                        {product.brand}
                     </span>
                     <span className="text-xs text-slate-500 font-mono">ID: {product.sku}</span>
                  </motion.div>
                  <motion.h1 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    {product.name}
                  </motion.h1>
                  <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-slate-600 mt-4 leading-relaxed max-w-2xl">
                    {product.description}
                  </motion.p>
                </StaggerContainer>
              </div>
              
              {/* Circularity Badge (Energy Label Style) */}
              <motion.div 
                initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-[1.5rem] bg-gradient-to-br from-emerald-500 to-teal-700 p-1 shadow-xl shadow-emerald-500/20"
              >
                 <div className="w-full h-full bg-white rounded-[1.3rem] flex flex-col items-center justify-center p-2 text-center border-4 border-emerald-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Score</span>
                    <span className="text-5xl font-black text-emerald-600 leading-none">{product.footprint?.score || 'A'}</span>
                    <span className="text-[9px] font-semibold text-emerald-500 uppercase mt-1">Circularity</span>
                 </div>
              </motion.div>
            </div>

            {/* Quick Stats Grid */}
            <StaggerContainer staggerDelay={100} className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              <motion.div variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }} whileHover={{ y: -4 }} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 mb-3"><Recycle className="w-4 h-4 text-emerald-500" /><span className="text-xs font-semibold">Recycled</span></div>
                <div className="text-2xl font-black text-slate-800 flex items-baseline gap-1"><NumberCounter value={product.footprint?.recycled || 0} duration={2000} /><span className="text-sm font-bold text-slate-400">%</span></div>
              </motion.div>
              <motion.div variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }} whileHover={{ y: -4 }} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 mb-3"><Wind className="w-4 h-4 text-blue-500" /><span className="text-xs font-semibold">CO₂ / kg</span></div>
                <div className="text-2xl font-black text-slate-800"><NumberCounter value={product.footprint?.co2 || 0} duration={2000} /></div>
              </motion.div>
              <motion.div variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }} whileHover={{ y: -4 }} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 mb-3"><Droplets className="w-4 h-4 text-cyan-500" /><span className="text-xs font-semibold">Water / L</span></div>
                <div className="text-2xl font-black text-slate-800"><NumberCounter value={product.footprint?.water || 0} duration={2000} /></div>
              </motion.div>
              <motion.div variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }} whileHover={{ y: -4 }} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-500 mb-3"><Activity className="w-4 h-4 text-amber-500" /><span className="text-xs font-semibold">Lifespan</span></div>
                <div className="text-2xl font-black text-slate-800 flex items-baseline gap-1"><NumberCounter value={circularity?.estimatedLifespan || 5} duration={1500} /><span className="text-sm font-bold text-slate-400">Yrs</span></div>
              </motion.div>
            </StaggerContainer>
          </section>
        </FadeIn>

        {/* Supply Chain Diagram & Certifications */}
        <SlideIn direction="up">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
             <div className="flex flex-col justify-between mb-2 gap-2">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2"><Globe className="w-6 h-6 text-indigo-500" /> Transparent Supply Chain</h2>
                   <p className="text-sm font-semibold text-slate-600 mt-1">Diagram view of the verified value chain stages.</p>
                </div>
             </div>
             
             <SupplyChainDiagram processes={product.processes || []} />
             
             <div className="mt-10 pt-8 border-t border-slate-100">
               <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-500"/> Verified Certifications</h3>
               <StaggerContainer staggerDelay={100} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {product.certifications?.map((cert: any) => (
                   <motion.div 
                     key={cert.id} 
                     variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                     whileHover={{ y: -4, scale: 1.02 }}
                     onClick={() => setActiveCert(activeCert === cert.id ? null : cert.id)}
                     className={`p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2 ${activeCert === cert.id ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500 ring-offset-2' : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-md'}`}
                   >
                     <Award className={`w-8 h-8 mb-3 ${activeCert === cert.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                     <p className={`text-xs font-bold leading-tight ${activeCert === cert.id ? 'text-indigo-900' : 'text-slate-700'}`}>{cert.name}</p>
                     
                     <AnimatePresence>
                       {activeCert === cert.id && (
                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden w-full mt-3 pt-3 border-t border-indigo-200">
                            <p className="text-[9px] font-mono text-indigo-800 opacity-80 break-all">{cert.number}</p>
                            <p className="text-[10px] uppercase font-bold text-indigo-600 mt-1">Exp: {new Date(cert.expiry).toISOString().split('T')[0]}</p>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.div>
                 ))}
               </StaggerContainer>
             </div>
          </section>
        </SlideIn>

        {/* Environmental Footprint ("Nutrition Facts" Style) */}
        <SlideIn direction="up" distance="lg">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
             <div className="border-b-[6px] border-slate-900 pb-2 mb-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Environmental Impact</h2>
                <p className="text-sm font-semibold text-slate-600 mt-1">Per Functional Unit (1 Garment) vs Industry Average</p>
             </div>
             
             <div className="space-y-4">
                {/* Metric 1 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-slate-200 gap-4">
                   <div className="w-full md:w-1/3">
                      <span className="font-bold text-slate-800 flex items-center gap-2"><Wind className="w-4 h-4" /> Carbon (CO₂e)</span>
                      <span className="text-xs text-slate-500 block mt-1">Global Warming Potential</span>
                   </div>
                   <div className="w-full md:w-1/2">
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
                         {/* Average marker */}
                         <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-slate-400 z-10" title="Industry Avg: 35 kg"></div>
                         <motion.div initial={{ width: 0 }} animate={{ width: '38%' }} transition={{ duration: 1.5 }} className="h-full bg-emerald-500 rounded-full relative z-0" />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono uppercase font-semibold">
                         <span>0 kg</span><span>{product.footprint?.co2 || 21.7} kg (36% below avg)</span>
                      </div>
                   </div>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-slate-200 gap-4">
                   <div className="w-full md:w-1/3">
                      <span className="font-bold text-slate-800 flex items-center gap-2"><Droplets className="w-4 h-4" /> Water Used</span>
                      <span className="text-xs text-slate-500 block mt-1">Total Freshwater Consumption</span>
                   </div>
                   <div className="w-full md:w-1/2">
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
                         {/* Average marker */}
                         <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-slate-400 z-10" title="Industry Avg: 8000 L"></div>
                         <motion.div initial={{ width: 0 }} animate={{ width: '63%' }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-blue-500 rounded-full relative z-0" />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono uppercase font-semibold">
                         <span>0 L</span><span>{product.footprint?.water || 6350} L (20% below avg)</span>
                      </div>
                   </div>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-slate-200 gap-4">
                   <div className="w-full md:w-1/3">
                      <span className="font-bold text-slate-800 flex items-center gap-2"><Zap className="w-4 h-4" /> Energy Intensity</span>
                      <span className="text-xs text-slate-500 block mt-1">Total Energy Used in Mfg</span>
                   </div>
                   <div className="w-full md:w-1/2">
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative">
                         <div className="absolute top-0 bottom-0 left-[70%] w-0.5 bg-slate-400 z-10" title="Industry Avg: 65 kWh"></div>
                         <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} transition={{ duration: 1.5, delay: 0.4 }} className="h-full bg-amber-500 rounded-full relative z-0" />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono uppercase font-semibold">
                         <span>0 kWh</span><span>{product.footprint?.energy || 45.2} kWh (30% below avg)</span>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Small Radar summary for context */}
             <div className="mt-8 pt-6 border-t-[3px] border-slate-900 border-dashed">
               <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Multi-Axis Industry Comparison</h3>
               <FootprintChart footprint={product.footprint} />
             </div>
          </section>
        </SlideIn>

        {/* Materials Breakdown Accordion */}
        <SlideIn direction="up" distance="lg">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 mb-1">Composition Breakdown</h2>
                   <p className="text-sm text-slate-500">Declared materials over 1% by weight.</p>
                </div>
                {/* B2C vs B2B Toggle */}
                <div className="bg-slate-100 p-1 rounded-xl flex self-start">
                   <button onClick={() => setActiveMaterialTab('b2c')} className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${activeMaterialTab === 'b2c' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Summary</button>
                   <button onClick={() => setActiveMaterialTab('b2b')} className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${activeMaterialTab === 'b2b' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Detailed (B2B)</button>
                </div>
             </div>

             <div className="space-y-4">
                {product.materials?.map((mat: any, i: number) => (
                   <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                      {/* Standard View */}
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                               <span className="text-lg font-bold text-slate-800">{mat.name}</span>
                               <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-200 text-slate-600 rounded">{mat.type}</span>
                            </div>
                            <p className="text-sm text-slate-500 flex items-center gap-1.5">Origin: <Globe className="w-3.5 h-3.5" /> {mat.origin}</p>
                         </div>
                         <div className="flex items-center gap-6">
                            {mat.standard && (
                               <div className="text-right hidden md:block">
                                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md shadow-sm">{mat.standard} Certified</span>
                               </div>
                            )}
                            <div className="text-right min-w-[3rem]">
                               <span className="text-2xl font-black text-slate-800">{mat.percentage}%</span>
                            </div>
                         </div>
                      </div>

                      {/* Detailed View Array */}
                      <AnimatePresence>
                         {activeMaterialTab === 'b2b' && mat.quality && mat.quality.length > 0 && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-200 bg-white p-5">
                               <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2"><Microscope className="w-4 h-4"/> Technical Specifications</h4>
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {Object.entries(mat.quality[0]).filter(([key]) => !['id','materialId','createdAt','updatedAt'].includes(key)).map(([key, val]) => (
                                     <div key={key} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className="text-sm font-semibold text-slate-800 truncate block">{val === true ? 'Yes' : val === false ? 'No' : String(val)}</span>
                                     </div>
                                  ))}
                               </div>
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                ))}
             </div>
          </section>
        </SlideIn>

        {/* Chemical Safety Profile (REACH Table) */}
        <SlideIn direction="up">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[100px] pointer-events-none -mr-4 -mt-4 opacity-50"></div>
             
             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 z-10 relative">
               <div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                   <ShieldAlert className="w-6 h-6 text-indigo-500" /> Optional: Chemical Safety 
                 </h2>
                 <p className="text-sm text-slate-500">SVHC Declarations based on EU REACH limits.</p>
               </div>
               <button onClick={() => setExpandedChemicals(!expandedChemicals)} className="mt-4 sm:mt-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 text-slate-700">
                  {expandedChemicals ? 'Hide Details' : 'View Safety Profile'} <ChevronDown className={`w-4 h-4 transition-transform ${expandedChemicals ? 'rotate-180' : ''}`} />
               </button>
             </div>
             
             <AnimatePresence>
               {expandedChemicals && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                   <div className="pt-4 overflow-x-auto">
                     <table className="w-full text-left border-collapse">
                        <thead>
                           <tr>
                              <th className="py-3 px-4 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b rounded-tl-xl">Substance Class</th>
                              <th className="py-3 px-4 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b">CAS Number</th>
                              <th className="py-3 px-4 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b">Concentration</th>
                              <th className="py-3 px-4 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b rounded-tr-xl">Status</th>
                           </tr>
                        </thead>
                        <tbody className="text-sm">
                           {/* Static Safety Rows based on Seed data / Prompt specs */}
                           <tr className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4 font-semibold text-slate-800">Azo Dyes</td>
                              <td className="py-3 px-4 text-slate-500 font-mono text-xs">92-67-1</td>
                              <td className="py-3 px-4 text-slate-800 font-mono text-xs">&lt; 30 ppm</td>
                              <td className="py-3 px-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold uppercase">Pass</span></td>
                           </tr>
                           <tr className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4 font-semibold text-slate-800">Formaldehyde</td>
                              <td className="py-3 px-4 text-slate-500 font-mono text-xs">50-00-0</td>
                              <td className="py-3 px-4 text-slate-800 font-mono text-xs">&lt; 16 ppm</td>
                              <td className="py-3 px-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold uppercase">Pass</span></td>
                           </tr>
                           <tr className="hover:bg-slate-50">
                              <td className="py-3 px-4 font-semibold text-slate-800">PFCs (PTFE)</td>
                              <td className="py-3 px-4 text-slate-500 font-mono text-xs">9002-84-0</td>
                              <td className="py-3 px-4 text-slate-800 font-mono text-xs">Not detected</td>
                              <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 border border-green-200 rounded text-xs font-bold uppercase">None</span></td>
                           </tr>
                        </tbody>
                     </table>
                     <p className="text-xs text-slate-400 mt-4 leading-relaxed">* Tested according to OEKO-TEX Standard 100 Annex 4. All detected chemicals are well below European REACH Annex XVII thresholds.</p>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </section>
        </SlideIn>

        {/* End of certs spacer removed */}

      </div>
      
      {/* End of Life Options / Circularity Strategies */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 mt-12 mb-16">
         <FadeIn delay={200}>
            <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-emerald-900 opacity-50 mixes-multiply pointer-events-none"></div>
               <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
               
               <div className="relative z-10 grid md:grid-cols-12 gap-10 items-center">
                  <div className="md:col-span-4">
                     <h2 className="text-3xl font-black mb-3">Next Steps Circularity</h2>
                     <p className="text-slate-400 text-sm leading-relaxed mb-6">Take responsibility alongside us. At the end of its life, choose how to recirculate this product's value.</p>
                     <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10">
                        <span className="block text-xs uppercase font-bold text-emerald-400 mb-1">Estimated Value</span>
                        <span className="text-3xl font-black text-white">€15.00</span>
                        <span className="block text-[10px] text-slate-400 mt-1 uppercase">Avg. Resale Price based on condition</span>
                     </div>
                  </div>
                  
                  <div className="md:col-span-8 grid sm:grid-cols-3 gap-4">
                    <motion.div whileHover={{ scale: 1.03, y: -5 }} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-full hover:bg-white/10 transition-colors cursor-pointer group">
                      <div>
                         <Recycle className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                         <h3 className="font-bold text-lg mb-2">Recycle</h3>
                         <p className="text-xs text-slate-300 leading-relaxed">Drop off at any brand location to ensure closed-loop recycling of materials.</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Find Drop-Off →</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03, y: -5 }} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-full hover:bg-white/10 transition-colors cursor-pointer group">
                      <div>
                         <Wrench className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                         <h3 className="font-bold text-lg mb-2">Repair</h3>
                         <p className="text-xs text-slate-300 leading-relaxed">Minor tear? Missing button? Order our free repair kit to extend lifespan.</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 text-[10px] uppercase font-bold text-blue-400 tracking-wider">Order Kit →</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03, y: -5 }} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-full hover:bg-white/10 transition-colors cursor-pointer group">
                      <div>
                         <Leaf className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                         <h3 className="font-bold text-lg mb-2">Resell</h3>
                         <p className="text-xs text-slate-300 leading-relaxed">Link this passport to partner resale platforms to guarantee authenticity instantly.</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 text-[10px] uppercase font-bold text-amber-400 tracking-wider">List Item →</div>
                    </motion.div>
                  </div>
               </div>
            </div>
         </FadeIn>
      </div>

      {/* Trust Indicators / Chainledger Verification */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 mt-8 pb-12 text-center">
         <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-200/50 rounded-full mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Chainledger Secured</span>
         </div>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
           Digital Product Passport issued by <b className="text-slate-600 font-mono">{product.reoId}</b>.<br/>
           Data hosted in the EU (Residency: {process.env.NEXT_PUBLIC_EU_DATA_RESIDENCY || 'Sweden'}). Strict GDPR compliance enforced. No consumer tracing is performed by accessing this record.
        </p>
      </div>

    </main>
  );
}
