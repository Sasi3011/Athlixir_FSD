import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, Plus, Users, Search, X, Save,
    Clock, ChevronRight, Globe, Award, Target,
    ExternalLink, Filter, CheckCircle2
} from "lucide-react";

const OpportunitiesPosted = () => {
    const [showPostModal, setShowPostModal] = useState(false);
    const [selectedOpp, setSelectedOpp] = useState(null);

    const opportunities = [
        { id: 1, title: "Elite Sprinting Trial 2026", type: "Trial", deadline: "Feb 28, 2026", applicants: 45, status: "Active" },
        { id: 2, title: "High Altitude Selection Camp", type: "Camp", deadline: "Mar 15, 2026", applicants: 22, status: "Reviewing" },
        { id: 3, title: "Summer Scholarship Program", type: "Scholarship", deadline: "Apr 05, 2026", applicants: 124, status: "Active" },
    ];

    const applicants = [
        { id: 1, name: "Rahul Sharma", score: 92, status: "Shortlisted" },
        { id: 2, name: "Priya Mani", score: 88, status: "Under Review" },
        { id: 3, name: "Arjun Kumar", score: 85, status: "Under Review" },
        { id: 4, name: "Sneha Reddy", score: 79, status: "Rejected" },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Opportunities</h1>
                    <p className="text-sm text-gray-500">Manage posted trials, camps, and scholarships</p>
                </div>
                <button
                    onClick={() => setShowPostModal(true)}
                    className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                    <Plus size={16} /> Post Opportunity
                </button>
            </div>

            {/* Opportunities Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: List of Posted Opps */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-5">
                        <Target size={14} className="text-primary" /> Posted Opportunities
                    </h3>

                    {opportunities.map((opp, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={opp.id}
                            onClick={() => setSelectedOpp(opp)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group ${selectedOpp?.id === opp.id
                                    ? 'bg-primary/5 border-primary/30'
                                    : 'bg-white/[0.03] border-white/[0.06] hover:border-white/20'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs ${opp.type === 'Trial' ? 'bg-blue-500/10 text-blue-400' :
                                                opp.type === 'Camp' ? 'bg-purple-500/10 text-purple-400' :
                                                    'bg-orange-500/10 text-orange-400'
                                            }`}>
                                            {opp.type}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={10} /> {opp.deadline}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-medium text-white group-hover:text-primary transition-colors">{opp.title}</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <Users size={12} className="text-primary" />
                                            <span className="text-xs">{opp.applicants} Applicants</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${opp.status === 'Active' ? 'text-green-400' : 'text-orange-400'}`}>
                                            <CheckCircle2 size={12} />
                                            <span className="text-xs">{opp.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2.5 bg-white/5 rounded-xl text-gray-500 group-hover:text-primary transition-all">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Applicant Insights / Dynamic Panel */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col h-fit sticky top-10">
                    {selectedOpp ? (
                        <>
                            <div className="flex justify-between items-center mb-5">
                                <div>
                                    <p className="text-xs text-primary mb-0.5">Applicants</p>
                                    <h4 className="text-sm font-medium text-white">{selectedOpp.title.split(' ').slice(0, 3).join(' ')}...</h4>
                                </div>
                                <button className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all">
                                    <Filter size={18} />
                                </button>
                            </div>

                            <div className="flex-1 space-y-3">
                                {applicants.map((app, i) => (
                                    <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-medium border border-primary/10">
                                                {app.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{app.name}</div>
                                                <div className="text-xs text-gray-500">{app.score}/100</div>
                                            </div>
                                        </div>
                                        <div className={`px-2.5 py-0.5 rounded-full text-xs ${app.status === 'Shortlisted' ? 'bg-green-500/10 text-green-400' :
                                                app.status === 'Rejected' ? 'bg-red-500/10 text-red-400' :
                                                    'bg-blue-500/10 text-blue-400'
                                            }`}>
                                            {app.status}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-6 w-full py-3 bg-primary text-white font-medium rounded-xl text-sm shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                View All <ExternalLink size={13} />
                            </button>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 mb-5 border border-white/5">
                                <Users size={30} />
                            </div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">No opportunity selected</h4>
                            <p className="text-xs text-gray-600">Select an opportunity to see applicants.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Opportunity Modal */}
            <AnimatePresence>
                {showPostModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPostModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-xl bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 relative z-10"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Post Opportunity</h2>
                                    <p className="text-sm text-gray-500">Fill in the details below</p>
                                </div>
                                <button onClick={() => setShowPostModal(false)} className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-500">Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. National Selection Trial - U19"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 transition-all text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-500">Category</label>
                                        <div className="relative">
                                            <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={15} />
                                            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer">
                                                <option>Trial</option>
                                                <option>Selection Camp</option>
                                                <option>Scholarship</option>
                                                <option>Sponsorship</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-500">Deadline</label>
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-500">Description</label>
                                    <textarea
                                        placeholder="Outline requirements and performance benchmarks..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-all min-h-[100px]"
                                    />
                                </div>

                                <button className="w-full py-3.5 bg-primary text-white font-medium rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                                    Publish Opportunity
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OpportunitiesPosted;
