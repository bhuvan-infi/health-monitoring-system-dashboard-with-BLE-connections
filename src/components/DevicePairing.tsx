import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bluetooth, CheckCircle2, Wifi, Zap, Smartphone, ArrowRight } from 'lucide-react';

export default function DevicePairing() {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] text-black p-8 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-64 h-64 bg-cyan-100 rounded-full blur-[80px] opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-80 h-80 bg-blue-100 rounded-full blur-[100px] opacity-60" />

      {/* Header */}
      <div className="z-10 mb-12">
        <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-1">Setup Wizard</h2>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Pairing Device</h1>
      </div>

      {/* Main Illustration Area */}
      <div className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="relative w-full aspect-square flex items-center justify-center mb-12">
          {/* Syncing Animation Rings */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-72 h-72 rounded-full border border-cyan-500/20"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-56 h-56 rounded-full border border-dashed border-cyan-500/40"
          />
          
          {/* Device Representations */}
          <div className="relative flex items-center gap-12">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              <Smartphone className="w-12 h-12 text-gray-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="z-20"
            >
               <div className="bg-white p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-gray-100 relative group">
                  {/* I'll use a placeholder for the actual band icon or image */}
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img 
                      src="/src/assets/images/esp32_health_band_1779115391602.png" 
                      alt="ESP32 Band" 
                      className="w-full h-full object-contain p-2"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="absolute -top-3 -right-3 bg-green-500 text-white p-1 rounded-full border-4 border-white shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
               </div>
            </motion.div>
          </div>

          {/* Sync Path */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
             {[0, 1, 2, 3].map((i) => (
               <motion.div
                 key={i}
                 animate={{ opacity: [0.1, 1, 0.1], x: [0, 5, 0] }}
                 transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                 className="w-1.5 h-1.5 rounded-full bg-cyan-400"
               />
             ))}
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col items-center"
          >
            <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2">
               <Bluetooth className="w-3 h-3" />
               Band Connected & Syncing
            </div>
            <p className="text-gray-500 text-sm max-w-[240px] leading-relaxed">
              Fetching encryption keys and calibrating bio-sensors...
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress Footer */}
      <div className="mt-12 z-10">
        <div className="flex justify-between items-end mb-6">
           <div className="flex gap-2">
             <div className="w-8 h-1.5 bg-cyan-500 rounded-full" />
             <div className="w-8 h-1.5 bg-cyan-500 rounded-full" />
             <motion.div 
               animate={{ width: [8, 16, 8] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="h-1.5 bg-cyan-200 rounded-full" 
             />
           </div>
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Step 02 of 03</span>
        </div>
        
        <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all hover:bg-gray-800">
          Continue
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
