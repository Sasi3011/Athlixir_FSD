import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Calendar, Clock, Save, X, Filter, Trash2, Pencil, Eye,
    BarChart3, TrendingUp, Upload, Sparkles, Target, Activity
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAthlete } from "../../context/AthleteContext";
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, BarChart, Bar, Cell
} from "recharts";

const ACTIVITY_TYPES = ["Match", "Practice", "Gym", "Trial"];
const RESULT_OPTIONS = ["Win", "Loss", "Draw"];

const getDefaultForm = () => ({
    date: new Date().toISOString().split("T")[0],
    activityType: "Practice",
    eventName: "",
    opponent: "",
    duration: "",
    // Cricket
    runs: "", ballsFaced: "", wickets: "", oversBowled: "", economyRate: "",
    // Football
    goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "",
    // Athletics / Generic
    eventType: "", time: "", position: "", personalBest: "No",
    // Physical & fitness
    weight: "", fatigueLevel: "", sleepHours: "", painLevel: "", heartRate: "", rpe: "",
    // Result
    result: "", positionAchieved: "", coachRating: "", selfRating: "", notes: "",
    // Uploads (store as file names or URLs)
    screenshotFile: "", scorecardFile: "", videoLink: ""
});

function calculatePerformanceScore(log) {
    const coach = Number(log.coachRating) || 0;
    const self = Number(log.selfRating) || 0;
    const fatigue = Number(log.fatigueLevel) || 0;
    const winBonus = log.result === "Win" ? 10 : log.result === "Draw" ? 5 : 0;
    let score = (coach + self) * 5 - fatigue * 2 + winBonus;
    if (log.result === "Loss") score = Math.max(0, score - 15);
    score = Math.max(0, Math.min(100, Math.round(score)));
    return score;
}

