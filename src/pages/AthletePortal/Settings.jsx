import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, User, Lock, Bell, Shield, LogOut, ChevronRight,
    Eye, EyeOff, Smartphone, Globe, Mail, Palette, Monitor, Sun,
    Camera, Save, Key, ToggleLeft, ToggleRight, Trash2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const inputClass = "w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/50 transition-colors";
const labelClass = "block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5";

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Profile");
    const [showPassword, setShowPassword] = useState(false);

    // Toggle states for notifications & privacy
    const [notifSettings, setNotifSettings] = useState({
        email: true, push: true, sms: false,
        eventReminders: true, performanceAlerts: true,
        coachMessages: true, opportunityUpdates: true,
        injuryAlerts: true, weeklyReport: false,
    });

    const [privacySettings, setPrivacySettings] = useState({
        profilePublic: true, showPerformance: true,
        showInjuryHistory: false, allowCoachAccess: true,
        allowScoutView: true, showInLeaderboard: true,
    });

    const toggleNotif = (key) => setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    const togglePrivacy = (key) => setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));

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

    const ToggleSwitch = ({ enabled, onToggle }) => (
        <button type="button" onClick={onToggle} className={`relative w-10 h-5.5 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-white/10"}`}>
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
        </button>
    );

    const SettingRow = ({ icon: Icon, title, description, action }) => (
        <div className="flex items-center justify-between py-4 border-b border-white/[0.04] last:border-b-0">
            <div className="flex items-center gap-3">
                {Icon && <div className="p-2 rounded-lg bg-white/[0.04] text-gray-400"><Icon size={16} /></div>}
                <div>
                    <p className="text-sm font-medium text-white/90">{title}</p>
                    {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
                </div>
            </div>
            {action}
        </div>
    );

    return (
        <div className="space-y-8 pb-12 max-w-6xl mx-auto">
            <header>
                <h1 className="text-2xl font-bold text-white/95 flex items-center gap-2">
                    <Settings size={28} className="text-primary" />
                    Settings
                </h1>
                <p className="text-sm text-gray-500 mt-1">Manage your account, security, notifications, and preferences</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full lg:w-56 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.name
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.name}
                        </button>
                    ))}

                    <div className="pt-4 mt-4 border-t border-white/[0.06]">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-colors"
                        >
                            <LogOut size={16} />
                            Log out
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                    <AnimatePresence mode="wait">
                        {/* PROFILE TAB */}
                        {activeTab === "Profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Profile Information</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Update your personal details and public profile</p>
                                </div>

                                {/* Avatar */}
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-lg font-bold">
                                        {(user?.displayName || "S")[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{user?.displayName || "Athlete"}</p>
                                        <button type="button" className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5">
                                            <Camera size={12} /> Change photo
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className={labelClass}>Full Name</label>
                                        <input type="text" defaultValue={user?.displayName || ""} className={inputClass} placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Email</label>
                                        <div className="relative">
                                            <input type="email" defaultValue={user?.email || ""} disabled className={inputClass + " text-gray-500 cursor-not-allowed"} />
                                            <Shield size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Phone Number</label>
                                        <input type="tel" className={inputClass} placeholder="+91 98765 43210" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Date of Birth</label>
                                        <input type="date" className={inputClass} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClass}>Bio</label>
                                        <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Write a short bio about yourself..." />
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Globe size={18} className="text-primary" />
                                        <div>
                                            <p className="text-sm font-medium text-white">Public Profile</p>
                                            <p className="text-xs text-gray-500">Manage how your profile appears to scouts and coaches</p>
                                        </div>
                                    </div>
                                    <button type="button" className="px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-white/90 hover:bg-white/10">
                                        Edit Public Profile
                                    </button>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button type="button" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
                                        <Save size={16} /> Save Changes
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === "Security" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Security</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Manage your password, two-factor authentication, and sessions</p>
                                </div>

                                {/* Change password */}
                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Key size={16} className="text-primary" />
                                        <h3 className="text-sm font-semibold text-white">Change Password</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Current Password</label>
                                            <div className="relative">
                                                <input type={showPassword ? "text" : "password"} className={inputClass} placeholder="••••••••" />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClass}>New Password</label>
                                            <input type="password" className={inputClass} placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="button" className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-white/90 hover:bg-white/10">
                                            Update Password
                                        </button>
                                    </div>
                                </div>

                                <SettingRow
                                    icon={Smartphone}
                                    title="Two-Factor Authentication"
                                    description="Add an extra layer of security to your account"
                                    action={
                                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-medium">Enabled</span>
                                    }
                                />

                                <SettingRow
                                    icon={Monitor}
                                    title="Active Sessions"
                                    description="You're logged in on 1 device"
                                    action={
                                        <button type="button" className="text-xs text-primary font-medium hover:underline">Manage</button>
                                    }
                                />

                                <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-red-400">Delete Account</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data</p>
                                    </div>
                                    <button type="button" className="px-3 py-2 rounded-lg border border-red-500/20 text-xs font-medium text-red-400 hover:bg-red-500/10 flex items-center gap-1">
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* NOTIFICATIONS TAB */}
                        {activeTab === "Notifications" && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Notifications</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Choose how and when you'd like to be notified</p>
                                </div>

                                {/* Channels */}
                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Notification Channels</p>
                                    <SettingRow icon={Mail} title="Email Notifications" description="Receive updates via email" action={<ToggleSwitch enabled={notifSettings.email} onToggle={() => toggleNotif("email")} />} />
                                    <SettingRow icon={Bell} title="Push Notifications" description="Browser and mobile push alerts" action={<ToggleSwitch enabled={notifSettings.push} onToggle={() => toggleNotif("push")} />} />
                                    <SettingRow icon={Smartphone} title="SMS Notifications" description="Text messages for critical alerts" action={<ToggleSwitch enabled={notifSettings.sms} onToggle={() => toggleNotif("sms")} />} />
                                </div>

                                {/* Alert Types */}
                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Alert Preferences</p>
                                    <SettingRow title="Event Reminders" description="Reminders for upcoming events and deadlines" action={<ToggleSwitch enabled={notifSettings.eventReminders} onToggle={() => toggleNotif("eventReminders")} />} />
                                    <SettingRow title="Performance Alerts" description="Notifications on performance score changes" action={<ToggleSwitch enabled={notifSettings.performanceAlerts} onToggle={() => toggleNotif("performanceAlerts")} />} />
                                    <SettingRow title="Coach Messages" description="Real-time alerts for messages from coaches" action={<ToggleSwitch enabled={notifSettings.coachMessages} onToggle={() => toggleNotif("coachMessages")} />} />
                                    <SettingRow title="Opportunity Updates" description="New scholarships, trials, and grants" action={<ToggleSwitch enabled={notifSettings.opportunityUpdates} onToggle={() => toggleNotif("opportunityUpdates")} />} />
                                    <SettingRow title="Injury Alerts" description="Recovery progress and risk warnings" action={<ToggleSwitch enabled={notifSettings.injuryAlerts} onToggle={() => toggleNotif("injuryAlerts")} />} />
                                    <SettingRow title="Weekly Report" description="Summary of your weekly performance" action={<ToggleSwitch enabled={notifSettings.weeklyReport} onToggle={() => toggleNotif("weeklyReport")} />} />
                                </div>

                                <div className="flex justify-end">
                                    <button type="button" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
                                        <Save size={16} /> Save Preferences
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* PRIVACY TAB */}
                        {activeTab === "Privacy" && (
                            <motion.div
                                key="privacy"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Privacy</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Control who can see your profile and data</p>
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Profile Visibility</p>
                                    <SettingRow title="Public Profile" description="Allow anyone to view your profile" action={<ToggleSwitch enabled={privacySettings.profilePublic} onToggle={() => togglePrivacy("profilePublic")} />} />
                                    <SettingRow title="Show Performance Data" description="Display stats and scores publicly" action={<ToggleSwitch enabled={privacySettings.showPerformance} onToggle={() => togglePrivacy("showPerformance")} />} />
                                    <SettingRow title="Show Injury History" description="Let others see your injury records" action={<ToggleSwitch enabled={privacySettings.showInjuryHistory} onToggle={() => togglePrivacy("showInjuryHistory")} />} />
                                    <SettingRow title="Show in Leaderboard" description="Appear in public leaderboard rankings" action={<ToggleSwitch enabled={privacySettings.showInLeaderboard} onToggle={() => togglePrivacy("showInLeaderboard")} />} />
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 space-y-1">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Access Permissions</p>
                                    <SettingRow title="Coach Access" description="Allow assigned coaches to view your data" action={<ToggleSwitch enabled={privacySettings.allowCoachAccess} onToggle={() => togglePrivacy("allowCoachAccess")} />} />
                                    <SettingRow title="Scout Visibility" description="Allow scouts to discover and view your profile" action={<ToggleSwitch enabled={privacySettings.allowScoutView} onToggle={() => togglePrivacy("allowScoutView")} />} />
                                </div>

                                <div className="flex justify-end">
                                    <button type="button" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 flex items-center gap-2">
                                        <Save size={16} /> Save Privacy Settings
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* APPEARANCE TAB */}
                        {activeTab === "Appearance" && (
                            <motion.div
                                key="appearance"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Appearance</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Customize the look and feel of your dashboard</p>
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Theme</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-5 text-center cursor-pointer">
                                            <Monitor size={28} className="mx-auto text-primary mb-3" />
                                            <p className="text-sm font-medium text-white">Dark</p>
                                            <p className="text-[10px] text-primary mt-0.5">Active</p>
                                        </div>
                                        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 text-center cursor-pointer opacity-50">
                                            <Sun size={28} className="mx-auto text-gray-500 mb-3" />
                                            <p className="text-sm font-medium text-gray-400">Light</p>
                                            <p className="text-[10px] text-gray-600 mt-0.5">Coming soon</p>
                                        </div>
                                        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 text-center cursor-pointer opacity-50">
                                            <Palette size={28} className="mx-auto text-gray-500 mb-3" />
                                            <p className="text-sm font-medium text-gray-400">System</p>
                                            <p className="text-[10px] text-gray-600 mt-0.5">Coming soon</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Accent Color</p>
                                    <div className="flex gap-3">
                                        {[
                                            { color: "bg-orange-500", label: "Orange", active: true },
                                            { color: "bg-blue-500", label: "Blue", active: false },
                                            { color: "bg-emerald-500", label: "Green", active: false },
                                            { color: "bg-purple-500", label: "Purple", active: false },
                                            { color: "bg-red-500", label: "Red", active: false },
                                        ].map((c) => (
                                            <button
                                                key={c.label}
                                                type="button"
                                                className={`w-8 h-8 rounded-full ${c.color} ${c.active ? "ring-2 ring-offset-2 ring-offset-[#0a0a0a] ring-white" : "opacity-40 hover:opacity-70"} transition-all`}
                                                title={c.label}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
