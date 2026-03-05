import { createContext, useContext, useEffect, useState, useRef } from "react";
import { auth } from "../firebase";
import {
    onAuthStateChanged,
    signOut,
    updatePassword,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential
} from "firebase/auth";

// Added auto logout after tab close logic
const AUTO_LOGOUT_KEYS = {
    TABS: 'athlixir_auto_logout_tabs',
    DEADLINE: 'athlixir_auto_logout_at',
    TAB_ID: 'athlixir_tab_id',
};
const AUTO_LOGOUT_DELAY_MS = 600000; // 10 minutes - logout if all tabs closed for this long
const STALE_TAB_MS = 60000; // tabs not updated in this long are considered closed (crashed)

function getOrCreateTabId() {
    let id = sessionStorage.getItem(AUTO_LOGOUT_KEYS.TAB_ID);
    if (!id) {
        id = (typeof crypto !== 'undefined' && crypto.randomUUID)
            ? crypto.randomUUID()
            : `tab_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        sessionStorage.setItem(AUTO_LOGOUT_KEYS.TAB_ID, id);
    }
    return id;
}

function clearAuthStorageForAutoLogout() {
    localStorage.removeItem('user_role');
    Object.keys(localStorage).forEach((k) => {
        if (k.startsWith('role_')) localStorage.removeItem(k);
    });
    localStorage.removeItem(AUTO_LOGOUT_KEYS.TABS);
    localStorage.removeItem(AUTO_LOGOUT_KEYS.DEADLINE);
}

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    // Added auto logout after tab close logic: ref so beforeunload can see if user is logged in (only set deadline when logged in)
    const isLoggedInRef = useRef(false);

    useEffect(() => {
        // Check for admin login first
        const adminRole = localStorage.getItem('user_role');
        if (adminRole === 'admin') {
            // Create a mock admin user
            const adminUser = {
                uid: 'admin',
                email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@athlixir.com',
                displayName: 'Admin',
                isAdmin: true
            };
            setUser(adminUser);
            setCurrentUser(adminUser);
            setUserRole('admin');
            setLoading(false);
            return;
        }

        // Listen to Firebase auth state
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setCurrentUser(firebaseUser);

            if (firebaseUser) {
                // Get role from localStorage for Firebase users
                const role = localStorage.getItem(`role_${firebaseUser.uid}`) || 'athlete';
                setUserRole(role);
            } else {
                setUserRole(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Added auto logout after tab close logic: track open tabs; when all closed start 10min deadline; on reopen in time cancel, else sign out
    const tabIdRef = useRef(null);
    useEffect(() => {
        const tabId = getOrCreateTabId();
        tabIdRef.current = tabId;
        const now = Date.now();

        // Register this tab and prune stale entries (tabs that closed without beforeunload)
        let tabs = {};
        try {
            tabs = JSON.parse(localStorage.getItem(AUTO_LOGOUT_KEYS.TABS) || '{}');
        } catch (_) { /* ignore */ }
        Object.keys(tabs).forEach((id) => {
            if (now - tabs[id] > STALE_TAB_MS) delete tabs[id];
        });
        tabs[tabId] = now;
        localStorage.setItem(AUTO_LOGOUT_KEYS.TABS, JSON.stringify(tabs));

        // Check deadline: if past, auto-logout; if still in future, cancel (user reopened in time)
        const deadlineRaw = localStorage.getItem(AUTO_LOGOUT_KEYS.DEADLINE);
        if (deadlineRaw) {
            const deadline = parseInt(deadlineRaw, 10);
            if (Date.now() >= deadline) {
                clearAuthStorageForAutoLogout();
                signOut(auth);
            } else {
                localStorage.removeItem(AUTO_LOGOUT_KEYS.DEADLINE);
            }
        }

        const handleBeforeUnload = () => {
            let currentTabs = {};
            try {
                currentTabs = JSON.parse(localStorage.getItem(AUTO_LOGOUT_KEYS.TABS) || '{}');
            } catch (_) { /* ignore */ }
            const id = tabIdRef.current || tabId;
            delete currentTabs[id];
            localStorage.setItem(AUTO_LOGOUT_KEYS.TABS, JSON.stringify(currentTabs));
            // Only start 10-minute countdown when ALL tabs are closed and user was logged in
            if (Object.keys(currentTabs).length === 0 && isLoggedInRef.current) {
                localStorage.setItem(AUTO_LOGOUT_KEYS.DEADLINE, String(Date.now() + AUTO_LOGOUT_DELAY_MS));
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            // Remove this tab from map on unmount so we don't leak; do NOT set deadline (only beforeunload = real close)
            try {
                const currentTabs = JSON.parse(localStorage.getItem(AUTO_LOGOUT_KEYS.TABS) || '{}');
                if (tabIdRef.current) delete currentTabs[tabIdRef.current];
                localStorage.setItem(AUTO_LOGOUT_KEYS.TABS, JSON.stringify(currentTabs));
            } catch (_) { /* ignore */ }
        };
    }, []);

    // Added auto logout after tab close logic: keep ref in sync so beforeunload only sets deadline when user is logged in
    useEffect(() => {
        isLoggedInRef.current = !!currentUser;
    }, [currentUser]);

    // Re-check admin status when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const adminRole = localStorage.getItem('user_role');
            if (adminRole === 'admin' && !currentUser?.isAdmin) {
                const adminUser = {
                    uid: 'admin',
                    email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@athlixir.com',
                    displayName: 'Admin',
                    isAdmin: true
                };
                setUser(adminUser);
                setCurrentUser(adminUser);
                setUserRole('admin');
            } else if (!adminRole && currentUser?.isAdmin) {
                setUser(null);
                setCurrentUser(null);
                setUserRole(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [currentUser]);

    const logout = async () => {
        // Clear admin role
        localStorage.removeItem('user_role');

        // Sign out from Firebase if regular user
        if (user && !user.isAdmin) {
            await signOut(auth);
        }

        setUser(null);
        setCurrentUser(null);
        setUserRole(null);
    };

    /** Change password (email/password users only). Requires current password. */
    const changePassword = async (currentPassword, newPassword) => {
        if (!user || user.isAdmin) {
            return { success: false, error: "Not signed in or admin account." };
        }
        if (!user.email) {
            return { success: false, error: "No email linked to this account." };
        }
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            return { success: true };
        } catch (err) {
            const message = err.code === "auth/wrong-password" || err.code === "auth/invalid-credential"
                ? "Current password is incorrect."
                : err.message || "Failed to change password.";
            return { success: false, error: message };
        }
    };

    /** Delete account (email/password users). Requires current password for reauth. */
    const deleteAccount = async (password) => {
        if (!user || user.isAdmin) {
            return { success: false, error: "Cannot delete admin account." };
        }
        if (!user.email) {
            return { success: false, error: "No email linked to this account." };
        }
        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
            await deleteUser(user);
            clearAuthStorageForAutoLogout();
            setUser(null);
            setCurrentUser(null);
            setUserRole(null);
            return { success: true };
        } catch (err) {
            const message = err.code === "auth/wrong-password" || err.code === "auth/invalid-credential"
                ? "Password is incorrect."
                : err.message || "Failed to delete account.";
            return { success: false, error: message };
        }
    };

    const value = {
        user,
        currentUser,
        userRole,
        logout,
        changePassword,
        deleteAccount,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Added auth redirect fix: always render children so app never shows blank during auth loading; routes handle loading/redirect themselves */}
            {children}
        </AuthContext.Provider>
    );
};
