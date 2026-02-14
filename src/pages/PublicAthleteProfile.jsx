import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    MapPin,
    Award,
    TrendingUp,
    Heart,
    Mail,
    Phone,
    Trophy,
    AlertCircle,
    DollarSign,
    Calendar,
    Activity
} from 'lucide-react';

/**
 * PublicAthleteProfile Component
 * Public-facing athlete profile for sponsors, scouts, and general viewing
 * This is what the world sees when discovering talent
 */
const PublicAthleteProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [athlete, setAthlete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching athlete data
        // TODO: Replace with actual API call
        setTimeout(() => {
            setAthlete({
                id,
                name: "Rajesh Kumar",
                profilePicture: "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=400",
                sport: "Cricket",
                level: "State Champion",
                age: 22,
                location: "Chennai, Tamil Nadu",
                verified: true,
                bio: "Passionate cricketer with 8 years of competitive experience. Specializing in fast bowling with a consistent record of wickets in state championships.",
                achievements: [
                    { title: "State Under-19 Champion", year: "2022" },
                    { title: "Best Bowler Award", year: "2023" },
                    { title: "Regional Tournament Winner", year: "2024" }
                ],
                stats: {
                    matchesPlayed: 145,
                    wickets: 289,
                    bestBowling: "7/23",
                    economy: "3.2"
                },
                injuryStatus: "Healthy - No current injuries",
                fundingRequest: {
                    active: true,
                    goal: "₹2,50,000",
                    purpose: "International coaching camp & equipment"
                },
                recentPerformance: [
                    { month: "Jan", value: 85 },
                    { month: "Feb", value: 88 },
                    { month: "Mar", value: 92 },
                    { month: "Apr", value: 90 }
                ]
            });
            setLoading(false);
        }, 800);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium">Loading athlete profile...</p>
                </div>
            </div>
        );
    }

    if (!athlete) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Athlete Not Found</h2>
                    <p className="text-gray-400 mb-6">The athlete profile you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Profile Picture */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <img
                                src={athlete.profilePicture}
                                alt={athlete.name}
                                className="w-48 h-48 rounded-3xl object-cover border-4 border-primary/20"
                            />
                            {athlete.verified && (
                                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-3 rounded-2xl shadow-lg">
                                    <Award size={24} />
                                </div>
                            )}
                        </motion.div>

                        {/* Basic Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-4xl font-black text-white mb-2">{athlete.name}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                        <span className="flex items-center gap-2">
                                            <Trophy className="text-primary" size={18} />
                                            {athlete.sport}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <MapPin className="text-primary" size={18} />
                                            {athlete.location}
                                        </span>
                                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
                                            {athlete.level}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-6">{athlete.bio}</p>

                            {/* Contact Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all">
                                    <Mail size={18} />
                                    Contact Athlete
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                                    <Heart size={18} />
                                    Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Achievements */}
                        <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                                <Award className="text-primary" size={24} />
                                Achievements
                            </h2>
                            <div className="space-y-4">
                                {athlete.achievements.map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                                <Trophy className="text-primary" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold">{achievement.title}</h3>
                                                <p className="text-gray-400 text-sm">{achievement.year}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Performance Summary */}
                        <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                                <TrendingUp className="text-primary" size={24} />
                                Performance Summary
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(athlete.stats).map(([key, value], index) => (
                                    <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </p>
                                        <p className="text-2xl font-black text-white">{value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Performance Graph */}
                            <div className="mt-6 p-4 bg-white/5 rounded-2xl">
                                <p className="text-sm text-gray-400 mb-4">Recent Performance Trend</p>
                                <div className="flex items-end justify-between gap-2 h-32">
                                    {athlete.recentPerformance.map((data, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: `${data.value}%` }}>
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/50 rounded-t-lg"></div>
                                            </div>
                                            <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Status & Support */}
                    <div className="space-y-6">
                        {/* Injury Status */}
                        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Activity className="text-green-500" size={20} />
                                <h3 className="font-bold text-white">Health Status</h3>
                            </div>
                            <p className="text-green-400 text-sm">{athlete.injuryStatus}</p>
                        </div>

                        {/* Funding Request */}
                        {athlete.fundingRequest.active && (
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <DollarSign className="text-primary" size={20} />
                                    <h3 className="font-bold text-white">Funding Request</h3>
                                </div>
                                <div className="mb-4">
                                    <p className="text-3xl font-black text-primary mb-1">{athlete.fundingRequest.goal}</p>
                                    <p className="text-gray-400 text-sm">{athlete.fundingRequest.purpose}</p>
                                </div>
                                <button className="w-full py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all">
                                    Support This Athlete
                                </button>
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                            <h3 className="font-bold text-white mb-4">Quick Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Age</span>
                                    <span className="text-white font-bold">{athlete.age} years</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Sport</span>
                                    <span className="text-white font-bold">{athlete.sport}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Level</span>
                                    <span className="text-primary font-bold">{athlete.level}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Verified</span>
                                    <span className="text-blue-500 font-bold flex items-center gap-1">
                                        <Award size={14} />
                                        Yes
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicAthleteProfile;
