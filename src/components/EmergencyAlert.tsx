import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, PhoneCall, Radio, X, Cross, Activity } from 'lucide-react';

export default function EmergencyAlert() {
  return (
    <div className="flex flex-col h-full bg-white text-slate-900 font-sans relative">
      {/* Background Warning Flash */}
      <motion.div
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 bg-rose-500 z-0"
      />

      {/* High-Urgency Modal Overlay */}
      <div className="relative z-10 flex flex-col h-full p-6 pt-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] shadow-[0_30px_90px_rgba(225,29,72,0.4)] border border-rose-100 overflow-hidden flex flex-col h-full max-h-[90%]"
        >
          {/* Alert Header */}
          <div className="bg-rose-500 p-8 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <AlertCircle className="w-24 h-24 text-white" />
             </div>
             <motion.div 
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 1, repeat: Infinity }}
               className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30"
             >
               <Radio className="w-8 h-8 text-white" />
             </motion.div>
             <h2 className="text-[10px] font-black text-rose-100 uppercase tracking-[0.2em] mb-1">Critical Alert</h2>
             <h1 className="text-2xl font-black text-white tracking-tight leading-tight">HIGH BPM DETECTED<br/>(145 BPM)</h1>
          </div>

          <div className="p-6 flex-1 flex flex-col overflow-y-auto">
            <div className="flex items-center gap-3 mb-6 bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50">
               <div className="bg-rose-500 text-white p-2 rounded-xl">
                  <Activity className="w-5 h-5" />
               </div>
               <p className="text-sm font-bold text-slate-800 tracking-tight leading-tight uppercase">Warning: Instant medical response required</p>
            </div>

            {/* Map Integration */}
            <div className="flex-1 min-h-[160px] relative rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 mb-6 shadow-inner">
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/medical-emergency-map/800/800')] bg-cover opacity-60 grayscale" />
               <div className="absolute inset-0 bg-rose-500/10 mix-blend-multiply" />
               
               {/* Location Pins */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 bg-rose-500/20 rounded-full flex items-center justify-center"
                  >
                     <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-lg" />
                  </motion.div>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[8px] font-black bg-rose-600 text-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap">YOUR LOCATION</span>
               </div>

               <div className="absolute top-1/3 right-1/4">
                  <div className="bg-white p-1 rounded-sm shadow-md border border-slate-200">
                    <Cross className="w-4 h-4 text-sky-600" />
                  </div>
                  <span className="block text-[8px] font-black text-slate-900 bg-white/90 backdrop-blur-md p-1 mt-1 rounded shadow-sm border border-slate-100">METRO HOSPITAL (0.8mi)</span>
               </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full bg-rose-500 hover:bg-rose-600 px-6 py-5 rounded-[24px] text-white font-black text-sm tracking-tight flex items-center justify-center gap-3 shadow-xl shadow-rose-500/30 transition-all border-b-4 border-rose-700"
              >
                <PhoneCall className="w-5 h-5" />
                EMERGENCY: GET DIRECTIONS & CALL ER
              </motion.button>
              
              <button className="w-full bg-slate-100 hover:bg-slate-200 py-4 rounded-[20px] text-slate-500 font-bold text-xs tracking-tight flex items-center justify-center gap-2 transition-colors">
                <X className="w-4 h-4" />
                DISMISS (I AM OKAY)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
