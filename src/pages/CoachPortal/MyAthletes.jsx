import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Filter, User, ChevronRight, Star,
    Flame, Target, Activity, ShieldCheck, Mail,
    MapPin, Trophy, Plus, Save, X, ArrowLeft,
    TrendingUp, Calendar, AlertCircle
} from "lucide-react";
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, LineChart, Line
} from "recharts";

const MyAthletes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSport, setFilterSport] = useState("All");
    const [filterLevel, setFilterLevel] = useState("All");
    const [selectedAthlete, setSelectedAthlete] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const athletes = [
        { id: 1, name: "Rahul Sharma", level: "State", sport: "Sprinting", injuryStatus: "Healthy", trend: "up", phone: "+91 98765 43210", email: "rahul@athlixir.com", location: "New Delhi", progress: 92 },
        { id: 2, name: "Priya Mani", level: "National", sport: "Long Jump", injuryStatus: "Recovering", trend: "down", phone: "+91 98765 43211", email: "priya@athlixir.com", location: "Bangalore", progress: 65 },
        { id: 3, name: "Arjun Kumar", level: "District", sport: "Sprinting", injuryStatus: "Healthy", trend: "up", phone: "+91 98765 43212", email: "arjun@athlixir.com", location: "Chennai", progress: 88 },
        { id: 4, name: "Sneha Reddy", level: "State", sport: "High Jump", injuryStatus: "Moderate", trend: "stable", phone: "+91 98765 43213", email: "sneha@athlixir.com", location: "Hyderabad", progress: 45 },
        { id: 5, name: "Vikram Singh", level: "National", sport: "Javelin", injuryStatus: "Healthy", trend: "up", phone: "+91 98765 43214", email: "vikram@athlixir.com", location: "Punjab", progress: 95 },
    ];

    const performanceData = [
        { name: 'W1', performance: 65, duration: 120 },
        { name: 'W2', performance: 68, duration: 130 },
        { name: 'W3', performance: 75, duration: 150 },
        { name: 'W4', performance: 72, duration: 140 },
        { name: 'W5', performance: 80, duration: 160 },
        { name: 'W6', performance: 85, duration: 180 },
    ];

    const handleSaveFeedback = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1500);
    };

    const filteredAthletes = athletes.filter(a => {
        const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = filterSport === "All" || a.sport === filterSport;
        const matchesLevel = filterLevel === "All" || a.level === filterLevel;
        return matchesSearch && matchesSport && matchesLevel;
    });

    return (
        <div className="space-y-8 relative pb-20">
            {/* Main List View */}
            <div className={`transition-all duration-500 ${selectedAthlete ? 'translate-x-[20%] opacity-0 pointer-events-none scale-95' : 'translate-x-0 opacity-100'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">My Athletes</h1>
                        <p className="text-sm text-gray-500">Managing {athletes.length} athletes</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search athlete..."
                                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 w-60 text-sm focus:outline-none focus:border-primary/50 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-gray-400 focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                            onChange={(e) => setFilterSport(e.target.value)}
                        >
                            <option value="All">All Sports</option>
                            <option value="Sprinting">Sprinting</option>
                            <option value="Long Jump">Long Jump</option>
                            <option value="High Jump">High Jump</option>
                            <option value="Javelin">Javelin</option>
                        </select>
                        <select
                            className="bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-gray-400 focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                            onChange={(e) => setFilterLevel(e.target.value)}
                        >
                            <option value="All">All Levels</option>
                            <option value="District">District</option>
                            <option value="State">State</option>
                            <option value="National">National</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                                <th className="px-6 py-4 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-left">Athlete</th>
                                <th className="px-6 py-4 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-left">Level</th>
                                <th className="px-6 py-4 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-left">Health</th>
                                <th className="px-6 py-4 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-left">Trend</th>
                                <th className="px-6 py-4 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {filteredAthletes.map((athlete) => (
                                <motion.tr
                                    layout
                                    key={athlete.id}
                                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                                    onClick={() => setSelectedAthlete(athlete)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold border border-primary/20">
                                                {athlete.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{athlete.name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{athlete.sport}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                                            {athlete.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${athlete.injuryStatus === 'Healthy' ? 'bg-green-500' :
                                                athlete.injuryStatus === 'Recovering' ? 'bg-orange-500' :
                                                    'bg-red-500'
                                                }`}></div>
                                            <span className={`text-sm ${athlete.injuryStatus === 'Healthy' ? 'text-green-500' :
                                                athlete.injuryStatus === 'Recovering' ? 'text-orange-500' :
                                                    'text-red-500'
                                                }`}>
                                                {athlete.injuryStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center gap-1.5 ${athlete.trend === 'up' ? 'text-green-500' :
                                            athlete.trend === 'down' ? 'text-red-500' :
                                                'text-gray-400'
                                            }`}>
                                            <TrendingUp size={14} className={athlete.trend === 'down' ? 'rotate-180' : ''} />
                                            <span className="text-sm">
                                                {athlete.trend === 'up' ? '+14.2%' : athlete.trend === 'down' ? '-4.8%' : 'Stable'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                                            <ChevronRight size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Athlete Detail View Overlay */}
            <AnimatePresence>
                {selectedAthlete && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full lg:w-[60%] bg-[#080808] border-l border-white/5 z-50 overflow-y-auto scrollbar-hide shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Detail Header */}
                        <div className="sticky top-0 bg-[#080808]/80 backdrop-blur-3xl z-30 p-6 border-b border-white/[0.06]">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => setSelectedAthlete(null)}
                                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Back
                                </button>
                                <div className="flex items-center gap-3">
                                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white transition-all">
                                        Export
                                    </button>
                                    <button className="w-9 h-9 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                                        <Star size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-3xl font-bold">
                                    {selectedAthlete.name.charAt(0)}
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <h2 className="text-2xl font-bold text-white">{selectedAthlete.name}</h2>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                            <Target size={14} className="text-primary" />
                                            <span>{selectedAthlete.sport} · {selectedAthlete.level}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                            <MapPin size={14} className="text-primary" />
                                            <span>{selectedAthlete.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Performance Grid */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Performance Chart */}
                                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 min-w-0 overflow-hidden">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-sm font-semibold text-white mb-0.5">Performance Trend</h3>
                                            <p className="text-xs text-gray-500">6-week improvement</p>
                                        </div>
                                    </div>
                                    <div className="h-[250px] w-full relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={performanceData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                                <XAxis
                                                    dataKey="name"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#4b5563', fontSize: 9, fontWeight: 800 }}
                                                />
                                                <YAxis hide />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#080808', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                                    itemStyle={{ color: '#fff', fontSize: '10px' }}
                                                />
                                                <Line type="monotone" dataKey="performance" stroke="#ff5722" strokeWidth={4} dot={{ r: 4, fill: '#ff5722' }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="space-y-4">
                                    <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
                                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Health & Progress</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1.5">
                                                    <span className="text-gray-400">Progress</span>
                                                    <span className="text-primary font-medium">{selectedAthlete.progress}%</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${selectedAthlete.progress}%` }}
                                                        className="bg-primary h-full rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-3">
                                                <Flame size={18} className="text-orange-500" />
                                                <div>
                                                    <div className="text-xs text-orange-400">Recovery Status</div>
                                                    <div className="text-sm font-medium text-white">{selectedAthlete.injuryStatus}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                                        <Trophy size={20} className="text-primary mb-3" />
                                        <h4 className="text-sm font-medium text-white mb-1">Scout Insight</h4>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Performance predicted to <span className="text-green-400 font-medium">increase 12%</span> if current trend holds over next 2 meets.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Coach Feedback Section */}
                            <section className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                                <h3 className="text-base font-semibold text-white mb-6 border-l-4 border-primary pl-4">Coach Feedback</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-500">Training Notes</label>
                                        <textarea
                                            placeholder="Add drills, nutritional focus, or recovery notes..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-all min-h-[100px]"
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleSaveFeedback}
                                            disabled={isSaving}
                                            className="flex-1 py-3 bg-primary text-white font-medium rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isSaving ? <Activity className="animate-spin" size={15} /> : <Save size={15} />}
                                            {isSaving ? "Saving..." : "Save Feedback"}
                                        </button>
                                        <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary transition-all">
                                            <Mail size={18} />
                                        </button>
                                    </div>
                                    <AnimatePresence>
                                        {saveSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm text-center"
                                            >
                                                Feedback saved successfully
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </section>

                            {/* Injury History */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-semibold text-white">Injury History</h3>
                                    <AlertCircle size={18} className="text-gray-500" />
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { date: "Jan 12, 2026", issue: "Ankle Sprain", severity: "Mild", status: "Resolved" },
                                        { date: "Nov 04, 2025", issue: "Hamstring Strain", severity: "Moderate", status: "Resolved" }
                                    ].map((injury, i) => (
                                        <div key={i} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="text-xs text-gray-500">{injury.date}</div>
                                                <div>
                                                    <div className="text-sm font-medium text-white">{injury.issue}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{injury.severity}</div>
                                                </div>
                                            </div>
                                            <div className="px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs">
                                                {injury.status}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyAthletes;
