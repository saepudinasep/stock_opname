import { useEffect, useState } from "react";

export default function Home() {
    const [stats, setStats] = useState([]);
    const [user, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if (storedUser) {
            setUserData(storedUser);
            if (storedUser.role === "region") {
                fetchInsertData(storedUser);
            } else {
                generateStats(storedUser);
            }
        }
    }, []);

    const fetchInsertData = async (user) => {
        try {
            const sheetUrl =
                "https://docs.google.com/spreadsheets/d/e/2PACX-1vQv4Lx5v0oDBHQbioe5FHZMDNLkWuAaO9UPoBqnMOV8DYpDx4csxQkaOAlAdME8PQCjf3ty3qU5P71C/pub?gid=2464077&single=true&output=csv";

            const res = await fetch(sheetUrl);
            const csvText = await res.text();

            // --- PARSE CSV ---
            const rows = csvText.split("\n").filter(r => r.trim() !== "");
            const headers = rows[0].split(",").map(h => h.trim());
            const data = rows.slice(1).map((r) => {
                const values = r.split(",");
                return Object.fromEntries(
                    headers.map((h, i) => [h.trim(), values[i]?.trim()])
                );
            });

            // console.log("=== DEBUG CSV DATA ===");
            // console.log("Headers:", headers);
            // console.log("Sample:", data.slice(0, 5));

            // --- AMBIL CABANG HANDLING DARI USER ---
            const allBranches = user.handling
                .map((b) => (b.Branch_Code || b.branch_code || "").trim())
                .filter(Boolean);
            // console.log("Handling branches:", allBranches);

            // --- AMBIL CABANG DARI SHEET (UNIQUE) ---
            const uniqueFilledBranches = [
                ...new Set(
                    data
                        .map((d) => d.Branch_Code?.trim())
                        .filter((v) => v && v !== "Branch_Code")
                ),
            ];

            // console.log("Filled branches from sheet:", uniqueFilledBranches);

            // --- FILTER HANYA CABANG YANG ADA DI HANDLING ---
            const filledBranches = allBranches.filter((b) =>
                uniqueFilledBranches.includes(b)
            );
            const unfilledBranches = allBranches.filter(
                (b) => !uniqueFilledBranches.includes(b)
            );

            // console.log("Matched (filled):", filledBranches);
            // console.log("Unfilled:", unfilledBranches);

            // --- HITUNG TOTAL ---
            const total = allBranches.length;
            const filled = filledBranches.length;
            const unfilled = total - filled;

            setStats([
                { id: 1, name: "Cabang Handling", value: `${total} Cabang` },
                { id: 2, name: "Cabang Sudah Mengisi", value: `${filled} Cabang` },
                { id: 3, name: "Cabang Belum Mengisi", value: `${unfilled} Cabang` },
            ]);

            // --- DEBUG DETAIL TABEL ---
            // console.table({
            //     total,
            //     filled,
            //     unfilled,
            //     allBranches,
            //     filledBranches,
            //     unfilledBranches,
            // });
        } catch (err) {
            console.error("Error fetching or parsing data:", err);
        }
    };

    const generateStats = (user) => {
        if (user.role === "branch") {
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
        <div className="bg-white py-24 sm:py-32 min-h-screen relative">
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
