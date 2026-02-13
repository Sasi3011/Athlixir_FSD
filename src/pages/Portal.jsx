import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, User, LogOut, Settings, Bell, Calendar, Trophy, Target, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Portal = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Retrieve role from localStorage (fallback to 'Athlete' for existing users)
    const userRole = user ? localStorage.getItem(`role_${user.uid}`) || 'athlete' : 'athlete';

    const getRoleIcon = () => {
        switch (userRole) {
            case 'coach': return <Target size={14} className="text-primary" />;
            case 'user': return <Users size={14} className="text-primary" />;
            default: return <Trophy size={14} className="text-primary" />;
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black/40 border-r border-white/5 p-6 hidden lg:flex flex-col">
                <div className="mb-10 px-2">
                    <h2 className="text-2xl font-black tracking-tighter text-primary italic uppercase">Athlixir</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">Platform Portal</p>
                </div>

                {/* Profile Brief in Sidebar */}
                <div className="mb-10 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black border border-primary/20">
                            {user?.displayName?.charAt(0) || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-black truncate uppercase tracking-tight">{user?.displayName || 'Identity'}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                {getRoleIcon()}
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{userRole}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { icon: LayoutDashboard, label: "Dashboard", active: true },
                        { icon: User, label: "Profile" },
                        { icon: Calendar, label: "Schedule" },
                        { icon: Bell, label: "Notifications" },
                        { icon: Settings, label: "Settings" },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${item.active
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-red-500 transition-colors mt-auto border-t border-white/5 pt-6"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-bold uppercase tracking-wider">Logout Gate</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                {getRoleIcon()}
                                {userRole} Account
                            </span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tight">Welcome, <span className="text-primary italic">{user?.displayName || 'Athlete'}</span></h1>
                        <p className="text-gray-400 mt-1 uppercase text-xs font-bold tracking-widest">Active Session ID: <span className="text-white">AZ-82148</span></p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder Cards */}
                    {[
                        { title: "Performance Metrics", value: "94%", detail: "+12% this month", color: "text-primary" },
                        { title: "Training Hours", value: "128h", detail: "Last 30 days", color: "text-blue-500" },
                        { title: "Identity Status", value: "Verified", detail: "Level 2 Access", color: "text-green-500" }
                    ].map((card, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={i}
                            className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:border-primary/30 transition-all group"
                        >
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">{card.title}</h3>
                            <div className={`text-5xl font-black mb-2 tracking-tighter ${card.color}`}>{card.value}</div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{card.detail}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 bg-white/5 border border-white/10 rounded-[3rem] p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full transition-all group-hover:bg-primary/20" />
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Ecosystem Analytics</h2>
                    <p className="text-gray-400 max-w-xl text-sm leading-relaxed mb-8">
                        Your {userRole} profile is being processed through our AI engine. Verified data points are being synced with scout networks across the platform.
                    </p>
                    <button className="px-8 py-4 bg-primary text-white font-bold rounded-full text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all">
                        View Full Report
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Portal;
