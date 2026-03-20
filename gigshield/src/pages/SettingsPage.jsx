import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    User, Bell, Shield, 
    Settings, LogOut, ChevronLeft, 
    Lock, HelpCircle, Phone, 
    Smartphone, Zap, CheckCircle2, 
    Save, MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [notifications, setNotifications] = useState(true);
    const [autoProtect, setAutoProtect] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUserData(JSON.parse(storedUser));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    if (!userData) return null;

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            {/* Background Decor */}
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full" />

            <button 
                onClick={() => navigate("/dashboard")}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Back to Matrix</span>
            </button>

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-600/20 rounded-lg text-white">
                        <Settings className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 uppercase tracking-widest">System Configuration Node</span>
                </div>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Account Settings</h1>
                <p className="text-slate-500 font-medium">Manage your identity, preferences, and security protocols.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card & Basic Info */}
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 text-white/5"><User className="w-24 h-24" /></div>
                        
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center p-6 mb-8 shadow-2xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <User className="w-full h-full text-white" />
                        </div>
                        
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">{userData.name}</h2>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 uppercase tracking-widest italic">{userData.partnerId} · {userData.platform}</p>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1 uppercase tracking-widest italic">Contact Number</p>
                                <p className="text-sm font-black italic tracking-tighter uppercase text-white italic tracking-tighter italic">+91 {userData.phone || "99283-XXXXX"}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1 uppercase tracking-widest italic">Node Location</p>
                                <p className="text-sm font-black italic tracking-tighter uppercase text-white italic tracking-tighter italic">{userData.city || "Chennai"}, {userData.state || "Tamilnadu"}</p>
                            </div>
                        </div>
                    </motion.div>

                    <button 
                        onClick={handleLogout}
                        className="w-full py-5 px-8 bg-red-600/10 border border-red-500/20 rounded-2xl font-black uppercase tracking-widest text-xs text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Sign Out from Node
                    </button>
                </div>

                {/* Configuration List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-4 md:p-10 rounded-[4rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl">
                        <h3 className="text-sm font-black italic tracking-tighter uppercase mb-10 px-4 flex items-center gap-3">
                            <Zap className="w-4 h-4 text-blue-500" /> Operational Preferences
                        </h3>

                        <div className="space-y-12">
                            {/* Toggle Row */}
                            <div className="flex items-center justify-between px-4 group">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-white/5 rounded-2xl text-blue-400 group-hover:text-blue-500 transition-colors shadow-lg">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black italic tracking-tighter uppercase mb-1 uppercase italic tracking-tighter">Real-time Notifications</h4>
                                        <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase leading-none">Status updates for active disruption claims.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setNotifications(!notifications)}
                                    className={`w-14 h-8 rounded-full transition-all relative p-1 ${notifications ? 'bg-blue-600' : 'bg-slate-700'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full transition-all transform ${notifications ? 'translate-x-6' : 'translate-x-0'} shadow-lg`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between px-4 group">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-white/5 rounded-2xl text-cyan-400 group-hover:text-cyan-500 transition-colors shadow-lg">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black italic tracking-tighter uppercase mb-1 uppercase italic tracking-tighter">Auto-Protection Mode</h4>
                                        <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase leading-none">Automatic claim triggering via AI protocol.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setAutoProtect(!autoProtect)}
                                    className={`w-14 h-8 rounded-full transition-all relative p-1 ${autoProtect ? 'bg-cyan-600' : 'bg-slate-700'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full transition-all transform ${autoProtect ? 'translate-x-6' : 'translate-x-0'} shadow-lg`} />
                                </button>
                            </div>
                        </div>

                        <hr className="my-10 border-white/5 mx-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                            <button className="flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.08] transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl text-slate-400 group-hover:text-white transition-all"><Lock className="w-4 h-4" /></div>
                                    <span className="text-xs font-black uppercase tracking-widest italic uppercase tracking-tighter">Change Pin</span>
                                </div>
                                <MoreVertical className="w-4 h-4 text-slate-600 group-hover:text-white" />
                            </button>

                            <button className="flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.08] transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl text-slate-400 group-hover:text-white transition-all"><HelpCircle className="w-4 h-4" /></div>
                                    <span className="text-xs font-black uppercase tracking-widest italic uppercase tracking-tighter">Support Cluster</span>
                                </div>
                                <MoreVertical className="w-4 h-4 text-slate-600 group-hover:text-white" />
                            </button>
                        </div>

                        <div className="mt-12 px-4">
                            <button className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 active:scale-[0.98] group">
                                <Save className="w-4 h-4 group-hover:scale-110 transition-transform" /> Save Node Configuration
                            </button>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] flex items-center justify-between opacity-50">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 uppercase leading-none">Firmware Identity: v2.4.912-RELEASE</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 uppercase leading-none">Security Hash: X99-GS-1110</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
