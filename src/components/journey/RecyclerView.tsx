"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Recycle,
  CheckCircle2,
  XCircle,
  Globe,
  ChevronDown,
  Leaf,
  Microscope,
  Info,
} from "lucide-react";

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

const ACTION_TYPE_COLOR: Record<string, string> = {
  repair: "text-sky-400",
  recycle: "text-emerald-400",
  resell: "text-amber-400",
  upcycle: "text-purple-400",
};

export default function RecyclerView({ product }: { product: any }) {
  const [showChemicals, setShowChemicals] = useState(false);
  const circ = product.circularity;

  const careMap: Record<string, string> = circ?.careInstructions
    ? JSON.parse(circ.careInstructions)
    : {};

  // Gather all chemical treatments from processes
  const chemicals: any[] = product.processes.flatMap(
    (p: any) => p.chemicalTreatments ?? []
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-5 pt-10 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href={`/journey/${product.id}`}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
            <Recycle className="w-3.5 h-3.5" /> Recycler / Tier 2 View
          </div>
        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
        >
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">
            Circularity & Recovery Data
          </span>
          <h1 className="text-2xl font-black mt-0.5 mb-1">{product.name}</h1>
          <p className="text-slate-400 text-sm mb-5">{product.brand} · {product.sku}</p>

          {/* Key circularity numbers */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Recyclability", value: circ?.recyclability ?? 0, color: "bg-emerald-400", unit: "%" },
              { label: "Recycled Content", value: circ?.recycledContent ?? 0, color: "bg-teal-400", unit: "%" },
              { label: "Biodegradability", value: circ?.biodegradability ?? 0, color: "bg-amber-400", unit: "%" },
              { label: "Repairability Score", value: circ?.repairabilityScore ?? 0, color: "bg-sky-400", unit: "/100" },
            ].map(({ label, value, color, unit }) => (
              <div key={label} className="bg-white/5 rounded-2xl p-4">
                <div className="flex items-end justify-between mb-2">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">{label}</p>
                  <span className="text-xl font-black">
                    {value}
                    <span className="text-xs font-normal text-slate-400">{unit}</span>
                  </span>
                </div>
                <ScoreBar value={value} color={color} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Disassembly & End-of-Life */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <h2 className="font-black text-lg mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-amber-400" /> Disassembly Profile
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Disassembly Time", value: `${circ?.disassemblyTime ?? "—"} min` },
              { label: "Lifespan", value: `${circ?.estimatedLifespan ?? "—"} years` },
              { label: "Mono-Material", value: circ?.monoMaterial ? "Yes ✓" : "No ✗" },
              { label: "Compostable", value: circ?.compostability ? "Yes ✓" : "No ✗" },
              { label: "Take-Back", value: circ?.takeBackProgram ? "Active ✓" : "None ✗" },
              { label: "Spare Parts", value: circ?.sparePartsAvailable ? "Available ✓" : "None ✗" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 uppercase font-bold">{label}</p>
                <p className={`text-sm font-bold mt-0.5 ${value.includes("✓") ? "text-emerald-400" : value.includes("✗") ? "text-red-400" : "text-white"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {circ?.upcyclingPotential && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200">
                <span className="font-bold">Upcycling potential:</span>{" "}
                <span className="capitalize">{circ.upcyclingPotential}</span> — suitable for cut-and-sew upcycling, felt production, or fibre reclaim.
              </p>
            </div>
          )}
        </motion.section>

        {/* Material Recovery Map */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <h2 className="font-black text-lg mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" /> Material Recovery Breakdown
          </h2>
          <div className="space-y-3">
            {product.materials.map((mat: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/8 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-sm">{mat.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {mat.type} · {mat.origin} · {mat.percentage}% by weight
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {mat.certified ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    {mat.standard && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 rounded">
                        {mat.standard}
                      </span>
                    )}
                  </div>
                </div>
                {mat.supplier && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500">Supplier:</span>
                    <span className="text-[10px] text-slate-300 font-semibold">{mat.supplier.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      mat.supplier.tier === 4 ? "text-orange-300 border-orange-500/30 bg-orange-500/10" :
                      mat.supplier.tier === 3 ? "text-pink-300 border-pink-500/30 bg-pink-500/10" :
                      "text-blue-300 border-blue-500/30 bg-blue-500/10"
                    }`}>T{mat.supplier.tier}</span>
                  </div>
                )}
                {/* Recovery recommendation */}
                <div className="mt-2 pt-2 border-t border-white/5">
                  <p className="text-[10px] text-slate-400">
                    ♻️ Recovery path:{" "}
                    <span className="text-white font-semibold">
                      {mat.type === "Fiber" && mat.percentage >= 90
                        ? "Mechanical recycling → new yarn"
                        : mat.type === "Fabric" && mat.name.includes("Recycled")
                        ? "Already recycled — shredding → fibre reclaim"
                        : mat.type === "Fabric"
                        ? "Sorting → downcycle to insulation or wipes"
                        : "Assess composition before sorting"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Chemical Safety Accordion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
        >
          <button
            onClick={() => setShowChemicals(!showChemicals)}
            className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-sm flex items-center gap-2">
              <Microscope className="w-4 h-4 text-indigo-400" />
              Chemical Profile & REACH
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${showChemicals ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {showChemicals && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-white/8"
              >
                <div className="p-5 space-y-3">
                  {chemicals.length > 0 ? (
                    chemicals.map((chem: any, i: number) => (
                      <div key={i} className="bg-white/5 rounded-xl p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-bold">{chem.chemicalName}</p>
                            <p className="text-[10px] font-mono text-slate-400">CAS: {chem.chemicalCAS}</p>
                          </div>
                          <div className="flex gap-1">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${chem.zdhcCompliant ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                              {chem.zdhcCompliant ? 'ZDHC ✓' : 'ZDHC ✗'}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${chem.oekoTexCertified ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'}`}>
                              {chem.oekoTexCertified ? 'OEKO ✓' : 'OEKO ✗'}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-xs">
                          <div><span className="text-slate-500">Treatment: </span><span className="font-semibold">{chem.treatmentType}</span></div>
                          <div><span className="text-slate-500">Recovery: </span><span className="font-semibold">{chem.chemicalRecovery}%</span></div>
                          <div><span className="text-slate-500">WW Treatment: </span><span className="font-semibold">{chem.wastewaterTreatment}</span></div>
                          <div><span className="text-slate-500">Allergen Info: </span><span className="font-semibold">{chem.allergenInfo}</span></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 text-center py-2">No chemical treatments recorded</p>
                  )}
                  <p className="text-[10px] text-slate-500 text-center mt-3">
                    All detected substances below REACH Annex XVII thresholds.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Tier 2 Feedback */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6"
        >
          <h2 className="font-black text-lg mb-1 flex items-center gap-2">
            <Recycle className="w-5 h-5 text-amber-400" /> Submit Recovery Feedback
          </h2>
          <p className="text-slate-400 text-xs mb-4">
            Help close the loop — your input feeds back to the brand's next design cycle.
          </p>
          <div className="space-y-3">
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-amber-500/40 focus:ring-0"
              rows={3}
              placeholder="e.g. 'Cotton fibres in good condition for reclaim — zipper material unclear for sorting'"
            />
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 font-bold text-white text-sm hover:opacity-90 transition-opacity">
              Submit Feedback to Brand →
            </button>
          </div>
        </motion.section>

        <p className="text-center text-[10px] text-slate-600 pb-4">
          REO: {product.reoId} · GS1: {product.gs1Uri}
        </p>
      </div>
    </main>
  );
}
