# REAL-TIME DATA SYNC - IMPLEMENTATION GUIDE

## 🎯 HOW TO USE THE REAL-TIME SYSTEM

This guide shows you how to use the newly created real-time synchronization system across all portals.

---

## 📦 WHAT'S BEEN CREATED

### ✅ 1. Firestore Service (`src/services/firestoreService.js`)
Centralized service with real-time subscription functions for:
- Athletes
- Performance logs
- Injuries
- Opportunities
- Leaderboard
- Messages
- Events

### ✅ 2. Athlete Context (`src/context/AthleteContext.jsx`)
React Context providing:
- Real-time athlete data
- Custom hooks for specific data
- CRUD operations
- Automatic synchronization

---

## 🚀 QUICK START

### Step 1: Wrap Your App

Update `src/App.jsx` to include the AthleteProvider:

```jsx
import { AthleteProvider } from './context/AthleteContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <AthleteProvider>
        <ToastProvider>
          {/* Your routes */}
        </ToastProvider>
      </AthleteProvider>
    </AuthProvider>
  );
}
```

### Step 2: Use in Components

#### Example 1: Athlete Dashboard - Show Verified Badge

```jsx
import { useAthlete } from '../../context/AthleteContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const AthleteDashboard = () => {
    const { user } = useAuth();
    const { useAthleteProfile } = useAthlete();
    const { profile, loading } = useAthleteProfile(user?.uid);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {profile?.name}</h1>
            {profile?.verified && (
                <div className="flex items-center gap-2 text-primary">
                    <ShieldCheck size={20} className="fill-primary" />
                    <span>Verified Athlete</span>
                </div>
            )}
            {/* Rest of dashboard */}
        </div>
    );
};
```

**Real-time Magic:** When admin verifies this athlete, the badge appears **instantly** without page refresh!

---

#### Example 2: Coach Portal - Athlete List with Real-time Updates

```jsx
import { useAthlete } from '../../context/AthleteContext';
import { CheckCircle2, XCircle } from 'lucide-react';

const MyAthletes = () => {
    const { athletes, loading } = useAthlete();

    if (loading) return <div>Loading athletes...</div>;

    return (
        <div className="space-y-4">
            <h2>My Athletes</h2>
            {athletes.map((athlete) => (
                <div key={athlete.id} className="p-4 bg-white/5 rounded-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold">{athlete.name}</h3>
                            <p className="text-sm text-gray-400">
                                {athlete.sport} • {athlete.level}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Verification Status */}
                            {athlete.verified ? (
                                <span className="flex items-center gap-1 text-green-500">
                                    <CheckCircle2 size={16} />
                                    Verified
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-gray-500">
                                    <XCircle size={16} />
                                    Pending
                                </span>
                            )}
                            
                            {/* Account Status */}
                            <span className={`px-3 py-1 rounded-full text-xs ${
                                athlete.status === 'active' 
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-red-500/10 text-red-500'
                            }`}>
                                {athlete.status || 'Active'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
```

**Real-time Magic:** When any athlete's status changes, the list updates **automatically** for all coaches!

---

#### Example 3: Admin Portal - Verify Athlete

