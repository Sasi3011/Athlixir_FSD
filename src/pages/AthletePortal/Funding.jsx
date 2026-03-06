import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    DollarSign, TrendingUp, Users, ArrowUpRight, ShieldCheck,
    Briefcase, ChevronRight, Wallet, Search, Filter, X,
    Calendar, MapPin, ExternalLink, BookmarkCheck, Bookmark, Tag, Clock
} from "lucide-react";

const SPONSORSHIP_TYPES = ["All", "Equipment + Stipend", "Full Training Grant", "Cash Sponsorship", "Government Scheme", "Crowdfunding"];

const SPONSORSHIPS = [
    {
        id: 1, title: "Elite Football Equipment & Stipend Program", provider: "Adidas India",
        type: "Equipment + Stipend", amount: "₹2,50,000/season", sport: "Football",
        eligibility: "District rank < 10, Age 16–21", deadline: "2026-06-30", status: "Open",
        description: "Full kit sponsorship including boots, training gear, and a monthly stipend for travel and nutrition. Top performers get brand ambassador opportunities.",
        requirements: "Performance CV, District ranking certificate, Coach recommendation",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2, title: "Next-Gen Athletics Training Grant", provider: "Sports Authority Foundation",
        type: "Full Training Grant", amount: "₹5,00,000/year", sport: "Athletics",
        eligibility: "College-level gold medalist", deadline: "2026-05-15", status: "Open",
        description: "Comprehensive training grant covering coaching fees, accommodation, nutrition plan, sports science support, and competition travel for one year.",
        requirements: "Gold medal certificate, College letter, Fitness assessment report",
        image: "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3, title: "Young Cricketers Cash Sponsorship", provider: "CRED Sports Fund",
        type: "Cash Sponsorship", amount: "₹1,50,000", sport: "Cricket",
        eligibility: "State-level representation, Under 19", deadline: "2026-04-20", status: "Open",
        description: "One-time cash sponsorship for young cricketers to cover equipment, academy fees, and tournament participation costs.",
        requirements: "State selection letter, BCCI registration, Income certificate",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4, title: "Khelo India Athlete Support Scheme", provider: "Ministry of Youth Affairs",
        type: "Government Scheme", amount: "₹6,28,000/year", sport: "All Sports",
        eligibility: "Identified Khelo India athlete, National-level performance", deadline: "2026-07-31", status: "Open",
        description: "Government scheme providing annual financial assistance for training, competition, equipment, and education for identified athletes under the Khelo India program.",
        requirements: "Aadhaar, National ranking, SAI identification letter",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5, title: "Swimming Excellence Program", provider: "Speedo India Foundation",
        type: "Equipment + Stipend", amount: "₹1,80,000/year", sport: "Swimming",
        eligibility: "National-level swimmer, Age 14–22", deadline: "2026-05-01", status: "Closing Soon",
        description: "Premium swimwear, training equipment, monthly stipend, and access to international training camps for top swimmers.",
        requirements: "National timing certificates, Coach endorsement, Medical fitness report",
        image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6, title: "Rural Sports Talent Fund", provider: "Tata Trusts",
        type: "Full Training Grant", amount: "₹3,00,000/year", sport: "All Sports",
        eligibility: "Rural domicile, District-level participation, Family income < ₹5L", deadline: "2026-08-15", status: "Open",
        description: "Financial support for talented athletes from rural backgrounds covering training, equipment, travel, and nutrition supplements.",
        requirements: "Domicile certificate, Income proof, Sports participation records",
        image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=400&q=80"
    },
];

function getStatusColor(status) {
    if (status === "Open") return "bg-emerald-500/10 text-emerald-500";
    if (status === "Closing Soon") return "bg-amber-500/10 text-amber-500";
    if (status === "Applied") return "bg-blue-500/10 text-blue-400";
    return "bg-gray-500/10 text-gray-400";
}

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50";

