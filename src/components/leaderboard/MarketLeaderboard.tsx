"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  BarChart2,
  Code2,
  ArrowRight,
  Filter,
} from "lucide-react";

const MOCK_BRANDS = [
  {
    rank: 1,
    name: "Patagonia",
    co2: 42,
    co2Trend: "up",
    transparency: 98,
    circularity: "A",
    status: "Verified",
  },
  {
    rank: 2,
    name: "Chainledger Outfitters",
    co2: 38,
    co2Trend: "up",
    transparency: 95,
    circularity: "A",
    status: "Verified",
  },
  {
    rank: 3,
    name: "H&M Group",
    co2: 12,
    co2Trend: "up",
    transparency: 76,
    circularity: "B",
    status: "Pending",
  },
  {
    rank: 4,
    name: "Zara",
    co2: -5,
    co2Trend: "down",
    transparency: 45,
    circularity: "C",
    status: "Pending",
  },
  {
    rank: 5,
    name: "Shein",
    co2: -15,
    co2Trend: "down",
    transparency: 12,
    circularity: "E",
    status: "Pending",
  },
];

export default function MarketLeaderboard() {
  const [category, setCategory] = useState("Textiles");
  const [geo, setGeo] = useState("Global");

  return (
    <div className="max-w-6xl mx-auto px-5 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
          <Globe2 className="w-4 h-4" /> Public Transparency Portal
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white">
          Market Leaderboard
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Track brand sustainability, compare circularity grades, and monitor industry-wide CO₂ reduction progress under the CIRPASS framework.
        </p>
      </div>

      {/* Analytics & Benchmarking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Table Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between bg-slate-900 border border-white/10 p-4 rounded-2xl">
            <h2 className="font-bold text-lg flex items-center gap-2 text-white">
              <BarChart2 className="w-5 h-5 text-indigo-400" /> Brand Rankings
            </h2>
            <div className="flex gap-2">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Textiles</option>
                <option>Electronics</option>
                <option>Batteries</option>
              </select>
              <select 
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Global</option>
                <option>EU</option>
                <option>Nordic</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold">Pos</th>
                    <th className="p-4 font-bold">Brand</th>
                    <th className="p-4 font-bold">CO₂ Reduction</th>
                    <th className="p-4 font-bold">Transparency</th>
                    <th className="p-4 font-bold">Circularity</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-white">
                  {MOCK_BRANDS.map((brand, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={brand.name} 
                      className="hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 font-black text-slate-500 group-hover:text-white transition-colors">#{brand.rank}</td>
                      <td className="p-4 font-bold">{brand.name}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={brand.co2 > 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                            {brand.co2 > 0 ? "+" : ""}{brand.co2}%
                          </span>
                          {brand.co2Trend === "up" ? (
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden w-24">
                            <div className="h-full bg-indigo-500" style={{ width: `${brand.transparency}%` }} />
                          </div>
                          <span className="font-mono text-xs">{brand.transparency}</span>
                        </div>
                      </td>
                      <td className="p-4 font-black">{brand.circularity}</td>
                      <td className="p-4">
                        {brand.status === "Verified" ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase">
                            <AlertTriangle className="w-3 h-3" /> Pending
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CO2 Tracker */}
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-400" /> Industry CO₂ Tracker
            </h3>
            <div className="h-40 bg-white/5 rounded-xl border border-white/10 flex items-end p-4 gap-2 relative">
              {/* Fake animated bar chart */}
              {[30, 45, 25, 60, 40, 75, 50, 85].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-full bg-indigo-500/50 rounded-t-sm hover:bg-indigo-400 transition-colors cursor-pointer" 
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
            </div>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Global textile CO₂ emissions over the last 12 months. Early DPP adopters show a <span className="text-emerald-400 font-bold">14% faster reduction</span> rate.
            </p>
          </div>

          {/* Consulting / Widget Portal */}
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" /> Brand Services
            </h3>
            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              Ready to legitimize your sustainability claims? Generate your embedded DPP widget.
            </p>
            <div className="bg-black/50 border border-white/10 rounded-xl p-3 mb-4 font-mono text-[10px] text-emerald-400 overflow-hidden">
              <code>&lt;script src="https://dpp.chainledger.io/widget.js"&gt;&lt;/script&gt;</code>
            </div>
            <button className="w-full bg-white text-black hover:bg-emerald-50 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              Get Certified <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
