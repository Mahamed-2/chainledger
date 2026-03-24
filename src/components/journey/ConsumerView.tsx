"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Leaf,
  Recycle,
  Wrench,
  ShoppingBag,
  Droplets,
  Wind,
  Zap,
  Award,
  Globe,
  CheckCircle2,
  ChevronDown,
  PieChart,
  TrendingDown,
  Info,
} from "lucide-react";

const CARE_ICON: Record<string, string> = {
  washing: "🫧",
  drying: "💨",
  ironing: "🔥",
  dryCleaning: "🧴",
};

const CIRCULAR_ACTIONS = [
  {
    key: "repair",
    label: "Repair",
    icon: <Wrench className="w-6 h-6" />,
    color: "from-sky-500 to-blue-600",
    desc: "Minor tear or broken zip? Order a free repair kit or find a local repair café partner.",
    cta: "Get Repair Kit →",
  },
  {
    key: "resell",
    label: "Resell",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "from-amber-400 to-orange-500",
    desc: "Link this passport to Vinted or Sellpy to guarantee authenticity and earn platform credit.",
    cta: "List on Partner →",
  },
  {
    key: "recycle",
    label: "Recycle",
    icon: <Recycle className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-600",
    desc: "Drop off at any H&M store for closed-loop recycling — we guarantee no landfill.",
    cta: "Find Drop-Off →",
  },
];

const SCORE_COLOR: Record<string, string> = {
  A: "text-emerald-400",
  B: "text-teal-400",
  C: "text-amber-400",
  D: "text-orange-500",
  E: "text-red-500",
};

