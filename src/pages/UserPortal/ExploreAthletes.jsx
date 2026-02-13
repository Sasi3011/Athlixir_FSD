import { useState, useEffect } from "react";
// Verified Athlete Discovery and Digital Profile Hub
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Filter, MapPin, Trophy, ShieldCheck,
    ChevronRight, Star, ExternalLink, Zap, Target,
    Activity, ArrowLeft, Mail, Handshake, Info,
    ArrowUpRight, Flame
} from "lucide-react";
import { Link } from "react-router-dom";

const ExploreAthletes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSport, setFilterSport] = useState("All");
    const [filterLevel, setFilterLevel] = useState("All");
    const [selectedAthleteId, setSelectedAthleteId] = useState(null);

    const athletes = [
        { id: 1, name: "Rahul Sharma", sport: "Sprinting", level: "National", rank: "#4", location: "New Delhi", verified: true, bio: "National record holder in 100m sprint. Aiming for Asian Games 2026.", achievements: ["Gold - National Meet 2025", "Silver - Inter-state Cup"], stats: { health: "Healthy", trend: "+14%", value: "7.2k" } },
        { id: 2, name: "Priya Mani", sport: "Long Jump", level: "State", rank: "#12", location: "Bangalore", verified: true, bio: "Rising star in long jump with a consistent progression of 5cm per month.", achievements: ["State Champion 2024", "Most Improved Athlete"], stats: { health: "Recovering", trend: "+8%", value: "4.8k" } },
        { id: 3, name: "Arjun Kumar", sport: "Sprinting", level: "District", rank: "#2", location: "Chennai", verified: false, bio: "District top performer looking to break into the state-level circuit.", achievements: ["District Gold 2025"], stats: { health: "Healthy", trend: "+22%", value: "3.1k" } },
        { id: 4, name: "Sneha Reddy", sport: "High Jump", level: "State", rank: "#8", location: "Hyderabad", verified: true, bio: "Technical specialist in high jump. Focused on vertical power development.", achievements: ["State Silver 2025"], stats: { health: "Moderate", trend: "-2%", value: "5.5k" } },
        { id: 5, name: "Vikram Singh", sport: "Javelin", level: "National", rank: "#1", location: "Punjab", verified: true, bio: "Number 1 ranked national javelin thrower. Olympic prospect for 2028.", achievements: ["National Record Holder", "Asian Bronze 2024"], stats: { health: "Healthy", trend: "+12%", value: "15k" } },
    ];

    const filteredAthletes = athletes.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = filterSport === "All" || a.sport === filterSport;
        const matchesLevel = filterLevel === "All" || a.level === filterLevel;
        return matchesSearch && matchesSport && matchesLevel;
    });

    const selectedAthlete = athletes.find(a => a.id === selectedAthleteId);

    return (
        <div className="space-y-10 relative pb-20">
            {/* Main List Section */}
            <div className={`transition-all duration-500 ${selectedAthleteId ? 'opacity-0 translate-x-[-100px] pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Discovery <span className="text-primary NOT-italic">Roster</span></h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Browsing verified performance nodes globally</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 w-72 text-sm focus:outline-none focus:border-primary/50 transition-all font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none focus:border-primary/50 cursor-pointer"
                            onChange={(e) => setFilterSport(e.target.value)}
                        >
                            <option value="All">All Sports</option>
                            <option value="Sprinting">Sprinting</option>
                            <option value="Long Jump">Long Jump</option>
                            <option value="High Jump">High Jump</option>
                            <option value="Javelin">Javelin</option>
                        </select>
                        <select
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none focus:border-primary/50 cursor-pointer"
                            onChange={(e) => setFilterLevel(e.target.value)}
                        >
                            <option value="All">All Levels</option>
                            <option value="District">District</option>
                            <option value="State">State</option>
                            <option value="National">National</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAthletes.map((athlete) => (
                        <motion.div
                            layout
                            key={athlete.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -8 }}
                            className="bg-black/40 border border-white/5 rounded-[3rem] p-8 group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/10 to-orange-600/10 p-[1px] group-hover:from-primary/30 group-hover:to-orange-600/30 transition-all">
                                    <div className="w-full h-full rounded-3xl bg-black flex items-center justify-center text-primary text-2xl font-black">
                                        {athlete.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <div className="text-xl font-black text-primary italic leading-none">{athlete.rank}</div>
                                    <div className="text-[7px] font-black text-primary uppercase text-center mt-1">Tier</div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-black text-white uppercase group-hover:text-primary transition-colors">{athlete.name}</h3>
                                    {athlete.verified && <ShieldCheck size={16} className="text-primary fill-primary/10" />}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                        <Target size={12} className="text-primary" /> {athlete.sport} • {athlete.level}
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                        <MapPin size={12} className="text-primary" /> {athlete.location}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                    <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Market Factor</div>
                                    <div className="text-sm font-black text-green-500">{athlete.stats.trend}</div>
                                </div>
                                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                    <div className="text-[8px] font-black text-gray-600 uppercase mb-1">Visibility</div>
                                    <div className="text-sm font-black text-white italic">{athlete.stats.value}</div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedAthleteId(athlete.id)}
                                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-white hover:bg-primary hover:border-primary transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                View Digital Identity <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Public Profile Detail View */}
            <AnimatePresence>
                {selectedAthlete && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed inset-0 z-[110] bg-[#050505] overflow-y-auto scrollbar-hide lg:left-[280px]"
                    >
                        <div className="max-w-6xl mx-auto p-10 lg:p-20 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedAthleteId(null)}
                                className="fixed top-10 right-10 p-4 bg-white/5 rounded-2xl text-gray-500 hover:text-white border border-white/10 z-50 transition-all hover:bg-red-500/20 hover:text-red-500 group"
                            >
                                <X size={24} />
                            </button>

                            <button
                                onClick={() => setSelectedAthleteId(null)}
                                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-12 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Roster
                            </button>

                            {/* Profile Header */}
                            <section className="flex flex-col lg:flex-row gap-16 items-start mb-20">
                                <div className="w-full lg:w-[400px] aspect-[4/5] rounded-[4rem] bg-gradient-to-br from-primary/20 to-orange-600/20 p-[1px] shadow-2xl shadow-primary/10">
                                    <div className="w-full h-full rounded-[4rem] bg-black flex items-center justify-center text-primary text-8xl font-black italic relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        {selectedAthlete.name.charAt(0)}
                                        <div className="absolute bottom-10 left-10 right-10 text-center">
                                            <div className="px-5 py-2 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 mb-2">
                                                <Star size={12} fill="white" /> Featured Node
                                            </div>
                                            <h2 className="text-3xl font-black text-white uppercase italic">{selectedAthlete.name}</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-10">
                                    <div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <h1 className="text-6xl font-black text-white uppercase tracking-tight italic">{selectedAthlete.name}</h1>
                                            {selectedAthlete.verified && (
                                                <div className="p-2 bg-primary/20 border border-primary/20 rounded-2xl text-primary font-black flex items-center gap-2 text-xs uppercase tracking-widest">
                                                    <ShieldCheck size={18} /> Verified
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-8">
                                            <div className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-widest">
                                                <Target size={18} className="text-primary" /> {selectedAthlete.sport}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-widest">
                                                <Trophy size={18} className="text-primary" /> {selectedAthlete.level} Tier
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-widest">
                                                <MapPin size={18} className="text-primary" /> {selectedAthlete.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8">
                                            <Info size={24} className="text-gray-800" />
                                        </div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 italic underline">Executive Summary</h4>
                                        <p className="text-lg text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
                                            {selectedAthlete.bio}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: "Global Rank", value: selectedAthlete.rank, icon: Globe },
                                            { label: "Reach Index", value: selectedAthlete.stats.value, icon: Users },
                                            { label: "Trend factor", value: selectedAthlete.stats.trend, icon: Zap, color: "text-green-500" },
                                            { label: "Health Status", value: selectedAthlete.stats.health, icon: Activity, color: "text-orange-500" },
                                        ].map((stat, i) => (
                                            <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl">
                                                <stat.icon size={16} className="text-primary mb-4" />
                                                <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{stat.label}</div>
                                                <div className={`text-xl font-black italic ${stat.color || 'text-white'}`}>{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-6">
                                        <button className="flex-1 py-5 bg-primary text-white font-black rounded-3xl text-sm uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-4">
                                            <Handshake size={20} /> Propose Sponsorship
                                        </button>
                                        <button className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-gray-500 hover:text-white transition-all hover:bg-white/10">
                                            <Mail size={24} />
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Career Milestones */}
                                <div className="lg:col-span-2 space-y-8">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white italic border-l-4 border-primary pl-4">Career <span className="text-primary NOT-italic">Milestones</span></h3>
                                    <div className="space-y-4">
                                        {selectedAthlete.achievements.map((item, i) => (
                                            <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between group hover:border-primary/20 transition-all">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                        <Trophy size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-black text-white uppercase group-hover:text-primary transition-colors">{item}</div>
                                                        <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1 italic">Verified Achievement • 2024-25 Ciclo</div>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="text-gray-800" size={24} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Discovery Stats */}
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white italic">Node <span className="text-primary NOT-italic">Metrics</span></h3>
                                    <div className="p-8 bg-black/40 border border-white/5 rounded-[3rem] space-y-8">
                                        <div className="flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-[2.5rem] border border-white/5">
                                            <Flame size={32} className="text-orange-500 mb-4 animate-pulse" />
                                            <div className="text-4xl font-black text-white italic mb-1">94%</div>
                                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Consistency Rating</div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Scout Views</span>
                                                <span className="text-sm font-black text-white uppercase">2.4k+</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Offer Status</span>
                                                <div className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[9px] font-black uppercase">Open</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Add X icon for modal
const X = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default ExploreAthletes;
