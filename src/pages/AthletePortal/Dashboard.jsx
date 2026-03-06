import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Trophy, Calendar, Activity, Award, TrendingUp, AlertTriangle,
    ChevronRight, MapPin, Pencil, Upload, BarChart3,
    Plus, ClipboardList, FileCheck, Sparkles, ArrowUpRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAthlete } from "../../context/AthleteContext";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
};

const getProfileCompletion = (profile, user) => {
    const fields = [
        profile?.name || user?.displayName,
        profile?.primarySport,
        profile?.dateOfBirth,
        profile?.gender,
        profile?.state,
        profile?.district,
        profile?.height,
        profile?.weight,
        profile?.currentLevel,
        profile?.currentAcademy
    ];
    const filled = fields.filter(Boolean).length;
    return Math.min(100, Math.round((filled / fields.length) * 100));
};

const MOCK_UPCOMING_EVENTS = [
    { id: 1, name: "State Shooting Championship", date: "Mar 15, 2025", location: "Chennai", status: "Registered" },
    { id: 2, name: "District Rifle Qualifiers", date: "Mar 22, 2025", location: "Coimbatore", status: "Open" },
    { id: 3, name: "National Junior Trials", date: "Apr 5, 2025", location: "Pune", status: "Open" }
];

const MOCK_ACTIVITY = [
    { type: "achievement", text: "Added new achievement", sub: "State Championship - 2nd place", time: "2 days ago", icon: Award, color: "bg-amber-500/10 text-amber-500" },
    { type: "event", text: "Registered for event", sub: "District Rifle Qualifiers", time: "1 week ago", icon: Calendar, color: "bg-blue-500/10 text-blue-500" },
    { type: "profile", text: "Updated profile", sub: "Sport & location details", time: "1 week ago", icon: Pencil, color: "bg-emerald-500/10 text-emerald-500" },
];

const MOCK_LAST_5_PERFORMANCES = [
    { label: "Wk 1", value: 72 },
    { label: "Wk 2", value: 78 },
    { label: "Wk 3", value: 75 },
    { label: "Wk 4", value: 82 },
    { label: "Wk 5", value: 85 }
];

const QUICK_ACTIONS = [
    { label: "Add Achievement", icon: Plus, href: "/athlete/profile", color: "text-primary bg-primary/10" },
    { label: "Register for Event", icon: ClipboardList, href: "/athlete/events", color: "text-blue-500 bg-blue-500/10" },
    { label: "Upload Certificate", icon: Upload, href: "/athlete/profile", color: "text-amber-500 bg-amber-500/10" },
    { label: "Update Profile", icon: Pencil, href: "/athlete/profile", color: "text-emerald-500 bg-emerald-500/10" },
    { label: "View Analytics", icon: BarChart3, href: "/athlete/performance", color: "text-purple-500 bg-purple-500/10" }
];

const cardClass = "rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors hover:border-white/10";
const sectionTitleClass = "text-sm font-semibold text-white/95 mb-4";

