import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CloudRain, Clock, IndianRupee, Activity, Zap, History, ChevronLeft, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClaimDetails = () => {
    const navigate = useNavigate();

    const claim = {
        event: "Rain Disruption",
        date: "20th March, 2026",
        time: "7:00 PM - 9:30 PM",
        hoursLost: "2.5 hrs",
        expected: 750,
        actual: 430,
        payout: 320,
        status: "Paid Successfully",
        source: "AI Triggered (Auto Claim)",
        id: "TXN-88219463"
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-16 relative z-10 max-w-2xl mx-auto w-full">
                <div>
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4 flex items-center gap-2 hover:text-blue-500 transition-colors uppercase"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" /> Matrix
                    </button>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Claim Details</h1>
                    <p className="text-slate-500 font-medium text-sm">Disruption breakdown and payout analysis.</p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-500"><CheckCircle2 className="w-5 h-5 shadow-2xl" /></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto relative z-10"
            >
                <div className="glass-card p-10 rounded-[4rem] border border-white/5 bg-white/[0.02] space-y-12">
                    
                    <div className="flex justify-between items-start border-b border-white/5 pb-10">
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-3 uppercase">Trigger Event</p>
                             <h3 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                                 <CloudRain className="w-6 h-6 text-blue-500" /> {claim.event}
                             </h3>
                        </div>
                        <div className="text-right">
                             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-3 uppercase">Status</p>
                             <span className="px-5 py-2 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase border border-green-500/20">{claim.status}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-10 border-b border-white/5 pb-10">
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 uppercase flex items-center gap-2"><Clock className="w-3 h-3" /> Date & Time</p>
                             <p className="text-sm font-bold text-white uppercase italic tracking-tight uppercase leading-relaxed">{claim.date} <br/> {claim.time}</p>
                        </div>
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 uppercase flex items-center gap-2"><Zap className="w-3 h-3 text-amber-500" /> Disruption Hub</p>
                             <p className="text-sm font-bold text-white uppercase italic tracking-tight uppercase">Chennai Core-South</p>
                        </div>
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 uppercase flex items-center gap-2"><TrendingDown className="w-3 h-3" /> Hours Lost</p>
                             <p className="text-sm font-bold text-white uppercase italic tracking-tight uppercase">{claim.hoursLost}</p>
                        </div>
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2 uppercase flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Source</p>
                             <p className="text-sm font-bold text-blue-400 uppercase italic tracking-tight uppercase">{claim.source}</p>
                        </div>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="flex justify-between items-center px-6 py-4 bg-white/5 rounded-2xl border border-white/5">
                             <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 uppercase">Expected Earnings</span>
                             <span className="text-lg font-black uppercase italic tracking-tighter text-slate-400 uppercase">₹{claim.expected}</span>
                        </div>
                        <div className="flex justify-between items-center px-6 py-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                             <span className="text-[11px] font-black uppercase tracking-widest text-red-500 uppercase">Actual Earnings</span>
                             <span className="text-lg font-black uppercase italic tracking-tighter text-red-500 uppercase">₹{claim.actual}</span>
                        </div>
                        <div className="flex justify-between items-center px-10 py-10 bg-blue-600/10 rounded-[2.5rem] border border-blue-500/20 shadow-2xl shadow-blue-500/5 relative">
                             <div className="absolute top-0 right-0 p-8 text-blue-500/10"><Activity className="w-20 h-20" /></div>
                             <span className="text-lg font-black uppercase tracking-[0.3em] text-blue-500 uppercase z-10">Total Payout</span>
                             <span className="text-6xl font-black italic tracking-tighter text-white uppercase z-10 tracking-tighter">₹{claim.payout}</span>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-6">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 uppercase">Transaction ID: {claim.id}</p>
                         <button 
                            onClick={() => navigate("/dashboard")}
                            className="bg-white text-black rounded-2xl px-12 py-5 font-black uppercase tracking-[0.4em] text-[11px] hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3 w-full uppercase"
                         >
                            Back to Dashboard <ArrowRight className="w-4 h-4" />
                         </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ClaimDetails;
