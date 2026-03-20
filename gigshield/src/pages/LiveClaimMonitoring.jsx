import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Clock, CheckCircle2, CloudRain, 
    AlertTriangle, ChevronLeft, Brain, Zap,
    RefreshCw, MapIcon, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveClaimMonitoring = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setStep(s => (s < 3 ? s + 1 : s));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { id: 1, label: "Processing", icon: Clock, desc: "AI is verifying the disruption data against your location history." },
        { id: 2, label: "Approved", icon: Brain, desc: "Disruption verified. Claim calculation complete and approved by GigShield." },
        { id: 3, label: "Paid", icon: CheckCircle2, desc: "₹320 has been sent to your UPI ID via instant settlement node." },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            {/* Background Decor */}
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full" />

            <button 
                onClick={() => navigate("/dashboard")}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Back to Matrix</span>
            </button>

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-600/20 rounded-lg text-cyan-500">
                        <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 uppercase tracking-widest">Live Monitoring Terminal</span>
                </div>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Claim Monitoring</h1>
                <p className="text-slate-500 font-medium">Real-time status of your active disruption protection claims.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Active Event Card */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-10 rounded-[3rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-600/10 to-transparent relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-10 text-cyan-500/5 group-hover:scale-110 transition-transform"><CloudRain className="w-48 h-48" /></div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-cyan-500 uppercase tracking-widest">Active Disruption Node</h3>
                    </div>
                    
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Heavy Rain Detected</h2>
                    <p className="text-slate-500 mb-8 uppercase text-xs font-bold tracking-widest uppercase">Location: Chennai Cluster · North Node</p>

                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-xl mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 uppercase">Impact Period</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white uppercase italic">1.5 Hours</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 uppercase">Est. Payout</span>
                            <span className="text-xl font-black italic tracking-tighter text-cyan-500 uppercase italic">₹320</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 animate-pulse uppercase">AI identifies high-intensity storm cluster</p>
                        </div>
                    </div>
                </motion.div>

                {/* Tracking Steps Column */}
                <div className="space-y-6">
                    <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-white/5 opacity-40"><RefreshCw className="w-32 h-32 animate-spin-slow" /></div>
                        
                        <h3 className="text-lg font-black italic tracking-tighter uppercase mb-8 flex items-center gap-2">
                             Progress Timeline
                        </h3>
                        
                        <div className="space-y-12 relative z-10">
                            {steps.map((s, i) => {
                                const isActive = step >= s.id;
                                const isCompleting = step === s.id;
                                
                                return (
                                    <div key={s.id} className="relative flex gap-6">
                                        {/* Connector Line */}
                                        {i < steps.length - 1 && (
                                            <div className={`absolute top-10 left-5 w-0.5 h-12 -translate-x-1/2 transition-all duration-1000 ${step > s.id ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/10'}`} />
                                        )}
                                        
                                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all group duration-1000 ${
                                            isActive ? 'bg-cyan-600 border-cyan-400 text-white shadow-xl shadow-cyan-600/40 scale-110' : 'bg-white/5 border-white/10 text-slate-600'
                                        }`}>
                                            <s.icon className={`w-5 h-5 ${isCompleting ? 'animate-pulse' : ''}`} />
                                        </div>
                                        
                                        <div className="flex-1 pt-1 opacity-100 transition-opacity">
                                            <h4 className={`text-sm font-black uppercase tracking-widest mb-1 uppercase ${isActive ? 'text-white' : 'text-slate-600'}`}>
                                                {s.label}
                                            </h4>
                                            <p className={`text-[10px] leading-relaxed uppercase font-bold tracking-wider ${isActive ? 'text-slate-400' : 'text-slate-700'}`}>
                                                {s.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 flex items-center gap-6 group hover:bg-indigo-600/20 transition-all cursor-pointer">
                        <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-xl group-hover:scale-110 transition-transform">
                            <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 uppercase">Payout Destination</p>
                            <h4 className="text-sm font-black italic tracking-tighter uppercase">example@upi · Instant Credit</h4>
                        </div>
                    </div>
                </div>
            </div>
            
            <AnimatePresence>
                {step === 3 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 p-6 glass-card rounded-full border border-green-500/30 bg-green-500/5 backdrop-blur-2xl flex items-center gap-6 shadow-2xl shadow-green-500/20 z-50"
                    >
                        <div className="p-3 bg-green-500 rounded-full text-white animate-bounce shadow-lg shadow-green-500/50">
                            <Zap className="w-5 h-5 fill-white" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 uppercase leading-none mb-1">Payment Successful</h4>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest uppercase">₹320 Settlement Dispatched</p>
                        </div>
                        <button 
                            onClick={() => navigate("/claim-details")}
                            className="px-6 py-2.5 bg-white/10 rounded-full hover:bg-white text-[9px] font-black uppercase tracking-widest text-white hover:text-black transition-all border border-white/5"
                        >
                            View Details
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveClaimMonitoring;
