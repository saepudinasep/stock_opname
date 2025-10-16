import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Navbar({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        Swal.fire({
            title: "Logout?",
            text: "Yakin ingin keluar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, logout",
            cancelButtonText: "Batal",
            confirmButtonColor: "#ef4444",
        }).then((r) => {
            if (r.isConfirmed) {
                setLoading(true);
                setTimeout(() => {
                    localStorage.removeItem("loggedIn");
                    localStorage.removeItem("userData");
                    setIsLoggedIn(false);
                    setLoading(false);
                    Swal.fire({
                        title: "Berhasil logout!",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                    });
                    setTimeout(() => navigate("/login"), 1000);
                }, 800);
            }
        });
    };

    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                </div>
            )}

            <nav className="flex justify-center gap-6 py-4 bg-gray-800 text-sm text-gray-200">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1"
                            : "hover:text-indigo-400"
                    }
                    end
                >
                    Home
                </NavLink>

                <NavLink
                    to="/insert"
                    className={({ isActive }) =>
                        isActive
                            ? "text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1"
                            : "hover:text-indigo-400"
                    }
                >
                    Insert
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? "text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1"
                            : "hover:text-indigo-400"
                    }
                >
                    About
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
}
