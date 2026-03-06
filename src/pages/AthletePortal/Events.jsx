import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar, MapPin, Users, ChevronRight, Clock, Filter, Search,
    X, Trophy, Tag, ArrowUpRight, CalendarDays, Bookmark, BookmarkCheck
} from "lucide-react";

const EVENT_TYPES = ["All", "Competition", "Trial", "Workshop", "Championship", "Showcase"];
const STATUS_OPTIONS = ["All", "Open", "Closing Soon", "Invite Only", "Completed"];

const EVENTS = [
    {
        id: 1, title: "Summer Athletics Open 2026", type: "Competition", sport: "Athletics",
        date: "June 24–26, 2026", deadline: "2026-06-20", venue: "Jawaharlal Nehru Stadium, Chennai",
        state: "Tamil Nadu", eligibility: "State/National verified athletes", ageGroup: "Open",
        registered: 480, capacity: 600, status: "Open", entryFee: "₹500",
        prizes: "1st: ₹50,000 | 2nd: ₹25,000 | 3rd: ₹10,000",
        description: "Annual athletics competition featuring 100m, 200m, 400m, 800m, long jump, high jump, and shot put events. Top performers get scouted by SAI coaches.",
        organizer: "Tamil Nadu Athletics Association",
        image: "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2, title: "Inter-College Football Cup Finals", type: "Championship", sport: "Football",
        date: "May 15–20, 2026", deadline: "2026-05-10", venue: "NMC Grounds, Pune",
        state: "Maharashtra", eligibility: "College-level teams only", ageGroup: "Under 25",
        registered: 1200, capacity: 2500, status: "Open", entryFee: "₹2,000/team",
        prizes: "Champions: ₹2,00,000 | Runner-up: ₹1,00,000",
        description: "India's largest inter-college football tournament. 64 teams compete across group stages and knockout rounds over 6 days.",
        organizer: "All India Football Federation – Youth Wing",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3, title: "Scout Showcase Weekend", type: "Showcase", sport: "Football",
        date: "July 02, 2026", deadline: "2026-06-25", venue: "Football Academy, Mumbai",
        state: "Maharashtra", eligibility: "Top 100 ranked athletes on Athlixir", ageGroup: "Under 21",
        registered: 75, capacity: 100, status: "Invite Only", entryFee: "Free",
        prizes: "Direct club trial opportunity",
        description: "Exclusive showcase event where top-ranked footballers are put in front of ISL and I-League club scouts. Invite-only based on platform ranking.",
        organizer: "Athlixir & ISL Scouts Network",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4, title: "National Swimming Championship Qualifiers", type: "Trial", sport: "Swimming",
        date: "April 10–12, 2026", deadline: "2026-04-05", venue: "SPM Swimming Complex, Delhi",
        state: "Delhi", eligibility: "State-level qualified swimmers", ageGroup: "Under 21",
        registered: 220, capacity: 300, status: "Open", entryFee: "₹750",
        prizes: "National team qualification",
        description: "Qualifying rounds for the 2026 National Swimming Championship. Events include freestyle, backstroke, breaststroke, butterfly, and medley.",
        organizer: "Swimming Federation of India",
        image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5, title: "Coimbatore District Cricket Trials", type: "Trial", sport: "Cricket",
        date: "March 28–29, 2026", deadline: "2026-03-25", venue: "SNR College Ground, Coimbatore",
        state: "Tamil Nadu", eligibility: "Registered district players, Age 16+", ageGroup: "Open",
        registered: 340, capacity: 500, status: "Closing Soon", entryFee: "₹200",
        prizes: "District team selection",
        description: "Open selection trials for the Coimbatore district cricket team. Two-day event covering batting, bowling, and fielding assessments.",
        organizer: "Coimbatore District Cricket Association",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6, title: "Badminton Skills Workshop", type: "Workshop", sport: "Badminton",
        date: "April 20, 2026", deadline: "2026-04-18", venue: "Pullela Gopichand Academy, Hyderabad",
        state: "Telangana", eligibility: "All levels welcome", ageGroup: "Under 18",
        registered: 60, capacity: 80, status: "Open", entryFee: "₹1,500",
        prizes: "Certificate + Coaching feedback report",
        description: "A one-day intensive workshop by national-level coaches focusing on footwork, smash technique, and match strategy for young players.",
        organizer: "Gopichand Badminton Foundation",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7, title: "Marathon for Champions 2026", type: "Competition", sport: "Athletics",
        date: "August 15, 2026", deadline: "2026-08-10", venue: "Marina Beach Road, Chennai",
        state: "Tamil Nadu", eligibility: "Open to all registered runners", ageGroup: "Open",
        registered: 1500, capacity: 5000, status: "Open", entryFee: "₹1,000",
        prizes: "1st: ₹1,00,000 | 2nd: ₹50,000 | 3rd: ₹25,000",
        description: "Full marathon (42.195 km) and half marathon categories. Chip-timed, AIMS-certified course along the scenic Marina coastline.",
        organizer: "Chennai Runners Club",
        image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8, title: "State Boxing Championship 2026", type: "Championship", sport: "Boxing",
        date: "September 5–8, 2026", deadline: "2026-08-30", venue: "Netaji Indoor Stadium, Kolkata",
        state: "West Bengal", eligibility: "District-level boxers, Valid BFI registration", ageGroup: "Senior",
        registered: 180, capacity: 256, status: "Open", entryFee: "₹400",
        prizes: "Gold medalists qualify for National Championship",
        description: "Official state boxing championship across all weight categories. Winners represent the state at the National Boxing Championship.",
        organizer: "West Bengal Boxing Association",
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80"
    },
];

