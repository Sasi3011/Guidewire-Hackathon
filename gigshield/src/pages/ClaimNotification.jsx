import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, CheckCircle2, TrendingUp, ArrowRight, Shield, Zap, IndianRupee, BellRing, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClaimNotification = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const timer = setTimeout(() => setStatus("success"), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo flex flex-col items-center justify-center">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <motion.div 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] text-white shadow-2xl shadow-blue-500/40 mb-8 relative"
                    >
                        <BellRing className="w-10 h-10" />
                        <motion.div 
                             animate={{ scale: [1, 1.3, 1], opacity: [0, 1, 0] }}
                             transition={{ duration: 2, repeat: Infinity }}
                             className="absolute inset-0 bg-white rounded-full p-5"
                        />
                    </motion.div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2 leading-none uppercase">Disruption Detected</h1>
                    <p className="text-slate-500 font-medium text-sm tracking-tight">Heavy rain detected in your area.</p>
                </div>

                <div className="glass-card p-10 rounded-[4rem] border border-white/5 relative bg-white/[0.02] overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-white/5"><CloudRain className="w-24 h-24" /></div>
                    
                    <div className="space-y-8 relative z-10">
                        <div className="p-5 bg-white/5 border border-white/5 rounded-3xl space-y-3">
                            <div className="flex items-center gap-3 text-slate-500">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest uppercase">Income Impact Analysis</span>
                            </div>
                            <p className="text-xs font-bold text-white uppercase italic tracking-tight uppercase">Estimated income loss detected.</p>
                        </div>

                        <div className="text-center py-6">
                            <AnimatePresence mode="wait">
                                {status === "loading" ? (
                                    <motion.div key="loading" exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "0%" }}
                                                transition={{ duration: 2, ease: "easeInOut" }}
                                                className="w-full h-full bg-blue-600"
                                            />
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500 animate-pulse uppercase">Initiating Instant Payout...</p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-green-500 uppercase flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" /> Payment Successful
                                        </p>
                                        <div className="flex items-center justify-center gap-3 relative">
                                            <span className="text-6xl font-black italic tracking-tighter uppercase text-white tracking-tighter">₹320</span>
                                            <motion.div 
                                                initial={{ scale: 0, rotate: -20 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                className="p-2 bg-green-500 rounded-xl text-white block"
                                            >
                                                <Sparkles className="w-4 h-4" />
                                            </motion.div>
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 uppercase">Credited Instantly to your VPA</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button 
                            disabled={status === "loading"}
                            onClick={() => navigate("/claim-details")}
                            className={`w-full rounded-2xl py-6 font-black uppercase tracking-[0.3em] text-[11px] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 ${
                                status === "loading" ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' : 'bg-white text-black hover:bg-slate-200'
                            }`}
                        >
                            View Claim Details <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <p className="mt-12 text-center text-[9px] font-black uppercase tracking-widest text-slate-600 leading-relaxed uppercase">
                    Your <span className="text-slate-400">Rain Coverage</span> was triggered automatically via <br/> <span className="text-blue-500">Environmental Node Validation</span>.
                </p>
            </motion.div>
        </div>
    );
};

export default ClaimNotification;
