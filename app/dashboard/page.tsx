'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Trophy, 
  Wallet, 
  Settings, 
  LogOut, 
  User, 
  Crosshair, 
  TrendingUp, 
  CreditCard, 
  Plus, 
  Clock, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// --- MOCK USER DATA ---
const USER = {
  name: "Arjun Verma",
  codename: "NIGHT_STALKER",
  id: "OP-4921",
  rank: "Elite",
  balance: "₹1,450",
  stats: {
    matches: 42,
    wins: 12,
    earnings: "₹8,500",
    kd: "3.4"
  }
};

// --- MOCK REGISTERED TOURNAMENTS ---
const MY_MISSIONS = [
  { id: "bgmi-yuddh-s1", title: "YUDDH: Season 1", game: "BGMI", status: "Upcoming", time: "Starts in 2h 30m", fee: "₹100" },
  { id: "valo-weekends", title: "Valo Weekends", game: "Valorant", status: "Live", time: "Match in Progress", fee: "Free" },
  { id: "sniper-fury", title: "Sniper's Fury", game: "BGMI", status: "Completed", time: "Won ₹500", fee: "₹50" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30 flex flex-col md:flex-row">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="relative z-10 w-full md:w-64 bg-white/5 border-r border-white/10 flex flex-col justify-between shrink-0">
        
        {/* BRAND */}
        <div className="p-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              Gaming <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Chamber</span>
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Operator Console v2.0</p>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-1 px-4 space-y-2">
            <NavItem icon={<LayoutDashboard />} label="Command Center" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavItem icon={<Trophy />} label="My Missions" active={activeTab === 'missions'} onClick={() => setActiveTab('missions')} />
            <NavItem icon={<Wallet />} label="Digital Wallet" active={activeTab === 'wallet'} onClick={() => setActiveTab('wallet')} />
            <NavItem icon={<Settings />} label="System Config" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        {/* USER LOGOUT */}
        <div className="p-4 border-t border-white/10">
             <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-gray-400">
                <LogOut className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Disconnect</span>
             </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-10 flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">
                    Welcome, <span className="text-green-500">{USER.codename}</span>
                </h1>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                    <span className="bg-white/10 px-2 py-1 rounded">ID: {USER.id}</span>
                    <span className="flex items-center gap-1 text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        ONLINE
                    </span>
                </div>
            </div>
            <div className="flex gap-4">
                 {/* QUICK ACTIONS */}
                 <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase hover:bg-white/10 transition-colors">
                    Find Match
                 </button>
                 <button className="px-6 py-3 bg-green-500 text-black rounded-lg text-xs font-bold uppercase hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                    Deposit Funds
                 </button>
            </div>
        </header>

        {/* --- DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. WALLET CARD */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-1 bg-gradient-to-br from-white/5 to-black border border-white/10 p-6 rounded-2xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CreditCard className="w-24 h-24 rotate-12" />
                </div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Wallet Balance</h3>
                <p className="text-4xl font-mono font-bold text-white mb-6">{USER.balance}</p>
                <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-white/10 rounded-lg text-xs font-bold uppercase hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-3 h-3" /> Top Up
                    </button>
                    <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase hover:bg-white/10 transition-colors">
                        History
                    </button>
                </div>
            </motion.div>

            {/* 2. STATS ROW */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Matches" value={USER.stats.matches} icon={<Crosshair />} />
                <StatCard label="Victory" value={USER.stats.wins} icon={<Trophy />} color="text-yellow-400" />
                <StatCard label="K/D Ratio" value={USER.stats.kd} icon={<TrendingUp />} color="text-green-400" />
                <StatCard label="Earnings" value={USER.stats.earnings} icon={<Wallet />} color="text-purple-400" />
            </div>

            {/* 3. ACTIVE MISSIONS (Wide) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="md:col-span-3 bg-black/40 border border-white/10 rounded-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-green-500" />
                        Mission Log
                    </h3>
                    <button className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest">View All</button>
                </div>
                
                <div className="divide-y divide-white/5">
                    {MY_MISSIONS.map((m) => (
                        <div key={m.id} className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-12 rounded-full ${
                                    m.status === 'Live' ? 'bg-red-500 shadow-[0_0_10px_red]' : 
                                    m.status === 'Completed' ? 'bg-gray-500' : 'bg-green-500'
                                }`} />
                                <div>
                                    <h4 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">{m.title}</h4>
                                    <p className="text-xs text-gray-500 font-mono uppercase">{m.game} • Entry: {m.fee}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${
                                        m.status === 'Live' ? 'text-red-500 animate-pulse' : 'text-gray-400'
                                    }`}>
                                        {m.status}
                                    </p>
                                    <p className="text-sm font-mono text-white flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-gray-500" />
                                        {m.time}
                                    </p>
                                </div>
                                <Link href={`/tournament/${m.id}`} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase hover:bg-white/10 transition-colors">
                                    Intel
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENT: STAT CARD ---
const StatCard = ({ label, value, icon, color = "text-white" }: { label: string, value: string | number, icon: any, color?: string }) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors">
        <div className={`mb-4 opacity-50 ${color}`}>{icon}</div>
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
            <p className={`text-2xl font-mono font-bold ${color}`}>{value}</p>
        </div>
    </div>
);

// --- SUB-COMPONENT: NAV ITEM ---
const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
            active 
            ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(0,255,136,0.1)]' 
            : 'text-gray-400 hover:bg-white/5 hover:text-white'
        }`}
    >
        <div className="w-5 h-5">{icon}</div>
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
    </button>
);