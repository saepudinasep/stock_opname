import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import ActivityTable from "../components/ActivityTable";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setIsLoggedIn }) {
    const [userData, setUserData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_URL =
        "https://script.google.com/macros/s/AKfycbwjOxxAwDlaON2LHbbdPMpEHMlmjOEhqR56Dm_pLjV6Arw8o9caaNPTi6gwJFA0pDUj/exec"; // Ganti dengan URL Apps Script kamu

    useEffect(() => {
        const saved = localStorage.getItem("userData");
        const loggedIn = localStorage.getItem("loggedIn");

        if (loggedIn !== "true" || !saved) {
            Swal.fire({
                title: "Session Habis",
                text: "Silakan login ulang.",
                icon: "warning",
                confirmButtonColor: "#6366F1",
            }).then(() => {
                setIsLoggedIn(false);
                setUserData(null);
                navigate("/login");
            });
            return;
        }

        const user = JSON.parse(saved);
        setUserData(user);
        setIsLoggedIn(true);

        const url = `${API_URL}?action=getDashboard&role=${user.role}&username=${user.username}&branch_code=${user.branch_code}&region_code=${user.region_code}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => setDashboardData(data))
            .catch((err) => {
                console.error("Gagal memuat dashboard:", err);
                Swal.fire("Error", "Gagal memuat data dashboard", "error");
            })
            .finally(() => setLoading(false));
    }, [navigate, setIsLoggedIn, setUserData]);

    if (loading)
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
            </div>
        );

    if (!dashboardData || !userData)
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Data tidak ditemukan</p>
            </div>
        );

    const { summary, chart, activities } = dashboardData;
    const { role } = userData;

    // 🔹 Convert chart data
    // const chartData = Object.entries(chart || {}).map(([name, value]) => ({
    //     name,
    //     value,
    // }));
    // const chartData = Object.entries(chart || {}).flatMap(([chartName, chartValue]) => {
    //     if (typeof chartValue === "object" && chartValue !== null) {
    //         return Object.entries(chartValue).map(([key, val]) => ({
    //             name: key,
    //             value: val,
    //         }));
    //     } else {
    //         return [{ name: chartName, value: chartValue }];
    //     }
    // });

    const CATEGORY_LIST = [
        "Motor Baru",
        "Motorku",
        "Mobilku",
        "Masku",
        "Hajiku",
        "Matprom",
    ];

    let chartData = [];

    if (role === "Head Office") {
        chartData = CATEGORY_LIST.map(cat => ({
            name: cat,
            value: chart.tabSummary?.[cat] || 0,
        }));
    } else if (role === "region") {
        chartData = CATEGORY_LIST.map(cat => ({
            name: cat,
            value: chart.tabSummary?.[cat] || 0,
        }));
    } else {
        chartData = CATEGORY_LIST.map(cat => ({
            name: cat,
            value: chart.tabSummary?.[cat] || 0,
        }));
    }

    console.log(chartData);



    // ==========================================================
    // 🔸 Layout & Summary per Role
    // ==========================================================
    const renderSummaryCards = () => {
        if (role === "Head Office") {
            return (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <SummaryCard
                        title="Jumlah Region"
                        subtitle="(Sudah vs Belum)"
                        value={`${summary.regionFilled}/${summary.regionTotal}`}
                        color="bg-indigo-100"
                    />
                    <SummaryCard
                        title="Total Branch"
                        subtitle="(Sudah vs Belum)"
                        value={`${summary.branchFilled}/${summary.branchTotal}`}
                        color="bg-blue-100"
                    />
                    <SummaryCard
                        title="Total Item"
                        value={summary.totalItems}
                        color="bg-green-100"
                    />
                    <SummaryCard
                        title="Kategori"
                        subtitle="(Sudah vs Belum)"
                        value={`${summary.categoryFilled}/${summary.categoryTotal}`}
                        color="bg-yellow-100"
                    />
                </div>
            );
        }

        if (role === "region") {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SummaryCard
                        title="Jumlah Branch Handling"
                        subtitle="(Sudah vs Belum)"
                        value={`${summary.branchFilled}/${summary.branchTotal}`}
                        color="bg-indigo-100"
                    />
                    <SummaryCard
                        title="Total Item"
                        value={summary.totalItems}
                        color="bg-green-100"
                    />
                    <SummaryCard
                        title="Kategori"
                        subtitle="(Sudah vs Belum)"
                        value={`${summary.categoryFilled}/${summary.categoryTotal}`}
                        color="bg-yellow-100"
                    />
                </div>
            );
        }

        // Default: Branch
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SummaryCard
                    title="Total Item"
                    value={summary.totalItems}
                    color="bg-green-100"
                />
                <SummaryCard
                    title="Kategori"
                    subtitle="(Sudah vs Belum)"
                    value={`${summary.categoryFilled}/${summary.categoryTotal}`}
                    color="bg-yellow-100"
                />
            </div>
        );
    };

    // ==========================================================
    // 🔸 Charts per Role
    // ==========================================================
    const renderCharts = () => {
        if (role === "Head Office") {
            return (
                <div className="overflow-x-auto">
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 min-w-[600px] md:min-w-0">
                        <ChartCard
                            title="Persentase Region Sudah vs Belum"
                            type="pie"
                            data={[
                                { name: "Sudah", value: summary.regionFilled },
                                {
                                    name: "Belum",
                                    value:
                                        summary.regionTotal - summary.regionFilled,
                                },
                            ]}
                            dataKey="value"
                            nameKey="name"
                        />
                        <ChartCard
                            title="Persentase Branch Sudah vs Belum"
                            type="pie"
                            data={[
                                { name: "Sudah", value: summary.branchFilled },
                                {
                                    name: "Belum",
                                    value:
                                        summary.branchTotal - summary.branchFilled,
                                },
                            ]}
                            dataKey="value"
                            nameKey="name"
                        />
                    </div>
                </div>
            );
        }

        if (role === "region") {
            return (
                <div className="overflow-x-auto">
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 min-w-[600px] md:min-w-0">
                        <ChartCard
                            title="Branch Handling Sudah vs Belum"
                            type="pie"
                            data={[
                                { name: "Sudah", value: summary.branchFilled },
                                {
                                    name: "Belum",
                                    value:
                                        summary.branchTotal - summary.branchFilled,
                                },
                            ]}
                            dataKey="value"
                            nameKey="name"
                        />
                        <ChartCard
                            title="Kategori Sudah vs Belum"
                            type="pie"
                            data={[
                                { name: "Sudah", value: summary.categoryFilled },
                                {
                                    name: "Belum",
                                    value:
                                        summary.categoryTotal -
                                        summary.categoryFilled,
                                },
                            ]}
                            dataKey="value"
                            nameKey="name"
                        />
                    </div>
                </div>
            );
        }

        // Branch
        return (
            <div className="overflow-x-auto">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 min-w-[600px] md:min-w-0">
                    <ChartCard
                        title="Kategori Sudah vs Belum"
                        type="pie"
                        data={[
                            { name: "Sudah", value: summary.categoryFilled },
                            {
                                name: "Belum",
                                value:
                                    summary.categoryTotal -
                                    summary.categoryFilled,
                            },
                        ]}
                        dataKey="value"
                        nameKey="name"
                    />
                    <ChartCard
                        title="Total Item per Kategori"
                        type="bar"
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                    />
                </div>
            </div>
        );
    };


    // ==========================================================
    // 🔸 Render Dashboard
    // ==========================================================
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Dashboard{" "}
                        {role === "Head Office"
                            ? "Head Office"
                            : role === "region"
                                ? userData.region_name
                                : role === "branch"
                                    ? userData.branch_name
                                    : ""}
                    </h1>
                </div>

                {/* Summary */}
                {renderSummaryCards()}

                {/* Charts */}
                {renderCharts()}

                {/* Activity Table */}
                <ActivityTable data={activities} pageSize={10} />
            </div>
        </div>
    );
}
