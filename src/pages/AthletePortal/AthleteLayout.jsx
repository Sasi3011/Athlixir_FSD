import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, User, Activity, Flame, Trophy,
    Briefcase, GraduationCap, Calendar, MessageSquare,
    DollarSign, Settings, LogOut, Search, Bell, Menu, X,
    CheckCircle2, ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_LINKS = [
    { name: "Dashboard", href: "/athlete/dashboard", icon: LayoutDashboard },
    { name: "My Profile", href: "/athlete/profile", icon: User },
    { name: "Performance Log", href: "/athlete/performance", icon: Activity },
    { name: "Injury & Recovery", href: "/athlete/injury", icon: Flame },
    { name: "Leaderboard", href: "/athlete/leaderboard", icon: Trophy },
    { name: "Opportunities", href: "/athlete/opportunities", icon: Briefcase },
    { name: "Academy Locator", href: "/athlete/academies", icon: GraduationCap },
    { name: "Events", href: "/athlete/events", icon: Calendar },
    { name: "Messages", href: "/athlete/messages", icon: MessageSquare },
    { name: "Sponsorship / Funding", href: "/athlete/funding", icon: DollarSign },
    { name: "Settings", href: "/athlete/settings", icon: Settings },
];

const AthleteLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Get user role/data from localStorage or auth
    const userRole = user ? localStorage.getItem(`role_${user.uid}`) || 'athlete' : 'athlete';

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:flex flex-col bg-black/40 border-r border-white/5 transition-all duration-300 relative ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-8 z-50 w-6 h-6 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/30 border-2 border-[#050505]"
                    title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <ChevronRight
                        size={14}
                        className={`text-black transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                <div className="p-6 flex items-center gap-3">
                    <Logo iconOnly={!isSidebarOpen} className="scale-90" />
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-hide">
                    {SIDEBAR_LINKS.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                title={!isSidebarOpen ? link.name : ''}
                            >
                                <link.icon size={20} className={isActive ? "text-white" : "group-hover:text-primary transition-colors"} />
                                {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-wider whitespace-nowrap">{link.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full text-gray-500 hover:text-red-500 transition-colors group"
                        title={!isSidebarOpen ? "Sign Out" : ''}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Navbar */}
                <header className="h-20 bg-black/20 border-b border-white/5 flex items-center justify-between px-6 lg:px-10 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-gray-400 hover:text-white p-2 bg-white/5 rounded-xl border border-white/10"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="relative group hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search Ecosystem..."
                                className="bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-6 w-80 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#050505]"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black uppercase tracking-wider text-white leading-tight">
                                    {user?.displayName || "Athlete ID"}
                                </p>
                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                    <CheckCircle2 size={10} className="text-primary" />
                                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none">Verified {userRole}</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 p-[1px]">
                                <div className="w-full h-full rounded-xl bg-black flex items-center justify-center text-primary font-black uppercase overflow-hidden border border-white/10 shadow-lg">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Outlet */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-y-0 left-0 w-[280px] bg-[#050505] border-r border-white/10 flex flex-col p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <Logo className="scale-75" />
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
                                {SIDEBAR_LINKS.map((link) => {
                                    const isActive = location.pathname === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${isActive
                                                ? "bg-primary text-white"
                                                : "text-gray-400 hover:text-white"
                                                }`}
                                        >
                                            <link.icon size={20} />
                                            <span className="text-sm font-bold uppercase tracking-wider">{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 px-4 py-4 w-full text-red-500/80 hover:text-red-500 border-t border-white/10 mt-6"
                            >
                                <LogOut size={20} />
                                <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>
                            </button>
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AthleteLayout;
