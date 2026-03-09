"use client";
import { useParams, notFound } from "next/navigation";
import { apis } from "@/lib/api-data";
import { motion } from "framer-motion";
import { Star, Shield, Activity, Zap, Clock, Copy, CheckCircle, ArrowLeft, Globe, Code2, BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { COLORS as C } from "@/lib/constants";

const METHOD_COLORS: Record<string, string> = {
    GET: "#10b981", POST: "#00ADB5", PUT: "#f59e0b", DELETE: "#ef4444", PATCH: "#8b5cf6", WS: "#06b6d4",
};

const PRICING_LABEL: Record<string, { text: string; color: string }> = {
    FREE: { text: "Free", color: "#10b981" },
    FREEMIUM: { text: "Freemium", color: "#00ADB5" },
    PAY_PER_CALL: { text: "Pay-per-call", color: "#f59e0b" },
    SUBSCRIPTION: { text: "Subscription", color: "#8b5cf6" },
};

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
    return (
        <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: copied ? "#10b981" : C.teal, background: "rgba(238, 238, 238, 0.03)", border: `1px solid ${copied ? "#10b981" : "rgba(238, 238, 238, 0.1)"}`, cursor: "pointer", transition: "all 0.2s" }}>
            {copied ? <><CheckCircle size={12} /> Copied!</> : <><Copy size={12} /> Copy URL</>}
        </button>
    );
}

