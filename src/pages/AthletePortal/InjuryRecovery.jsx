import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Calendar, Save, X, Filter, Eye, Trash2, Pencil, Upload,
    AlertTriangle, CheckCircle2, Clock, Activity, TrendingUp, Sparkles,
    HeartPulse, Target, ShieldAlert
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, BarChart, Bar, Cell
} from "recharts";

const INJURY_TYPES = ["Muscle Strain", "Ligament Tear", "Fracture", "Sprain", "Dislocation", "Other"];
const BODY_PARTS = ["Head", "Neck", "Shoulder", "Elbow", "Wrist", "Hand", "Back", "Hip", "Knee", "Ankle", "Foot", "Other"];
const CAUSES = ["Match", "Training", "Overuse", "Accident"];
const SEVERITIES = ["Mild", "Moderate", "Severe"];

const getDefaultForm = () => ({
    injuryDate: new Date().toISOString().split("T")[0],
    injuryType: "",
    bodyPart: "",
    severity: "Moderate",
    painLevel: "",
    cause: "",
    doctorDiagnosed: "No",
    medicalReportFile: "",
    recoveryStartDate: "",
    estimatedRecoveryWeeks: "",
    rehabExercises: "",
    physioSessions: "",
    medication: "",
    weeklyPainUpdates: "",
    recoveryPercent: 0,
    clearedToPlay: "No",
    returnToPlayDate: "",
    notes: ""
});

function getStatus(injury) {
    const pct = Number(injury.recoveryPercent) || 0;
    if (pct >= 100) return "Recovered";
    if (pct >= 20) return "Recovering";
    return "Active";
}

function getDaysMissed(injury) {
    const start = injury.injuryDate || injury.recoveryStartDate;
    if (!start) return "—";
    const end = injury.returnToPlayDate || (getStatus(injury) === "Recovered" ? new Date().toISOString().split("T")[0] : null);
    if (!end) return "Ongoing";
    const d = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.round(d));
}

