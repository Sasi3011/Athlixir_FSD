import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User, Save, Trophy, Pencil, X, Activity,
    MapPin, CheckCircle2, Camera, Award, BarChart3, Globe, FileText,
    Settings, Lock, Bell, Trash2, LogOut, Plus, Upload
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAthlete } from "../../context/AthleteContext";
import { useToast } from "../../context/ToastContext";

const NOTIFICATION_PREFS_KEY = "athlixir_notification_prefs";

const Profile = () => {
    const { user, logout, changePassword: authChangePassword, deleteAccount: authDeleteAccount } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const { useAthleteProfile, updateProfile } = useAthlete();
    const { profile: savedProfile } = useAthleteProfile(user?.uid);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Performance & Achievements
    const [achievements, setAchievements] = useState(savedProfile?.achievements || [
        { tournamentName: "", position: "", year: "", medalsCertificates: "", ranking: "", personalBest: "" }
    ]);
    // Stats & Performance
    const [matchHistory, setMatchHistory] = useState(savedProfile?.matchHistory || "");
    const [winLossRatio, setWinLossRatio] = useState(savedProfile?.winLossRatio || "");
    const [goalsRunsPoints, setGoalsRunsPoints] = useState(savedProfile?.goalsRunsPoints || "");
    const [injuryHistory, setInjuryHistory] = useState(savedProfile?.injuryHistory || "");
    // Social & Visibility
    const [instagram, setInstagram] = useState(savedProfile?.instagram || "");
    const [twitter, setTwitter] = useState(savedProfile?.twitter || "");
    const [linkedin, setLinkedin] = useState(savedProfile?.linkedin || "");
    const [youtube, setYoutube] = useState(savedProfile?.youtube || "");
    const [portfolioLink, setPortfolioLink] = useState(savedProfile?.portfolioLink || "");
    const [profilePublic, setProfilePublic] = useState(savedProfile?.profilePublic ?? true);
    // Documents (file names/placeholders for now)
    const [idProofFile, setIdProofFile] = useState("");
    const [certificatesFile, setCertificatesFile] = useState("");
    const [medicalCertFile, setMedicalCertFile] = useState("");
    const [resumeFile, setResumeFile] = useState("");

    // Settings modals
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [changePwdCurrent, setChangePwdCurrent] = useState("");
    const [changePwdNew, setChangePwdNew] = useState("");
    const [changePwdConfirm, setChangePwdConfirm] = useState("");
    const [changePwdError, setChangePwdError] = useState("");
    const [changePwdLoading, setChangePwdLoading] = useState(false);

    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationPrefs, setNotificationPrefs] = useState(() => {
        try {
            const raw = localStorage.getItem(NOTIFICATION_PREFS_KEY);
            return raw ? { ...{ email: true, push: false }, ...JSON.parse(raw) } : { email: true, push: false };
        } catch {
            return { email: true, push: false };
        }
    });

    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    const formattedDob = (() => {
        const raw = savedProfile?.dateOfBirth;
        if (!raw) return "—";
        try {
            const d = raw?.toDate ? raw.toDate() : new Date(raw);
            return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
        } catch {
            return "—";
        }
    })();

    const getDefaultEditForm = () => ({
        name: savedProfile?.name || user?.displayName || "",
        gender: savedProfile?.gender || "",
        nationality: savedProfile?.nationality || "",
        category: savedProfile?.category || "",
        state: savedProfile?.state || "",
        district: savedProfile?.district || "",
        cityTown: savedProfile?.cityTown || savedProfile?.city || "",
        height: savedProfile?.height ?? "",
        weight: savedProfile?.weight ?? "",
        dominantHand: savedProfile?.dominantHand || "",
        bloodGroup: savedProfile?.bloodGroup || "",
        disabilityStatus: savedProfile?.disabilityStatus || "no",
        disabilityCategory: savedProfile?.disabilityCategory || "",
        yearsOfExperience: savedProfile?.yearsOfExperience ?? "",
        currentLevel: savedProfile?.currentLevel || "",
        currentAcademy: savedProfile?.currentAcademy || "",
        currentCoach: savedProfile?.currentCoach || "",
        secondarySports: Array.isArray(savedProfile?.secondarySports) ? savedProfile.secondarySports.join(", ") : (savedProfile?.secondarySports || ""),
        preferredTrainingType: savedProfile?.preferredTrainingType || ""
    });

    const [editForm, setEditForm] = useState(getDefaultEditForm());

    const startEditing = () => {
        setEditForm(getDefaultEditForm());
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!user?.uid) return;
        setSaving(true);
        const payload = {
            name: editForm.name?.trim() || undefined,
            gender: editForm.gender || undefined,
            nationality: editForm.nationality?.trim() || undefined,
            category: editForm.category?.trim() || undefined,
            state: editForm.state?.trim() || undefined,
            district: editForm.district?.trim() || undefined,
            cityTown: editForm.cityTown?.trim() || undefined,
            height: editForm.height !== "" ? String(editForm.height).trim() : undefined,
            weight: editForm.weight !== "" ? String(editForm.weight).trim() : undefined,
            dominantHand: editForm.dominantHand?.trim() || undefined,
            bloodGroup: editForm.bloodGroup || undefined,
            disabilityStatus: editForm.disabilityStatus || undefined,
            disabilityCategory: editForm.disabilityStatus === "yes" ? (editForm.disabilityCategory?.trim() || undefined) : undefined,
            yearsOfExperience: editForm.yearsOfExperience !== "" ? String(editForm.yearsOfExperience).trim() : undefined,
            currentLevel: editForm.currentLevel || undefined,
            currentAcademy: editForm.currentAcademy?.trim() || undefined,
            currentCoach: editForm.currentCoach?.trim() || undefined,
            secondarySports: editForm.secondarySports?.trim() ? editForm.secondarySports.split(/,\s*/).filter(Boolean) : undefined,
            preferredTrainingType: editForm.preferredTrainingType || undefined
        };
        const clean = Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== undefined));
        const result = await updateProfile(user.uid, clean);
        setSaving(false);
        if (result.success) {
            setIsEditing(false);
            toast.success("Profile saved.");
        } else {
            toast.error(result.error || "Failed to save.");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (e) {
            console.error("Logout failed:", e);
        }
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        setChangePwdError("");
        if (changePwdNew.length < 6) {
            setChangePwdError("New password must be at least 6 characters.");
            return;
        }
        if (changePwdNew !== changePwdConfirm) {
            setChangePwdError("New passwords do not match.");
            return;
        }
        setChangePwdLoading(true);
        const result = await authChangePassword(changePwdCurrent, changePwdNew);
        setChangePwdLoading(false);
        if (result.success) {
            setShowChangePassword(false);
            setChangePwdCurrent("");
            setChangePwdNew("");
            setChangePwdConfirm("");
            toast.success("Password updated successfully.");
        } else {
            setChangePwdError(result.error || "Failed to change password.");
        }
    };

    const handleNotificationPrefToggle = (key) => {
        const next = { ...notificationPrefs, [key]: !notificationPrefs[key] };
        setNotificationPrefs(next);
        localStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(next));
        toast.success("Notification preferences saved.");
    };

    const handleDeleteAccountSubmit = async (e) => {
        e.preventDefault();
        setDeleteError("");
        if (deleteConfirmText.toUpperCase() !== "DELETE") {
            setDeleteError('Type DELETE to confirm.');
            return;
        }
        if (!deletePassword.trim()) {
            setDeleteError("Enter your password.");
            return;
        }
        setDeleteLoading(true);
        const result = await authDeleteAccount(deletePassword);
        setDeleteLoading(false);
        if (result.success) {
            navigate("/", { replace: true });
            window.location.reload();
        } else {
            setDeleteError(result.error || "Failed to delete account.");
        }
    };

    const addAchievementRow = () => setAchievements(prev => [...prev, { tournamentName: "", position: "", year: "", medalsCertificates: "", ranking: "", personalBest: "" }]);
    const removeAchievementRow = (i) => setAchievements(prev => prev.filter((_, idx) => idx !== i));
    const updateAchievement = (i, field, value) => setAchievements(prev => prev.map((row, idx) => idx === i ? { ...row, [field]: value } : row));

    const displayName = savedProfile?.name || user?.displayName || "";
    const age = savedProfile?.age ?? "";
    const email = user?.email || savedProfile?.email || "—";
    const sport = savedProfile?.primarySport || savedProfile?.sport || "—";
    const level = savedProfile?.currentLevel ? savedProfile.currentLevel.charAt(0).toUpperCase() + savedProfile.currentLevel.slice(1) : "—";
    const locationText = [savedProfile?.district, savedProfile?.state].filter(Boolean).join(", ") || "—";

    return (
        <div className="pb-24 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-xl font-bold text-white/90 tracking-tight">My Profile</h1>
                <p className="text-sm text-gray-500 mt-0.5">Manage your information and visibility</p>
            </div>

            {/* Profile hero */}
            <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 md:p-8 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                    <div className="relative shrink-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-primary/80 to-orange-500/80 p-[1.5px]">
                            <div className="w-full h-full rounded-[14px] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl md:text-4xl font-bold text-primary/90">
                                        {(displayName || user?.displayName || "A").charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>
                        {isEditing && (
                            <button type="button" className="absolute -bottom-1 -right-1 p-1.5 bg-primary rounded-lg text-white shadow-lg hover:bg-primary/90 transition-colors" title="Change photo">
                                <Camera size={12} />
                            </button>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                {displayName || "Athlete"}
                            </h2>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                                <CheckCircle2 size={10} /> Verified
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{email}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {sport !== "—" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-xs font-medium text-white/90 border border-white/[0.06]">
                                    <Trophy size={11} className="text-primary/80" /> {sport}
                                </span>
                            )}
                            {level !== "—" && (
                                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-xs font-medium text-white/90 border border-white/[0.06] capitalize">{level}</span>
                            )}
                            {locationText !== "—" && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-xs text-gray-400 border border-white/[0.06]">
                                    <MapPin size={11} /> {locationText}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {!isEditing ? (
                                <button type="button" onClick={startEditing} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                                    <Pencil size={12} /> Edit
                                </button>
                            ) : (
                                <>
                                    <button type="button" onClick={cancelEditing} className="px-4 py-2 rounded-lg border border-white/15 text-white/90 text-xs font-medium hover:bg-white/5 transition-colors">Cancel</button>
                                    <button type="button" onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold flex items-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-colors">
                                        <Save size={12} /> {saving ? "Saving…" : "Save"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <section className={sectionClass}>
                <SectionTitle icon={<User size={16} />}>Profile details</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Identity</h3>
                        <ProfileField label="Full name" value={isEditing ? editForm.name : (displayName || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, name: v }))} />
                        <ProfileField label="Email" value={email} editing={false} />
                        <ProfileField label="Date of birth" value={formattedDob} editing={false} />
                        <ProfileField label="Age" value={age || "—"} editing={false} />
                        <ProfileField label="Gender" value={isEditing ? editForm.gender : (savedProfile?.gender || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, gender: v }))} />
                        <ProfileField label="Nationality" value={isEditing ? editForm.nationality : (savedProfile?.nationality || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, nationality: v }))} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Sport & location</h3>
                        <ProfileField label="Primary sport" value={sport} editing={false} />
                        <ProfileField label="Category" value={isEditing ? editForm.category : (savedProfile?.category || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, category: v }))} />
                        <ProfileField label="Secondary sports" value={isEditing ? editForm.secondarySports : (Array.isArray(savedProfile?.secondarySports) ? savedProfile.secondarySports.join(", ") : (savedProfile?.secondarySports || "—"))} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, secondarySports: v }))} />
                        <ProfileField label="Preferred training" value={isEditing ? editForm.preferredTrainingType : (savedProfile?.preferredTrainingType || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, preferredTrainingType: v }))} />
                        <ProfileField label="State" value={isEditing ? editForm.state : (savedProfile?.state || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, state: v }))} />
                        <ProfileField label="District" value={isEditing ? editForm.district : (savedProfile?.district || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, district: v }))} />
                        <ProfileField label="City / town" value={isEditing ? editForm.cityTown : (savedProfile?.cityTown || savedProfile?.city || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, cityTown: v }))} />
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Physical & experience</h3>
                        <ProfileField label="Height (cm)" value={isEditing ? editForm.height : (savedProfile?.height != null && savedProfile?.height !== "" ? savedProfile.height : "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, height: v }))} />
                        <ProfileField label="Weight (kg)" value={isEditing ? editForm.weight : (savedProfile?.weight != null && savedProfile?.weight !== "" ? savedProfile.weight : "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, weight: v }))} />
                        <ProfileField label="Dominant hand" value={isEditing ? editForm.dominantHand : (savedProfile?.dominantHand || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, dominantHand: v }))} />
                        <ProfileField label="Blood group" value={isEditing ? editForm.bloodGroup : (savedProfile?.bloodGroup || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, bloodGroup: v }))} />
                        {isEditing ? (
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Disability</span>
                                <div className="flex gap-4 items-center">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="disability" checked={editForm.disabilityStatus === "no"} onChange={() => setEditForm(prev => ({ ...prev, disabilityStatus: "no" }))} className="text-primary" />
                                        <span className="text-xs text-white">No</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="disability" checked={editForm.disabilityStatus === "yes"} onChange={() => setEditForm(prev => ({ ...prev, disabilityStatus: "yes" }))} className="text-primary" />
                                        <span className="text-xs text-white">Yes</span>
                                    </label>
                                </div>
                                {editForm.disabilityStatus === "yes" && (
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        value={editForm.disabilityCategory}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, disabilityCategory: e.target.value }))}
                                        className={`${inputBase} mt-1`}
                                    />
                                )}
                            </div>
                        ) : (
                            <ProfileField label="Disability" value={(savedProfile?.disabilityStatus || "no") === "yes" ? `Yes (${savedProfile?.disabilityCategory || "—"})` : "No"} editing={false} />
                        )}
                        <ProfileField label="Years of experience" value={isEditing ? editForm.yearsOfExperience : (savedProfile?.yearsOfExperience != null && savedProfile?.yearsOfExperience !== "" ? savedProfile.yearsOfExperience : "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, yearsOfExperience: v }))} />
                        <ProfileField label="Current level" value={isEditing ? editForm.currentLevel : (savedProfile?.currentLevel ? savedProfile.currentLevel.charAt(0).toUpperCase() + savedProfile.currentLevel.slice(1) : "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, currentLevel: v }))} />
                        <ProfileField label="Current academy" value={isEditing ? editForm.currentAcademy : (savedProfile?.currentAcademy || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, currentAcademy: v }))} />
                        <ProfileField label="Current coach" value={isEditing ? editForm.currentCoach : (savedProfile?.currentCoach || "—")} editing={isEditing} onChange={(v) => setEditForm(prev => ({ ...prev, currentCoach: v }))} />
                    </div>
                </div>
            </section>

            <section className={sectionClass}>
                <SectionTitle icon={<Award size={16} />}>Performance & Achievements</SectionTitle>
                <p className="text-xs text-gray-500 mb-5">Tournament results, medals, and personal bests.</p>
                <div className="space-y-4">
                    {achievements.map((row, i) => (
                        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <ProfileField label="Tournament" value={row.tournamentName} editing={isEditing} onChange={(v) => updateAchievement(i, "tournamentName", v)} />
                            <ProfileField label="Position" value={row.position} editing={isEditing} onChange={(v) => updateAchievement(i, "position", v)} />
                            <ProfileField label="Year" value={row.year} editing={isEditing} onChange={(v) => updateAchievement(i, "year", v)} />
                            {isEditing ? (
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Medals / Certs</span>
                                    <input type="text" placeholder="Link or upload" value={row.medalsCertificates} onChange={(e) => updateAchievement(i, "medalsCertificates", e.target.value)} className={inputBase} />
                                </div>
                            ) : (
                                <ProfileField label="Medals / Certs" value={row.medalsCertificates || "—"} editing={false} />
                            )}
                            <ProfileField label="Ranking" value={row.ranking} editing={isEditing} onChange={(v) => updateAchievement(i, "ranking", v)} />
                            <div className="flex items-end gap-2">
                                <div className="flex-1 min-w-0">
                                    <ProfileField label="Personal best" value={row.personalBest} editing={isEditing} onChange={(v) => updateAchievement(i, "personalBest", v)} />
                                </div>
                                {isEditing && (
                                    <button type="button" onClick={() => removeAchievementRow(i)} className="shrink-0 p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors" title="Remove"><X size={14} /></button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isEditing && (
                        <button type="button" onClick={addAchievementRow} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-white/15 text-gray-500 text-xs font-medium hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-colors">
                            <Plus size={12} /> Add achievement
                        </button>
                    )}
                </div>
            </section>

            <section className={sectionClass}>
                <SectionTitle icon={<BarChart3 size={16} />}>Stats & Performance</SectionTitle>
                <p className="text-xs text-gray-500 mb-5">Match history and metrics.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Match history</span>
                        {isEditing ? (
                            <textarea value={matchHistory} onChange={(e) => setMatchHistory(e.target.value)} placeholder="Match log…" rows={3} className={`${inputBase} resize-y min-h-[72px]`} />
                        ) : (
                            <p className="text-xs text-white/80 min-h-[2.5rem] py-2">{matchHistory || "—"}</p>
                        )}
                    </div>
                    <ProfileField label="Win / Loss ratio" value={winLossRatio} editing={isEditing} onChange={setWinLossRatio} />
                    <ProfileField label="Goals / Runs / Points" value={goalsRunsPoints} editing={isEditing} onChange={setGoalsRunsPoints} />
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Injury history (optional)</span>
                        {isEditing ? (
                            <textarea value={injuryHistory} onChange={(e) => setInjuryHistory(e.target.value)} placeholder="Past injuries, recovery…" rows={2} className={`${inputBase} resize-y min-h-[56px]`} />
                        ) : (
                            <p className="text-xs text-white/80 min-h-[2rem] py-2">{injuryHistory || "—"}</p>
                        )}
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/[0.06]">
                        <BarChart3 size={18} className="text-gray-600 shrink-0" />
                        <div>
                            <p className="text-xs font-medium text-gray-400">Performance graph</p>
                            <p className="text-[11px] text-gray-600">Charts and trends — coming soon.</p>
                        </div>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/[0.06]">
                        <Activity size={18} className="text-gray-600 shrink-0" />
                        <div>
                            <p className="text-xs font-medium text-gray-400">Fitness score</p>
                            <p className="text-[11px] text-gray-600">AI feature — coming later.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={sectionClass}>
                <SectionTitle icon={<Globe size={16} />}>Social & Visibility</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <ProfileField label="Instagram" value={instagram} editing={isEditing} onChange={setInstagram} />
                    <ProfileField label="Twitter" value={twitter} editing={isEditing} onChange={setTwitter} />
                    <ProfileField label="LinkedIn" value={linkedin} editing={isEditing} onChange={setLinkedin} />
                    <ProfileField label="YouTube" value={youtube} editing={isEditing} onChange={setYoutube} />
                    <div className="sm:col-span-2"><ProfileField label="Portfolio link" value={portfolioLink} editing={isEditing} onChange={setPortfolioLink} /></div>
                    <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="text-xs font-medium text-white/90">Profile visible to others</span>
                        {isEditing ? (
                            <button type="button" onClick={() => setProfilePublic(!profilePublic)} aria-pressed={profilePublic} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${profilePublic ? "bg-primary" : "bg-white/15"}`}>
                                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${profilePublic ? "left-6" : "left-0.5"}`} />
                            </button>
                        ) : (
                            <span className="text-xs text-white/80">{profilePublic ? "Yes" : "No"}</span>
                        )}
                    </div>
                </div>
            </section>

            <section className={sectionClass}>
                <SectionTitle icon={<FileText size={16} />}>Documents</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FileUploadField label="ID proof" value={idProofFile} onChange={setIdProofFile} editing={isEditing} />
                    <FileUploadField label="Certificates" value={certificatesFile} onChange={setCertificatesFile} editing={isEditing} />
                    <FileUploadField label="Medical certificate" value={medicalCertFile} onChange={setMedicalCertFile} editing={isEditing} />
                    <FileUploadField label="Resume (optional)" value={resumeFile} onChange={setResumeFile} editing={isEditing} />
                </div>
            </section>

            <section className={sectionClass}>
                <SectionTitle icon={<Settings size={16} />}>Settings</SectionTitle>
                <div className="space-y-2">
                    <SettingsRow icon={<Lock size={16} />} label="Change password" onClick={() => setShowChangePassword(true)} />
                    <SettingsRow icon={<Lock size={16} />} label="Two-factor authentication" onClick={() => toast.info("Two-factor authentication is coming soon.")} />
                    <SettingsRow icon={<Bell size={16} />} label="Notification preferences" onClick={() => setShowNotifications(true)} />
                    <div className="pt-2 mt-2 border-t border-white/[0.06]">
                        <button type="button" onClick={() => setShowDeleteAccount(true)} className={`${settingsRowClass} text-red-400/90 hover:bg-red-500/10 hover:text-red-400`}>
                            <Trash2 size={16} /> Delete account
                        </button>
                        <button type="button" onClick={handleLogout} className={`${settingsRowClass} text-red-400/90 hover:bg-red-500/10 hover:text-red-400`}>
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            </section>

            {/* Change password modal */}
            {showChangePassword && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => !changePwdLoading && setShowChangePassword(false)}>
                    <div className="w-full max-w-sm rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-white">Change password</h3>
                            <button type="button" onClick={() => !changePwdLoading && setShowChangePassword(false)} className="p-1 text-gray-500 hover:text-white rounded"><X size={18} /></button>
                        </div>
                        {user?.providerData?.[0]?.providerId !== "password" && (
                            <p className="text-xs text-amber-500/90 mb-4">Available only for accounts that use email and password sign-in.</p>
                        )}
                        <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Current password</label>
                                <input type="password" value={changePwdCurrent} onChange={(e) => setChangePwdCurrent(e.target.value)} required className={inputBase + " w-full"} placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">New password</label>
                                <input type="password" value={changePwdNew} onChange={(e) => setChangePwdNew(e.target.value)} required minLength={6} className={inputBase + " w-full"} placeholder="At least 6 characters" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Confirm new password</label>
                                <input type="password" value={changePwdConfirm} onChange={(e) => setChangePwdConfirm(e.target.value)} required className={inputBase + " w-full"} placeholder="••••••••" />
                            </div>
                            {changePwdError && <p className="text-xs text-red-400">{changePwdError}</p>}
                            <div className="flex gap-2 pt-2">
                                <button type="button" onClick={() => !changePwdLoading && setShowChangePassword(false)} className="flex-1 py-2.5 rounded-lg border border-white/15 text-white/90 text-sm font-medium">Cancel</button>
                                <button type="submit" disabled={changePwdLoading} className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-50">{changePwdLoading ? "Updating…" : "Update password"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Notification preferences modal */}
            {showNotifications && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowNotifications(false)}>
                    <div className="w-full max-w-sm rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-white">Notification preferences</h3>
                            <button type="button" onClick={() => setShowNotifications(false)} className="p-1 text-gray-500 hover:text-white rounded"><X size={18} /></button>
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between gap-4 cursor-pointer">
                                <span className="text-sm text-white/90">Email notifications</span>
                                <button type="button" role="switch" aria-checked={notificationPrefs.email} onClick={() => handleNotificationPrefToggle("email")} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notificationPrefs.email ? "bg-primary" : "bg-white/15"}`}>
                                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${notificationPrefs.email ? "left-6" : "left-0.5"}`} />
                                </button>
                            </label>
                            <label className="flex items-center justify-between gap-4 cursor-pointer">
                                <span className="text-sm text-white/90">Push notifications</span>
                                <button type="button" role="switch" aria-checked={notificationPrefs.push} onClick={() => handleNotificationPrefToggle("push")} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notificationPrefs.push ? "bg-primary" : "bg-white/15"}`}>
                                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${notificationPrefs.push ? "left-6" : "left-0.5"}`} />
                                </button>
                            </label>
                        </div>
                        <button type="button" onClick={() => setShowNotifications(false)} className="w-full mt-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold">Done</button>
                    </div>
                </div>
            )}

            {/* Delete account modal */}
            {showDeleteAccount && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => !deleteLoading && setShowDeleteAccount(false)}>
                    <div className="w-full max-w-sm rounded-2xl bg-[#0f0f0f] border border-red-500/20 shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-red-400">Delete account</h3>
                            <button type="button" onClick={() => !deleteLoading && setShowDeleteAccount(false)} className="p-1 text-gray-500 hover:text-white rounded"><X size={18} /></button>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">This will permanently delete your account and data. This cannot be undone.</p>
                        <form onSubmit={handleDeleteAccountSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Your password</label>
                                <input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} className={inputBase + " w-full"} placeholder="••••••••" autoComplete="current-password" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Type DELETE to confirm</label>
                                <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} className={inputBase + " w-full"} placeholder="DELETE" />
                            </div>
                            {deleteError && <p className="text-xs text-red-400">{deleteError}</p>}
                            <div className="flex gap-2 pt-2">
                                <button type="button" onClick={() => !deleteLoading && setShowDeleteAccount(false)} className="flex-1 py-2.5 rounded-lg border border-white/15 text-white/90 text-sm font-medium">Cancel</button>
                                <button type="submit" disabled={deleteLoading || deleteConfirmText.toUpperCase() !== "DELETE"} className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"> {deleteLoading ? "Deleting…" : "Delete account"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const inputBase = "bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-colors";
