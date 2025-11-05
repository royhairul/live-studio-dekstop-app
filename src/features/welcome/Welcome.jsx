import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Stats } from "./components/Stats";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { motion } from "framer-motion";

export default function App() {
    return (
        <div className="relative min-h-screen  bg-background text-foreground">
            {/* 🔹 Global animated background layer */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 opacity-60 will-change-[background-position]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--color-primary) 8%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--color-primary) 8%, transparent) 1px, transparent 1px),
            radial-gradient(70% 90% at 15% 20%, color-mix(in oklab, var(--color-primary) 5%, transparent), transparent 60%),
            radial-gradient(80% 80% at 85% 80%, color-mix(in oklab, var(--color-foreground) 5%, transparent), transparent 60%)
          `,
                    backgroundSize: "50px 50px, 50px 50px, 120% 120%, 120% 120%",
                    backgroundPosition: "0px 0px, 0px 0px, 0% 0%, 100% 100%",
                }}
                animate={{
                    backgroundPosition: [
                        "0px 0px, 0px 0px, 0% 0%, 100% 100%",
                        "50px 50px, 50px 50px, 10% 5%, 90% 95%",
                        "0px 0px, 0px 0px, 0% 0%, 100% 100%",
                    ],
                }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />

            {/* 🔹 Content Layer */}
                <Navbar />
            <div className="relative z-10">
                <main className="overflow-x-hidden">
                    <Hero />
                    <section id="features" className="my-20">
                        <Features />
                    </section>
                    <Stats />
                    <section id="how-it-works" className="my-20">
                        <HowItWorks />
                    </section>
                    <section id="testimonials" className="my-20">
                        <Testimonials />
                    </section>
                    <CTA />
                </main>
                <Footer />
            </div>
        </div>
    );
}
