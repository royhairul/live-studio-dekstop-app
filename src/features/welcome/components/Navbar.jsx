import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { label: "Fitur", href: "#features" },
        { label: "Cara Kerja", href: "#how-it-works" },
        { label: "Testimoni", href: "#testimonials" },
        { label: "Harga", href: "#pricing" },
    ];

    return (
        <motion.nav
            className="sticky top-0 z-50 border-b border-border bg-background/95 supports-[backdrop-filter]:bg-background/70 backdrop-blur-md mb-10"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* === Brand === */}
                    <motion.button
                        type="button"
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <motion.div
                            className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span>🎥</span>
                        </motion.div>
                        <span className="text-xl font-semibold text-foreground">
                            LiveStudio Manager
                        </span>
                    </motion.button>

                    {/* === Desktop Navigation === */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: index * 0.06 }}
                                whileHover={{ y: -2 }}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 block h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                            </motion.a>
                        ))}
                    </div>

                    {/* === Right Actions === */}
                    <div className="flex items-center gap-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Button
                                onClick={() => navigate("/login")}
                                className="hidden md:inline-flex"
                            >
                                Masuk
                            </Button>
                        </motion.div>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            type="button"
                            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-nav"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/80 hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition"
                            whileTap={{ scale: 0.92 }}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* === Mobile Menu === */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-nav"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-card/95 supports-[backdrop-filter]:bg-card/80 backdrop-blur-md shadow-sm"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className="block rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: index * 0.05 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                            <div className="pt-3 space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/login");
                                    }}
                                >
                                    Masuk
                                </Button>
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/register");
                                    }}
                                >
                                    Coba Gratis
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
