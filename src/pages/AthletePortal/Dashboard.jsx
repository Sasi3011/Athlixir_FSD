import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Trophy, Calendar, Activity, Award, TrendingUp, AlertTriangle,
    ChevronRight, MapPin, Pencil, Upload, BarChart3,
    Plus, ClipboardList, FileCheck, Sparkles
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
    { type: "achievement", text: "Added new achievement", sub: "State Championship - 2nd place", time: "2 days ago", icon: Award },
    { type: "event", text: "Registered for event", sub: "District Rifle Qualifiers", time: "1 week ago", icon: Calendar },
    { type: "profile", text: "Updated profile", sub: "Sport & location", time: "1 week ago", icon: Pencil },
];

const MOCK_LAST_5_PERFORMANCES = [
    { label: "Week 1", value: 72 },
    { label: "Week 2", value: 78 },
    { label: "Week 3", value: 75 },
    { label: "Week 4", value: 82 },
    { label: "Week 5", value: 85 }
];

const QUICK_ACTIONS = [
    { label: "Add Achievement", icon: Plus, href: "/athlete/profile", color: "text-primary" },
    { label: "Register for Event", icon: ClipboardList, href: "/athlete/events", color: "text-blue-500" },
    { label: "Upload Certificate", icon: Upload, href: "/athlete/profile", color: "text-amber-500" },
    { label: "Update Profile", icon: Pencil, href: "/athlete/profile", color: "text-emerald-500" },
    { label: "View Full Analytics", icon: BarChart3, href: "/athlete/performance", color: "text-purple-500" }
];

const cardClass = "rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/10";
const sectionTitleClass = "text-sm font-semibold text-white/95 mb-4";

