import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, reverse = false }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
            </div>
        )
    }

    if (reverse) {
        // If reverse is true, we redirect away from this page if the user IS logged in
        // Useful for Login/Signup pages
        return user ? <Navigate to="/dashboard" replace /> : children
    }

    // Otherwise, redirect to login if NOT logged in
    return user ? children : <Navigate to="/login" state={{ from: location }} replace />
}
