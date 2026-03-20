import React from 'react';
import { Shield, Twitter, Linkedin, Github, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-slate-500 relative overflow-hidden border-t border-white/5">
      {/* Cinematic End-Cap CTA */}
      <div className="relative border-b border-white/5 overflow-hidden section-padding">
        <div className="absolute inset-0 bg-blue-600/5 blur-[150px] -z-10 animate-pulse" />
        <div className="content-container text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
            >
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-12 group hover:bg-white/10 transition-all cursor-pointer">
                    <Zap className="w-4 h-4 text-blue-400 fill-current shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Ready to Secure Your Shifts?</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </div>
                
                <h2 className="text-4xl lg:text-[4.5rem] font-black text-white mb-12 leading-[1.0] tracking-tight uppercase">
                    Shield Your <br/><span className="gradient-text">Future Earnings.</span>
                </h2>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-14 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 group border-none shadow-2xl shadow-blue-500/20"
                    >
                        Initialize Onboarding <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      className="px-14 py-6 text-white font-black uppercase tracking-[0.2em] text-[11px] border border-white/10 rounded-[2rem] hover:bg-white/5 transition-all"
                    >
                        Network Statistics
                    </motion.button>
                </div>
            </motion.div>
        </div>
      </div>

      <div className="content-container py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-20 mb-32">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-10 group cursor-pointer w-fit">
              <div className="p-2 bg-blue-600 rounded-xl text-white transform group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
                <Shield className="w-6 h-6 border-none" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white font-outfit uppercase">GigShield</span>
            </div>
            <p className="max-w-xs mb-10 text-lg font-medium leading-relaxed italic text-slate-400">
              "Providing deterministic financial stability for the nomadic workforce."
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a 
                    key={i}
                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
                    href="#" 
                    className="w-14 h-14 bg-white/5 rounded-[1.25rem] flex items-center justify-center transition-all border border-white/5 text-slate-500"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10">Infrastructure</h4>
            <ul className="space-y-5">
              {['AI Engine', 'Risk Nodes', 'Settlement', 'Verification'].map(item => (
                <li key={item}><a href="#" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10">Resources</h4>
            <ul className="space-y-5">
              {['Whitepaper', 'API Docs', 'Risk Map', 'Privacy'].map(item => (
                <li key={item}><a href="#" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-blue-400 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
             <div className="p-8 glass-card rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center gap-3 text-green-500 mb-6 relative z-10">
                   <div className="w-2 h-2 rounded-full bg-current animate-pulse shadow-[0_0_10px_currentColor]" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em]">Network Operational</span>
                </div>
                <div className="space-y-5 relative z-10">
                   <div className="flex justify-between items-end">
                      <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Active Nodes</span>
                      <span className="font-outfit font-black text-white text-lg leading-none">1,242</span>
                   </div>
                   <div className="h-px bg-white/5 w-full" />
                   <div className="flex justify-between items-end">
                      <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Total Liquidity</span>
                      <span className="font-outfit font-black text-blue-400 text-xl leading-none">₹12.4M</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group">
                <Globe className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Protection Node: 0xF2...42</p>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">© 2026 GigShield Protocol. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
