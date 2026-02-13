import { useState } from "react";
import { motion } from "framer-motion";
import {
    DollarSign, TrendingUp, PieChart, Users,
    ArrowUpRight, ShieldCheck, CreditCard,
    Briefcase, Zap, Info, ChevronRight, Wallet
} from "lucide-react";

const Funding = () => {
    const sponsorships = [
        {
            id: 1,
            title: "Global Soccer Elite Program",
            provider: "Adidas India",
            funding_type: "Equipment + Stipend",
            amount: "₹2,50,000 / Season",
            requirement: "District Rank < 10",
            status: "Apply Now"
        },
        {
            id: 2,
            title: "Next-Gen Athletics Grant",
            provider: "Sports Authority Foundation",
            funding_type: "Full Training Grant",
            amount: "₹5,00,000 / Annual",
            requirement: "College Level Gold Medalist",
            status: "Under Review"
        }
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Financial Dashboard Header */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -mr-48 -mt-48 rounded-full"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-4 bg-primary text-white rounded-3xl shadow-xl shadow-primary/20">
                                    <DollarSign size={32} />
                                </div>
                                <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Funding Pipeline</h1>
                            </div>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-md mb-8">
                                Secure your athletic future. Apply for corporate sponsorships, government grants, or launch a verified crowdfunding identity for global scout support.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-8 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl hover:bg-orange-600 transition-all flex items-center gap-3">
                                    <Briefcase size={16} /> Apply for Funding
                                </button>
                                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">
                                    Financial History
                                </button>
                            </div>
                        </div>

                        <div className="w-full md:w-64 space-y-4">
                            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group-hover:border-primary/20 transition-all">
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Total Funded</p>
                                <p className="text-2xl font-black text-white italic">₹0.00</p>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group-hover:border-primary/20 transition-all">
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Active Bids</p>
                                <p className="text-2xl font-black text-primary italic">02</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between group hover:border-blue-500/30 transition-all relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-colors"></div>
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                                <Users size={24} />
                            </div>
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                                <Zap size={10} fill="currentColor" /> Crowdfunding LIVE
                            </span>
                        </div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-4">Community Support</h3>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed mb-8 uppercase tracking-widest">
                            Enable fans and believers to invest in your training journey directly.
                        </p>
                    </div>
                    <button className="w-full py-4 bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-[.2em] shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all">
                        Launch Campaign
                    </button>
                </div>
            </section>

            {/* Application List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest ml-4">Available Programs</h2>
                    <div className="space-y-4">
                        {sponsorships.map((spon) => (
                            <motion.div
                                key={spon.id}
                                whileHover={{ scale: 1.01 }}
                                className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-primary/40 transition-all flex items-center justify-between group"
                            >
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-black text-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        {spon.provider.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-white uppercase italic tracking-tight">{spon.title}</h4>
                                        <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">
                                            <ShieldCheck size={12} className="text-green-500" /> {spon.provider} • {spon.funding_type}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-white mb-1 italic">{spon.amount.split(' ')[0]}</div>
                                    <button className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${spon.status === 'Apply Now'
                                            ? "bg-primary/10 border-primary text-primary hover:bg-primary hover:text-white"
                                            : "bg-white/5 border-white/10 text-gray-500"
                                        }`}>
                                        {spon.status}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="bg-black/40 border border-white/5 rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 relative">
                        <Wallet size={48} className="text-gray-700" />
                        <div className="absolute -top-2 -right-2 bg-primary text-white p-2 rounded-xl border-4 border-[#050505]">
                            <PieChart size={14} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic mb-4">Financial Identity Vault</h3>
                    <p className="text-xs text-gray-500 font-black uppercase tracking-widest leading-relaxed max-w-sm mb-10">
                        Connect your verified UPI or bank credentials to receive automated stipends from the Athlixir Ecosystem.
                    </p>
                    <div className="w-full flex gap-4 max-w-md">
                        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all flex items-center justify-center gap-3">
                            <CreditCard size={16} /> Link Wallet
                        </button>
                        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all flex items-center justify-center gap-3">
                            <Info size={16} /> Guide
                        </button>
                    </div>
                </section>
            </div>

            {/* Bottom Support Info */}
            <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-primary/20 text-primary rounded-xl">
                        <ShieldCheck size={20} />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[.25em]">Your financial data is protected by Athlixir's decentralized identity protocols.</p>
                </div>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2">
                    Security Report <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default Funding;
