import { useState } from "react";
import { motion } from "framer-motion";
import {
    GraduationCap, Search, MapPin, Phone,
    Star, Filter, Navigation, Globe,
    CheckCircle2, Info
} from "lucide-react";

const AcademyLocator = () => {
    const academies = [
        {
            id: 1,
            name: "Elite Football Nexus",
            location: "Velachery, Chennai",
            sport: "Football",
            rating: 4.8,
            reviews: 124,
            specialty: "Advanced Tactical Training",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80"
        },
        {
            id: 2,
            name: "Prime Titans Swimming",
            location: "MG Road, Pune",
            sport: "Swimming",
            rating: 4.9,
            reviews: 89,
            specialty: "Olympic Standard Coaching",
            image: "https://images.unsplash.com/photo-1530549387074-dcf00cc8b34c?auto=format&fit=crop&q=80"
        },
        {
            id: 3,
            name: "Apex Athletics Lab",
            location: "Whitefield, Bangalore",
            sport: "Athletics",
            rating: 4.7,
            reviews: 210,
            specialty: "Biomechanics & Speed",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Search Header */}
            <section className="bg-black/40 border border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] -mr-48 -mt-48 rounded-full"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <GraduationCap className="text-primary" size={32} />
                            <h1 className="text-3xl font-black uppercase tracking-tight text-white italic leading-none">Academy Locator</h1>
                        </div>
                        <p className="text-gray-400 text-sm font-medium max-w-xl leading-relaxed mb-8">
                            Discover verified training ecosystem nodes based on your current geographical identity. Advanced coaching, premium infrastructure, and scout-linked networks.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group/input">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-primary transition-all" size={18} />
                                <input
                                    type="text"
                                    placeholder="Select Sport (Football, Athletics...)"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white uppercase font-black tracking-widest outline-none focus:border-primary/50 transition-all"
                                />
                            </div>
                            <div className="relative group/input">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-primary transition-all" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by PIN or City..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white uppercase font-black tracking-widest outline-none focus:border-primary/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button className="px-10 py-6 bg-primary text-white font-black rounded-[2rem] text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:bg-orange-600 hover:scale-[1.02] transition-all flex items-center gap-4">
                        <Navigation size={20} /> Deploy Area Scan
                    </button>
                </div>
            </section>

            {/* Academy List */}
            <div className="grid grid-cols-1 gap-8">
                {academies.map((aca, i) => (
                    <motion.div
                        key={aca.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row hover:border-primary/30 transition-all group"
                    >
                        <div className="w-full lg:w-80 h-64 lg:h-auto relative overflow-hidden">
                            <img src={aca.image} alt={aca.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <span className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg">{aca.sport}</span>
                            </div>
                        </div>

                        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">{aca.name}</h3>
                                        <CheckCircle2 size={18} className="text-primary" />
                                    </div>
                                    <p className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                        <MapPin size={12} className="text-primary" /> {aca.location}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 text-yellow-500 rounded-xl border border-yellow-500/20">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-xs font-black">{aca.rating}</span>
                                    </div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">({aca.reviews} Verified Reviews)</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    Specialty: <span className="text-white font-black">{aca.specialty}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                                    Identity Link: <span className="text-white font-black">Full Digital Integration</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <button className="flex-1 lg:flex-none px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                    <Phone size={14} /> Contact Front Office
                                </button>
                                <button className="flex-1 lg:flex-none px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all flex items-center justify-center gap-3">
                                    <Globe size={14} /> Official Site
                                </button>
                                <button className="flex-1 lg:flex-none px-8 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all lg:ml-auto">
                                    Application Status
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Locator Support */}
                <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] flex items-center gap-6">
                    <div className="p-4 bg-blue-500/20 text-blue-500 rounded-2xl">
                        <Info size={24} />
                    </div>
                    <p className="text-xs font-bold text-blue-500/80 uppercase tracking-widest leading-relaxed">
                        Can't find your academy? Contact our ecosystem support to suggest a listing or register your training node.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AcademyLocator;
