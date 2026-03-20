import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCcw, ArrowRight, ShieldCheck, User, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupKYC = () => {
    const [image, setImage] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const startCamera = async () => {
        setIsCapturing(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied", err);
            setIsCapturing(false);
        }
    };

    const capturePhoto = () => {
        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        setImage(canvas.toDataURL("image/png"));
        
        // Stop stream
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setIsCapturing(false);
    };

    const retake = () => {
        setImage(null);
        startCamera();
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
                        <ShieldCheck className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">Verify Your Identity</h1>
                    <p className="text-slate-500 font-medium text-sm">Take a quick selfie to secure your account.</p>
                </div>

                <div className="glass-card p-6 rounded-[3rem] border border-white/5 relative bg-white/[0.02]">
                    {/* Camera/Preview Area */}
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 mb-8">
                        {!image && !isCapturing && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-500">
                                <div className="p-6 bg-white/5 rounded-full"><User className="w-12 h-12 opacity-20" /></div>
                                <button 
                                    onClick={startCamera}
                                    className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors"
                                >
                                    Initialize Camera
                                </button>
                            </div>
                        )}

                        {isCapturing && (
                            <div className="relative w-full h-full">
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                                {/* Face Guide Overlay */}
                                <div className="absolute inset-0 border-[40px] border-slate-900/60 pointer-events-none">
                                    <div className="w-full h-full border-2 border-dashed border-blue-500/40 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-blue-500/20 animate-ping" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {image && (
                            <motion.img 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={image} 
                                className="w-full h-full object-cover scale-x-[-1]" 
                            />
                        )}
                        
                        {image && (
                            <div className="absolute top-4 right-4 p-2 bg-green-500 rounded-full text-white shadow-lg">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {!image ? (
                            <button 
                                onClick={isCapturing ? capturePhoto : startCamera}
                                className="w-full bg-blue-600 text-white rounded-2xl py-5 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <Camera className="w-4 h-4" /> {isCapturing ? "Capture Photo" : "Activate Camera"}
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={retake}
                                    className="bg-white/5 text-white border border-white/10 rounded-2xl py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                                >
                                    <RefreshCcw className="w-3.5 h-3.5" /> Retake
                                </button>
                                <button 
                                    onClick={() => navigate("/signup-processing")}
                                    className="bg-green-600 text-white rounded-2xl py-5 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-green-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-600/20"
                                >
                                    Continue <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="mt-8 text-center text-[9px] font-black uppercase tracking-widest text-slate-600 leading-relaxed uppercase">
                    Your biometric hash is encrypted via <span className="text-slate-400">AES-256</span>.<br/>No image data is stored on external servers.
                </p>
            </motion.div>
        </div>
    );
};

export default SignupKYC;
