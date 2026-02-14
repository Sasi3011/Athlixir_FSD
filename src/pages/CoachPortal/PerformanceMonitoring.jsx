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
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 italic">Performance <span className="text-primary NOT-italic">Intelligence</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Cross-compare training load & progression metrics</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 italic mr-2">Selection:</span>
                    <div className="flex -space-x-3">
                        {selectedAthletes.map(id => {
                            const a = athletes.find(ath => ath.id === id);
                            return (
                                <div key={id} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[10px] font-black border-2 border-[#050505] shadow-lg">
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
                <div className="bg-black/40 border border-white/5 rounded-[3rem] p-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-8 border-b border-white/5 pb-4">Select Target Nodes</h3>
                    <div className="space-y-3">
                        {athletes.map((athlete) => (
                            <button
                                key={athlete.id}
                                onClick={() => toggleAthlete(athlete.id)}
                                className={`w-full p-4 rounded-2xl flex items-center justify-between group transition-all ${selectedAthletes.includes(athlete.id)
                                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[9px] font-black uppercase border ${selectedAthletes.includes(athlete.id) ? "bg-white/20 border-white/20" : "bg-black/40 border-white/10"
                                        }`}>
                                        {athlete.name.charAt(0)}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{athlete.name.split(' ')[0]}</span>
                                </div>
                                <Zap size={14} className={selectedAthletes.includes(athlete.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"} />
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <Info size={14} className="text-primary" />
                            <span className="text-[9px] font-black uppercase text-white tracking-widest">Compare Limit</span>
                        </div>
                        <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
                            Select up to 3 athletes for granular comparison across standard metrics.
                        </p>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Bar Chart Comparison */}
                    <div className="bg-black/40 border border-white/5 rounded-[3rem] p-10 min-w-0 overflow-hidden">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">Comparative Load Metrics</h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic flex items-center gap-2">
                                    <BarChart2 size={12} className="text-primary" /> Training duration & Intensity scaling
                                </p>
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
                                        formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{value}</span>}
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
                            <div key={i} className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl -mr-12 -mt-12 rounded-full"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-primary text-xs border border-white/10 uppercase">
                                            {data.name.charAt(0)}
                                        </div>
                                        <ArrowUpRight size={18} className="text-gray-600 group-hover:text-primary transition-colors" />
                                    </div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Growth Index</h4>
                                    <div className="text-3xl font-black text-white mb-2">{data.improvement}%</div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${data.improvement}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(255,87,34,0.4)]"
                                        />
                                    </div>
                                    <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-4 italic">Surging Velocity</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMonitoring;