export default function ConsumerView({ product }: { product: any }) {
  const [openCare, setOpenCare] = useState(false);
  const circularity = product.circularity;
  const care = circularity?.careInstructions
    ? JSON.parse(circularity.careInstructions)
    : {};
  const score = product.footprint?.score ?? "A";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> CIRPASS Verified
          </div>
        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">
                Consumer View
              </span>
              <h1 className="text-2xl font-black mt-0.5">{product.name}</h1>
              <p className="text-slate-400 text-sm">{product.brand}</p>
            </div>
            {/* Circularity badge */}
            <div className="text-center bg-white/10 rounded-2xl px-4 py-3 shrink-0">
              <p className="text-[9px] text-slate-400 uppercase font-bold">Score</p>
              <p className={`text-4xl font-black ${SCORE_COLOR[score] ?? "text-white"}`}>
                {score}
              </p>
              <p className="text-[9px] text-emerald-400 uppercase font-bold mt-1">Grade: {product.circularity?.repairabilityScore > 8 ? 'A' : 'B'}</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {product.description}
          </p>
        </motion.section>

        {/* Price Transparency */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/60 border border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-lg flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-400" /> Price Transparency
            </h2>
            <span className="text-xl font-bold">€45.00</span>
          </div>
          
          <div className="flex h-4 rounded-full overflow-hidden mb-4">
            <div className="bg-emerald-400 w-[40%]" title="Materials 40%" />
            <div className="bg-blue-400 w-[30%]" title="Labor 30%" />
            <div className="bg-amber-400 w-[15%]" title="Transport 15%" />
            <div className="bg-indigo-400 w-[15%]" title="Margin 15%" />
          </div>
          
          <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-6">
            <span className="text-emerald-400">Mat 40%</span>
            <span className="text-blue-400">Lab 30%</span>
            <span className="text-amber-400">Trns 15%</span>
            <span className="text-indigo-400">Mrg 15%</span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4">
            <p className="font-bold text-sm mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" /> Why it costs slightly more
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Organic cotton premium</span>
                <span className="text-emerald-400 font-code font-bold">+€5.00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Fair labor certification</span>
                <span className="text-emerald-400 font-code font-bold">+€3.00</span>
              </li>
              <li className="flex justify-between">
                <span>Zero-emission transport</span>
                <span className="text-emerald-400 font-code font-bold">+€2.00</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Material Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <h2 className="font-black text-lg mb-5 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-400" /> Environmental Impact
          </h2>
          
          <div className="space-y-5">
            {[
              {
                icon: <Wind className="w-4 h-4 text-emerald-400" />,
                label: "CO₂ Footprint",
                thisValue: `${product.footprint?.co2 ?? 21.7} kg`,
                avgValue: "35 kg avg",
                saving: "-38%",
                savingColor: "text-emerald-400"
              },
              {
                icon: <Droplets className="w-4 h-4 text-blue-400" />,
                label: "Water Usage",
                thisValue: `${product.footprint?.water ?? 6350} L`,
                avgValue: "12,000 L avg",
                saving: "-47%",
                savingColor: "text-blue-400"
              },
              {
                icon: <Award className="w-4 h-4 text-amber-400" />,
                label: "Durability",
                thisValue: "5 years",
                avgValue: "2 years avg",
                saving: "+150%",
                savingColor: "text-amber-400"
              }
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5 font-bold">
                  <span className="flex items-center gap-1.5">{stat.icon} {stat.label}</span>
                  <span className={stat.savingColor}>{stat.saving}</span>
                </div>
                <div className="flex bg-white/5 rounded-full h-10 border border-white/10 overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 left-0 bg-slate-700 w-full" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-wide z-10">{stat.avgValue}</span>
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: stat.saving.startsWith('+') ? '100%' : '62%' }} 
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-0 bottom-0 left-0 bg-white/10 border-r border-white/20 z-0" 
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-white z-10">{stat.thisValue}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Materials */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <h2 className="font-black text-lg mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" /> What It's Made Of
          </h2>
          <div className="space-y-3">
            {product.materials?.map((mat: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg font-black text-white shrink-0">
                  {mat.percentage}
                  <span className="text-xs">%</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{mat.name}</p>
                    {mat.standard && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 rounded uppercase">
                        {mat.standard}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {mat.origin}
                  </p>
                </div>
                <div
                  className="h-1.5 rounded-full bg-emerald-500/30 overflow-hidden"
                  style={{ width: "5rem" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mat.percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full bg-emerald-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <h2 className="font-black text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {product.certifications?.map((cert: any, i: number) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-white/5 border border-white/8 rounded-xl p-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-200 leading-snug">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Care instructions accordion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
        >
          <button
            onClick={() => setOpenCare(!openCare)}
            className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-sm flex items-center gap-2">
              🧺 Care Instructions
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${openCare ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {openCare && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                  {Object.entries(care).map(([k, v]) => (
                    <div key={k} className="bg-white/5 rounded-xl p-3">
                      <p className="text-sm">{CARE_ICON[k] ?? "•"} <span className="capitalize text-xs text-slate-400">{k}</span></p>
                      <p className="text-xs font-semibold text-white mt-0.5">{String(v)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* End-of-life / Circularity actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-slate-900 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-black text-xl mb-1">
              What to Do at End of Life?
            </h2>
            <p className="text-slate-400 text-sm mb-5">
              This product has a take-back program. Choose your circularity path:
            </p>
            <div className="grid grid-cols-3 gap-3">
              {CIRCULAR_ACTIONS.map((a) => (
                <motion.div
                  key={a.key}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/10 transition-all text-center"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${a.color} text-white`}
                  >
                    {a.icon}
                  </div>
                  <p className="font-bold text-sm">{a.label}</p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {a.desc}
                  </p>
                  <p
                    className={`text-[10px] font-bold bg-gradient-to-r ${a.color} bg-clip-text text-transparent`}
                  >
                    {a.cta}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-600 leading-relaxed">
          <Leaf className="w-3 h-3 inline mr-1 text-emerald-700" />
          Passport issued by {product.reoId} · EU Data Residency · GDPR compliant
        </p>
      </div>
    </main>
  );
}
