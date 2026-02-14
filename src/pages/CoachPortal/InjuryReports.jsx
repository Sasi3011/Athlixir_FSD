import { useState } from "react";
import { motion } from "framer-motion";
import {
    Flame, AlertCircle, Search, Filter,
    ChevronRight, Calendar, User, Clock,
    ShieldAlert, Activity, Info
} from "lucide-react";

const InjuryReports = () => {
    const [filterSeverity, setFilterSeverity] = useState("All");

    const reports = [
        { id: 1, name: "Rahul S.", issue: "ACL Strain", severity: "Severe", status: "Recovering", progress: 40, date: "2026-02-01", notes: "Strict rest advised by Dr. Varma." },
        { id: 2, name: "Priya M.", issue: "Ankle Sprain", severity: "Moderate", status: "Physiotherapy", progress: 65, date: "2026-02-05", notes: "Focus on balance-board drills." },
        { id: 3, name: "Sneha R.", issue: "Hamstring Pull", severity: "Mild", status: "Active Rehab", progress: 85, date: "2026-02-12", notes: "Low intensity jogging permitted." },
        { id: 4, name: "Vikram S.", issue: "Shoulder Impingement", severity: "Severe", status: "Surgical Consult", progress: 10, date: "2026-01-28", notes: "Awaiting MRI analysis." },
        { id: 5, name: "Arjun K.", issue: "Shin Splints", severity: "Mild", status: "Rest", progress: 90, date: "2026-02-13", notes: "Ice compression twice daily." },
    ];

    const filteredReports = reports.filter(r => filterSeverity === "All" || r.severity === filterSeverity);

    const getSeverityStyles = (severity) => {
        switch (severity) {
            case 'Severe': return 'bg-red-500/10 border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
            case 'Moderate': return 'bg-orange-500/10 border-orange-500/20 text-orange-500';
            default: return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 italic">Medical <span className="text-primary NOT-italic">Watchlist</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Critical monitor of athlete physical integrity</p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
                    {["All", "Mild", "Moderate", "Severe"].map((sev) => (
                        <button
                            key={sev}
                            onClick={() => setFilterSeverity(sev)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterSeverity === sev
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {sev}
                        </button>
                    ))}
                </div>
            </div>

            {/* Severity Breakdown Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Critical Cases", count: reports.filter(r => r.severity === 'Severe').length, color: "text-red-500", bg: "bg-red-500/10" },
                    { label: "Moderate Risk", count: reports.filter(r => r.severity === 'Moderate').length, color: "text-orange-500", bg: "bg-orange-500/10" },
                    { label: "Minor Issues", count: reports.filter(r => r.severity === 'Mild').length, color: "text-blue-500", bg: "bg-blue-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-white/10 transition-all">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                            <div className={`text-4xl font-black ${stat.color}`}>{stat.count}</div>
                        </div>
                        <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            <AlertCircle size={28} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Reports List */}
            <div className="grid grid-cols-1 gap-6">
                {filteredReports.map((report, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={report.id}
                        className={`bg-black/40 border ${report.severity === 'Severe' ? 'border-red-500/30 ring-1 ring-red-500/20' : 'border-white/5'} rounded-[3rem] p-8 group relative overflow-hidden`}
                    >
                        {report.severity === 'Severe' && (
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                        )}

                        <div className="flex flex-col lg:flex-row lg:items-center gap-10 relative z-10">
                            {/* Athlete Info */}
                            <div className="flex items-center gap-6 min-w-[250px]">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-primary text-xl font-black">
                                    {report.name.charAt(0)}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{report.name}</h3>
                                    <div className={`inline-flex px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getSeverityStyles(report.severity)}`}>
                                        {report.severity} Priority
                                    </div>
                                </div>
                            </div>

                            {/* Injury Details */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2 italic">
                                        <Activity size={10} className="text-primary" /> Condition Issue
                                    </span>
                                    <div className="text-sm font-bold text-white uppercase">{report.issue}</div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2 italic">
                                        <Clock size={10} className="text-primary" /> Incident Date
                                    </span>
                                    <div className="text-sm font-bold text-white uppercase">{report.date}</div>
                                </div>
                                <div className="lg:col-span-2 space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-gray-500 underline">Recovery Cycle</span>
                                        <span className="text-white italic">{report.progress}% Complete</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${report.progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-full rounded-full ${report.severity === 'Severe' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                                    report.severity === 'Moderate' ? 'bg-orange-500' :
                                                        'bg-blue-500'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col gap-3">
                                <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest text-white">
                                    View Log
                                </button>
                                <button className={`px-6 py-4 border rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest ${report.severity === 'Severe' ? 'bg-red-500 text-white border-red-500 shadow-xl shadow-red-500/20' : 'bg-primary text-white border-primary shadow-xl shadow-primary/20'
                                    }`}>
                                    Override
                                </button>
                            </div>
                        </div>

                        {/* Expandable Notes */}
                        <div className="mt-8 pt-8 border-t border-white/5 flex items-start gap-4">
                            <Info size={16} className="text-primary mt-1" />
                            <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic uppercase tracking-tight">
                                Medical Notes: <span className="text-white normal-case not-italic">{report.notes}</span>
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default InjuryReports;
