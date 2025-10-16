import { useState } from "react";

export default function Insert() {
    const tabs = ["Motor Baru", "Motorku", "Mobilku", "Masku", "Hajiku"];
    const [activeTab, setActiveTab] = useState("Motor Baru");
    const [formData, setFormData] = useState({}); // { tabName: { itemName: { qty, file } } }

    const itemsPerTab = {
        "Motor Baru": [
            "Brosur & Pricelist",
            "Surat Penawaran",
            "Amplop",
            "Map Corporate",
            "Booklet Collaboration",
            "Event Desk",
        ],
        "Motorku": [
            "Brosur & Pricelist",
            "Surat Penawaran",
            "Amplop",
            "Spanduk Branding Agent",
            "Event Desk",
        ],
        "Mobilku": [
            "Brosur & Pricelist",
            "Surat Penawaran",
            "Amplop",
            "Map Corporate",
            "Event Desk",
        ],
        "Masku": [
            "Brosur & Pricelist",
            "Surat Penawaran",
            "Amplop",
            "Event Desk",
        ],
        "Hajiku": [
            "Brosur & Pricelist",
            "Surat Penawaran",
            "Amplop",
            "Event Desk",
            "X Banner",
            "Spanduk Agen Hajiku",
        ],
    };

    const handleInputChange = (tab, item, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [tab]: {
                ...prev[tab],
                [item]: {
                    ...prev[tab]?.[item],
                    [field]: value,
                },
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem("userData"));
        const payload = {
            user: userData?.username,
            branch: userData?.branch_name,
            region: userData?.region_name,
            tab: activeTab,
            items: formData[activeTab] || {},
        };
        console.log("DATA SUBMIT:", payload);

        // TODO:
        // 1. Kirim ke Google Form menggunakan fetch POST
        // 2. Upload file ke Google Drive via Apps Script API
        alert("Data berhasil dikirim (lihat console log)");
    };

    return (
        <div className="bg-white min-h-screen p-10">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
                Insert Data Produk
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
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-md p-8 space-y-6"
            >
                {itemsPerTab[activeTab].map((item) => (
                    <div key={item} className="flex flex-col md:flex-row md:items-center md:gap-4">
                        <label className="w-full md:w-1/3 font-semibold text-gray-700">
                            {item}
                        </label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Jumlah"
                            value={formData[activeTab]?.[item]?.qty || ""}
                            onChange={(e) =>
                                handleInputChange(activeTab, item, "qty", e.target.value)
                            }
                            className="w-full md:w-1/6 px-3 py-2 rounded border border-gray-300 focus:outline-indigo-500 mb-2 md:mb-0"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleInputChange(activeTab, item, "file", e.target.files[0])
                            }
                            className="w-full md:w-2/3"
                        />
                        {formData[activeTab]?.[item]?.file && (
                            <img
                                src={URL.createObjectURL(formData[activeTab][item].file)}
                                alt="preview"
                                className="h-16 w-16 object-cover mt-2 md:mt-0 rounded"
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
