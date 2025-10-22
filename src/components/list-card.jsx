import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import CountUp from "react-countup";
import { formatDurationToHHMMSS } from "@/helpers/formatDate";


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

function Stat({ label, value, prefix = "", suffix = "", decimals = 0 }) {
    const isEmpty =
        value === null ||
        value === undefined ||
        value === 0 ||
        value === "00:00:00" ||
        value === "";

    const isNumber = typeof value === 'number';
    const prevValue = usePrevious(value);

    return (
        <div className={`rounded-lg p-2 text-center ${isEmpty ? "bg-red-50" : "bg-gray-50"}`}>
            <p className="text-[11px] text-gray-500 truncate">{label}</p>
            <h3 className={`font-bold text-lg ${isEmpty ? "text-red-500" : "text-gray-800"}`}>
                {isEmpty ? (
                    "-"
                ) : isNumber ? (
                    <CountUp
                        start={prevValue ?? 0}
                        end={value}
                        duration={1.2}
                        separator="."
                        decimal=","
                        prefix={prefix}
                        suffix={suffix}
                        decimals={decimals}
                    />
                ) : (
                    value // Tampilkan langsung jika bukan angka (e.g., "00:15:30")
                )}
            </h3>
        </div>
    );
}


export function ListCard({ data = {}, name }) {
    const [orderFilter, setOrderFilter] = useState("placed");
    const stats = data || {};


    const gmv = orderFilter === "placed" ? stats.placedGmv ?? 0 : stats.confirmedGmv ?? 0;
    const orderCount = orderFilter === "placed" ? stats.placedOrder ?? 0 : stats.confirmedOrder ?? 0;
    const itemsSold = orderFilter === "placed" ? stats.placedItemsSold ?? 0 : stats.confirmedItemsSold ?? 0;
    const buyers = orderFilter === "placed" ? stats.buyers ?? 0 : stats.confirmedBuyers ?? 0;
    const co = orderFilter === "placed" ? stats.co ?? 0 : stats.confirmedCo ?? 0;
    const gpm = orderFilter === "placed" ? stats.gpm ?? 0 : stats.confirmedGpm ?? 0;
    const abs = orderFilter === "placed" ? stats.abs ?? 0 : stats.confirmedAbs ?? 0;

    const viewers = stats.viewers ?? 0;
    const views = stats.views ?? 0;
    const ctr = stats.ctr ?? 0;
    const atc = stats.atc ?? 0;
    const comments = stats.engagementData?.comments ?? 0;
    const likes = stats.engagementData?.likes ?? 0;
    const engagedViewers = stats.engagedViewers ?? 0;
    const pcu = stats.pcu ?? 0;
    const avgViewTime = stats.avgViewTime ?? 0;

    const prevGmv = usePrevious(gmv);

    return (
        <div className="w-full bg-white rounded-2xl p-5 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="flex gap-3 mb-4 sm:mb-0 items-center">
                    <h3 className="text-2xl font-semibold">{name}</h3>
                    <div className="flex items-center gap-2 text-xs mt-1 text-gray-500">
                        <span className={`w-2 h-2 rounded-full ${gmv > 0 ? "bg-green-500" : "bg-red-500"}`}></span>
                        {gmv > 0 ? "Live" : "Offline"}
                    </div>
                </div>

                {/* Filter Status Pesanan */}
                <div className="flex gap-2">
                    <Button className="text-white" size="sm" variant={orderFilter === "placed" ? "default" : "outline"} onClick={() => setOrderFilter("placed")}>
                        Pesanan Dibuat
                    </Button>
                    <Button className="text-white" size="sm" variant={orderFilter === "confirmed" ? "default" : "outline"} onClick={() => setOrderFilter("confirmed")}>
                        Siap Dikirim
                    </Button>
                </div>
            </div>

            {/* Ringkasan Penjualan (GMV Utama) */}
            <div className="text-center my-5">
                <h5 className="text-sm font-medium text-gray-500">
                    Total Penjualan ({orderFilter === "placed" ? "Dibuat" : "Siap Dikirim"})
                </h5>
                <h1 className={`text-3xl font-bold mt-1 ${gmv > 0 ? "text-primary" : "text-red-500"}`}>
                    <CountUp
                        prefix="Rp "
                        start={prevGmv ?? 0}
                        end={gmv}
                        duration={1.5}
                        separator="."
                        decimal=","
                    />
                </h1>
            </div>

            {/* Statistik Lengkap */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                
                <Stat label="Dilihat" value={views} />
                <Stat label="Penonton Saat Ini" value={viewers} />
                <Stat label="Penonton Tertinggi (PCU)" value={pcu} />
                <Stat label="Engaged Viewers" value={engagedViewers} />
                <Stat label="Komentar" value={comments} />
                <Stat label="Suka (Likes)" value={likes} />
                <Stat label="Tambah ke Keranjang" value={atc} />
                <Stat label="Pesanan" value={orderCount} />
                <Stat label="Produk Terjual" value={itemsSold} />
                <Stat label="Pembeli" value={buyers} />

                <Stat label="Durasi Rata-Rata" value={formatDurationToHHMMSS(avgViewTime)} />
                <Stat label="Persentase Klik (CTR)" value={ctr * 100} suffix="%" decimals={1} />
                <Stat label="Pesanan per Klik (CO)" value={co * 100} suffix="%" decimals={1} />
                <Stat label="Penjualan per Mil (GPM)" value={gpm} prefix="Rp " />
                <Stat label="Rata-Rata Pesanan (ABS)" value={abs} prefix="Rp " />
            </div>
        </div>
    );
}
