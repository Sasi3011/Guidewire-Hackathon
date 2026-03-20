import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CloudRain, Car, Wind, AlertTriangle, ArrowRight, ChevronLeft, Layout, Zap, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RiskAnalysis = () => {
    const navigate = useNavigate();

    const factors = [
        { name: "Rain", value: "High", color: "blue", icon: CloudRain, score: 85 },
        { name: "Traffic", value: "Medium", color: "amber", icon: Car, score: 50 },
        { name: "AQI", value: "High", color: "indigo", icon: Wind, score: 92 },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-16 relative z-10">
                <div>
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4 flex items-center gap-2 hover:text-blue-500 transition-colors uppercase"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" /> Back to Matrix
                    </button>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Your Risk Insights</h1>
                    <p className="text-slate-500 font-medium text-sm">Powered by real-time environmental data.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5"><Brain className="w-5 h-5 text-blue-500" /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                
                {/* Score Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 rounded-[3.5rem] border border-red-500/20 bg-gradient-to-br from-red-600/10 to-transparent flex flex-col items-center justify-center text-center overflow-hidden"
                >
                    <div className="relative mb-8">
                        <svg className="w-48 h-48 -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                            <motion.circle 
                                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                                strokeDasharray={2 * Math.PI * 88}
                                initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                animate={{ strokeDashoffset: (2 * Math.PI * 88) * (1 - 0.72) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                                className="text-red-500"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 uppercase mb-1">Risk Score</span>
                            <span className="text-6xl font-black italic tracking-tighter uppercase text-white">72%</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mt-1 uppercase">High Risk</span>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-center gap-4 text-left w-full">
                        <div className="p-3 bg-red-500 rounded-2xl text-white shadow-xl shadow-red-500/20"><AlertTriangle className="w-5 h-5 animate-pulse" /></div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 uppercase">AI Prediction</p>
                            <p className="text-sm font-bold text-white uppercase italic tracking-tight">"Higher risk expected during evening hours"</p>
                        </div>
                    </div>
                </motion.div>

                {/* Factors Column */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 ml-4 mb-4 uppercase">Environmental Load</h4>
                    {factors.map((factor, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="glass-card p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02] flex items-center justify-between group cursor-pointer hover:bg-white/[0.05]"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-[1.5rem] bg-${factor.color}-500/10 text-${factor.color}-500 transition-colors`}>
                                    <factor.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 uppercase">Impact factor: {factor.name}</p>
                                    <h3 className="text-xl font-black italic tracking-tighter uppercase">{factor.value}</h3>
                                </div>
                            </div>
                            <div className="pr-4">
                                <Activity className={`w-5 h-5 text-${factor.color}-500/40`} />
                            </div>
                        </motion.div>
                    ))}

                    <button className="w-full bg-white text-black rounded-[2.5rem] py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-blue-500/10 mt-4 uppercase">
                        View Safe Time Slots <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RiskAnalysis;
