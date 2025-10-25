import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function MetricsSection({
    title,
    value,
    icon: Icon,
    borderColor,
    since,
    withChart,
    data,
    gradient = "",
}) {
    
    const paid = data?.paid_ratio || 0;
    const unpaid = data?.pending_ratio || 0;    
    const donutData = [
        { name: "Dibayar", value: paid },
        { name: "Belum Dibayar", value: unpaid },
    ];

    return (
        <Card
            className={`relative overflow-hidden rounded-2xl shadow-md border bg-white border-b-4 max-h-[180px]`}
            style={{ borderBottomColor: borderColor }}
        >

            {/* Background Gradient */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient || "from-gray-100/40 via-transparent to-transparent"
                    } pointer-events-none`}
            />

            <CardContent className="relative flex items-center justify-between p-5 overflow-hidden">
                {/* Left Info */}
                <div className=" space-y-5 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        {Icon && (
                            <Icon
                                size={20}
                                style={{ color: borderColor }}
                                className="opacity-90"
                            />
                        )}
                        <h3 className="font-semibold text-gray-700 text-sm ">{title}</h3>
                    </div>

                    <p className="text-2xl my-8 font-bold text-gray-900">{value}</p>

                    <p className="text-[12px] text-gray-500 mt-1">{since}</p>
                </div>

                {withChart && (
                    <div className="absolute right-1 top-16 -translate-y-1/2 w-[130px] h-[130px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                {/* Gradient Definition */}
                                <defs>
                                    <linearGradient id="gradientPaid" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="100%" stopColor="#3B82F6" />
                                    </linearGradient>
                                    <linearGradient id="gradientUnpaid" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="100%" stopColor="#EE8D5B" />
                                    </linearGradient>
                                </defs>

                                <Pie
                                    data={donutData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={60}
                                    paddingAngle={3}
                                    dataKey="value"
                                    labelLine={false}
                                >
                                    {donutData.map((entry, i) => (
                                        <Cell
                                            key={`cell-${i}`}
                                            fill={i === 0 ? "url(#gradientPaid)" : "url(#gradientUnpaid)"}
                                            stroke="#fff"
                                            strokeWidth={2}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Label di tengah chart */}
                        <div className="absolute flex flex-col items-center justify-center text-center leading-tight">
                            {/* Dibayar */}
                            <div className="flex items-center gap-0.5 text-[10px] font-semibold">
                                <span
                                    className="inline-block w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor:  "#3B82F6" }}       
                                    ></span>
                                <span className="text-accent">
                                    Dibayar ({paid}%)
                                </span>
                            </div>

                            {/* Belum Dibayar */}
                            <div className="flex items-center gap-0.5 text-[10px] font-semibold mt-0.5">
                                <span
                                    className="inline-block w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor:  "#EE8D5B" }}       
                                ></span>
                                <span className="text-accent">
                                    Belum ({unpaid}%)
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </CardContent>
        </Card>
    );
}
