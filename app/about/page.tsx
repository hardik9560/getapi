"use client";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Globe, Users, Award, ArrowRight, Code2, Sparkles, TrendingUp, Github, Twitter, Linkedin, ShieldCheck, Cpu, Fingerprint } from "lucide-react";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { COLORS as C } from "@/lib/constants";

const VALUES = [
    { icon: Zap, color: C.teal, title: "Precision Engineering", desc: "Every asset is stress-tested for maximum frames and zero-friction integration." },
    { icon: Fingerprint, color: C.teal, title: "Unique Fingerprint", desc: "Our components aren't just blocks; they're unique UI signatures for your application." },
    { icon: Globe, color: C.teal, title: "Neural Network", desc: "Global infrastructure support. React, Next.js, and modern ESM standards are core." },
    { icon: Cpu, color: C.teal, title: "Resource Efficient", desc: "Zero bloat. We optimize for the browser's main thread and your user's hardware." },
    { icon: ShieldCheck, color: C.teal, title: "Immutable Quality", desc: "Clean code with 100% type safety. We don't ship anything we wouldn't use ourselves." },
    { icon: Target, color: C.teal, title: "Elite Focus", desc: "We focus on high-end fintech, SaaS, and AI interfaces. No generic placeholders." },
];

const TEAM = [
    { name: "Alex Nexus", role: "Archon & Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", social: { github: "#", twitter: "#", linkedin: "#" } },
    { name: "Sarah Vision", role: "UI Architect", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", social: { github: "#", twitter: "#", linkedin: "#" } },
    { name: "Marcus Core", role: "Systems Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus", social: { github: "#", twitter: "#", linkedin: "#" } },
    { name: "Emily Link", role: "Nexus Protocol", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily", social: { github: "#", twitter: "#", linkedin: "#" } },
];

const MILESTONES = [
    { year: "2024", label: "Protocol Initiated", desc: "Nexatech UI launched with 50 high-fidelity experimental components." },
    { year: "Q2 2024", label: "Mass Adoption", desc: "Community adoption hit 10k unique node installations." },
    { year: "Q4 2024", label: "Market Mastery", desc: "Expanded the archive to 100+ premium UI architectures." },
    { year: "2025", label: "Global Nexus", desc: "Powering the interfaces of 500+ world-class technology organizations." },
];

export default function AboutPage() {
    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>

            {/* ── Hero section ── */}
            <div style={{ position: "relative", overflow: "hidden", background: C.dark, padding: "120px 24px 100px" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 20% 60%, ${C.teal}15 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${C.teal}08 0%, transparent 55%)` }} />
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.light}10 1px, transparent 1px), linear-gradient(90deg, ${C.light}10 1px, transparent 1px)`, backgroundSize: "56px 56px" }} />
                <Spotlight size={500} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="badge-teal" style={{ marginBottom: 24 }}>
                            <Sparkles size={11} /> The Genesis
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 900, color: C.light, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24 }}>
                        Architecting the <br />
                        <span style={{ color: C.teal }}>Nexus of UI</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(238, 238, 238, 0.5)", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
                        Founded in the heart of the digital frontier, Nexatech UI exists to eliminate the gap between concept and code. We build the infrastructure that allows developers to ship elite-tier interfaces instantly.
                    </motion.p>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 120px" }}>

                {/* ── Stats ── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, margin: "0 0 100px" }}>
                    {[
                        { value: "2.8k+", label: "Architectures", icon: Code2 },
                        { value: "15k+", label: "Archons", icon: Users },
                        { value: "80%", label: "Forge Cut", icon: Award },
                        { value: "4.9★", label: "Signal Strength", icon: TrendingUp },
                    ].map(({ value, label, icon: Icon }) => (
                        <div key={label} style={{ borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "32px 24px", textAlign: "center", backdropFilter: "blur(20px)" }}>
                            <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(238, 238, 238, 0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                                <Icon size={20} color={C.teal} />
                            </div>
                            <p style={{ fontSize: 32, fontWeight: 900, color: C.light, letterSpacing: "-0.03em" }}>{value}</p>
                            <p style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.3)", marginTop: 4, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* ── Values ── */}
                <div style={{ marginBottom: 120 }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2 style={{ fontSize: 40, fontWeight: 900, color: C.light, letterSpacing: "-0.03em" }}>
                            Core <span style={{ color: C.teal }}>Directives</span>
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                        {VALUES.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <motion.div key={v.title}
                                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    style={{ borderRadius: 28, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.08)`, padding: "40px", backdropFilter: "blur(20px)", transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
                                    whileHover={{ y: -8, background: "rgba(238, 238, 238, 0.04)", borderColor: C.teal }}
                                >
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(238, 238, 238, 0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                                        <Icon size={24} color={C.teal} />
                                    </div>
                                    <h3 style={{ fontSize: 18, fontWeight: 900, color: C.light, marginBottom: 12 }}>{v.title}</h3>
                                    <p style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.5)", lineHeight: 1.8 }}>{v.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Timeline ── */}
                <div style={{ marginBottom: 160 }}>
                    <div style={{ textAlign: "center", marginBottom: 80 }}>
                        <h2 style={{ fontSize: 40, fontWeight: 900, color: C.light }}>Sequence</h2>
                    </div>
                    <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
                        <div style={{ position: "absolute", left: 40, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.teal}, transparent)` }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                            {MILESTONES.map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    style={{ display: "flex", gap: 40, alignItems: "center" }}>
                                    <div style={{ width: 80, height: 80, borderRadius: 24, background: C.dark, border: `2px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 20px ${C.teal}20`, zIndex: 10 }}>
                                        <span style={{ fontSize: 14, fontWeight: 900, color: C.teal, textAlign: "center" }}>{m.year}</span>
                                    </div>
                                    <div style={{ flex: 1, background: "rgba(238, 238, 238, 0.02)", borderRadius: 24, border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "32px", backdropFilter: "blur(20px)" }}>
                                        <p style={{ fontSize: 18, fontWeight: 900, color: C.light, marginBottom: 8 }}>{m.label}</p>
                                        <p style={{ fontSize: 15, color: "rgba(238, 238, 238, 0.4)", lineHeight: 1.7 }}>{m.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Team ── */}
                <div style={{ marginBottom: 160 }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <h2 style={{ fontSize: 40, fontWeight: 900, color: C.light }}>The Foundational Nodes</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
                        {TEAM.map((t, i) => (
                            <motion.div key={t.name}
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{ borderRadius: 28, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "40px 24px", textAlign: "center", backdropFilter: "blur(20px)", transition: "all 0.3s" }}
                                whileHover={{ y: -10, borderColor: C.teal }}
                            >
                                <img src={t.avatar} alt={t.name} style={{ width: 100, height: 100, borderRadius: 32, margin: "0 auto 24px", border: `2px solid rgba(238, 238, 238, 0.1)`, display: "block" }} />
                                <h3 style={{ fontSize: 18, fontWeight: 900, color: C.light, marginBottom: 4 }}>{t.name}</h3>
                                <p style={{ fontSize: 14, color: C.teal, fontWeight: 800, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.role}</p>
                                <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                                    {[Github, Twitter, Linkedin].map((SIcon, j) => (
                                        <a key={j} href="#" style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(238, 238, 238, 0.03)", border: `1px solid rgba(238, 238, 238, 0.1)`, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(238, 238, 238, 0.5)", textDecoration: "none", transition: "all 0.2s" }}>
                                            <SIcon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Final Banner ── */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    style={{ borderRadius: 48, background: `linear-gradient(135deg, ${C.teal} 0%, #008187 100%)`, textAlign: "center", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 15% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)` }} />
                    <div style={{ position: "relative", zIndex: 2 }}>
                        <h2 style={{ fontSize: 48, fontWeight: 900, color: C.dark, marginBottom: 16, letterSpacing: "-0.04em" }}>Synergize with the Frontier</h2>
                        <p style={{ fontSize: 20, color: "rgba(34, 40, 49, 0.7)", marginBottom: 48, maxWidth: 500, margin: "0 auto 48px", fontWeight: 600 }}>Join the world's most innovative engineers in building the future of web interfaces.</p>
                        <Link href="/components" className="btn-primary" style={{ background: C.dark, color: C.light, padding: "20px 48px", borderRadius: 20, fontSize: 18, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                            Access the Forge <ArrowRight size={22} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
