'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Users, 
  Globe, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';

interface MarketAnalystViewProps {
  product: any;
}

const PRICING_TRENDS = [
  { month: 'Jan', product: 45, market: 42 },
  { month: 'Feb', product: 45, market: 43 },
  { month: 'Mar', product: 48, market: 44 },
  { month: 'Apr', product: 48, market: 45 },
  { month: 'May', product: 48, market: 46 },
  { month: 'Jun', product: 48, market: 48 },
];

const REGIONAL_DEMAND = [
  { region: 'Nordics', demand: 85, growth: 12 },
  { region: 'DACH', demand: 65, growth: -2 },
  { region: 'UK', demand: 45, growth: 8 },
  { region: 'Benelux', demand: 30, growth: 5 },
];

export default function MarketAnalystView({ product }: MarketAnalystViewProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <BarChart3 className="w-3.5 h-3.5" /> Market Analyst View
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 ring-1 ring-blue-500/30">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">
                Analytics & Benchmarking
              </span>
              <h2 className="text-2xl font-black text-white">Market Analysis</h2>
              <p className="text-slate-400 text-sm">Competitor benchmarking & regional insights</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Market Share', value: '4.2%', change: '+0.8%', pos: true, icon: <Target className="w-4 h-4" /> },
              { label: 'Avg. Margin', value: '18.5%', change: '-1.2%', pos: false, icon: <TrendingUp className="w-4 h-4" /> },
              { label: 'Sentiment', value: 'Positive', change: '82%', pos: true, icon: <Users className="w-4 h-4" /> },
              { label: 'Global Rank', value: '#12', change: 'Up 4', pos: true, icon: <Globe className="w-4 h-4" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/40 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  {stat.icon}
                  <span className="text-[9px] uppercase font-bold tracking-wider">{stat.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-white">{stat.value}</span>
                  <span className={`text-[10px] font-bold flex items-center ${stat.pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="space-y-6">
          {/* Pricing Trends Chart */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
            <h3 className="font-black text-lg mb-6 flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Pricing vs Market Hub
            </h3>
            
            <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PRICING_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(v) => `€${v}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="product" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="market" 
                  stroke="#64748b" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Demand */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <h3 className="font-black text-lg flex items-center gap-2 mb-6 text-white">
            <Globe className="w-5 h-5 text-purple-400" />
            Regional Hotspots
          </h3>
          
          <div className="space-y-4">
            {REGIONAL_DEMAND.map((r, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-1.5 font-bold">
                  <span className="text-sm text-slate-200">{r.region}</span>
                  <span className={`text-[10px] font-black ${r.growth > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {r.growth > 0 ? '+' : ''}{r.growth}% YoY
                  </span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${r.demand}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full bg-gradient-to-r ${r.growth > 0 ? 'from-blue-500 to-indigo-600' : 'from-slate-500 to-slate-600'}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs font-bold text-blue-400 mb-1 flex items-center gap-1.5">
              <PieChartIcon className="w-3.5 h-3.5" /> Analyst Recommendation
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              High correlation detected between "Organic Cotton" transparency and conversion in the Nordics (+24%). Recommend expanding localized marketing assets for Oslo/Stockholm markets.
            </p>
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] text-slate-600 mt-10">
        ChainLedger Analysis Engine · GDPR Article 32 · Verified by {product.reoId}
      </p>
    </div>
    </main>
  );
}
