import { useState } from "react";
import { motion } from "framer-motion";
import {
    User, Bell, Shield, Eye,
    Globe, Smartphone, CreditCard,
    LogOut, ChevronRight, CheckCircle2,
    Target, Zap, MessageSquare, Briefcase
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("profile");

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const sections = [
        { id: "profile", label: "Identity Profile", icon: User },
        { id: "notifications", label: "Alert Configuration", icon: Bell },
        { id: "security", label: "Access Security", icon: Shield },
        { id: "discovery", label: "Discovery Visibility", icon: Eye },
        { id: "subscription", label: "Membership Tier", icon: CreditCard },
    ];

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Navigation */}
                <aside className="lg:w-80 space-y-2">
                    <div className="mb-10 px-4">
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Node <span className="text-primary NOT-italic">Settings</span></h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Configuring your digital hub</p>
                    </div>

                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${activeTab === section.id
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <section.icon size={20} className={activeTab === section.id ? "text-white" : "group-hover:text-primary transition-colors"} />
                            <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">{section.label}</span>
                        </button>
                    ))}

                    <div className="pt-10">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500/80 hover:text-red-500 hover:bg-red-500/5 transition-all group"
                        >
                            <LogOut size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1">
                    <div className="bg-black/40 border border-white/5 rounded-[3rem] p-10 min-h-[600px] relative overflow-hidden">
                        {/* Tab Content: Profile */}
                        {activeTab === "profile" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <div className="flex flex-col md:flex-row items-center gap-10 border-b border-white/5 pb-12">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-600 p-[1px] relative group cursor-pointer shadow-2xl shadow-primary/20">
                                        <div className="w-full h-full rounded-[2.5rem] bg-black flex items-center justify-center text-primary text-5xl font-black">
                                            {user?.displayName?.charAt(0) || "U"}
                                        </div>
                                        <div className="absolute inset-0 bg-black/60 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] font-black uppercase text-white tracking-widest">Update</span>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                                            <h2 className="text-3xl font-black text-white uppercase italic">{user?.displayName || "Explorer"}</h2>
                                            <CheckCircle2 size={20} className="text-primary" />
                                        </div>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-4">Node Identity: {user?.uid?.slice(0, 8)}...</p>
                                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                            <span className="px-5 py-2 bg-primary/10 border border-primary/20 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2">
                                                <Target size={12} /> Sponsor Type
                                            </span>
                                            <span className="px-5 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2">
                                                <Globe size={12} /> Global Discovery
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 italic underline">Node Label (Name)</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.displayName || ""}
                                            placeholder="Enter your name"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-primary/50 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2 italic underline">Digital Node (Email)</label>
                                        <input
                                            type="email"
                                            defaultValue={user?.email || ""}
                                            disabled
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-gray-600 font-bold cursor-not-allowed uppercase tracking-widest text-[11px]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:text-primary transition-all">
                                            <Shield size={60} />
                                        </div>
                                        <h4 className="text-lg font-black text-white uppercase italic mb-2">Security Hash</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-8">Maintain your encryption keys & session history.</p>
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary pb-0.5">
                                            Update Keys <ChevronRight size={14} />
                                        </button>
                                    </div>
                                    <div className="p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem]">
                                        <Zap size={24} className="text-primary mb-4 animate-pulse" />
                                        <h4 className="text-lg font-black text-white uppercase italic mb-2">Sync Identity</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-8">Propagate your status across all discovery nodes.</p>
                                        <button className="w-full py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">
                                            Propagate Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Other Taps: Notification / Discovery / Membership - simplified placeholder */}
                        {activeTab !== "profile" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-20"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-10">
                                    <Settings size={40} className="animate-spin-slow" />
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase italic mb-4">Module Hub <span className="text-primary NOT-italic">Config</span></h2>
                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.3em] max-w-md">
                                    You are accessing a high-priority system node. Specifically requested for {activeTab?.toUpperCase()} operations.
                                </p>
                                <button className="mt-12 px-10 py-4 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-white hover:border-primary transition-all">
                                    Initialize Parameters
                                </button>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
