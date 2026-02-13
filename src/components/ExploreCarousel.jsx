import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ExploreCarousel = () => {
    const scrollRef = useRef(null);

    const cards = [
        { title: "Verified Digital Profile", label: "Identity", img: "https://images.unsplash.com/photo-1770368787714-4e5a5ea557fd?q=80&w=1170&auto=format&fit=crop" },
        { title: "Performance Analysis", label: "Tech", img: "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?q=80&w=1255&auto=format&fit=crop" },
        { title: "Forgery Detection", label: "Security", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80" },
        { title: "Tier Leaderboards", label: "Growth", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80" },
        { title: "Academy Locator", label: "Access", img: "https://images.unsplash.com/photo-1604357209793-fca5dca89f97?q=80&w=764&auto=format&fit=crop" },
        { title: "Funding Support", label: "Sponsor", img: "https://plus.unsplash.com/premium_photo-1701121214648-245e9c86cc92?q=80&w=880&auto=format&fit=crop" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const section = scrollRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const scrollContainer = section.querySelector(".horizontal-scroll");

            if (rect.top <= 0 && rect.bottom > window.innerHeight) {
                const scrollAmount = -rect.top;
                scrollContainer.scrollLeft = scrollAmount;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={scrollRef} className="relative h-[300vh] bg-background">

            {/* Sticky Wrapper */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                <div className="container mx-auto px-6 lg:px-12 mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Experience the <br />
                        <span className="text-gray-500">Athlixir Advantage.</span>
                    </h2>
                </div>

                {/* Horizontal Scroll */}
                <div className="horizontal-scroll flex space-x-8 px-6 lg:px-12 overflow-hidden">

                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="min-w-[320px] md:min-w-[420px] h-[550px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group bg-white/[0.02]"
                        >
                            <img
                                src={card.img}
                                alt={card.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-40"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 w-full p-10">
                                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary mb-4 block">
                                    0{index + 1}
                                </span>

                                <div className="flex justify-between items-end gap-4">
                                    <h3 className="text-3xl font-black text-white">
                                        {card.title}
                                    </h3>

                                    <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl text-white border border-white/10 shadow-xl">
                                        <ArrowRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default ExploreCarousel;
