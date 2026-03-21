"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function MaterialsPieChart({ materials }: { materials: any[] }) {
  if (!materials || materials.length === 0) return null;

  const data = materials.map((m) => ({
    name: m.name,
    value: m.percentage
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 text-white p-3 rounded-lg shadow-xl shadow-emerald-900/10">
          <p className="font-bold text-sm tracking-wide">{payload[0].name}</p>
          <p className="text-emerald-400 font-mono text-lg">{payload[0].value}% <span className="text-xs text-slate-400 font-sans">Composition</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full mt-4 relative">
      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
         <span className="text-3xl font-black text-slate-900 leading-none">100%</span>
         <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">Traceable</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
            animationBegin={500}
            animationDuration={1500}
            animationEasing="ease-out"
            cornerRadius={6}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer outline-none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