function getStatusColor(status) {
    const map = {
        "Open": "bg-emerald-500/10 text-emerald-500",
        "Closing Soon": "bg-amber-500/10 text-amber-500",
        "Invite Only": "bg-purple-500/10 text-purple-500",
        "Completed": "bg-gray-500/10 text-gray-500"
    };
    return map[status] || "bg-gray-500/10 text-gray-500";
}

function getTypeColor(type) {
    const map = {
        "Competition": "bg-blue-500/10 text-blue-400",
        "Trial": "bg-orange-500/10 text-orange-400",
        "Workshop": "bg-teal-500/10 text-teal-400",
        "Championship": "bg-red-500/10 text-red-400",
        "Showcase": "bg-violet-500/10 text-violet-400"
    };
    return map[type] || "bg-gray-500/10 text-gray-400";
}

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";

const Events = () => {
    const [tab, setTab] = useState("upcoming");
    const [typeFilter, setTypeFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [detailId, setDetailId] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);

    const filtered = useMemo(() => {
        return EVENTS.filter((ev) => {
            if (typeFilter !== "All" && ev.type !== typeFilter) return false;
            if (searchQuery && !(ev.title + " " + ev.sport + " " + ev.venue).toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [typeFilter, searchQuery]);

    const featured = EVENTS[0];
    const detailEvent = detailId ? EVENTS.find((e) => e.id === detailId) : null;

    const toggleBookmark = (id) => {
        setBookmarks((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
    };

    const capacityPercent = (ev) => Math.round((ev.registered / ev.capacity) * 100);

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-white/95 flex items-center gap-2">
                    <Calendar size={28} className="text-primary" />
                    Event Chronicle
                </h1>
                <p className="text-sm text-gray-500 mt-1">Upcoming competitions, trials, workshops & championships</p>
            </header>

            {/* Featured Event */}
            <section
                className="relative h-64 sm:h-72 rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setDetailId(featured.id)}
            >
                <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(featured.status)}`}>{featured.status}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(featured.type)}`}>{featured.type}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/20 text-primary">Featured</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{featured.title}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1"><CalendarDays size={14} className="text-primary" /> {featured.date}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} className="text-primary" /> {featured.venue}</span>
                        <span className="flex items-center gap-1"><Users size={14} className="text-primary" /> {featured.registered}/{featured.capacity} registered</span>
                    </div>
                </div>
            </section>

            {/* Tabs & Filters */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search events by name, sport, venue..."
                            className={inputClass + " pl-9"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {EVENT_TYPES.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTypeFilter(t)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${typeFilter === t ? "bg-primary text-white" : "bg-white/[0.06] text-gray-400 hover:text-white border border-white/[0.08]"}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <p className="text-xs text-gray-500">{filtered.length} events found</p>
            </section>

            {/* Events Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((ev, i) => {
                    const pct = capacityPercent(ev);
                    const bookmarked = bookmarks.includes(ev.id);
                    return (
                        <motion.div
                            key={ev.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex flex-col hover:border-primary/20 transition-all group"
                        >
                            {/* Image */}
                            <div className="h-40 relative overflow-hidden cursor-pointer" onClick={() => setDetailId(ev.id)}>
                                <img
                                    src={ev.image}
                                    alt={ev.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                <div className="absolute top-3 left-3 flex gap-1.5">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(ev.status)}`}>{ev.status}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleBookmark(ev.id); }}
                                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 text-gray-300 hover:text-primary"
                                >
                                    {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                                </button>
                                <div className="absolute bottom-3 left-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(ev.type)}`}>{ev.type} • {ev.sport}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-semibold text-white text-sm cursor-pointer hover:text-primary transition-colors" onClick={() => setDetailId(ev.id)}>{ev.title}</h3>
                                <div className="mt-2 space-y-1">
                                    <p className="text-xs text-gray-500 flex items-center gap-1"><CalendarDays size={12} /> {ev.date}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> {ev.venue}</p>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">{ev.eligibility}</p>

                                {/* Capacity bar */}
                                <div className="mt-auto pt-4">
                                    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                        <span>{ev.registered} / {ev.capacity} registered</span>
                                        <span>{pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-primary"}`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                                    <span className="text-xs text-gray-500 flex items-center gap-1"><Tag size={12} /> {ev.entryFee}</span>
                                    <button
                                        type="button"
                                        onClick={() => setDetailId(ev.id)}
                                        className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                                    >
                                        View details <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </section>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-sm text-gray-500">
                    No events match your filters. Try a different type or keyword.
                </div>
            )}

            {/* Host CTA */}
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                    <Trophy size={24} />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-white text-sm">Host your own event</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Organizing a meet or championship? Publish it on Athlixir to reach thousands of athletes.</p>
                </div>
                <button type="button" className="px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white/90 hover:bg-white/10 transition-colors">
                    Submit Event
                </button>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {detailEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
                        onClick={() => setDetailId(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-xl my-8"
                        >
                            {/* Modal image */}
                            <div className="h-52 relative overflow-hidden rounded-t-2xl">
                                <img src={detailEvent.image} alt={detailEvent.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                                <button
                                    type="button"
                                    onClick={() => setDetailId(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/80"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 space-y-5 -mt-6 relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(detailEvent.status)}`}>{detailEvent.status}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getTypeColor(detailEvent.type)}`}>{detailEvent.type}</span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] text-gray-400">{detailEvent.sport}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white">{detailEvent.title}</h2>
                                    <p className="text-xs text-gray-500 mt-1">Organized by {detailEvent.organizer}</p>
                                </div>

                                <p className="text-sm text-gray-300">{detailEvent.description}</p>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                        <p className="text-[10px] text-gray-500 uppercase">Date</p>
                                        <p className="text-sm font-medium text-white mt-0.5">{detailEvent.date}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                        <p className="text-[10px] text-gray-500 uppercase">Entry Fee</p>
                                        <p className="text-sm font-medium text-white mt-0.5">{detailEvent.entryFee}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                        <p className="text-[10px] text-gray-500 uppercase">Age Group</p>
                                        <p className="text-sm font-medium text-white mt-0.5">{detailEvent.ageGroup}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                        <p className="text-[10px] text-gray-500 uppercase">Registered</p>
                                        <p className="text-sm font-medium text-white mt-0.5">{detailEvent.registered}/{detailEvent.capacity}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Venue</p>
                                    <p className="text-sm text-white/90 flex items-center gap-1"><MapPin size={14} className="text-primary" /> {detailEvent.venue}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Eligibility</p>
                                    <p className="text-sm text-white/90">{detailEvent.eligibility}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Prizes</p>
                                    <p className="text-sm text-primary font-medium">{detailEvent.prizes}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Registration Deadline</p>
                                    <p className="text-sm text-white/90 flex items-center gap-1"><Clock size={14} /> {detailEvent.deadline}</p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => toggleBookmark(detailEvent.id)}
                                        className="py-2.5 px-4 rounded-lg border border-white/10 text-sm font-medium text-white/90 hover:bg-white/5 flex items-center gap-2"
                                    >
                                        {bookmarks.includes(detailEvent.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                                        {bookmarks.includes(detailEvent.id) ? "Saved" : "Save"}
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 flex items-center justify-center gap-2"
                                    >
                                        Register Now <ArrowUpRight size={16} />
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

export default Events;
