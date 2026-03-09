"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, Bell, Gift, Sparkles } from "lucide-react";
import { COLORS as C } from "@/lib/constants";

const PERKS = [
    { icon: Bell, text: "New component alerts", color: "#c084fc" },
    { icon: Gift, text: "Exclusive discounts", color: "#ff6b9d" },
    { icon: Mail, text: "Weekly picks", color: "#67e8f9" },
];

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
        <section style={{ position: "relative", padding: "120px 0", background: C.dark }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.3), rgba(103,232,249,0.3), transparent)" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ position: "relative", borderRadius: 48, padding: "clamp(48px, 6vw, 96px)", background: "linear-gradient(135deg, rgba(192,132,252,0.08) 0%, rgba(255,107,157,0.06) 50%, rgba(103,232,249,0.06) 100%)", border: "1px solid rgba(192,132,252,0.18)", textAlign: "center", overflow: "hidden", backdropFilter: "blur(40px)" }}
                >
                    {/* Rainbow top line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #c084fc, #ff6b9d, #ffb347, #6ee7b7, #67e8f9)" }} />

                    {/* Glow blobs */}
                    <div style={{ position: "absolute", top: -120, right: -80, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.18) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: -100, left: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,157,0.14) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: "40%", left: "40%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(103,232,249,0.1) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

                    {/* Glossy top shine */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)", borderRadius: "48px 48px 0 0", pointerEvents: "none" }} />

                    <div style={{ position: "relative", zIndex: 2 }}>
                        <motion.div whileInView={{ scale: [0.8, 1.1, 1] }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <span className="badge-purple" style={{ marginBottom: 24, display: "inline-flex" }}>
                                <Sparkles size={11} /> Exclusive Access
                            </span>
                        </motion.div>

                        <h2 style={{ fontSize: "clamp(32px, 4vw, 60px)", fontWeight: 900, letterSpacing: "-0.04em", marginTop: 8, marginBottom: 16, lineHeight: 1.05 }}>
                            <span style={{ color: C.light }}>Stay ahead of the </span>
                            <span style={{ background: "linear-gradient(135deg, #c084fc, #ff6b9d, #ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Curve
                            </span>
                        </h2>

                        <p style={{ fontSize: 18, color: "rgba(240,240,255,0.45)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
                            Join 12,000+ designers & developers receiving premium components, system audits, and elite-tier drops.
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 48 }}>
                            {PERKS.map(({ icon: Icon, text, color }) => (
                                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(240,240,255,0.5)", fontWeight: 600 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Icon size={15} color={color} />
                                    </div>
                                    {text}
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {subscribed ? (
                                <motion.div key="success"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "20px 40px", borderRadius: 20, background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.3)", color: "#6ee7b7", fontSize: 18, fontWeight: 900, boxShadow: "0 0 40px rgba(110,231,183,0.2)" }}
                                >
                                    <CheckCircle size={24} /> You&apos;re in! Welcome 🎉
                                </motion.div>
                            ) : (
                                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    onSubmit={e => { e.preventDefault(); if (email) { setSubscribed(true); setEmail(""); } }}
                                    style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 560, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}
                                >
                                    <div style={{ position: "relative", flex: "1 1 300px", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
                                        <Mail size={18} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: focused ? "#c084fc" : "rgba(240,240,255,0.3)", transition: "color 0.2s" }} />
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                                            placeholder="your@email.com"
                                            style={{ width: "100%", padding: "18px 24px 18px 54px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: `1px solid ${focused ? "rgba(192,132,252,0.5)" : "rgba(255,255,255,0.08)"}`, color: C.light, fontSize: 16, outline: "none", fontFamily: "inherit", transition: "all 0.3s", boxShadow: focused ? "0 0 0 4px rgba(192,132,252,0.1)" : "none", backdropFilter: "blur(8px)" }}
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ fontSize: 15, padding: "18px 32px", borderRadius: 16, fontWeight: 800 }}>
                                        <Send size={17} /> Subscribe
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <p style={{ marginTop: 24, fontSize: 13, color: "rgba(240,240,255,0.25)", fontWeight: 600 }}>
                            No spam, unsubscribe anytime.{" "}
                            <a href="/privacy" style={{ color: "#c084fc", textDecoration: "none" }}>Privacy Policy</a>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
