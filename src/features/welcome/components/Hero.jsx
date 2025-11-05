import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code2, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* ===== Left text ===== */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="mb-6 inline-flex items-center rounded-full border border-border bg-primary/10 px-4 py-1.5 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span className="text-primary">Platform Manajemen Live Studio Terbaik</span>
              </motion.div>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Kelola Live Studio{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-primary to-foreground/70 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Shopee
              </motion.span>{" "}
              Anda dengan Lebih Efektif
            </motion.h1>

            <motion.p
              className="mb-8 text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Sistem manajemen all-in-one untuk mengatur host, memantau performa, melacak transaksi,
              dan mencapai target pendapatan dengan lebih mudah.
            </motion.p>

            <motion.div
              className="mb-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate("/register")} size="lg" className="gap-2">
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[
                { value: "500+", label: "Live Studio" },
                { value: "10K+", label: "Host Aktif" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="mb-1 text-3xl text-primary"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ===== Right mockup ===== */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main Dashboard Card */}
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">Live Studio Dashboard</span>
                </div>
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="h-2 w-2 rounded-full bg-foreground/60" />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                {[
                  { icon: Zap, label: "Active Hosts", value: "24" },
                  { icon: Shield, label: "Security", value: "100%" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-border/50 bg-card/80 p-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="mb-1 h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-lg text-primary">{item.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Bars */}
              <div className="space-y-2">
                {[60, 80, 40, 90, 70].map((width, index) => (
                  <motion.div
                    key={index}
                    className="h-6 rounded border border-primary/10 bg-gradient-to-r from-primary/15 to-foreground/5"
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                  >
                    <motion.div
                      className="h-full rounded bg-primary/70"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Scan line */}
              <motion.div
                className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Floating cards */}
            <motion.div
              className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card/90 p-4 shadow-lg backdrop-blur-md"
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-foreground/20"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-2xl">📊</span>
                </motion.div>
                <div>
                  <div className="text-sm text-muted-foreground">Revenue Hari Ini</div>
                  <motion.div
                    className="text-xl text-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                  >
                    Rp 125.5M
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 rounded-xl border border-border bg-card/90 p-3 shadow-lg backdrop-blur-md"
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-sm text-foreground">12 Host Online</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
}
