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
                    <h1 className="text-2xl font-bold text-white mb-1">Events</h1>
                    <p className="text-sm text-gray-500">Schedule and manage events and trials</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> Schedule New Event
                </button>
            </div>

            {/* Quick Filter / Search */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                    />
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
                        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center gap-6 hover:border-primary/20 transition-all group"
                    >
                        {/* Event Date */}
                        <div className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl min-w-[90px]">
                            <span className="text-xs font-medium text-primary mb-0.5">{event.date.split(' ')[0]}</span>
                            <span className="text-2xl font-bold text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                            <span className="text-xs text-gray-500 mt-0.5">{event.date.split(' ')[2]}</span>
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors">{event.name}</h3>
                                <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs">
                                    {event.level}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-5 text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={13} className="text-primary" />
                                    <span className="text-sm">{event.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users size={13} className="text-primary" />
                                    <span className="text-sm">{event.participation} Athletes</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={13} className="text-primary" />
                                    <span className="text-sm">Check-in at 08:00 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 transition-all flex items-center gap-1.5">
                                <Plus size={14} /> Assign
                            </button>
                            <button className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary hover:bg-primary hover:text-white transition-all">
                                <ChevronRight size={18} />
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
                            className="w-full max-w-xl bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 relative z-10"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Create Event</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">Fill in the details below</p>
                                </div>
                                <button onClick={() => setShowCreateModal(false)} className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-500">Event Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Annual Selection Meet"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 transition-all text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-500">Event Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                            <input
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-500">Level</label>
                                        <div className="relative">
                                            <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer">
                                                <option>District</option>
                                                <option>State</option>
                                                <option>National</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-500">Venue</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Stadium or venue name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-3.5 bg-primary text-white font-medium rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-2">
                                    <Save size={16} /> Create Event
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
