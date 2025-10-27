import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

export default function ChartCard({ title, type = "bar", data, dataKey, nameKey }) {
    const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
            <div className="w-full h-64">
                <ResponsiveContainer>
                    {type === "bar" ? (
                        <BarChart data={data}>
                            <XAxis dataKey={nameKey} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey={dataKey} fill="#4F46E5" />
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey={dataKey}
                                nameKey={nameKey}
                                outerRadius={100}
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell key={index} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
