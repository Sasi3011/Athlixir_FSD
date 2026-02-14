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
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2 italic">Career <span className="text-primary NOT-italic">Gateways</span></h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Deploy trials & scholarships to the athlete ecosystem</p>
                </div>
                <button
                    onClick={() => setShowPostModal(true)}
                    className="px-8 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                    <Plus size={18} /> Deploy New Opportunity
                </button>
            </div>

            {/* Opportunities Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: List of Posted Opps */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-3 mb-8 italic">
                        <Target size={16} className="text-primary" /> Active Deployments
                    </h3>

                    {opportunities.map((opp, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={opp.id}
                            onClick={() => setSelectedOpp(opp)}
                            className={`p-8 rounded-[3rem] border transition-all cursor-pointer group relative overflow-hidden ${selectedOpp?.id === opp.id
                                    ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20 scale-[1.02]'
                                    : 'bg-black/40 border-white/5 hover:border-white/20'
                                }`}
                        >
                            <div className="flex justify-between items-start relative z-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${opp.type === 'Trial' ? 'bg-blue-500/10 text-blue-500' :
                                                opp.type === 'Camp' ? 'bg-purple-500/10 text-purple-500' :
                                                    'bg-orange-500/10 text-orange-500'
                                            }`}>
                                            {opp.type}
                                        </span>
                                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic flex items-center gap-2">
                                            <Clock size={10} /> Deadline: {opp.deadline}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{opp.title}</h4>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Users size={14} className="text-primary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{opp.applicants} Applicants</span>
                                        </div>
                                        <div className={`flex items-center gap-2 ${opp.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>
                                            <CheckCircle2 size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{opp.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary/20 group-hover:text-primary transition-all">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Applicant Insights / Dynamic Panel */}
                <div className="bg-black/40 border border-white/5 rounded-[3rem] p-10 flex flex-col h-fit sticky top-10">
                    {selectedOpp ? (
                        <>
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Applicant Monitor</h3>
                                    <h4 className="text-sm font-black text-white uppercase tracking-tight italic underline">{selectedOpp.title.split(' ')[0]}...</h4>
                                </div>
                                <button className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all">
                                    <Filter size={18} />
                                </button>
                            </div>

                            <div className="flex-1 space-y-4">
                                {applicants.map((app, i) => (
                                    <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-primary/20 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-orange-600/10 flex items-center justify-center text-primary text-xs font-black border border-primary/10">
                                                {app.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-[11px] font-black text-white hover:text-primary transition-colors uppercase">{app.name}</div>
                                                <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-0.5">Score: {app.score}/100</div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${app.status === 'Shortlisted' ? 'bg-green-500/10 text-green-500' :
                                                app.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {app.status}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-10 w-full py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                                View Full List <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-gray-600 mb-8 border border-white/5">
                                <Users size={40} />
                            </div>
                            <h4 className="text-sm font-black text-gray-500 uppercase tracking-tight mb-2">No Opportunity Selected</h4>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Select a deployment from the left to monitor incoming applicants.</p>
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
                            className="w-full max-w-2xl bg-[#080808] border border-white/10 rounded-[3rem] p-10 relative z-10 shadow-[0_0_100px_rgba(34,197,94,0.1)]"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-white uppercase tracking-tight italic">Post <span className="text-primary NOT-italic">Opportunity</span></h2>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Acquiring talent for the Athlixir ecosystem</p>
                                </div>
                                <button onClick={() => setShowPostModal(false)} className="p-3 bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Opportunity Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. National Selection Trial - U19"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-primary/50 transition-all font-bold"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Category</label>
                                        <div className="relative">
                                            <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none uppercase text-[10px] font-black tracking-widest cursor-pointer">
                                                <option>Trial</option>
                                                <option>Selection Camp</option>
                                                <option>Scholarship</option>
                                                <option>Sponsorship</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Submission Deadline</label>
                                        <input
                                            type="date"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all uppercase text-[10px] font-black"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Description & Requirements</label>
                                    <textarea
                                        placeholder="Outline specific performance benchmarks needed..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all min-h-[150px]"
                                    />
                                </div>

                                <button className="w-full py-5 bg-primary text-white font-black rounded-3xl text-sm uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-3 mt-4">
                                    <Globe size={20} /> Publish to Network
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
