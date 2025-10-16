import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        <div className="relative flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
            {/* LOADER OVERLAY */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
                </div>
            )}

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm/6 font-medium text-gray-100"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                type="text"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-gray-100"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Not a member?
                    <a
                        href="#"
                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
    );
}