const Dashboard = () => {
    const { user } = useAuth();
    const { useAthleteProfile } = useAthlete();
    const { profile } = useAthleteProfile(user?.uid);

    const firstName = profile?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || "Athlete";
    const completion = useMemo(() => getProfileCompletion(profile, user), [profile, user]);
    const greeting = getGreeting();
    const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

    const statCards = [
        { label: "Total Achievements", value: profile?.achievements?.length ?? 0, icon: Trophy, bg: "bg-amber-500/10", iconColor: "text-amber-500", trend: "+1 this month" },
        { label: "Upcoming Events", value: 3, icon: Calendar, bg: "bg-blue-500/10", iconColor: "text-blue-500", trend: "2 registered" },
        { label: "Matches Played", value: 12, icon: Activity, bg: "bg-emerald-500/10", iconColor: "text-emerald-500", trend: "+3 this season" },
        { label: "Medals Won", value: 5, icon: Award, bg: "bg-primary/10", iconColor: "text-primary", trend: "2 gold" },
        { label: "Performance Score", value: 82, icon: TrendingUp, bg: "bg-purple-500/10", iconColor: "text-purple-500", trend: "↑ +3 pts" },
        { label: "Injury Risk", value: "Low", icon: AlertTriangle, bg: "bg-green-500/10", iconColor: "text-green-500", trend: "All clear" }
    ];

    return (
        <div className="space-y-6 pb-12 max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                    <p className="text-xs text-gray-500 mb-1">{greeting} · {today}</p>
                    <h1 className="text-2xl font-bold text-white/95">
                        Welcome back, <span className="text-primary">{firstName}</span>
                    </h1>
                    {profile?.primarySport && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-gray-300">{profile.primarySport}</span>
                            {profile?.category && <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-gray-300">{profile.category}</span>}
                        </div>
                    )}
                </div>
                {completion < 100 && (
                    <Link
                        to="/athlete/profile"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 transition-colors group"
                    >
                        <div className="w-28 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${completion}%` }} />
                        </div>
                        <span className="text-xs font-medium text-amber-500 whitespace-nowrap flex items-center gap-1">
                            {completion}% complete <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                    </Link>
                )}
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`${cardClass} p-4 flex flex-col`}
                    >
                        <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.iconColor} flex items-center justify-center mb-3 shrink-0`}>
                            <card.icon size={15} />
                        </div>
                        <p className="text-2xl font-bold text-white tracking-tight leading-none">{card.value}</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-1.5 leading-tight">{card.label}</p>
                        <p className="text-[10px] text-gray-600 mt-1.5">{card.trend}</p>
                    </motion.div>
                ))}
            </div>

            {/* Performance Chart + AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chart — 2 cols */}
                <div className={`${cardClass} lg:col-span-2 p-5`}>
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <p className="text-sm font-semibold text-white/95">Performance Trend</p>
                            <p className="text-xs text-gray-500 mt-0.5">Last 5 weeks</p>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded-lg">
                            <TrendingUp size={11} /> +13 pts
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {[
                            { label: "Best Score", value: "85" },
                            { label: "Avg. Score", value: "78.4" },
                            { label: "Win Rate", value: "67%" }
                        ].map((s) => (
                            <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3">
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{s.label}</p>
                                <p className="text-xl font-bold text-white mt-0.5">{s.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="h-36 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOCK_LAST_5_PERFORMANCES}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                                <Tooltip
                                    contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 12, padding: "6px 12px" }}
                                    itemStyle={{ color: "#f97316" }}
                                    cursor={{ stroke: "rgba(255,255,255,0.05)" }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2.5} dot={{ fill: "#f97316", r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Insights — 1 col */}
                <div className={`${cardClass} p-5 flex flex-col`}>
                    <div className="flex items-center gap-2 mb-5">
                        <Sparkles size={15} className="text-primary" />
                        <p className="text-sm font-semibold text-white/95">AI Insights</p>
                    </div>
                    <div className="space-y-2.5 flex-1">
                        {[
                            { label: "Performance Trend", value: "Improving", color: "text-emerald-500", icon: TrendingUp },
                            { label: "Suggested Focus", value: "Consistency & endurance", color: "text-white/90", icon: FileCheck },
                            { label: "Injury Risk", value: "Low", color: "text-green-500", icon: AlertTriangle },
                            { label: "Fitness Score", value: "82 / 100", color: "text-primary", icon: BarChart3 },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                                <div className="p-1.5 rounded-lg bg-white/[0.06] text-gray-400 shrink-0">
                                    <item.icon size={12} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
                                    <p className={`text-xs font-semibold mt-0.5 ${item.color}`}>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/athlete/performance" className="mt-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-gray-400 hover:text-white hover:border-white/10 transition-colors">
                        View full analytics <ChevronRight size={13} />
                    </Link>
                </div>
            </div>

            {/* Upcoming Events + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Events */}
                <div className={`${cardClass} p-5`}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-white/95">Upcoming Events</p>
                        <Link to="/athlete/events" className="text-[10px] font-medium text-primary hover:underline flex items-center gap-0.5">
                            View all <ChevronRight size={12} />
                        </Link>
                    </div>
                    <div className="space-y-2.5">
                        {MOCK_UPCOMING_EVENTS.map((event) => (
                            <div key={event.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                                <div className={`w-1 self-stretch rounded-full shrink-0 ${event.status === "Registered" ? "bg-green-500" : "bg-primary/60"}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white/90 truncate">{event.name}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1.5">
                                        <Calendar size={9} />{event.date}
                                        <span className="text-gray-700">·</span>
                                        <MapPin size={9} />{event.location}
                                    </p>
                                </div>
                                <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg shrink-0 ${event.status === "Registered" ? "bg-green-500/10 text-green-500" : "bg-white/[0.06] text-gray-400"}`}>
                                    {event.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className={`${cardClass} p-5`}>
                    <p className="text-sm font-semibold text-white/95 mb-4">Recent Activity</p>
                    <div className="space-y-2.5">
                        {MOCK_ACTIVITY.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                                    <item.icon size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-white/90">{item.text}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">{item.sub}</p>
                                </div>
                                <p className="text-[10px] text-gray-600 shrink-0">{item.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <p className="text-sm font-semibold text-white/95 mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {QUICK_ACTIONS.map((action) => (
                        <Link
                            key={action.label}
                            to={action.href}
                            className={`${cardClass} p-4 flex flex-col items-center justify-center gap-2.5 group hover:bg-white/[0.04]`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-105 transition-transform`}>
                                <action.icon size={18} />
                            </div>
                            <span className="text-xs font-medium text-white/80 text-center leading-tight">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
