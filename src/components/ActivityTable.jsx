import { useState, useMemo } from "react";

export default function ActivityTable({ data, pageSize = 10 }) {
    const [selectedRegion, setSelectedRegion] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);


    const REGION_OPTIONS = [
        "BU I - JABODEBEK",
        "BU XIII - BANTEN",
        "BU VI - JATIM BALI",
        "BU V - JATENG SELATAN",
        "BU VIII - SUMBAGSEL",
        "BU XIV - JATENG UTARA",
        "BU VII - SUMBAGUT",
        "BU XV - KALIMANTAN",
        "BU III - JAWA BARAT",
        "BU IX - SULAWESI",
    ];

    const filteredData = useMemo(() => {
        if (selectedRegion === "ALL") return data;
        return data.filter((d) => d.Region === selectedRegion);
    }, [data, selectedRegion]);

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage, pageSize]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formatTimestamp = (isoString) => {
        if (!isoString) return "-";

        return new Date(isoString).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Aktivitas Terbaru
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <select
                    value={selectedRegion}
                    onChange={handleRegionChange}
                    className="w-full sm:w-64 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ALL">Semua Region</option>
                    {REGION_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-2 text-left">Timestamp</th>
                            <th className="px-4 py-2 text-left">Region</th>
                            <th className="px-4 py-2 text-left">Branch</th>
                            <th className="px-4 py-2 text-left">Item</th>
                            <th className="px-4 py-2 text-left">Jumlah</th>
                            <th className="px-4 py-2 text-left">Brand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    className="px-4 py-4 text-center text-gray-500"
                                    colSpan="5"
                                >
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((r, i) => (
                                <tr key={i} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{formatTimestamp(r.Timestamp)} WIB</td>
                                    <td className="px-4 py-2">{r.Region}</td>
                                    <td className="px-4 py-2">{r.Branch}</td>
                                    <td className="px-4 py-2">{r.Item}</td>
                                    <td className="px-4 py-2">{r.Jumlah}</td>
                                    <td className="px-4 py-2">{r.Tab}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`px-3 py-1 border rounded
                                        ${page === currentPage
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
