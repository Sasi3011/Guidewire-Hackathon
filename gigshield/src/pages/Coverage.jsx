import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, ArrowUpRight, Clock, AlertTriangle, ShieldCheck, ChevronRight, Settings, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Coverage = () => {
    const navigate = useNavigate();

    const plan = {
        title: "Intermediate",
        coverage: "₹4,000",
        premium: "₹150",
        status: "Active Protection Enabled",
        riskLevel: "Medium Risk",
        nextBilling: "Sunday, 24th March",
        color: "blue"
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            {/* Background Decor */}
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            {/* Header */}
            <div className="flex items-center justify-between mb-16 relative z-10">
                <div>
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4 flex items-center gap-2 hover:text-blue-500 transition-colors"
                    >
                        <ChevronRight className="w-3 h-3 rotate-180" /> Back to Matrix
                    </button>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Your Protection Plan</h1>
                    <p className="text-slate-500 font-medium text-sm">Stay covered against real-time disruptions.</p>
                </div>
                <button className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                    <Settings className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                
                {/* Main Plan Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 glass-card p-10 rounded-[3.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-transparent relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="flex flex-col md:flex-row justify-between gap-12 relative z-10">
                        <div className="space-y-10">
                            <div>
                                <div className="p-4 bg-blue-500 rounded-3xl text-white shadow-2xl shadow-blue-500/40 mb-6 inline-block">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2 leading-none uppercase">{plan.title}</h2>
                                <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px]">{plan.status}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Weekly Coverage</p>
                                    <p className="text-3xl font-black italic tracking-tighter text-white uppercase">{plan.coverage}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Premium</p>
                                    <p className="text-3xl font-black italic tracking-tighter text-white uppercase">{plan.premium}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-start md:items-end">
                            <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 space-y-4 w-full md:w-64">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Risk Level</span>
                                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[9px] font-black uppercase border border-amber-500/20">{plan.riskLevel}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Billing Cycle</span>
                                    <span className="text-[10px] font-bold text-white uppercase">Weekly (Sun)</span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4 w-full md:w-auto">
                                <button className="flex-1 md:flex-none px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Pause Plan
                                </button>
                                <button className="flex-1 md:flex-none px-8 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Side Stats */}
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 rounded-[3rem] border border-white/5 bg-white/[0.02]"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl"><TrendingUp className="w-5 h-5" /></div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Protection ROI</h4>
                        </div>
                        <p className="text-2xl font-black italic tracking-tighter uppercase mb-1">₹12,400 Saved</p>
                        <p className="text-slate-500 font-medium text-[11px] leading-relaxed uppercase">Total payouts received across 4 disruption events this quarter.</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 rounded-[3rem] border border-white/5 bg-white/[0.02]"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl"><Clock className="w-5 h-5" /></div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Last Activity</h4>
                        </div>
                        <p className="text-lg font-black italic tracking-tighter uppercase mb-1 whitespace-nowrap">Premium Recieved</p>
                        <p className="text-slate-500 font-medium text-[11px] leading-relaxed uppercase">Confirmed via Razorpay Node AX9 on 20th March.</p>
                    </motion.div>

                    <button className="w-full bg-slate-800/50 text-slate-400 rounded-[2rem] py-6 font-black uppercase tracking-[0.3em] text-[10px] border border-white/5 flex items-center justify-center gap-3 hover:bg-slate-800 transition-all uppercase">
                        View Terms of Node Protocol <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Coverage;
