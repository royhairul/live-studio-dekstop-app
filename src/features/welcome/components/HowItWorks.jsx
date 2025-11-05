import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Setup & Konfigurasi",
        description: "Buat akun, atur role dan permission sesuai struktur tim studio Anda.",
        features: ["Import data user existing", "Konfigurasi hak akses", "Setup jadwal shift"]
    },
    {
        number: "02",
        title: "Manajemen Operasional",
        description: "Host melakukan check-in/out, monitor live streaming, catat transaksi produk.",
        features: ["Absensi otomatis", "Real-time monitoring", "Tracking produk terjual"]
    },
    {
        number: "03",
        title: "Analisis & Optimasi",
        description: "Review performa, analisis data, dan optimalkan strategi untuk mencapai target.",
        features: ["Dashboard analitik", "Laporan lengkap", "Rekomendasi AI"]
    }
];

export function HowItWorks() {
    return (
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground mb-4">
                        Cara Kerja Platform
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Tiga langkah sederhana untuk mulai mengelola live studio Anda dengan lebih efektif
                    </p>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className="mb-6"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    delay: index * 0.2 + 0.2
                                }}
                            >
                                <motion.span
                                    className="text-6xl text-primary/20 inline-block"
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {step.number}
                                </motion.span>
                            </motion.div>

                            <h3 className="text-2xl text-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground mb-6">{step.description}</p>

                            <ul className="space-y-3">
                                {step.features.map((feature, fIndex) => (
                                    <motion.li
                                        key={fIndex}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.2 + 0.3 + fIndex * 0.1 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        </motion.div>
                                        <span className="text-foreground">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {index < steps.length - 1 && (
                                <motion.div
                                    className="hidden lg:block absolute top-12 -right-6 w-12 h-0.5 bg-gradient-to-r from-primary to-primary/20"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                                    style={{ originX: 0 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
