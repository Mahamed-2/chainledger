'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { LatLngTuple } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Layers, Clock, X, CheckCircle2, Factory, Factory as FactoryBorder, Truck, Globe, ShieldAlert, Award } from 'lucide-react';
import { FadeIn, SlideIn, StaggerContainer } from '@/components/motion/MotionSystem';
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet elements (SSR fix)
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });

// Next.js leaflet fix
const fixLeafletIcons = () => {
  import('leaflet').then(L => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });
  });
};

export default function EnhancedSupplyChainMap({ processes }: { processes: any[] }) {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'timeline'>('map');
  const [activeStage, setActiveStage] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'raw' | 'manufacturing' | 'distribution'>('all');
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    fixLeafletIcons();
    setMounted(true);
  }, []);

  // Center calculation
  const centerLat = processes[Math.floor(processes.length / 2)]?.latitude || 48.0;
  const centerLng = processes[Math.floor(processes.length / 2)]?.longitude || 14.0;
  const center: LatLngTuple = [centerLat, centerLng];

  // Filtering logic
  const filteredProcesses = useMemo(() => {
    return processes.filter(p => {
      if (filter === 'all') return true;
      const lowerStage = p.stage.toLowerCase();
      if (filter === 'raw' && lowerStage.includes('raw')) return true;
      if (filter === 'manufacturing' && (lowerStage.includes('spin') || lowerStage.includes('dye') || lowerStage.includes('assembly'))) return true;
      if (filter === 'distribution' && (lowerStage.includes('distrib') || lowerStage.includes('retail'))) return true;
      return false;
    }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }, [processes, filter]);

  const positions: LatLngTuple[] = filteredProcesses.filter(p => p.latitude && p.longitude).map(p => [p.latitude, p.longitude]);

  if (!mounted) {
    return <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-[2rem] flex items-center justify-center border border-slate-200"><Map className="w-10 h-10 text-slate-300" /></div>;
  }

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col h-[600px] font-sans">
      
      {/* Header Controls */}
      <div className="bg-white border-b border-slate-100 p-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 z-20 shadow-sm relative">
         <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
               <Globe className="w-5 h-5 text-emerald-500" /> Supply Chain Map
            </h3>
         </div>

         {/* Filter Chips */}
         <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['all', 'raw', 'manufacturing', 'distribution'].map(f => (
               <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${filter === f ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
               >
                  {f}
               </button>
            ))}
         </div>

         {/* View Toggles & Overlays */}
         <div className="flex items-center gap-2 self-end md:self-auto">
            <button onClick={() => setShowHeatmap(!showHeatmap)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${showHeatmap ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`} title="Toggle Risk Heatmap">
               <Layers className="w-4 h-4" />
            </button>
            <div className="bg-slate-100 p-1 rounded-xl flex">
               <button onClick={() => setViewMode('map')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}><Map className="w-4 h-4" /></button>
               <button onClick={() => setViewMode('timeline')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'timeline' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}><Clock className="w-4 h-4" /></button>
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-hidden bg-slate-50">
         
         {/* Map View */}
         {viewMode === 'map' && (
            <MapContainer center={center} zoom={3} scrollWheelZoom={false} className="h-full w-full z-0">
               <TileLayer
                  attribution='&copy; CARTO'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
               />
               
               {/* Risk Heatmap Fake Layer overlay */}
               {showHeatmap && filteredProcesses.map((proc, i) => (
                  <CircleMarker 
                     key={`heat-${i}`} 
                     center={[proc.latitude, proc.longitude]} 
                     radius={40} 
                     pathOptions={{ color: 'none', fillColor: proc.stage.includes('Dyeing') ? '#ef4444' : '#f59e0b', fillOpacity: 0.2 }}
                  />
               ))}

               {/* Animated Route Line */}
               {positions.length > 1 && (
                  <Polyline 
                     positions={positions} 
                     color="#10b981" 
                     weight={3} 
                     opacity={0.8}
                     dashArray="10, 10"
                     className="animate-[dash_20s_linear_infinite]"
                  />
               )}
               <style dangerouslySetInnerHTML={{__html: `
                 @keyframes dash { to { stroke-dashoffset: -1000; } }
               `}} />

               {/* Stage Markers */}
               {filteredProcesses.map((proc, index) => {
                  if (!proc.latitude || !proc.longitude) return null;
                  return (
                     <Marker 
                        key={proc.id} 
                        position={[proc.latitude, proc.longitude]}
                        eventHandlers={{ click: () => setActiveStage(proc) }}
                     />
                  );
               })}
            </MapContainer>
         )}

         {/* Timeline View */}
         {viewMode === 'timeline' && (
            <div className="h-full overflow-y-auto p-8 relative">
               <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-emerald-200"></div>
               <StaggerContainer staggerDelay={100} className="space-y-8 relative z-10">
                  {filteredProcesses.map((proc, index) => (
                     <motion.div key={proc.id} variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }} className="flex gap-6 items-start cursor-pointer group" onClick={() => setActiveStage(proc)}>
                        <div className="w-8 h-8 rounded-full bg-emerald-500 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 mt-1 group-hover:bg-emerald-600 transition-colors">
                           <span className="text-white text-[10px] font-bold">{index + 1}</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex-1 hover:shadow-md transition-shadow group-hover:border-emerald-200">
                           <div className="flex justify-between items-start mb-2">
                              <div>
                                 <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{proc.stage}</h4>
                                 <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><Globe className="w-3.5 h-3.5"/> {proc.location}</p>
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded">{new Date(proc.timestamp).toLocaleDateString()}</span>
                           </div>
                           <p className="text-xs text-slate-400 font-mono mt-3 truncate break-all bg-slate-50 p-2 rounded border border-slate-100">Hash: {proc.hash}</p>
                        </div>
                     </motion.div>
                  ))}
               </StaggerContainer>
            </div>
         )}

         {/* Slide-In Stage Detail Panel */}
         <AnimatePresence>
            {activeStage && (
               <motion.div 
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] z-50 flex flex-col border-l border-slate-200"
               >
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                     <h3 className="font-bold text-slate-900">Stage Details</h3>
                     <button onClick={() => setActiveStage(null)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm border border-slate-200 transition-colors"><X className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                     <div>
                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-wider rounded-md mb-3">Blockchain Verified</span>
                        <h2 className="text-2xl font-black text-slate-900 leading-tight mb-2">{activeStage.stage}</h2>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                           <Globe className="w-4 h-4" /> {activeStage.location}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                           <Clock className="w-4 h-4" /> {new Date(activeStage.timestamp).toLocaleDateString()}
                        </div>
                     </div>

                     {/* Provider Info */}
                     {activeStage.supplier && (
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-2"><Factory className="w-4 h-4"/> Certified Supplier</h4>
                           <p className="font-bold text-slate-800">{activeStage.supplier.name}</p>
                           <p className="text-xs text-slate-500 mt-1">Tier {activeStage.supplier.tier} Facility</p>
                        </div>
                     )}

                     {/* Social Compliance Stats */}
                     {activeStage.socialCompliance && activeStage.socialCompliance.length > 0 && (
                        <div>
                           <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2"><Award className="w-4 h-4"/> Social Audit Data</h4>
                           <div className="grid grid-cols-2 gap-3">
                              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                                 <span className="block text-2xl font-black text-blue-700">{activeStage.socialCompliance[0].workerCount}</span>
                                 <span className="text-[10px] font-bold uppercase text-blue-600">Total Workers</span>
                              </div>
                              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3">
                                 <span className="block text-2xl font-black text-emerald-700">{activeStage.socialCompliance[0].femaleWorkerPercentage}%</span>
                                 <span className="text-[10px] font-bold uppercase text-emerald-600">Female Rep.</span>
                              </div>
                              <div className="col-span-2 bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                                 <span className="text-xs font-bold text-slate-600">Living Wage Compliance</span>
                                 {activeStage.socialCompliance[0].livingWageCompliance ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <ShieldAlert className="w-5 h-5 text-rose-500" />}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Chemical Treatments */}
                     {activeStage.chemicalTreatments && activeStage.chemicalTreatments.length > 0 && (
                        <div>
                           <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Chemical Process</h4>
                           <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100">
                              <p className="font-bold text-rose-900 text-sm mb-1">{activeStage.chemicalTreatments[0].chemicalName}</p>
                              <p className="text-xs text-rose-700 font-mono mb-3">CAS: {activeStage.chemicalTreatments[0].chemicalCAS}</p>
                              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-rose-200/50">
                                 <div className="text-xs"><span className="block text-rose-400 font-semibold">pH Level</span><span className="font-bold text-rose-800">{activeStage.chemicalTreatments[0].pHLevel}</span></div>
                                 <div className="text-xs"><span className="block text-rose-400 font-semibold">ZDHC</span><span className="font-bold text-emerald-600">Compliant</span></div>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Digital Twin Hash */}
                     <div className="pt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Cryptographic Proof</span>
                        <div className="bg-slate-900 rounded-xl p-3 overflow-hidden">
                           <code className="text-[10px] text-emerald-400 break-all leading-relaxed">
                              {activeStage.hash}
                           </code>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
