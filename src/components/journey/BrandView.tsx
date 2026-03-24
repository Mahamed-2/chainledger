"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  XCircle,
  ChevronDown,
  FileText,
  Users,
  ShieldCheck,
  Layers,
  Globe,
  BarChart3,
  Download,
  Activity,
} from "lucide-react";

const TIER_COLOR: Record<number, string> = {
  1: "bg-blue-500/20 border-blue-500/30 text-blue-300",
  2: "bg-purple-500/20 border-purple-500/30 text-purple-300",
  3: "bg-pink-500/20 border-pink-500/30 text-pink-300",
  4: "bg-orange-500/20 border-orange-500/30 text-orange-300",
};

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("en-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BrandView({ product }: { product: any }) {
  const [openProcess, setOpenProcess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"chain" | "compliance" | "quality" | "analytics">(
    "chain"
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 pt-10 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href={`/journey/${product.id}`}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
            <Building2 className="w-3.5 h-3.5" /> Brand Partner View
          </div>
        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">
                Full Transparency · B2B
              </span>
              <h1 className="text-2xl font-black mt-0.5">{product.name}</h1>
              <p className="text-slate-400 text-sm">{product.brand} · {product.sku}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                  product.shaclValidationStatus === "Valid"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {product.shaclValidationStatus === "Valid" ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> SHACL Valid
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Invalid
                  </span>
                )}
              </span>
              <span className="text-[9px] text-slate-500 font-mono">
                REO: {product.reoId}
              </span>
            </div>
          </div>

          <div className="mt-2 mb-4 flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 text-xs font-bold transition-colors">
              <Download className="w-4 h-4" /> Export Sustainability Report
            </button>
          </div>

          {/* Quick KPIs */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { label: "Suppliers", value: new Set(product.processes.filter((p: any) => p.supplierId).map((p: any) => p.supplierId)).size },
              { label: "Processes", value: product.processes.length },
              { label: "Certs", value: product.certifications.length },
              { label: "CO₂ kg", value: product.footprint?.co2 ?? 0 },
            ].map((k) => (
              <div key={k.label} className="bg-white/5 rounded-xl p-2.5 text-center">
                <p className="text-xl font-black">{k.value}</p>
                <p className="text-[9px] text-slate-400 uppercase font-semibold">{k.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Tab Bar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-1 flex gap-1">
          {(
            [
              { id: "chain", label: "Supply Chain", icon: <Layers className="w-3.5 h-3.5" /> },
              { id: "compliance", label: "Compliance", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
              { id: "quality", label: "Quality", icon: <Activity className="w-3.5 h-3.5" /> },
              { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-3.5 h-3.5" /> },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── SUPPLY CHAIN TAB ── */}
          {activeTab === "chain" && (
            <motion.div
              key="chain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold px-1">
                Full Process Ledger — Tier 1 → 4
              </p>
              {product.processes.map((proc: any, i: number) => (
                <motion.div
                  key={proc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenProcess(openProcess === proc.id ? null : proc.id)
                    }
                    className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
                  >
                    {/* Step number */}
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-black text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white truncate">{proc.stage}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> {proc.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {proc.supplier && (
                        <span
                          className={`px-2 py-0.5 text-[9px] font-bold rounded border uppercase ${TIER_COLOR[proc.supplier.tier] ?? ""}`}
                        >
                          T{proc.supplier.tier}
                        </span>
                      )}
                      {proc.verified ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openProcess === proc.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openProcess === proc.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/8"
                      >
                        <div className="p-4 space-y-3">
                          {/* Hash */}
                          <div className="bg-slate-900/60 rounded-xl p-3">
                            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                              Blockchain Hash
                            </p>
                            <p className="text-xs font-mono text-emerald-400 break-all">
                              {proc.hash}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-slate-500 uppercase font-bold text-[9px]">Date</p>
                              <p className="text-white">{formatDate(proc.timestamp)}</p>
                            </div>
                            {proc.supplier && (
                              <div>
                                <p className="text-slate-500 uppercase font-bold text-[9px]">Supplier</p>
                                <p className="text-white">{proc.supplier.name}</p>
                              </div>
                            )}
                          </div>

                          {/* Social compliance */}
                          {proc.socialCompliance && (
                            <div className="bg-white/5 rounded-xl p-3">
                              <p className="text-[10px] text-slate-400 uppercase font-bold mb-2 flex items-center gap-1">
                                <Users className="w-3 h-3" /> Social Audit
                              </p>
                              <div className="grid grid-cols-2 gap-1.5 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Standard</span>
                                  <span className="font-semibold">{proc.socialCompliance.auditStandard}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Result</span>
                                  <span className={`font-semibold ${proc.socialCompliance.auditResult === 'approved' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {proc.socialCompliance.auditResult}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Workers</span>
                                  <span className="font-semibold">{proc.socialCompliance.workerCount}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Child Labour</span>
                                  <span className={`font-semibold ${proc.socialCompliance.childLaborFree ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {proc.socialCompliance.childLaborFree ? 'Free ✓' : 'Risk ✗'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Living Wage</span>
                                  <span className={`font-semibold ${proc.socialCompliance.livingWageCompliance ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {proc.socialCompliance.livingWageCompliance ? 'Compliant ✓' : 'Partial'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Safety incidents</span>
                                  <span className={`font-semibold ${proc.socialCompliance.safetyIncidents === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {proc.socialCompliance.safetyIncidents}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── COMPLIANCE TAB ── */}
          {activeTab === "compliance" && (
            <motion.div
              key="compliance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* CIRPASS status */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" /> CIRPASS / ESPR Status
                </h3>
                {[
                  { label: "SHACL Validation", value: product.shaclValidationStatus, ok: product.shaclValidationStatus === 'Valid' },
                  { label: "eIDAS Access Level", value: product.eidasAccessLevel.toUpperCase(), ok: true },
                  { label: "GS1 Digital Link", value: product.gs1Uri.slice(0, 40) + '…', ok: true },
                  { label: "REO Identified", value: product.reoId, ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-200 text-right max-w-[180px] truncate">{item.value}</span>
                      {item.ok ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" /> Certificates
                </h3>
                {product.certifications.map((cert: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-semibold">{cert.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{cert.number}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400">Exp: {formatDate(cert.expiry)}</span>
                      <br />
                      <span className={`text-[10px] font-bold ${new Date(cert.expiry) > new Date() ? 'text-emerald-400' : 'text-red-400'}`}>
                        {new Date(cert.expiry) > new Date() ? 'Active' : 'Expired'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Materials detail */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-sm mb-3">Ingredient Transparency</h3>
                {product.materials.map((mat: any, i: number) => (
                  <div key={i} className="py-2.5 border-b border-white/5 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-xs font-semibold">{mat.name}</p>
                        <p className="text-[10px] text-slate-400">{mat.origin} · {mat.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black">{mat.percentage}%</span>
                        {mat.standard && <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 rounded">{mat.standard}</span>}
                      </div>
                    </div>
                    {mat.quality?.[0] && (
                      <div className="grid grid-cols-3 gap-1 mt-2">
                        {[
                          ['Batch', mat.quality[0].batchNumber],
                          ['Pesticide Free', mat.quality[0].pesticideFree ? 'Yes ✓' : 'No ✗'],
                          ['Soil Score', mat.quality[0].soilHealthScore + '/10'],
                        ].map(([l, v]) => (
                          <div key={l} className="bg-white/5 rounded-lg p-1.5">
                            <p className="text-[9px] text-slate-500 uppercase">{l}</p>
                            <p className="text-[10px] font-semibold text-slate-200 truncate">{v}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── QUALITY TAB ── */}
          {activeTab === "quality" && (
            <motion.div
              key="quality"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {product.qualityControls.map((qc: any, i: number) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold">Quality Inspection #{i + 1}</p>
                      <p className="text-xs text-slate-400">{formatDate(qc.inspectionDate)} · {qc.testStandard}</p>
                    </div>
                    <span className={`text-3xl font-black ${qc.overallGrade === 'A' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {qc.overallGrade}
                    </span>
                  </div>
                  {qc.measurements && (
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Measurements</p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(JSON.parse(qc.measurements)).map(([k, v]) => (
                          <div key={k} className="bg-white/5 rounded-xl p-2.5">
                            <p className="text-[9px] text-slate-400 uppercase">{k.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="text-sm font-bold">{String(v)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Result:</span>
                    <span className={`text-xs font-bold ${qc.testResult === 'pass' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {qc.testResult.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-500">· Inspector: {qc.inspectorId}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" /> Digital Shelf Analytics
                  </h3>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-full">+12% WoW</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-slate-900/60 rounded-xl p-4">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Total Views</p>
                    <p className="text-2xl font-black text-white">12,450</p>
                  </div>
                  <div className="bg-slate-900/60 rounded-xl p-4">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Conversion Rate</p>
                    <p className="text-2xl font-black text-white">3.2%</p>
                  </div>
                  <div className="bg-slate-900/60 col-span-2 rounded-xl p-4">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Sustainability Engagement</p>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-black text-white">67%</p>
                      <span className="text-xs text-emerald-400">+23% vs avg</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Users who viewed the DPP before purchasing</p>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-2">Top Channels</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs bg-white/5 p-2 rounded-lg">
                      <span className="font-semibold w-1/3">Shopify</span>
                      <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden mx-2">
                        <div className="bg-indigo-400 h-full w-[65%]" />
                      </div>
                      <span className="text-slate-400 w-12 text-right">8.2k</span>
                    </div>
                    <div className="flex items-center justify-between text-xs bg-white/5 p-2 rounded-lg">
                      <span className="font-semibold w-1/3">Amazon</span>
                      <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden mx-2">
                        <div className="bg-indigo-400 h-full w-[35%]" />
                      </div>
                      <span className="text-slate-400 w-12 text-right">4.2k</span>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
                  <p className="text-[10px] text-indigo-300 uppercase font-bold mb-1">AI Recommendation</p>
                  <p className="text-xs text-indigo-100 leading-relaxed">
                    Adding the new Circularity Grade badge to your Amazon product images is projected to boost conversion by 12%.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