function getScoreBand(score) {
    if (score >= 80) return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (score >= 50) return { label: "Good", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { label: "Needs Improvement", color: "text-red-500", bg: "bg-red-500/10" };
}

function getKeyStat(log, sport) {
    if (sport === "Cricket") return log.runs ? `${log.runs} runs` : "—";
    if (sport === "Football") return log.goals != null ? `${log.goals}G ${log.assists || 0}A` : "—";
    if (sport === "Athletics" || log.eventType) return log.time ? `${log.time}` : (log.position ? `#${log.position}` : "—");
    return log.notes?.slice(0, 20) || "—";
}

const STATIC_LOGS = [
    { id: 1001, date: "2026-03-05", activityType: "Match", eventName: "Inter-District Championship", opponent: "Chennai Tigers", duration: "90", runs: "78", ballsFaced: "52", wickets: "2", oversBowled: "4", economyRate: "5.5", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "No", weight: "72", fatigueLevel: "5", sleepHours: "7.5", painLevel: "2", heartRate: "142", rpe: "7", result: "Win", positionAchieved: "1st", coachRating: "8", selfRating: "7", notes: "Great batting form. Need to work on bowling economy.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 85 },
    { id: 1002, date: "2026-03-03", activityType: "Practice", eventName: "Morning Nets Session", opponent: "", duration: "120", runs: "45", ballsFaced: "30", wickets: "", oversBowled: "", economyRate: "", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "No", weight: "72", fatigueLevel: "4", sleepHours: "8", painLevel: "1", heartRate: "128", rpe: "6", result: "", positionAchieved: "", coachRating: "7", selfRating: "7", notes: "Focused on cover drives and pull shots.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 70 },
    { id: 1003, date: "2026-02-28", activityType: "Gym", eventName: "Strength & Conditioning", opponent: "", duration: "75", runs: "", ballsFaced: "", wickets: "", oversBowled: "", economyRate: "", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "No", weight: "72.5", fatigueLevel: "6", sleepHours: "7", painLevel: "3", heartRate: "155", rpe: "8", result: "", positionAchieved: "", coachRating: "8", selfRating: "6", notes: "Heavy leg day. Squats PR improved.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 60 },
    { id: 1004, date: "2026-02-25", activityType: "Match", eventName: "Friendly vs. Coimbatore XI", opponent: "Coimbatore XI", duration: "180", runs: "34", ballsFaced: "28", wickets: "3", oversBowled: "6", economyRate: "4.2", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "No", weight: "72", fatigueLevel: "7", sleepHours: "6.5", painLevel: "4", heartRate: "148", rpe: "8", result: "Win", positionAchieved: "1st", coachRating: "9", selfRating: "8", notes: "Best bowling figures this season. Economy was excellent.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 90 },
    { id: 1005, date: "2026-02-22", activityType: "Trial", eventName: "State U-21 Selection Trials", opponent: "", duration: "240", runs: "56", ballsFaced: "42", wickets: "1", oversBowled: "3", economyRate: "6.0", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "Yes", weight: "71.5", fatigueLevel: "8", sleepHours: "6", painLevel: "3", heartRate: "150", rpe: "9", result: "Win", positionAchieved: "2nd", coachRating: "8", selfRating: "9", notes: "Selected for state camp! Personal best batting strike rate.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 88 },
    { id: 1006, date: "2026-02-18", activityType: "Practice", eventName: "Bowling Practice", opponent: "", duration: "90", runs: "", ballsFaced: "", wickets: "", oversBowled: "12", economyRate: "4.8", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "No", weight: "72", fatigueLevel: "5", sleepHours: "7.5", painLevel: "2", heartRate: "135", rpe: "6", result: "", positionAchieved: "", coachRating: "7", selfRating: "7", notes: "Working on seam movement and yorker length.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 65 },
    { id: 1007, date: "2026-02-15", activityType: "Match", eventName: "Weekend League - Round 4", opponent: "Salem Stars", duration: "150", runs: "12", ballsFaced: "18", wickets: "0", oversBowled: "2", economyRate: "8.5", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "No", weight: "72", fatigueLevel: "7", sleepHours: "5.5", painLevel: "5", heartRate: "152", rpe: "8", result: "Loss", positionAchieved: "", coachRating: "4", selfRating: "3", notes: "Poor performance. Got out early to a full toss. Need better discipline.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 22 },
    { id: 1008, date: "2026-02-10", activityType: "Gym", eventName: "Cardio & Core Session", opponent: "", duration: "60", runs: "", ballsFaced: "", wickets: "", oversBowled: "", economyRate: "", goals: "", assists: "", passAccuracy: "", minutesPlayed: "", yellowCards: "", redCards: "", eventType: "", time: "", position: "", personalBest: "No", weight: "71.8", fatigueLevel: "3", sleepHours: "8", painLevel: "1", heartRate: "140", rpe: "5", result: "", positionAchieved: "", coachRating: "7", selfRating: "8", notes: "Felt good. Improved plank hold to 3 minutes.", screenshotFile: "", scorecardFile: "", videoLink: "", performanceScore: 73 },
];

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";
const labelClass = "block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5";

const PerformanceLog = () => {
    const { user } = useAuth();
    const { useAthleteProfile } = useAthlete();
    const { profile } = useAthleteProfile(user?.uid);
    const primarySport = profile?.primarySport || "Athletics";

    const [logs, setLogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [viewingId, setViewingId] = useState(null);
    const [form, setForm] = useState(getDefaultForm());

    const [filterDateFrom, setFilterDateFrom] = useState("");
    const [filterDateTo, setFilterDateTo] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterMonth, setFilterMonth] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(`perf_logs_${user?.uid}`) || "[]");
        const data = stored.length > 0 ? stored : STATIC_LOGS;
        setLogs(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [user]);

    const filteredLogs = useMemo(() => {
        let list = [...logs];
        if (filterDateFrom) list = list.filter(l => l.date >= filterDateFrom);
        if (filterDateTo) list = list.filter(l => l.date <= filterDateTo);
        if (filterType) list = list.filter(l => l.activityType === filterType);
        if (filterMonth) {
            const [y, m] = filterMonth.split("-").map(Number);
            list = list.filter(l => {
                const d = new Date(l.date);
                return d.getFullYear() === y && d.getMonth() + 1 === m;
            });
        }
        return list;
    }, [logs, filterDateFrom, filterDateTo, filterType, filterMonth]);

    const openNew = () => {
        setEditingId(null);
        setViewingId(null);
        setForm(getDefaultForm());
        setShowModal(true);
    };

    const openEdit = (log) => {
        setEditingId(log.id);
        setViewingId(null);
        setForm({ ...getDefaultForm(), ...log });
        setShowModal(true);
    };

    const openView = (log) => {
        setViewingId(log.id);
        setEditingId(null);
        setForm({ ...getDefaultForm(), ...log });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setViewingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const score = calculatePerformanceScore(form);
        const entry = { ...form, performanceScore: score, id: editingId || Date.now() };
        let next;
        if (editingId) {
            next = logs.map(l => l.id === editingId ? entry : l);
        } else {
            next = [entry, ...logs];
        }
        setLogs(next.sort((a, b) => new Date(b.date) - new Date(a.date)));
        localStorage.setItem(`perf_logs_${user?.uid}`, JSON.stringify(next));
        closeModal();
    };

    const deleteLog = (id) => {
        const next = logs.filter(l => l.id !== id);
        setLogs(next);
        localStorage.setItem(`perf_logs_${user?.uid}`, JSON.stringify(next));
    };

    const isViewOnly = !!viewingId;
    const isCricket = primarySport === "Cricket";
    const isFootball = primarySport === "Football";
    const isAthletics = primarySport === "Athletics" || !isCricket && !isFootball;

    const last5ForChart = filteredLogs.slice(0, 5).reverse().map(l => ({
        label: l.date?.slice(5) || "",
        score: l.performanceScore ?? calculatePerformanceScore(l),
        fatigue: Number(l.fatigueLevel) || 0
    }));

    const monthlyData = useMemo(() => {
        const byMonth = {};
        filteredLogs.forEach(l => {
            const key = l.date?.slice(0, 7) || "—";
            if (!byMonth[key]) byMonth[key] = { month: key, avg: 0, count: 0, total: 0 };
            byMonth[key].total += l.performanceScore ?? calculatePerformanceScore(l);
            byMonth[key].count += 1;
        });
        return Object.values(byMonth).map(m => ({ ...m, avg: Math.round(m.total / m.count) })).sort((a, b) => a.month.localeCompare(b.month)).slice(-6);
    }, [filteredLogs]);

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-white/95">Performance Log</h1>
                <button
                    type="button"
                    onClick={openNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                    <Plus size={18} />
                    Log Performance
                </button>
            </div>

            {/* Modal: Add / Edit / View */}
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
                                    {viewingId ? "View Entry" : editingId ? "Edit Entry" : "Log Performance"}
                                </h2>
                                <button type="button" onClick={closeModal} className="p-2 text-gray-500 hover:text-white rounded-lg">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
                                {/* Basic Info */}
                                <section>
                                    <h3 className={labelClass}>Basic info</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Date</label>
                                            <input type="date" className={inputClass} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required readOnly={isViewOnly} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Type</label>
                                            <select className={inputClass} value={form.activityType} onChange={e => setForm(f => ({ ...f, activityType: e.target.value }))} disabled={isViewOnly}>
                                                {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className={labelClass}>Event / Tournament name</label>
                                            <input type="text" className={inputClass} value={form.eventName} onChange={e => setForm(f => ({ ...f, eventName: e.target.value }))} placeholder="Optional" readOnly={isViewOnly} />
                                        </div>
                                        {form.activityType === "Match" && (
                                            <div className="col-span-2">
                                                <label className={labelClass}>Opponent</label>
                                                <input type="text" className={inputClass} value={form.opponent} onChange={e => setForm(f => ({ ...f, opponent: e.target.value }))} readOnly={isViewOnly} />
                                            </div>
                                        )}
                                        <div>
                                            <label className={labelClass}>Duration (min)</label>
                                            <input type="number" className={inputClass} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="90" required readOnly={isViewOnly} />
                                        </div>
                                    </div>
                                </section>

                                {/* Sport-specific */}
                                <section>
                                    <h3 className={labelClass}>Sport-specific stats ({primarySport})</h3>
                                    {isCricket && (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            <div><label className={labelClass}>Runs</label><input type="number" className={inputClass} value={form.runs} onChange={e => setForm(f => ({ ...f, runs: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Balls faced</label><input type="number" className={inputClass} value={form.ballsFaced} onChange={e => setForm(f => ({ ...f, ballsFaced: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Strike rate</label><input type="text" className={inputClass} value={form.ballsFaced && form.runs ? ((Number(form.runs) / Number(form.ballsFaced)) * 100).toFixed(1) : ""} placeholder="Auto" readOnly /></div>
                                            <div><label className={labelClass}>Wickets</label><input type="number" className={inputClass} value={form.wickets} onChange={e => setForm(f => ({ ...f, wickets: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Overs bowled</label><input type="text" className={inputClass} value={form.oversBowled} onChange={e => setForm(f => ({ ...f, oversBowled: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Economy rate</label><input type="text" className={inputClass} value={form.economyRate} onChange={e => setForm(f => ({ ...f, economyRate: e.target.value }))} readOnly={isViewOnly} /></div>
                                        </div>
                                    )}
                                    {isFootball && (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            <div><label className={labelClass}>Goals</label><input type="number" className={inputClass} value={form.goals} onChange={e => setForm(f => ({ ...f, goals: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Assists</label><input type="number" className={inputClass} value={form.assists} onChange={e => setForm(f => ({ ...f, assists: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Pass accuracy %</label><input type="number" className={inputClass} value={form.passAccuracy} onChange={e => setForm(f => ({ ...f, passAccuracy: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Minutes played</label><input type="number" className={inputClass} value={form.minutesPlayed} onChange={e => setForm(f => ({ ...f, minutesPlayed: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Yellow cards</label><input type="number" className={inputClass} value={form.yellowCards} onChange={e => setForm(f => ({ ...f, yellowCards: e.target.value }))} readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Red cards</label><input type="number" className={inputClass} value={form.redCards} onChange={e => setForm(f => ({ ...f, redCards: e.target.value }))} readOnly={isViewOnly} /></div>
                                        </div>
                                    )}
                                    {(isAthletics || (!isCricket && !isFootball)) && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className={labelClass}>Event type</label><input type="text" className={inputClass} value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} placeholder="e.g. 100m, 200m" readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Time / Score</label><input type="text" className={inputClass} value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} placeholder="e.g. 10.9s" readOnly={isViewOnly} /></div>
                                            <div><label className={labelClass}>Position</label><input type="text" className={inputClass} value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} placeholder="1st, 2nd…" readOnly={isViewOnly} /></div>
                                            <div>
                                                <label className={labelClass}>Personal best?</label>
                                                <select className={inputClass} value={form.personalBest} onChange={e => setForm(f => ({ ...f, personalBest: e.target.value }))} disabled={isViewOnly}>
                                                    <option value="Yes">Yes</option><option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </section>

                                {/* Physical & fitness */}
                                <section>
                                    <h3 className={labelClass}>Physical & fitness (for ML)</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        <div><label className={labelClass}>Weight (kg)</label><input type="number" className={inputClass} value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} placeholder="Optional" readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Fatigue (1–10)</label><input type="number" min={1} max={10} className={inputClass} value={form.fatigueLevel} onChange={e => setForm(f => ({ ...f, fatigueLevel: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Sleep (hours)</label><input type="number" step={0.5} className={inputClass} value={form.sleepHours} onChange={e => setForm(f => ({ ...f, sleepHours: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Pain (0–10)</label><input type="number" min={0} max={10} className={inputClass} value={form.painLevel} onChange={e => setForm(f => ({ ...f, painLevel: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Heart rate</label><input type="number" className={inputClass} value={form.heartRate} onChange={e => setForm(f => ({ ...f, heartRate: e.target.value }))} placeholder="Optional" readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>RPE</label><input type="number" className={inputClass} value={form.rpe} onChange={e => setForm(f => ({ ...f, rpe: e.target.value }))} placeholder="Rate of exertion" readOnly={isViewOnly} /></div>
                                    </div>
                                </section>

                                {/* Result summary */}
                                <section>
                                    <h3 className={labelClass}>Result summary</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Result</label>
                                            <select className={inputClass} value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))} disabled={isViewOnly}>
                                                <option value="">—</option>
                                                {RESULT_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                        </div>
                                        <div><label className={labelClass}>Position achieved</label><input type="text" className={inputClass} value={form.positionAchieved} onChange={e => setForm(f => ({ ...f, positionAchieved: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Coach rating (1–10)</label><input type="number" min={1} max={10} className={inputClass} value={form.coachRating} onChange={e => setForm(f => ({ ...f, coachRating: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div><label className={labelClass}>Self rating (1–10)</label><input type="number" min={1} max={10} className={inputClass} value={form.selfRating} onChange={e => setForm(f => ({ ...f, selfRating: e.target.value }))} readOnly={isViewOnly} /></div>
                                        <div className="col-span-2">
                                            <label className={labelClass}>Notes</label>
                                            <textarea className={inputClass + " min-h-[80px]"} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} readOnly={isViewOnly} />
                                        </div>
                                    </div>
                                </section>

                                {/* Uploads */}
                                <section>
                                    <h3 className={labelClass}>Uploads</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className={labelClass}>Match screenshot</label>
                                            {isViewOnly ? (
                                                <p className="text-sm text-white/80 py-2">{form.screenshotFile || "—"}</p>
                                            ) : (
                                                <>
                                                    <input type="file" className={inputClass} onChange={e => setForm(f => ({ ...f, screenshotFile: e.target.files?.[0]?.name || "" }))} />
                                                    {form.screenshotFile && <p className="text-xs text-gray-500 mt-1 truncate">{form.screenshotFile}</p>}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Scorecard</label>
                                            {isViewOnly ? (
                                                <p className="text-sm text-white/80 py-2">{form.scorecardFile || "—"}</p>
                                            ) : (
                                                <>
                                                    <input type="file" className={inputClass} onChange={e => setForm(f => ({ ...f, scorecardFile: e.target.files?.[0]?.name || "" }))} />
                                                    {form.scorecardFile && <p className="text-xs text-gray-500 mt-1 truncate">{form.scorecardFile}</p>}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Video link</label>
                                            <input type="url" className={inputClass} value={form.videoLink} onChange={e => setForm(f => ({ ...f, videoLink: e.target.value }))} placeholder="URL" readOnly={isViewOnly} />
                                        </div>
                                    </div>
                                </section>

                                {!isViewOnly && (
                                    <div className="flex gap-3 pt-2">
                                        <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-lg border border-white/15 text-white/90 text-sm font-medium">Cancel</button>
                                        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2">
                                            <Save size={16} />
                                            {editingId ? "Update" : "Save"} Entry
                                        </button>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Performance score formula note + Graphs */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                        <TrendingUp size={16} /> Performance trend (last 5)
                    </h2>
                    <div className="h-44">
                        {last5ForChart.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={last5ForChart}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                                    <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                    <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                                    <Line type="monotone" dataKey="score" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316", r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">No data yet</div>
                        )}
                    </div>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                        <Activity size={16} /> Fatigue vs performance
                    </h2>
                    <div className="h-44">
                        {last5ForChart.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={last5ForChart}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                                    <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis yAxisId="left" dataKey="score" hide />
                                    <YAxis yAxisId="right" dataKey="fatigue" orientation="right" domain={[0, 10]} tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                    <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                                    <Line yAxisId="left" type="monotone" dataKey="score" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Score" />
                                    <Line yAxisId="right" type="monotone" dataKey="fatigue" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} name="Fatigue" />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-500 text-sm">No data yet</div>
                        )}
                    </div>
                </div>
            </section>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                    <BarChart3 size={16} /> Monthly improvement
                </h2>
                <div className="h-44">
                    {monthlyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                                <Bar dataKey="avg" fill="#f97316" radius={[4, 4, 0, 0]}>
                                    {monthlyData.map((_, i) => (
                                        <Cell key={i} fill={i === monthlyData.length - 1 ? "#f97316" : "rgba(249,115,22,0.5)"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 text-sm">No data yet</div>
                    )}
                </div>
            </div>

            {/* AI Insights */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" /> AI Insights
                </h2>
                <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                        <Target size={14} className="shrink-0 mt-0.5 text-primary" />
                        Your sprint speed improved 4% compared to last month.
                    </li>
                    <li className="flex items-start gap-2">
                        <Activity size={14} className="shrink-0 mt-0.5 text-amber-500" />
                        High fatigue levels detected in last 3 sessions.
                    </li>
                    <li className="flex items-start gap-2">
                        <TrendingUp size={14} className="shrink-0 mt-0.5 text-emerald-500" />
                        Risk of hamstring injury currently low; maintain recovery habits.
                    </li>
                </ul>
            </section>

            {/* History table + filters */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="p-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold text-white/95">Performance history</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <input type="date" className={inputClass + " w-36"} value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} placeholder="From" />
                        <input type="date" className={inputClass + " w-36"} value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} placeholder="To" />
                        <select className={inputClass + " w-32"} value={filterType} onChange={e => setFilterType(e.target.value)}>
                            <option value="">All types</option>
                            {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <input type="month" className={inputClass + " w-36"} value={filterMonth} onChange={e => setFilterMonth(e.target.value)} />
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Filter size={12} /> Filters
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Key stat</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {filteredLogs.map((log) => {
                                const score = log.performanceScore ?? calculatePerformanceScore(log);
                                const band = getScoreBand(score);
                                return (
                                    <tr key={log.id} className="hover:bg-white/[0.02]">
                                        <td className="px-4 py-3 text-sm text-white/90">{log.date}</td>
                                        <td className="px-4 py-3 text-sm text-white/80">{log.activityType}</td>
                                        <td className="px-4 py-3 text-sm text-white/80">{getKeyStat(log, primarySport)}</td>
                                        <td className="px-4 py-3 text-sm text-white/80">{log.result || "—"}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium ${band.bg} ${band.color}`}>
                                                {score} – {band.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button type="button" onClick={() => openView(log)} className="p-2 text-gray-500 hover:text-white rounded-lg" title="View"><Eye size={14} /></button>
                                                <button type="button" onClick={() => openEdit(log)} className="p-2 text-gray-500 hover:text-white rounded-lg" title="Edit"><Pencil size={14} /></button>
                                                <button type="button" onClick={() => deleteLog(log.id)} className="p-2 text-gray-500 hover:text-red-400 rounded-lg" title="Delete"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredLogs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">
                                        No entries yet. Click “Log Performance” to add one.
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
