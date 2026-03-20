import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../api/config';

const Login = () => {
    const [partnerId, setPartnerId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, {
                partnerId,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-12">
                    <motion.div 
                        whileHover={{ rotate: 12 }}
                        className="p-4 bg-blue-600 rounded-[2rem] text-white shadow-2xl shadow-blue-500/20 mb-6"
                    >
                        <Shield className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase font-archivo">
                        GigShield
                    </h1>
                </div>

                <div className="glass-card p-10 rounded-[3rem] border border-white/5 relative bg-white/[0.02]">
                    <div className="mb-10">
                        <h2 className="text-2xl font-black text-white tracking-tight mb-2 uppercase italic tracking-tighter">Welcome Back</h2>
                        <p className="text-slate-500 font-medium text-sm">Secure your earnings with AI-powered protection.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Partner ID</label>
                            <div className="relative group/input">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Enter your Partner ID"
                                    value={partnerId}
                                    onChange={(e) => setPartnerId(e.target.value.toUpperCase())}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Password</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-blue-500 transition-colors" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all"
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-[10px] font-black uppercase tracking-wider bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <button 
                            disabled={isLoading}
                            className="bg-blue-600 w-full text-white rounded-2xl py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Secure Login <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            New here? <Link to="/signup-step1" className="text-blue-500 font-bold hover:underline">Create an account</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
