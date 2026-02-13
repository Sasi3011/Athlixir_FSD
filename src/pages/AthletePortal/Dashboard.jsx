import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Activity, Trophy, Calendar, Flame, ChevronRight,
    LogIn, Plus, TrendingUp, Info
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, AreaChart, Area
} from 'recharts';

const Dashboard = () => {
    const { user } = useAuth();
    const [performanceData, setPerformanceData] = useState([]);
    const [stats, setStats] = useState({
        trainingSessions: 42,
        injuryStatus: "Recovering",
        rank: "#12",
        upcomingEvent: "State Qualifiers"
    });

    // Mock data for the graph
    const chartData = [
        { name: 'Mon', duration: 120, intensity: 8 },
        { name: 'Tue', duration: 90, intensity: 7 },
        { name: 'Wed', duration: 150, intensity: 9 },
        { name: 'Thu', duration: 60, intensity: 5 },
        { name: 'Fri', duration: 180, intensity: 8 },
        { name: 'Sat', duration: 200, intensity: 9 },
        { name: 'Sun', duration: 0, intensity: 0 },
    ];

    useEffect(() => {
        // Load performance history from local storage
        const logs = JSON.parse(localStorage.getItem(`perf_logs_${user?.uid}`) || "[]");
        setPerformanceData(logs);

        if (logs.length > 0) {
            setStats(prev => ({
                ...prev,
                trainingSessions: logs.length
            }));
        }
    }, [user]);

    const statCards = [
        { label: "Total Training", value: stats.trainingSessions, detail: "Sessions", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Injury Status", value: stats.injuryStatus, detail: "80% Recovery", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
        { label: "Current Rank", value: stats.rank, detail: "District Level", icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
        { label: "Next Event", value: "3 Days", detail: stats.upcomingEvent, icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Welcome Section */}
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-orange-600 p-[2px] shadow-2xl shadow-primary/20">
                            <div className="w-full h-full rounded-3xl bg-black flex items-center justify-center overflow-hidden border border-white/10">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-black text-primary">{user?.displayName?.charAt(0) || 'A'}</span>
                                )}
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-xl border-4 border-[#050505] shadow-lg">
                            <Trophy size={14} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none">
                                Welcome, <span className="text-primary italic">{user?.displayName?.split(' ')[0] || "Athlete"}</span>
                            </h1>
                            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                Elite Identity
                            </span>
                        </div>
                        <p className="text-gray-500 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">
                            Sport: Football • Level: College • High Academy verified
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
                        <Plus size={16} />
                        Log Action
                    </button>
                    <button className="px-6 py-3 bg-primary text-white rounded-2xl hover:bg-orange-600 shadow-xl shadow-primary/20 text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 group">
                        Enter Tournament
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/40 backdrop-blur-3xl border border-white/5 p-6 rounded-[2rem] hover:border-white/10 transition-all group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 ${card.bg} blur-[40px] -mr-12 -mt-12 rounded-full opacity-50`}></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                                <card.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Sync</span>
                        </div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-1 relative z-10">{card.label}</h3>
                        <div className="text-3xl font-black text-white tracking-tight relative z-10">{card.value}</div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 relative z-10">{card.detail}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Graph */}
                <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-[2.5rem] p-8 min-w-0">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-1">Performance Dynamics</h2>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Weekly Training Duration vs Intensity</p>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff5722" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ff5722" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis
                                    hide
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#050505',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        textTransform: 'uppercase'
                                    }}
                                    itemStyle={{ color: '#ff5722' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="duration"
                                    stroke="#ff5722"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Injury Summary Widget */}
                <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white mb-6">Medical Health</h2>

                    <div className="flex-1 space-y-6">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Status</span>
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Recovering</span>
                            </div>
                            <div className="text-sm font-bold text-white mb-2">ACL Knee Strain</div>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "80%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-primary h-full rounded-full"
                                />
                            </div>
                            <div className="mt-3 flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-500">Recovery Progress</span>
                                <span className="text-white">80%</span>
                            </div>
                        </div>

                        <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/20 text-primary rounded-xl">
                                    <TrendingUp size={16} />
                                </div>
                                <span className="text-xs font-black uppercase tracking-tight text-white italic underline">AI Risk Indicator</span>
                            </div>
                            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                Our platform AI predicts a <span className="text-green-500 font-black">low risk</span> of re-injury in the next 3 weeks based on your current intensity logs.
                            </p>
                        </div>
                    </div>

                    <button className="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                        Medical Documentation
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Quick Actions & Recent History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-2">Hyper-Speed Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Log Data", icon: Activity },
                            { label: "Add Injury", icon: Flame },
                            { label: "Find Scouts", icon: Trophy },
                        ].map((action, i) => (
                            <button key={i} className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:border-primary/50 transition-all hover:bg-primary/5 group">
                                <action.icon className="mb-3 text-gray-500 group-hover:text-primary transition-colors" size={24} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Ecosystem Activity</h3>
                        <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {performanceData.slice(0, 3).map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                                        <Activity size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white uppercase">{log.activityType}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">{log.date} • {log.duration} Mins</p>
                                    </div>
                                </div>
                                <div className="text-[9px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase">Synced</div>
                            </div>
                        ))}
                        {performanceData.length === 0 && (
                            <div className="text-center py-6 text-gray-500">
                                <Info size={24} className="mx-auto mb-2 opacity-20" />
                                <p className="text-[10px] font-black uppercase tracking-widest">No activities logged yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
