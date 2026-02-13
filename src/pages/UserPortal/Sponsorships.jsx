import { useState } from "react";
import { motion } from "framer-motion";
import {
    Handshake, Trophy, Activity, MessageSquare,
    ChevronRight, ArrowUpRight, Zap, Target,
    ShieldCheck, Star, Users, Briefcase
} from "lucide-react";

const Sponsorships = () => {
    const activeSponsorships = [
        { id: 1, athlete: "Vikram Singh", sport: "Javelin", commitment: "Yearly", status: "Active", growth: "+12%", lastUpdate: "3d ago" },
        { id: 2, athlete: "Rahul Sharma", sport: "Sprinting", commitment: "Event-based", status: "Pending", growth: "+5%", lastUpdate: "1d ago" },
    ];

    const openRequests = [
        { id: 3, athlete: "Priya Mani", sport: "Long Jump", level: "State", rank: "#12", fundingGoal: "₹ 80,000", match: "94%" },
        { id: 4, athlete: "Arjun Kumar", sport: "Sprinting", level: "District", rank: "#2", fundingGoal: "₹ 25,000", match: "88%" },
    ];

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Asset <span className="text-primary NOT-italic">Portfolio</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Monitoring talent nodes under your active sponsorship</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                        Transaction History
                    </button>
                    <button className="px-6 py-3 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                        New Contract
                    </button>
                </div>
            </div>

            {/* Active Sponsorships */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white italic">Active <span className="text-primary NOT-italic">Contracts</span></h2>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 italic">2 nodes monitored</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {activeSponsorships.map((sub, i) => (
                        <div key={sub.id} className="bg-black/40 border border-white/5 rounded-[3rem] p-10 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-opacity">
                                <Handshake size={80} />
                            </div>

                            <div className="flex justify-between items-start mb-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-orange-600/10 flex items-center justify-center text-primary text-2xl font-black border border-primary/20">
                                        {sub.athlete.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{sub.athlete}</h3>
                                            <ShieldCheck size={16} className="text-primary fill-primary/10" />
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                            {sub.sport} • {sub.commitment} Tier
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    {sub.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="text-primary" size={14} />
                                        <span className="text-[8px] font-black text-gray-600 uppercase">Growth Multiplier</span>
                                    </div>
                                    <div className="text-2xl font-black text-white italic">{sub.growth}</div>
                                </div>
                                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Activity className="text-primary" size={14} />
                                        <span className="text-[8px] font-black text-gray-600 uppercase">Audit Status</span>
                                    </div>
                                    <div className="text-xs font-black text-gray-400 uppercase italic">Up to date</div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn">
                                    Digital Audit <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-500 hover:text-white transition-all">
                                    <MessageSquare size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sponsorship Exploration */}
            <section className="space-y-6 pt-10">
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white italic">Discovery <span className="text-primary NOT-italic">Requests</span></h2>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary italic underline cursor-pointer">View matches</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {openRequests.map((req, i) => (
                        <div key={req.id} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:border-primary/20 transition-all group">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary font-black uppercase text-lg border border-white/10">
                                        {req.athlete.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-white uppercase group-hover:text-primary transition-colors">{req.athlete}</h4>
                                        <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{req.sport} • {req.level} Tier</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[8px] font-black text-primary uppercase mb-1">Match Index</div>
                                    <div className="text-xl font-black text-white italic leading-none">{req.match}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl mb-8">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-gray-600 uppercase mb-1">Required Commitment</span>
                                    <span className="text-sm font-black text-white italic">{req.fundingGoal}</span>
                                </div>
                                <div className="px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-black text-primary uppercase">
                                    Incentivized
                                </div>
                            </div>

                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-primary transition-all">
                                Review Application Hub
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const TrendingUp = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

export default Sponsorships;
