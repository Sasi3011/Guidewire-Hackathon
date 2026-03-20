import React from 'react';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, Fingerprint, MapPin, 
    Activity, ShieldAlert, ChevronLeft, 
    Brain, ShieldX, CheckCircle2, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FraudCheckStatus = () => {
    const navigate = useNavigate();

    const securityNodes = [
        { label: "Work Pattern Node", status: "Verified", icon: Fingerprint, desc: "Your earning patterns match historical platform baseline." },
        { label: "Location Validation", status: "Active", icon: MapPin, desc: "GPS cluster analysis confirms presence in designated zone." },
        { label: "Activity Node", status: "Verified", icon: Activity, desc: "Platform API confirms active engagement status during disruption." },
        { label: "Identity Sync", status: "Verified", icon: ShieldCheck, desc: "Biometric KYC hash matches active session signature." },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            {/* Background Decor */}
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-500px bg-green-600/5 blur-[120px] rounded-full" />

            <button 
                onClick={() => navigate("/dashboard")}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Back to Matrix</span>
            </button>

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-600/20 rounded-lg text-green-500">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 uppercase tracking-widest">Security Transparency Page</span>
                </div>
                <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Security Check</h1>
                <p className="text-slate-500 font-medium whitespace-nowrap">Ensuring fair and transparent protection across the network.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Security Status */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 glass-card p-12 rounded-[4rem] border border-green-500/20 bg-gradient-to-br from-green-600/10 to-transparent relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[400px]"
                >
                    <div className="absolute -z-10 opacity-10"><Search className="w-96 h-96 text-white" /></div>
                    
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center p-8 mb-8 shadow-2xl shadow-green-500/40 relative"
                    >
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
                        <CheckCircle2 className="w-full h-full text-white" />
                    </motion.div>

                    <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Verified Security</h2>
                    <p className="text-slate-400 font-medium text-xs tracking-widest uppercase mb-12">System ID: GS-882-991-MATRIX</p>

                    <div className="grid grid-cols-2 gap-8 w-full">
                        <div className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 uppercase">Status</p>
                            <h3 className="text-xl font-black italic tracking-tighter uppercase text-green-500 uppercase">Trusted Node</h3>
                        </div>
                        <div className="p-6 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 uppercase">Fraud Probability</p>
                            <h3 className="text-xl font-black italic tracking-tighter uppercase text-white uppercase italic tracking-tighter">0.02%</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Checks List */}
                <div className="space-y-4">
                    <h3 className="text-sm font-black italic tracking-tighter uppercase mb-6 px-4">Cluster Validation History</h3>
                    <div className="space-y-4">
                        {securityNodes.map((node, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.02] flex items-start gap-4 hover:bg-white/[0.04] transition-all group cursor-pointer"
                            >
                                <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-green-500 group-hover:bg-green-500/10 transition-all shadow-lg">
                                    <node.icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-xs font-black uppercase tracking-widest uppercase italic">{node.label}</h4>
                                        <span className="text-[9px] font-black text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest">{node.status}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-bold tracking-wider leading-relaxed uppercase">{node.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-5 bg-white/5 border border-white/5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                        <Brain className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        Learn More about AI Protection
                    </button>
                </div>
            </div>
            
            {/* Under Review State (Optional UI Demo) */}
            <div className="mt-12 p-8 rounded-[3rem] border border-red-500/20 bg-red-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-red-500/10"><ShieldAlert className="w-24 h-24" /></div>
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-red-500 rounded-2xl text-white shadow-xl shadow-red-500/30">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-xl font-black italic tracking-tighter uppercase mb-1">What if flagged?</h4>
                        <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mb-2 uppercase italic tracking-tighter">Your account status will change to "UNDER REVIEW"</p>
                        <p className="text-[11px] text-slate-500 font-medium max-w-2xl uppercase leading-relaxed font-bold tracking-wider uppercase">GigShield uses multi-factor validation. If our AI thinks something is wrong, we'll ask for additional live proof (like a photo or trip ID) before payout.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FraudCheckStatus;
