import { useState } from "react";
import { motion } from "framer-motion";
import {
    Activity, Users, Search, BarChart2, TrendingUp,
    Zap, ChevronRight, Filter, Info, ArrowUpRight
} from "lucide-react";
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, Cell
} from "recharts";

const PerformanceMonitoring = () => {
    const athletes = [
        { id: 1, name: "Rahul Sharma", duration: 180, load: 85, progress: 92 },
        { id: 2, name: "Priya Mani", duration: 140, load: 70, progress: 65 },
        { id: 3, name: "Arjun Kumar", duration: 160, load: 78, progress: 88 },
        { id: 4, name: "Sneha Reddy", duration: 90, load: 45, progress: 45 },
        { id: 5, name: "Vikram Singh", duration: 200, load: 92, progress: 95 },
    ];

    const [selectedAthletes, setSelectedAthletes] = useState([1, 2]);

    const toggleAthlete = (id) => {
        if (selectedAthletes.includes(id)) {
            if (selectedAthletes.length > 1) {
                setSelectedAthletes(selectedAthletes.filter(aid => aid !== id));
            }
        } else {
            if (selectedAthletes.length < 3) {
                setSelectedAthletes([...selectedAthletes, id]);
            }
        }
    };

    const comparisonData = selectedAthletes.map(id => {
        const a = athletes.find(ath => ath.id === id);
        return {
            name: a.name.split(' ')[0],
            duration: a.duration,
            load: a.load,
            improvement: a.progress
        };
    });

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Performance Monitoring</h1>
                    <p className="text-sm text-gray-500">Compare training load and progress across athletes</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 mr-1">Comparing:</span>
                    <div className="flex -space-x-2">
                        {selectedAthletes.map(id => {
                            const a = athletes.find(ath => ath.id === id);
                            return (
                                <div key={id} className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-medium text-primary border-2 border-[#050505] shadow-lg">
                                    {a.name.charAt(0)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Comparison Logic Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Athlete Selector Sidebar */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-white mb-4 pb-3 border-b border-white/[0.06]">Select Athletes</h3>
                    <div className="space-y-3">
                        {athletes.map((athlete) => (
                            <button
                                key={athlete.id}
                                onClick={() => toggleAthlete(athlete.id)}
                                className={`w-full p-3 rounded-xl flex items-center justify-between group transition-all ${selectedAthletes.includes(athlete.id)
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold border ${selectedAthletes.includes(athlete.id) ? "bg-white/20 border-white/20" : "bg-black/40 border-white/10"
                                        }`}>
                                        {athlete.name.charAt(0)}
                                    </div>
                                    <span className="text-sm">{athlete.name.split(' ')[0]}</span>
                                </div>
                                <Zap size={14} className={selectedAthletes.includes(athlete.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"} />
                            </button>
                        ))}
                    </div>
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Info size={13} className="text-primary" />
                            <span className="text-xs font-medium text-white">Compare limit</span>
                        </div>
                        <p className="text-xs text-gray-500">
                            Select up to 3 athletes to compare.
                        </p>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Bar Chart Comparison */}
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 min-w-0 overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-base font-semibold text-white mb-0.5">Training Metrics Comparison</h3>
                                <p className="text-xs text-gray-500">Duration, load intensity & improvement score</p>
                            </div>
                        </div>

                        <div className="h-[400px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 900 }}
                                        dy={15}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: '20px' }}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-xs font-medium text-gray-500 capitalize">{value}</span>}
                                    />
                                    <Bar dataKey="duration" fill="#ff5722" radius={[10, 10, 0, 0]} maxBarSize={60} />
                                    <Bar dataKey="load" fill="#3b82f6" radius={[10, 10, 0, 0]} maxBarSize={60} />
                                    <Bar dataKey="improvement" fill="#8b5cf6" radius={[10, 10, 0, 0]} maxBarSize={60} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Improvement Trend Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {comparisonData.map((data, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center font-semibold text-primary text-sm border border-white/10">
                                        {data.name.charAt(0)}
                                    </div>
                                    <ArrowUpRight size={16} className="text-gray-500" />
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Progress</p>
                                <div className="text-2xl font-bold text-white mb-2">{data.improvement}%</div>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${data.improvement}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-primary h-full rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-primary mt-3">{data.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMonitoring;
