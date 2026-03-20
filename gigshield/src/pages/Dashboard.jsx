import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Shield, Zap, TrendingUp, CheckCircle2, CloudRain, 
    AlertTriangle, Clock, Activity, Map as MapIcon, 
    Brain, LogOut, Settings, BarChart3, Fingerprint, 
    CreditCard, LayoutDashboard, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({ city: "", state: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/login");
            return;
        }
        const user = JSON.parse(storedUser);
        setUserData(user);
        setFormData({ city: user.city || "Chennai", state: user.state || "Tamilnadu" });
    }, [navigate]);

    const stats = [
        { label: "Weekly Coverage", value: "₹4,000", icon: Shield, trend: "+12%", color: "blue", path: "/coverage" },
        { label: "Current Premium", value: "₹150", icon: Zap, trend: "Stable", color: "indigo", path: "/payments" },
        { label: "Total Saved", value: "₹12,400", icon: TrendingUp, trend: "+₹320", color: "green", path: "/payments" },
        { label: "Active Claims", value: "1", icon: CheckCircle2, trend: "Syncing", color: "cyan", path: "/monitoring" },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    if (!userData) return null;

    return (
        <div className="h-screen bg-[#020617] text-white p-6 md:p-8 flex flex-col relative overflow-hidden font-archivo">
            {/* Background Decor */}
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            {/* Top Navigation - High Fidelity */}
            <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-2xl shadow-blue-500/20">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none mb-1">GigShield</h1>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500">Security Node v2.0</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex flex-col items-end mr-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">Hi, {userData.name}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase italic">{userData.partnerId} · {formData.city}</p>
                    </div>
                    <button 
                        onClick={() => navigate("/settings")}
                        className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all group"
                    >
                        <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                    >
                        <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            <main className="flex-1 flex flex-col gap-6 relative z-10 overflow-hidden min-h-0">
                {/* Stats Grid - Clickable Clusters */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
                    {stats.map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate(stat.path)}
                            className="glass-card p-5 rounded-[2rem] border border-white/5 bg-white/[0.02] flex flex-col justify-between group transition-all hover:bg-white/[0.04] cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-500 group-hover:scale-105 transition-transform`}>
                                    <stat.icon className="w-4 h-4" />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-widest text-${stat.color}-400 bg-${stat.color}-500/5 px-2 py-0.5 rounded-full`}>{stat.trend}</span>
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1 uppercase italic tracking-tighter">{stat.label}</p>
                                <h3 className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap text-white">{stat.value}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                    
                    {/* Integrated Forecast & Risk Matrix */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-2 glass-card p-8 rounded-[3.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-transparent relative overflow-hidden group flex flex-col h-full"
                    >
                        <div className="absolute top-0 right-0 p-8 text-blue-500/5"><BarChart3 className="w-48 h-48" /></div>
                        
                        <div className="flex justify-between items-start mb-8 relative z-10 shrink-0">
                            <div>
                                <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-1">Weekly Intelligence</h3>
                                <p className="text-slate-500 font-medium text-[10px] tracking-widest uppercase italic tracking-tighter">AI FORECAST NODE: CHENNAI-METRO</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => navigate("/forecast")}
                                    className="px-5 py-2.5 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all font-black uppercase tracking-widest text-[9px] flex items-center gap-2 shadow-lg shadow-blue-600/20"
                                >
                                    <Brain className="w-3.5 h-3.5" /> Full Forecast
                                </button>
                                <button 
                                    onClick={() => navigate("/disruption-map")}
                                    className="px-5 py-2.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[9px] flex items-center gap-2"
                                >
                                    <MapIcon className="w-3.5 h-3.5" /> Live Map
                                </button>
                            </div>
                        </div>
                        
                        {/* Simulation of Live Data flow */}
                        <div className="flex-1 flex items-end gap-3 px-2 relative z-10 min-h-0 mb-6">
                            {[60, 45, 80, 55, 95, 75, 45, 65, 85, 50, 70, 40, 60, 50, 80].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.3 + (i * 0.03), type: "spring", stiffness: 100 }}
                                    className={`flex-1 rounded-t-xl bg-gradient-to-t ${h > 80 ? 'from-red-600 to-amber-500' : 'from-blue-600 to-cyan-400'} opacity-60 hover:opacity-100 transition-opacity relative group/bar`}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/40 opacity-0 group-hover/bar:opacity-100 transition-opacity uppercase">₹{h * 15}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="shrink-0 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 relative z-10">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 uppercase italic tracking-tighter">Real-time Analysis</span>
                                </div>
                                <div className="flex items-center gap-2 underline underline-offset-4 decoration-amber-500/40 cursor-pointer" onClick={() => navigate("/monitoring")}>
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 uppercase italic tracking-tighter">Claim Triggered</span>
                                </div>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/80 uppercase italic tracking-tighter">Last Sync: 12s ago</p>
                        </div>
                    </motion.div>

                    {/* Right Action Column */}
                    <div className="flex flex-col gap-6 h-full min-h-0">
                        {/* Interactive Risk Node */}
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate("/risk-analysis")}
                            className="glass-card p-8 rounded-[3rem] border border-amber-500/20 bg-gradient-to-br from-amber-600/10 to-transparent relative group cursor-pointer hover:bg-amber-500/15 transition-all flex flex-col justify-center gap-2 shrink-0"
                        >
                            <div className="absolute top-0 right-0 p-6 text-amber-500/10"><CloudRain className="w-16 h-16" /></div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-xl shadow-amber-500/20 animate-pulse">
                                    <AlertTriangle className="w-4 h-4" />
                                </div>
                                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 uppercase italic tracking-tighter">Disruption Alert</h4>
                            </div>
                            <h3 className="text-xl font-black italic tracking-tighter uppercase mb-1">70% Monsoon Prediction</h3>
                            <p className="text-[10px] text-slate-500 font-medium uppercase leading-tight italic tracking-tighter">Coverage verified for window: <span className="text-white font-bold tracking-widest">6PM-9PM</span>.</p>
                        </motion.div>

                        {/* Quick Action Matrix */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/claim-payout")}
                                className="bg-blue-600 text-white rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 group uppercase"
                            >
                                <div className="p-3 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform shadow-lg"><Zap className="w-5 h-5 fill-white" /></div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-tight text-center uppercase italic tracking-tighter">Rapid Claim</span>
                            </motion.button>
                            
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/payments")}
                                className="glass-card border border-white/5 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all text-slate-400 uppercase"
                            >
                                <div className="p-3 bg-white/5 rounded-xl group-hover:text-white transition-colors"><Search className="w-5 h-5" /></div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-tight text-center uppercase italic tracking-tighter">History Log</span>
                            </motion.button>
                        </div>

                        {/* Node Health / Security Cluster */}
                        <div 
                            onClick={() => navigate("/fraud-status")}
                            className="glass-card p-5 rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex items-center justify-between mt-auto shrink-0 group cursor-pointer hover:bg-white/5 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 group-hover:scale-110 transition-transform"><Fingerprint className="w-4 h-4" /></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 uppercase italic tracking-tighter">Security Node Active</span>
                            </div>
                            <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase border border-green-500/20 uppercase italic tracking-tighter">Verified Identity</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
