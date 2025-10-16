import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Insert from "./pages/Insert";
import About from "./pages/About";
import Navbar from "./components/Navbar";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("loggedIn") === "true"
    );
    const [userData, setUserData] = useState(() => {
        const storedUser = localStorage.getItem("userData");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Update state kalau localStorage berubah (misal dari logout)
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
            const storedUser = localStorage.getItem("userData");
            setUserData(storedUser ? JSON.parse(storedUser) : null);
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
            <Routes>
                <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />}
                />
                <Route
                    path="/"
                    element={isLoggedIn ? <Home userData={userData} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/insert"
                    element={isLoggedIn ? <Insert userData={userData} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/about"
                    element={isLoggedIn ? <About userData={userData} /> : <Navigate to="/login" />}
                />
                <Route
                    path="*"
                    element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
                />
            </Routes>
        </div>
    );
}
