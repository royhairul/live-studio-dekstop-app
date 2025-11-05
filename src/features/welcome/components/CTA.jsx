import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Check } from "lucide-react";
import { motion } from "framer-motion";


export function CTA() {
    return (
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-green-700 px-8 py-16 sm:px-16 sm:py-24"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNHMtNC0yLTQtNFY0ek0wIDM0YzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNHMtNC0yLTQtNHYtMnptMC0zMGMwLTIgMi00IDQtNHM0IDIgNCA0djJjMCAyLTIgNC00IDRzLTQtMi00LTRWNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />

                    {/* Floating elements */}
                    <motion.div
                        className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
                        animate={{
                            y: [0, 30, 0],
                            x: [0, -20, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <div className="relative text-center">
                        <motion.h2
                            className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Siap Tingkatkan Performa Studio Anda?
                        </motion.h2>

                        <motion.p
                            className="text-xl text-white/90 max-w-2xl mx-auto mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Bergabung dengan ratusan live studio yang sudah mengoptimalkan operasional mereka.
                            Coba gratis 14 hari, tanpa kartu kredit.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                                    Mulai Trial Gratis
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="h-4 w-4" />
                                    </motion.div>
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="gap-2 w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
                                >
                                    <Mail className="h-4 w-4" />
                                    Hubungi Sales
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/80"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {["Setup dalam 5 menit", "Support bahasa Indonesia", "Training gratis"].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Check className="h-4 w-4" />
                                    </motion.div>
                                    {item}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
    );
}
