import { useState } from "react";
import Swal from "sweetalert2";
import LoadingOverlay from "../components/LoadingOverlay";

// --- IMPORT IMAGE ---
import mbBrosur from "../assets/motorBaru/brosur.jpg";
import mbSurat from "../assets/motorBaru/surat_penawaran.png";
import mbAmplop from "../assets/motorBaru/amplop.png";
import mbMap from "../assets/motorBaru/map_corporate.jpg";
import mbBooklet from "../assets/motorBaru/booklet_collaboration.jpg";
import mbEvent from "../assets/motorBaru/event_desk.png";

import mkBrosur from "../assets/motorku/brosur.jpg";
import mkSurat from "../assets/motorku/surat_penawaran.jpg";
import mkAmplop from "../assets/motorku/amplop.jpg";
import mkSpanduk from "../assets/motorku/spanduk_branding_agent.png";
import mkEvent from "../assets/motorku/event_desk.jpg";

import moBrosur from "../assets/mobilku/brosur.png";
import moSurat from "../assets/mobilku/surat_penawaran.jpg";
import moAmplop from "../assets/mobilku/amplop.jpg";
import moSpanduk from "../assets/mobilku/spanduk_branding_agent.jpg";
import moMap from "../assets/mobilku/map_corporate.jpg";

import maBrosur from "../assets/masku/brosur.jpg";
import maAmplop from "../assets/masku/amplop.png";
import maEvent from "../assets/masku/event_desk.png";

import hBrosur from "../assets/hajiku/brosur.jpg";
import hAmplop from "../assets/hajiku/amplop.jpg";
import hXBanner from "../assets/hajiku/x_banner.png";
import hSpanduk from "../assets/hajiku/spanduk_agen.jpg";

import sHelm from "../assets/souvenir/Helm.png";
import sJaket from "../assets/souvenir/Jaket.png";
import sJam from "../assets/souvenir/Jam dinding.png";
import sMug from "../assets/souvenir/Mug.png";
import sPayung from "../assets/souvenir/Payung.png";
import sPouch from "../assets/souvenir/Pouch.png";
import sTas from "../assets/souvenir/Tas.png";
import sToples from "../assets/souvenir/Toples.png";

