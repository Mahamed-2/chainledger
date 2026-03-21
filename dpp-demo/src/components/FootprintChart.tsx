"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function FootprintChart({ footprint }: { footprint: any }) {
  if (!footprint) return null;

  // Normalize data for the radar chart to make it visually balanced (0-100 scale based on industry benchmark)
  const data = [
    { subject: 'Carbon', A: Math.max(0, 100 - (footprint.co2 / 50 * 100)), fullMark: 100 },
    { subject: 'Water', A: Math.max(0, 100 - (footprint.water / 10000 * 100)), fullMark: 100 },
    { subject: 'Energy', A: Math.max(0, 100 - (footprint.energy / 200 * 100)), fullMark: 100 },
    { subject: 'Circularity', A: footprint.score || 0, fullMark: 100 },
    { subject: 'Recycled', A: footprint.recycled || 0, fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg shadow-xl shadow-emerald-900/10">
          <p className="font-bold text-sm tracking-wide mb-1">{payload[0].payload.subject}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-emerald-400 font-mono text-lg">{Math.round(payload[0].value)}/100</p>
            <span className="text-[10px] text-slate-400 font-sans uppercase">Score</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 max-w-[120px]">
            Higher score indicates better environmental performance vs industry average.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[350px] w-full mt-2 relative group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.05)_0%,transparent_70%)] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
      
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: '#cbd5e1', fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Product Score"
            dataKey="A"
            stroke="#10b981"
            strokeWidth={2}
            fill="#34d399"
            fillOpacity={0.4}
            animationBegin={300}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
