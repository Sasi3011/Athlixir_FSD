import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, MapPin, Calendar, ArrowUpRight, Bookmark, BookmarkCheck,
    Filter, Search, X, ExternalLink, Clock, FileText, User, Send,
    Bell, CalendarPlus, Target
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAthlete } from "../../context/AthleteContext";
import { SPORTS_LIST, SPORT_CATEGORIES } from "../../constants/sports";
import { INDIAN_STATES, getDistrictsForState } from "../../constants/location";

const OPPORTUNITY_TYPES = ["Trials", "Scholarship", "Sponsorship", "Club Selection", "Government Scheme"];
const LOCATION_SCOPES = ["National", "State", "District"];
const DEADLINE_FILTERS = ["Upcoming", "Expired", "All"];
const AGE_GROUPS = ["", "Under 18", "Under 21", "Senior"];
const APPLICATION_STATUSES = ["Pending", "Under Review", "Selected", "Rejected"];

const MOCK_OPPORTUNITIES = [
    { id: 1, organization: "Sports Authority of India", title: "National Shooting Trials U-21", type: "Trials", sport: "Shooting", category: "Rifle", locationScope: "National", state: "Tamil Nadu", district: "Chennai", deadline: "2025-04-15", eligibility: "State-level ranking, Under 21", ageLimit: "Under 21", prize: "Selection to National Camp", description: "Official trials for U-21 rifle shooters. Top performers will be selected for national camp.", requiredDocs: "ID proof, Ranking certificate, Medical fitness", selectionProcess: "Written test + Practical assessment", venue: "Dr. Karni Singh Shooting Range, Delhi", contact: "sai-shooting@gov.in", officialLink: "https://example.com", fundingAmount: null },
    { id: 2, organization: "Tamil Nadu Sports Development Corp", title: "TN Cricket Scholarship", type: "Scholarship", sport: "Cricket", category: "Batting", locationScope: "State", state: "Tamil Nadu", district: null, deadline: "2025-05-01", eligibility: "District-level players, Under 18", ageLimit: "Under 18", prize: "₹50,000 per year", description: "Merit-cum-means scholarship for talented cricketers from Tamil Nadu.", requiredDocs: "School/College proof, Performance certificate", selectionProcess: "Application review + Interview", venue: "N/A (Remote)", contact: "tnsdc@tn.gov.in", officialLink: "https://example.com", fundingAmount: 50000 },
    { id: 3, organization: "Elite Sports Foundation", title: "Youth Football Sponsorship", type: "Sponsorship", sport: "Football", category: "Forward", locationScope: "National", state: null, district: null, deadline: "2025-06-30", eligibility: "State representation, Age 16–21", ageLimit: "16-21", prize: "₹2,00,000 sponsorship", description: "Full sponsorship for equipment, travel and coaching for one season.", requiredDocs: "Resume, Performance video, Coach recommendation", selectionProcess: "Application + Video assessment", venue: "N/A", contact: "sponsor@elite.org", officialLink: "https://example.com", fundingAmount: 200000, sponsorName: "Elite Sports Foundation", sponsorProfile: "Leading non-profit supporting youth football." },
    { id: 4, organization: "Coimbatore District Cricket Association", title: "District Club Selection Trials", type: "Club Selection", sport: "Cricket", category: "All-Rounder", locationScope: "District", state: "Tamil Nadu", district: "Coimbatore", deadline: "2025-03-20", eligibility: "Resident of district, Registered player", ageLimit: "Open", prize: "Club contract", description: "Open trials for district league clubs. Selected players get one-year contract.", requiredDocs: "Address proof, Player registration", selectionProcess: "Two-day trials", venue: "Coimbatore Cricket Ground", contact: "cdca@coimbatore.in", officialLink: "https://example.com", fundingAmount: null },
    { id: 5, organization: "Ministry of Youth Affairs", title: "Khelo India Talent Search", type: "Government Scheme", sport: "Athletics", category: "Sprints", locationScope: "National", state: null, district: null, deadline: "2025-07-15", eligibility: "School/College athlete, National ranking", ageLimit: "Under 21", prize: "Stipend + Training support", description: "Central scheme for identification and support of young talent.", requiredDocs: "Aadhaar, School ID, Performance records", selectionProcess: "State nomination + Central selection", venue: "Multiple centres", contact: "kheloindia@gov.in", officialLink: "https://example.com", fundingAmount: null },
    { id: 6, organization: "Tamil Nadu Rifle Association", title: "State Shooting Championship Qualifiers", type: "Trials", sport: "Shooting", category: "Rifle", locationScope: "State", state: "Tamil Nadu", district: "Coimbatore", deadline: "2025-02-28", eligibility: "District qualifier or direct entry", ageLimit: "Open", prize: "State team selection", description: "Qualification trials for State Shooting Championship.", requiredDocs: "Registration, Previous scores", selectionProcess: "Ranking round + Finals", venue: "Coimbatore Rifle Club", contact: "tnra@tn.in", officialLink: "https://example.com", fundingAmount: null },
    { id: 7, organization: "Reliance Foundation", title: "Young Champs Football Scholarship", type: "Scholarship", sport: "Football", category: "Midfielder", locationScope: "National", state: null, district: null, deadline: "2026-06-15", eligibility: "State-level representation, Age 14–19", ageLimit: "Under 21", prize: "₹1,00,000 annual + coaching", description: "Full scholarship covering training fees, equipment, travel and nutrition for talented young footballers across India.", requiredDocs: "ID proof, Performance CV, Coach recommendation letter", selectionProcess: "Online screening + Regional trials + Final selection camp", venue: "Reliance Sports Complex, Navi Mumbai", contact: "youngchamps@reliancefoundation.org", officialLink: "https://example.com", fundingAmount: 100000 },
    { id: 8, organization: "Indian Olympic Association", title: "National Athletics Selection Trials - 200m", type: "Trials", sport: "Athletics", category: "Sprints", locationScope: "National", state: null, district: null, deadline: "2026-07-01", eligibility: "National-level ranking, Under 23", ageLimit: "Under 21", prize: "National team selection + Monthly stipend", description: "Official selection trials for the Indian Athletics team. Top 3 finishers qualify for international meets.", requiredDocs: "Aadhaar, Athletics Federation ID, Recent timing certificates", selectionProcess: "Heats + Semi-finals + Finals over 3 days", venue: "Jawaharlal Nehru Stadium, New Delhi", contact: "athletics@olympic.ind.in", officialLink: "https://example.com", fundingAmount: null },
    { id: 9, organization: "TNCA - Tamil Nadu Cricket Association", title: "Senior State Cricket Team Trials", type: "Trials", sport: "Cricket", category: "All-Rounder", locationScope: "State", state: "Tamil Nadu", district: "Chennai", deadline: "2026-05-20", eligibility: "District-level representation, Age 18+", ageLimit: "Senior", prize: "State team selection for Ranji Trophy", description: "Open selection trials for Tamil Nadu senior cricket team for the upcoming Ranji Trophy season.", requiredDocs: "BCCI player registration, District performance records, Fitness certificate", selectionProcess: "2-day match simulation + Skills assessment", venue: "MA Chidambaram Stadium, Chennai", contact: "trials@tnca.org.in", officialLink: "https://example.com", fundingAmount: null },
    { id: 10, organization: "Tata Trusts Sports Program", title: "Rural Athlete Support Scheme", type: "Government Scheme", sport: "Athletics", category: "Sprints", locationScope: "National", state: null, district: null, deadline: "2026-08-31", eligibility: "Rural background, District-level participation, Family income < ₹5L", ageLimit: "Under 21", prize: "₹75,000 grant + Equipment kit", description: "Financial support program for promising athletes from rural areas. Covers training equipment, nutrition supplements, and travel to competitions.", requiredDocs: "Aadhaar, Income certificate, Domicile certificate, Sports participation proof", selectionProcess: "Application review + District verification + Merit selection", venue: "N/A (Remote application)", contact: "sports@tatatrusts.org", officialLink: "https://example.com", fundingAmount: 75000 },
    { id: 11, organization: "Decathlon India", title: "Next Gen Athlete Sponsorship", type: "Sponsorship", sport: "Football", category: "Forward", locationScope: "National", state: null, district: null, deadline: "2026-09-15", eligibility: "Social media presence, State-level or above", ageLimit: "Under 21", prize: "₹3,00,000 + Full equipment sponsorship", description: "Brand sponsorship for emerging athletes. Includes full gear, social media promotion, and annual sponsorship fee.", requiredDocs: "Performance resume, Social media handles, Short introduction video", selectionProcess: "Online application + Video review + In-person audition", venue: "Decathlon HQ, Bengaluru", contact: "athlete-program@decathlon.in", officialLink: "https://example.com", fundingAmount: 300000, sponsorName: "Decathlon India", sponsorProfile: "World's largest sporting goods retailer supporting grassroots athletes in India." },
    { id: 12, organization: "Madurai District Sports Council", title: "District-Level Cricket Club Selection", type: "Club Selection", sport: "Cricket", category: "Batting", locationScope: "District", state: "Tamil Nadu", district: "Madurai", deadline: "2026-04-10", eligibility: "Resident of Madurai district, Age 16+", ageLimit: "Under 21", prize: "Club contract + Monthly allowance", description: "Open trials for premier division cricket clubs in Madurai district. Selected players receive a one-year contract.", requiredDocs: "Address proof, Age certificate, Player registration", selectionProcess: "One-day batting and bowling assessment", venue: "Madurai Sports Ground", contact: "mdsc@madurai.tn.gov.in", officialLink: "https://example.com", fundingAmount: null },
];

