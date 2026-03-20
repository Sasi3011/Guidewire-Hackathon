import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, Brain, Shield, Globe, Database, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupProcessing = () => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const steps = [
        "Checking environmental data...",
        "Calculating income patterns...",
        "Optimizing your protection plan...",
        "Finalizing high-risk node validation..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 1200);

        const timeout = setTimeout(() => {
            navigate("/signup-plans");
        }, 5500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate, steps.length]);

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-archivo">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm flex flex-col items-center"
            >
                {/* Loader Animation */}
                <div className="relative w-32 h-32 mb-12">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-dashed border-blue-500/20 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-4 border-t-blue-500/60 border-white/5 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="w-10 h-10 text-blue-500 animate-pulse" />
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">Analyzing Your Risk Profile</h1>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <AnimatePresence mode="wait">
                            <motion.p 
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-slate-400 font-bold text-sm tracking-tight"
                            >
                                {steps[step]}
                            </motion.p>
                        </AnimatePresence>

                        <div className="flex gap-4">
                            {[Globe, Database, Shield, Zap].map((Icon, i) => (
                                <motion.div 
                                    key={i}
                                    animate={{ 
                                        opacity: step >= i ? 1 : 0.2,
                                        scale: step >= i ? 1 : 0.8,
                                        y: step === i ? -5 : 0
                                    }}
                                    className={`p-3 rounded-xl border ${step >= i ? 'bg-blue-600/10 border-blue-500/20 text-blue-500' : 'bg-white/5 border-white/5 text-slate-600'}`}
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupProcessing;