export default function ApiDetailPage() {
    const { slug } = useParams() as { slug: string };
    const api = apis.find(a => a.slug === slug);
    if (!api) return notFound();

    const pm = PRICING_LABEL[api.pricingModel];
    const uptimeColor = api.uptime >= 99.9 ? "#10b981" : api.uptime >= 99 ? "#f59e0b" : "#ef4444";

    const fmtCalls = (n: number) => n >= 1_000_000_000 ? `${(n / 1_000_000_000).toFixed(1)}B` : n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : String(n);

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>
            {/* Nav area */}
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 0" }}>
                <Link href="/apis" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "rgba(238, 238, 238, 0.4)", textDecoration: "none" }}>
                    <ArrowLeft size={16} /> Back to Marketplace
                </Link>
            </div>

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px 100px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "flex-start" }} className="lg:grid-cols-[1fr,340px] grid-cols-1">
                {/* ── Main column ── */}
                <div style={{ minWidth: 0 }}>
                    {/* Header card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        style={{ borderRadius: 32, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "40px", marginBottom: 32, position: "relative", overflow: "hidden", backdropFilter: "blur(20px)" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${C.teal}, transparent)` }} />

                        <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
                            <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(0, 0, 0, 0.2)", border: `1px solid rgba(238, 238, 238, 0.08)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 32 }}>
                                {api.category.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 300 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                                    <span style={{ fontSize: 11, fontWeight: 800, color: pm.color, background: `${pm.color}15`, border: `1px solid ${pm.color}30`, padding: "3px 12px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.05em" }}>{pm.text}</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(238, 238, 238, 0.4)", background: "rgba(238, 238, 238, 0.05)", padding: "3px 10px", borderRadius: 999 }}>v{api.version}</span>
                                    {api.featured && <span className="badge-teal">⭐ Featured API</span>}
                                </div>
                                <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, color: C.light, marginBottom: 10, letterSpacing: "-0.04em", lineHeight: 1.1 }}>{api.name}</h1>
                                <p style={{ fontSize: 16, color: C.teal, fontWeight: 700 }}>{api.category.name} Infrastructure</p>
                            </div>
                        </div>

                        <p style={{ fontSize: 16, color: "rgba(238, 238, 238, 0.5)", lineHeight: 1.8, margin: "24px 0" }}>{api.longDescription}</p>

                        {/* Tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {api.tags.map(t => (
                                <span key={t.id} style={{ fontSize: 12, fontWeight: 700, color: "rgba(238, 238, 238, 0.6)", background: "rgba(238, 238, 238, 0.03)", border: `1px solid rgba(238, 238, 238, 0.1)`, padding: "4px 12px", borderRadius: 10 }}>{t.name}</span>
                            ))}
                        </div>

                        {/* Base URL */}
                        <div style={{ marginTop: 32, padding: "16px 20px", borderRadius: 16, background: "rgba(0, 0, 0, 0.2)", border: `1px solid rgba(238, 238, 238, 0.08)`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <Globe size={18} color={C.teal} />
                            <code style={{ fontSize: 15, color: C.light, fontWeight: 700, flex: 1, minWidth: 200 }}>{api.baseUrl}</code>
                            <CopyButton text={api.baseUrl} />
                        </div>
                    </motion.div>

                    {/* Stats corridor */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }} className="sm:grid-cols-4 grid-cols-2">
                        {[
                            { icon: Star, label: "Trust Score", value: `${api.averageRating} / 5`, sub: `${api.reviewCount} dev notes`, color: "#f59e0b" },
                            { icon: Activity, label: "Live Uptime", value: `${api.uptime}%`, sub: "Guaranteed SLA", color: uptimeColor },
                            { icon: Zap, label: "Avg Latency", value: `${api.latencyMs}ms`, sub: "Global Edge", color: C.teal },
                            { icon: Clock, label: "API Traffic", value: fmtCalls(api.callCount), sub: "monthly average", color: "#8b5cf6" },
                        ].map(({ icon: Icon, label, value, sub, color }) => (
                            <div key={label} style={{ borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "24px 20px", position: "relative", overflow: "hidden" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: 6, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Icon size={12} color={color} />
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(238, 238, 238, 0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
                                </div>
                                <p style={{ fontSize: 22, fontWeight: 900, color: C.light, marginBottom: 4 }}>{value}</p>
                                <p style={{ fontSize: 11, color: "rgba(238, 238, 238, 0.3)", fontWeight: 600 }}>{sub}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Endpoints */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        style={{ borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "32px", marginBottom: 32 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 900, color: C.light, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                            <Code2 size={20} color={C.teal} /> Available Endpoints
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {api.endpoints.map((ep, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderRadius: 16, background: "rgba(0, 0, 0, 0.15)", border: `1px solid rgba(238, 238, 238, 0.05)` }}>
                                    <span style={{ fontSize: 11, fontWeight: 900, color: METHOD_COLORS[ep.method] ?? C.teal, background: `${METHOD_COLORS[ep.method] ?? C.teal}15`, padding: "4px 10px", borderRadius: 8, fontFamily: "monospace", minWidth: 60, textAlign: "center" }}>
                                        {ep.method}
                                    </span>
                                    <code style={{ fontSize: 14, fontWeight: 700, color: C.light, flex: 1 }}>{ep.path}</code>
                                    <span style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.4)" }}>{ep.description}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Code Snippet */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        style={{ borderRadius: 24, background: "#1a1f26", border: `1px solid rgba(238, 238, 238, 0.08)`, overflow: "hidden", marginBottom: 32, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid rgba(238, 238, 238, 0.05)", background: "rgba(0,0,0,0.2)" }}>
                            <div style={{ display: "flex", gap: 8 }}>
                                {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(238, 238, 238, 0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Implementation Example</span>
                            <CopyButton text={api.codeSnippet} />
                        </div>
                        <pre className="code-block" style={{ margin: 0, padding: "32px", fontSize: 14, background: "transparent", border: "none" }}>
                            <code>{api.codeSnippet}</code>
                        </pre>
                    </motion.div>
                </div>

                {/* ── Sidebar ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 100 }}>
                    {/* Access card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        style={{ borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "32px", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: pm.color }} />

                        <h3 style={{ fontSize: 14, fontWeight: 900, color: C.light, marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.1em" }}>API Access</h3>

                        {api.freeCallsPerMonth > 0 && (
                            <div style={{ marginBottom: 20, padding: "14px", borderRadius: 16, background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                                <p style={{ fontSize: 12, fontWeight: 900, color: "#10b981", marginBottom: 4 }}>✓ FREE TIER ACTIVE</p>
                                <p style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.5)", lineHeight: 1.4 }}>First {api.freeCallsPerMonth.toLocaleString()} calls are free every month.</p>
                            </div>
                        )}

                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                            {[
                                { label: "Personal", price: api.price },
                                { label: "Team", price: api.teamPrice },
                                { label: "Enterprise", price: api.enterprisePrice },
                            ].filter(t => t.price > 0).map(t => (
                                <div key={t.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(238, 238, 238, 0.04)" }}>
                                    <span style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.6)", fontWeight: 700 }}>{t.label}</span>
                                    <span style={{ fontSize: 16, fontWeight: 900, color: C.light }}>
                                        ${t.price}<span style={{ fontSize: 11, fontWeight: 400, color: "rgba(238, 238, 238, 0.3)" }}>/mo</span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary" style={{ width: "100%", padding: "16px", borderRadius: 16, justifyContent: "center" }}>
                            Request API Key <ArrowRight size={18} />
                        </button>

                        <a href={api.baseUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16, padding: "12px", borderRadius: 16, background: "rgba(238, 238, 238, 0.03)", color: "rgba(238, 238, 238, 0.5)", fontWeight: 700, fontSize: 14, textDecoration: "none", border: "1px solid rgba(238, 238, 238, 0.08)", transition: "all 0.2s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.teal)}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(238, 238, 238, 0.08)")}
                        >
                            <ExternalLink size={16} /> Technical Docs
                        </a>
                    </motion.div>

                    {/* Developer Card */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        style={{ borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "24px" }}>
                        <h3 style={{ fontSize: 12, fontWeight: 900, color: "rgba(238, 238, 238, 0.3)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>API Provider</h3>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <img src={api.creator.image} alt={api.creator.name} style={{ width: 48, height: 48, borderRadius: 14, border: `2px solid rgba(238, 238, 238, 0.1)` }} />
                            <div>
                                <p style={{ fontSize: 15, fontWeight: 800, color: C.light }}>{api.creator.name}</p>
                                <p style={{ fontSize: 12, color: "rgba(238, 238, 238, 0.4)", marginTop: 2 }}>{api.creator.bio}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
