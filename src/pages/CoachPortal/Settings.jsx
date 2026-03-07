import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, User, Lock, Bell, Shield,
    LogOut, ChevronRight, Eye, Smartphone,
    Globe, Mail, Palette, Monitor, Zap,
    Building, Target
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CoachSettings = () => {
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
        { name: "Preferences", icon: Globe },
    ];

    return (
        <div className="space-y-10 pb-20 max-w-6xl mx-auto">
            <header className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Settings size={28} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Settings</h1>
                    <p className="text-sm text-gray-500">Manage your profile and preferences</p>
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
                                <span className="text-sm font-medium">{tab.name}</span>
                            </div>
                            <ChevronRight size={14} className={`transition-transform duration-300 ${activeTab === tab.name ? "rotate-90 translate-x-1" : "group-hover:translate-x-1"}`} />
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all mt-10 group"
                    >
                        <LogOut size={18} className="group-hover:translate-x-1 transition-all" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-8 backdrop-blur-3xl relative overflow-hidden">
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
                                    <h2 className="text-2xl font-bold text-white">Profile</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs text-gray-500 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.displayName || "Coach Sasi"}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white text-sm outline-none focus:border-primary/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs text-gray-500 ml-1">Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                defaultValue={user?.email || "coach@athlixir.com"}
                                                disabled
                                                className="w-full bg-white/5 border border-white/5 rounded-xl p-3.5 text-gray-600 text-sm outline-none cursor-not-allowed"
                                            />
                                            <Shield className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs text-gray-500 ml-1">Academy</label>
                                        <div className="relative">
                                            <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                            <input
                                                type="text"
                                                defaultValue="Elite Sports Academy"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-white text-sm outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs text-gray-500 ml-1">Specialization</label>
                                        <div className="relative">
                                            <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                            <input
                                                type="text"
                                                defaultValue="Track & Field"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-9 pr-4 text-white text-sm outline-none focus:border-primary/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-xs text-gray-500 ml-1">Bio</label>
                                        <textarea
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-primary/50 transition-all resize-none h-28"
                                            placeholder="Describe your coaching philosophy and experience..."
                                        >Focused on building the next generation of Olympic sprinters through data-driven training methodologies.</textarea>
                                    </div>
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
                                <h2 className="text-2xl font-bold text-white">Security</h2>
                                <div className="space-y-4">
                                    <div className="p-5 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/5 text-gray-500 rounded-lg group-hover:text-primary transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-white">Password</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">Last updated 30 days ago</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:border-primary/50 transition-all">Change</button>
                                    </div>

                                    <div className="p-5 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/5 text-gray-500 rounded-lg group-hover:text-primary transition-colors">
                                                <Smartphone size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                                                <p className="text-xs text-green-400 mt-0.5">Active</p>
                                            </div>
                                        </div>
                                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-medium hover:border-primary/50 transition-all">Configure</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "Preferences" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 relative z-10"
                            >
                                <h2 className="text-2xl font-bold text-white">Integrations</h2>
                                <div className="p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center">
                                    <Globe size={40} className="mx-auto text-primary mb-5" />
                                    <h4 className="text-lg font-semibold text-white mb-3">Discovery Network</h4>
                                    <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto leading-relaxed">
                                        Syncing your coach profile with scout agencies helps your athletes get discovered faster.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {['ScoutWire', 'TalentX', 'EuroTrack', 'IndiaSports'].map(n => (
                                            <div key={n} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
                                                {n} Linked
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Global Save Button */}
                    <div className="mt-10 pt-6 border-t border-white/5 flex justify-end">
                        <button className="px-8 py-3 bg-primary text-white font-medium rounded-xl text-sm shadow-xl shadow-primary/20 hover:bg-orange-600 active:scale-95 transition-all">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachSettings;
