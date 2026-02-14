import { db } from '../firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';

/**
 * Firestore Service
 * Centralized service for all Firestore operations
 * Provides real-time data synchronization across all portals
 */

// ==================== ATHLETES ====================

/**
 * Get athlete profile by ID with real-time updates
 * @param {string} athleteId - The athlete's user ID
 * @param {Function} callback - Callback function for real-time updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAthleteProfile = (athleteId, callback) => {
    const athleteRef = doc(db, 'athletes', athleteId);
    return onSnapshot(athleteRef, (snapshot) => {
        if (snapshot.exists()) {
            callback({ id: snapshot.id, ...snapshot.data() });
        } else {
            callback(null);
        }
    }, (error) => {
        console.error('Error subscribing to athlete profile:', error);
        callback(null);
    });
};

/**
 * Get all athletes with real-time updates
 * @param {Function} callback - Callback function for real-time updates
 * @param {Object} filters - Optional filters (verified, status, sport, level)
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAthletes = (callback, filters = {}) => {
    let athletesQuery = collection(db, 'athletes');

    // Apply filters
    const queryConstraints = [];
    if (filters.verified !== undefined) {
        queryConstraints.push(where('verified', '==', filters.verified));
    }
    if (filters.status) {
        queryConstraints.push(where('status', '==', filters.status));
    }
    if (filters.sport) {
        queryConstraints.push(where('sport', '==', filters.sport));
    }
    if (filters.level) {
        queryConstraints.push(where('level', '==', filters.level));
    }

    if (queryConstraints.length > 0) {
        athletesQuery = query(collection(db, 'athletes'), ...queryConstraints);
    }

    return onSnapshot(athletesQuery, (snapshot) => {
        const athletes = [];
        snapshot.forEach((doc) => {
            athletes.push({ id: doc.id, ...doc.data() });
        });
        callback(athletes);
    }, (error) => {
        console.error('Error subscribing to athletes:', error);
        callback([]);
    });
};

/**
 * Create or update athlete profile
 */