function computeInjuryRisk(injuries, perfLogs) {
    const recent = perfLogs.slice(0, 14);
    const highFatigueDays = recent.filter(l => Number(l.fatigueLevel) >= 8).length;
    const avgPain = recent.length ? recent.reduce((s, l) => s + Number(l.painLevel) || 0, 0) / recent.length : 0;
    const activeInjuries = injuries.filter(i => getStatus(i) === "Active").length;
    const recoveringCount = injuries.filter(i => getStatus(i) === "Recovering").length;

    let score = 0;
    if (highFatigueDays >= 3) score += 30;
    else if (highFatigueDays >= 1) score += 15;
    if (avgPain >= 6) score += 25;
    else if (avgPain >= 4) score += 15;
    if (activeInjuries > 0) score += 35;
    if (recoveringCount > 0) score += 15;

    if (score >= 50) return { level: "High", color: "text-red-500", bg: "bg-red-500/10" };
    if (score >= 25) return { level: "Medium", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { level: "Low", color: "text-emerald-500", bg: "bg-emerald-500/10" };
}

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";
const labelClass = "block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5";

const InjuryRecovery = () => {
    const { user } = useAuth();
    const [injuries, setInjuries] = useState([]);
    const [perfLogs, setPerfLogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [viewingId, setViewingId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(getDefaultForm());

    const [filterBodyPart, setFilterBodyPart] = useState("");
    const [filterSeverity, setFilterSeverity] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(`injuries_${user?.uid}`) || "[]");
        setInjuries(stored.sort((a, b) => new Date(b.injuryDate) - new Date(a.injuryDate)));
    }, [user]);

    useEffect(() => {
        const logs = JSON.parse(localStorage.getItem(`perf_logs_${user?.uid}`) || "[]");
        setPerfLogs(logs);
    }, [user]);

    const activeCount = injuries.filter(i => getStatus(i) === "Active").length;
    const recoveringCount = injuries.filter(i => getStatus(i) === "Recovering").length;
    const recoveredCount = injuries.filter(i => getStatus(i) === "Recovered").length;
    const risk = useMemo(() => computeInjuryRisk(injuries, perfLogs), [injuries, perfLogs]);
    const avgRecoveryTime = useMemo(() => {
        const withReturn = injuries.filter(i => i.returnToPlayDate && getStatus(i) === "Recovered");
        if (withReturn.length === 0) return "—";
        const total = withReturn.reduce((s, i) => s + getDaysMissed(i), 0);
        return `${Math.round(total / withReturn.length)} days`;
    }, [injuries]);

    const filteredInjuries = useMemo(() => {
        let list = [...injuries];
        if (filterBodyPart) list = list.filter(i => i.bodyPart === filterBodyPart);
        if (filterSeverity) list = list.filter(i => i.severity === filterSeverity);
        if (filterStatus) list = list.filter(i => getStatus(i) === filterStatus);
        return list;
    }, [injuries, filterBodyPart, filterSeverity, filterStatus]);

    const openNew = () => {
        setEditingId(null);
        setViewingId(null);
        setForm(getDefaultForm());
        setShowModal(true);
    };

    const openView = (inj) => {
        setViewingId(inj.id);
        setEditingId(null);
        setForm({ ...getDefaultForm(), ...inj });
        setShowModal(true);
    };

    const openEdit = (inj) => {
        setEditingId(inj.id);
        setViewingId(null);
        setForm({ ...getDefaultForm(), ...inj });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setViewingId(null);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const entry = { ...form, id: editingId || Date.now() };
        let next;
        if (editingId) {
            next = injuries.map(i => i.id === editingId ? entry : i);
        } else {
            next = [entry, ...injuries];
        }
        setInjuries(next.sort((a, b) => new Date(b.injuryDate) - new Date(a.injuryDate)));
        localStorage.setItem(`injuries_${user?.uid}`, JSON.stringify(next));
        closeModal();
    };

    const deleteInjury = (id) => {
        const next = injuries.filter(i => i.id !== id);
        setInjuries(next);
        localStorage.setItem(`injuries_${user?.uid}`, JSON.stringify(next));
    };

    const isViewOnly = !!viewingId;

    const chartData = useMemo(() => {
        const byWeek = {};
        injuries.forEach(i => {
            const week = i.injuryDate?.slice(0, 10);
            if (!week) return;
            const key = week.slice(0, 7);
            if (!byWeek[key]) byWeek[key] = { month: key, injuries: 0, pain: 0, count: 0 };
            byWeek[key].injuries += 1;
            byWeek[key].pain += Number(i.painLevel) || 0;
            byWeek[key].count += 1;
        });
        return Object.values(byWeek).map(m => ({ ...m, pain: m.count ? Math.round(m.pain / m.count) : 0 })).sort((a, b) => a.month.localeCompare(b.month)).slice(-8);
    }, [injuries]);

    const overtrainingWarning = useMemo(() => {
        const recent = perfLogs.slice(0, 5);
        const highFatigue = recent.filter(l => Number(l.fatigueLevel) >= 8).length;
        return highFatigue >= 3;
    }, [perfLogs]);

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-white/95">Injury & Recovery</h1>
                <button
                    type="button"
                    onClick={openNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                    <Plus size={18} />
                    Report Injury
                </button>
            </div>

            {/* 1. Injury Overview Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="rounded-2xl border border-white/[0.06] bg-red-500/10 p-5">
                    <p className="text-[10px] font-medium text-red-500/90 uppercase tracking-wider">Active injuries</p>
                    <p className="text-2xl font-bold text-white mt-1">{activeCount}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-amber-500/10 p-5">
                    <p className="text-[10px] font-medium text-amber-500/90 uppercase tracking-wider">Recovering</p>
                    <p className="text-2xl font-bold text-white mt-1">{recoveringCount}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-emerald-500/10 p-5">
                    <p className="text-[10px] font-medium text-emerald-500/90 uppercase tracking-wider">Fully recovered</p>
                    <p className="text-2xl font-bold text-white mt-1">{recoveredCount}</p>
                </div>
                <div className={`rounded-2xl border border-white/[0.06] p-5 ${risk.bg}`}>
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Current injury risk</p>
                    <p className={`text-lg font-bold mt-1 ${risk.color}`}>{risk.level}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 col-span-2 lg:col-span-1">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Clock size={12} /> Avg recovery time
                    </p>
                    <p className="text-lg font-bold text-white mt-1">{avgRecoveryTime}</p>
                </div>
            </section>

            {/* Overtraining / fatigue alert */}
            {overtrainingWarning && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-center gap-3">
                    <ShieldAlert size={20} className="text-amber-500 shrink-0" />
                    <p className="text-sm text-amber-200/90">High fatigue (8+) recorded for 3 or more recent sessions. Consider rest and recovery.</p>
                </div>
            )}

            {/* Modal: Report / Edit / View */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            onClick={e => e.stopPropagation()}
                            className="w-full max-w-2xl rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-xl my-8"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <h2 className="text-lg font-semibold text-white">
                                    {viewingId ? "View Injury" : editingId ? "Edit Injury" : "Report Injury"}
                                </h2>
                                <button type="button" onClick={closeModal} className="p-2 text-gray-500 hover:text-white rounded-lg"><X size={18} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
                                <section>
                                    <h3 className={labelClass}>Basic info</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Injury date</label>
                                            <input type="date" className={inputClass} value={form.injuryDate} onChange={e => setForm(f => ({ ...f, injuryDate: e.target.value }))} required readOnly={isViewOnly} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Injury type</label>
                                            <select className={inputClass} value={form.injuryType} onChange={e => setForm(f => ({ ...f, injuryType: e.target.value }))} required disabled={isViewOnly}>
                                                <option value="">Select</option>
                                                {INJURY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Body part</label>
                                            <select className={inputClass} value={form.bodyPart} onChange={e => setForm(f => ({ ...f, bodyPart: e.target.value }))} required disabled={isViewOnly}>
                                                <option value="">Select</option>
                                                {BODY_PARTS.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Severity</label>
                                            <select className={inputClass} value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value }))} disabled={isViewOnly}>
                                                {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Pain level (0–10)</label>
                                            <input type="number" min={0} max={10} className={inputClass} value={form.painLevel} onChange={e => setForm(f => ({ ...f, painLevel: e.target.value }))} readOnly={isViewOnly} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Cause</label>
                                            <select className={inputClass} value={form.cause} onChange={e => setForm(f => ({ ...f, cause: e.target.value }))} disabled={isViewOnly}>
                                                <option value="">Select</option>
                                                {CAUSES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className={labelClass}>Doctor diagnosed?</label>
                                            <select className={inputClass} value={form.doctorDiagnosed} onChange={e => setForm(f => ({ ...f, doctorDiagnosed: e.target.value }))} disabled={isViewOnly}>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className={labelClass}>Upload medical report (optional)</label>
                                            {isViewOnly ? (
                                                <p className="text-sm text-white/80 py-2">{form.medicalReportFile || "—"}</p>
                                            ) : (
                                                <input type="file" className={inputClass} onChange={e => setForm(f => ({ ...f, medicalReportFile: e.target.files?.[0]?.name || "" }))} />
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className={labelClass}>Recovery tracking</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className={labelClass}>Recovery start date</label><input type="date" className={inputClass} value={form.recoveryStartDate} onChange={e => setForm(f => ({ ...f, recoveryStartDate: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Estimated recovery (weeks)</label><input type="number" className={inputClass} value={form.estimatedRecoveryWeeks} onChange={e => setForm(f => ({ ...f, estimatedRecoveryWeeks: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div className="col-span-2"><label className={labelClass}>Rehab exercises</label><textarea className={inputClass + " min-h-[60px]"} value={form.rehabExercises} onChange={e => setForm(f => ({ ...f, rehabExercises: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Physiotherapy sessions</label><input type="number" className={inputClass} value={form.physioSessions} onChange={e => setForm(f => ({ ...f, physioSessions: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Medication (optional)</label><input type="text" className={inputClass} value={form.medication} onChange={e => setForm(f => ({ ...f, medication: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div className="col-span-2"><label className={labelClass}>Weekly pain level updates (e.g. Week1: 7, Week2: 5)</label><input type="text" className={inputClass} value={form.weeklyPainUpdates} onChange={e => setForm(f => ({ ...f, weeklyPainUpdates: e.target.value }))} placeholder="Optional" readOnly={isViewOnly} /></div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className={labelClass}>Progress</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Recovery % (0–100)</label>
                                            <input type="number" min={0} max={100} className={inputClass} value={form.recoveryPercent} onChange={e => setForm(f => ({ ...f, recoveryPercent: e.target.value }))} readOnly={isViewOnly} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Cleared to play?</label>
                                            <select className={inputClass} value={form.clearedToPlay} onChange={e => setForm(f => ({ ...f, clearedToPlay: e.target.value }))} disabled={isViewOnly}>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className={labelClass}>Return-to-play date</label>
                                            <input type="date" className={inputClass} value={form.returnToPlayDate} onChange={e => setForm(f => ({ ...f, returnToPlayDate: e.target.value }))} readOnly={isViewOnly} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className={labelClass}>Notes</label>
                                            <textarea className={inputClass + " min-h-[60px]"} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} readOnly={isViewOnly} />
                                        </div>
                                    </div>
                                </section>

                                {!isViewOnly && (
                                    <div className="flex gap-3 pt-2">
                                        <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-lg border border-white/15 text-white/90 text-sm font-medium">Cancel</button>
                                        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2">
                                            <Save size={16} />
                                            {editingId ? "Update" : "Save"} Injury
                                        </button>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. Injury Risk Indicator */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                    <HeartPulse size={16} className="text-primary" /> Injury risk indicator
                </h2>
                <p className="text-xs text-gray-500 mb-3">Based on recent fatigue, pain from performance logs, and injury history. Structured for future ML.</p>
                <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${risk.bg} ${risk.color}`}>
                    <AlertTriangle size={18} />
                    <span className="font-semibold">{risk.level} risk</span>
                </div>
            </section>

            {/* 6. Training load vs injury graph */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                    <TrendingUp size={16} /> Injury & pain trend
                </h2>
                <div className="h-48">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                                <Bar dataKey="injuries" name="Injuries" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="pain" name="Avg pain" fill="#f97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-sm">No injury data yet</div>
                    )}
                </div>
            </section>

            {/* 7. Preventive recommendations */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" /> Preventive recommendations
                </h2>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                        <Target size={14} className="shrink-0 mt-0.5 text-primary" />
                        Reduce training intensity for 5 days if fatigue remains high.
                    </li>
                    <li className="flex items-start gap-2">
                        <Activity size={14} className="shrink-0 mt-0.5 text-amber-500" />
                        Increase sleep duration to support recovery.
                    </li>
                    <li className="flex items-start gap-2">
                        <TrendingUp size={14} className="shrink-0 mt-0.5 text-emerald-500" />
                        Focus on hamstring strengthening to reduce recurrence risk.
                    </li>
                </ul>
            </section>

            {/* 8. Recovery milestones */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Recovery milestones
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { week: 1, label: "Pain reduced" },
                        { week: 2, label: "Mobility improved" },
                        { week: 3, label: "Light training started" },
                        { week: 4, label: "Full training resumed" }
                    ].map((m) => (
                        <div key={m.week} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Week {m.week}</p>
                            <p className="text-sm font-medium text-white/90 mt-1">{m.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Smart: Return-to-play readiness (placeholder) */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Return-to-play readiness</p>
                    <p className="text-2xl font-bold text-emerald-500 mt-1">78%</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Injury recurrence probability</p>
                    <p className="text-2xl font-bold text-white mt-1">12%</p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Overtraining warning</p>
                    <p className="text-sm font-medium text-amber-500 mt-1">{overtrainingWarning ? "Monitor load" : "None"}</p>
                </div>
            </section>

            {/* 4. Injury history table */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="p-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold text-white/95">Injury history</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <select className={inputClass + " w-32"} value={filterBodyPart} onChange={e => setFilterBodyPart(e.target.value)}>
                            <option value="">All body parts</option>
                            {BODY_PARTS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <select className={inputClass + " w-28"} value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)}>
                            <option value="">All severity</option>
                            {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select className={inputClass + " w-28"} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option value="">All status</option>
                            <option value="Active">Active</option>
                            <option value="Recovering">Recovering</option>
                            <option value="Recovered">Recovered</option>
                        </select>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Filter size={12} /> Filters</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Injury type</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Body part</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Days missed</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {filteredInjuries.map((inj) => {
                                const status = getStatus(inj);
                                const statusCls = status === "Recovered" ? "bg-emerald-500/10 text-emerald-500" : status === "Recovering" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500";
                                return (
                                    <tr key={inj.id} className="hover:bg-white/[0.02]">
                                        <td className="px-4 py-3 text-sm text-white/90">{inj.injuryType || "—"}</td>
                                        <td className="px-4 py-3 text-sm text-white/80">{inj.bodyPart || "—"}</td>
                                        <td className="px-4 py-3 text-sm text-white/80">{inj.injuryDate}</td>
                                        <td className="px-4 py-3 text-sm text-white/80">{inj.severity}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-medium ${statusCls}`}>{status}</span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-white/80">{getDaysMissed(inj)}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button type="button" onClick={() => openView(inj)} className="p-2 text-gray-500 hover:text-white rounded-lg" title="View"><Eye size={14} /></button>
                                                <button type="button" onClick={() => openEdit(inj)} className="p-2 text-gray-500 hover:text-white rounded-lg" title="Edit"><Pencil size={14} /></button>
                                                <button type="button" onClick={() => deleteInjury(inj.id)} className="p-2 text-gray-500 hover:text-red-400 rounded-lg" title="Delete"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredInjuries.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-500">
                                        No injuries recorded. Click “Report Injury” to add one.
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

export default InjuryRecovery;
