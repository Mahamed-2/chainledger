'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RoleSwitcher() {
  const [role, setRole] = useState('public');
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Read current cookie role
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return 'public';
    };
    setRole(getCookie('demo_eidas_role') || 'public');
  }, []);

  const changeRole = (newRole: string) => {
    document.cookie = `demo_eidas_role=${newRole}; path=/; max-age=86400`;
    setRole(newRole);
    // Force refresh to trigger middleware & re-render with new permissions
    router.refresh(); 
  };

  // Only render in DEMO mode
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true' && false) return null;

  if (isMinimized) {
    return (
      <button 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-[9999] bg-indigo-600 text-white shadow-xl rounded-full p-4 hover:bg-indigo-700 transition-colors flex items-center justify-center group"
        title="Open eIDAS Simulator"
      >
        <ShieldAlert className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-slate-900/80 border border-white/10 shadow-2xl rounded-2xl p-4 w-72 backdrop-blur-xl transition-all ring-1 ring-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-sm">eIDAS 2.0 Simulator</h3>
        </div>
        <button onClick={() => setIsMinimized(true)} className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-medium">Switch identities to see how ChainLedger field-level security adapts the DPP view.</p>
      
      <div className="space-y-2">
        {[
          { id: 'public', label: 'Consumer (Public)', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' },
          { id: 'recycler', label: 'Recycler (B2B)', color: 'border-amber-500/50 bg-amber-500/10 text-amber-400' },
          { id: 'analyst', label: 'Market Analyst', color: 'border-blue-500/50 bg-blue-500/10 text-blue-400' },
          { id: 'supplier', label: 'Supply Chain Partner', color: 'border-purple-500/50 bg-purple-500/10 text-purple-400' },
          { id: 'admin', label: 'Brand Admin (Full)', color: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400' },
        ].map((btn) => (
          <button 
            key={btn.id}
            onClick={() => changeRole(btn.id)}
            className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${
              role === btn.id 
                ? `${btn.color} font-black ring-1 ring-white/10` 
                : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Secured by REO</span>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </div>
  );
}
