import { useState } from "react";
import { motion } from "framer-motion";
import {
    Trophy, Search, Filter, ChevronUp,
    ChevronDown, Star, Crown, Target, Zap
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Leaderboard = () => {
    const { user } = useAuth();
    const [filter, setFilter] = useState("District");

    const leaderboardData = [
        { id: 1, name: "Aryan Sharma", sport: "Athletics", score: 9820, rank: 1, level: "State", trend: "up" },
        { id: 2, name: "Sneha Reddy", sport: "Football", score: 9540, rank: 2, level: "State", trend: "down" },
        { id: 3, name: "Vikram Gill", sport: "Cricket", score: 9210, rank: 3, level: "District", trend: "up" },
        { id: 4, name: user?.displayName || "You", sport: "Football", score: 8750, rank: 12, level: "College", trend: "up", isUser: true },
        { id: 5, name: "Priya Das", sport: "Tennis", score: 8600, rank: 13, level: "College", trend: "up" },
        { id: 6, name: "Rohan V", sport: "Swimming", score: 8420, rank: 14, level: "District", trend: "down" },
        { id: 7, name: "Kiran J", sport: "Basketball", score: 8100, rank: 15, level: "College", trend: "up" },
    ].sort((a, b) => a.rank - b.rank);

    const topThree = leaderboardData.slice(0, 3);
    const others = leaderboardData.slice(3);

    return (
        <div className="space-y-10 pb-20">
            {/* Header & Filter */}
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Trophy className="text-primary" size={28} />
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Elite Standings</h1>
                    </div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[.3em]">Real-time ecosystem hierarchy</p>
                </div>

                <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 overflow-hidden">
                    {["School", "College", "District", "State"].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setFilter(opt)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === opt
                                ? "bg-primary text-white shadow-lg"
                                : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </section>

            {/* Podium Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-10">
                {/* 2nd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="order-2 md:order-1 bg-white/5 border border-white/5 p-8 rounded-[3rem] text-center relative pt-16 group hover:border-white/20 transition-all"
                >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-3xl bg-slate-400 p-[1px] rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
                            <div className="w-full h-full rounded-2xl bg-[#050505] -rotate-45 group-hover:rotate-[-225deg] transition-transform duration-700 flex items-center justify-center text-slate-400 font-black text-2xl">
                                {topThree[1].name.charAt(0)}
                            </div>
                        </div>
                        <div className="absolute -bottom-2 right-0 bg-slate-400 text-black w-8 h-8 rounded-full border-4 border-[#050505] flex items-center justify-center font-black text-xs">2</div>
                    </div>
                    <h3 className="text-lg font-black text-white uppercase italic mb-1">{topThree[1].name}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{topThree[1].sport} • {topThree[1].level}</p>
                    <div className="text-2xl font-black text-slate-400">{topThree[1].score.toLocaleString()}</div>
                    <p className="text-[9px] text-slate-400/50 font-black uppercase tracking-widest mt-1">Ecosystem Credits</p>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="order-1 md:order-2 bg-primary/10 border-2 border-primary/30 p-10 rounded-[4rem] text-center relative pt-20 group -mt-10 mb-8 md:mb-0 shadow-2xl shadow-primary/20"
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                        <Crown className="text-primary w-12 h-12 mb-2 mx-auto drop-shadow-[0_0_15px_rgba(255,87,34,0.5)] animate-bounce" />
                        <div className="w-28 h-28 rounded-[2.5rem] bg-primary p-[2px] rotate-45">
                            <div className="w-full h-full rounded-[2rem] bg-[#050505] -rotate-45 flex items-center justify-center text-primary font-black text-4xl italic">
                                {topThree[0].name.charAt(0)}
                            </div>
                        </div>
                        <div className="absolute -bottom-2 right-0 bg-primary text-white w-10 h-10 rounded-full border-4 border-[#050505] flex items-center justify-center font-black text-sm">1</div>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic mb-1">{topThree[0].name}</h3>
                    <p className="text-[11px] text-primary font-black uppercase tracking-[0.2em] mb-6">{topThree[0].sport} • {topThree[0].level}</p>
                    <div className="text-4xl font-black text-white drop-shadow-md">{topThree[0].score.toLocaleString()}</div>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Prime Champion</p>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="order-3 bg-white/5 border border-white/5 p-8 rounded-[3rem] text-center relative pt-16 hover:border-orange-900/40 transition-all group"
                >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 rounded-3xl bg-orange-900/60 p-[1px] rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
                            <div className="w-full h-full rounded-2xl bg-[#050505] -rotate-45 group-hover:rotate-[-225deg] transition-transform duration-700 flex items-center justify-center text-orange-900 font-black text-2xl">
                                {topThree[2].name.charAt(0)}
                            </div>
                        </div>
                        <div className="absolute -bottom-2 right-0 bg-orange-900 text-white w-8 h-8 rounded-full border-4 border-[#050505] flex items-center justify-center font-black text-xs">3</div>
                    </div>
                    <h3 className="text-lg font-black text-white uppercase italic mb-1">{topThree[2].name}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{topThree[2].sport} • {topThree[2].level}</p>
                    <div className="text-2xl font-black text-orange-900">{topThree[2].score.toLocaleString()}</div>
                    <p className="text-[9px] text-orange-900/50 font-black uppercase tracking-widest mt-1">Elite Challenger</p>
                </motion.div>
            </section>

            {/* Main Table Standings */}
            <section className="bg-black/40 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                    <h3 className="text-sm font-black text-white uppercase tracking-[.2em]">Live Hierarchy Stream</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                            <Zap size={14} className="text-primary" /> Active Sync
                        </div>
                    </div>
                </div>

                <div className="p-4 overflow-x-auto">
                    <div className="space-y-4">
                        {leaderboardData.map((row) => (
                            <motion.div
                                key={row.id}
                                whileHover={{ scale: 1.01 }}
                                className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${row.isUser
                                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.02] z-10"
                                    : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
                                    }`}
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`text-2xl font-black italic w-12 text-center ${row.isUser ? "text-white" : "text-gray-600"}`}>
                                        {row.rank < 10 ? `0${row.rank}` : row.rank}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${row.isUser ? "bg-white/20 text-white" : "bg-white/5 text-gray-400"
                                            }`}>
                                            {row.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-black uppercase italic ${row.isUser ? "text-white" : "text-white"}`}>
                                                {row.name} {row.isUser && "(Agent ID-82148)"}
                                            </h4>
                                            <p className={`text-[9px] font-black uppercase tracking-widest ${row.isUser ? "text-white/70" : "text-gray-500"}`}>
                                                {row.sport} • {row.level} Rank
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="text-right">
                                        <div className={`text-lg font-black ${row.isUser ? "text-white" : "text-white"}`}>
                                            {row.score.toLocaleString()}
                                        </div>
                                        <div className="flex items-center justify-end gap-1">
                                            {row.trend === "up" ? (
                                                <ChevronUp size={14} className="text-green-500" />
                                            ) : (
                                                <ChevronDown size={14} className="text-red-500" />
                                            )}
                                            <span className={`text-[8px] font-black uppercase ${row.isUser ? "text-white/60" : "text-gray-600"}`}>
                                                {row.trend === "up" ? "+124pts" : "-35pts"}
                                            </span>
                                        </div>
                                    </div>
                                    <button className={`p-3 rounded-xl transition-all ${row.isUser ? "bg-white/20 text-white" : "bg-white/5 hover:bg-white/10 text-gray-500"
                                        }`}>
                                        <Target size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Leaderboard;
