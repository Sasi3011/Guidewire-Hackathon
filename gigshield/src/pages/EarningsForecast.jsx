import React from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, Calendar, AlertTriangle, 
    ChevronLeft, Brain, DollarSign, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EarningsForecast = () => {
    const navigate = useNavigate();

    const forecastData = [
        { day: 'Mon', amount: 1200, risk: 'Low' },
        { day: 'Tue', amount: 1100, risk: 'Low' },
        { day: 'Wed', amount: 1300, risk: 'Medium' },
        { day: 'Thu', amount: 900, risk: 'High' },
        { day: 'Fri', amount: 1800, risk: 'Low' },
        { day: 'Sat', amount: 2200, risk: 'Low' },
        { day: 'Sun', amount: 1900, risk: 'Medium' },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            {/* Background Decor */}
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />

            <button 
                onClick={() => navigate("/dashboard")}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Back to Matrix</span>
            </button>

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500">
                        <Brain className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Predictive Analysis Node</span>
                </div>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Earnings Forecast</h1>
                <p className="text-slate-500 font-medium">AI-powered prediction of your weekly income and disruption risks.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Prediction Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 glass-card p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent"
                >
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Predicted Weekly Total</p>
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase text-blue-500">₹8,500</h2>
                        </div>
                        <div className="p-4 bg-green-500/10 rounded-2xl text-green-500 text-xs font-black uppercase tracking-widest border border-green-500/20">
                            +14% vs Last Week
                        </div>
                    </div>

                    {/* Weekly Chart Visual */}
                    <div className="h-64 flex items-end gap-4 mb-8">
                        {forecastData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.amount / 2500) * 100}%` }}
                                    className={`w-full rounded-t-xl transition-all relative group ${
                                        d.risk === 'High' ? 'bg-red-500/40 hover:bg-red-500/60' : 
                                        d.risk === 'Medium' ? 'bg-amber-500/40 hover:bg-amber-500/60' : 
                                        'bg-blue-500/40 hover:bg-blue-500/60'
                                    }`}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-2 py-1 rounded text-[10px] font-black">
                                        ₹{d.amount}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] font-black text-slate-500 uppercase">{d.day}</span>
                            </div>
                        ))}
                    </div>
                    
                    <button className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">
                        Optimize My Schedule
                    </button>
                </motion.div>

                {/* Insights Column */}
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 rounded-[2.5rem] border border-amber-500/20 bg-amber-500/5"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest">Best Earning Window</h3>
                        </div>
                        <p className="text-xl font-black italic tracking-tighter uppercase mb-2">Saturday Dinner</p>
                        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider leading-relaxed">
                            Historically high multipliers expected due to local events and weather status.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 rounded-[2.5rem] border border-red-500/20 bg-red-500/5"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-widest">Risk Analysis</h3>
                        </div>
                        <p className="text-xl font-black italic tracking-tighter uppercase mb-2">Thursday (High Risk)</p>
                        <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider leading-relaxed">
                            High disruption risk (92%) due to heavy monsoon warnings. Coverage covers 100% of loss.
                        </p>
                    </motion.div>

                    <div className="p-8 rounded-[2.5rem] bg-indigo-600 shadow-2xl shadow-indigo-500/20 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                        <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10" />
                        <div className="relative z-10">
                            <h3 className="text-lg font-black italic tracking-tighter uppercase mb-2">Peak Multiplier</h3>
                            <p className="text-[10px] font-black text-indigo-200 tracking-[0.2em] uppercase opacity-80">Sync with platform</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EarningsForecast;
