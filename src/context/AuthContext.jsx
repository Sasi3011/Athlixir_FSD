import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const value = {
        user,
        currentUser,
        userRole,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