const Dashboard = () => {
    const { user } = useAuth();
    const { useAthleteProfile } = useAthlete();
    const { profile } = useAthleteProfile(user?.uid);

    const firstName = profile?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || "Athlete";
    const completion = useMemo(() => getProfileCompletion(profile, user), [profile, user]);
    const greeting = getGreeting();

    const statCards = [
        { label: "Total Achievements", value: profile?.achievements?.length ?? 0, icon: Trophy, bg: "bg-amber-500/10", iconColor: "text-amber-500" },
        { label: "Upcoming Events", value: MOCK_UPCOMING_EVENTS.filter(e => e.status === "Registered").length + 2, icon: Calendar, bg: "bg-blue-500/10", iconColor: "text-blue-500" },
        { label: "Matches Played", value: "12", icon: Activity, bg: "bg-emerald-500/10", iconColor: "text-emerald-500" },
        { label: "Medals Won", value: "5", icon: Award, bg: "bg-primary/10", iconColor: "text-primary" },
        { label: "Performance Score", value: "82", icon: TrendingUp, bg: "bg-purple-500/10", iconColor: "text-purple-500" },
        { label: "Injury Risk", value: "Low", icon: AlertTriangle, bg: "bg-green-500/10", iconColor: "text-green-500" }
    ];

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            {/* 1. Welcome Header */}
            <section className={`${cardClass} p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6`}>
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/80 to-orange-500/80 p-[1.5px] shrink-0">
                        <div className="w-full h-full rounded-[14px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-primary/90">{firstName?.charAt(0) || "A"}</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            {greeting}, {firstName}!
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-2 flex-wrap">
                            {profile?.primarySport && <span>{profile.primarySport}</span>}
                            {profile?.category && <span className="text-gray-500">•</span>}
                            {profile?.category && <span>{profile.category}</span>}
                        </p>
                        {completion < 100 && (
                            <p className="text-xs text-amber-500/90 mt-2">
                                Profile {completion}% complete
                            </p>
                        )}
                    </div>
                </div>
                <Link
                    to="/athlete/profile"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0"
                >
                    <Pencil size={14} />
                    Edit Profile
                </Link>
            </section>

            {/* 2. Quick Stats Overview */}
            <section>
                <h2 className={sectionTitleClass}>Quick Stats</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {statCards.map((card, i) => (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`${cardClass} flex flex-col`}
                        >
                            <div className={`w-9 h-9 rounded-lg ${card.bg} ${card.iconColor} flex items-center justify-center mb-3`}>
                                <card.icon size={18} />
                            </div>
                            <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">{card.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. Performance Summary */}
            <section>
                <h2 className={sectionTitleClass}>Performance Summary</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="grid grid-cols-2 gap-4 lg:col-span-1">
                        <div className={`${cardClass}`}>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Goals / Runs / Points</p>
                            <p className="text-lg font-bold text-white mt-1">—</p>
                        </div>
                        <div className={`${cardClass}`}>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Win–Loss Ratio</p>
                            <p className="text-lg font-bold text-white mt-1">—</p>
                        </div>
                        <div className={`${cardClass} col-span-2`}>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Personal Best</p>
                            <p className="text-lg font-bold text-white mt-1">—</p>
                        </div>
                    </div>
                    <div className={`${cardClass} lg:col-span-2 min-h-[200px]`}>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-4">Last 5 performances</p>
                        <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={MOCK_LAST_5_PERFORMANCES}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                                    <XAxis dataKey="label" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
                                    <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                                    <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                                    <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316", r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Upcoming Events / Tournaments */}
            <section>
                <h2 className={sectionTitleClass}>Upcoming Events</h2>
                <div className="space-y-3">
                    {MOCK_UPCOMING_EVENTS.map((event) => (
                        <div key={event.id} className={`${cardClass} flex flex-wrap items-center justify-between gap-4`}>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-white truncate">{event.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2 flex-wrap">
                                    <Calendar size={12} />
                                    {event.date}
                                    <span className="text-gray-600">•</span>
                                    <MapPin size={12} />
                                    {event.location}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${event.status === "Registered" ? "bg-green-500/10 text-green-500" : "bg-white/10 text-gray-400"}`}>
                                    {event.status}
                                </span>
                                {event.status === "Open" && (
                                    <Link to="/athlete/events" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-semibold hover:bg-primary/30 transition-colors">
                                        Register
                                        <ChevronRight size={12} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. AI Insights */}
            <section>
                <h2 className={`${sectionTitleClass} flex items-center gap-2`}>
                    <Sparkles size={16} className="text-primary" />
                    AI Insights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className={`${cardClass}`}>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Performance Trend</p>
                        <p className="text-sm font-semibold text-emerald-500 mt-1 flex items-center gap-1.5">
                            <TrendingUp size={14} /> Improving
                        </p>
                    </div>
                    <div className={`${cardClass}`}>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Suggested Training Focus</p>
                        <p className="text-sm font-medium text-white/90 mt-1">Consistency & endurance</p>
                    </div>
                    <div className={`${cardClass}`}>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Injury Risk</p>
                        <p className="text-sm font-semibold text-green-500 mt-1 flex items-center gap-1.5">
                            <AlertTriangle size={14} /> Low
                        </p>
                    </div>
                    <div className={`${cardClass}`}>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Fitness Score</p>
                        <p className="text-lg font-bold text-white mt-1">82</p>
                    </div>
                </div>
            </section>

            {/* 6. Recent Activity Feed */}
            <section>
                <h2 className={sectionTitleClass}>Recent Activity</h2>
                <div className={`${cardClass} space-y-3`}>
                    {MOCK_ACTIVITY.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 py-2 border-b border-white/[0.04] last:border-0 last:pb-0 first:pt-0">
                            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-gray-400">
                                <item.icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white/90">{item.text}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                            </div>
                            <p className="text-[10px] text-gray-500 shrink-0">{item.time}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Quick Actions Panel */}
            <section>
                <h2 className={sectionTitleClass}>Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {QUICK_ACTIONS.map((action) => (
                        <Link
                            key={action.label}
                            to={action.href}
                            className={`${cardClass} flex flex-col items-center justify-center py-6 gap-3 group hover:bg-white/[0.04]`}
                        >
                            <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center ${action.color} group-hover:scale-105 transition-transform`}>
                                <action.icon size={20} />
                            </div>
                            <span className="text-xs font-medium text-white/90 text-center leading-tight">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
