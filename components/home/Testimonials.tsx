"use client";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { COLORS as C } from "@/lib/constants";
import { testimonials } from "@/lib/mock-data";
import { useRef } from "react";

const CARD_STYLES = [
    { grad: "linear-gradient(135deg, rgba(192,132,252,0.08), rgba(255,107,157,0.04))", border: "rgba(192,132,252,0.2)", star: "#c084fc", glow: "rgba(192,132,252,0.15)" },
    { grad: "linear-gradient(135deg, rgba(255,107,157,0.08), rgba(255,179,71,0.04))", border: "rgba(255,107,157,0.2)", star: "#ff6b9d", glow: "rgba(255,107,157,0.15)" },
    { grad: "linear-gradient(135deg, rgba(103,232,249,0.08), rgba(110,231,183,0.04))", border: "rgba(103,232,249,0.2)", star: "#67e8f9", glow: "rgba(103,232,249,0.15)" },
    { grad: "linear-gradient(135deg, rgba(253,230,138,0.08), rgba(255,179,71,0.04))", border: "rgba(253,230,138,0.2)", star: "#fde68a", glow: "rgba(253,230,138,0.15)" },
];

export default function Testimonials() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} style={{ position: "relative", padding: "120px 0", background: C.dark }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,107,157,0.3), rgba(192,132,252,0.3), transparent)" }} />

            {/* Background blobs */}
            <div style={{ position: "absolute", top: "20%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,157,0.06) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)", filter: "blur(20px)", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                    <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} className="badge-rose" style={{ display: "inline-flex", marginBottom: 16 }}>
                        💬 Developer Love
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
                        style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, color: C.light, marginTop: 12, letterSpacing: "-0.04em", lineHeight: 1 }}>
                        Loved by{" "}
                        <span style={{ background: "linear-gradient(135deg, #ff6b9d, #ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            15,000+
                        </span>{" "}engineers
                    </motion.h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }}>
                    {testimonials.map((t, i) => {
                        const s = CARD_STYLES[i % CARD_STYLES.length];
                        return (
                            <motion.div key={t.id}
                                initial={{ opacity: 0, y: 28 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.01 }}
                                style={{ padding: "36px", borderRadius: 28, background: s.grad, border: `1px solid ${s.border}`, position: "relative", backdropFilter: "blur(20px)", overflow: "hidden", cursor: "default", transition: "box-shadow 0.3s ease" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${s.glow}`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                            >
                                {/* Glossy top shine */}
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)", pointerEvents: "none", borderRadius: "28px 28px 0 0" }} />

                                {/* Quote icon */}
                                <Quote size={48} color={s.border} style={{ position: "absolute", top: 24, right: 24, opacity: 0.3 }} />

                                {/* Stars */}
                                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <motion.div key={j} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.1 + j * 0.04 }}>
                                            <Star size={16} color={s.star} fill={s.star} style={{ filter: `drop-shadow(0 0 4px ${s.star}80)` }} />
                                        </motion.div>
                                    ))}
                                </div>

                                <blockquote style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(240,240,255,0.6)", marginBottom: 28, fontStyle: "italic", fontWeight: 500 }}>
                                    &ldquo;{t.comment}&rdquo;
                                </blockquote>

                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ position: "relative" }}>
                                        <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: 16, border: `2px solid ${s.border}`, objectFit: "cover" }} />
                                        <div style={{ position: "absolute", bottom: -3, right: -3, width: 14, height: 14, borderRadius: "50%", background: "#6ee7b7", border: `2px solid ${C.dark}`, boxShadow: "0 0 8px #6ee7b7" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 15, fontWeight: 800, color: C.light }}>{t.name}</p>
                                        <p style={{ fontSize: 11, color: "rgba(240,240,255,0.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.role} @ {t.company}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
