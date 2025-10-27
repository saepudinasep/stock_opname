export default function SummaryCard({ title, value, color }) {
    return (
        <div className={`p-4 rounded-xl shadow-md text-center ${color}`}>
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}
