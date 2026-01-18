'use client';
import { useState, use } from 'react'; // Added 'use' import
import Link from 'next/link';
import { ArrowLeft, Users, Trophy, Map, Calendar, Clock, Crosshair, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { notFound } from 'next/navigation';

// --- 1. THE "DATABASE" (Holds unique info for each ID) ---
const TOURNAMENTS_DB: Record<string, any> = {
  "bgmi-yuddh-s1": {
    title: "YUDDH: Season 1",
    game: "BGMI",
    mode: "SQUAD (TPP)",
    map: "Erangel",
    status: "Live",
    date: "Feb 15, 2026",
    time: "20:00 IST",
    entryFee: "₹100 / Squad",
    prizePool: "₹50,000",
    slots: { total: 100, filled: 84 },
    prizeSplit: [
      { rank: "1st", amount: "₹20,000" },
      { rank: "2nd", amount: "₹10,000" },
      { rank: "3rd", amount: "₹5,000" },
      { rank: "MVP", amount: "₹1,000" },
    ],
    rules: ["No Emulators.", "Hacks = Ban.", "Record gameplay if asked.", "Discord mandatory."]
  },
  "sniper-fury": {
    title: "Sniper's Fury",
    game: "BGMI",
    mode: "SOLO (Sniper Only)",
    map: "Miramar",
    status: "Open",
    date: "Feb 20, 2026",
    time: "21:00 IST",
    entryFee: "₹50 / Player",
    prizePool: "₹10,000",
    slots: { total: 50, filled: 12 },
    prizeSplit: [
      { rank: "1st", amount: "₹5,000" },
      { rank: "2nd", amount: "₹3,000" },
      { rank: "3rd", amount: "₹1,000" },
      { rank: "Most Kills", amount: "₹1,000" },
    ],
    rules: ["Bolt Action Snipers Only.", "Pistols Disabled.", "Teaming = Ban.", "No Grenades."]
  },
  "valo-weekends": {
    title: "Valo Weekends",
    game: "Valorant",
    mode: "5v5 Standard",
    map: "Ascent / Haven",
    status: "Closed",
    date: "Mar 01, 2026",
    time: "18:00 IST",
    entryFee: "FREE",
    prizePool: "₹25,000",
    slots: { total: 32, filled: 32 },
    prizeSplit: [
      { rank: "1st", amount: "₹15,000" },
      { rank: "2nd", amount: "₹10,000" },
    ],
    rules: ["Mumbai Server.", "Vanguard Required.", "Toxic comms = DQ.", "Standard VCT Rules."]
  },
  "midnight-brawl": {
    title: "Midnight Brawl",
    game: "CS2",
    mode: "1v1 Aim Map",
    map: "Aim_Redline",
    status: "Open",
    date: "Mar 05, 2026",
    time: "23:00 IST",
    entryFee: "₹20",
    prizePool: "₹5,000",
    slots: { total: 16, filled: 4 },
    prizeSplit: [
      { rank: "Winner", amount: "₹4,000" },
      { rank: "Runner Up", amount: "₹1,000" },
    ],
    rules: ["AK-47 / M4 Only.", "First to 16 rounds.", "128 Tick Server.", "No AWP."]
  },
  "apex-arena": {
    title: "Apex Legends: Arena",
    game: "Apex Legends",
    mode: "TRIO",
    map: "World's Edge",
    status: "Open",
    date: "Mar 10, 2026",
    time: "20:00 IST",
    entryFee: "₹80 / Team",
    prizePool: "₹15,000",
    slots: { total: 20, filled: 8 },
    prizeSplit: [{ rank: "1st", amount: "₹10,000" }, { rank: "2nd", amount: "₹5,000" }],
    rules: ["PC Only.", "Controller Tap-strafe limited.", "ALGS Ruleset."]
  },
  "codm-mayhem": {
    title: "Mobile Mayhem",
    game: "CODM",
    mode: "SQUAD (MP)",
    map: "Nuketown / Raid",
    status: "Open",
    date: "Mar 12, 2026",
    time: "19:00 IST",
    entryFee: "FREE",
    prizePool: "₹8,000",
    slots: { total: 16, filled: 15 },
    prizeSplit: [{ rank: "1st", amount: "₹5,000" }, { rank: "2nd", amount: "₹3,000" }],
    rules: ["Mobile Only (No iPad).", "Hardpoint Mode.", "Best of 3."]
  },
  "tekken-iron": {
    title: "Tekken Iron Fist",
    game: "Tekken 8",
    mode: "1v1",
    map: "Arena",
    status: "Open",
    date: "Mar 20, 2026",
    time: "21:00 IST",
    entryFee: "₹200",
    prizePool: "₹20,000",
    slots: { total: 64, filled: 2 },
    prizeSplit: [{ rank: "1st", amount: "₹15,000" }, { rank: "2nd", amount: "₹5,000" }],
    rules: ["PC/PS5 Crossplay.", "FT2 Sets.", "Wired Connection Only."]
  },
  "ow-showdown": {
    title: "Cyberpunk Showdown",
    game: "Overwatch 2",
    mode: "6v6 (Custom)",
    map: "King's Row",
    status: "Open",
    date: "Mar 25, 2026",
    time: "18:00 IST",
    entryFee: "₹150 / Team",
    prizePool: "₹12,000",
    slots: { total: 16, filled: 5 },
    prizeSplit: [{ rank: "1st", amount: "₹8,000" }, { rank: "2nd", amount: "₹4,000" }],
    rules: ["Role Queue Locked.", "OW1 Classic Rules.", "PC Only."]
  }
};

// FIX: Type definition updated to Promise
export default function TournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<'briefing' | 'squad'>('briefing');
  
  // FIX: Unwrap params using React.use()
  const { id } = use(params);
  
  // --- 2. LOOKUP LOGIC ---
  const tournament = TOURNAMENTS_DB[id];

  // If ID doesn't exist (e.g. user typed random URL), show 404
  if (!tournament) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-white text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-4xl font-black uppercase">Mission Not Found</h1>
            <p className="text-gray-500 mt-2">The requested dossier does not exist.</p>
            <Link href="/" className="mt-6 px-6 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all">Return to Base</Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-16">
        
        {/* NAV BACK */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Abort Mission / Return</span>
        </Link>

        {/* HEADER: MISSION TITLE */}
        <div className="border-l-4 border-green-500 pl-6 mb-12">
            <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded border ${tournament.status === 'Live' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                    {tournament.status}
                </span>
                <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded">
                    {tournament.game}
                </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                {tournament.title}
            </h1>
        </div>

        {/* LAYOUT: LEFT (Details) & RIGHT (Action) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- LEFT COLUMN: INTEL --- */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. KEY INTEL GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <IntelCard label="Map Region" value={tournament.map} icon={<Map className="w-4 h-4" />} />
                    <IntelCard label="Mode" value={tournament.mode} icon={<Crosshair className="w-4 h-4" />} />
                    <IntelCard label="Date" value={tournament.date} icon={<Calendar className="w-4 h-4" />} />
                    <IntelCard label="Deployment" value={tournament.time} icon={<Clock className="w-4 h-4" />} />
                    <IntelCard label="Entry Fee" value={tournament.entryFee} icon={<Shield className="w-4 h-4" />} color="text-yellow-400" />
                    <IntelCard label="Prize Pool" value={tournament.prizePool} icon={<Trophy className="w-4 h-4" />} color="text-green-400" />
                </div>

                {/* 2. PRIZE BREAKDOWN */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Bounty Distribution
                    </h3>
                    <div className="space-y-3">
                        {tournament.prizeSplit.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                <span className={`font-mono text-sm font-bold ${i === 0 ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    {item.rank}
                                </span>
                                <span className="font-mono text-white font-bold">{item.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. RULES & PROTOCOLS */}
                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2 text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                        Mission Protocols
                    </h3>
                    <ul className="space-y-3">
                        {tournament.rules.map((rule: string, i: number) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                                <span className="shrink-0 mt-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* --- RIGHT COLUMN: SQUAD REGISTRATION --- */}
            <div className="lg:col-span-1">
                <div className="sticky top-8 bg-black border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,136,0.05)]">
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                            <span>Slots Filled</span>
                            <span>{tournament.slots.filled} / {tournament.slots.total}</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-green-500 shadow-[0_0_10px_#00ff88]" 
                                style={{ width: `${(tournament.slots.filled / tournament.slots.total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="flex p-1 bg-white/5 rounded-lg mb-6">
                        <button 
                            onClick={() => setActiveTab('briefing')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'briefing' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Overview
                        </button>
                        <button 
                             onClick={() => setActiveTab('squad')}
                             className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${activeTab === 'squad' ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(0,255,136,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Register
                        </button>
                    </div>

                    {/* DYNAMIC CONTENT */}
                    <div className="min-h-[300px]">
                        {activeTab === 'briefing' ? (
                            <div className="text-center py-10">
                                <Shield className="w-16 h-16 text-white/5 mx-auto mb-4" />
                                <p className="text-sm text-gray-400 px-4 leading-relaxed">
                                    Prepare your squad. Ensure all members have their IDs ready before initiating registration sequence.
                                </p>
                                <button 
                                    onClick={() => setActiveTab('squad')}
                                    className="mt-6 w-full py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-green-500/10 hover:border-green-500 hover:text-green-400 transition-all font-bold uppercase tracking-widest text-xs"
                                >
                                    Start Registration
                                </button>
                            </div>
                        ) : (
                            <form className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Squad Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-green-500 focus:outline-none transition-colors" placeholder="e.g. Team Soul" />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Operative IDs</label>
                                    {[1, 2, 3, 4].map((n) => (
                                        <div key={n} className="flex gap-2">
                                            <span className="shrink-0 w-6 h-9 flex items-center justify-center bg-white/5 rounded text-[10px] font-mono text-gray-500">{n}</span>
                                            <input type="text" className="w-full bg-black/50 border border-white/10 rounded px-3 text-xs text-white focus:border-green-500 focus:outline-none transition-colors" placeholder={`Player ${n} ID`} />
                                        </div>
                                    ))}
                                </div>

                                <button type="button" className="w-full py-4 mt-4 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-widest text-sm rounded-lg shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all flex items-center justify-center gap-2 group">
                                    Confirm Entry
                                    <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </button>
                                <p className="text-[10px] text-center text-gray-500 mt-2">
                                    Fee will be deducted from wallet instantly.
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: INFO CARD ---
const IntelCard = ({ label, value, icon, color = "text-white" }: { label: string, value: string, icon: any, color?: string }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors">
        <div className="text-gray-500 mb-2">{icon}</div>
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
            <p className={`font-mono font-bold text-sm md:text-base ${color}`}>{value}</p>
        </div>
    </div>
);