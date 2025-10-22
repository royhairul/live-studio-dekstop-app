import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#EE8D5B", "#3818D9"];

export default function MetricsSection({
    title,
    value,
    icon: Icon,
    borderColor,
    since,
    withChart,
    data = {},
    gradient = "",
}) {
    const paid = data?.commission_paid?.total || 70;
    const unpaid = data?.commission_unpaid?.total || 30;

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
                <div className=" space-y-5">
                    <div className="flex items-center gap-2 mb-2">
                        {Icon && (
                            <Icon
                                size={20}
                                style={{ color: borderColor }}
                                className="opacity-90"
                            />
                        )}
                        <h3 className="font-semibold text-gray-700 text-sm">{title}</h3>
                    </div>

                    <div className="text-2xl font-bold text-gray-900">{value}</div>

                    <p className="text-[12px] text-gray-500 mt-1">{since}</p>
                </div>

                {withChart && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[130px] h-[130px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                {/* Gradient Definition */}
                                <defs>
                                    <linearGradient id="gradientPaid" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#F75596" />
                                        <stop offset="100%" stopColor="#3B82F6" />
                                    </linearGradient>
                                    <linearGradient id="gradientUnpaid" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#fff" />
                                        <stop offset="100%" stopColor="#000" />
                                    </linearGradient>
                                    <linearGradient id="textGradientPaid" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#F75596" />
                                        <stop offset="100%" stopColor="#3B82F6" />
                                    </linearGradient>
                                    <linearGradient id="textGradientUnpaid" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#1E40AF" />
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
                                    style={{ background: "linear-gradient(90deg, #F75596 0%, #3B82F6 100%)" }}
                                ></span>
                                <span className="text-accent">
                                    Dibayar ({Math.round((paid / (paid + unpaid)) * 100)}%)
                                </span>
                            </div>

                            {/* Belum Dibayar */}
                            <div className="flex items-center gap-0.5 text-[10px] font-semibold mt-0.5">
                                <span
                                    className="inline-block w-1.5 h-1.5 rounded-full"
                                    style={{ background: "linear-gradient(90deg, #fff 0%, #000 100%)" }}
                                ></span>
                                <span className="text-accent">
                                    Belum ({Math.round((unpaid / (paid + unpaid)) * 100)}%)
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </CardContent>
        </Card>
    );
}
