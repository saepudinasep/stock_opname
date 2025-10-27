export default function SummaryCard({ title, subtitle, value, color }) {
    return (
        <div className={`p-4 rounded-xl shadow-md text-center ${color}`}>
            <h3 className="text-sm text-gray-600">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            <p className="text-2xl font-bold text-gray-900 mt-1">
                {typeof value === "object" ? JSON.stringify(value) : value}
            </p>
        </div>
    );
}
