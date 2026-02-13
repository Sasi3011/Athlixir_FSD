import { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar, MapPin, Globe, Trophy,
    ArrowUpRight, Clock, Target, Plus, Search
} from "lucide-react";

const Events = () => {
    const events = [
        { id: 1, name: "National Athletics Championship", date: "Feb 28, 2026", location: "Stadium One, New Delhi", type: "Tournament", participation: "Elite/State", prize: "₹ 5,00,000" },
        { id: 2, name: "Elite Sprint Trials 2026", date: "Mar 05, 2026", location: "Kanteerava, Bangalore", type: "Trials", participation: "Open Entry", prize: "Scholarship" },
        { id: 3, name: "Public Marathon for Youth", date: "Mar 15, 2026", location: "Marina Beach, Chennai", type: "Public Event", participation: "All Categories", prize: "Funding" },
        { id: 4, name: "Inter-State Selection Meet", date: "Mar 22, 2026", location: "Gachibowli, Hyderabad", type: "Selection", participation: "State Level", prize: "National Ticket" },
    ];

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Public <span className="text-primary NOT-italic">Tournaments</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Explore upcoming meets, trials, and public events</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5">
                    <Globe size={18} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Global Event Calendar</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map((event, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={event.id}
                        className="bg-black/40 border border-white/5 rounded-[3rem] p-10 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Trophy size={100} />
                        </div>

                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary/10 border border-primary/20 rounded-3xl">
                                <span className="text-[9px] font-black uppercase text-primary">{event.date.split(' ')[0]}</span>
                                <span className="text-3xl font-black text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                            </div>
                            <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest italic group-hover:text-primary transition-colors">
                                {event.type}
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors mb-2">{event.name}</h3>
                                <div className="flex items-center gap-2 text-gray-500 text-[11px] font-black uppercase tracking-widest">
                                    <MapPin size={14} className="text-primary" /> {event.location}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                    <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Participation</div>
                                    <div className="text-xs font-black text-white italic">{event.participation}</div>
                                </div>
                                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                    <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Incentive / Prize</div>
                                    <div className="text-xs font-black text-primary italic">{event.prize}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                                Register / Attend
                            </button>
                            <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-gray-500 hover:text-white transition-all">
                                View Full Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-10 bg-primary/5 border border-primary/10 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary/30">
                        <Plus size={32} />
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-white uppercase italic">Host Your Own <span className="text-primary NOT-italic">Event?</span></h4>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Initialize public tournaments or local talent hunts</p>
                    </div>
                </div>
                <button className="px-10 py-5 bg-white text-black font-black rounded-3xl text-sm uppercase tracking-widest hover:scale-105 transition-all">
                    Initiate Node
                </button>
            </div>
        </div>
    );
};

export default Events;
