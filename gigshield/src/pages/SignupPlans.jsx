import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, Wallet, ArrowRight, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupPlans = () => {
    const [selectedPlan, setSelectedPlan] = useState("Intermediate");
    const navigate = useNavigate();

    const plans = [
        {
            id: "Basic",
            title: "Basic",
            coverage: "₹2000/week",
            premium: "₹80/week",
            desc: "For low-risk users",
            color: "green",
            icon: Shield
        },
        {
            id: "Intermediate",
            title: "Intermediate",
            coverage: "₹4000/week",
            premium: "₹150/week",
            desc: "Balanced protection",
            color: "yellow",
            icon: Zap
        },
        {
            id: "Premium",
            title: "Premium",
            coverage: "₹8000/week",
            premium: "₹280/week",
            desc: "Maximum protection",
            color: "red",
            icon: Target
        }
    ];

    const handleSelect = () => {
        const planObj = plans.find(p => p.id === selectedPlan);
        localStorage.setItem("selectedPlan", JSON.stringify(planObj));
        navigate("/signup-payment");
    };

    return (
        <div className="min-h-screen bg-[#020617] p-6 relative overflow-hidden font-archivo flex flex-col items-center justify-center">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
            >
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div 
                        whileHover={{ rotate: 12 }}
                        className="p-3 bg-blue-600 rounded-2xl text-white shadow-2xl shadow-blue-500/20 mb-6"
                    >
                        <Shield className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">Choose Your Protection Plan</h1>
                    <p className="text-slate-500 font-medium text-sm">Flexible plans tailored to your risk and earnings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`relative cursor-pointer glass-card p-4 h-[350px] rounded-[3rem] border-2 transition-all overflow-hidden flex flex-col justify-between ${
                                selectedPlan === plan.id 
                                    ? `border-${plan.color}-500/80 bg-${plan.color}-600/10 shadow-2xl shadow-${plan.color}-600/10 scale-105 z-10` 
                                    : 'border-white/5 bg-white/5'
                            }`}
                        >
                            {selectedPlan === plan.id && (
                                <div className={`absolute top-0 right-0 p-6 bg-${plan.color}-500 rounded-bl-[2rem] text-white shadow-xl`}>
                                    <Check className="w-4 h-4" />
                                </div>
                            )}

                            <div>
                                <div className={`p-4 rounded-3xl bg-${plan.color}-600/20 text-${plan.color}-500 mb-6 inline-block`}>
                                    <plan.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-1">{plan.title}</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">{plan.desc}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none mb-2">Coverage</p>
                                    <p className={`text-3xl font-black text-${plan.color}-400 italic tracking-tighter uppercase`}>{plan.coverage.split('/')[0]}</p>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">/ weekly</p>
                                </div>
                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">Premium</p>
                                    <p className="text-lg font-black text-white uppercase italic tracking-tighter">{plan.premium}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center flex-col items-center">
                    <button 
                        onClick={handleSelect}
                        className="w-full max-w-sm bg-white text-black rounded-3xl py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-slate-200 shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                        Select {selectedPlan} Plan <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="mt-8 text-center text-[9px] font-bold tracking-widest text-slate-600 leading-relaxed uppercase">
                        Plans calculated based on real-time city risk factor. <br/> <span className="text-slate-400 underline">Terms and Conditions applied.</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPlans;
