import { useState } from "react";
import { motion } from "framer-motion";
import {
    PieChart as PieChartIcon, BarChart, LineChart as LineChartIcon,
    Zap, Target, TrendingUp, Users, Activity, Flame, ShieldCheck,
    ArrowUpRight, ArrowDownRight, Globe, Star
} from "lucide-react";
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, BarChart as ReBarChart, Bar,
    PieChart, Pie, Cell, Legend
} from "recharts";

const TeamAnalytics = () => {
    const squadData = [
        { name: 'Week 1', avgLoad: 62, improvement: 40, activeCount: 38 },
        { name: 'Week 2', avgLoad: 68, improvement: 45, activeCount: 40 },
        { name: 'Week 3', avgLoad: 75, improvement: 52, activeCount: 42 },
        { name: 'Week 4', avgLoad: 70, improvement: 58, activeCount: 41 },
        { name: 'Week 5', avgLoad: 82, improvement: 65, activeCount: 42 },
        { name: 'Week 6', avgLoad: 85, improvement: 72, activeCount: 42 },
    ];

    const distributionData = [
        { name: 'Elite Tier', value: 15, color: '#ff5722' },
        { name: 'Advanced Tier', value: 35, color: '#3b82f6' },
        { name: 'Developmental', value: 50, color: '#8b5cf6' },
    ];

    const injuryStats = [
        { name: 'Healthy', value: 85, color: '#22c55e' },
        { name: 'Injured', value: 15, color: '#ef4444' },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 italic">Strategic <span className="text-primary NOT-italic">Analytics</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">AI-Driven squad assessment & market projection</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                        <Globe size={16} /> Global Market Sync Active
                    </span>
                    <button className="px-8 py-3 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Deep Export
                    </button>
                </div>
            </div>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Squad Efficiency", value: "84.2%", trend: "+5.4%", icon: Zap, color: "text-primary" },
                    { label: "Talent Score Avg", value: "72/100", trend: "+2.1", icon: Star, color: "text-blue-500" },
                    { label: "Injury Frequency", value: "4.8%", trend: "-1.2%", icon: Flame, color: "text-red-500", inverse: true },
                    { label: "Recruitment Reach", value: "12k+", trend: "+15%", icon: Globe, color: "text-purple-500" },
                ].map((kpi, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 bg-white/5 rounded-2xl ${kpi.color}`}>
                                <kpi.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${kpi.inverse
                                ? (kpi.trend.startsWith('-') ? 'text-green-500' : 'text-red-500')
                                : (kpi.trend.startsWith('+') ? 'text-green-500' : 'text-red-500')
                                }`}>
                                {kpi.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {kpi.trend}
                            </div>
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{kpi.label}</h3>
                        <div className="text-3xl font-black text-white italic">{kpi.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Improvement Trend */}
                <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-[3rem] p-10 min-w-0 overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-1">Squad Progression Curve</h2>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic underline flex items-center gap-2">
                                <TrendingUp size={12} className="text-primary" /> Integrated Athlete Growth Mapping
                            </p>
                        </div>
                    </div>
                    <div className="h-[400px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={squadData}>
                                <defs>
                                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff5722" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ff5722" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 900 }}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="improvement" stroke="#ff5722" strokeWidth={4} fillOpacity={1} fill="url(#colorAvg)" />
                                <Area type="monotone" dataKey="avgLoad" stroke="#3b82f6" strokeWidth={4} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Pie */}
                <div className="bg-black/40 border border-white/5 rounded-[3rem] p-10 flex flex-col">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white mb-10 italic">Tier Distribution</h2>
                    <div className="flex-1 min-h-[300px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-4 mt-8">
                        {distributionData.map((entry, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{entry.name}</span>
                                </div>
                                <span className="text-sm font-black text-white italic">{entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lower Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Team Injury Analysis */}
                <div className="bg-black/40 border border-white/5 rounded-[3rem] p-10 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-black uppercase tracking-tight text-white">Integrity Matrix</h2>
                        <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest italic">
                            Highly Resilient
                        </div>
                    </div>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={injuryStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 900 }}
                                />
                                <YAxis hide />
                                <Bar dataKey="value" fill="#ff5722" radius={[15, 15, 0, 0]} maxBarSize={100}>
                                    {injuryStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="mt-8 text-[11px] text-gray-500 font-medium leading-relaxed uppercase tracking-tight text-center italic">
                        Squad health is <span className="text-green-500 font-black underline italic">4.2% above market average</span> for equivalent tier teams.
                    </p>
                </div>

                {/* AI Predictions */}
                <div className="bg-primary/5 border border-primary/20 rounded-[3rem] p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white">AI Scout Prediction</h3>
                                <p className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">Projection for Q3 2026</p>
                            </div>
                        </div>
                        <div className="space-y-6 flex-1 flex flex-col justify-center">
                            <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem]">
                                <p className="text-lg font-bold text-white leading-relaxed uppercase italic">
                                    "Projected squad value to increase by <span className="text-primary font-black">$240k</span> based on current improvement metrics and upcoming league exposures."
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Success Rate</div>
                                    <div className="text-2xl font-black text-white italic">88.4%</div>
                                </div>
                                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                                    <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">Volatility</div>
                                    <div className="text-2xl font-black text-white italic">Low (0.12)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamAnalytics;
