import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, User, Lock, Bell, Shield,
    LogOut, ChevronRight, Eye, Smartphone,
    Globe, Mail, Palette, Monitor, Zap
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Profile");

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const tabs = [
        { name: "Profile", icon: User },
        { name: "Security", icon: Lock },
        { name: "Notifications", icon: Bell },
        { name: "Privacy", icon: Shield },
        { name: "Appearance", icon: Palette },
    ];

    return (
        <div className="space-y-10 pb-20 max-w-6xl mx-auto">
            <header className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-primary/10 text-primary rounded-3xl animate-pulse">
                    <Settings size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white italic">Control Center</h1>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[.3em]">Configure your ecosystem identity</p>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Nav */}
                <div className="w-full lg:w-72 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all group ${activeTab === tab.name
                                ? "bg-primary border-primary text-white shadow-xl shadow-primary/20"
                                : "bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <tab.icon size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">{tab.name}</span>
                            </div>
                            <ChevronRight size={14} className={`transition-transform duration-300 ${activeTab === tab.name ? "rotate-90 translate-x-1" : "group-hover:translate-x-1"}`} />
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all mt-10 group"
                    >
                        <LogOut size={18} className="group-hover:translate-x-1 transition-all" />
                        <span className="text-xs font-black uppercase tracking-widest">Destroy Session</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-black/40 border border-white/5 rounded-[3rem] p-10 backdrop-blur-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -mr-48 -mt-48 rounded-full"></div>

                    <AnimatePresence mode="wait">
                        {activeTab === "Profile" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 relative z-10"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">Identity Metadata</h2>
                                    <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">AGENT_ID: 82148</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Ecosystem Name</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.displayName || "Sasi Kiran"}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-primary/50 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Verified Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                defaultValue={user?.email || "sasi@athlixir.com"}
                                                disabled
                                                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-gray-600 font-bold outline-none text-sm cursor-not-allowed"
                                            />
                                            <Shield className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                        </div>
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">About Identity</label>
                                        <textarea
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-medium outline-none focus:border-primary/50 transition-all text-sm resize-none h-32"
                                            placeholder="Write your brief..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-primary/20 text-primary rounded-2xl">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white uppercase italic">Digital Presence</h4>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest">Control how you appear across global scout networks.</p>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-primary text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg">Manage Links</button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "Security" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 relative z-10"
                            >
                                <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">Pass Key Protocols</h2>
                                <div className="space-y-6">
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-white/20 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="p-4 bg-white/5 text-gray-500 rounded-2xl group-hover:text-primary transition-colors">
                                                <Lock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-white uppercase italic">Access Password</h4>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest italic">Last rotated 45 days ago</p>
                                            </div>
                                        </div>
                                        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">Update Pass Key</button>
                                    </div>

                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-white/20 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="p-4 bg-white/5 text-gray-500 rounded-2xl group-hover:text-primary transition-colors">
                                                <Smartphone size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-white uppercase italic">Identity Verification (2FA)</h4>
                                                <p className="text-[10px] text-primary font-black uppercase mt-1 tracking-widest">ACTIVE PROTECTED</p>
                                            </div>
                                        </div>
                                        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">Disable MFA</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "Appearance" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10 relative z-10"
                            >
                                <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">Visual Experience</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-primary/10 border-2 border-primary/30 rounded-[2.5rem] text-center">
                                        <Monitor size={40} className="mx-auto text-primary mb-6" />
                                        <h4 className="text-sm font-black text-white uppercase italic mb-2 tracking-widest">Dark Cinematic</h4>
                                        <p className="text-[9px] text-primary font-black uppercase tracking-widest">Current active theme</p>
                                    </div>
                                    <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] text-center opacity-40">
                                        <Zap size={40} className="mx-auto text-gray-600 mb-6" />
                                        <h4 className="text-sm font-black text-gray-500 uppercase italic mb-2 tracking-widest">Performance Light</h4>
                                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Locked Level 5</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Global Save Button */}
                    <div className="mt-16 pt-10 border-t border-white/5 flex justify-end">
                        <button className="px-10 py-5 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:bg-orange-600 hover:scale-[1.02] active:scale-95 transition-all">
                            Synchronize Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
