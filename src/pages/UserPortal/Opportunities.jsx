import { useState } from "react";
import { motion } from "framer-motion";
import {
    Briefcase, Handshake, Target, Users,
    ArrowUpRight, ShieldCheck, Heart,
    Zap, Globe, Filter, Search, Award
} from "lucide-react";

const Opportunities = () => {
    const opportunities = [
        { id: 1, athlete: "Rahul Sharma", sport: "Sprinting", goal: "₹ 50,000", raised: "₹ 12,000", type: "Funding Request", expires: "12 Days", focus: "New Spikes & Nutrition" },
        { id: 2, athlete: "Vikram Singh", sport: "Javelin", goal: "₹ 2,00,000", raised: "₹ 1,85,000", type: "Elite Scholarship", expires: "4 Days", focus: "International Training Meet" },
        { id: 3, athlete: "Sneha Reddy", sport: "High Jump", goal: "₹ 35,000", raised: "₹ 0", type: "Trial Support", expires: "20 Days", focus: "Inter-State Travel Costs" },
        { id: 4, athlete: "Priya Mani", sport: "Long Jump", goal: "₹ 80,000", raised: "₹ 45,000", type: "Medical Recovery", expires: "8 Days", focus: "Physiotherapy Cycle" },
    ];

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Growth <span className="text-primary NOT-italic">Opportunities</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Empower talent through funding, scholarships, and sponsorships</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-8 py-3.5 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
                        <Plus size={16} /> New Listing
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Listings", value: "24", icon: Briefcase, color: "text-blue-500" },
                    { label: "Total Funding Goal", value: "₹ 12L", icon: Handshake, color: "text-primary" },
                    { label: "Active Sponsors", value: "82", icon: Users, color: "text-purple-500" },
                    { label: "Success Rate", value: "92%", icon: Zap, color: "text-yellow-500" },
                ].map((stat, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="relative z-10">
                            <stat.icon size={20} className={`${stat.color} mb-4`} />
                            <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</h3>
                            <div className="text-2xl font-black text-white italic">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {opportunities.map((opp, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={opp.id}
                        className="bg-black/40 border border-white/5 rounded-[3rem] p-10 group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-orange-600/10 flex items-center justify-center text-primary text-2xl font-black border border-primary/20">
                                    {opp.athlete.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{opp.athlete}</h3>
                                        <ShieldCheck size={16} className="text-primary fill-primary/10" />
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        {opp.sport} • <span className="text-primary">{opp.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1 italic">Expires In</div>
                                <div className="text-sm font-black text-red-500 uppercase">{opp.expires}</div>
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <Award size={14} className="text-primary" />
                                    <span className="text-[9px] font-black text-white uppercase tracking-widest italic">Core focus: {opp.focus}</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-gray-500">Collected: <span className="text-white">{opp.raised}</span></span>
                                        <span className="text-gray-500">Target: <span className="text-white">{opp.goal}</span></span>
                                    </div>
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(parseInt(opp.raised.replace(/[^\d]/g, '')) / parseInt(opp.goal.replace(/[^\d]/g, ''))) * 100}%` }}
                                            className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(255,87,34,0.4)]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-3">
                                <Heart size={16} fill="white" /> Back this Talent
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-gray-500 hover:text-white transition-all">
                                View Full Identity
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-10 bg-primary/5 border border-primary/20 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase italic mb-2">Are you a <span className="text-primary NOT-italic">Corporate Sponsor?</span></h3>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Access exclusive bulk scholarship programs & NGO participation nodes.</p>
                    </div>
                    <button className="px-10 py-5 bg-white text-black font-black rounded-3xl text-sm uppercase tracking-widest hover:scale-105 transition-all">
                        Corporate Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

const Plus = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default Opportunities;
