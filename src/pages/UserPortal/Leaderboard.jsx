import { useState } from "react";
import { motion } from "framer-motion";
import {
    Trophy, Star, ShieldCheck, MapPin,
    Target, Zap, ArrowUpRight, Filter, Search
} from "lucide-react";

const Leaderboard = () => {
    const [filterSport, setFilterSport] = useState("Sprinting");

    const categories = ["Sprinting", "Long Jump", "High Jump", "Javelin"];

    const rankings = [
        { rank: 1, name: "Vikram Singh", sport: "Javelin", score: 9820, level: "National", verified: true, trend: "up" },
        { rank: 2, name: "Rahul Sharma", sport: "Sprinting", score: 9540, level: "National", verified: true, trend: "up" },
        { rank: 3, name: "Sameer V.", sport: "Sprinting", score: 9120, level: "State", verified: true, trend: "down" },
        { rank: 4, name: "Sneha Reddy", sport: "High Jump", score: 8850, level: "State", verified: true, trend: "stable" },
        { rank: 5, name: "Arjun Kumar", sport: "Javelin", score: 8400, level: "District", verified: false, trend: "up" },
    ];

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Global <span className="text-primary NOT-italic">Leaderboard</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Top performing talent nodes by category</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterSport(cat)}
                            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filterSport === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-[3rem] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Global Rank</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Athlete Entity</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Tier / Level</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Performance Index</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Discovery</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                        {rankings.map((athlete) => (
                            <motion.tr
                                layout
                                key={athlete.rank}
                                className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                            >
                                <td className="px-8 py-6">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black italic text-lg ${athlete.rank === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-gray-400'}`}>
                                        #{athlete.rank}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-600/10 flex items-center justify-center text-primary font-black border border-primary/20">
                                            {athlete.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                                {athlete.name}
                                                {athlete.verified && <ShieldCheck size={14} className="text-primary fill-primary/10" />}
                                            </div>
                                            <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1">{athlete.sport}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                                        {athlete.level}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="text-xl font-black text-white italic">{athlete.score.toLocaleString()}</div>
                                        <div className={`text-[10px] font-black flex items-center ${athlete.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                            {athlete.trend === 'up' ? '▲' : '▼'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2 text-gray-500 hover:text-primary transition-colors hover:scale-110 transition-transform">
                                        <ArrowUpRight size={20} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] flex flex-col items-center text-center">
                    <Trophy size={32} className="text-primary mb-4" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2 underline italic">Scout Priority</h4>
                    <p className="text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-tight">
                        Top 3 Sprint athletes are currently under active evaluation by Inter-University scouts.
                    </p>
                </div>
                <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col items-center text-center">
                    <Star size={32} className="text-orange-500 mb-4" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2 underline italic">Rising Star Node</h4>
                    <p className="text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-tight">
                        Vikram Singh has climbed 14 positions in the global rank list this quarter.
                    </p>
                </div>
                <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex flex-col items-center text-center">
                    <Zap size={32} className="text-blue-500 mb-4" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2 underline italic">Performance Index</h4>
                    <p className="text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-tight">
                        Index scores are calculated using 14 distinct performance & consistency parameters.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
