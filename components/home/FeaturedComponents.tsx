"use client";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import ComponentCard from "@/components/components/ComponentCard";
import { getFeaturedComponents } from "@/lib/mock-data";
import { useRef } from "react";
import { COLORS as C } from "@/lib/constants";

const featured = getFeaturedComponents().slice(0, 6);

export default function FeaturedComponents() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} style={{ position: "relative", padding: "100px 0", background: C.dark }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.3), rgba(255,107,157,0.2), transparent)" }} />

            {/* Ambient glow */}
            <div style={{ position: "absolute", top: "30%", left: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(192,132,252,0.05) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56, flexWrap: "wrap" }}>
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }}>
                        <span className="badge-purple" style={{ marginBottom: 16 }}>
                            <TrendingUp size={11} /> Popular This Week
                        </span>
                        <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 12 }}>
                            <span style={{ color: C.light }}>Hand-picked </span>
                            <span style={{ background: "linear-gradient(135deg, #c084fc, #ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                premium
                            </span>
                            <span style={{ color: C.light }}> components</span>
                        </h2>
                        <p style={{ marginTop: 12, fontSize: 16, color: "rgba(240,240,255,0.4)", maxWidth: 440 }}>
                            Curated by our team — with live interactive demos for every single component.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 }}>
                        <Link href="/components" className="btn-ghost" style={{ fontSize: 13, padding: "10px 20px" }}>
                            View all <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                    {featured.map((c, i) => <ComponentCard key={c.id} component={c} index={i} />)}
                </div>

                {/* Bottom CTA */}
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                    style={{ marginTop: 64, textAlign: "center" }}>
                    <Link href="/components" className="btn-primary" style={{ padding: "16px 48px", borderRadius: 16, fontSize: 16 }}>
                        <Sparkles size={18} /> Explore Full Library <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
