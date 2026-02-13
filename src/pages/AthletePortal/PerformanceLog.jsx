import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity, Calendar, Clock, BarChart3,
    Save, Trash2, Edit3, Plus, Filter, Info,
    ChevronRight, CheckCircle2, TrendingUp
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    Tooltip, Cell, CartesianGrid
} from 'recharts';

const PerformanceLog = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        activityType: "Training",
        date: new Date().toISOString().split('T')[0],
        duration: "",
        intensity: "Medium",
        level: "College",
        notes: ""
    });

    useEffect(() => {
        const storedLogs = JSON.parse(localStorage.getItem(`perf_logs_${user?.uid}`) || "[]");
        setLogs(storedLogs.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLog = {
            ...formData,
            id: Date.now(),
            syncStatus: "Synced"
        };
        const updatedLogs = [newLog, ...logs];
        setLogs(updatedLogs);
        localStorage.setItem(`perf_logs_${user?.uid}`, JSON.stringify(updatedLogs));
        setShowForm(false);
        setFormData({
            activityType: "Training",
            date: new Date().toISOString().split('T')[0],
            duration: "",
            intensity: "Medium",
            level: "College",
            notes: ""
        });
    };

    const deleteLog = (id) => {
        const updatedLogs = logs.filter(log => log.id !== id);
        setLogs(updatedLogs);
        localStorage.setItem(`perf_logs_${user?.uid}`, JSON.stringify(updatedLogs));
    };

    const getIntensityColor = (intensity) => {
        switch (intensity) {
            case 'High': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'Medium': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            default: return 'text-green-500 bg-green-500/10 border-green-500/20';
        }
    };

    // Calculate chart data from logs
    const chartData = logs.slice(0, 7).reverse().map(log => ({
        name: log.date.split('-').slice(1).join('/'),
        duration: parseInt(log.duration) || 0
    }));

    return (
        <div className="space-y-10 pb-20">
            {/* Header / Summary Graph */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-black/40 border border-white/5 rounded-[2.5rem] p-10 min-w-0">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-1">Session Dynamics</h2>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Duration analysis of recent activities</p>
                        </div>
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <BarChart3 size={24} />
                        </div>
                    </div>

                    <div className="h-[240px] w-full relative">
                        {logs.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: '#ffffff05' }}
                                        contentStyle={{ backgroundColor: '#050505', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }}
                                    />
                                    <Bar dataKey="duration" radius={[6, 6, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#ff5722' : '#ffffff20'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-white/5 rounded-3xl">
                                <Activity size={40} className="mb-4 opacity-10" />
                                <p className="text-xs font-black uppercase tracking-widest">No Log Data Available</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-primary border border-primary/50 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 flex flex-col h-full">
                    <TrendingUp size={40} className="mb-6" />
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4">Optimization Engine</h3>
                    <p className="text-xs font-bold leading-relaxed mb-10 opacity-90 uppercase tracking-widest">
                        Data from your logs is synced directly with scout feeds. Keep your intensity consistent for higher ecosystem ranking.
                    </p>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="mt-auto w-full py-4 bg-white text-primary font-black rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                        {showForm ? <Trash2 size={16} /> : <Plus size={16} />}
                        {showForm ? "Cancel Log" : "Add Session"}
                    </button>
                </div>
            </section>

            {/* Performance Form Overlay/Section */}
            <AnimatePresence>
                {showForm && (
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-black/80 backdrop-blur-3xl border-2 border-primary/30 p-10 rounded-[3rem] shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-4 bg-primary text-white rounded-2xl shadow-lg">
                                <Calendar size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">Log New Session</h2>
                                <p className="text-[10px] text-primary font-black uppercase tracking-[.3em]">Identity ID: ATH-LOG-2024</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Activity Type</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white uppercase font-bold outline-none focus:border-primary/50 transition-all text-sm"
                                    value={formData.activityType}
                                    onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                                >
                                    <option className="bg-[#050505]">Training</option>
                                    <option className="bg-[#050505]">Match</option>
                                    <option className="bg-[#050505]">Recovery Session</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white uppercase font-bold outline-none focus:border-primary/50 transition-all text-sm"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Duration (Mins)</label>
                                <div className="relative group">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary" size={18} />
                                    <input
                                        type="number"
                                        placeholder="90"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white font-bold outline-none focus:border-primary/50 transition-all text-sm"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Intensity Level</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Low', 'Medium', 'High'].map((l) => (
                                        <button
                                            key={l}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, intensity: l })}
                                            className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.intensity === l
                                                ? "bg-primary border-primary text-white"
                                                : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                                                }`}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Notes / Highlights</label>
                                <input
                                    type="text"
                                    placeholder="Briefly describe your performance details..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-medium outline-none focus:border-primary/50 transition-all text-sm"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-3 pt-4">
                                <button type="submit" className="w-full py-5 bg-primary text-white font-black rounded-[1.5rem] uppercase tracking-[.3em] shadow-2xl shadow-primary/30 hover:bg-orange-600 hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
                                    <Save size={20} /> Synchronize Log
                                </button>
                            </div>
                        </form>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Performance History Table */}
            <section className="bg-black/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="p-10 flex justify-between items-center border-b border-white/5">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white">Performance Chronicle</h2>
                    <div className="flex gap-2">
                        <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-10 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Date / Time</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Activity</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Duration</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Intensity</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Level</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Cloud Sync</th>
                                <th className="px-10 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logs.map((log) => (
                                <tr key={log.id} className="group hover:bg-white/[0.03] transition-colors">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                                            <span className="text-xs font-bold text-white uppercase">{log.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-black uppercase text-xs text-white italic">{log.activityType}</td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-300">{log.duration}</span>
                                            <span className="text-[9px] font-bold text-gray-600 uppercase">Mins</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getIntensityColor(log.intensity)}`}>
                                            {log.intensity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-[10px] font-black text-gray-500 uppercase tracking-wider">{log.level}</td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center justify-center">
                                            <CheckCircle2 size={16} className="text-green-500" />
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"><Edit3 size={14} /></button>
                                            <button
                                                onClick={() => deleteLog(log.id)}
                                                className="p-2 bg-red-500/5 hover:bg-red-500/20 rounded-lg text-red-500/60 hover:text-red-500 transition-all"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-10 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <BarChart3 className="text-gray-700 mb-4" size={48} />
                                            <p className="text-sm font-black text-gray-500 uppercase tracking-widest">No Chronicle History Detected</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default PerformanceLog;