export const saveAthleteProfile = async (athleteId, profileData) => {
    try {
        const athleteRef = doc(db, 'athletes', athleteId);
        await setDoc(athleteRef, {
            ...profileData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return { success: true };
    } catch (error) {
        console.error('Error saving athlete profile:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Verify athlete (Admin only)
 */
export const verifyAthlete = async (athleteId, verified = true) => {
    try {
        const athleteRef = doc(db, 'athletes', athleteId);
        await updateDoc(athleteRef, {
            verified,
            verifiedAt: verified ? serverTimestamp() : null,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error verifying athlete:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update athlete status (Admin only)
 */
export const updateAthleteStatus = async (athleteId, status) => {
    try {
        const athleteRef = doc(db, 'athletes', athleteId);
        await updateDoc(athleteRef, {
            status, // 'active', 'suspended', 'inactive'
            statusUpdatedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating athlete status:', error);
        return { success: false, error: error.message };
    }
};

// ==================== PERFORMANCE ====================

/**
 * Subscribe to athlete performance logs with real-time updates
 */
export const subscribeToPerformanceLogs = (athleteId, callback) => {
    const performanceQuery = query(
        collection(db, 'athletes', athleteId, 'performance'),
        orderBy('date', 'desc')
    );

    return onSnapshot(performanceQuery, (snapshot) => {
        const logs = [];
        snapshot.forEach((doc) => {
            logs.push({ id: doc.id, ...doc.data() });
        });
        callback(logs);
    }, (error) => {
        console.error('Error subscribing to performance logs:', error);
        callback([]);
    });
};

/**
 * Log performance
 */
export const logPerformance = async (athleteId, performanceData) => {
    try {
        const performanceRef = collection(db, 'athletes', athleteId, 'performance');
        await setDoc(doc(performanceRef), {
            ...performanceData,
            athleteId,
            createdAt: serverTimestamp()
        });

        // Update athlete stats (could be a cloud function)
        await updateAthleteStats(athleteId);

        return { success: true };
    } catch (error) {
        console.error('Error logging performance:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update athlete stats based on performance logs
 */
const updateAthleteStats = async (athleteId) => {
    try {
        // Get all performance logs
        const performanceSnapshot = await getDocs(
            collection(db, 'athletes', athleteId, 'performance')
        );

        let totalSessions = 0;
        let totalDuration = 0;
        let avgIntensity = 0;

        performanceSnapshot.forEach((doc) => {
            const data = doc.data();
            totalSessions++;
            totalDuration += data.duration || 0;
            avgIntensity += data.intensity || 0;
        });

        if (totalSessions > 0) {
            avgIntensity = avgIntensity / totalSessions;
        }

        // Update athlete profile stats
        const athleteRef = doc(db, 'athletes', athleteId);
        await updateDoc(athleteRef, {
            stats: {
                totalSessions,
                totalDuration,
                avgIntensity,
                lastUpdated: serverTimestamp()
            }
        });
    } catch (error) {
        console.error('Error updating athlete stats:', error);
    }
};

// ==================== INJURIES ====================

/**
 * Subscribe to athlete injuries with real-time updates
 */
export const subscribeToInjuries = (athleteId, callback) => {
    const injuriesQuery = query(
        collection(db, 'athletes', athleteId, 'injuries'),
        orderBy('date', 'desc')
    );

    return onSnapshot(injuriesQuery, (snapshot) => {
        const injuries = [];
        snapshot.forEach((doc) => {
            injuries.push({ id: doc.id, ...doc.data() });
        });
        callback(injuries);
    }, (error) => {
        console.error('Error subscribing to injuries:', error);
        callback([]);
    });
};

/**
 * Add injury record
 */
export const addInjury = async (athleteId, injuryData) => {
    try {
        const injuryRef = collection(db, 'athletes', athleteId, 'injuries');
        await setDoc(doc(injuryRef), {
            ...injuryData,
            athleteId,
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error adding injury:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update injury record
 */
export const updateInjury = async (athleteId, injuryId, updates) => {
    try {
        const injuryRef = doc(db, 'athletes', athleteId, 'injuries', injuryId);
        await updateDoc(injuryRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating injury:', error);
        return { success: false, error: error.message };
    }
};

// ==================== OPPORTUNITIES ====================

/**
 * Subscribe to opportunities with real-time updates
 */
export const subscribeToOpportunities = (callback, filters = {}) => {
    let opportunitiesQuery = collection(db, 'opportunities');

    const queryConstraints = [];
    if (filters.sport) {
        queryConstraints.push(where('sport', '==', filters.sport));
    }
    if (filters.level) {
        queryConstraints.push(where('level', '==', filters.level));
    }
    if (filters.status) {
        queryConstraints.push(where('status', '==', filters.status));
    }

    queryConstraints.push(orderBy('createdAt', 'desc'));

    if (queryConstraints.length > 0) {
        opportunitiesQuery = query(collection(db, 'opportunities'), ...queryConstraints);
    }

    return onSnapshot(opportunitiesQuery, (snapshot) => {
        const opportunities = [];
        snapshot.forEach((doc) => {
            opportunities.push({ id: doc.id, ...doc.data() });
        });
        callback(opportunities);
    }, (error) => {
        console.error('Error subscribing to opportunities:', error);
        callback([]);
    });
};

/**
 * Create opportunity
 */
export const createOpportunity = async (opportunityData) => {
    try {
        const opportunityRef = doc(collection(db, 'opportunities'));
        await setDoc(opportunityRef, {
            ...opportunityData,
            status: 'active',
            applicants: [],
            createdAt: serverTimestamp()
        });
        return { success: true, id: opportunityRef.id };
    } catch (error) {
        console.error('Error creating opportunity:', error);
        return { success: false, error: error.message };
    }
};

// ==================== LEADERBOARD ====================

/**
 * Subscribe to leaderboard with real-time updates
 */
export const subscribeToLeaderboard = (callback, filters = {}) => {
    let leaderboardQuery = query(
        collection(db, 'leaderboard'),
        orderBy('rank', 'asc')
    );

    if (filters.limit) {
        leaderboardQuery = query(leaderboardQuery, limit(filters.limit));
    }

    return onSnapshot(leaderboardQuery, (snapshot) => {
        const rankings = [];
        snapshot.forEach((doc) => {
            rankings.push({ id: doc.id, ...doc.data() });
        });
        callback(rankings);
    }, (error) => {
        console.error('Error subscribing to leaderboard:', error);
        callback([]);
    });
};

/**
 * Recalculate leaderboard rankings
 * This would typically be a cloud function triggered on performance updates
 */
export const recalculateLeaderboard = async () => {
    try {
        // Get all verified athletes
        const athletesSnapshot = await getDocs(
            query(
                collection(db, 'athletes'),
                where('verified', '==', true),
                where('status', '==', 'active')
            )
        );

        const rankings = [];
        athletesSnapshot.forEach((doc) => {
            const athlete = doc.data();
            const score = calculateScore(athlete);
            rankings.push({
                athleteId: doc.id,
                name: athlete.name,
                sport: athlete.sport,
                level: athlete.level,
                score,
                verified: athlete.verified
            });
        });

        // Sort by score
        rankings.sort((a, b) => b.score - a.score);

        // Update leaderboard with ranks
        for (let i = 0; i < rankings.length; i++) {
            const ranking = rankings[i];
            const leaderboardRef = doc(db, 'leaderboard', ranking.athleteId);
            await setDoc(leaderboardRef, {
                ...ranking,
                rank: i + 1,
                updatedAt: serverTimestamp()
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Error recalculating leaderboard:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Calculate athlete score for leaderboard
 * This is a simplified version - should be more complex in production
 */
const calculateScore = (athlete) => {
    let score = 0;

    // Base score from stats
    if (athlete.stats) {
        score += (athlete.stats.totalSessions || 0) * 10;
        score += (athlete.stats.avgIntensity || 0) * 5;
    }

    // Level multiplier
    const levelMultiplier = {
        'International': 3,
        'National': 2.5,
        'State': 2,
        'District': 1.5,
        'School': 1
    };
    score *= (levelMultiplier[athlete.level] || 1);

    // Verified bonus
    if (athlete.verified) {
        score *= 1.2;
    }

    return Math.round(score);
};

// ==================== MESSAGES ====================

/**
 * Subscribe to user conversations
 */
export const subscribeToConversations = (userId, callback) => {
    const conversationsQuery = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        orderBy('lastMessageAt', 'desc')
    );

    return onSnapshot(conversationsQuery, (snapshot) => {
        const conversations = [];
        snapshot.forEach((doc) => {
            conversations.push({ id: doc.id, ...doc.data() });
        });
        callback(conversations);
    }, (error) => {
        console.error('Error subscribing to conversations:', error);
        callback([]);
    });
};

/**
 * Subscribe to messages in a conversation
 */
export const subscribeToMessages = (conversationId, callback) => {
    const messagesQuery = query(
        collection(db, 'conversations', conversationId, 'messages'),
        orderBy('timestamp', 'asc')
    );

    return onSnapshot(messagesQuery, (snapshot) => {
        const messages = [];
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        callback(messages);
    }, (error) => {
        console.error('Error subscribing to messages:', error);
        callback([]);
    });
};

/**
 * Send message
 */
export const sendMessage = async (conversationId, senderId, messageData) => {
    try {
        // Add message to conversation
        const messageRef = collection(db, 'conversations', conversationId, 'messages');
        await setDoc(doc(messageRef), {
            ...messageData,
            senderId,
            timestamp: serverTimestamp(),
            read: false
        });

        // Update conversation last message
        const conversationRef = doc(db, 'conversations', conversationId);
        await updateDoc(conversationRef, {
            lastMessage: messageData.text,
            lastMessageAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, error: error.message };
    }
};

// ==================== EVENTS ====================

/**
 * Subscribe to events with real-time updates
 */
export const subscribeToEvents = (callback, filters = {}) => {
    let eventsQuery = query(
        collection(db, 'events'),
        orderBy('date', 'asc')
    );

    if (filters.upcoming) {
        eventsQuery = query(
            eventsQuery,
            where('date', '>=', Timestamp.now())
        );
    }

    return onSnapshot(eventsQuery, (snapshot) => {
        const events = [];
        snapshot.forEach((doc) => {
            events.push({ id: doc.id, ...doc.data() });
        });
        callback(events);
    }, (error) => {
        console.error('Error subscribing to events:', error);
        callback([]);
    });
};

/**
 * Create event
 */
export const createEvent = async (eventData) => {
    try {
        const eventRef = doc(collection(db, 'events'));
        await setDoc(eventRef, {
            ...eventData,
            participants: [],
            createdAt: serverTimestamp()
        });
        return { success: true, id: eventRef.id };
    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, error: error.message };
    }
};

export default {
    // Athletes
    subscribeToAthleteProfile,
    subscribeToAthletes,
    saveAthleteProfile,
    verifyAthlete,
    updateAthleteStatus,

    // Performance
    subscribeToPerformanceLogs,
    logPerformance,

    // Injuries
    subscribeToInjuries,
    addInjury,
    updateInjury,

    // Opportunities
    subscribeToOpportunities,
    createOpportunity,

    // Leaderboard
    subscribeToLeaderboard,
    recalculateLeaderboard,

    // Messages
    subscribeToConversations,
    subscribeToMessages,
    sendMessage,

    // Events
    subscribeToEvents,
    createEvent
};
