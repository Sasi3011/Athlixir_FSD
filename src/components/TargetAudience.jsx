import { motion } from 'framer-motion';
import { User, Trophy, BookOpen } from 'lucide-react';

const TargetAudience = () => {
    const audiences = [
        {
            icon: <User size={32} className="text-primary" />,
            title: "Student Athletes",
            label: "Verified Talent",
            description: "Build a verified digital profile, track your biomechanics, and get discovered by top scouts and academies.",
            bgImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80",
        },
        {
            icon: <Trophy size={32} className="text-blue-400" />,
            title: "Expert Coaches",
            label: "Talent Discovery",
            description: "Access deep performance analytics, manage athlete rosters, and identify rising stars before anyone else.",
            bgImage: "https://plus.unsplash.com/premium_photo-1661898576032-fd26e3409175?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            icon: <BookOpen size={32} className="text-emerald-400" />,
            title: "Institutions",
            label: "Digital Growth",
            description: "Digitize sports operations, showcase institutional success, and connect your students with global opportunities.",
            bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <section id="athletes" className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-28"
                >
                    <div className="inline-flex px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-[11px] font-bold uppercase tracking-[0.25em] mb-6 text-primary backdrop-blur-sm">
                        Who It's For
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tight leading-[1.1]">
                        Empowering the Entire <br />
                        <span className="text-gray-500">Athlete Ecosystem.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
                    {audiences.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="relative group h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer bg-white/[0.02] border border-white/10"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={item.bgImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                            </div>

                            {/* Top Label */}
                            <div className="absolute top-8 left-8">
                                <span className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-gray-300">
                                    {item.label}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl mb-8 w-16 h-16 flex items-center justify-center border border-white/10 group-hover:border-primary group-hover:bg-primary/20 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight leading-tight">
                                    {item.title.split(' ')[0]} <br />
                                    <span className="text-primary">{item.title.split(' ')[1] || ''}</span>
                                </h3>
                                <p className="text-gray-400 text-sm mb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 font-light leading-relaxed">
                                    {item.description}
                                </p>
                                <div className="w-10 h-1 bg-primary/30 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-700" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TargetAudience;
