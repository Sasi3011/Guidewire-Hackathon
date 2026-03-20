import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Activity, Wallet, ArrowRight, ShieldCheck, Cpu, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Sync Identity",
      desc: "Authenticate your platform credentials. Our engine performs an immediate risk baseline scan.",
      icon: UserPlus,
    },
    {
      title: "Live Monitoring",
      desc: "Our neural network tracks urban volatility across your work zones with 60s refresh rates.",
      icon: Activity,
    },
    {
      title: "Instant Settlement",
      desc: "When disruption thresholds are met, liquidity is released to your account automatically.",
      icon: Wallet,
    }
  ];

  return (
    <section id="how-it-works" className="relative min-h-screen flex items-center overflow-hidden py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 w-[800px] h-[800px]" />
        
        <div className="content-container relative z-10 w-full">
            <div className="text-center mb-20 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center items-center gap-4 mb-8"
                >
                    <div className="h-px w-8 bg-blue-500/30" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">System Workflow</span>
                    <div className="h-px w-8 bg-blue-500/30" />
                </motion.div>
                
                <h2 className="text-4xl lg:text-[3.5rem] font-black tracking-tight text-white leading-[1.0] uppercase">
                    Security @ <br/><span className="gradient-text">Speed of Thought.</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="relative flex flex-col group"
                    >
                        <div className="flex items-center gap-6 mb-12">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all duration-500 shadow-xl shadow-black/20">
                                    <step.icon className="w-9 h-9 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-2xl bg-white text-black text-[11px] font-black flex items-center justify-center shadow-lg">
                                    0{index + 1}
                                </div>
                            </div>
                            <div className="h-px flex-1 bg-white/5 hidden md:block" />
                        </div>
                        
                        <h3 className="text-2xl font-black mb-5 text-white font-outfit uppercase tracking-wider leading-none">{step.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed text-[15px]">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32 p-1.5 bg-white/5 rounded-[3.5rem] border border-white/5 shadow-2xl relative group overflow-hidden"
            >
                <div className="bg-slate-900 rounded-[3.2rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 border border-white/5 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">
                        <div className="w-24 h-24 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center border border-blue-500/20">
                            <ShieldCheck className="w-12 h-12 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black text-white font-outfit mb-3">60s Deterministic Settlement</h4>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">Traditional claims take 14 business days. GigShield resolves disruptions in 60 seconds with deterministic data feeds.</p>
                        </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-black px-12 py-6 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 border-none shadow-2xl shadow-white/5"
                    >
                        See the Network Map
                    </motion.button>
                </div>
                
                {/* Visual Background Accent */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/10 blur-[100px] pointer-events-none" />
            </motion.div>
        </div>
    </section>
  );
};

export default HowItWorks;
