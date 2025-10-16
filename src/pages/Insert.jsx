import { useState } from "react";

export default function Insert() {
    const tabs = ["Motor Baru", "Motorku", "Mobilku", "Masku", "Hajiku"];
    const [activeTab, setActiveTab] = useState("Motor Baru");

    const renderContent = () => {
        switch (activeTab) {
            case "Motor Baru":
                return (
                    <div className="p-6 text-gray-700">
                        <h2 className="text-2xl font-semibold mb-2 text-indigo-500">
                            Form Motor Baru
                        </h2>
                        <p>Isi form untuk pengajuan produk Motor Baru di sini.</p>
                    </div>
                );
            case "Motorku":
                return (
                    <div className="p-6 text-gray-700">
                        <h2 className="text-2xl font-semibold mb-2 text-indigo-500">
                            Form Motorku
                        </h2>
                        <p>Isi form untuk produk Motorku di sini.</p>
                    </div>
                );
            case "Mobilku":
                return (
                    <div className="p-6 text-gray-700">
                        <h2 className="text-2xl font-semibold mb-2 text-indigo-500">
                            Form Mobilku
                        </h2>
                        <p>Isi form untuk produk Mobilku di sini.</p>
                    </div>
                );
            case "Masku":
                return (
                    <div className="p-6 text-gray-700">
                        <h2 className="text-2xl font-semibold mb-2 text-indigo-500">
                            Form Masku
                        </h2>
                        <p>Isi form untuk produk Masku di sini.</p>
                    </div>
                );
            case "Hajiku":
                return (
                    <div className="p-6 text-gray-700">
                        <h2 className="text-2xl font-semibold mb-2 text-indigo-500">
                            Form Hajiku
                        </h2>
                        <p>Isi form untuk produk Hajiku di sini.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white min-h-screen p-10">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
                Insert Barang
            </h1>

            {/* TAB HEADER */}
            <div className="flex justify-center mb-8 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-sm font-medium transition-all duration-200
                            ${activeTab === tab
                                ? "text-indigo-600 border-b-2 border-indigo-600"
                                : "text-gray-500 hover:text-indigo-500"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT */}
            <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-md p-8">
                {renderContent()}
            </div>
        </div>
    );
}
