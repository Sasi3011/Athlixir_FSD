import { useState } from "react";
import { motion } from "framer-motion";
import {
    Building2, MapPin, Star, Phone,
    Globe, Search, Filter, ShieldCheck,
    CheckCircle2, Users, Target
} from "lucide-react";

const Academies = () => {
    const academies = [
        { id: 1, name: "Elite Athletics Academy", location: "Bangalore, KA", rating: 4.8, students: "500+", facilities: ["Track", "Gym", "Dorm"], contact: "+91 98XXX XXX01", verified: true },
        { id: 2, name: "North Star Sports Hub", location: "Chandigarh, PB", rating: 4.6, students: "320+", facilities: ["Indoor Gym", "Pool"], contact: "+91 98XXX XXX02", verified: true },
        { id: 3, name: "Heritage Track Club", location: "Chennai, TN", rating: 4.9, students: "150+", facilities: ["Grass Track", "Physio"], contact: "+91 98XXX XXX03", verified: true },
        { id: 4, name: "Vanguard Javelin Center", location: "Patiala, PB", rating: 4.7, students: "80+", facilities: ["Specialized Area"], contact: "+91 98XXX XXX04", verified: false },
    ];

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Academy <span className="text-primary NOT-italic">Directory</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Discover elite training centers & professional hubs</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Locate academy node..."
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 w-72 text-sm focus:outline-none focus:border-primary/50 transition-all font-bold"
                        />
                    </div>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {academies.map((academy, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={academy.id}
                        className="bg-black/40 border border-white/5 rounded-[3rem] p-10 group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center text-primary text-2xl font-black border border-primary/20 group-hover:bg-primary/20 transition-all">
                                    <Building2 size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{academy.name}</h3>
                                        {academy.verified && <CheckCircle2 size={16} className="text-primary fill-primary/10" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        <MapPin size={12} className="text-primary" /> {academy.location}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1 text-primary">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-xl font-black italic">{academy.rating}</span>
                                </div>
                                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1 italic">Public Rating</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Active Nodes</div>
                                <div className="text-sm font-black text-white italic">{academy.students}</div>
                            </div>
                            <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Primary Sport</div>
                                <div className="text-sm font-black text-white italic">Track</div>
                            </div>
                            <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Status</div>
                                <div className="text-[9px] font-black text-green-500 uppercase italic">Admissions Open</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-10">
                            {academy.facilities.map((fac, idx) => (
                                <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                    {fac}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                Request Information
                            </button>
                            <button className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-500 hover:text-white transition-all group/btn">
                                <Phone size={22} className="group-hover/btn:text-primary transition-colors" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-10 bg-black/40 border border-white/5 rounded-[3rem] text-center">
                <Target size={32} className="text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white uppercase italic mb-2">Can't find your <span className="text-primary NOT-italic">Academy?</span></h3>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-8">If you're an administrator, you can list your facility for public discovery.</p>
                <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-[2.5rem] text-sm font-black text-white uppercase tracking-widest hover:border-primary transition-all">
                    Register Facility Hub
                </button>
            </div>
        </div>
    );
};

export default Academies;
