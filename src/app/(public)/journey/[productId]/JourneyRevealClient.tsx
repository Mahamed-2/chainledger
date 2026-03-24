"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import {
  ScanLine,
  ChevronRight,
  CheckCircle2,
  Leaf,
  ArrowLeft,
  User,
  Building2,
  Recycle,
  BarChart3,
  Network
} from "lucide-react";
import Link from "next/link";

// ── Per-SKU design tokens ────────────────────────────────────────────────
const SKU_THEME: Record<
  string,
  {
    gradient: string;
    glow: string;
    label: string;
    co2Label: string;
    icon: React.ReactNode;
  }
> = {
  "CL-TSHIRT-2026": {
    gradient: "from-emerald-500 to-teal-600",
    glow: "bg-emerald-500/20",
    label: "T-Shirt",
    co2Label: "Organic Cotton",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 mx-auto">
        <path
          d="M20 18 L10 30 L22 34 L22 62 L58 62 L58 34 L70 30 L60 18 L50 26 C48 22 44 20 40 20 C36 20 32 22 30 26 Z"
          fill="currentColor"
          className="text-emerald-400"
        />
      </svg>
    ),
  },
  "CL-JEAN-2026": {
    gradient: "from-indigo-500 to-blue-700",
    glow: "bg-indigo-500/20",
    label: "Jeans",
    co2Label: "Recycled Denim",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 mx-auto">
        <path
          d="M18 16 L62 16 L70 62 L52 62 L40 46 L28 62 L10 62 Z"
          fill="currentColor"
          className="text-indigo-400"
        />
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="46"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.5"
        />
      </svg>
    ),
  },
  "CL-JACKET-2026": {
    gradient: "from-amber-500 to-orange-600",
    glow: "bg-amber-500/20",
    label: "Jacket",
    co2Label: "rPET Recycled",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 mx-auto">
        <path
          d="M14 22 L8 38 L24 42 L24 66 L38 66 L38 44 L42 44 L42 66 L56 66 L56 42 L72 38 L66 22 L52 28 L44 20 L36 20 L28 28 Z"
          fill="currentColor"
          className="text-amber-400"
        />
        <path d="M38 20 L36 30 L44 30 L42 20" fill="white" opacity="0.4" />
      </svg>
    ),
  },
};

const STAKEHOLDERS = [
  {
    role: "consumer",
    label: "Consumer",
    subtitle: "Your sustainable impact",
    icon: <User className="w-8 h-8" />,
    description:
      "See the product story, material origins, sustainability score, and what to do at end-of-life.",
    color: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    role: "brand",
    label: "Brand Partner",
    subtitle: "Full supply chain visibility",
    icon: <Building2 className="w-8 h-8" />,
    description:
      "Access the complete supplier tree (Tier 1–4), compliance reports, audit logs, and quality controls.",
    color: "from-indigo-500 to-blue-700",
    border: "border-indigo-500/30",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    role: "recycler",
    label: "Recycler / Tier 2",
    subtitle: "Circularity & recovery data",
    icon: <Recycle className="w-8 h-8" />,
    description:
      "Get disassembly instructions, recyclability scores, material chemistry and recovery potential.",
    color: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
    glow: "group-hover:shadow-amber-500/20",
  },
  {
    role: "analyst",
    label: "Market Analyst",
    subtitle: "Insights & Benchmarking",
    icon: <BarChart3 className="w-8 h-8" />,
    description:
      "Analyze market trends, competitor pricing, regional demand, and consumer sentiment.",
    color: "from-blue-500 to-indigo-600",
    border: "border-blue-500/30",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    role: "supplier",
    label: "Supply Chain Partner",
    subtitle: "Upstream Transparency",
    icon: <Network className="w-8 h-8" />,
    description:
      "Monitor Tier 1-4 suppliers, compliance certificates, and real-time logistics health.",
    color: "from-purple-500 to-violet-600",
    border: "border-purple-500/30",
    glow: "group-hover:shadow-purple-500/20",
  },
];

type Step = "qr" | "reveal" | "tree";

interface ProductLike {
  id: string;
  sku: string;
  name: string;
  brand: string;
  gs1Uri: string;
  footprint: { score: string; recycled: number; co2: number } | null;
  processes: { stage: string; location: string; verified: boolean }[];
}

