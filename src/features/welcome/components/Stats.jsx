import { TrendingUp, Users, Target, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
    { value: "3x", label: "Peningkatan Efisiensi", description: "Otomasi proses operasional" },
    { value: "50%", label: "Lebih Cepat", description: "Dalam pengelolaan shift host" },
    { value: "95%", label: "Akurasi Data", description: "Tracking transaksi real-time" },
    { value: "24/7", label: "Support", description: "Tim ready membantu Anda" },
];

export function Stats() {
    return (
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* dashboard mockup */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xl">
                            {/* header */}
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg text-foreground">Analytics Dashboard</h3>
                                <motion.div
                                    className="h-2 w-2 rounded-full bg-primary"
                                    animate={{ opacity: [1, 0.4, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>

                            {/* KPI cards */}
                            <div className="mb-6 grid grid-cols-2 gap-3">
                                {[
                                    { icon: TrendingUp, label: "Revenue", value: "+45%", color: "from-primary to-green-500" },
                                    { icon: Users, label: "Active Users", value: "2.4K", color: "from-blue-500 to-cyan-600" },
                                    { icon: Target, label: "Target", value: "85%", color: "from-purple-500 to-pink-600" },
                                    { icon: Clock, label: "Uptime", value: "99.9%", color: "from-orange-500 to-red-600" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="rounded-lg border border-border/50 bg-card/80 p-3 backdrop-blur-sm"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                    >
                                        <div className={`mb-2 inline-flex rounded-lg bg-gradient-to-br ${item.color} p-2`}>
                                            <item.icon className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="mb-1 text-xs text-muted-foreground">{item.label}</div>
                                        <div className="text-xl text-foreground">{item.value}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* bars */}
                            <div className="space-y-3">
                                <div className="mb-2 text-sm text-muted-foreground">Performance Overview</div>
                                {["Jan", "Feb", "Mar", "Apr", "May"].map((label, i) => {
                                    const value = [70, 85, 60, 95, 80][i];
                                    return (
                                        <div key={label} className="flex items-center gap-3">
                                            <span className="w-8 text-xs text-muted-foreground">{label}</span>
                                            <div className="h-8 flex-1 overflow-hidden rounded-lg border border-border bg-card/70">
                                                <motion.div
                                                    className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-primary to-green-500 pr-2"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${value}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                >
                                                    <span className="text-xs text-white">{value}%</span>
                                                </motion.div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* floating blobs */}
                            <motion.div
                                className="absolute -top-4 -left-4 h-20 w-20 rounded-full bg-primary/20 blur-2xl"
                                animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
                                animate={{ y: [0, 20, 0], scale: [1, 1.3, 1] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>

                    {/* text + stats */}
                    <div className="order-1 lg:order-2">
                        <motion.h2
                            className="mb-6 text-3xl tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Tingkatkan Performa Studio Anda
                        </motion.h2>
                        <motion.p
                            className="mb-12 text-xl text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Dengan data-driven insights dan automasi cerdas, raih hasil maksimal dari setiap sesi
                            live streaming.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="relative pl-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <motion.div
                                        className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary to-green-500"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                                    />
                                    <motion.div
                                        className="mb-1 text-4xl bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.3 + i * 0.1 }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="mb-1 text-foreground">{stat.label}</div>
                                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
}
