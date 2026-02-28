import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
    User, Calendar, MapPin, ChevronRight, ChevronLeft, Loader2,
    Ruler, Scale, Hand, Heart, Award, GraduationCap, Target, Lock, ArrowRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAthlete } from "../../context/AthleteContext";
import { useToast } from "../../context/ToastContext";
import Logo from "../../components/Logo";
import {
    SPORTS_LIST,
    SPORT_CATEGORIES,
    SPORTS_REQUIRING_DOMINANT_HAND,
    CURRENT_LEVELS,
    PREFERRED_TRAINING_TYPES,
    BLOOD_GROUPS,
    DISABILITY_CATEGORIES
} from "../../constants/sports";
import { INDIAN_STATES, getDistrictsForState } from "../../constants/location";

const NATIONALITIES = ["India", "Other"];

const STEP_ONE_FIELDS = [
    "name", "dateOfBirth", "gender", "nationality", "primarySport", "category",
    "state", "district", "cityTown"
];

function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return "";
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age >= 0 ? String(age) : "";
}

const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { useAthleteProfile, updateProfile } = useAthlete();
    const { profile, loading: profileLoading } = useAthleteProfile(user?.uid);
    const { success: showToast } = useToast();

    const [step, setStep] = useState(1);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        dateOfBirth: "",
        gender: "",
        nationality: "",
        primarySport: "",
        category: "",
        state: "",
        district: "",
        cityTown: "",
        height: "",
        weight: "",
        dominantHand: "",
        disabilityStatus: "no",
        disabilityCategory: "",
        bloodGroup: "",
        yearsOfExperience: "",
        currentLevel: "",
        currentAcademy: "",
        currentCoach: "",
        secondarySports: "",
        preferredTrainingType: ""
    });

    const categories = useMemo(
        () => (form.primarySport ? (SPORT_CATEGORIES[form.primarySport] || ["Other"]) : []),
        [form.primarySport]
    );
    const districts = useMemo(
        () => getDistrictsForState(form.state),
        [form.state]
    );
    const showDominantHand = useMemo(
        () => form.primarySport && SPORTS_REQUIRING_DOMINANT_HAND.includes(form.primarySport),
        [form.primarySport]
    );

    const age = useMemo(() => calculateAge(profile?.dateOfBirth), [profile?.dateOfBirth]);

    useEffect(() => {
        if (!user) return;
        setForm((prev) => ({
            ...prev,
            name: user.displayName || prev.name || "",
            ...(profile && {
                name: profile.name || user.displayName || prev.name,
                dateOfBirth: profile.dateOfBirth || "",
                gender: profile.gender || "",
                nationality: profile.nationality || "",
                primarySport: profile.primarySport || profile.sport || "",
                category: profile.category || "",
                state: profile.state || "",
                district: profile.district || "",
                cityTown: profile.cityTown || profile.city || "",
                height: profile.height ?? "",
                weight: profile.weight ?? "",
                dominantHand: profile.dominantHand || "",
                disabilityStatus: profile.disabilityStatus || "no",
                disabilityCategory: profile.disabilityCategory || "",
                bloodGroup: profile.bloodGroup || "",
                yearsOfExperience: profile.yearsOfExperience ?? "",
                currentLevel: profile.currentLevel || "",
                currentAcademy: profile.currentAcademy || "",
                currentCoach: profile.currentCoach || "",
                secondarySports: Array.isArray(profile.secondarySports) ? profile.secondarySports.join(", ") : (profile.secondarySports || ""),
                preferredTrainingType: profile.preferredTrainingType || ""
            })
        }));
    }, [user, profile]);

    const updateField = (key, value) => {
        if (key === "dateOfBirth" && value) {
            const ageNum = parseInt(calculateAge(value), 10);
            if (!isNaN(ageNum) && ageNum < 16) {
                setError("You must be at least 16 years old.");
                setForm((prev) => ({ ...prev, dateOfBirth: "" }));
                return;
            }
        }
        setForm((prev) => ({ ...prev, [key]: value }));
        if (key === "primarySport") setForm((prev) => ({ ...prev, category: "" }));
        if (key === "state") setForm((prev) => ({ ...prev, district: "" }));
        setError("");
    };

    const validateStep1 = () => {
        for (const f of STEP_ONE_FIELDS) {
            if (f === "name" && !form.name?.trim()) {
                setError("Name is required.");
                return false;
            }
            if (f === "dateOfBirth") {
                if (!form.dateOfBirth) {
                    setError("Date of birth is required.");
                    return false;
                }
                const ageNum = parseInt(calculateAge(form.dateOfBirth), 10);
                if (isNaN(ageNum) || ageNum < 16) {
                    setError("You must be at least 16 years old.");
                    return false;
                }
            }
            if (f === "gender" && !form.gender) {
                setError("Gender is required.");
                return false;
            }
            if (f === "nationality" && !form.nationality) {
                setError("Nationality is required.");
                return false;
            }
            if (f === "primarySport" && !form.primarySport) {
                setError("Primary sport is required.");
                return false;
            }
            if (f === "category" && !form.category) {
                setError("Category (for your sport) is required.");
                return false;
            }
            if (f === "state" && !form.state) {
                setError("State is required.");
                return false;
            }
            if (f === "district" && !form.district) {
                setError("District is required.");
                return false;
            }
            if (f === "cityTown" && !form.cityTown?.trim()) {
                setError("City/Town is required.");
                return false;
            }
        }
        return true;
    };

    const handleSaveStep1 = async () => {
        if (!validateStep1() || !user?.uid) return;
        setSaving(true);
        setError("");
        const payload = {
            name: form.name.trim(),
            email: user.email,
            dateOfBirth: form.dateOfBirth,
            age: calculateAge(form.dateOfBirth),
            gender: form.gender,
            nationality: form.nationality,
            primarySport: form.primarySport,
            sport: form.primarySport,
            category: form.category,
            state: form.state,
            district: form.district,
            cityTown: form.cityTown.trim()
        };
        const result = await updateProfile(user.uid, payload);
        setSaving(false);
        if (result.success) {
            showToast("Step 1 saved. Your Athlete ID will be generated.");
            setStep(2);
        } else {
            setError(result.error || "Failed to save.");
        }
    };

    const handleCompleteOnboarding = async () => {
        if (!user?.uid) return;
        setSaving(true);
        setError("");
        const payload = {
            height: form.height ? String(form.height).trim() : undefined,
            weight: form.weight ? String(form.weight).trim() : undefined,
            dominantHand: showDominantHand ? form.dominantHand : undefined,
            disabilityStatus: form.disabilityStatus,
            ...(form.disabilityStatus === "yes" && form.disabilityCategory && { disabilityCategory: form.disabilityCategory }),
            bloodGroup: form.bloodGroup || undefined,
            yearsOfExperience: form.yearsOfExperience ? String(form.yearsOfExperience).trim() : undefined,
            currentLevel: form.currentLevel || undefined,
            currentAcademy: form.currentAcademy?.trim() || undefined,
            currentCoach: form.currentCoach?.trim() || undefined,
            secondarySports: form.secondarySports?.trim() ? form.secondarySports.split(/,\s*/).filter(Boolean) : undefined,
            preferredTrainingType: form.preferredTrainingType || undefined,
            onboardingComplete: true
        };
        const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== undefined));
        const result = await updateProfile(user.uid, cleanPayload);
        setSaving(false);
        if (result.success) {
            showToast("Profile complete. Welcome to Athlixir!");
            window.location.href = "/athlete/dashboard";
        } else {
            setError(result.error || "Failed to complete.");
        }
    };

    // Already completed onboarding -> go to portal
    if (!profileLoading && profile?.onboardingComplete) {
        navigate("/athlete/dashboard", { replace: true });
        return null;
    }

    if (profileLoading && !profile) {
        return (
            <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/75" />
                </div>
                <Loader2 className="w-10 h-10 text-primary animate-spin relative z-10" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-6 md:py-8">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/75" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-10 left-6 lg:left-12 z-20"
            >
                <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowRight className="rotate-180 text-primary" size={18} />
                    Back to Home
                </Link>
            </motion.div>

            <div className="w-full max-w-5xl px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center mb-4">
                    <Link to="/">
                        <Logo iconOnly={true} className="mb-2 scale-125" />
                    </Link>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                                Complete your athlete profile
                            </h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                Step {step} of 2 · Secured & verified
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]" onFocusCapture={() => setError("")}>
            <AnimatePresence>
                {error && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="mb-6 overflow-hidden"
                    >
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        <section className="bg-black/40 border border-white/10 rounded-[2rem] p-6">
                            <h2 className="text-base font-black uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                                <User size={18} className="text-primary" />
                                Basic details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Full name (from signup)</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Date of birth <span className="text-primary">(locked after save)</span></label>
                                    <input
                                        type="date"
                                        value={form.dateOfBirth}
                                        onChange={(e) => updateField("dateOfBirth", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Age (auto)</label>
                                    <input
                                        type="text"
                                        value={age}
                                        readOnly
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 cursor-not-allowed text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Gender</label>
                                    <select
                                        value={form.gender}
                                        onChange={(e) => updateField("gender", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Nationality</label>
                                    <select
                                        value={form.nationality}
                                        onChange={(e) => updateField("nationality", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select</option>
                                        {NATIONALITIES.map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Primary sport <span className="text-primary">(change limit)</span></label>
                                    <select
                                        value={form.primarySport}
                                        onChange={(e) => updateField("primarySport", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select sport</option>
                                        {SPORTS_LIST.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                {categories.length > 0 && (
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Category ({form.primarySport})</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => updateField("category", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">State</label>
                                    <select
                                        value={form.state}
                                        onChange={(e) => updateField("state", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select</option>
                                        {INDIAN_STATES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">District</label>
                                    <select
                                        value={form.district}
                                        onChange={(e) => updateField("district", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select</option>
                                        {districts.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">City / Town</label>
                                    <input
                                        type="text"
                                        value={form.cityTown}
                                        onChange={(e) => updateField("cityTown", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="City or town"
                                    />
                                </div>
                            </div>
                        </section>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSaveStep1}
                                disabled={saving}
                                className="px-8 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Save & continue
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <section className="bg-black/40 border border-white/10 rounded-[2rem] p-6">
                            <h2 className="text-base font-black uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                                <Ruler size={18} className="text-primary" />
                                Physical & basic
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Height (cm)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.height}
                                        onChange={(e) => updateField("height", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="175"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Weight (kg)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.weight}
                                        onChange={(e) => updateField("weight", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="70"
                                    />
                                </div>
                                {showDominantHand && (
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Dominant hand</label>
                                        <select
                                            value={form.dominantHand}
                                            onChange={(e) => updateField("dominantHand", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                        >
                                            <option value="">Select</option>
                                            <option value="Left">Left</option>
                                            <option value="Right">Right</option>
                                        </select>
                                    </div>
                                )}
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Disability status</label>
                                    <div className="flex gap-4">
                                        {["no", "yes"].map((opt) => (
                                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="disabilityStatus"
                                                    value={opt}
                                                    checked={form.disabilityStatus === opt}
                                                    onChange={() => updateField("disabilityStatus", opt)}
                                                    className="text-primary"
                                                />
                                                <span className="text-white font-medium capitalize text-sm">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {form.disabilityStatus === "yes" && (
                                        <select
                                            value={form.disabilityCategory}
                                            onChange={(e) => updateField("disabilityCategory", e.target.value)}
                                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                        >
                                            <option value="">Select category</option>
                                            {DISABILITY_CATEGORIES.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Blood group (optional)</label>
                                    <select
                                        value={form.bloodGroup}
                                        onChange={(e) => updateField("bloodGroup", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select (optional)</option>
                                        {BLOOD_GROUPS.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section className="bg-black/40 border border-white/10 rounded-[2rem] p-6">
                            <h2 className="text-base font-black uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                                <Award size={18} className="text-primary" />
                                Experience
                            </h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Years of experience</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.yearsOfExperience}
                                        onChange={(e) => updateField("yearsOfExperience", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="e.g. 5"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Current level</label>
                                    <select
                                        value={form.currentLevel}
                                        onChange={(e) => updateField("currentLevel", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select</option>
                                        {CURRENT_LEVELS.map((l) => (
                                            <option key={l.value} value={l.value}>{l.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Current academy (optional)</label>
                                    <input
                                        type="text"
                                        value={form.currentAcademy}
                                        onChange={(e) => updateField("currentAcademy", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="Academy name"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Current coach (optional)</label>
                                    <input
                                        type="text"
                                        value={form.currentCoach}
                                        onChange={(e) => updateField("currentCoach", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="Coach name"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-black/40 border border-white/10 rounded-[2rem] p-6">
                            <h2 className="text-base font-black uppercase tracking-tight text-white mb-4 flex items-center gap-2">
                                <Target size={18} className="text-primary" />
                                Preferences
                            </h2>
                            <div className="grid gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Secondary sports (optional)</label>
                                    <input
                                        type="text"
                                        value={form.secondarySports}
                                        onChange={(e) => updateField("secondarySports", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 text-sm"
                                        placeholder="e.g. Athletics, Swimming"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1.5">Preferred training type (optional)</label>
                                    <select
                                        value={form.preferredTrainingType}
                                        onChange={(e) => updateField("preferredTrainingType", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 text-sm"
                                    >
                                        <option value="">Select (optional)</option>
                                        {PREFERRED_TRAINING_TYPES.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white/10"
                            >
                                <ChevronLeft size={18} />
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleCompleteOnboarding}
                                disabled={saving}
                                className="px-8 py-4 bg-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-600 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Complete profile
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