const STORAGE_KEYS = {
    bookmarks: (uid) => `opp_bookmarks_${uid}`,
    applications: (uid) => `opp_applications_${uid}`,
    reminders: (uid) => `opp_reminders_${uid}`,
};

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";
const labelClass = "block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5";

function getTypeColor(type) {
    const map = { Trials: "bg-blue-500/10 text-blue-500", Scholarship: "bg-purple-500/10 text-purple-500", Sponsorship: "bg-emerald-500/10 text-emerald-500", "Club Selection": "bg-amber-500/10 text-amber-500", "Government Scheme": "bg-sky-500/10 text-sky-500" };
    return map[type] || "bg-gray-500/10 text-gray-500";
}

function daysUntil(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}

const Opportunities = () => {
    const { user } = useAuth();
    const { useAthleteProfile } = useAthlete();
    const { profile } = useAthleteProfile(user?.uid);

    const [tab, setTab] = useState("all");
    const [sportFilter, setSportFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [locationScope, setLocationScope] = useState("");
    const [stateFilter, setStateFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [deadlineFilter, setDeadlineFilter] = useState("Upcoming");
    const [ageGroupFilter, setAgeGroupFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [bookmarks, setBookmarks] = useState([]);
    const [applications, setApplications] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [detailId, setDetailId] = useState(null);

    useEffect(() => {
        const uid = user?.uid;
        if (!uid) return;
        setBookmarks(JSON.parse(localStorage.getItem(STORAGE_KEYS.bookmarks(uid)) || "[]"));
        setApplications(JSON.parse(localStorage.getItem(STORAGE_KEYS.applications(uid)) || "[]"));
        setReminders(JSON.parse(localStorage.getItem(STORAGE_KEYS.reminders(uid)) || "[]"));
    }, [user?.uid]);

    const categories = sportFilter ? (SPORT_CATEGORIES[sportFilter] || ["Other"]) : [];
    const districts = getDistrictsForState(stateFilter);

    const filteredOpportunities = useMemo(() => {
        let list = MOCK_OPPORTUNITIES.filter((opp) => {
            if (sportFilter && opp.sport !== sportFilter) return false;
            if (categoryFilter && opp.category !== categoryFilter) return false;
            if (typeFilter && opp.type !== typeFilter) return false;
            if (locationScope && opp.locationScope !== locationScope) return false;
            if (stateFilter && opp.state !== stateFilter) return false;
            if (districtFilter && opp.district !== districtFilter) return false;
            if (ageGroupFilter && opp.ageLimit !== ageGroupFilter && !String(opp.ageLimit || "").toLowerCase().includes(ageGroupFilter.toLowerCase())) return false;
            const days = daysUntil(opp.deadline);
            if (deadlineFilter === "Upcoming" && days < 0) return false;
            if (deadlineFilter === "Expired" && days >= 0) return false;
            if (searchQuery && !(opp.title + " " + opp.organization).toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
        return list;
    }, [sportFilter, categoryFilter, typeFilter, locationScope, stateFilter, districtFilter, deadlineFilter, ageGroupFilter, searchQuery]);

    const recommended = useMemo(() => {
        const sport = profile?.primarySport;
        const state = profile?.state;
        const category = profile?.category;
        return MOCK_OPPORTUNITIES.filter((opp) => {
            if (sport && opp.sport !== sport) return false;
            if (state && opp.state && opp.state !== state) return false;
            if (category && opp.category !== category) return false;
            return daysUntil(opp.deadline) >= 0;
        }).slice(0, 3);
    }, [profile?.primarySport, profile?.state, profile?.category]);

    const activeCount = filteredOpportunities.filter((o) => daysUntil(o.deadline) >= 0).length;

    const toggleBookmark = (id) => {
        const uid = user?.uid;
        if (!uid) return;
        const next = bookmarks.includes(id) ? bookmarks.filter((b) => b !== id) : [...bookmarks, id];
        setBookmarks(next);
        localStorage.setItem(STORAGE_KEYS.bookmarks(uid), JSON.stringify(next));
    };

    const addReminder = (id) => {
        const uid = user?.uid;
        if (!uid) return;
        if (reminders.includes(id)) return;
        const next = [...reminders, id];
        setReminders(next);
        localStorage.setItem(STORAGE_KEYS.reminders(uid), JSON.stringify(next));
    };

    const applyForOpportunity = (opp) => {
        const uid = user?.uid;
        if (!uid) return;
        const existing = applications.find((a) => a.opportunityId === opp.id);
        if (existing) return;
        const newApp = { opportunityId: opp.id, opportunityTitle: opp.title, status: "Pending", appliedAt: new Date().toISOString().split("T")[0] };
        const next = [newApp, ...applications];
        setApplications(next);
        localStorage.setItem(STORAGE_KEYS.applications(uid), JSON.stringify(next));
    };

    const detailOpp = detailId ? MOCK_OPPORTUNITIES.find((o) => o.id === detailId) : null;
    const appliedIds = applications.map((a) => a.opportunityId);

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            {/* 1. Page header */}
            <header>
                <h1 className="text-2xl font-bold text-white/95 flex items-center gap-2">
                    <Target size={28} className="text-primary" />
                    Opportunities
                </h1>
                <p className="text-sm text-gray-500 mt-1">Discover trials, scholarships and growth programs</p>
                {activeCount > 0 && <p className="text-xs text-gray-500 mt-0.5">{activeCount} active opportunities</p>}
            </header>

            {/* Tabs: All | My Applications */}
            <div className="flex gap-2 border-b border-white/10">
                <button type="button" onClick={() => setTab("all")} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${tab === "all" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}>
                    All opportunities
                </button>
                <button type="button" onClick={() => setTab("applications")} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${tab === "applications" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}>
                    My applications
                </button>
            </div>

            {tab === "all" && (
                <>
                    {/* 2. Filters */}
                    <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                        <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2"><Filter size={16} /> Filters</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                            <div>
                                <label className={labelClass}>Sport</label>
                                <select className={inputClass} value={sportFilter} onChange={(e) => { setSportFilter(e.target.value); setCategoryFilter(""); }}>
                                    <option value="">All</option>
                                    {SPORTS_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Category</label>
                                <select className={inputClass} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} disabled={!sportFilter}>
                                    <option value="">All</option>
                                    {(categories || []).map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Type</label>
                                <select className={inputClass} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                    <option value="">All</option>
                                    {OPPORTUNITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Location</label>
                                <select className={inputClass} value={locationScope} onChange={(e) => setLocationScope(e.target.value)}>
                                    <option value="">All</option>
                                    {LOCATION_SCOPES.map((l) => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            {locationScope === "State" && (
                                <div>
                                    <label className={labelClass}>State</label>
                                    <select className={inputClass} value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                                        <option value="">All</option>
                                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            )}
                            {locationScope === "District" && (
                                <>
                                    <div>
                                        <label className={labelClass}>State</label>
                                        <select className={inputClass} value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setDistrictFilter(""); }}>
                                            <option value="">All</option>
                                            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>District</label>
                                        <select className={inputClass} value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)}>
                                            <option value="">All</option>
                                            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}
                            <div>
                                <label className={labelClass}>Deadline</label>
                                <select className={inputClass} value={deadlineFilter} onChange={(e) => setDeadlineFilter(e.target.value)}>
                                    {DEADLINE_FILTERS.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Age group</label>
                                <select className={inputClass} value={ageGroupFilter} onChange={(e) => setAgeGroupFilter(e.target.value)}>
                                    <option value="">All</option>
                                    {AGE_GROUPS.filter(Boolean).map((a) => <option key={a} value={a}>{a}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input type="text" placeholder="Search opportunities..." className={inputClass + " pl-9"} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                    </section>

                    {/* 6. Recommended for you */}
                    {recommended.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2"><Target size={16} className="text-primary" /> Recommended for you</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {recommended.map((opp) => (
                                    <div key={opp.id} className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(opp.type)}`}>{opp.type}</span>
                                        <h3 className="font-semibold text-white mt-2">{opp.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{opp.organization} • {opp.sport}</p>
                                        <p className="text-xs text-gray-400 mt-2">Deadline: {opp.deadline}</p>
                                        <div className="flex gap-2 mt-3">
                                            <button type="button" onClick={() => setDetailId(opp.id)} className="text-xs text-primary font-medium">View</button>
                                            <button type="button" onClick={() => applyForOpportunity(opp)} disabled={appliedIds.includes(opp.id)} className="text-xs text-white font-medium">Apply</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 3. Opportunity cards */}
                    <section>
                        <h2 className="text-sm font-semibold text-white/95 mb-4">All opportunities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredOpportunities.map((opp) => {
                                const days = daysUntil(opp.deadline);
                                const expired = days < 0;
                                const bookmarked = bookmarks.includes(opp.id);
                                const applied = appliedIds.includes(opp.id);
                                const loc = [opp.district, opp.state].filter(Boolean).join(", ") || opp.locationScope;
                                return (
                                    <motion.div
                                        key={opp.id}
                                        layout
                                        className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 flex flex-col ${expired ? "opacity-60" : ""}`}
                                    >
                                        <div className="flex justify-between items-start gap-2">
                                            <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(opp.type)}`}>{opp.type}</span>
                                            <button type="button" onClick={() => toggleBookmark(opp.id)} className="p-1.5 text-gray-500 hover:text-primary rounded-lg">
                                                {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-2">{opp.organization}</p>
                                        <h3 className="font-semibold text-white mt-1">{opp.title}</h3>
                                        <p className="text-xs text-gray-400 mt-1">{opp.sport} • {opp.category}</p>
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><MapPin size={12} /> {loc}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12} /> Last date: {opp.deadline} {!expired && days <= 7 && <span className="text-amber-500">({days} days left)</span>}</p>
                                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{opp.eligibility}</p>
                                        <p className="text-sm font-medium text-primary mt-2">{opp.prize}</p>
                                        <div className="flex gap-2 mt-4">
                                            <button type="button" onClick={() => setDetailId(opp.id)} className="flex-1 py-2 rounded-lg border border-white/10 text-sm font-medium text-white/90 hover:bg-white/5">
                                                View details
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => applyForOpportunity(opp)}
                                                disabled={expired || applied}
                                                className="flex-1 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-1"
                                            >
                                                {applied ? "Applied" : "Apply"} <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        {filteredOpportunities.length === 0 && <p className="text-sm text-gray-500 py-8 text-center">No opportunities match your filters.</p>}
                    </section>
                </>
            )}

            {/* 5. My Applications */}
            {tab === "applications" && (
                <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                    <h2 className="text-sm font-semibold text-white/95 p-5 border-b border-white/[0.06]">My applications</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.02]">
                                    <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
                                    <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Application date</th>
                                    <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {applications.map((app) => {
                                    const opp = MOCK_OPPORTUNITIES.find((o) => o.id === app.opportunityId);
                                    const statusCls = app.status === "Selected" ? "text-emerald-500" : app.status === "Rejected" ? "text-red-500" : "text-amber-500";
                                    return (
                                        <tr key={app.opportunityId + app.appliedAt}>
                                            <td className="px-4 py-3 text-sm text-white/90">{app.opportunityTitle || opp?.title}</td>
                                            <td className="px-4 py-3 text-sm text-white/80">{app.appliedAt}</td>
                                            <td className={`px-4 py-3 text-sm font-medium ${statusCls}`}>{app.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {applications.length === 0 && <p className="text-sm text-gray-500 py-8 text-center">You have not applied to any opportunity yet.</p>}
                </section>
            )}

            {/* 4. Opportunity detail modal */}
            <AnimatePresence>
                {detailOpp && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm" onClick={() => setDetailId(null)}>
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-xl my-8">
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <h2 className="text-lg font-semibold text-white">{detailOpp.title}</h2>
                                <button type="button" onClick={() => setDetailId(null)} className="p-2 text-gray-500 hover:text-white rounded-lg"><X size={18} /></button>
                            </div>
                            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{detailOpp.organization}</p>
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(detailOpp.type)}`}>{detailOpp.type}</span>

                                {daysUntil(detailOpp.deadline) >= 0 && (
                                    <div className="flex items-center gap-2 text-amber-500 text-sm">
                                        <Clock size={16} /> {daysUntil(detailOpp.deadline)} days left to apply • Deadline: {detailOpp.deadline}
                                    </div>
                                )}

                                <div>
                                    <h3 className={labelClass}>Description</h3>
                                    <p className="text-sm text-white/90">{detailOpp.description}</p>
                                </div>
                                <div>
                                    <h3 className={labelClass}>Eligibility</h3>
                                    <p className="text-sm text-white/80">{detailOpp.eligibility}</p>
                                </div>
                                <div><h3 className={labelClass}>Age limit</h3><p className="text-sm text-white/80">{detailOpp.ageLimit}</p></div>
                                <div><h3 className={labelClass}>Required documents</h3><p className="text-sm text-white/80">{detailOpp.requiredDocs}</p></div>
                                <div><h3 className={labelClass}>Selection process</h3><p className="text-sm text-white/80">{detailOpp.selectionProcess}</p></div>
                                <div><h3 className={labelClass}>Venue</h3><p className="text-sm text-white/80">{detailOpp.venue}</p></div>
                                <div><h3 className={labelClass}>Contact</h3><p className="text-sm text-white/80">{detailOpp.contact}</p></div>
                                <a href={detailOpp.officialLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                    <ExternalLink size={14} /> Official link
                                </a>

                                {/* 7. Save & reminder */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <button type="button" onClick={() => toggleBookmark(detailOpp.id)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-sm text-white/90 hover:bg-white/5">
                                        {bookmarks.includes(detailOpp.id) ? <BookmarkCheck size={14} /> : <Bookmark size={14} />} {bookmarks.includes(detailOpp.id) ? "Saved" : "Save"}
                                    </button>
                                    <button type="button" onClick={() => addReminder(detailOpp.id)} disabled={reminders.includes(detailOpp.id)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-sm text-white/90 hover:bg-white/5 disabled:opacity-50">
                                        <Bell size={14} /> {reminders.includes(detailOpp.id) ? "Reminder set" : "Remind before deadline"}
                                    </button>
                                    <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-sm text-white/90 hover:bg-white/5">
                                        <CalendarPlus size={14} /> Add to calendar
                                    </button>
                                </div>

                                {/* 8. Sponsor Connect (for Sponsorship) */}
                                {detailOpp.type === "Sponsorship" && detailOpp.fundingAmount != null && (
                                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                        <h3 className="text-sm font-semibold text-white/95 flex items-center gap-2"><User size={16} /> Sponsor connect</h3>
                                        <p className="text-xs text-gray-400 mt-1">{detailOpp.sponsorProfile}</p>
                                        <p className="text-sm font-semibold text-emerald-500 mt-2">Funding: ₹{detailOpp.fundingAmount?.toLocaleString()}</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30">
                                                <Send size={14} /> Send proposal
                                            </button>
                                            <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-sm text-white/90 hover:bg-white/5">
                                                <FileText size={14} /> Attach performance resume
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2 pt-4">
                                    <button type="button" onClick={() => { applyForOpportunity(detailOpp); setDetailId(null); }} disabled={appliedIds.includes(detailOpp.id) || daysUntil(detailOpp.deadline) < 0} className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                                        {appliedIds.includes(detailOpp.id) ? "Applied" : "Apply now"} <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Opportunities;
