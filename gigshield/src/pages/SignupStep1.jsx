import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Lock, User, Phone, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../api/config';

const SignupStep1 = () => {
    const [partnerId, setPartnerId] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
                partnerId: partnerId.trim().toUpperCase(),
                phone: phone.trim(),
                password: password.trim(),
            });

            if (res.status === 200 || res.status === 201) {
                localStorage.setItem("temp_pid", partnerId.trim().toUpperCase());
                setTimeout(() => {
                    navigate("/signup-success");
                }, 800);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed. Check your Partner ID / Phone.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-archivo">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <motion.div 
                        whileHover={{ rotate: 12 }}
                        className="p-3 bg-blue-600 rounded-2xl text-white shadow-2xl shadow-blue-500/20 mb-6"
                    >
                        <Shield className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">GigShield Node</h1>
                    <p className="text-slate-500 font-medium text-sm">Verify your identity to start protecting your income.</p>
                </div>

                <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative bg-white/[0.02]">
                    <div className="mb-8 p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1 leading-none uppercase">Authentication Stage</h4>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Partner ID</label>
                            <div className="relative group/input">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input 
                                    type="text" 
                                    placeholder="e.g. SWIGGY123"
                                    value={partnerId}
                                    onChange={(e) => setPartnerId(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Phone Number</label>
                            <div className="relative group/input">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input 
                                    type="tel" 
                                    placeholder="10-digit number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Create Password</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input 
                                    type="password" 
                                    placeholder="Secure numeric or text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:border-blue-500/50 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-[10px] font-black uppercase tracking-wider bg-red-500/10 p-4 rounded-xl border border-red-500/20 flex items-center gap-3">
                                <AlertCircle className="w-4 h-4" /> {error}
                            </div>
                        )}

                        <button 
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white rounded-2xl py-5 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify & Continue <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                            Backed by <span className="text-blue-500">Matrix Secured Node</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupStep1;
