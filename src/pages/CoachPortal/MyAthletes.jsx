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
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 italic">Athlete <span className="text-primary NOT-italic">Roster</span></h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Monitoring {athletes.length} performance nodes</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search Athlete ID..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 w-72 text-sm focus:outline-none focus:border-primary/50 transition-all font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                            onChange={(e) => setFilterSport(e.target.value)}
                        >
                            <option value="All">All Sports</option>
                            <option value="Sprinting">Sprinting</option>
                            <option value="Long Jump">Long Jump</option>
                            <option value="High Jump">High Jump</option>
                            <option value="Javelin">Javelin</option>
                        </select>
                        <select
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                            onChange={(e) => setFilterLevel(e.target.value)}
                        >
                            <option value="All">All Levels</option>
                            <option value="District">District</option>
                            <option value="State">State</option>
                            <option value="National">National</option>
                        </select>
                    </div>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-[3rem] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Athlete Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Tier / Level</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Health Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Market Trend</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {filteredAthletes.map((athlete) => (
                                <motion.tr
                                    layout
                                    key={athlete.id}
                                    className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                                    onClick={() => setSelectedAthlete(athlete)}
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center text-primary font-black border border-primary/20">
                                                {athlete.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-white group-hover:text-primary transition-colors">{athlete.name}</div>
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
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${athlete.injuryStatus === 'Healthy' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                                athlete.injuryStatus === 'Recovering' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' :
                                                    'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                                                }`}></div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${athlete.injuryStatus === 'Healthy' ? 'text-green-500' :
                                                athlete.injuryStatus === 'Recovering' ? 'text-orange-500' :
                                                    'text-red-500'
                                                }`}>
                                                {athlete.injuryStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`flex items-center gap-1.5 ${athlete.trend === 'up' ? 'text-green-500' :
                                            athlete.trend === 'down' ? 'text-red-500' :
                                                'text-gray-400'
                                            }`}>
                                            <TrendingUp size={14} className={athlete.trend === 'down' ? 'rotate-180' : ''} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">
                                                {athlete.trend === 'up' ? '+14.2%' : athlete.trend === 'down' ? '-4.8%' : 'Stable'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                                            <ChevronRight size={20} />
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
                        <div className="sticky top-0 bg-[#080808]/80 backdrop-blur-3xl z-30 p-8 border-b border-white/5">
                            <div className="flex items-center justify-between mb-8">
                                <button
                                    onClick={() => setSelectedAthlete(null)}
                                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to Roster
                                </button>
                                <div className="flex items-center gap-3">
                                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                                        Export Data
                                    </button>
                                    <button className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                                        <Star size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-8">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-600 p-[1px] shadow-2xl shadow-primary/20">
                                    <div className="w-full h-full rounded-[2.5rem] bg-black flex items-center justify-center text-primary text-5xl font-black">
                                        {selectedAthlete.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-4xl font-black text-white uppercase tracking-tight">{selectedAthlete.name}</h2>
                                        <div className="p-1 px-3 bg-primary/20 text-primary border border-primary/30 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                            <ShieldCheck size={10} /> Verified Athlete
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Target size={14} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{selectedAthlete.sport} • {selectedAthlete.level} Tier</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <MapPin size={14} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{selectedAthlete.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 space-y-10">
                            {/* Performance Grid */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Performance Chart */}
                                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 min-w-0 overflow-hidden">
                                    <div className="flex justify-between items-center mb-10">
                                        <div>
                                            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">Performance Dynamics</h3>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest italic flex items-center gap-1">
                                                <Activity size={10} className="text-primary" /> Multi-week improvement trend
                                            </p>
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
                                <div className="space-y-6">
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Health Matrix</h4>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                                    <span className="text-white">Active Progress</span>
                                                    <span className="text-primary">{selectedAthlete.progress}%</span>
                                                </div>
                                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${selectedAthlete.progress}%` }}
                                                        className="bg-primary h-full rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center gap-4">
                                                <Flame size={20} className="text-orange-500" />
                                                <div>
                                                    <div className="text-[9px] font-black uppercase tracking-widest text-orange-500">Recovery Status</div>
                                                    <div className="text-xs font-bold text-white uppercase italic">{selectedAthlete.injuryStatus}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform"></div>
                                        <Trophy size={24} className="text-primary mb-4" />
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2 underline italic">Scout Indicator</h4>
                                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
                                            Market value predicted to <span className="text-green-500 font-bold">increase by 12%</span> if performance maintains in next 2 meets.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Coach Feedback Section */}
                            <section className="bg-black/40 border border-white/5 rounded-[3rem] p-10">
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-8 border-l-4 border-primary pl-6">Strategic Feedback</h3>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Training Recommendation</label>
                                        <textarea
                                            placeholder="Assign specific drills or nutritional focus..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 transition-all min-h-[120px]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={handleSaveFeedback}
                                                disabled={isSaving}
                                                className="flex-1 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isSaving ? <Activity className="animate-spin" size={16} /> : <Save size={16} />}
                                                {isSaving ? "Syncing..." : "Deploy Strategy"}
                                            </button>
                                            <button className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-500 hover:text-white transition-all group">
                                                <Mail size={22} className="group-hover:text-primary" />
                                            </button>
                                        </div>
                                        <AnimatePresence>
                                            {saveSuccess && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-[10px] font-black uppercase tracking-widest text-center"
                                                >
                                                    Protocol successfully deployed to athlete node
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </section>

                            {/* Injury History */}
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black uppercase tracking-tight text-white italic">Injury <span className="text-primary NOT-italic">Protocol History</span></h3>
                                    <AlertCircle size={20} className="text-gray-600" />
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { date: "Jan 12, 2026", issue: "Ankle Sprain", severity: "Mild", status: "Resolved" },
                                        { date: "Nov 04, 2025", issue: "Hamstring Strain", severity: "Moderate", status: "Resolved" }
                                    ].map((injury, i) => (
                                        <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between group hover:border-white/10 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest w-24 italic underline">{injury.date}</div>
                                                <div>
                                                    <div className="text-sm font-bold text-white uppercase">{injury.issue}</div>
                                                    <div className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mt-1">Severity: {injury.severity}</div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest">
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
