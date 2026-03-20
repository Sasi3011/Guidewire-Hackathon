import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, CloudRain, AlertTriangle, ChevronRight, Layout, Globe, Activity, Zap, Compass, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DisruptionMap = () => {
    const navigate = useNavigate();
    const [zoom, setZoom] = useState(1);

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            {/* Background Map Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none -z-10" 
                 style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} 
            />
            
            {/* Header Overlay */}
            <div className="flex items-center justify-between mb-8 relative z-20 pointer-events-none">
                <div className="pointer-events-auto">
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4 flex items-center gap-2 hover:text-blue-500 transition-colors uppercase"
                    >
                        <Navigation className="w-3.5 h-3.5 rotate-[-45deg]" /> Exit Map
                    </button>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Live Disruption Map</h1>
                    <p className="text-slate-500 font-medium text-sm">Tracking risk zones in your area.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-xl pointer-events-auto shadow-2xl"><Globe className="w-5 h-5 text-blue-500 animate-spin-slow" /></div>
            </div>

            <div className="relative h-[650px] w-full rounded-[4rem] border border-white/5 bg-slate-900/40 overflow-hidden shadow-2xl relative z-10 group">
                
                {/* Mock Map Background Visuals */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none pointer-events-none">
                    <div className="w-[800px] h-[800px] border border-white/5 rounded-full" />
                    <div className="w-[600px] h-[600px] border border-white/5 rounded-full absolute" />
                    <div className="w-[400px] h-[400px] border border-white/10 rounded-full absolute" />
                    <div className="w-[200px] h-[200px] border border-white/20 rounded-full absolute flex items-center justify-center">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-4 bg-blue-600 rounded-full text-white shadow-2xl shadow-blue-500/40"
                        >
                            <MapPin className="w-6 h-6" />
                        </motion.div>
                    </div>
                </div>

                {/* Risk Zones Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* High Risk Zone */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        className="absolute translate-x-32 -translate-y-24 w-80 h-80 bg-red-500 rounded-full blur-[60px]"
                    />
                    <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="absolute translate-x-32 -translate-y-24 flex flex-col items-center"
                    >
                        <div className="p-2 bg-red-500 rounded-full text-white border-2 border-slate-900"><AlertTriangle className="w-4 h-4" /></div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-red-500 mt-2 p-1 bg-red-500/10 rounded-md border border-red-500/20">Critical Flood Zone</span>
                    </motion.div>

                    {/* Medium Risk Zone */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        className="absolute -translate-x-48 translate-y-32 w-64 h-64 bg-amber-500 rounded-full blur-[40px]"
                    />
                    <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="absolute -translate-x-48 translate-y-32 flex flex-col items-center"
                    >
                        <div className="p-2 bg-amber-500 rounded-full text-white border-2 border-slate-900"><Zap className="w-4 h-4" /></div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-amber-500 mt-2 p-1 bg-amber-500/10 rounded-md border border-amber-500/20">Heavy Congestion</span>
                    </motion.div>

                    {/* Safe Zone */}
                    <div className="absolute -translate-x-20 -translate-y-40 flex flex-col items-center">
                        <div className="p-2 bg-green-500 rounded-full text-white border-2 border-slate-900"><Shield className="w-4 h-4" /></div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-green-500 mt-2 p-1 bg-green-500/10 rounded-md border border-green-500/20">Safe Node Cluster</span>
                    </div>
                </div>

                {/* Info Card Drawer (Bottom Left) */}
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-10 left-10 p-8 glass-card rounded-[3rem] border border-red-500/20 bg-slate-900/80 backdrop-blur-2xl w-80 shadow-2xl z-20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-500 rounded-2xl text-white shadow-xl shadow-red-500/20"><CloudRain className="w-5 h-5 animate-pulse" /></div>
                        <div>
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1 uppercase leading-none">High Impact Alert</h4>
                             <p className="text-xs font-bold text-white uppercase italic tracking-tighter">Heavy Rain in Chennai</p>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-6 uppercase">Total disruption expected at 7 PM. Switch to <span className="text-white font-bold underline">Rain-Safe Hubs</span> immediately.</p>
                    <button className="w-full bg-red-600 text-white rounded-2xl py-4 font-black uppercase tracking-[0.3em] text-[9px] hover:bg-red-500 transition-all shadow-xl shadow-red-600/10 uppercase">
                        View Safe Zones <ChevronRight className="w-3 h-3 ml-2 inline-block" />
                    </button>
                </motion.div>

                {/* Legend (Right Top) */}
                <div className="absolute top-10 right-10 flex flex-col gap-4 z-20">
                    <div className="p-4 glass-card rounded-2xl border border-white/5 space-y-4 shadow-xl">
                        {[
                            { color: "red", label: "High Risk" },
                            { color: "amber", label: "Medium Risk" },
                            { color: "green", label: "Safe Zone" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full bg-${item.color}-500 shadow-lg shadow-${item.color}-500/40 animate-pulse`} />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <button className="p-4 glass-card rounded-2xl border border-white/5 pointer-events-auto hover:bg-white/10 transition-all">
                        <Compass className="w-5 h-5 text-slate-400 animate-spin-slow" />
                    </button>
                    <button className="p-4 glass-card rounded-2xl border border-white/5 pointer-events-auto hover:bg-white/10 transition-all flex flex-col gap-4 text-[10px] font-black group">
                        <div className="hover:text-blue-500">+</div>
                        <div className="hover:text-blue-500">-</div>
                    </button>
                </div>
                
                {/* Simulation Matrix Scanning Line */}
                <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[1px] bg-blue-500/40 z-30 pointer-events-none"
                    style={{ filter: 'blur(1px)', opacity: 0.5 }}
                />
            </div>
            
            <div className="flex justify-center mt-12">
                 <button className="glass-card px-10 py-5 rounded-3xl border border-white/5 font-black uppercase tracking-[0.4em] text-[10px] text-slate-500 hover:text-white hover:border-blue-500/20 transition-all uppercase flex items-center gap-3 active:scale-95">
                    Check Detailed Risk Forecast <Activity className="w-4 h-4 text-blue-500" />
                 </button>
            </div>
        </div>
    );
};

export default DisruptionMap;
