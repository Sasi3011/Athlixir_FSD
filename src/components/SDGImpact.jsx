import { Heart, Activity, TrendingUp, Zap, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

const SDGImpact = () => {
    const goals = [
        { icon: Heart, title: "Good Health & Wellbeing", color: "text-rose-400" },
        { icon: Activity, title: "Gender Equality", color: "text-blue-400" },
        { icon: TrendingUp, title: "Economic Growth", color: "text-emerald-400" },
        { icon: Zap, title: "Innovation", color: "text-amber-400" },
        { icon: Hexagon, title: "Strong Institutions", color: "text-indigo-400" },
    ];

    return (
        <section className="py-12 md:py-20 bg-background relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 md:mb-28"
                >
                    <div className="inline-flex px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold uppercase tracking-[0.25em] mb-6 text-primary backdrop-blur-sm">
                        Purpose Driven
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                        Driving Sustainable <span className="text-gray-500">Impact.</span>
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-10 md:gap-16 lg:gap-24 items-start">
                    {goals.map((goal, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <div className="w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 text-gray-400 rounded-[2rem] flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,87,34,0.3)] group-hover:border-primary/50 group-hover:bg-primary/5">
                                <goal.icon size={32} className={`transition-colors duration-500 group-hover:${goal.color} group-hover:text-primary`} />
                            </div>
                            <span className="text-[10px] font-black text-gray-500 max-w-[120px] leading-tight group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                                {goal.title}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SDGImpact;
