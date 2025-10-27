import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        // redirect ke login jika belum login
        return <Navigate to="/login" replace />;
    }

    // jika sudah login, tampilkan halaman yang diminta
    return children;
}
