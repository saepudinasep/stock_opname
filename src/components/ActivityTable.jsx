export default function ActivityTable({ data }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Aktivitas Terbaru
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-2 text-left">Timestamp</th>
                            <th className="px-4 py-2 text-left">Branch</th>
                            <th className="px-4 py-2 text-left">Item</th>
                            <th className="px-4 py-2 text-left">Jumlah</th>
                            <th className="px-4 py-2 text-left">Tab</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td className="px-4 py-2 text-center" colSpan="5">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            data.map((r, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{r.Timestamp}</td>
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
        </div>
    );
}
