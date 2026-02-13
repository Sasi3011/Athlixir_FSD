import { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar, MapPin, Users, Info,
    ChevronRight, Zap, CheckCircle2,
    CalendarCheck, Filter, Search
} from "lucide-react";

const Events = () => {
    const events = [
        {
            id: 1,
            title: "Summer Athletics Open",
            date: "June 24-26, 2024",
            venue: "JLN Stadium, Chennai",
            eligibility: "State/National Verified Athletes",
            registered: 480,
            status: "Open",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            title: "Inter-College Cup Finals",
            date: "May 15-20, 2024",
            venue: "NMC Grounds, Pune",
            eligibility: "College Level Teams Only",
            registered: 1200,
            status: "Closing Soon",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80"
        },
        {
            id: 3,
            title: "Scout Showcase Weekend",
            date: "July 02, 2024",
            venue: "Football Academy, Mumbai",
            eligibility: "Top 100 Ranked Dashboard Users",
            registered: 75,
            status: "Invited Only",
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Events Header */}
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="text-primary" size={28} />
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Event Chronicle</h1>
                    </div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[.3em]">Upcoming ecosystem competitions & summits</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-1 flex">
                        <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Upcoming</button>
                        <button className="px-6 py-2.5 text-gray-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Registered</button>
                    </div>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"><Filter size={20} /></button>
                </div>
            </section>

            {/* Featured Event */}
            <section className="relative h-[400px] rounded-[3rem] overflow-hidden group">
                <img src={events[0].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-10 lg:p-16 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl">Featured Competition</span>
                        <span className="text-white/60 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Zap size={14} className="text-yellow-500" /> High-Level Scouting Opportunity
                        </span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6 group-hover:translate-x-4 transition-transform duration-700">{events[0].title}</h2>
                    <div className="flex flex-wrap gap-10 text-white font-black uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-3">
                            <CalendarCheck className="text-primary" size={24} />
                            <div>
                                <p className="text-[9px] text-gray-400 opacity-70">Schedule</p>
                                <span className="text-sm">{events[0].date}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-white/20 pl-10">
                            <MapPin className="text-primary" size={24} />
                            <div>
                                <p className="text-[9px] text-gray-400 opacity-70">Battleground</p>
                                <span className="text-sm">{events[0].venue}</span>
                            </div>
                        </div>
                        <button className="ml-auto px-10 py-5 bg-white text-black rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl">
                            Synchronize Pass
                        </button>
                    </div>
                </div>
            </section>

            {/* Other Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                {events.slice(1).map((ev, i) => (
                    <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-primary/30 transition-all group"
                    >
                        <div className="h-56 relative overflow-hidden">
                            <img src={ev.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-6 left-6">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-2xl ${ev.status === 'Closing Soon' ? "bg-orange-500 text-white border-orange-400" : "bg-blue-500 text-white border-blue-400"
                                    }`}>
                                    {ev.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-2 group-hover:text-primary transition-colors">{ev.title}</h3>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        <CalendarCheck size={14} className="text-primary" /> {ev.date}
                                    </p>
                                    <p className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        <MapPin size={14} className="text-primary" /> {ev.venue}
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-white/5 border border-white/5 rounded-2xl mb-8 group-hover:border-primary/20 transition-all flex flex-col gap-3">
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-gray-500">Eligibility</span>
                                    <span className="text-white underline">{ev.eligibility}</span>
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                    <span className="text-gray-500">Slots Filled</span>
                                    <span className="text-white">{ev.registered} / 2500</span>
                                </div>
                            </div>

                            <button className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-3">
                                Identity Registration <ChevronRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {/* Calendar Integrated Card */}
                <div className="bg-white/5 border-2 border-dashed border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group hover:border-primary/20 transition-all">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                        <Users size={32} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase italic mb-4">Host an Invitational</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                        Organizing a meet or championship? Deploy your event to the Athlixir network.
                    </p>
                    <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-primary transition-all">Launch Event Engine</button>
                </div>
            </div>
        </div>
    );
};

export default Events;
