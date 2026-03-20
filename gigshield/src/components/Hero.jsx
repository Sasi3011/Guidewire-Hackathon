import React from 'react';
import { Shield, ArrowRight, Zap, TrendingUp, Globe, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Premium Background Elements */}
      <div className="mesh-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-[0.2] -z-20" />
      <div className="glow top-[20%] right-[-10%] bg-blue-500/10" />
      <div className="glow bottom-[-10%] left-[-10%] bg-indigo-500/10" />
      <div className="noise-overlay" />
      
      <div className="content-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 group cursor-pointer hover:bg-white/10 transition-all">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Operational in 42 Cities</span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
            
            <h1 className="text-4xl lg:text-[3.5rem] font-black leading-[1.1] mb-6 tracking-tight text-white uppercase">
              Financial <span className="gradient-text">Stability</span> <br/>
              for the Road.
            </h1>
            
            <p className="text-sm lg:text-base text-slate-400 mb-8 leading-relaxed max-w-lg font-medium">
              We've replaced paperwork with data-driven algorithms. Protecting gig workers from the financial impact of urban volatility—automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link 
                to="/login"
                className="btn-primary w-full sm:w-auto px-10 py-5 group flex items-center justify-center gap-2"
              >
                Protect My Income <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] shadow-lg" src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-black text-white">+12k</div>
                 </div>
                 <div className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                    Trusted by Experts
                 </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-1000 hidden lg:block"
          >
            <div className="relative z-10 p-1.5 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-sm group hover:rotate-2 transition-transform duration-700">
              <div className="overflow-hidden rounded-[2.6rem] relative aspect-[4/3] bg-slate-900 border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200" 
                  alt="Abstract Data Flow" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Floating Elements Inside */}
                <div className="absolute top-8 left-8 p-4 glass rounded-2xl border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><TrendingUp className="w-4 h-4" /></div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1 text-[8px]">Risk Reduction</p>
                         <p className="text-base font-black text-white">42.8%</p>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Floating UI Elements Outside */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 glass-card p-6 rounded-3xl z-20 w-64"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20"><BarChart3 className="w-4 h-4" /></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 text-[8px]">Live Engine</span>
                </div>
                <div className="space-y-4">
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full bg-blue-500" />
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-xl font-outfit font-black text-white">₹2,410.00</p>
                      <span className="text-[9px] font-black text-green-400 uppercase">Impact Detected</span>
                   </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass-card p-5 rounded-3xl z-20 flex"
              >
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mr-4 border border-green-500/20">
                   <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Automated Settlement</p>
                   <p className="text-lg font-outfit font-black text-white leading-none">+₹124.50</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default Hero;


