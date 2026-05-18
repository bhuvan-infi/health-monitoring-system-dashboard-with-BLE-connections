import React from 'react';
import { motion } from 'motion/react';
import { Heart, Activity, Wind, Battery, LayoutDashboard, AlertTriangle, Cpu, Bluetooth, BluetoothOff, RefreshCcw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DashboardProps {
  onNavigate?: (screen: 'dashboard' | 'alert' | 'pairing') => void;
  currentScreen?: string;
  isConnected?: boolean;
}

export default function Dashboard({ onNavigate, currentScreen, isConnected = false }: DashboardProps) {
  const switchOptions = [
    { id: 'dashboard', name: 'Monitoring', icon: LayoutDashboard, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { id: 'alert', name: 'Emergency', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'pairing', name: 'Ecosystem', icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-slate-900 p-6 relative overflow-hidden font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 z-10">
        <div>
          <h2 className="text-sky-600 text-[10px] font-black uppercase tracking-[0.2em]">VitalPulse v2.4</h2>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Health Center</h1>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm transition-transform active:scale-95">
          <Battery className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-slate-600">82%</span>
        </div>
      </header>

      {/* Connection Center - New Top Panel */}
      <section className="mb-8 z-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Bluetooth className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-4 mb-4">
             <div className={cn(
               "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-colors",
               isConnected ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400"
             )}>
                {isConnected ? <Bluetooth className="w-6 h-6" /> : <BluetoothOff className="w-6 h-6" />}
             </div>
             <div>
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connection Center</h3>
               <p className="font-bold text-slate-700">ESP32 BAND: <span className={isConnected ? "text-sky-600" : "text-slate-400"}>{isConnected ? "CONNECTED" : "UNCONNECTED"}</span></p>
             </div>
          </div>
          <button 
            onClick={() => onNavigate?.('pairing')}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-[0.98] transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            SCAN & CONNECT NOW
          </button>
        </div>
      </section>

      {/* Dashboard Body */}
      <div className="flex flex-col gap-6 flex-1 z-10">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Live Health Dashboard</h3>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold uppercase">Real-time</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Heart Rate Ring Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="relative mb-3">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="#F1F5F9" strokeWidth="6" fill="transparent" />
                <motion.circle
                  cx="48" cy="48" r="42" stroke="#0EA5E9" strokeWidth="6" fill="transparent"
                  strokeDasharray="264"
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 - (264 * 0.72) }}
                  transition={{ duration: 1.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                <Heart className="w-4 h-4 text-sky-500 mb-1" />
                <span className="text-xl font-black text-slate-800">72</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">HEART RATE: BPM</span>
          </div>

          {/* SpO2 Ring Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="relative mb-3">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="#F1F5F9" strokeWidth="6" fill="transparent" />
                <motion.circle
                  cx="48" cy="48" r="42" stroke="#10B981" strokeWidth="6" fill="transparent"
                  strokeDasharray="264"
                  initial={{ strokeDashoffset: 264 }}
                  animate={{ strokeDashoffset: 264 - (264 * 0.98) }}
                  transition={{ duration: 1.8 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                <Wind className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-xl font-black text-slate-800">98</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">SpO2: %</span>
          </div>
        </div>

        {/* Status Normal Card */}
        <div className="bg-white rounded-3xl border border-emerald-100 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
             <div className="flex gap-2">
               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                 <Activity className="w-4 h-4" />
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                  <span className="text-sm font-bold text-emerald-600">NORMAL</span>
               </div>
             </div>
             <div className="h-6 w-20 relative">
               <svg viewBox="0 0 100 30" className="w-full h-full text-emerald-500 opacity-60">
                 <motion.path
                   d="M0 15 L20 15 L25 5 L35 25 L40 15 L60 15 L65 0 L75 30 L80 15 L100 15"
                   fill="none" stroke="currentColor" strokeWidth="2"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 3, repeat: Infinity }}
                 />
               </svg>
             </div>
          </div>
          <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            <span>Last Sync</span>
            <span>1 minute ago</span>
          </div>
        </div>
      </div>

      {/* Navigation Switcher */}
      <div className="mt-8 z-10">
        <div className="grid grid-cols-3 gap-3">
          {switchOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onNavigate?.(option.id)}
              className={cn(
                "group flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300",
                currentScreen === option.id 
                  ? "bg-white border-sky-200 shadow-md ring-2 ring-sky-50" 
                  : "bg-slate-100/50 border-transparent text-slate-400 hover:bg-slate-100"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-colors",
                currentScreen === option.id ? "bg-sky-100 text-sky-600" : "bg-white border text-slate-300"
              )}>
                <option.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
