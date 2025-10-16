import { useEffect, useState } from "react";

export default function Home() {
    const [stats, setStats] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if (storedUser) {
            setUser(storedUser);
            generateStats(storedUser);
        }
    }, []);

    const generateStats = (user) => {
        // Contoh data simulasi — nanti bisa diganti fetch dari CSV
        if (user.role === "REGION") {
            setStats([
                { id: 1, name: "Cabang Handling", value: "14 Cabang" },
                { id: 2, name: "Cabang Sudah Mengisi", value: "7 Cabang" },
                { id: 3, name: "Cabang Belum Mengisi", value: "7 Cabang" },
            ]);
        } else if (user.role === "BRANCH") {
            setStats([
                { id: 1, name: "Unit yang Harus Update", value: "5 Unit" },
                { id: 2, name: "Sudah Update Hari Ini", value: "3 Unit" },
                { id: 3, name: "Belum Update", value: "2 Unit" },
            ]);
        } else {
            setStats([
                { id: 1, name: "Total Region", value: "5 Region" },
                { id: 2, name: "Total Branch", value: "48 Branch" },
                { id: 3, name: "Total Handling", value: "320 Handling" },
            ]);
        }
    };

    return (
        <div className="bg-white py-24 sm:py-32 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-10">
                    Dashboard Daily {user ? user.role : ""}
                </h2>

                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="mx-auto flex max-w-xs flex-col gap-y-4 bg-gray-50 shadow-md rounded-xl p-6"
                        >
                            <dt className="text-base text-gray-600">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
