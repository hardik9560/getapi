"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Zap, Star, Users, Play, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { COLORS as C } from "@/lib/constants";

const TECH_CHIPS = ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"];
const STATS = [
    { icon: Star, value: "4.9", label: "Avg Rating", color: "#fde68a" },
    { icon: Code2, value: "2,800+", label: "Components", color: "#c084fc" },
    { icon: Users, value: "15K+", label: "Developers", color: "#ff6b9d" },
    { icon: Zap, value: "Live", label: "Demos", color: "#6ee7b7" },
];

const FLOATING_CARDS = [
    { label: "New Release 🎉", sub: "Aurora Hero v2.1", grad: "linear-gradient(135deg,#c084fc22,#ff6b9d22)", border: "#c084fc30" },
    { label: "⭐ 4.9 Rating", sub: "1,200+ reviews", grad: "linear-gradient(135deg,#fde68a22,#ffb34722)", border: "#ffb34730" },
    { label: "🚀 Ship Faster", sub: "Production Ready", grad: "linear-gradient(135deg,#6ee7b722,#67e8f922)", border: "#67e8f930" },
];

export default function Hero() {
    const ref = useRef<HTMLElement>(null);
    const [chipIdx, setChipIdx] = useState(0);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    useEffect(() => {
        const t = setInterval(() => setChipIdx(i => (i + 1) % TECH_CHIPS.length), 2200);
        return () => clearInterval(t);
    }, []);

    return (
        <section ref={ref} style={{ position: "relative", minHeight: "95vh", overflow: "hidden", background: C.dark }}>

            {/* ── Deep aurora background ── */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(192,132,252,0.18) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 90% 50%, rgba(255,107,157,0.1) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 30% at 10% 80%, rgba(103,232,249,0.08) 0%, transparent 60%)" }} />

            {/* Dot grid */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: `radial-gradient(circle, rgba(192,132,252,0.6) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

            {/* Glow orbs */}
            <div style={{ position: "absolute", top: -100, left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 200, right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,157,0.12) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

            {/* Mouse-tracked spotlight */}
            <Spotlight size={600} className="z-10" />

            <motion.div style={{ y, opacity, position: "relative", zIndex: 10, height: "95vh", display: "flex", alignItems: "center" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="lg:grid-cols-2 grid-cols-1">

                    {/* ── LEFT: Text content ── */}
                    <div>
                        {/* Badge row */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
                            <span className="badge-purple">
                                <Sparkles size={11} /> #1 Component Library
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#6ee7b7", background: "rgba(110,231,183,0.08)", border: "1px solid rgba(110,231,183,0.2)" }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", display: "inline-block", boxShadow: "0 0 8px #6ee7b7" }} />
                                Live demos available
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            style={{ fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", marginBottom: 20, color: C.light }}>
                            Stunning UI
                            <br />
                            <span style={{ background: "linear-gradient(135deg, #c084fc 0%, #ff6b9d 50%, #ffb347 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                components
                            </span>
                            <br />
                            <span style={{ fontSize: "0.65em", fontWeight: 700, color: "rgba(240,240,255,0.6)" }}>
                                with live previews
                            </span>
                        </motion.h1>

                        {/* Tech chip typewriter */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, fontSize: 14, color: "rgba(240,240,255,0.4)" }}>
                            <span>Works with</span>
                            <AnimatePresence mode="wait">
                                <motion.span key={chipIdx}
                                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                                    transition={{ duration: 0.22 }}
                                    style={{ padding: "3px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, color: "#c084fc", background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.2)", boxShadow: "0 0 12px rgba(192,132,252,0.2)" }}>
                                    {TECH_CHIPS[chipIdx]}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "rgba(240,240,255,0.5)", maxWidth: 440, marginBottom: 36, lineHeight: 1.8 }}>
                            Every component ships with a live interactive demo and copy-ready code. Ship production-ready UIs in minutes, not days.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                            style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
                            <Link href="/components" className="btn-primary" style={{ padding: "14px 32px", borderRadius: 14, fontSize: 15 }}>
                                Browse Components <ArrowRight size={17} />
                            </Link>
                            <Link href="/components" className="btn-ghost" style={{ padding: "14px 28px", borderRadius: 14, fontSize: 15 }}>
                                <Play size={15} fill="currentColor" /> Watch Demo
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                            style={{ display: "flex", alignItems: "center", gap: "clamp(18px, 4vw, 40px)", flexWrap: "wrap" }}>
                            {STATS.map(({ icon: Icon, value, label, color }, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 20, fontWeight: 800, color: C.light }}>
                                        <Icon size={14} color={color} /> {value}
                                    </div>
                                    <div style={{ fontSize: 11, color: "rgba(240,240,255,0.35)", fontWeight: 500 }}>{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Spline 3D Scene ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                        className="hidden lg:block"
                        style={{ position: "relative", height: "clamp(420px, 58vh, 720px)", borderRadius: 36, overflow: "hidden", border: "1px solid rgba(192,132,252,0.15)", boxShadow: "0 0 0 1px rgba(192,132,252,0.05) inset, 0 32px 80px rgba(0,0,0,0.6), 0 0 80px rgba(192,132,252,0.12)" }}
                    >
                        {/* Rainbow top edge */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #c084fc, #ff6b9d, #ffb347, #6ee7b7, #67e8f9)", zIndex: 5 }} />

                        {/* Gradient overlay on edges */}
                        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 40%, ${C.dark}90 100%)`, zIndex: 2, pointerEvents: "none" }} />
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, ${C.dark}c0, transparent)`, zIndex: 3, pointerEvents: "none" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top, ${C.dark}c0, transparent)`, zIndex: 3, pointerEvents: "none" }} />

                        <SplineScene
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            className="w-full h-full"
                        />

                        {/* Floating cards */}
                        {FLOATING_CARDS.map((card, i) => (
                            <motion.div key={i}
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
                                style={{ position: "absolute", zIndex: 10, padding: "10px 16px", borderRadius: 14, background: card.grad, backdropFilter: "blur(20px)", border: `1px solid ${card.border}`, ...(i === 0 ? { bottom: 70, left: 20 } : i === 1 ? { top: 80, right: 20 } : { bottom: 24, right: 24 }) }}
                            >
                                <p style={{ fontSize: 12, fontWeight: 800, color: "#f0f0ff" }}>{card.label}</p>
                                <p style={{ fontSize: 11, color: "rgba(240,240,255,0.5)", marginTop: 2 }}>{card.sub}</p>
                            </motion.div>
                        ))}

                        {/* Interactive tag */}
                        <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10, padding: "8px 16px", borderRadius: 12, background: "rgba(10,10,15,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 8px #6ee7b7" }} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,240,255,0.7)" }}>Interactive 3D · Drag to explore</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom fade */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom, transparent, ${C.dark})`, zIndex: 20 }} />
        </section>
    );
}
