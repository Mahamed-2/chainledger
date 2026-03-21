"use client";

import React from 'react';
import { Factory, Truck, Leaf, Beaker, Recycle, Store, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer } from '@/components/motion/MotionSystem';

export default function SupplyChainDiagram({ processes }: { processes: any[] }) {
  if (!processes || processes.length === 0) return null;

  const getIcon = (stage: string) => {
    const s = stage.toLowerCase();
    if (s.includes('raw') || s.includes('farm') || s.includes('harvest')) return <Leaf className="w-6 h-6 text-emerald-500" />;
    if (s.includes('spin') || s.includes('knit') || s.includes('weav')) return <Factory className="w-6 h-6 text-indigo-500" />;
    if (s.includes('dye') || s.includes('finish') || s.includes('chemical')) return <Beaker className="w-6 h-6 text-purple-500" />;
    if (s.includes('assembly') || s.includes('cmt') || s.includes('garment')) return <Recycle className="w-6 h-6 text-orange-500" />;
    if (s.includes('distrib') || s.includes('transit')) return <Truck className="w-6 h-6 text-blue-500" />;
    if (s.includes('retail') || s.includes('store')) return <Store className="w-6 h-6 text-rose-500" />;
    return <Factory className="w-6 h-6 text-slate-500" />;
  };

  return (
    <div className="w-full overflow-x-auto py-8 scrollbar-hide">
      <div className="min-w-[800px] flex items-center px-4 relative">
        <StaggerContainer staggerDelay={100} className="flex items-start w-full justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-[40px] right-[40px] h-1.5 bg-slate-100 z-0 rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: '100%' }} 
                viewport={{ once: true }} 
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-emerald-400 via-indigo-400 to-rose-400"
             />
          </div>
          
          {processes.map((proc, idx) => (
            <React.Fragment key={proc.id || idx}>
              <motion.div 
                variants={{ hidden: { scale: 0.8, opacity: 0, y: 20 }, visible: { scale: 1, opacity: 1, y: 0 } }}
                className="relative z-10 flex flex-col items-center w-36 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-white border-2 border-slate-200 group-hover:border-indigo-400 shadow-sm group-hover:shadow-md rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 relative">
                  {getIcon(proc.stage)}
                  {proc.verified && (
                     <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                     </div>
                  )}
                </div>
                <div className="text-center px-2">
                  <h4 className="text-xs font-bold text-slate-800 leading-snug mb-1.5">{proc.stage}</h4>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{proc.location}</p>
                </div>
                
                {/* Date tooltip/badge */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 whitespace-nowrap bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none">
                   {new Date(proc.timestamp).toISOString().split('T')[0]}
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
