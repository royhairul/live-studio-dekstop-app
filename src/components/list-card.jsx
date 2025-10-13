import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

export function ListCard({ data = [], name }) {
    const stats = data || {};

    return (
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">{name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Live
                </div>
            </div>

            {/* Penjualan */}
            <div className="text-black text-center font-bold mb-4">
                <h5 className="text-sm font-medium text-gray-500">
                    Penjualan (Pesanan Siap Dikirim)
                </h5>
                <h1 className="text-3xl font-bold text-primary mt-1">
                    Rp. {stats.confirmedGmv?.toLocaleString("id-ID") || 0}
                </h1>
            </div>

            {/* Statistik Ringkas */}
            <div className="flex justify-between text-center mt-2">
                <div className="flex-1">
                    <p className="text-[11px] text-gray-500">Penonton Aktif</p>
                    <h3 className="font-bold text-lg text-gray-800">
                        {stats.viewers ?? 0}
                    </h3>
                </div>
                <div className="flex-1">
                    <p className="text-[11px] text-gray-500">Komentar</p>
                    <h3 className="font-bold text-lg text-gray-800">
                        {stats.engagementData?.comments ?? 0}
                    </h3>
                </div>
                <div className="flex-1">
                    <p className="text-[11px] text-gray-500">Keranjang</p>
                    <h3 className="font-bold text-lg text-gray-800">
                        {stats.atc ?? 0}
                    </h3>
                </div>
            </div>
        </div>
    );
}