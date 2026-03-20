import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Wallet, ArrowRight, Zap, Target, Loader2, Lock, CreditCard, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api/config';

const SignupPayment = () => {
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedPlan = localStorage.getItem("selectedPlan");
        const storedUser = localStorage.getItem("user");
        
        if (storedPlan) setPlan(JSON.parse(storedPlan));
        if (storedUser) setUserData(JSON.parse(storedUser));
        
        if (!storedPlan) navigate("/signup-plans");
    }, [navigate]);

    const handleRazorpay = async () => {
        setIsLoading(true);
        setError("");

        try {
            // 1. Create Order on Backend
            const amountStr = plan.premium.replace("₹", "").split("/")[0];
            const amount = parseInt(amountStr);

            const { data: order } = await axios.post(`${API_BASE_URL}/auth/create-order`, {
                amount: amount,
            });

            // 2. Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_STAbagROLiivbf", // Default for Hackathon
                amount: order.amount,
                currency: order.currency,
                name: "GigShield Protection",
                description: `Activating ${plan.title} Plan`,
                image: "/logo.svg",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        // 3. Verify Payment
                        const verifyRes = await axios.post(`${API_BASE_URL}/auth/verify-payment`, {
                            ...response,
                            partnerId: userData.partnerId,
                            plan: plan
                        });

                        if (verifyRes.data.success) {
                            // Update local storage status
                            const updatedUser = { ...userData, verified: true, active: true, selectedPlan: plan };
                            localStorage.setItem("user", JSON.stringify(updatedUser));
                            navigate("/signup-final-success");
                        }
                    } catch (err) {
                        setError("Verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: userData?.name || "Partner",
                    contact: userData?.phone || "",
                },
                theme: { color: "#2563eb" },
                modal: {
                    ondismiss: () => setIsLoading(false),
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            setError("Could not initiate payment. Try again.");
            setIsLoading(false);
        }
    };

    if (!plan) return null;

    return (
        <div className="min-h-screen bg-[#020617] p-6 relative overflow-hidden font-archivo flex flex-col items-center justify-center">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <motion.div 
                        whileHover={{ rotate: 12 }}
                        className="p-3 bg-blue-600 rounded-2xl text-white shadow-2xl shadow-blue-500/20 mb-6"
                    >
                        <Shield className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Activate Protection</h1>
                    <p className="text-slate-500 font-medium text-sm italic tracking-tighter uppercase italic">Secure your income in real-time.</p>
                </div>

                <div className="glass-card p-10 rounded-[4rem] border border-blue-500/20 relative bg-white/[0.02]">
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic tracking-tighter uppercase">Selected Security Tier</h4>
                                <span className={`text-[10px] font-black uppercase px-3 py-1 bg-blue-600/10 text-blue-500 rounded-full border border-blue-500/20 italic tracking-tighter`}>{plan.title}</span>
                            </div>
                            <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-4">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic tracking-tighter uppercase">Weekly Premium</p>
                                    <p className="text-3xl font-black text-white italic tracking-tighter uppercase">{plan.premium}</p>
                                </div>
                                <div className="flex justify-between items-end pt-4 border-t border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic tracking-tighter uppercase">Income Coverage</p>
                                    <p className="text-xl font-black text-blue-500 italic tracking-tighter uppercase">{plan.coverage}</p>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500"
                            >
                                <ShieldAlert className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tighter uppercase">{error}</span>
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-3xl flex items-center gap-4">
                                <div className="p-2 bg-green-500/10 rounded-full text-green-500"><Check className="w-3.5 h-3.5" /></div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-green-500/80 leading-tight italic tracking-tighter uppercase">Razorpay Protocol: Real-time Activation Enabled</p>
                            </div>
                        </div>

                        <button 
                            onClick={handleRazorpay}
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white rounded-[2rem] py-6 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-5 h-5" /> Pay & Activate Policy</>}
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between opacity-40">
                    <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-blue-500" />
                        <span className="text-[8px] font-black uppercase tracking-widest leading-none text-slate-500 italic tracking-tighter uppercase">PCI-DSS Level 1 Encryption</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPayment;
