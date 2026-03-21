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
    <div className="fixed bottom-4 right-4 z-[9999] bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 w-72 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-gray-900 text-sm">eIDAS 2.0 Simulator</h3>
        </div>
        <button onClick={() => setIsMinimized(true)} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-3 leading-tight">Switch your identity to see how Chainledger field-level security adapts the DPP.</p>
      
      <div className="space-y-2">
        <button 
          onClick={() => changeRole('public')}
          className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition ${role === 'public' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
        >
          Consumer (Public)
        </button>
        <button 
          onClick={() => changeRole('recycler')}
          className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition ${role === 'recycler' ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
        >
          Recycler (B2B)
        </button>
        <button 
          onClick={() => changeRole('auditor')}
          className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition ${role === 'auditor' ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
        >
          Auditor / Regulator
        </button>
        <button 
          onClick={() => changeRole('admin')}
          className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition ${role === 'admin' ? 'border-gray-800 bg-gray-900 text-white font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
        >
          Brand Admin
        </button>
      </div>
    </div>
  );
}
