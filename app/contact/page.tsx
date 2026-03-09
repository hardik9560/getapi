"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle, ArrowRight, Clock, Zap, Sparkles, ShieldCheck } from "lucide-react";
import { useState, useRef } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { COLORS as C } from "@/lib/constants";

const CONTACT_ITEMS = [
    { icon: Mail, color: C.teal, label: "Digital Transmission", value: "nexus-central@nexatech.ui", sub: "Latency < 24ms for responses" },
    { icon: MessageCircle, color: C.teal, label: "Neural Link", value: "discord.gg/nexatech", sub: "Active community protocol" },
    { icon: Zap, color: C.teal, label: "Priority Protocol", value: "Priority Queue Available", sub: "Reserved for Enterprise Nodes" },
];

const FAQ_QUICK = [
    { q: "How fast is the deployment?", a: "Instantaneous after transaction verification. Source files appear in your dashboard dashboard immediately." },
    { q: "Custom development available?", a: "Our elite engineers handle bespoke architecture for Enterprise partners." },
    { q: "Infrastructure bugs?", a: "Report bugs via the 'Bug Node' subject for immediate triage." },
];

function Input({ label, type = "text", required = true, rows }: { label: string; type?: string; required?: boolean; rows?: number }) {
    const [focused, setFocused] = useState(false);
    const base = {
        width: "100%", padding: "16px 20px", borderRadius: 16, fontSize: 15, color: C.light, fontFamily: "inherit", outline: "none", background: "rgba(0, 0, 0, 0.2)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: `1px solid ${focused ? C.teal : "rgba(238, 238, 238, 0.08)"}`,
        boxShadow: focused ? `0 0 20px ${C.teal}15` : "none",
    };
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ fontSize: 12, fontWeight: 900, color: "rgba(238, 238, 238, 0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
            {rows ? (
                <textarea rows={rows} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={{ ...base, resize: "none" as const }} />
            ) : (
                <input type={type} required={required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={base} />
            )}
        </div>
    );
}

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>

            {/* ── Hero Banner ── */}
            <div style={{ position: "relative", overflow: "hidden", background: C.dark, padding: "120px 24px 100px" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 15% 55%, ${C.teal}18 0%, transparent 60%), radial-gradient(ellipse at 85% 25%, ${C.teal}10 0%, transparent 55%)` }} />
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.light}10 1px, transparent 1px), linear-gradient(90deg, ${C.light}10 1px, transparent 1px)`, backgroundSize: "52px 52px" }} />
                <Spotlight size={500} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="badge-teal" style={{ marginBottom: 24 }}>
                            <Sparkles size={11} /> Establish Connection
                        </span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, color: C.light, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24 }}>
                        Initiate <span style={{ color: C.teal }}>Nexus Link</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(238, 238, 238, 0.5)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                        Whether you're reporting a glitch, requesting new architecture, or scaling into Enterprise — our frequency is open.
                    </motion.p>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 120px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40, alignItems: "start" }} className="lg:grid-cols-[1fr,1.6fr] grid-cols-1">

                    {/* ── Left: contact info ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {CONTACT_ITEMS.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={item.label}
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    style={{ borderRadius: 28, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "32px", display: "flex", gap: 24, alignItems: "center", backdropFilter: "blur(20px)" }}
                                >
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(238, 238, 238, 0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <Icon size={24} color={C.teal} />
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontSize: 11, fontWeight: 900, color: "rgba(238, 238, 238, 0.2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</p>
                                        <p style={{ fontSize: 16, fontWeight: 900, color: C.light, marginBottom: 4 }}>{item.value}</p>
                                        <p style={{ fontSize: 12, color: "rgba(238, 238, 238, 0.4)", fontWeight: 600 }}>{item.sub}</p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Quick FAQ Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            style={{ borderRadius: 28, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "32px", backdropFilter: "blur(20px)" }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: C.light, marginBottom: 24, display: "flex", alignItems: "center", gap: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                <MessageCircle size={16} color={C.teal} /> System Intelligence
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                {FAQ_QUICK.map((f, i) => (
                                    <div key={i}>
                                        <p style={{ fontSize: 14, fontWeight: 900, color: C.light, marginBottom: 6 }}>{f.q}</p>
                                        <p style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.4)", lineHeight: 1.7 }}>{f.a}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: contact form ── */}
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        style={{ borderRadius: 32, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "48px", backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>

                        {sent ? (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "64px 0" }}>
                                <div style={{ width: 80, height: 80, borderRadius: 32, background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
                                    <CheckCircle size={40} color="#10b981" />
                                </div>
                                <h3 style={{ fontSize: 28, fontWeight: 900, color: C.light, marginBottom: 12 }}>Transmission Received</h3>
                                <p style={{ fontSize: 16, color: "rgba(238, 238, 238, 0.4)", lineHeight: 1.8, marginBottom: 40, maxWidth: 360, margin: "0 auto 40px" }}>
                                    Your data has been prioritized. Expect a response from our core team within the next 24-cycle.
                                </p>
                                <button onClick={() => setSent(false)} className="btn-ghost"
                                    style={{ border: "1px solid rgba(238, 238, 238, 0.1)", padding: "14px 32px", borderRadius: 16, fontSize: 15 }}>
                                    Initiate New Connection
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <h2 style={{ fontSize: 24, fontWeight: 900, color: C.light, marginBottom: 12 }}>Transmission Source</h2>
                                <p style={{ fontSize: 15, color: "rgba(238, 238, 238, 0.4)", marginBottom: 40 }}>Complete the neural fields below to establish contact.</p>

                                <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="md:grid-cols-2 grid-cols-1">
                                        <Input label="Protocol Ident" />
                                        <Input label="Neural Address" type="email" />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        <label style={{ fontSize: 12, fontWeight: 900, color: "rgba(238, 238, 238, 0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Subject Priority</label>
                                        <select style={{ padding: "16px 20px", borderRadius: 16, fontSize: 15, color: C.light, fontFamily: "inherit", background: "rgba(0,0,0,0.2)", border: `1px solid rgba(238, 238, 238, 0.1)`, outline: "none", cursor: "pointer" }}>
                                            {["General Uplink", "Architecture Support", "Financial & Licensing", "Alliance", "Bug Node", "Component Request"].map(o => (
                                                <option key={o} value={o} style={{ background: C.dark }}>{o}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <Input label="Transmission Essence" rows={6} />

                                    <motion.button type="submit"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-primary"
                                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "18px", borderRadius: 16, fontSize: 16, fontWeight: 900 }}>
                                        <Send size={20} /> Authorize Transmission
                                    </motion.button>

                                    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", fontSize: 12, color: "rgba(238, 238, 238, 0.2)", marginTop: 8 }}>
                                        <ShieldCheck size={14} color="#10b981" /> 256-bit Encrypted Pipeline v4
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
