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
                    <h1 className="text-2xl font-bold text-white mb-1">Injury Reports</h1>
                    <p className="text-sm text-gray-500">Track and manage athlete injuries and recovery</p>
                </div>

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    {["All", "Mild", "Moderate", "Severe"].map((sev) => (
                        <button
                            key={sev}
                            onClick={() => setFilterSeverity(sev)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filterSeverity === sev
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
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
                    { label: "Critical Cases", count: reports.filter(r => r.severity === 'Severe').length, color: "text-red-400", bg: "bg-red-500/10" },
                    { label: "Moderate", count: reports.filter(r => r.severity === 'Moderate').length, color: "text-orange-400", bg: "bg-orange-500/10" },
                    { label: "Minor", count: reports.filter(r => r.severity === 'Mild').length, color: "text-blue-400", bg: "bg-blue-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                            <div className={`text-3xl font-bold ${stat.color}`}>{stat.count}</div>
                        </div>
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                            <AlertCircle size={22} />
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
                        className={`bg-white/[0.03] border ${report.severity === 'Severe' ? 'border-red-500/30' : 'border-white/[0.06]'} rounded-2xl p-6 group`}
                    >
                        {report.severity === 'Severe' && (
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                        )}

                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            {/* Athlete Info */}
                            <div className="flex items-center gap-4 min-w-[220px]">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary text-lg font-semibold">
                                    {report.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white">{report.name}</h3>
                                    <div className={`inline-flex px-2 py-0.5 rounded-full text-xs mt-0.5 ${getSeverityStyles(report.severity)}`}>
                                        {report.severity}
                                    </div>
                                </div>
                            </div>

                            {/* Injury Details */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-500">Injury</span>
                                    <div className="text-sm font-medium text-white">{report.issue}</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gray-500">Date</span>
                                    <div className="text-sm font-medium text-white">{report.date}</div>
                                </div>
                                <div className="lg:col-span-2 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Recovery</span>
                                        <span className="text-white font-medium">{report.progress}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${report.progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-full rounded-full ${report.severity === 'Severe' ? 'bg-red-500' :
                                                    report.severity === 'Moderate' ? 'bg-orange-500' :
                                                        'bg-blue-500'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col gap-2">
                                <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm text-white">
                                    View Log
                                </button>
                                <button className={`px-4 py-2.5 border rounded-xl transition-all text-sm ${report.severity === 'Severe' ? 'bg-red-500 text-white border-red-500' : 'bg-primary text-white border-primary'
                                    }`}>
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-start gap-3">
                            <Info size={14} className="text-primary mt-0.5" />
                            <p className="text-sm text-gray-400">{report.notes}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default InjuryReports;
