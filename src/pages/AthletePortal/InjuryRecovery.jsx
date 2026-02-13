import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Flame, Calendar, Activity, Info, Plus,
    ChevronRight, Save, Trash2, ShieldAlert,
    TrendingUp, HeartPulse, History
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const InjuryRecovery = () => {
    const { user } = useAuth();
    const [injuries, setInjuries] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        injuryType: "",
        date: new Date().toISOString().split('T')[0],
        severity: "Moderate",
        recoveryStatus: 50,
        notes: ""
    });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(`injuries_${user?.uid}`) || "[]");
        setInjuries(stored.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newInjury = { ...formData, id: Date.now() };
        const updated = [newInjury, ...injuries];
        setInjuries(updated);
        localStorage.setItem(`injuries_${user?.uid}`, JSON.stringify(updated));
        setShowForm(false);
        setFormData({
            injuryType: "",
            date: new Date().toISOString().split('T')[0],
            severity: "Moderate",
            recoveryStatus: 50,
            notes: ""
        });
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Mild': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'Moderate': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'Severe': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-gray-500 bg-white/5 border-white/10';
        }
    };

    const deleteInjury = (id) => {
        const updated = injuries.filter(i => i.id !== id);
        setInjuries(updated);
        localStorage.setItem(`injuries_${user?.uid}`, JSON.stringify(updated));
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Health Snapshot Header */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-black/40 border border-white/5 rounded-[3rem] p-10 flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
                                <HeartPulse size={24} />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">Health Snapshot</h2>
                        </div>
                        <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">
                            Detailed monitoring of your physical integrity. Real-time {injuries.length > 0 ? "reconstruction" : "optimization"} of athletic performance based on medical data.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/5 flex-1">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Active Risks</p>
                                <p className="text-xl font-black text-white">{injuries.filter(i => i.recoveryStatus < 100).length}</p>
                            </div>
                            <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/5 flex-1">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Cases</p>
                                <p className="text-xl font-black text-white">{injuries.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[280px] bg-white/[0.03] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center group border-dashed border-2 hover:border-primary/50 transition-all cursor-pointer"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-xl shadow-primary/10 group-hover:scale-110 transition-transform">
                            <Plus size={32} />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Register New Trait</h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Log Injury or Sickness</p>
                    </div>
                </div>

                <div className="bg-orange-600 border border-orange-500 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                    <ShieldAlert size={40} className="mb-6 relative z-10" />
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 relative z-10">AI Diagnostic</h3>
                    <p className="text-[11px] font-black uppercase tracking-widest leading-relaxed mb-8 opacity-80 relative z-10">
                        Analyzing movement patterns... <br />
                        <span className="text-2xl font-black italic">LOW RISK</span> <br />
                        No immediate anomalies detected in skeletal logs.
                    </p>
                    <button className="mt-auto w-full py-4 bg-white font-black text-orange-600 rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl relative z-10">
                        View Full Health Scan
                    </button>
                </div>
            </section>

            {/* Form Overlay */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-black/80 backdrop-blur-3xl border-2 border-primary/20 rounded-[3rem] p-10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8">
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white transition-colors">
                                <Plus size={24} className="rotate-45" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-10 flex items-center gap-4">
                            <Flame className="text-primary" />
                            Injury Documentation
                        </h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Type of Injury</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Ankle Sprain"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-primary/50 transition-all text-sm"
                                    value={formData.injuryType}
                                    onChange={(e) => setFormData({ ...formData, injuryType: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Date Occurred</label>
                                <input
                                    type="date"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white uppercase font-bold outline-none focus:border-primary/50 transition-all text-sm"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Severity Rating</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Mild', 'Moderate', 'Severe'].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, severity: s })}
                                            className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${formData.severity === s
                                                    ? "bg-primary border-primary text-white"
                                                    : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Medical Brief / Documentation</label>
                                <input
                                    type="text"
                                    placeholder="Enter clinic notes or treatment details..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-medium outline-none focus:border-primary/50 transition-all text-sm"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Recovery Status</label>
                                <div className="flex items-center gap-4 py-3">
                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={formData.recoveryStatus}
                                        onChange={(e) => setFormData({ ...formData, recoveryStatus: parseInt(e.target.value) })}
                                        className="flex-1 accent-primary h-1"
                                    />
                                    <span className="text-xs font-black text-white w-10">{formData.recoveryStatus}%</span>
                                </div>
                            </div>

                            <div className="lg:col-span-3 pt-6">
                                <button type="submit" className="w-full py-5 bg-primary text-white font-black rounded-2xl uppercase tracking-[.3em] shadow-2xl shadow-primary/30 hover:bg-orange-600 transition-all flex items-center justify-center gap-3">
                                    <Save size={20} /> Deploy Medical Log
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Injury Timeline View */}
            <section className="bg-black/40 border border-white/5 rounded-[3rem] p-10">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                        <History size={20} className="text-primary" />
                        Health Chronology
                    </h2>
                </div>

                <div className="space-y-8 relative before:absolute before:left-8 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                    {injuries.map((injury, i) => (
                        <div key={injury.id} className="relative pl-20 group">
                            <div className={`absolute left-6 top-2 w-5 h-5 rounded-full border-4 border-[#050505] z-10 transition-all group-hover:scale-125 ${injury.recoveryStatus === 100 ? "bg-green-500" : "bg-primary animate-pulse"
                                }`}></div>

                            <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:border-primary/30 transition-all flex flex-col lg:flex-row lg:items-center gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getSeverityColor(injury.severity)}`}>
                                            {injury.severity} Alert
                                        </span>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{injury.date}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2 group-hover:text-primary transition-colors">{injury.injuryType}</h3>
                                    <p className="text-xs text-gray-400 font-medium italic">{injury.notes || "No additional medical details logged."}</p>
                                </div>

                                <div className="w-full lg:w-72 space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Reconstruction</span>
                                        <span className="text-sm font-black text-white">{injury.recoveryStatus}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${injury.recoveryStatus}%` }}
                                            className={`h-full rounded-full transition-all duration-1000 ${injury.recoveryStatus === 100 ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "bg-primary"
                                                }`}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <button className="text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-widest">Update Report</button>
                                        <button
                                            onClick={() => deleteInjury(injury.id)}
                                            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {injuries.length === 0 && (
                        <div className="py-20 text-center flex flex-col items-center">
                            <Activity className="text-gray-800 mb-6 opacity-20" size={60} />
                            <h3 className="text-sm font-black text-gray-600 uppercase tracking-widest">No Medical Trajectories Detected</h3>
                            <p className="text-[10px] text-gray-700 font-bold uppercase mt-2">Your athletic integrity is currently at 100%.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default InjuryRecovery;
