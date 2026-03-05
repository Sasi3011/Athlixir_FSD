import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy, Search, Filter, ChevronUp, ChevronDown, User, MapPin,
    Target, Zap, Shield, Award, Flame, GitCompare
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAthlete } from "../../context/AthleteContext";
import { SPORTS_LIST, SPORT_CATEGORIES } from "../../constants/sports";
import { INDIAN_STATES, getDistrictsForState } from "../../constants/location";

const RANKING_LEVELS = ["National", "State", "District"];
const TIME_PERIODS = ["Weekly", "Monthly", "Yearly", "All Time"];
const AGE_GROUPS = ["", "Under 18", "Under 21", "Senior"];

function computeFinalScore(entry) {
    const perf = Number(entry.performanceScore) || 0;
    const ach = Number(entry.achievements) || 0;
    const cons = Number(entry.consistency) || 80;
    const inj = Number(entry.injuryImpact) || 0;
    return Math.max(0, Math.round(perf * 0.5 + ach * 2 + cons * 0.2 - inj * 0.1));
}

const MOCK_ATHLETES = [
    { id: 1, name: "Aryan Sharma", sport: "Athletics", category: "Sprints", state: "Tamil Nadu", district: "Chennai", performanceScore: 92, achievements: 12, consistency: 88, injuryImpact: 2, matchesPlayed: 45, rankMovement: 2, badges: ["On Fire"], photo: null },
    { id: 2, name: "Sneha Reddy", sport: "Football", category: "Midfielder", state: "Tamil Nadu", district: "Coimbatore", performanceScore: 88, achievements: 8, consistency: 85, injuryImpact: 0, matchesPlayed: 38, rankMovement: -1, badges: ["Low Injury Risk"], photo: null },
    { id: 3, name: "Vikram Gill", sport: "Cricket", category: "Batting", state: "Maharashtra", district: "Mumbai", performanceScore: 90, achievements: 10, consistency: 82, injuryImpact: 5, matchesPlayed: 52, rankMovement: 1, badges: ["District Champion"], photo: null },
    { id: 4, name: "Priya Das", sport: "Tennis", category: "Singles", state: "Karnataka", district: "Bangalore Urban", performanceScore: 85, achievements: 6, consistency: 90, injuryImpact: 3, matchesPlayed: 30, rankMovement: 3, badges: [], photo: null },
    { id: 5, name: "Rohan V", sport: "Swimming", category: "Freestyle", state: "Kerala", district: "Kochi", performanceScore: 82, achievements: 5, consistency: 78, injuryImpact: 8, matchesPlayed: 28, rankMovement: -2, badges: ["Comeback Athlete"], photo: null },
    { id: 6, name: "Kiran J", sport: "Basketball", category: "Guard", state: "Tamil Nadu", district: "Madurai", performanceScore: 80, achievements: 4, consistency: 75, injuryImpact: 4, matchesPlayed: 40, rankMovement: 0, badges: [], photo: null },
    { id: 7, name: "Divya M", sport: "Shooting", category: "Rifle", state: "Tamil Nadu", district: "Coimbatore", performanceScore: 86, achievements: 7, consistency: 84, injuryImpact: 1, matchesPlayed: 22, rankMovement: 2, badges: ["Low Injury Risk"], photo: null },
    { id: 8, name: "Arjun K", sport: "Cricket", category: "Bowling", state: "Delhi", district: "South Delhi", performanceScore: 84, achievements: 9, consistency: 80, injuryImpact: 6, matchesPlayed: 48, rankMovement: -1, badges: [], photo: null },
    { id: 9, name: "Meera S", sport: "Athletics", category: "Long Distance", state: "Karnataka", district: "Mysore", performanceScore: 78, achievements: 3, consistency: 82, injuryImpact: 10, matchesPlayed: 20, rankMovement: 1, badges: [], photo: null },
    { id: 10, name: "Rahul P", sport: "Football", category: "Forward", state: "West Bengal", district: "Kolkata", performanceScore: 81, achievements: 6, consistency: 76, injuryImpact: 5, matchesPlayed: 35, rankMovement: -1, badges: [], photo: null },
];

const PAGE_SIZE = 10;
const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";

