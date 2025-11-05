import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Rina Wijaya",
        role: "Studio Manager",
        company: "BeautyLive Studio",
        content: "Platform ini mengubah cara kami mengelola 20+ host. Check-in/out otomatis dan tracking performa real-time sangat membantu!",
        rating: 5
    },
    {
        name: "Budi Santoso",
        role: "Operations Director",
        company: "MegaShop Live",
        content: "Sejak pakai platform ini, efisiensi tim meningkat 3x lipat. Dashboard analitik nya memudahkan kami membuat keputusan strategis.",
        rating: 5
    },
    {
        name: "Diana Putri",
        role: "Live Host Coordinator",
        company: "FashionHub Studio",
        content: "Manajemen shift yang tadinya ribet jadi super mudah. Sistem reminder otomatis bikin host gak ada yang telat lagi.",
        rating: 5
    }
];

export function Testimonials() {
    return (
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, rgb(7 187 59 / 0.15) 1px, transparent 0)",
                    backgroundSize: "40px 40px"
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "40px 40px"]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
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
                        Dipercaya oleh Studio Terbaik
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Bergabung dengan ratusan live studio yang sudah merasakan manfaatnya
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            <Card className="border-border h-full relative overflow-hidden group">
                                <motion.div
                                    className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                                <CardContent className="pt-6 relative">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
                                    >
                                        <Quote className="h-8 w-8 text-primary/20 mb-4" />
                                    </motion.div>

                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 200,
                                                    delay: index * 0.1 + 0.3 + i * 0.05
                                                }}
                                                whileHover={{ scale: 1.3, rotate: 360 }}
                                            >
                                                <Star className="h-5 w-5 fill-primary text-primary" />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.p
                                        className="text-foreground mb-6"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                    >
                                        "{testimonial.content}"
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                    >
                                        <div className="text-foreground">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role} • {testimonial.company}
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
