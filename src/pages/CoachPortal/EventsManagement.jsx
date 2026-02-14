import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar, MapPin, Target, Users, Plus,
    Search, X, Save, Clock, ChevronRight,
    SearchCheck, Globe, Trophy
} from "lucide-react";

const EventsManagement = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [events, setEvents] = useState([
        { id: 1, name: "State Selection Trials", date: "Feb 24, 2026", location: "Stadium One", level: "State", participation: 32 },
        { id: 2, name: "Elite Sprint Meet", date: "Mar 05, 2026", location: "Central Heights", level: "National", participation: 12 },
        { id: 3, name: "District Talent Hunt", date: "Mar 12, 2026", location: "Public Ground", level: "District", participation: 45 },
    ]);

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 italic">Event <span className="text-primary NOT-italic">Operations</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Orchestrate trials, meets, and development sessions</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-8 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                    <Plus size={18} /> Schedule New Event
                </button>
            </div>

            {/* Quick Filter / Search */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-[2.5rem]">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Filter event database..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-bold"
                    />
                </div>
                <div className="flex items-center gap-4 pr-2">
                    <div className="flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <Globe size={16} /> Regional Sync
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 gap-6">
                {events.map((event, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={event.id}
                        className="bg-black/40 border border-white/5 rounded-[3rem] p-8 flex flex-col lg:flex-row lg:items-center gap-10 hover:border-primary/20 transition-all group"
                    >
                        {/* Event Date/Time */}
                        <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-[2.5rem] min-w-[120px]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{event.date.split(' ')[0]}</span>
                            <span className="text-3xl font-black text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">{event.date.split(' ')[2]}</span>
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{event.name}</h3>
                                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-[9px] font-black uppercase tracking-widest">
                                    {event.level}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-8">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MapPin size={16} className="text-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Users size={16} className="text-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{event.participation} Athletes Assigned</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Clock size={16} className="text-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-widest italic underline">Check-in at 08:00 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2">
                                <Plus size={16} /> Assign
                            </button>
                            <button className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Create Event Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCreateModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-2xl bg-[#080808] border border-white/10 rounded-[3rem] p-10 relative z-10 shadow-[0_0_100px_rgba(255,87,34,0.1)]"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">Initialize <span className="text-primary NOT-italic">Event</span></h2>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Configuring new operational node</p>
                                </div>
                                <button onClick={() => setShowCreateModal(false)} className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Event Identification</label>
                                    <input
                                        type="text"
                                        placeholder="Enter event name (e.g. Annual Selection Meet)"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Execution Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                            <input
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Tier Level</label>
                                        <div className="relative">
                                            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none uppercase text-[10px] font-black tracking-widest cursor-pointer">
                                                <option>District</option>
                                                <option>State</option>
                                                <option>National</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Deployment Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Specify venue or stadium..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-5 bg-primary text-white font-black rounded-3xl text-sm uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-3 mt-4">
                                    <Save size={20} /> Deploy Event
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventsManagement;
