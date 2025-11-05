import {
    Users,
    Shield,
    TrendingUp,
    ShoppingBag,
    Target,
    Clock,
    BarChart3,
    UserCheck,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
    {
        icon: Shield,
        title: "Manajemen Role & Akses",
        description:
            "Atur hak akses dan permission untuk setiap role dengan sistem CRUD yang lengkap dan aman.",
    },
    {
        icon: Users,
        title: "Manajemen User & Host",
        description:
            "Kelola data host, moderator, dan tim studio dengan mudah. Termasuk profil, jadwal, dan performa masing-masing.",
    },
    {
        icon: TrendingUp,
        title: "Performa Live Studio",
        description:
            "Monitor performa real-time setiap sesi live, termasuk viewers, engagement rate, dan conversion metrics.",
    },
    {
        icon: ShoppingBag,
        title: "Transaksi Produk",
        description:
            "Lacak setiap transaksi produk yang terjadi selama live streaming dengan detail lengkap dan analitik mendalam.",
    },
    {
        icon: Target,
        title: "Target Pendapatan",
        description:
            "Set dan monitor target pendapatan harian, mingguan, dan bulanan dengan visualisasi yang jelas.",
    },
    {
        icon: Clock,
        title: "Check-in/Check-out Host",
        description:
            "Sistem absensi otomatis untuk pergantian shift host dengan tracking waktu yang akurat.",
    },
    {
        icon: BarChart3,
        title: "Dashboard Analitik",
        description:
            "Dapatkan insight mendalam dengan dashboard yang menampilkan semua metrik penting dalam satu tempat.",
    },
    {
        icon: UserCheck,
        title: "Manajemen Shift",
        description:
            "Atur jadwal shift host dengan mudah dan hindari konflik jadwal dengan sistem kalender terintegrasi.",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function Features() {
    return (
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="mb-4 text-3xl tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Fitur Lengkap untuk Kebutuhan Studio Anda
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                        Semua yang Anda butuhkan untuk menjalankan live studio Shopee yang sukses, dalam satu
                        platform yang powerful dan mudah digunakan.
                    </p>
                </motion.div>

                <motion.div
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -8, scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Card className="h-full border border-border bg-card/80 backdrop-blur-sm transition-colors hover:border-primary/50 hover:shadow-lg">
                                    <CardHeader>
                                        <motion.div
                                            className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Icon className="h-6 w-6 text-primary" />
                                        </motion.div>
                                        <CardTitle className="text-foreground">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-muted-foreground">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
    );
}
