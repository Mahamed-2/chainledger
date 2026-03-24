"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf, ArrowLeft, ShieldCheck, ScanLine } from "lucide-react";

const PRODUCT_META: Record<
  string,
  {
    accent: string;
    bg: string;
    border: string;
    tag: string;
    icon: React.ReactNode;
    bottles?: string;
  }
> = {
  "CL-TSHIRT-2026": {
    accent: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    tag: "100% Organic Cotton",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full opacity-80">
        <path
          d="M20 18 L10 30 L22 34 L22 62 L58 62 L58 34 L70 30 L60 18 L50 26 C48 22 44 20 40 20 C36 20 32 22 30 26 Z"
          fill="currentColor"
          className="text-emerald-300"
        />
      </svg>
    ),
  },
  "CL-JEAN-2026": {
    accent: "from-indigo-500 to-blue-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    tag: "70% Recycled Denim",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full opacity-80">
        <path
          d="M18 16 L62 16 L70 62 L52 62 L40 46 L28 62 L10 62 Z"
          fill="currentColor"
          className="text-indigo-300"
        />
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="46"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.6"
        />
      </svg>
    ),
  },
  "CL-JACKET-2026": {
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    tag: "88% rPET Recycled",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full opacity-80">
        <path
          d="M14 22 L8 38 L24 42 L24 66 L38 66 L38 44 L42 44 L42 66 L56 66 L56 42 L72 38 L66 22 L52 28 L44 20 L36 20 L28 28 Z"
          fill="currentColor"
          className="text-amber-300"
        />
        <path
          d="M38 20 L36 30 L44 30 L42 20"
          fill="white"
          opacity="0.5"
        />
      </svg>
    ),
  },
};

interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  gs1Uri: string;
  footprint: { score: string; recycled: number; co2: number } | null;
}

export default function ScanHubClient({ products }: { products: Product[] }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-16"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span className="font-bold tracking-tight text-white">
              ChainLedger
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            EU ESPR Ready
          </div>
        </motion.header>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-6">
            <ScanLine className="w-4 h-4 text-emerald-400" />
            Digital Product Passport — Scan to begin journey
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
            Scan a Product.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Reveal its Story.
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Each garment carries a complete digital passport. Scan the QR code
            to trace every step — from raw fibre to your wardrobe.
          </p>
        </motion.div>

        {/* Three Product QR Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {products.map((product, i) => {
            const meta = PRODUCT_META[product.sku] ?? {
              accent: "from-slate-500 to-slate-700",
              bg: "bg-slate-900",
              border: "border-slate-700",
              tag: product.category,
              icon: null,
            };
            const journeyUrl = `/journey/${product.id}`;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={`relative rounded-3xl border ${meta.border} bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                >
                  {/* Gradient bar at top */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${meta.accent}`}
                  />

                  <div className="p-6">
                    {/* Product silhouette */}
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-2xl ${meta.bg} flex items-center justify-center`}
                    >
                      {meta.icon}
                    </div>

                    {/* Meta */}
                    <div className="text-center mb-5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${meta.accent} text-white mb-2`}
                      >
                        {meta.tag}
                      </span>
                      <h2 className="text-lg font-black text-white leading-tight">
                        {product.name}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        {product.brand}
                      </p>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      <div className="bg-white/5 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">
                          Score
                        </p>
                        <p className="text-xl font-black text-white">
                          {product.footprint?.score ?? "—"}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">
                          Recycled
                        </p>
                        <p className="text-xl font-black text-white">
                          {product.footprint?.recycled ?? 0}
                          <span className="text-sm font-normal text-slate-400">
                            %
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-white p-3 rounded-2xl shadow-xl ring-4 ring-white/10 group-hover:ring-white/20 transition-all">
                        <QRCodeSVG
                          value={`${
                            typeof window !== "undefined"
                              ? window.location.origin
                              : "http://localhost:3000"
                          }${journeyUrl}`}
                          size={128}
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                      <Link
                        href={journeyUrl}
                        className={`w-full py-3 rounded-xl bg-gradient-to-r ${meta.accent} text-white font-bold text-sm text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg`}
                      >
                        <ScanLine className="w-4 h-4" />
                        Begin Journey
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tree diagram hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 text-sm">
            After scanning, explore the journey as{" "}
            <span className="text-white font-semibold">Consumer</span>,{" "}
            <span className="text-white font-semibold">Brand Partner</span>, or{" "}
            <span className="text-white font-semibold">Recycler</span> —{" "}
            each stakeholder sees what matters most to them.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
