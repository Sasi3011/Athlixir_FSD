import { useState } from "react";
import { motion } from "framer-motion";
import {
    Briefcase, MapPin, Calendar, ArrowUpRight,
    Zap, Timer, ExternalLink, Filter, Search,
    CheckCircle2
} from "lucide-react";

const Opportunities = () => {
    const opportunities = [
        {
            id: 1,
            title: "National Academy Trials",
            type: "Trials",
            location: "Bangalore, India",
            deadline: "2024-06-15",
            status: "Open",
            description: "Selection for the U-23 national football pool. Open for verified elite athletes.",
            benefit: "Full Residency Scholarship"
        },
        {
            id: 2,
            title: "Performance Merit Scholarship",
            type: "Scholarship",
            location: "Delhi (Remote Application)",
            deadline: "2024-07-01",
            status: "Open",
            description: "Academic + Sports funding for state level players progressing to university.",
            benefit: "₹1,50,000 / Year"
        },
        {
            id: 3,
            title: "Premier Club Scouting Live",
            type: "Tournament",
            location: "Mumbai",
            deadline: "2024-05-20",
            status: "Open",
            description: "Weekend tournament showcase for I-League scouts and talent managers.",
            benefit: "Professional Contract Hunt"
        },
        {
            id: 4,
            title: "State Sports Merit Award",
            type: "Award",
            location: "Various",
            deadline: "2024-03-10",
            status: "Expired",
            description: "Annual recognition for outstanding sportsmanship and career growth.",
            benefit: "Cash Prize & Citation"
        }
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'Trials': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Scholarship': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'Tournament': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="text-primary" size={28} />
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Ecosystem Opportunities</h1>
                    </div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[.3em]">Verified path to professional transition</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Find Trials or Funding..."
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 w-72 text-xs focus:outline-none focus:border-primary/50 transition-all font-bold uppercase tracking-widest"
                        />
                    </div>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-white transition-all"><Filter size={20} /></button>
                </div>
            </section>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {opportunities.map((opt, i) => (
                    <motion.div
                        key={opt.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`group bg-black/40 border rounded-[3rem] p-10 flex flex-col h-full transition-all duration-500 ${opt.status === 'Expired'
                                ? "border-white/5 opacity-60 pointer-events-none grayscale"
                                : "border-white/5 hover:border-primary/50 hover:bg-white/[0.03] shadow-2xl hover:shadow-primary/10"
                            }`}
                    >
                        <div className="flex justify-between items-start mb-8">
                            <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getTypeColor(opt.type)}`}>
                                {opt.type}
                            </span>
                            {opt.status === 'Open' ? (
                                <span className="flex items-center gap-1 text-[9px] font-black uppercase text-green-500 animate-pulse">
                                    <Zap size={10} fill="currentColor" /> Active Application
                                </span>
                            ) : (
                                <span className="text-[9px] font-black uppercase text-gray-600">Archive Only</span>
                            )}
                        </div>

                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group-hover:text-primary transition-colors">{opt.title}</h3>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                <MapPin size={14} className="text-primary" /> {opt.location}
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                <Timer size={14} className="text-primary" /> Deadline: {opt.deadline}
                            </div>
                        </div>

                        <p className="text-gray-400 text-xs font-medium leading-relaxed mb-10 flex-1">
                            {opt.description}
                        </p>

                        <div className="p-5 bg-white/5 border border-white/5 rounded-2xl mb-10 group-hover:border-primary/20 transition-all">
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Involved Benefit</p>
                            <p className="text-sm font-black text-white italic uppercase tracking-tight">{opt.benefit}</p>
                        </div>

                        <button
                            className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${opt.status === 'Open'
                                    ? "bg-primary text-white shadow-xl shadow-primary/20 group-hover:bg-orange-600 group-hover:scale-[1.02]"
                                    : "bg-white/5 text-gray-600"
                                }`}
                        >
                            {opt.status === 'Open' ? (
                                <>Apply for Identity Check <ArrowUpRight size={16} /></>
                            ) : (
                                "Window Closed"
                            )}
                        </button>
                    </motion.div>
                ))}

                {/* Submit New Opportunity Card */}
                <div className="border-4 border-dashed border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center hover:border-primary/20 transition-all group">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-700 group-hover:text-primary group-hover:bg-primary/5 transition-all">
                        <ExternalLink size={32} />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase italic mb-2">Host an Opportunity?</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                        If you represent a club or university looking for talent, list your program here.
                    </p>
                    <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:border-primary transition-all">Launch Listing Portal</button>
                </div>
            </div>
        </div>
    );
};

export default Opportunities;
