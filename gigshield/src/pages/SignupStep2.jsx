import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, MapPin, Briefcase, Globe, Landmark } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api/config';

const indianStates = {
  "Tamilnadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"]
};

const SignupStep2 = () => {
    const [platform, setPlatform] = useState("Swiggy");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const partnerId = localStorage.getItem("temp_pid");

    const handleContinue = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/auth/update-profile`, {
                partnerId,
                platform,
                city,
                state
            });
            navigate("/signup-step3");
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-archivo">
            <div className="absolute inset-0 dot-pattern opacity-[0.05] -z-10" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <motion.div 
                        whileHover={{ rotate: 12 }}
                        className="p-3 bg-blue-600 rounded-2xl text-white shadow-2xl shadow-blue-500/20 mb-6"
                    >
                        <Briefcase className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Tell Us About Your Work</h1>
                    <p className="text-slate-500 font-medium text-sm">This helps us understand your earning patterns.</p>
                </div>

                <div className="glass-card p-10 rounded-[4rem] border border-white/5 relative bg-white/[0.02]">
                    <form onSubmit={handleContinue} className="space-y-6">
                        {/* Platform Dropdown */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Platform</label>
                            <div className="relative group/input">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <select 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all appearance-none cursor-pointer"
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                >
                                    <option value="Swiggy" className="bg-slate-900">Swiggy</option>
                                    <option value="Zomato" className="bg-slate-900">Zomato</option>
                                    <option value="Zepto" className="bg-slate-900">Zepto</option>
                                    <option value="Porter" className="bg-slate-900">Porter</option>
                                    <option value="Others" className="bg-slate-900">Others</option>
                                </select>
                            </div>
                        </div>

                        {/* State Dropdown */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">State</label>
                            <div className="relative group/input">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <select 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all appearance-none cursor-pointer"
                                    value={state}
                                    onChange={(e) => {
                                        setState(e.target.value);
                                        setCity(""); // Reset city when state changes
                                    }}
                                    required
                                >
                                    <option value="" disabled className="bg-slate-900">Select State</option>
                                    {Object.keys(indianStates).map(s => (
                                        <option key={s} value={s} className="bg-slate-900">{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* City/District Dropdown */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">City / District</label>
                            <div className="relative group/input">
                                <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${state ? 'text-blue-500' : 'text-slate-500'}`} />
                                <select 
                                    className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-sm focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all appearance-none cursor-pointer ${!state ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    disabled={!state}
                                    required
                                >
                                    <option value="" disabled className="bg-slate-900">Select City</option>
                                    {state && indianStates[state].map(c => (
                                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button 
                            disabled={isLoading || !city}
                            className={`w-full rounded-2xl py-5 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 ${
                                city ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            {isLoading ? "PROVISIONING..." : <>Continue <ArrowRight className="w-4 h-4 shadow-blue-500/40" /></>}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupStep2;
