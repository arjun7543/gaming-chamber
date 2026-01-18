'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Github, Disc } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Added Import

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const router = useRouter(); // Initialize Router

  // --- MOCK LOGIN FUNCTION ---
  const handleAuth = () => {
    // In a real app, you would validate inputs and call an API here.
    // For now, we just close the modal and go to dashboard.
    onClose();
    router.push('/dashboard');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(0,255,136,0.1)]"
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* DECORATIVE TOP BAR */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-green-500 to-purple-500" />

            <div className="p-8">
              {/* HEADER */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">
                  {mode === 'login' ? 'System Login' : 'New Operator'}
                </h2>
                <p className="text-gray-400 text-xs tracking-widest uppercase">
                  {mode === 'login' ? '// Enter Credentials' : '// Initialize Profile'}
                </p>
              </div>

              {/* FORM */}
              <div className="flex flex-col gap-4">
                
                {/* Name Field (Signup Only) */}
                {mode === 'signup' && (
                  <div className="group relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-green-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Codename"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-green-500 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-green-500 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500 focus:bg-white/10 transition-all"
                  />
                </div>

                {/* SUBMIT BUTTON (UPDATED) */}
                <button 
                  onClick={handleAuth} // Added Click Handler
                  className="mt-4 w-full bg-green-500 hover:bg-green-400 text-black font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
                >
                  {mode === 'login' ? 'Access System' : 'Register ID'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-gray-600 text-xs uppercase">Or connect with</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white py-3 rounded-xl transition-all">
                  <Disc className="w-5 h-5 text-[#5865F2]" />
                  <span className="text-xs font-bold uppercase">Discord</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white py-3 rounded-xl transition-all">
                  <Github className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Github</span>
                </button>
              </div>

              {/* TOGGLE MODE */}
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-gray-400 hover:text-green-400 text-xs uppercase tracking-widest transition-colors"
                >
                  {mode === 'login' 
                    ? "Don't have an ID? Create One" 
                    : "Already an operative? Login"}
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}