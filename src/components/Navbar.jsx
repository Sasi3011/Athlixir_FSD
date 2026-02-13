import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

const NAV_LINKS = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Research", href: "#research" },
    { name: "For Athletes", href: "#athletes" },
    { name: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            // Background change
            setIsScrolled(window.scrollY > 20);

            // Scroll spy
            const scrollPosition = window.scrollY + 150;

            NAV_LINKS.forEach((link) => {
                const section = document.getElementById(link.href.substring(1));
                if (
                    section &&
                    scrollPosition >= section.offsetTop &&
                    scrollPosition < section.offsetTop + section.offsetHeight
                ) {
                    setActiveSection(link.href.substring(1));
                }
            });

            if (window.scrollY < 100) {
                setActiveSection("home");
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-black/40 backdrop-blur-2xl shadow-xl h-16"
                : "bg-transparent h-20"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-full">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => {
                        if (isHomePage) {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setActiveSection("home");
                        }
                    }}
                    className="flex items-center transition-transform hover:scale-105 active:scale-95 duration-200"
                >
                    <Logo />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center h-full space-x-2">
                    {NAV_LINKS.map((link) => {
                        const sectionId = link.href.substring(1);
                        const isActive = activeSection === sectionId;

                        return (
                            <a
                                key={link.name}
                                href={isHomePage ? link.href : `/${link.href}`}
                                onClick={(e) => {
                                    if (!isHomePage) return;
                                    setActiveSection(sectionId);
                                }}
                                className={`relative h-full flex items-center px-4 text-sm font-medium transition-colors duration-300 ${isActive
                                    ? "text-primary"
                                    : isScrolled
                                        ? "text-gray-300"
                                        : "text-white/90"
                                    } hover:text-primary`}
                            >
                                {isActive && isHomePage && (
                                    <motion.span
                                        layoutId="navActiveBar"
                                        className="absolute top-0 left-0 right-0 h-[3px] bg-primary rounded-b-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {link.name}
                            </a>
                        );
                    })}
                </div>

                {/* Right Buttons */}
                <div className="hidden lg:flex items-center space-x-4">
                    <Link
                        to="/login"
                        className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider border rounded-full transition-all ${isScrolled
                            ? "border-white/20 text-white hover:bg-white/10"
                            : "border-white/30 text-white hover:bg-white/10"
                            }`}
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-primary text-white rounded-full hover:bg-orange-600 transition-all shadow-[0_0_15px_rgba(255,87,34,0.3)] hover:shadow-[0_0_20px_rgba(255,87,34,0.5)]"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Button */}
                <button
                    className="lg:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex flex-col p-6 lg:hidden"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <Logo />
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={isHomePage ? link.href : `/${link.href}`}
                                    className={`text-xl font-bold ${activeSection === link.href.substring(1)
                                        ? "text-primary"
                                        : "text-gray-200"
                                        }`}
                                    onClick={() => {
                                        if (isHomePage) {
                                            setActiveSection(link.href.substring(1));
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {link.name}
                                </a>
                            ))}

                            <hr className="border-white/10 my-4" />

                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-3 border border-white/20 rounded-lg text-white uppercase text-xs flex items-center justify-center"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-3 bg-primary text-white rounded-lg uppercase text-xs flex items-center justify-center"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
