import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, Wallet, Loader2, AlertCircle, Zap, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api/config';

const SignupStep3 = () => {
    const [upi, setUpi] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const partnerId = localStorage.getItem("temp_pid");

    useEffect(() => {
        if (!partnerId) navigate("/signup-step1");
    }, [partnerId, navigate]);

    useEffect(() => {
        const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        
        if (upiRegex.test(upi)) {
            const delayDebounceFn = setTimeout(async () => {
                setIsValidating(true);
                setError("");
                setIsVerified(false);
                setAccountName("");

                try {
                    const res = await axios.post(`${API_BASE_URL}/auth/validate-vpa`, { vpa: upi });
                    if (res.data.success) {
                        setIsVerified(true);
                        setAccountName(res.data.customer_name || "Verified Holder");
                    } else {
                        setError(res.data.message || "VPA not found on Razorpay network.");
                    }
                } catch (err) {
                    const msg = err.response?.data?.message || "Razorpay API Handshake Failed.";
                    setError(msg);
                } finally {
                    setIsValidating(false);
                }
            }, 800);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setIsVerified(false);
            setAccountName("");
        }
    }, [upi]);

    const handleContinue = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/auth/update-payment`, {
                partnerId,
                upi,
            });
            localStorage.setItem("user_vpa", upi); // Persistence
            navigate("/signup-kyc");
        } catch (err) {
            setError("Protocol failure. Check connectivity.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-archivo">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <motion.div 
                        whileHover={{ rotate: 12 }}
                        className="p-3 bg-blue-600 rounded-2xl text-white shadow-2xl shadow-blue-500/20 mb-6"
                    >
                        <ShieldCheck className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Payout Configuration</h1>
                    <p className="text-slate-500 font-medium text-sm">Real-time UPI validation via Razorpay Protocol.</p>
                </div>

                <div className="glass-card p-10 rounded-[4rem] border border-white/5 relative bg-white/[0.02]">
                    <form onSubmit={handleContinue} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Live UPI Endpoint (VPA)</label>
                            <div className="relative group/input">
                                <Zap className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isVerified ? 'text-green-500 shadow-green-500/20' : 'text-slate-500'}`} />
                                <input 
                                    type="text" 
                                    placeholder="example@upi"
                                    value={upi}
                                    onChange={(e) => setUpi(e.target.value.trim())}
                                    className={`w-full bg-white/5 border rounded-[1.5rem] py-5 pl-12 pr-12 text-white text-sm outline-none transition-all font-mono tracking-tight ${
                                        isVerified ? 'border-green-500/50' : 'border-white/10 focus:border-blue-500/50'
                                    }`}
                                    required
                                    disabled={isLoading}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {isValidating && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
                                    {isVerified && !isValidating && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {isVerified && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-4 p-5 bg-green-500/5 border border-green-500/10 rounded-[2rem] flex items-center gap-4 overflow-hidden"
                                    >
                                        <div className="p-3 bg-green-500/20 rounded-2xl text-green-500 shadow-lg shadow-green-500/10">
                                            <UserCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h5 className="text-[8px] font-black uppercase tracking-widest text-green-500/60 mb-1 italic tracking-tighter uppercase">Authorized Identity</h5>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">{accountName}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-red-500 text-[9px] font-black uppercase tracking-wider bg-red-500/10 p-5 rounded-[1.5rem] border border-red-500/20 flex items-start gap-3"
                            >
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span className="italic tracking-tighter uppercase leading-tight">{error}</span>
                            </motion.div>
                        )}

                        <button 
                            disabled={isLoading || !isVerified}
                            className={`w-full rounded-[2rem] py-6 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                                isVerified ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-40'
                            }`}
                        >
                            Authorize & Continue <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupStep3;
