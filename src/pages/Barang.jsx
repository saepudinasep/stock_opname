import { useState, useEffect } from "react";
// import { NavLink } from "@inertiajs/react"; // atau react-router-dom jika kamu pakai routing biasa
import { NavLink } from "react-router-dom";


export default function Barang() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // sementara dummy data dulu
        setItems([
            { id: 1, brand: "Motor Baru", cabang: "Jakpus", nama: "Spanduk Dealer", stok: 12 },
            { id: 2, brand: "MotorKu", cabang: "Jakpus", nama: "Brosur Motor", stok: 50 },
        ]);
    }, []);

    return (
        <div className="bg-white py-24 sm:py-32 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Daftar Barang</h2>
                    <NavLink
                        to="/insert"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
                    >
                        + Tambah Barang
                    </NavLink>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">No</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cabang</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Brand</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nama Barang</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Stok</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{item.id}</td>
                                    <td className="px-4 py-2">{item.cabang}</td>
                                    <td className="px-4 py-2">{item.brand}</td>
                                    <td className="px-4 py-2">{item.nama}</td>
                                    <td className="px-4 py-2">{item.stok}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
