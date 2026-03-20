import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, TrafficCone, Wind, ShieldCheck, Zap, Info, ArrowRight, TrendingDown } from 'lucide-react';

const ProblemSolution = () => {
    const problems = [
        { icon: CloudRain, title: "Weather Disruptions", desc: "Traditional policies ignore the 40% income drop from heavy rain.", color: "blue" },
        { icon: TrafficCone, title: "Urban Friction", desc: "Gridlock isn't an 'accident,' but it kills your hourly rate.", color: "orange" },
        { icon: Wind, title: "Demand Volatility", desc: "Air quality and health events reduce your active pool.", color: "slate" }
    ];

    const solutions = [
        { title: "Parametric Detection", desc: "We track the environment, not just your vehicle. If the data shows a market drop, you get paid.", step: "01" },
        { title: "Deterministic Feeds", desc: "Our AI maps real-time environmental data to your specific work territory.", step: "02" },
        { title: "Zero-Proof Settlement", desc: "Automatic payouts triggered by data events. No paperwork, ever.", step: "03" }
    ];

  return (
    <section id="solution" className="relative min-h-screen flex items-center overflow-hidden py-24">
        <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
        
        <div className="content-container relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                {/* Problem Side */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-px w-10 bg-red-500/50" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">The Market Failure</span>
                        </motion.div>
                        
                        <h2 className="text-4xl lg:text-[3rem] font-black tracking-[-0.05em] text-white leading-[1.0] mb-8 uppercase">
                            Old Insurance <br/>
                            <span className="text-red-500 opacity-50 italic">Fails</span> the Road.
                        </h2>
                        <p className="text-base text-slate-400 font-medium leading-relaxed max-w-md">
                            Traditional policies protect your car, not your income. When the city stops, they don't help. **We do.**
                        </p>
                    </div>

                    <div className="space-y-8">
                        {problems.map((p, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ x: 5 }}
                                className="flex items-start gap-6 group"
                            >
                                <div className="p-4 bg-white/5 rounded-2xl text-slate-500 group-hover:bg-red-500/10 group-hover:text-red-500 transition-all duration-500 border border-white/5">
                                    <p.icon className="w-6 h-6" />
                                </div>
                                <div className="pt-1">
                                    <h4 className="text-xl font-black mb-1 text-white uppercase tracking-tight">{p.title}</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-sm text-sm">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Solution Side */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="bg-white/5 p-10 lg:p-14 rounded-[3.5rem] text-white shadow-2xl overflow-hidden relative border border-white/10 backdrop-blur-3xl group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-all duration-700" />
                        
                        <div className="relative z-10 space-y-10">
                            <div>
                                <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The GigShield Protocol</span>
                                <h2 className="text-4xl lg:text-[3.25rem] font-black tracking-tighter mb-8 leading-[1.0]">
                                    Algorithmic <br/><span className="gradient-text">Solvency.</span>
                                </h2>
                                <p className="text-slate-400 text-base font-medium leading-relaxed">
                                    A deterministic payout engine that ensures your financial stability regardless of urban friction.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {solutions.map((s, i) => (
                                    <div key={i} className="flex gap-8 items-start group">
                                        <div className="text-3xl font-black text-white/5 group-hover:text-blue-500 transition-colors duration-500 leading-none mt-1">
                                            {s.step}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black mb-2 text-white tracking-tight leading-none">{s.title}</h4>
                                            <p className="text-slate-400 font-medium leading-relaxed text-sm">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 flex flex-col sm:flex-row gap-6">
                                <motion.button 
                                  whileHover={{ y: -3 }}
                                  className="bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest flex justify-center items-center gap-2 group border-none shadow-xl shadow-blue-500/20"
                                >
                                    Activate Protocol
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default ProblemSolution;