```jsx
import { useAthlete } from '../../context/AthleteContext';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Ban } from 'lucide-react';

const VerifyAthletes = () => {
    const { athletes, verifyAthlete, updateStatus } = useAthlete();
    const { addToast } = useToast();

    const handleVerify = async (athleteId, verified) => {
        const result = await verifyAthlete(athleteId, verified);
        if (result.success) {
            addToast({
                type: 'success',
                message: verified ? 'Athlete verified!' : 'Verification removed'
            });
        }
    };

    const handleSuspend = async (athleteId, status) => {
        const result = await updateStatus(athleteId, status);
        if (result.success) {
            addToast({
                type: 'success',
                message: `Athlete ${status === 'suspended' ? 'suspended' : 'activated'}!`
            });
        }
    };

    return (
        <div className="space-y-4">
            <h2>Athlete Management</h2>
            {athletes.map((athlete) =>  (
                <div key={athlete.id} className="p-6 bg-white/5 rounded-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">{athlete.name}</h3>
                            <p className="text-sm text-gray-400">
                                {athlete.email} • {athlete.sport}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {/* Verify Button */}
                            <button
                                onClick={() => handleVerify(athlete.id, !athlete.verified)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                                    athlete.verified
                                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                        : 'bg-primary text-white'
                                }`}
                            >
                                <CheckCircle2 size={16} className="inline mr-2" />
                                {athlete.verified ? 'Verified' : 'Verify'}
                            </button>

                            {/* Suspend Button */}
                            <button
                                onClick={() => handleSuspend(
                                    athlete.id,
                                    athlete.status === 'suspended' ? 'active' : 'suspended'
                                )}
                                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                                    athlete.status === 'suspended'
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : 'bg-red-500/10 text-red-500'
                                }`}
                            >
                                <Ban size={16} className="inline mr-2" />
                                {athlete.status === 'suspended' ? 'Activate' : 'Suspend'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
```

**Real-time Magic:** Click verify, and it updates across:
- ✅ Athlete's dashboard
- ✅ Coach's athlete list
- ✅ Public profile page
- ✅ Leaderboard
- ✅ Admin panel

---

#### Example 4: Athlete Performance Logging

```jsx
import { useState } from 'react';
import { useAthlete } from '../../context/AthleteContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const PerformanceLog = () => {
    const { user } = useAuth();
    const { logPerformance, usePerformanceLogs } = useAthlete();
    const { logs, loading } = usePerformanceLogs(user?.uid);
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        activityType: '',
        duration: '',
        intensity: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const result = await logPerformance(user.uid, {
            ...formData,
            duration: parseInt(formData.duration),
            intensity: parseInt(formData.intensity)
        });

        if (result.success) {
            addToast({
                type: 'success',
                message: 'Performance logged successfully!'
            });
            setFormData({
                activityType: '',
                duration: '',
                intensity: '',
                date: new Date().toISOString().split('T')[0],
                notes: ''
            });
        }
    };

    return (
        <div className="space-y-8">
            {/* Log Form */}
            <form onSubmit={handleSubmit} className="bg-white/5 p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-4">Log Performance</h2>
                {/* Form fields... */}
                <button type="submit" className="btn-primary">
                    Log Performance
                </button>
            </form>

            {/* Performance History */}
            <div>
                <h3 className="text-lg font-bold mb-4">Performance History</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="p-4 bg-white/5 rounded-xl">
                                <div className="flex justify-between">
                                    <div>
                                        <h4 className="font-bold">{log.activityType}</h4>
                                        <p className="text-sm text-gray-400">
                                            {log.duration} mins • Intensity: {log.intensity}/10
                                        </p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(log.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
```

**Real-time Magic:** When athlete logs performance:
- ✅ Their dashboard updates (stats, graphs)
- ✅ Coach sees it in Performance Monitoring
- ✅ Team analytics recalculate
- ✅ Leaderboard updates (if performance-based)

---

#### Example 5: Public Athlete Profile

