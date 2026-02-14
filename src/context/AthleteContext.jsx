import { createContext, useContext, useState, useEffect } from 'react';
import {
    subscribeToAthleteProfile,
    subscribeToAthletes,
    saveAthleteProfile,
    verifyAthlete as verifyAthleteService,
    updateAthleteStatus as updateAthleteStatusService,
    subscribeToPerformanceLogs,
    logPerformance as logPerformanceService,
    subscribeToInjuries,
    addInjury as addInjuryService,
    updateInjury as updateInjuryService
} from '../services/firestoreService';

const AthleteContext = createContext();

export const useAthlete = () => {
    const context = useContext(AthleteContext);
    if (!context) {
        throw new Error('useAthlete must be used within AthleteProvider');
    }
    return context;
};

export const AthleteProvider = ({ children }) => {
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Subscribe to all athletes (for listings)
    useEffect(() => {
        setLoading(true);
        const unsubscribe = subscribeToAthletes((athletesData) => {
            setAthletes(athletesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /**
     * Get specific athlete profile with real-time updates
     */
    const useAthleteProfile = (athleteId) => {
        const [profile, setProfile] = useState(null);
        const [profileLoading, setProfileLoading] = useState(true);

        useEffect(() => {
            if (!athleteId) {
                setProfile(null);
                setProfileLoading(false);
                return;
            }

            setProfileLoading(true);
            const unsubscribe = subscribeToAthleteProfile(athleteId, (profileData) => {
                setProfile(profileData);
                setProfileLoading(false);
            });

            return () => unsubscribe();
        }, [athleteId]);

        return { profile, loading: profileLoading };
    };

    /**
     * Get athlete performance logs with real-time updates
     */
    const usePerformanceLogs = (athleteId) => {
        const [logs, setLogs] = useState([]);
        const [logsLoading, setLogsLoading] = useState(true);

        useEffect(() => {
            if (!athleteId) {
                setLogs([]);
                setLogsLoading(false);
                return;
            }

            setLogsLoading(true);
            const unsubscribe = subscribeToPerformanceLogs(athleteId, (logsData) => {
                setLogs(logsData);
                setLogsLoading(false);
            });

            return () => unsubscribe();
        }, [athleteId]);

        return { logs, loading: logsLoading };
    };

    /**
     * Get athlete injuries with real-time updates
     */
    const useInjuries = (athleteId) => {
        const [injuries, setInjuries] = useState([]);
        const [injuriesLoading, setInjuriesLoading] = useState(true);

        useEffect(() => {
            if (!athleteId) {
                setInjuries([]);
                setInjuriesLoading(false);
                return;
            }

            setInjuriesLoading(true);
            const unsubscribe = subscribeToInjuries(athleteId, (injuriesData) => {
                setInjuries(injuriesData);
                setInjuriesLoading(false);
            });

            return () => unsubscribe();
        }, [athleteId]);

        return { injuries, loading: injuriesLoading };
    };

    /**
     * Get filtered athletes
     */
    const getFilteredAthletes = (filters = {}) => {
        let filtered = [...athletes];

        if (filters.verified !== undefined) {
            filtered = filtered.filter(a => a.verified === filters.verified);
        }

        if (filters.status) {
            filtered = filtered.filter(a => a.status === filters.status);
        }

        if (filters.sport) {
            filtered = filtered.filter(a => a.sport === filters.sport);
        }

        if (filters.level) {
            filtered = filtered.filter(a => a.level === filters.level);
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(a =>
                a.name?.toLowerCase().includes(searchLower) ||
                a.email?.toLowerCase().includes(searchLower) ||
                a.sport?.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    };

    /**
     * Save athlete profile
     */
    const updateProfile = async (athleteId, profileData) => {
        try {
            setError(null);
            const result = await saveAthleteProfile(athleteId, profileData);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    /**
     * Verify athlete (Admin only)
     */
    const verifyAthlete = async (athleteId, verified = true) => {
        try {
            setError(null);
            const result = await verifyAthleteService(athleteId, verified);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    /**
     * Update athlete status (Admin only)
     */
    const updateStatus = async (athleteId, status) => {
        try {
            setError(null);
            const result = await updateAthleteStatusService(athleteId, status);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    /**
     * Log performance
     */
    const logPerformance = async (athleteId, performanceData) => {
        try {
            setError(null);
            const result = await logPerformanceService(athleteId, performanceData);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    /**
     * Add injury
     */
    const addInjury = async (athleteId, injuryData) => {
        try {
            setError(null);
            const result = await addInjuryService(athleteId, injuryData);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    /**
     * Update injury
     */
    const updateInjury = async (athleteId, injuryId, updates) => {
        try {
            setError(null);
            const result = await updateInjuryService(athleteId, injuryId, updates);
            if (!result.success) {
                setError(result.error);
            }
            return result;
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    const value = {
        // Data
        athletes,
        loading,
        error,

        // Hooks
        useAthleteProfile,
        usePerformanceLogs,
        useInjuries,

        // Filters
        getFilteredAthletes,

        // Actions
        updateProfile,
        verifyAthlete,
        updateStatus,
        logPerformance,
        addInjury,
        updateInjury
    };

    return (
        <AthleteContext.Provider value={value}>
            {children}
        </AthleteContext.Provider>
    );
};

export default AthleteContext;
