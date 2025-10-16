import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";

export default function Login({ setIsLoggedIn, setUserData }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Ganti dengan URL hasil Publish to Web CSV milik kamu
    const USERS_URL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQv4Lx5v0oDBHQbioe5FHZMDNLkWuAaO9UPoBqnMOV8DYpDx4csxQkaOAlAdME8PQCjf3ty3qU5P71C/pub?gid=1938563269&single=true&output=csv";
    const HANDLING_URL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQv4Lx5v0oDBHQbioe5FHZMDNLkWuAaO9UPoBqnMOV8DYpDx4csxQkaOAlAdME8PQCjf3ty3qU5P71C/pub?gid=57016800&single=true&output=csv";

    useEffect(() => {
        if (localStorage.getItem("loggedIn") === "true") {
            navigate("/");
        }
    }, [navigate]);

    const parseCSV = (text) => {
        const [header, ...rows] = text.trim().split("\n");
        const keys = header.split(",").map((h) => h.trim());
        return rows.map((r) => {
            const values = r.split(",");
            return keys.reduce(
                (obj, key, i) => ({ ...obj, [key]: values[i]?.trim() }),
                {}
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // ⏳ mulai loader

        try {
            const resUsers = await fetch(USERS_URL);
            const textUsers = await resUsers.text();
            const users = parseCSV(textUsers);

            const match = users.find(
                (u) =>
                    u.USERNAME?.toLowerCase() === username.toLowerCase() &&
                    u.PASSWORD === password &&
                    u.ACTIVE === "TRUE"
            );

            if (!match) {
                setLoading(false);
                Swal.fire({
                    title: "Login Gagal!",
                    text: "Username atau password salah, atau akun tidak aktif.",
                    icon: "error",
                    confirmButtonColor: "#6366F1",
                });
                return;
            }

            const resHandling = await fetch(HANDLING_URL);
            const textHandling = await resHandling.text();
            const handling = parseCSV(textHandling);

            const userHandling = handling.filter(
                (h) =>
                    h.Region_Username?.toLowerCase() === username.toLowerCase()
            );

            const userData = {
                id: match.ID,
                username: match.USERNAME,
                nama: match.NAMA,
                role: match.ROLE,
                region_name: match.REGION_NAME,
                region_code: match.REGION_CODE,
                branch_name: match.BRANCH_NAME,
                branch_code: match.BRANCH_CODE,
                handling: userHandling,
            };

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userData", JSON.stringify(userData));
            setIsLoggedIn(true);
            setUserData(userData);

            Swal.fire({
                title: "Login Berhasil!",
                text: `Selamat datang, ${match.NAMA}! 👋`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            setTimeout(() => {
                setLoading(false);
                navigate("/");
            }, 1500);
        } catch (err) {
            setLoading(false);
            console.error("DEBUG ERROR FETCH:", err);
            Swal.fire({
                title: "Error",
                text: "Gagal memuat data login. Periksa koneksi atau URL CSV.",
                icon: "error",
            });
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-white px-6 py-12">
            {/* LOADER OVERLAY */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                </div>
            )}

            {/* CARD LOGIN */}
            <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8">
                <div className="flex flex-col items-center">
                    <img src={logo} alt="Logo" className="h-16 w-auto mb-6" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Sign in to your account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
