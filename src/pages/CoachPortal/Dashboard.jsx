import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Activity, Users, Calendar, Flame, TrendingUp, AlertCircle,
    ChevronRight, Zap, Target, Star, Briefcase, MessageSquare
} from "lucide-react";
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, BarChart, Bar
} from "recharts";
import { useAuth } from "../../context/AuthContext";

const CoachDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalAthletes: 42,
        activeInjuries: 3,
        upcomingEvents: 2,
        performanceAlerts: 5
    });

    const performanceData = [
        { name: 'Mon', load: 65, improvement: 40 },
        { name: 'Tue', load: 58, improvement: 45 },
        { name: 'Wed', load: 85, improvement: 52 },
        { name: 'Thu', load: 42, improvement: 48 },
        { name: 'Fri', load: 72, improvement: 60 },
        { name: 'Sat', load: 90, improvement: 68 },
        { name: 'Sun', load: 10, improvement: 65 },
    ];

    const alerts = [
        { id: 1, type: "injury", message: "Rahul S. at high risk of ACL strain", severity: "high", time: "2h ago" },
        { id: 2, type: "activity", message: "Priya M. inactive for 4 days", severity: "medium", time: "5h ago" },
        { id: 3, type: "log", message: "New max sprint record by Arjun K.", severity: "low", time: "1h ago" },
        { id: 4, type: "injury", message: "Siddharth R. recovery milestone reached", severity: "low", time: "10m ago" },
    ];

    const statCards = [
        { label: "Total Athletes", value: stats.totalAthletes, sub: "Across 3 squads", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Active Injuries", value: stats.activeInjuries, sub: "2 recovering", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
        { label: "Upcoming Events", value: stats.upcomingEvents, sub: "Next in 4 days", icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Alerts", value: stats.performanceAlerts, sub: "Action required", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header / Welcome */}
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Welcome back, <span className="text-primary">Coach {user?.displayName?.split(' ')[0] || "Hub"}</span>
                    </h1>
                    <p className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <button className="px-6 py-3 bg-primary text-white font-semibold rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all">
                    Generate Team Report
                </button>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-2xl hover:border-primary/30 transition-all group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${card.bg} blur-[60px] -mr-16 -mt-16 rounded-full group-hover:opacity-100 opacity-50 transition-opacity`}></div>
                        <div className="relative z-10">
                            <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                                <card.icon size={20} />
                            </div>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">{card.label}</p>
                            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                            <p className="text-xs text-gray-500">{card.sub}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Alerts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart */}
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 min-w-0 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-base font-semibold text-white mb-0.5">Squad Performance</h2>
                            <p className="text-xs text-gray-500">Team training load vs improvement</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span className="text-xs text-gray-500">Load</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-xs text-gray-500">Growth</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[350px] w-full relative overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff5722" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ff5722" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 800 }}
                                    dy={15}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="load" stroke="#ff5722" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                                <Area type="monotone" dataKey="improvement" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-base font-semibold text-white">Risk Alerts</h2>
                        <Zap size={18} className="text-primary" />
                    </div>

                    <div className="flex-1 space-y-4">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl group hover:border-primary/20 transition-all">
                                <div className="flex justify-between items-start mb-1.5">
                                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${alert.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                                        alert.severity === 'medium' ? 'bg-orange-500/10 text-orange-400' :
                                            'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {alert.severity === 'high' ? 'High' : alert.severity === 'medium' ? 'Medium' : 'Low'}
                                    </div>
                                    <span className="text-[10px] text-gray-500">{alert.time}</span>
                                </div>
                                <p className="text-sm text-white group-hover:text-primary transition-colors">{alert.message}</p>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 w-full py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] text-sm font-medium text-gray-400 transition-all flex items-center justify-center gap-2 group">
                        View All Alerts
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "New Event", icon: Calendar, desc: "Schedule trial or meet" },
                    { label: "Post Opportunity", icon: Briefcase, desc: "Scholarships & camps" },
                    { label: "Team Message", icon: MessageSquare, desc: "Notify all athletes" },
                ].map((action, i) => (
                    <button key={i} className="flex items-center gap-4 p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-primary/5 hover:border-primary/20 transition-all text-left group">
                        <div className="w-12 h-12 bg-white/[0.05] rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                            <action.icon size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-0.5">{action.label}</h4>
                            <p className="text-xs text-gray-500">{action.desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CoachDashboard;
