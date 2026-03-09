"use client";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Activity, Star } from "lucide-react";
import Link from "next/link";
import { apis } from "@/lib/api-data";
import { ApiCard } from "@/components/apis/ApiCard";
import { COLORS as C } from "@/lib/constants";

export default function FeaturedApis() {
    const featuredApis = apis.filter(a => a.featured).slice(0, 3);

    return (
        <section style={{ padding: "100px 24px", background: C.dark }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, gap: 24, flexWrap: "wrap" }}>
                    <div>
                        <div className="badge-teal" style={{ marginBottom: 16 }}>
                            <Zap size={11} /> High Performance
                        </div>
                        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: C.light, letterSpacing: "-0.02em", margin: 0 }}>
                            Featured <span style={{ color: C.teal }}>APIs</span>
                        </h2>
                        <p style={{ fontSize: 16, color: "rgba(238, 238, 238, 0.45)", marginTop: 12, maxWidth: 500 }}>
                            Production-ready APIs with 99.9% uptime, low latency, and comprehensive documentation.
                        </p>
                    </div>

                    <Link href="/apis" className="btn-ghost" style={{ background: "rgba(238, 238, 238, 0.05)" }}>
                        Browse All APIs <ArrowRight size={16} />
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                    {featuredApis.map((api, i) => (
                        <ApiCard key={api.id} api={api} index={i} />
                    ))}
                </div>

                {/* API Specs Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card"
                    style={{ marginTop: 64, padding: "48px 32px", borderRadius: 32, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 32 }}
                >
                    <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.light}10 1px, transparent 1px), linear-gradient(90deg, ${C.light}10 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

                    {[
                        { icon: Activity, label: "99.9% Up-time", sub: "SLA Guaranteed" },
                        { icon: Zap, label: "< 100ms Latency", sub: "Global Edge Network" },
                        { icon: Star, label: "Dev-First Docs", sub: "Clean & Complete" },
                    ].map((item, i) => (
                        <div key={i} style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(238, 238, 238, 0.03)", border: "1px solid rgba(238, 238, 238, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: C.teal }}>
                                <item.icon size={24} />
                            </div>
                            <h4 style={{ fontSize: 18, fontWeight: 700, color: C.light, margin: "0 0 4px" }}>{item.label}</h4>
                            <p style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.4)", margin: 0 }}>{item.sub}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