const Funding = () => {
    const [typeFilter, setTypeFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [detailId, setDetailId] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [applications, setApplications] = useState([]);

    const filtered = useMemo(() => {
        return SPONSORSHIPS.filter((s) => {
            if (typeFilter !== "All" && s.type !== typeFilter) return false;
            if (searchQuery && !(s.title + " " + s.provider + " " + s.sport).toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [typeFilter, searchQuery]);

    const detailItem = detailId ? SPONSORSHIPS.find((s) => s.id === detailId) : null;
    const totalFunding = SPONSORSHIPS.reduce((sum, s) => {
        const num = parseInt(s.amount.replace(/[^\d]/g, ""));
        return sum + (num || 0);
    }, 0);

    const toggleBookmark = (id) => setBookmarks((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]);
    const applyFor = (id) => { if (!applications.includes(id)) setApplications((prev) => [...prev, id]); };

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-white/95 flex items-center gap-2">
                    <Wallet size={28} className="text-primary" />
                    Funding & Sponsorships
                </h1>
                <p className="text-sm text-gray-500 mt-1">Discover sponsorships, grants, and funding opportunities for your athletic career</p>
            </header>

            {/* Overview Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Available Programs</p>
                    <p className="text-2xl font-bold text-white mt-1">{SPONSORSHIPS.length}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">My Applications</p>
                    <p className="text-2xl font-bold text-white mt-1">{applications.length}</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-emerald-500/5 p-5">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Total Funded</p>
                    <p className="text-2xl font-bold text-white mt-1">₹0</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-primary/5 p-5">
                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Total Available</p>
                    <p className="text-2xl font-bold text-primary mt-1">₹{(totalFunding / 100000).toFixed(1)}L+</p>
                </div>
            </section>

            {/* Filters */}
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, provider, sport..."
                        className={inputClass + " pl-9"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {SPONSORSHIP_TYPES.map((t) => (
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
                <p className="text-xs text-gray-500">{filtered.length} programs found</p>
            </section>

            {/* Sponsorship Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((spon, i) => {
                    const applied = applications.includes(spon.id);
                    const bookmarked = bookmarks.includes(spon.id);
                    return (
                        <motion.div
                            key={spon.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden flex flex-col hover:border-primary/20 transition-all group"
                        >
                            <div className="h-36 relative overflow-hidden cursor-pointer" onClick={() => setDetailId(spon.id)}>
                                <img
                                    src={spon.image}
                                    alt={spon.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(applied ? "Applied" : spon.status)}`}>
                                        {applied ? "Applied" : spon.status}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleBookmark(spon.id); }}
                                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 text-gray-300 hover:text-primary"
                                >
                                    {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                                </button>
                                <div className="absolute bottom-3 left-3">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white backdrop-blur-sm">{spon.sport}</span>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-1">
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{spon.provider}</p>
                                <h3 className="font-semibold text-white text-sm mt-0.5 cursor-pointer hover:text-primary transition-colors" onClick={() => setDetailId(spon.id)}>
                                    {spon.title}
                                </h3>
                                <p className="text-xs text-gray-400 mt-2">{spon.eligibility}</p>

                                <div className="flex items-center justify-between mt-auto pt-4">
                                    <span className="text-sm font-semibold text-primary">{spon.amount}</span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12} /> {spon.deadline}</span>
                                </div>

                                <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                                    <button
                                        type="button"
                                        onClick={() => setDetailId(spon.id)}
                                        className="flex-1 py-2 rounded-lg border border-white/10 text-xs font-medium text-white/90 hover:bg-white/5"
                                    >
                                        View details
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFor(spon.id)}
                                        disabled={applied}
                                        className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-1"
                                    >
                                        {applied ? "Applied" : "Apply"} <ArrowUpRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </section>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-sm text-gray-500">No sponsorships match your filters.</div>
            )}

            {/* Community Crowdfunding CTA */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl shrink-0">
                    <Users size={24} />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-white text-sm">Community Crowdfunding</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Enable fans and supporters to contribute directly to your training journey.</p>
                </div>
                <button type="button" className="px-4 py-2.5 rounded-xl bg-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors">
                    Launch Campaign
                </button>
            </div>

            {/* Security footer */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-3">
                <ShieldCheck size={18} className="text-primary shrink-0" />
                <p className="text-xs text-gray-500">Your financial data is protected with end-to-end encryption. All payments are processed through verified channels.</p>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {detailItem && (
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
                            <div className="h-48 relative overflow-hidden rounded-t-2xl">
                                <img src={detailItem.image} alt={detailItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                                <button type="button" onClick={() => setDetailId(null)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/80">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 space-y-5 -mt-6 relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getStatusColor(applications.includes(detailItem.id) ? "Applied" : detailItem.status)}`}>
                                            {applications.includes(detailItem.id) ? "Applied" : detailItem.status}
                                        </span>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] text-gray-400">{detailItem.type}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white">{detailItem.title}</h2>
                                    <p className="text-xs text-gray-500 mt-1">by {detailItem.provider}</p>
                                </div>

                                <p className="text-sm text-gray-300">{detailItem.description}</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                        <p className="text-[10px] text-gray-500 uppercase">Amount</p>
                                        <p className="text-sm font-semibold text-primary mt-0.5">{detailItem.amount}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                        <p className="text-[10px] text-gray-500 uppercase">Sport</p>
                                        <p className="text-sm font-medium text-white mt-0.5">{detailItem.sport}</p>
                                    </div>
                                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                                        <p className="text-[10px] text-gray-500 uppercase">Deadline</p>
                                        <p className="text-sm font-medium text-white mt-0.5">{detailItem.deadline}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Eligibility</p>
                                    <p className="text-sm text-white/90">{detailItem.eligibility}</p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">Required Documents</p>
                                    <p className="text-sm text-white/90">{detailItem.requirements}</p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => toggleBookmark(detailItem.id)}
                                        className="py-2.5 px-4 rounded-lg border border-white/10 text-sm font-medium text-white/90 hover:bg-white/5 flex items-center gap-2"
                                    >
                                        {bookmarks.includes(detailItem.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                                        {bookmarks.includes(detailItem.id) ? "Saved" : "Save"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { applyFor(detailItem.id); setDetailId(null); }}
                                        disabled={applications.includes(detailItem.id)}
                                        className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {applications.includes(detailItem.id) ? "Already Applied" : "Apply Now"} <ArrowUpRight size={16} />
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

export default Funding;
