import React from 'react';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Eye, 
  Bell, 
  Fingerprint,
  RefreshCcw,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`glass-card p-10 rounded-[2.5rem] group ${className}`}
  >
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-10">
        <div className="p-4 bg-white/5 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7" />
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500/10 group-hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      </div>
      <div>
        <h3 className="text-2xl font-black mb-4 text-white tracking-tight font-outfit">{title}</h3>
        <p className="text-[15px] text-slate-400 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  </motion.div>
);

const Features = () => {
  return (
    <section id="features" className="relative min-h-screen flex items-center overflow-hidden py-24">
      <div className="glow top-0 right-0 bg-blue-500/5" />
      <div className="glow bottom-0 left-0 bg-indigo-500/5" />
      
      <div className="content-container relative z-10 w-full">
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-10 bg-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Core Infrastructure</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-[3.5rem] font-black mb-8 leading-[1.0] tracking-tight text-white uppercase">
            Architected for <br/>
            <span className="text-slate-600">Pure Reliability.</span>
          </h2>
          <p className="text-base text-slate-400 max-w-xl font-medium leading-relaxed">
            While traditional insurers guess, we compute. Our infrastructure is built on millions of urban data points refreshed every 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
          <FeatureCard 
            delay={0.1}
            icon={Cpu}
            title="AI Risk Orchestration"
            description="Our neural network processes weather volatility, traffic congestion, and local events to predict income loss before it happens."
            className="md:col-span-6 lg:col-span-8 bg-gradient-to-br from-slate-900/80 to-blue-900/10 min-h-[380px]"
          />
          
          <FeatureCard 
            delay={0.2}
            icon={Zap}
            title="Auto Settlement"
            description="True parametric insurance. No claims, no waiting. Payouts are triggered instantly by data events."
            className="md:col-span-3 lg:col-span-4"
          />

          <FeatureCard 
            delay={0.3}
            icon={Fingerprint}
            title="Anti-Fraud Engine"
            description="Advanced biometric and behavioral verification ensures every payout is secure."
            className="md:col-span-3 lg:col-span-4"
          />

          <FeatureCard 
            delay={0.4}
            icon={Eye}
            title="24/7 Monitoring"
            description="Real-time surveillance of global urban disruptions that might affect your work."
            className="md:col-span-6 lg:col-span-4"
          />

          <FeatureCard 
            delay={0.5}
            icon={RefreshCcw}
            title="Dynamic Scaling"
            description="Dynamically adjusted premiums based on your specific work patterns and routes."
            className="md:col-span-6 lg:col-span-4"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 glass-card rounded-[3rem] flex flex-wrap justify-between items-center gap-12 relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           
           <div className="relative z-10 flex flex-col">
              <span className="text-5xl font-black text-white font-outfit">99.9%</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mt-3">Payout Accuracy</span>
           </div>
           <div className="h-16 w-px bg-white/5 hidden lg:block" />
           <div className="relative z-10 flex flex-col">
              <span className="text-4xl font-black text-white font-outfit">₹0.00</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">Deductible Costs</span>
           </div>
           <div className="h-16 w-px bg-white/5 hidden lg:block" />
           <div className="relative z-10 flex flex-col">
              <span className="text-5xl font-black text-white font-outfit">&lt;2min</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mt-3">Settlement Speed</span>
           </div>
           <div className="h-16 w-px bg-white/5 hidden lg:block" />
           <motion.button 
             whileHover={{ scale: 1.05 }} 
             whileTap={{ scale: 0.95 }}
             className="relative z-10 bg-white text-black px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest border-none hover:bg-blue-600 hover:text-white transition-all duration-500"
           >
              System Documentation
           </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
