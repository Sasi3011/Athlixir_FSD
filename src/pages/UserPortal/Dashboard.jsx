import { useState, useEffect } from "react";
// Real-time synchronization layer for discovery metrics
import { motion } from "framer-motion";
import {
    TrendingUp, Calendar, Trophy, Handshake,
    ChevronRight, Star, MapPin, Zap, Target,
    Users, ArrowUpRight, ShieldCheck, Activity, Globe
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const { user } = useAuth();
    const [userRole, setUserRole] = useState("Viewer");

    useEffect(() => {
        if (user) {
            const role = localStorage.getItem(`userRoleType_${user.uid}`) || "Sponsor";
            setUserRole(role);
        }
    }, [user]);

    const stats = [
        { label: "Trending Athletes", value: "124", sub: "+12 this week", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
        { label: "Upcoming Events", value: "8", sub: "Next in 2 days", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Top Ranked", value: "450", sub: "Verified nodes", icon: Trophy, color: "text-orange-500", bg: "bg-orange-500/10" },
        { label: "Sponsorships", value: "18", sub: "Open requests", icon: Handshake, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    const recommendedAthletes = [
        { id: 1, name: "Rahul Sharma", sport: "Sprinting", level: "National", rank: "#4", progress: 92, verified: true },
        { id: 2, name: "Priya Mani", sport: "Long Jump", level: "State", rank: "#12", progress: 85, verified: true },
        { id: 3, name: "Arjun Kumar", sport: "Javelin", level: "District", rank: "#2", progress: 78, verified: false },
    ];

    const upcomingEvents = [
        { id: 1, name: "National Athletics Meet", date: "Feb 28", location: "New Delhi", type: "Tournament" },
        { id: 2, name: "Elite Sprint Trials", date: "Mar 05", location: "Bangalore", type: "Trials" },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Welcome Section */}
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-orange-600 p-[1px] shadow-2xl shadow-primary/20">
                        <div className="w-full h-full rounded-3xl bg-black flex items-center justify-center text-primary text-3xl font-black">
                            {user?.displayName?.charAt(0) || "U"}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none">
                                Welcome, <span className="text-primary italic">{user?.displayName?.split(' ')[0] || "Explorer"}</span>
                            </h1>
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-primary uppercase tracking-widest">{userRole}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500">
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
                                <MapPin size={12} className="text-primary" /> India Base
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
                                <Globe size={12} className="text-primary" /> Universal Visibility
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link to="/user/athletes" className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group">
                        Explore Roster <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="px-6 py-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all text-[10px] font-black uppercase tracking-widest">
                        Support Talent
                    </button>
                </div>
            </section>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] hover:border-primary/20 transition-all group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[50px] -mr-12 -mt-12 rounded-full opacity-60`}></div>
                        <div className="relative z-10">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{stat.label}</h3>
                            <div className="text-4xl font-black text-white mb-2 tracking-tight italic">{stat.value}</div>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest italic">{stat.sub}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Discovery Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recommended Athletes */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black uppercase tracking-tight text-white italic border-l-4 border-primary pl-4">Recommended <span className="text-primary NOT-italic">Candidates</span></h2>
                        <Link to="/user/athletes" className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-colors">View All</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendedAthletes.map((athlete, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center text-primary text-2xl font-black border border-primary/10">
                                        {athlete.name.charAt(0)}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-white italic tracking-tighter">{athlete.rank}</div>
                                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Global Rank</div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-black text-white uppercase group-hover:text-primary transition-colors">{athlete.name}</h3>
                                        {athlete.verified && <ShieldCheck size={14} className="text-primary fill-primary/10" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        {athlete.sport} • {athlete.level}
                                    </div>
                                </div>
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5">
                                            <span className="text-gray-500">Growth Index</span>
                                            <span className="text-primary">+{athlete.progress / 10}%</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full rounded-full" style={{ width: `${athlete.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white group-hover:bg-primary group-hover:border-primary transition-all">
                                    Digital Identity Profile
                                </button>
                            </motion.div>
                        ))}
                        {/* Empty Discover Card */}
                        <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-8 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary mb-4 transition-colors">
                                <Users size={24} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 text-center leading-relaxed">
                                Discover more athletes<br />matching your profile interest
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column: Events & News */}
                <div className="space-y-8">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white italic">Live <span className="text-primary NOT-italic">Events</span></h2>
                    <div className="space-y-4">
                        {upcomingEvents.map((event, i) => (
                            <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all group cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[8px] font-black uppercase tracking-widest">
                                        {event.type}
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{event.date}</span>
                                </div>
                                <h4 className="text-sm font-black text-white uppercase group-hover:text-primary transition-colors mb-2">{event.name}</h4>
                                <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest italic">
                                    <MapPin size={12} className="text-primary" /> {event.location}
                                </div>
                                <button className="mt-4 flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-widest border-b border-primary pb-0.5">
                                    View Schedule <ArrowUpRight size={10} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-gradient-to-br from-primary/10 to-orange-600/10 border border-primary/20 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform"></div>
                        <Target size={24} className="text-primary mb-4" />
                        <h4 className="text-sm font-black text-white uppercase mb-2">Sponsorship Focus</h4>
                        <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-tight">
                            Scouts are currently prioritizing 14-17 Y/O track athletes in North India for Q2 scouting cycles.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
