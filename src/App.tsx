import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, AlertTriangle, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import Dashboard from './components/Dashboard';
import EmergencyAlert from './components/EmergencyAlert';
import DevicePairing from './components/DevicePairing';
import { cn } from './lib/utils';

type Screen = 'dashboard' | 'alert' | 'pairing';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isConnected, setIsConnected] = useState(false);

  const screens: { id: Screen; name: string; icon: React.ReactNode; component: React.ReactNode }[] = [
    { id: 'dashboard', name: 'Health', icon: <LayoutDashboard size={20} />, component: <Dashboard isConnected={isConnected} onNavigate={setCurrentScreen} currentScreen='dashboard' /> },
    { id: 'alert', name: 'Alert', icon: <AlertTriangle size={20} />, component: <EmergencyAlert /> },
    { id: 'pairing', name: 'Device', icon: <Cpu size={20} />, component: <DevicePairing /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-0 md:p-8 font-sans selection:bg-cyan-500/30">
      {/* App Container / Phone Frame */}
      <div className="relative w-full max-w-[400px] h-screen md:h-[844px] bg-black md:rounded-[60px] md:border-[12px] md:border-[#1e293b] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        
        {/* Status Bar Area (Standard for Mobile) */}
        <div className="h-10 w-full flex justify-between items-center px-8 z-50 pointer-events-none">
           <div className="text-[14px] font-bold text-white/40">9:41</div>
           <div className="flex gap-1.5 items-center">
              <div className="w-4 h-4 rounded-full bg-white/10" />
              <div className="w-4 h-4 rounded-full bg-white/10" />
              <div className="w-6 h-3 rounded-md border-2 border-white/20" />
           </div>
        </div>

        {/* Dynamic Notch / Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50 border border-white/5" />

        {/* Screen Content Wrapper */}
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {currentScreen === 'dashboard' && <Dashboard onNavigate={setCurrentScreen} currentScreen={currentScreen} isConnected={isConnected} />}
              {currentScreen === 'alert' && <EmergencyAlert />}
              {currentScreen === 'pairing' && <DevicePairing />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation Navigation */}
        <nav className="h-20 bg-black/80 backdrop-blur-2xl border-t border-white/5 px-8 flex justify-between items-center z-50">
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setCurrentScreen(screen.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300",
                currentScreen === screen.id ? "text-sky-400 scale-110" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-colors",
                currentScreen === screen.id ? "bg-sky-400/10" : "bg-transparent"
              )}>
                {screen.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{screen.name}</span>
            </button>
          ))}
        </nav>

        {/* Home Indicator */}
        <div className="h-1.5 w-32 bg-white/20 rounded-full mx-auto my-2 mb-2 z-50" />
      </div>

      {/* Controller for Desktop View */}
      <div className="hidden md:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 max-w-xs">
         <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
           <h3 className="text-white font-bold mb-2">Concept Switcher</h3>
           <p className="text-gray-400 text-sm mb-4">Toggle journeys or simulate device states.</p>
           
           <div className="space-y-4">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Screens</label>
                 {screens.map(s => (
                   <button 
                     key={s.id}
                     onClick={() => setCurrentScreen(s.id)}
                     className={cn(
                       "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border",
                       currentScreen === s.id 
                         ? "bg-sky-500 border-sky-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
                         : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                     )}
                   >
                     {s.name} View
                   </button>
                 ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Device Simulation</label>
                 <button 
                   onClick={() => setIsConnected(!isConnected)}
                   className={cn(
                     "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all border",
                     isConnected 
                       ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                       : "bg-slate-500/10 border-slate-500/50 text-slate-400"
                   )}
                 >
                   <span>BLE Connection</span>
                   <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-emerald-500 animate-pulse" : "bg-slate-500")} />
                 </button>
              </div>
           </div>
         </div>
         <div className="p-4 text-xs text-gray-500 leading-relaxed font-mono">
           // VITAPULSE OS v2.4<br/>
           // SYNC: ACTIVE<br/>
           // BLE: ESP32-WROOM-32
         </div>
      </div>
    </div>
  );
}

