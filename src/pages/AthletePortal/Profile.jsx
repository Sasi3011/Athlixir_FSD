import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    User, Mail, MapPin, Award, ShieldCheck,
    Upload, Eye, EyeOff, Save, Globe, Trophy,
    ChevronRight, CheckCircle2, Plus, Calendar
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { user } = useAuth();
    const [isPublic, setIsPublic] = useState(true);
    const [profile, setProfile] = useState({
        displayName: user?.displayName || "",
        age: "19",
        gender: "Male",
        sport: "Football",
        level: "College / Semi-Pro",
        location: "Chennai, India",
        bio: "Elite football player with high-intensity focus. Currently playing for University Blue Team. Scouting for professional opportunities.",
        achievements: [
            { id: 1, title: "Best Striker", tournament: "State Inter-College", year: "2024", position: "1st" },
            { id: 2, title: "District MVP", tournament: "District Finals", year: "2023", position: "Winner" }
        ]
    });

    const handleSave = () => {
        // Mock save to local storage
        localStorage.setItem(`profile_${user?.uid}`, JSON.stringify(profile));
        alert("Profile synchronized with Athlixir Cloud!");
    };

    return (
        <div className="space-y-10 pb-20 max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-orange-600/10 blur-[100px] -z-10 rounded-full"></div>

                <div className="flex flex-col md:flex-row items-center gap-10 bg-black/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] relative z-10">
                    <div className="relative">
                        <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-600 p-[3px] shadow-2xl">
                            <div className="w-full h-full rounded-[2.5rem] bg-[#050505] flex items-center justify-center overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-6xl font-black text-primary italic uppercase">{user?.displayName?.charAt(0) || 'A'}</span>
                                )}
                            </div>
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl border-4 border-[#050505] hover:bg-orange-600 transition-all shadow-xl">
                            <Upload size={18} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                            <h1 className="text-4xl font-black uppercase tracking-tight text-white">{profile.displayName}</h1>
                            <CheckCircle2 size={24} className="text-primary" />
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-6">
                            <span className="flex items-center gap-1.5"><Trophy size={14} className="text-primary" /> Elite Athlete</span>
                            <span className="px-1.5 opacity-30">|</span>
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> {profile.location}</span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sport</span>
                                <span className="text-xs font-bold text-white uppercase">{profile.sport}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Level</span>
                                <span className="text-xs font-bold text-white uppercase">{profile.level}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl min-w-[180px]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Visibility</span>
                            {isPublic ? <Eye size={16} className="text-green-500" /> : <EyeOff size={16} className="text-orange-500" />}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white">{isPublic ? "Public" : "Private"}</span>
                            <div
                                onClick={() => setIsPublic(!isPublic)}
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isPublic ? "bg-primary" : "bg-white/10"}`}
                            >
                                <motion.div
                                    className="w-4 h-4 bg-white rounded-full"
                                    animate={{ x: isPublic ? 24 : 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Information Sections */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Bio Section */}
                    <section className="bg-black/40 border border-white/5 p-10 rounded-[2.5rem]">
                        <h2 className="text-xl font-black uppercase tracking-tight text-white mb-6 flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                            Athlete Biography
                        </h2>
                        <textarea
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 font-medium leading-relaxed outline-none focus:border-primary/50 transition-all resize-none h-40"
                        />
                    </section>

                    {/* Achievements */}
                    <section className="bg-black/40 border border-white/5 p-10 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                                Hall of Fame
                            </h2>
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:underline transition-all">
                                <Plus size={14} /> Add Achievement
                            </button>
                        </div>
                        <div className="space-y-4">
                            {profile.achievements.map((ach) => (
                                <div key={ach.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                                            <Award size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-white uppercase mb-1">{ach.title}</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">{ach.tournament} • {ach.year}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-white italic">{ach.position}</span>
                                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-0.5">Rank</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Basic Info Details */}
                    <section className="bg-black/40 border border-white/5 p-10 rounded-[2.5rem]">
                        <h2 className="text-xl font-black uppercase tracking-tight text-white mb-8">Baseline Stats</h2>
                        <div className="space-y-6">
                            {[
                                { label: "Full Identity", value: profile.displayName, icon: User },
                                { label: "Age Group", value: profile.age, icon: Calendar },
                                { label: "Gender Profile", value: profile.gender, icon: User },
                                { label: "Base Location", value: profile.location, icon: MapPin },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <item.icon size={12} /> {item.label}
                                    </span>
                                    <input
                                        type="text"
                                        value={item.value}
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white w-full outline-none focus:border-primary/50"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certificate Upload */}
                    <section className="bg-orange-600 border border-orange-500 p-10 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                        <ShieldCheck size={40} className="text-white mb-6 relative z-10" />
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 relative z-10">Verification Hub</h3>
                        <p className="text-xs font-bold text-white/80 uppercase tracking-widest leading-relaxed mb-8 relative z-10">
                            Upload your state or national certificates to receive the <span className="underline italic">Ecosystem Gold Badge</span>.
                        </p>
                        <button className="w-full py-4 bg-white text-orange-600 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all relative z-10">
                            Launch Vault
                        </button>
                    </section>

                    {/* Action Panel */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:bg-orange-600 transition-all"
                        >
                            <Save size={16} /> Save Changes
                        </button>
                        <button className="w-16 h-16 bg-white/5 border border-white/10 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all group">
                            <Globe size={24} className="group-hover:text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
