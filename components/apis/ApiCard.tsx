"use client";
import { motion } from "framer-motion";
import { ApiItem } from "@/types";
import { Star, Zap, Shield, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { COLORS as C } from "@/lib/constants";

export function ApiCard({ api, index = 0 }: { api: ApiItem; index?: number }) {
    const uptimeColor = api.uptime >= 99.9 ? C.teal : api.uptime >= 99 ? "#d97706" : "#ff4d4d";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.045, duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${C.teal}30` }}
            style={{
                borderRadius: 24,
                background: "rgba(238, 238, 238, 0.02)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(238, 238, 238, 0.06)",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
            }}
        >
            {/* Decorative Gradient Glow */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 100, height: 100, background: `radial-gradient(circle, ${C.teal}10 0%, transparent 70%)`, pointerEvents: "none" }} />

            <div style={{ padding: "26px" }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                            <span style={{ fontSize: 10, fontWeight: 900, color: C.teal, background: `${C.teal}12`, border: `1px solid ${C.teal}25`, padding: "3px 10px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                {api.pricingModel}
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(238, 238, 238, 0.45)", background: "rgba(238, 238, 238, 0.05)", padding: "3px 10px", borderRadius: 99 }}>
                                v{api.version}
                            </span>
                        </div>
                        <Link href={`/apis/${api.slug}`} style={{ textDecoration: "none" }}>
                            <h3 style={{ fontSize: 17, fontWeight: 800, color: C.light, margin: 0, lineHeight: 1.25 }}>{api.name}</h3>
                        </Link>
                    </div>
                    <div style={{ padding: "6px 12px", borderRadius: 12, background: "rgba(238, 238, 238, 0.03)", border: "1px solid rgba(238, 238, 238, 0.08)", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 12 }}>
                        <Shield size={12} color={C.teal} />
                        <span style={{ fontSize: 11, fontWeight: 800, color: C.teal }}>{api.authType}</span>
                    </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13.5, color: "rgba(238, 238, 238, 0.55)", lineHeight: 1.65, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                    {api.description}
                </p>

                {/* Endpoints */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                    {api.endpoints.slice(0, 3).map((ep, i) => (
                        <span key={i} style={{ fontSize: 10, fontWeight: 800, color: C.teal, background: `${C.teal}05`, border: `1px solid ${C.teal}15`, padding: "4px 10px", borderRadius: 8, fontFamily: "monospace" }}>
                            {ep.method} {ep.path.split("/")[1] || "/"}
                        </span>
                    ))}
                    {api.endpoints.length > 3 && (
                        <span style={{ fontSize: 10, color: "rgba(238, 238, 238, 0.35)", padding: "4px 6px" }}>+{api.endpoints.length - 3}</span>
                    )}
                </div>

                {/* Stats */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid rgba(238, 238, 238, 0.05)" }}>
                    <div style={{ display: "flex", gap: 18 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Activity size={13} color={uptimeColor} />
                            <span style={{ fontSize: 12, fontWeight: 800, color: C.light }}>{api.uptime}%</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Zap size={13} color={C.teal} />
                            <span style={{ fontSize: 12, color: "rgba(238, 238, 238, 0.5)" }}>{api.latencyMs}ms</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Star size={13} color="#e9a800" fill="#e9a800" />
                            <span style={{ fontSize: 12, fontWeight: 800, color: C.light }}>{api.averageRating}</span>
                        </div>
                    </div>

                    <Link href={`/apis/${api.slug}`} style={{ width: 34, height: 34, borderRadius: 12, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", color: C.dark, transition: "all 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
