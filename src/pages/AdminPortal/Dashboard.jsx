import { motion } from "framer-motion";
import { Users, UserCheck, Briefcase, GraduationCap, Calendar, AlertTriangle, TrendingUp, Activity } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-white`}>
                <Icon size={24} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend > 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                    <TrendingUp size={12} />
                    {trend}%
                </div>
            )}
        </div>
        <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
    </div>
);

const Dashboard = () => {
    // Dummy Data
    const stats = [
        { title: "Total Athletes", value: "1,248", icon: Users, color: "bg-blue-500", trend: 12 },
        { title: "Total Coaches", value: "356", icon: Briefcase, color: "bg-purple-500", trend: 5 },
        { title: "Total Academies", value: "89", icon: GraduationCap, color: "bg-orange-500", trend: 8 },
        { title: "Active Users", value: "892", icon: Activity, color: "bg-green-500", trend: 15 },
        { title: "Pending Verifications", value: "42", icon: UserCheck, color: "bg-yellow-500", trend: -2 },
        { title: "Reported Content", value: "15", icon: AlertTriangle, color: "bg-red-500", trend: 0 },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Admin Dashboard</h1>
                <p className="text-gray-400">Overview of platform activity and system health.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>

            {/* Charts Section (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-[400px]">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">User Growth</h3>
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                        [User Growth Chart Placeholder]
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-[400px]">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Active Sessions</h3>
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                        [Active Sessions Chart Placeholder]
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-[400px]">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Opportunity Trends</h3>
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                        [Opportunity Trends Chart Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