const sectionClass = "mb-8 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]";
const settingsRowClass = "flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-white/90 hover:bg-white/[0.06] transition-colors border border-transparent";

function SectionTitle({ icon, children }) {
    return (
        <h2 className="flex items-center gap-2 mb-5 text-sm font-semibold text-white/95">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">{icon}</span>
            {children}
        </h2>
    );
}

function SettingsRow({ icon, label, onClick }) {
    return (
        <button type="button" onClick={onClick} className={settingsRowClass}>
            {icon && <span className="text-gray-500 shrink-0">{icon}</span>}
            <span>{label}</span>
        </button>
    );
}

function ProfileField({ label, value, editing, onChange }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{label}</span>
            {editing && onChange ? (
                <input
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputBase}
                />
            ) : (
                <span className="text-xs text-white/80">{value ?? "—"}</span>
            )}
        </div>
    );
}

function FileUploadField({ label, value, onChange, editing }) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{label}</span>
            {editing ? (
                <label className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] cursor-pointer hover:bg-white/[0.06] transition-colors">
                    <Upload size={14} className="text-gray-500 shrink-0" />
                    <input type="file" className="hidden" onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")} />
                    <span className="text-xs text-gray-400 truncate">{value || "Choose file…"}</span>
                </label>
            ) : (
                <span className="text-xs text-white/80 py-2">{value || "Not uploaded"}</span>
            )}
        </div>
    );
}

export default Profile;
