import React from 'react';
import { motion } from 'framer-motion';
import { 
    CreditCard, ArrowDownLeft, ArrowUpRight, 
    ChevronLeft, Download, DollarSign, 
    Calendar, Clock, Zap, Shield, 
    FileText, TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentHistory = () => {
    const navigate = useNavigate();

    const transactions = [
        { id: 1, type: "payout", category: "Claim Payout (Rain)", amount: "₹320", date: "Today, 8:45 PM", status: "Success", icon: CloudRain },
        { id: 2, type: "deduction", category: "Weekly Premium", amount: "-₹150", date: "Yesterday, 10:00 AM", status: "Success", icon: Shield },
        { id: 3, type: "payout", category: "Claim Payout (Traffic)", amount: "₹280", date: "March 18, 5:12 PM", status: "Success", icon: Zap },
        { id: 4, type: "deduction", category: "Weekly Premium", amount: "-₹150", date: "March 15, 10:00 AM", status: "Success", icon: Shield },
        { id: 5, type: "payout", category: "Claim Payout (AQI)", amount: "₹450", date: "March 12, 11:30 AM", status: "Success", icon: Activity },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden font-archivo">
            {/* Background Decor */}
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />

            <button 
                onClick={() => navigate("/dashboard")}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Back to Matrix</span>
            </button>

            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 uppercase tracking-widest">Ledger Protocol Node</span>
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Payment History</h1>
                    <p className="text-slate-500 font-medium">Tracking every credit and debit within your protection node.</p>
                </div>
                
                <button className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs flex items-center gap-2 group shadow-xl">
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /> Download Report
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Summary Column */}
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-10 rounded-[3rem] bg-blue-600 shadow-2xl shadow-blue-500/30 relative overflow-hidden group hover:scale-[1.02] transition-transform"
                    >
                        <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
                        <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                            <div>
                                <h3 className="text-xl font-black italic tracking-tighter uppercase mb-2 leading-none">Total Earnings Saved</h3>
                                <p className="text-[10px] font-black text-blue-200 tracking-[0.2em] uppercase opacity-80 uppercase leading-none italic tracking-tighter">AI Node Recovery</p>
                            </div>
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2 uppercase italic tracking-tighter text-white">₹1,800</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 uppercase italic tracking-tighter">Total Payouts</p>
                            <h4 className="text-xl font-black italic tracking-tighter uppercase text-green-500 italic uppercase">₹2,400</h4>
                        </div>
                        <div className="glass-card p-6 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 uppercase italic tracking-tighter">Premium Paid</p>
                            <h4 className="text-xl font-black italic tracking-tighter uppercase text-red-400 italic uppercase">₹600</h4>
                        </div>
                    </div>
                </div>

                {/* Transactions List Column */}
                <div className="lg:col-span-2">
                    <div className="glass-card p-4 md:p-10 rounded-[4rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl overflow-hidden min-h-[500px]">
                        <h3 className="text-sm font-black italic tracking-tighter uppercase mb-8 px-4 flex items-center justify-between">
                            Recent Transactions
                            <span className="text-[10px] text-slate-500 normal-case tracking-normal">Displaying last 20 events</span>
                        </h3>

                        <div className="space-y-4">
                            {transactions.map((tx, i) => (
                                <motion.div 
                                    key={tx.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.06] transition-all hover:scale-[1.01]"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`p-4 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                                            tx.type === 'payout' ? 'bg-green-500/10 text-green-500 shadow-green-500/10 group-hover:scale-110' : 'bg-red-500/10 text-red-500 shadow-red-500/10 group-hover:scale-110'
                                        }`}>
                                            {tx.type === 'payout' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black italic tracking-tighter uppercase mb-1 uppercase italic">{tx.category}</h4>
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1 uppercase italic">
                                                    <Calendar className="w-3 h-3" /> {tx.date}
                                                </span>
                                                <span className="text-[10px] font-black text-green-500 flex items-center gap-1 uppercase italic">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xl font-black italic tracking-tighter uppercase italic uppercase leading-none mb-1 ${
                                            tx.type === 'payout' ? 'text-green-500' : 'text-white/60'
                                        }`}>
                                            {tx.amount}
                                        </p>
                                        <p className="text-[9px] font-black tracking-widest text-slate-600 uppercase italic">GS-TXN-491</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CloudRain = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 13h.01M16 17h.01M12 18h.01M8 17h.01M8 13h.01M12 14h.01M11 21a2 2 0 11-4 0 2 2 0 014 0zm7-11V9a7 7 0 00-14 0v1a4 4 0 00-1 7.94V16a5 5 0 0110 0v.94A4 4 0 0019 10z" />
    </svg>
);

const Activity = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

export default PaymentHistory;
