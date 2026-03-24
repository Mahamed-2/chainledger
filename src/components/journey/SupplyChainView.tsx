'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Factory, 
  Truck, 
  ShieldCheck, 
  AlertCircle, 
  MapPin, 
  Globe, 
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface SupplyChainViewProps {
  product: any;
}

export default function SupplyChainView({ product }: SupplyChainViewProps) {
  // Aggregate multi-tier data
  const tiers = [
    { title: 'Tier 1: Final Assembly', icon: <Factory className="w-4 h-4" color="#a78bfa" />, suppliers: 1, status: 'Verified' },
    { title: 'Tier 2: Fabric Production', icon: <Layers className="w-4 h-4" color="#a78bfa" />, suppliers: 2, status: 'Verified' },
    { title: 'Tier 3: Processing & Yarn', icon: <Network className="w-4 h-4" color="#a78bfa" />, suppliers: 3, status: 'In Review' },
    { title: 'Tier 4: Raw Material', icon: <Globe className="w-4 h-4" color="#a78bfa" />, suppliers: 1, status: 'Verified' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-5 pt-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href={`/journey/${product.id}`}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
            <Network className="w-3.5 h-3.5" /> Chain Supply View
          </div>
        </div>

        {/* Overview Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 ring-1 ring-purple-500/30">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-widest">
                Upstream Transparency
              </span>
              <h2 className="text-2xl font-black text-white">Chain Supply Control</h2>
              <p className="text-slate-400 text-sm font-medium">Multi-tier mapping & logistics health</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate-900/40 rounded-2xl p-5 border border-white/5 border-l-4 border-l-emerald-500">
              <div className="flex justify-between items-start mb-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">On Time</span>
              </div>
              <p className="text-lg font-black text-white">Transit Block C-12</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> Port of Gävle, SE
              </p>
            </div>

            <div className="bg-slate-900/40 rounded-2xl p-5 border border-white/5 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start mb-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">Valid</span>
              </div>
              <p className="text-lg font-black text-white">GOTS 7.0 Cert</p>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" /> Expires Oct 2026
              </p>
            </div>
          </div>
        </div>

        {/* Tiered Tree View */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <h3 className="font-black text-lg flex items-center gap-2 mb-8 text-white">
            <Layers className="w-5 h-5 text-purple-400" />
            Full Upstream Hierarchy
          </h3>

          <div className="space-y-4 relative">
            <div className="absolute left-[1.35rem] top-4 bottom-4 w-px bg-white/10" />

            {tiers.map((tier, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="relative flex items-center gap-4 pl-1"
              >
                <div className="relative z-10 w-11 h-11 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center shadow-lg text-purple-400">
                  {tier.icon}
                </div>
                
                <div className="flex-1 bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div>
                    <h4 className="text-sm font-black text-white">{tier.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{tier.suppliers} active supplier(s) mapped</p>
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                    tier.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {tier.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-10">
          ChainLedger Supply Network · eIDAS 2.0 Authenticated · GS1 Digital Link
        </p>
      </div>
    </main>
  );
}
