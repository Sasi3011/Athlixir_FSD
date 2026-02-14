import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * RoleProtectedRoute Component
 * Protects routes based on user role
 * 
 * @param {string|string[]} allowedRoles - Single role or array of allowed roles
 * @param {string} redirectPath - Where to redirect if unauthorized (default: '/login')
 */
const RoleProtectedRoute = ({ allowedRoles, redirectPath = '/login', children }) => {
    const { currentUser, userRole, loading } = useAuth();

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
    }

    // Convert single role to array for consistent checking
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    // Check if user has required role
    const hasRequiredRole = rolesArray.includes(userRole);

    if (!hasRequiredRole) {
        // Redirect based on user's actual role
        const roleRedirects = {
            athlete: '/athlete/dashboard',
            coach: '/coach/dashboard',
            user: '/user/dashboard',
            admin: '/admin/dashboard',
        };

        const defaultRedirect = roleRedirects[userRole] || '/portal';
        return <Navigate to={defaultRedirect} replace />;
    }

    // User has required role, render the protected content
    return children ? children : <Outlet />;
};

export default RoleProtectedRoute;