const Leaderboard = () => {
    const { user } = useAuth();
    const { useAthleteProfile } = useAthlete();
    const { profile } = useAthleteProfile(user?.uid);

    const [sport, setSport] = useState(profile?.primarySport || "");
    const [category, setCategory] = useState(profile?.category || "");
    const [rankingLevel, setRankingLevel] = useState("National");
    const [stateFilter, setStateFilter] = useState(profile?.state || "");
    const [districtFilter, setDistrictFilter] = useState(profile?.district || "");
    const [timePeriod, setTimePeriod] = useState("All Time");
    const [ageGroup, setAgeGroup] = useState("");
    const [searchName, setSearchName] = useState("");
    const [sortBy, setSortBy] = useState("score");
    const [page, setPage] = useState(0);
    const [compareOpen, setCompareOpen] = useState(false);
    const [compareA, setCompareA] = useState(null);
    const [compareB, setCompareB] = useState(null);

    const categories = sport ? (SPORT_CATEGORIES[sport] || ["Other"]) : [];
    const districts = getDistrictsForState(stateFilter);

    const currentUserEntry = useMemo(() => {
        const name = profile?.name || user?.displayName || "You";
        const perf = 82;
        const ach = 5;
        const cons = 85;
        const inj = 2;
        const score = Math.round(perf * 0.5 + ach * 2 + cons * 0.2 - inj * 0.1);
        return {
            id: "me",
            name,
            sport: profile?.primarySport || "—",
            category: profile?.category || "—",
            state: profile?.state || "—",
            district: profile?.district || "—",
            performanceScore: perf,
            achievements: ach,
            consistency: cons,
            injuryImpact: inj,
            matchesPlayed: 12,
            rankMovement: 2,
            finalScore: score,
            isUser: true
        };
    }, [user, profile]);

    const allEntries = useMemo(() => {
        const withScore = MOCK_ATHLETES.map(e => ({ ...e, finalScore: computeFinalScore(e) }));
        const withMe = [...withScore];
        const meRank = withScore.filter(e => e.finalScore > currentUserEntry.finalScore).length + 1;
        withMe.push({ ...currentUserEntry, rank: meRank });
        return withMe.sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0)).map((e, i) => ({ ...e, rank: i + 1 }));
    }, [currentUserEntry]);

    const filteredEntries = useMemo(() => {
        let list = allEntries.filter(e => {
            if (sport && e.sport !== sport) return false;
            if (category && e.category !== category) return false;
            if (rankingLevel === "State" && stateFilter && e.state !== stateFilter) return false;
            if (rankingLevel === "District" && stateFilter && e.state !== stateFilter) return false;
            if (rankingLevel === "District" && districtFilter && e.district !== districtFilter) return false;
            if (searchName && !e.name.toLowerCase().includes(searchName.toLowerCase())) return false;
            return true;
        });
        if (sortBy === "score") list = [...list].sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
        if (sortBy === "name") list = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        return list.map((e, i) => ({ ...e, rank: i + 1 }));
    }, [allEntries, sport, category, rankingLevel, stateFilter, districtFilter, searchName, sortBy]);

    const topThree = filteredEntries.slice(0, 3);
    const myRankIndex = filteredEntries.findIndex(e => e.isUser);
    const myRank = myRankIndex >= 0 ? filteredEntries[myRankIndex] : null;

    const paginated = useMemo(() => {
        const start = page * PAGE_SIZE;
        return filteredEntries.slice(start, start + PAGE_SIZE);
    }, [filteredEntries, page]);

    const totalPages = Math.ceil(filteredEntries.length / PAGE_SIZE);

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            {/* 1. Page header */}
            <header>
                <h1 className="text-2xl font-bold text-white/95 flex items-center gap-2">
                    <Trophy size={28} className="text-primary" />
                    Leaderboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">Top performing athletes across levels</p>
            </header>

            {/* 2. Filter section */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                    <Filter size={16} /> Filters
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div>
                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Sport</label>
                        <select className={inputClass} value={sport} onChange={e => { setSport(e.target.value); setCategory(""); }}>
                            <option value="">All</option>
                            {SPORTS_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Category</label>
                        <select className={inputClass} value={category} onChange={e => setCategory(e.target.value)} disabled={!sport}>
                            <option value="">All</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Ranking level</label>
                        <select className={inputClass} value={rankingLevel} onChange={e => setRankingLevel(e.target.value)}>
                            {RANKING_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                    {(rankingLevel === "State" || rankingLevel === "District") && (
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">State</label>
                            <select className={inputClass} value={stateFilter} onChange={e => { setStateFilter(e.target.value); setDistrictFilter(""); }}>
                                <option value="">All</option>
                                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    )}
                    {rankingLevel === "District" && stateFilter && (
                        <div>
                            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">District</label>
                            <select className={inputClass} value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
                                <option value="">All</option>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    )}
                    <div>
                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Time period</label>
                        <select className={inputClass} value={timePeriod} onChange={e => setTimePeriod(e.target.value)}>
                            {TIME_PERIODS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Age group</label>
                        <select className={inputClass} value={ageGroup} onChange={e => setAgeGroup(e.target.value)}>
                            <option value="">All</option>
                            {AGE_GROUPS.filter(Boolean).map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                </div>
            </section>

            {/* 3. Top 3 highlight */}
            {topThree.length >= 3 && (
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="order-2 md:order-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center pb-8">
                        <div className="w-16 h-16 rounded-2xl bg-slate-500/20 flex items-center justify-center text-2xl font-bold text-slate-400 mx-auto mb-3">{topThree[1].name?.charAt(0)}</div>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">2nd</p>
                        <h3 className="text-lg font-bold text-white mt-1">{topThree[1].name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center justify-center gap-1"><MapPin size={10} /> {topThree[1].district}, {topThree[1].state}</p>
                        <p className="text-xs text-gray-400 mt-1">{topThree[1].sport} • {topThree[1].category}</p>
                        <p className="text-xl font-bold text-white mt-2">{topThree[1].finalScore}</p>
                        <p className="text-[10px] text-gray-500">Performance score</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="order-1 md:order-2 rounded-2xl border-2 border-primary/30 bg-primary/10 p-8 text-center -mt-4 md:mt-0 mb-4 md:mb-0">
                        <div className="w-20 h-20 rounded-2xl bg-primary/30 flex items-center justify-center text-3xl font-bold text-primary mx-auto mb-3">{topThree[0].name?.charAt(0)}</div>
                        <p className="text-[10px] font-medium text-primary uppercase tracking-wider">1st</p>
                        <h3 className="text-xl font-bold text-white mt-1">{topThree[0].name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center justify-center gap-1"><MapPin size={10} /> {topThree[0].district}, {topThree[0].state}</p>
                        <p className="text-xs text-gray-400 mt-1">{topThree[0].sport} • {topThree[0].category}</p>
                        <p className="text-2xl font-bold text-white mt-2">{topThree[0].finalScore}</p>
                        <p className="text-[10px] text-primary">Performance score</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="order-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center pb-8">
                        <div className="w-16 h-16 rounded-2xl bg-amber-900/30 flex items-center justify-center text-2xl font-bold text-amber-700 mx-auto mb-3">{topThree[2].name?.charAt(0)}</div>
                        <p className="text-[10px] font-medium text-amber-600 uppercase tracking-wider">3rd</p>
                        <h3 className="text-lg font-bold text-white mt-1">{topThree[2].name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center justify-center gap-1"><MapPin size={10} /> {topThree[2].district}, {topThree[2].state}</p>
                        <p className="text-xs text-gray-400 mt-1">{topThree[2].sport} • {topThree[2].category}</p>
                        <p className="text-xl font-bold text-white mt-2">{topThree[2].finalScore}</p>
                        <p className="text-[10px] text-gray-500">Performance score</p>
                    </motion.div>
                </section>
            )}

            {/* 4. My Ranking card */}
            {myRank && (
                <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <h2 className="text-sm font-semibold text-white/95 mb-4 flex items-center gap-2">
                        <Target size={16} className="text-primary" /> Your ranking
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">National rank</p>
                            <p className="text-xl font-bold text-white mt-1">#{myRank.rank}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">State rank ({myRank.state})</p>
                            <p className="text-xl font-bold text-white mt-1">#14</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">District rank ({myRank.district})</p>
                            <p className="text-xl font-bold text-white mt-1">#3</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Movement</p>
                            <p className="text-lg font-bold text-emerald-500 mt-1 flex items-center gap-1">
                                <ChevronUp size={16} /> +{myRank.rankMovement} this week
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Current performance score: <span className="font-semibold text-white">{myRank.finalScore}</span></p>
                </section>
            )}

            {/* 5. Table + search + sort + pagination */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="p-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold text-white/95">Leaderboard</h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input type="text" placeholder="Search athlete..." className={inputClass + " pl-9 w-48"} value={searchName} onChange={e => setSearchName(e.target.value)} />
                        </div>
                        <select className={inputClass + " w-36"} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option value="score">Sort by score</option>
                            <option value="name">Sort by name</option>
                        </select>
                        <button type="button" onClick={() => setCompareOpen(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-sm text-white/90 hover:bg-white/5">
                            <GitCompare size={16} /> Compare athletes
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Athlete</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Sport</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">State</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Matches</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Achievements</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Movement</th>
                                <th className="px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {paginated.map((row) => (
                                <tr key={row.id} className={row.isUser ? "bg-primary/10" : "hover:bg-white/[0.02]"}>
                                    <td className="px-4 py-3 font-bold text-white/90">{row.rank}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold text-white/90">{row.name?.charAt(0)}</div>
                                            <div>
                                                <p className="text-sm font-medium text-white/90">{row.name} {row.isUser && "(You)"}</p>
                                                {row.badges?.length > 0 && (
                                                    <p className="text-[10px] text-gray-500 flex items-center gap-1 flex-wrap">
                                                        {row.badges.map(b => <span key={b} className="px-1.5 py-0.5 rounded bg-white/5 text-[9px]">{b}</span>)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-white/80">{row.sport}</td>
                                    <td className="px-4 py-3 text-sm text-white/80">{row.category}</td>
                                    <td className="px-4 py-3 text-sm text-white/80">{row.district}</td>
                                    <td className="px-4 py-3 text-sm text-white/80">{row.state}</td>
                                    <td className="px-4 py-3 text-sm text-white/80">{row.matchesPlayed}</td>
                                    <td className="px-4 py-3 text-sm text-white/80">{row.achievements}</td>
                                    <td className="px-4 py-3 font-semibold text-white/90">{row.finalScore}</td>
                                    <td className="px-4 py-3">
                                        {row.rankMovement > 0 ? <span className="text-emerald-500 flex items-center gap-0.5"><ChevronUp size={14} /> +{row.rankMovement}</span> : row.rankMovement < 0 ? <span className="text-red-500 flex items-center gap-0.5"><ChevronDown size={14} /> {row.rankMovement}</span> : <span className="text-gray-500">—</span>}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button type="button" className="p-2 text-gray-500 hover:text-primary rounded-lg" title="View profile"><User size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="p-4 border-t border-white/[0.06] flex items-center justify-between">
                        <p className="text-xs text-gray-500">Page {page + 1} of {totalPages}</p>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-3 py-1.5 rounded-lg border border-white/10 text-sm disabled:opacity-50">Previous</button>
                            <button type="button" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="px-3 py-1.5 rounded-lg border border-white/10 text-sm disabled:opacity-50">Next</button>
                        </div>
                    </div>
                )}
            </section>

            {/* 6. Score formula note */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h2 className="text-sm font-semibold text-white/95 mb-2 flex items-center gap-2">
                    <Zap size={16} className="text-primary" /> Score formula
                </h2>
                <p className="text-xs text-gray-400">
                    Final score = (Performance × 50%) + (Achievements × 20%) + (Consistency × 20%) − (Injury impact × 10%). Data-driven and fair.
                </p>
            </section>

            {/* 8. Compare modal */}
            <AnimatePresence>
                {compareOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setCompareOpen(false)}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={e => e.stopPropagation()} className="w-full max-w-2xl rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2"><GitCompare size={20} /> Compare athletes</h2>
                                <button type="button" onClick={() => setCompareOpen(false)} className="p-2 text-gray-500 hover:text-white rounded-lg">×</button>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Athlete 1</label>
                                    <select className={inputClass} value={compareA?.id || ""} onChange={e => setCompareA(filteredEntries.find(x => x.id === e.target.value) || null)}>
                                        <option value="">Select</option>
                                        {filteredEntries.filter(e => !e.isUser).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Athlete 2</label>
                                    <select className={inputClass} value={compareB?.id || ""} onChange={e => setCompareB(filteredEntries.find(x => x.id === e.target.value) || null)}>
                                        <option value="">Select</option>
                                        {filteredEntries.filter(e => !e.isUser).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            {(compareA || compareB) && (
                                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-6">
                                    {[compareA, compareB].map((ath, i) => ath ? (
                                        <div key={ath.id} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                                            <p className="font-medium text-white/90 mb-3">{ath.name}</p>
                                            <p className="text-xs text-gray-500">Score: <span className="text-white font-semibold">{ath.finalScore}</span></p>
                                            <p className="text-xs text-gray-500 mt-1">Performance: {ath.performanceScore}% • Achievements: {ath.achievements} • Consistency: {ath.consistency}%</p>
                                            <p className="text-xs text-gray-500 mt-1">Injury impact: {ath.injuryImpact}%</p>
                                        </div>
                                    ) : (
                                        <div key={i} className="rounded-xl border border-dashed border-white/10 p-4 text-center text-gray-500 text-sm">Select athlete</div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Leaderboard;