export default function Insert() {
    const tabs = ["Motor Baru", "Motorku", "Mobilku", "Masku", "Hajiku", "Matprom"];
    const [activeTab, setActiveTab] = useState("Motor Baru");
    const [formData, setFormData] = useState({});
    const [zoomImg, setZoomImg] = useState(null);
    const [loading, setLoading] = useState(false); // 🔹 tambahan state loading

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
            "Spanduk Branding Agent",
            "Event Desk",
        ],
        "Masku": ["Brosur & Pricelist", "Surat Penawaran", "Amplop", "Event Desk"],
        "Hajiku": [
            "Brosur & Pricelist",
            "Surat Penawaran",
            "Amplop",
            "Event Desk",
            "X Banner",
            "Spanduk Agen Hajiku",
        ],
        "Matprom": [
            "Jaket",
            "Toples",
            "Tas",
            "Pouch",
            "Merchandise (MUG)",
            "Helm",
            "Jam Dinding",
            "Payung",
            "Umbul-Umbul",
            "X Banner"
        ],
    };

    const defaultImages = {
        "Motor Baru": {
            "Brosur & Pricelist": mbBrosur,
            "Surat Penawaran": mbSurat,
            "Amplop": mbAmplop,
            "Map Corporate": mbMap,
            "Booklet Collaboration": mbBooklet,
            "Event Desk": mbEvent,
        },
        "Motorku": {
            "Brosur & Pricelist": mkBrosur,
            "Surat Penawaran": mkSurat,
            "Amplop": mkAmplop,
            "Spanduk Branding Agent": mkSpanduk,
            "Event Desk": mkEvent,
        },
        "Mobilku": {
            "Brosur & Pricelist": moBrosur,
            "Surat Penawaran": moSurat,
            "Amplop": moAmplop,
            "Map Corporate": moMap,
            "Spanduk Branding Agent": moSpanduk,
            "Event Desk": moSpanduk,
        },
        "Masku": {
            "Brosur & Pricelist": maBrosur,
            "Surat Penawaran": maAmplop,
            "Amplop": maAmplop,
            "Event Desk": maEvent,
        },
        "Hajiku": {
            "Brosur & Pricelist": hBrosur,
            "Surat Penawaran": hAmplop,
            "Amplop": hAmplop,
            "X Banner": hXBanner,
            "Spanduk Agen Hajiku": hSpanduk,
        },
        "Matprom": {
            "Jaket": sJaket,
            "Toples": sToples,
            "Tas": sTas,
            "Pouch": sPouch,
            "Merchandise (MUG)": sMug,
            "Helm": sHelm,
            "Jam Dinding": sJam,
            "Payung": sPayung,
            "Umbul-Umbul": sPayung,
            "X Banner": sPayung,
        },
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const tabData = formData[activeTab] || {};

            const convertToBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    if (!file) return resolve("");
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (err) => reject(err);
                });
            };

            let items = {};

            // === FILTER qty > 0 ===
            for (const key of Object.keys(tabData)) {
                const item = tabData[key];
                const qtyValue = Number(item.qty) || 0;

                if (qtyValue <= 0) continue; // ❌ JANGAN MASUKKAN KE PAYLOAD

                const hasFile = item.file instanceof File;

                items[key] = {
                    qty: qtyValue,
                    fileBase64: hasFile ? await convertToBase64(item.file) : "",
                    fileName: hasFile ? item.file.name : "",
                };
            }

            // Jika semua qty = 0
            if (Object.keys(items).length === 0) {
                setLoading(false);
                Swal.fire({
                    title: "Tidak Ada Qty!",
                    text: "Semua item memiliki qty 0. Tidak ada yang bisa di-insert.",
                    icon: "warning",
                });
                return;
            }

            const payload = {
                user: userData?.username || "",
                branch: userData?.branch_name || "",
                region: userData?.region_name || "",
                branch_code: userData?.branch_code || "",
                region_code: userData?.region_code || "",
                role: userData?.role || "BRANCH",
                tab: activeTab,
                items,
            };

            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbwNCdNueJow9q5LZZpufuX3gKovy4ADX_rP_u9Wn-noyWkgZAJvlpYQNHQ4BOoQSFzl/exec",
                {
                    method: "POST",
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();

            if (result.status === "success") {
                Swal.fire({
                    title: "Insert Berhasil!",
                    text: `Berhasil Insert Data ${activeTab}.`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    setFormData({});
                    setLoading(false);
                }, 1500);
            } else {
                throw new Error(result.message || "Gagal insert data");
            }
        } catch (error) {
            console.error("❌ ERROR:", error);
            Swal.fire({
                title: "Gagal!",
                text: error.message || "Terjadi kesalahan saat mengirim data.",
                icon: "error",
            });
            setLoading(false);
        }
    };


    return (
        <div className="bg-gray-100 min-h-screen p-10">

            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
                Insert Data Produk
            </h1>

            {/* TAB HEADER */}
            <div className="overflow-x-auto border-b border-gray-300 mb-8">
                <div className="flex min-w-max justify-start md:justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            disabled={loading}
                            className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200
                            ${activeTab === tab
                                    ? "text-indigo-600 border-b-2 border-indigo-600"
                                    : "text-gray-500 hover:text-indigo-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-6"
            >
                {itemsPerTab[activeTab].map((item) => {
                    const imgSrc = formData[activeTab]?.[item]?.file
                        ? URL.createObjectURL(formData[activeTab][item].file)
                        : defaultImages[activeTab]?.[item];

                    return (
                        <div
                            key={item}
                            className="flex flex-col md:flex-row md:items-center md:gap-4"
                        >
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
                            <label className="w-full md:w-2/3 flex items-center gap-4 px-3 py-2 border border-gray-300 rounded cursor-pointer bg-white hover:bg-gray-50 transition">
                                <span className="text-gray-600">Pilih file / upload</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleInputChange(activeTab, item, "file", e.target.files[0])
                                    }
                                    className="hidden"
                                />
                                {formData[activeTab]?.[item]?.file && (
                                    <span className="text-sm text-green-600">File siap diupload</span>
                                )}
                            </label>
                            {/* <img
                                src={imgSrc}
                                alt="preview"
                                onClick={() => setZoomImg(imgSrc)}
                                className="h-16 w-16 object-cover mt-2 md:mt-0 rounded cursor-pointer hover:scale-105 transition"
                            /> */}
                        </div>
                    );
                })}

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-6 w-full font-semibold py-3 rounded-md transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                        }`}
                >
                    {loading ? "Mengirim data..." : "Submit"}
                </button>
            </form>

            {/* MODAL ZOOM */}
            {zoomImg && (
                <div
                    onClick={() => setZoomImg(null)}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-zoom-out"
                >
                    <img
                        src={zoomImg}
                        alt="zoom"
                        className="max-h-[80%] max-w-[80%] rounded-md shadow-lg"
                    />
                </div>
            )}
            {/* 🔹 Loading Overlay */}
            <LoadingOverlay show={loading} />
        </div>
    );
}