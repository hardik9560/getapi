"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { COLORS as C } from "@/lib/constants";

const CAT_COLORS = [
    { bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.2)", glow: "#c084fc" },
    { bg: "rgba(255,107,157,0.1)", border: "rgba(255,107,157,0.2)", glow: "#ff6b9d" },
    { bg: "rgba(103,232,249,0.1)", border: "rgba(103,232,249,0.2)", glow: "#67e8f9" },
    { bg: "rgba(110,231,183,0.1)", border: "rgba(110,231,183,0.2)", glow: "#6ee7b7" },
    { bg: "rgba(253,230,138,0.1)", border: "rgba(253,230,138,0.2)", glow: "#fde68a" },
    { bg: "rgba(255,179,71,0.1)", border: "rgba(255,179,71,0.2)", glow: "#ffb347" },
];

export default function Categories() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

    return (
        <section style={{ position: "relative", padding: "100px 0", background: C.dark }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(103,232,249,0.3), rgba(110,231,183,0.3), transparent)" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
                    <div>
                        <span className="badge-sky" style={{ marginBottom: 12 }}>
                            <Grid size={11} /> Browse Categories
                        </span>
                        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>
                            <span style={{ color: C.light }}>Find your </span>
                            <span style={{ background: "linear-gradient(135deg, #67e8f9, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                perfect component
                            </span>
                        </h2>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        {[-1, 1].map((dir, i) => (
                            <button key={i} onClick={() => scroll(dir)}
                                style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,240,255,0.5)", cursor: "pointer", transition: "all 0.2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(192,132,252,0.4)"; e.currentTarget.style.color = "#c084fc"; e.currentTarget.style.background = "rgba(192,132,252,0.08)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(192,132,252,0.2)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(240,240,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                {dir === -1 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={scrollRef} style={{ display: "flex", gap: 14, overflowX: "auto", padding: "12px 0 24px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {categories.map((cat, i) => {
                        const s = CAT_COLORS[i % CAT_COLORS.length];
                        return (
                            <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} style={{ flexShrink: 0 }}>
                                <Link href={`/components?category=${cat.slug}`}
                                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "28px 20px", borderRadius: 22, background: s.bg, border: `1px solid ${s.border}`, minWidth: 148, textDecoration: "none", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", backdropFilter: "blur(8px)", position: "relative", overflow: "hidden" }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = "translateY(-6px) scale(1.02)";
                                        el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 30px ${s.glow}30`;
                                        el.style.borderColor = `${s.glow}60`;
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement;
                                        el.style.transform = "translateY(0) scale(1)";
                                        el.style.boxShadow = "none";
                                        el.style.borderColor = s.border;
                                    }}
                                >
                                    {/* Glossy shine */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)", pointerEvents: "none" }} />
                                    {/* Glow dot top-right */}
                                    <div style={{ position: "absolute", top: -10, right: -10, width: 40, height: 40, borderRadius: "50%", background: `radial-gradient(circle, ${s.glow}40 0%, transparent 70%)`, pointerEvents: "none" }} />

                                    <span style={{ fontSize: 30, filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2))" }}>{cat.icon}</span>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: C.light, whiteSpace: "nowrap", textAlign: "center" }}>{cat.name}</span>
                                    <span style={{ fontSize: 11, color: "rgba(240,240,255,0.35)", fontWeight: 600 }}>{cat.componentCount} items</span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
