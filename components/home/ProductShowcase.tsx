"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Star, TrendingUp, Zap, Code2, ArrowRight, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { COLORS as C } from "@/lib/constants";

const PREVIEW_COMPONENTS = [
    { name: "Aurora Hero", category: "Hero Sections", rating: 4.9, price: 149, downloads: "3.4k", color: "#00ADB5", emoji: "✨" },
    { name: "Glassmorphism Card", category: "Cards", rating: 4.8, price: 79, downloads: "2.1k", color: "#00ADB5", emoji: "🪟" },
    { name: "Neural Dashboard", category: "Dashboards", rating: 4.9, price: 229, downloads: "1.8k", color: "#00ADB5", emoji: "🧠" },
    { name: "Magnetic Button", category: "Buttons", rating: 4.7, price: 49, downloads: "5.2k", color: "#00ADB5", emoji: "🧲" },
    { name: "Particle Login", category: "Authentication", rating: 4.8, price: 119, downloads: "2.7k", color: "#00ADB5", emoji: "🔐" },
    { name: "3D Pricing Table", category: "Pricing", rating: 5.0, price: 99, downloads: "1.5k", color: "#00ADB5", emoji: "💎" },
];

/** Inner content shown inside the scroll card */
function ShowcaseContent() {
    return (
        <div style={{ width: "100%", height: "100%", background: C.gray, fontFamily: "inherit", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Mock browser bar */}
            <div style={{ background: C.dark, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 6 }}>
                    {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ flex: 1, background: "rgba(238, 238, 238, 0.03)", border: "1px solid rgba(238, 238, 238, 0.08)", borderRadius: 8, padding: "4px 16px", fontSize: 11, color: "rgba(238, 238, 238, 0.4)", maxWidth: 360, margin: "0 auto", textAlign: "center" }}>
                    marketplace.dev/preview
                </div>
            </div>

            {/* Header */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(238, 238, 238, 0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Code2 size={16} color={C.dark} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 900, color: C.light }}>NexaTech</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {["Library", "APIs", "Docs"].map(l => <span key={l} style={{ fontSize: 12, color: "rgba(238, 238, 238, 0.4)", padding: "4px 8px" }}>{l}</span>)}
                    <span style={{ fontSize: 12, padding: "4px 14px", borderRadius: 8, background: C.teal, color: C.dark, fontWeight: 800 }}>Explore</span>
                </div>
            </div>

            {/* Content area */}
            <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignContent: "start" }}>
                {PREVIEW_COMPONENTS.map((comp, i) => (
                    <div key={i} style={{ borderRadius: 16, background: "rgba(238, 238, 238, 0.02)", border: "1px solid rgba(238, 238, 238, 0.06)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                        {/* Thumbnail */}
                        <div style={{ aspectRatio: "16/10", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `linear-gradient(${C.teal} 1px, transparent 1px), linear-gradient(90deg, ${C.teal} 1px, transparent 1px)`, backgroundSize: "16px 16px" }} />
                            <span style={{ fontSize: 24, filter: "drop-shadow(0 0 10px rgba(0,173,181,0.3))" }}>{comp.emoji}</span>
                        </div>
                        {/* Info */}
                        <div style={{ padding: "12px" }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: C.light, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{comp.name}</div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 10, color: C.teal, fontWeight: 800, textTransform: "uppercase" }}>{comp.category}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                    <Star size={10} color="#e9a800" fill="#e9a800" />
                                    <span style={{ fontSize: 11, fontWeight: 800, color: C.light }}>{comp.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ProductShowcase() {
    return (
        <section style={{ background: C.dark, overflow: "hidden", padding: "80px 0" }}>
            <ContainerScroll
                titleComponent={
                    <div style={{ textAlign: "center" }}>
                        {/* Label */}
                        <div className="badge-teal" style={{ marginBottom: 24 }}>
                            <Zap size={11} /> Interactive Experience
                        </div>

                        <h2 style={{ fontSize: "clamp(32px, 5.5vw, 64px)", fontWeight: 900, letterSpacing: "-0.04em", color: C.light, lineHeight: 1.05, marginBottom: 24 }}>
                            Every component.<br />
                            <span style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.light})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Instantly explorable.
                            </span>
                        </h2>

                        <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: "rgba(238, 238, 238, 0.5)", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
                            Our premium library comes with live interactive previews and copy-ready code, helping you build faster than ever before.
                        </p>

                        {/* Feature chips */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                            {[
                                { icon: Play, text: "Live preview" },
                                { icon: Code2, text: "Copy-ready code" },
                                { icon: CheckCircle, text: "TypeScript ready" },
                                { icon: Zap, text: "Framer Motion" },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: C.light, background: "rgba(238, 238, 238, 0.03)", border: `1px solid rgba(238, 238, 238, 0.1)`, backdropFilter: "blur(10px)" }}>
                                    <Icon size={14} color={C.teal} /> {text}
                                </div>
                            ))}
                        </div>

                        <Link href="/components" className="btn-primary" style={{ padding: "16px 48px", borderRadius: 16 }}>
                            Browse All Components <ArrowRight size={18} />
                        </Link>
                    </div>
                }
            >
                <ShowcaseContent />
            </ContainerScroll>
        </section>
    );
}
