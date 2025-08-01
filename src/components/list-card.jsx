import { useState } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useStudios } from "@/hooks/studio/useStudios";

// Dummy data akun dengan stats masing-masing
const accountList = [
    {
        id: "likeashy.id",
        name: "likeashy.id",
        sales: "Rp. 1.400.750",
        studio_id: "1",
        stats: {
            viewers: 120,
            comments: 35,
            cart: 18,
        },
    },
    {
        id: "Omovidi.id",
        name: "Omovidi.id",
        sales: "Rp. 890.000",
        studio_id: "1",
        stats: {
            viewers: 75,
            comments: 22,
            cart: 9,
        },
    },
    {
        id: "littlechiken.id",
        name: "littlechiken.id",
        sales: "Rp. 500.250",
        studio_id: "2",
        stats: {
            viewers: 45,
            comments: 8,
            cart: 3,
        },
    },
];

export function ListCard() {
    const { studio = [] } = useStudios();
    const [selectedStudioId, setSelectedStudioId] = useState("all");
    const [selectedAccountId, setSelectedAccountId] = useState(accountList[0].id);

    const filteredAccounts =
        selectedStudioId === "all"
            ? accountList
            : accountList.filter((acc) => acc.studio_id === selectedStudioId);

    const selectedAccount = accountList.find(
        (acc) => acc.id === selectedAccountId
    );

    return (
        <div className="flex gap-4 w-full">
            {/* Left Section */}
            <div className=" w-full bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="text-2xl font-semibold">Live Dashboard</h3>

                {/* Akun Aktif */}
                {selectedAccount && (
                    <div className="flex gap-2 px-2 w-min -ml-2 my-3 items-center text-primary rounded-2xl">
                        <div className="w-3 h-3 rounded-full bg-chart-5"></div>
                        <p className="font-bold">{selectedAccount.name}</p>
                    </div>
                )}

                {/* Penjualan */}
                <div className="text-black text-center font-bold mb-4">
                    <h5 className="text-xl mb-1">Penjualan</h5>
                    <h1 className="text-3xl">
                        {selectedAccount ? selectedAccount.sales : "Rp. 0"}
                    </h1>
                </div>

                {/* Statistik Cards */}
                <div className="flex gap-2">
                    {selectedAccount && (
                        <>
                            <Card className="bg-white w-full max-w-1/3">
                                <CardHeader className="justify-center pb-0 text-xs font-medium text-accent">
                                    <span >Penonton aktif saat ini</span>
                                </CardHeader>
                                <CardDescription className="text-xs flex justify-center text-accent">
                                    <div className="flex flex-col items-center">
                                        <h3 className="font-bold mb-2">{selectedAccount.stats.viewers}</h3>
                                        <p>1 Menit Terakhir</p>
                                    </div>
                                </CardDescription>
                            </Card>

                            <Card className="bg-white w-full max-w-1/3">
                                <CardHeader className="justify-center pb-0 text-xs font-medium text-accent">
                                    <span>Komentar</span>
                                </CardHeader>
                                <CardDescription className="text-xs flex justify-center text-accent">
                                    <div className="flex flex-col items-center">
                                        <h3 className="font-bold mb-2">{selectedAccount.stats.comments}</h3>
                                        <p>1 Menit Terakhir</p>
                                    </div>
                                </CardDescription>
                            </Card>

                            <Card className="bg-white w-full max-w-1/3">
                                <CardHeader className="justify-center pb-0 text-xs font-medium text-accent">
                                    <span>Masuk ke Keranjang</span>
                                </CardHeader>
                                <CardDescription className="text-xs flex justify-center text-accent">
                                    <div className="flex flex-col items-center">
                                        <h3 className="font-bold mb-2">{selectedAccount.stats.cart}</h3>
                                        <p>1 Menit Terakhir</p>
                                    </div>
                                </CardDescription>
                            </Card>
                        </>
                    )}
                </div>
            </div>

            {/* Right Section */}
            <Card className="bg-white w-full max-w-52">
                <div className="p-4">
                    {/* Select Studio */}
                    <Select
                        value={selectedStudioId}
                        onValueChange={(value) => {
                            setSelectedStudioId(value);
                            // Reset akun saat studio berubah, jika tidak ada akun maka kosong
                            const accounts = value === "all"
                                ? accountList
                                : accountList.filter((acc) => acc.studio_id === value);
                            setSelectedAccountId(accounts[0]?.id || "");
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Studio" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Studio</SelectItem>
                            {studio.map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                    {s.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* List Akun */}
                <CardHeader className="items-center pb-0 text-accent">
                    <CardTitle>List Akun</CardTitle>
                    <CardDescription className="text-xs w-full mt-2">
                        {filteredAccounts.map((account) => (
                            <div
                                key={account.id}
                                onClick={() => setSelectedAccountId(account.id)}
                                className={`cursor-pointer transition-all duration-150 flex gap-2 py-3 px-2 w-min -ml-2 my-2 items-center rounded-2xl ${selectedAccountId === account.id
                                        ? "bg-[#6ffa9648] text-primary"
                                        : "text-background hover:bg-muted/30"
                                    }`}
                            >
                                <div className="w-3 h-3 rounded-full bg-chart-5"></div>
                                <p className="font-bold">{account.name}</p>
                            </div>
                        ))}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