export default function JourneyRevealClient({
  product,
}: {
  product: ProductLike;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("qr");
  const [processIndex, setProcessIndex] = useState(0);
  const theme = SKU_THEME[product.sku] ?? SKU_THEME["CL-TSHIRT-2026"];

  // Animate supply-chain process steps in during reveal
  useEffect(() => {
    if (step !== "reveal") return;
    const interval = setInterval(() => {
      setProcessIndex((prev) => {
        if (prev >= product.processes.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [step, product.processes.length]);

  const journeyBase = `/journey/${product.id}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Ambient glow */}
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden`}
      >
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] ${theme.glow} rounded-full blur-3xl transition-opacity duration-1000 ${step === "qr" ? "opacity-40" : "opacity-20"}`}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-10 pb-20 min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/scan"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-semibold">ChainLedger</span>
          </div>
        </div>

        {/* Step progress pills */}
        <div className="flex items-center gap-2 justify-center mb-12">
          {(["qr", "reveal", "tree"] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  step === s
                    ? `w-8 bg-gradient-to-r ${theme.gradient}`
                    : (["qr", "reveal", "tree"] as Step[]).indexOf(step) > i
                    ? "w-4 bg-white/40"
                    : "w-4 bg-white/10"
                }`}
              />
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 0: QR Scan ──────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {step === "qr" && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center flex-1 justify-center gap-8"
            >
              <div className="text-center">
                <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">
                  Digital Product Passport
                </p>
                <h1 className="text-4xl font-black mb-1">{product.name}</h1>
                <p className="text-slate-400">{product.brand}</p>
              </div>

              {/* Animated QR card */}
              <div className="relative">
                {/* Scanning bar animation */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${theme.gradient} opacity-20 blur-xl`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-white p-4 rounded-3xl shadow-2xl ring-8 ring-white/5">
                  <QRCodeSVG
                    value={`${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}${journeyBase}`}
                    size={200}
                    level="M"
                    includeMargin={false}
                  />
                  {/* Scanning line overlay */}
                  <motion.div
                    className={`absolute left-4 right-4 h-0.5 bg-gradient-to-r ${theme.gradient} opacity-70`}
                    animate={{ top: ["20%", "80%", "20%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-slate-400 text-sm">
                  Point your camera at the QR code, or —
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setStep("reveal"); setProcessIndex(0); }}
                  className={`flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${theme.gradient} font-bold text-white shadow-xl`}
                >
                  <ScanLine className="w-5 h-5" /> Simulate Scan & Reveal
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1: Product Reveal ──────────────────────────── */}
          {step === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col flex-1 justify-center gap-8"
            >
              {/* Hero card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-md">
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  {theme.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div
                    className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${theme.gradient} text-white mb-3`}
                  >
                    {theme.label} · {theme.co2Label}
                  </div>
                  <h2 className="text-3xl font-black mb-1">{product.name}</h2>
                  <p className="text-slate-400 text-sm mb-6">{product.brand}</p>

                  {/* Score badges */}
                  <div className="flex justify-center gap-4">
                    <div className="bg-white/10 rounded-2xl px-5 py-3">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">
                        Circularity
                      </p>
                      <p className="text-3xl font-black">
                        {product.footprint?.score ?? "—"}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-2xl px-5 py-3">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">
                        Recycled
                      </p>
                      <p className="text-3xl font-black">
                        {product.footprint?.recycled ?? 0}
                        <span className="text-lg font-normal text-slate-400">
                          %
                        </span>
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-2xl px-5 py-3">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">
                        CO₂ kg
                      </p>
                      <p className="text-3xl font-black">
                        {product.footprint?.co2 ?? "—"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Animated supply chain journey nodes */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">
                  Supply Chain Journey
                </p>
                <div className="space-y-2">
                  {product.processes.map((p, i) => (
                    <AnimatePresence key={i}>
                      {i <= processIndex && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {p.stage}
                            </p>
                            <p className="text-xs text-slate-400">{p.location}</p>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">
                            Verified
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: processIndex >= product.processes.length - 1 ? 1 : 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("tree")}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r ${theme.gradient} font-bold text-white shadow-xl`}
              >
                Choose Your View <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 2: Stakeholder Tree ────────────────────────── */}
          {step === "tree" && (
            <motion.div
              key="tree"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col flex-1 justify-center gap-6"
            >
              <div className="text-center">
                <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">
                  Who are you?
                </p>
                <h2 className="text-3xl font-black mb-1">
                  Select Your Partner View
                </h2>
                <p className="text-slate-400 text-sm">
                  Each stakeholder sees the data that matters most to their role.
                </p>
              </div>

              {/* Tree connector SVG */}
              <div className="relative flex flex-col items-center">
                {/* Root node */}
                <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-2xl px-5 py-3 mb-2 backdrop-blur-md">
                  {theme.icon && (
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center text-slate-300">
                      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                        <rect width="80" height="80" rx="16" fill="white" fillOpacity="0.05" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">
                      Product
                    </p>
                    <p className="font-black text-white text-sm">{product.name}</p>
                  </div>
                  <div
                    className={`ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r ${theme.gradient} text-white`}
                  >
                    {product.footprint?.score ?? "A"}
                  </div>
                </div>

                {/* Branch lines SVG - Updated for 5 nodes */}
                <svg
                  width="440"
                  height="56"
                  viewBox="0 0 440 56"
                  className="w-full max-w-lg"
                >
                  {/* Far Left */}
                  <path
                    d="M220 0 L220 28 L50 28 L50 56"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 3"
                  />
                  {/* Left */}
                  <path
                    d="M220 0 L220 28 L135 28 L135 56"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 3"
                  />
                  {/* Middle */}
                  <path
                    d="M220 0 L220 56"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 3"
                  />
                  {/* Right */}
                  <path
                    d="M220 0 L220 28 L305 28 L305 56"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 3"
                  />
                  {/* Far Right */}
                  <path
                    d="M220 0 L220 28 L390 28 L390 56"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 3"
                  />
                </svg>

                {/* Stakeholder cards - Updated to 5 columns */}
                <div className="grid grid-cols-5 gap-2 w-full max-w-2xl">
                  {STAKEHOLDERS.map((s, i) => (
                    <motion.button
                      key={s.role}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => router.push(`${journeyBase}/${s.role}`)}
                      className={`group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border ${s.border} backdrop-blur-md hover:bg-white/10 transition-all duration-200 hover:shadow-xl ${s.glow} text-center cursor-pointer`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${s.color} text-white shadow-lg`}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          {s.label}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {s.subtitle}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed hidden group-hover:block transition-all">
                        {s.description}
                      </p>
                      <div
                        className={`mt-auto flex items-center gap-1 text-[10px] font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}
                      >
                        Enter View <ChevronRight className="w-3 h-3 text-current" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
