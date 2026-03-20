import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: 'Infrastructure', href: '#features' },
        { name: 'Protection', href: '#solution' },
        { name: 'Workflow', href: '#how-it-works' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
            <div className="content-container">
                <div className={`relative flex items-center justify-between px-8 py-3 transition-all duration-700 ${scrolled ? 'bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl' : 'bg-transparent border-transparent'}`}>
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 group cursor-pointer"
                    >
                        <div className="p-2 bg-blue-600 rounded-2xl text-white transform group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-blue-500/30">
                            <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                            GigShield
                        </span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-12 bg-white/5 px-8 py-3 rounded-full border border-white/5">
                        {menuItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                href={item.href}
                                className="text-[10px] font-black tracking-[0.3em] text-slate-400 hover:text-white transition-colors relative group uppercase"
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link 
                            to="/login"
                            className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center gap-2 group border-none shadow-xl shadow-white/5"
                        >
                            Sign In <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="p-2 text-white"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden content-container mt-4"
                    >
                        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col gap-6">
                            {menuItems.map((item) => (
                                <a 
                                    key={item.name}
                                    href={item.href} 
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-black text-white hover:text-blue-500 transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="h-px bg-white/5 w-full" />
                            <div className="flex flex-col gap-4">
                                <button className="w-full py-5 font-black text-white uppercase tracking-widest border border-white/10 rounded-2xl">
                                    Login
                                </button>
                                <button className="bg-blue-600 w-full py-5 text-lg font-black text-white rounded-2xl border-none">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

