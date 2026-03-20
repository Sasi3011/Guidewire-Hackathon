import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center relative overflow-hidden font-archivo">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-1000" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm"
            >
                <div className="relative mb-8 inline-block">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/20"
                    >
                        <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                </div>

                <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">Verification Successful</h1>
                <p className="text-slate-400 font-medium mb-12">Let’s complete your profile to activate your income protection plan.</p>

                <button 
                    onClick={() => navigate("/signup-step2")}
                    className="w-full bg-white text-black rounded-2xl py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-2xl shadow-white/5"
                >
                    Continue <ArrowRight className="w-4 h-4" />
                </button>
            </motion.div>
        </div>
    );
};

export default SignupSuccess;
