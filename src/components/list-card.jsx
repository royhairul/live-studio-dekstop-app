import { useState } from "react";
import { Button } from "./ui/button";

export function ListCard({ data = {}, name }) {
    const [orderFilter, setOrderFilter] = useState("placed"); // placed | confirmed

    const stats = data || {};
    const isEmpty = (val) => val === null || val === undefined;

    // === Data Utama Berdasarkan Filter ===
    const gmv =
        orderFilter === "placed" ? stats.placedGmv ?? 0 : stats.confirmedGmv ?? 0;
    const orderCount =
        orderFilter === "placed" ? stats.placedOrder ?? 0 : stats.confirmedOrder ?? 0;
    const itemsSold =
        orderFilter === "placed"
            ? stats.placedItemsSold ?? 0
            : stats.confirmedItemsSold ?? 0;
    const buyers =
        orderFilter === "placed" ? stats.buyers ?? 0 : stats.confirmedBuyers ?? 0;

    // === Data Tambahan ===
    const viewers = stats.viewers ?? 0;
    const views = stats.views ?? 0;
    const ctr = stats.ctr ?? 0;
    const co = orderFilter === "placed" ? stats.co ?? 0 : stats.confirmedCo ?? 0;
    const atc = stats.atc ?? 0;
    const comments = stats.engagementData?.comments ?? 0;
    const likes = stats.engagementData?.likes ?? 0;
    const engagedViewers = stats.engagedViewers ?? 0;
    const pcu = stats.pcu ?? 0;
    const gpm =
        orderFilter === "placed" ? stats.gpm ?? 0 : stats.confirmedGpm ?? 0;
    const abs =
        orderFilter === "placed" ? stats.abs ?? 0 : stats.confirmedAbs ?? 0;
    const avgViewTime = stats.avgViewTime ?? 0;

    return (
        <div className="w-full bg-white rounded-2xl p-5 shadow-sm">
            {/* Header */}
            <div className="flex justify-between">

                <div className="flex gap-3 mb-5 items-center">
                    <h3 className="text-2xl font-semibold">{name}</h3>
                    <div className="flex items-center gap-2 text-xs mt-1 text-gray-500">
                        <span
                            className={`w-2 h-2 rounded-full ${gmv > 0 ? "bg-green-500" : "bg-red-500"
                                }`}
                        ></span>
                        {gmv > 0 ? "Live" : "Offline"}
                    </div>
                </div>

                {/* === Filter Status Pesanan === */}
                <div className="flex gap-2 mb-4">
                    <Button
                        size="sm"
                        className="text-white"
                        variant={orderFilter === "placed" ? "default" : "outline"}
                        onClick={() => setOrderFilter("placed")}
                    >
                        Pesanan Dibuat
                    </Button>
                    <Button
                        size="sm"
                        className="text-white"
                        variant={orderFilter === "confirmed" ? "default" : "outline"}
                        onClick={() => setOrderFilter("confirmed")}
                    >
                        Pesanan Siap Dikirim
                    </Button>
                </div>
            </div>


            {/* === Ringkasan Penjualan === */}
            <div className="text-center mb-5">
                <h5 className="text-sm font-medium text-gray-500">
                    Total Penjualan ({orderFilter === "placed" ? "Dibuat" : "Siap Dikirim"})
                </h5>
                <h1
                    className={`text-3xl font-bold mt-1 ${gmv > 0 ? "text-primary" : "text-red-500"
                        }`}
                >
                    Rp. {gmv.toLocaleString("id-ID")}
                </h1>
            </div>

            {/* === Statistik Lengkap === */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                <Stat label="Dilihat" value={views} />
                <Stat
                    label="Durasi Rata-Rata Menonton"
                    value={`${Math.floor(avgViewTime / 60)}m ${Math.floor(avgViewTime % 60)}s`}
                />
                <Stat label="Penonton Saat Ini" value={viewers} />
                <Stat label="Penonton Tertinggi (PCU)" value={pcu} />
                <Stat label="Engaged Viewers" value={engagedViewers} />
                <Stat label="Komentar" value={comments} />
                <Stat label="Suka (Likes)" value={likes} />
                <Stat
                    label="Persentase Klik"
                    value={`${(ctr * 100).toFixed(1)}%`}
                />
                <Stat
                    label="Pesanan per Klik (CO)"
                    value={`${(co * 100).toFixed(1)}%`}
                />
                <Stat label="Tambah ke Keranjang" value={atc} />
                <Stat label="Pesanan" value={orderCount} />
                <Stat label="Produk Terjual" value={itemsSold} />
                <Stat label="Pembeli" value={buyers} />
                <Stat
                    label="Penjualan per Mil (Rp)"
                    value={`Rp${gpm.toLocaleString("id-ID")}`}
                />
                <Stat
                    label="Rata-Rata Nilai Pesanan (ABS)"
                    value={`Rp${abs.toLocaleString("id-ID")}`}
                />
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    const isEmpty = value === null || value === undefined || value === 0;
    return (
        <div
            className={`rounded-lg p-2 ${isEmpty ? "bg-red-50" : "bg-gray-50"
                }`}
        >
            <p className="text-[11px] text-gray-500">{label}</p>
            <h3
                className={`font-bold text-lg ${isEmpty ? "text-red-500" : "text-gray-800"
                    }`}
            >
                {value ?? "-"}
            </h3>
        </div>
    );
}