```jsx
import { useParams } from 'react-router-dom';
import { useAthlete } from '../../context/AthleteContext';
import { ShieldCheck, Trophy, Activity } from 'lucide-react';

const PublicAthleteProfile = () => {
    const { id } = useParams();
    const { useAthleteProfile, usePerformanceLogs } = useAthlete();
    const { profile, loading } = useAthleteProfile(id);
    const { logs } = usePerformanceLogs(id);

    if (loading) return <div>Loading...</div>;
    if (!profile) return <div>Athlete not found</div>;

    // Only show if athlete is verified and active
    if (!profile.verified || profile.status !== 'active') {
        return <div>This profile is not publicly available</div>;
    }

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold">
                    {profile.name?.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">{profile.name}</h1>
                        {profile.verified && (
                            <ShieldCheck size={24} className="text-primary fill-primary/20" />
                        )}
                    </div>
                    <p className="text-gray-400">{profile.sport} • {profile.level}</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-xl">
                    <Activity size={20} className="text-primary mb-2" />
                    <p className="text-2xl font-bold">{profile.stats?.totalSessions || 0}</p>
                    <p className="text-sm text-gray-400">Training Sessions</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                    <Trophy size={20} className="text-orange-500 mb-2" />
                    <p className="text-2xl font-bold">{profile.rank || 'N/A'}</p>
                    <p className="text-sm text-gray-400">Global Rank</p>
                </div>
                {/* More stats... */}
            </div>

            {/* Recent Performance (last 5) */}
            <div>
                <h3 className="text-xl font-bold mb-4">Recent Performance</h3>
                <div className="space-y-3">
                    {logs.slice(0, 5).map((log) => (
                        <div key={log.id} className="p-4 bg-white/5 rounded-xl">
                            <h4 className="font-bold">{log.activityType}</h4>
                            <p className="text-sm text-gray-400">
                                {log.duration} mins • {new Date(log.date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
```

**Real-time Magic:** Public profile automatically shows/hides based on:
- ✅ Verification status
- ✅ Account status (suspended = hidden)
- ✅ Latest performance data
- ✅ Updated stats

---

## 🔥 INTERCONNECTION EXAMPLES

### 1. Athlete Verification Flow

```
Admin clicks "Verify" in Admin Portal
    ↓
firestoreService.verifyAthlete(athleteId, true)
    ↓
Firestore updates: athletes/{id}.verified = true
    ↓
Real-time listeners trigger in:
    • Athlete Dashboard (useAthleteProfile)
    • Coach Athlete List (useAthlete)
    • Public Profile (useAthleteProfile)
    • Leaderboard (subscribeToLeaderboard)
    ↓
ALL VIEWS UPDATE INSTANTLY!
```

### 2. Performance Logging Flow

```
Athlete logs performance
    ↓
firestoreService.logPerformance(athleteId, data)
    ↓
Firestore adds: athletes/{id}/performance/{logId}
    ↓
Cloud function (or updateAthleteStats) recalculates stats
    ↓
Updates:
    • athletes/{id}/stats (total sessions, avg intensity)
    • leaderboard/{id}/score (if performance-based)
    ↓
Real-time listeners trigger:
    • Athlete Dashboard (usePerformanceLogs)
    • Coach Performance Monitoring (usePerformanceLogs)
    • Public Profile (usePerformanceLogs)
    • Leaderboard (subscribeToLeaderboard)
```

### 3. Status Change Flow

```
Admin suspends athlete
    ↓
firestoreService.updateAthleteStatus(athleteId, 'suspended')
    ↓
Firestore updates: athletes/{id}.status = 'suspended'
    ↓
Real-time listeners trigger:
    • Athlete login check (redirect to suspended page)
    • Public profile (hide profile)
    • Coach list (show suspended badge)
    • Leaderboard (remove from rankings)
    • Messaging (block conversations)
```

---

## 📋 NEXT STEPS

### To Complete Full Interconnection:

1. **Wrap App.jsx with AthleteProvider** ✅
2. **Replace Mock Data** across all portals with real hooks
3. **Create Similar Contexts** for:
   - OpportunityContext
   - LeaderboardContext
   - MessageContext
   - EventContext

4. **Update All Portal Pages** to use real-time hooks instead of mock data

---

## 🎯 TESTING CHECKLIST

After implementation, verify:

- [ ] Admin verifies athlete → Badge appears in athlete dashboard
- [ ] Admin verifies athlete → Coach sees verified status
- [ ] Admin verifies athlete → Public profile shows badge
- [ ] Athlete logs performance → Stats update in dashboard
- [ ] Athlete logs performance → Coach sees new log
- [ ] Athlete logs performance → Leaderboard updates
- [ ] Admin suspends athlete → Profile hidden publicly
- [ ] Admin suspends athlete → Removed from leaderboard
- [ ] Profile edited → All views update

---

**The foundation is ready! Now integrate into your components!** 🚀
