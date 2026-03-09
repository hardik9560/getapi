"use client";
import React from "react";
import { motion } from "framer-motion";

interface CategoryPreviewProps {
    slug: string;
    accent: string;
    hovered: boolean;
}

// ─── individual animated previews ────────────────────────────────────────────

function HeroPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 20px" }}>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: 11, fontWeight: 800, color: accent, background: `${accent}18`, padding: "3px 10px", borderRadius: 999, border: `1px solid ${accent}35`, letterSpacing: "0.06em" }}>
                ✨ HERO SECTION
            </motion.div>
            <motion.div
                animate={{ opacity: [0, 1] }} transition={{ duration: 0.8, delay: 0.3 }}
                style={{ textAlign: "center" }}
            >
                <div style={{ fontSize: 13, fontWeight: 900, color: "#f0f0ff", lineHeight: 1.2, letterSpacing: "-0.02em" }}>Build Something</div>
                <motion.div
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ fontSize: 13, fontWeight: 900, background: `linear-gradient(90deg, ${accent}, #fff, ${accent})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Beautiful
                </motion.div>
            </motion.div>
            <div style={{ fontSize: 9, color: "rgba(240,240,255,0.4)", textAlign: "center", lineHeight: 1.5 }}>
                Ship production-ready UIs<br />in minutes, not months.
            </div>
            <motion.div
                animate={{ scale: [1, 1.05, 1], boxShadow: [`0 0 8px ${accent}40`, `0 0 20px ${accent}70`, `0 0 8px ${accent}40`] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ padding: "5px 16px", borderRadius: 8, fontSize: 10, fontWeight: 800, background: accent, color: "#0a0a0f", cursor: "default" }}>
                Get Started →
            </motion.div>
        </div>
    );
}

function NavbarPreview({ accent }: { accent: string }) {
    const links = ["Home", "Docs", "Pricing", "Blog"];
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 8, padding: "12px 16px" }}>
            {/* navbar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        style={{ width: 14, height: 14, borderRadius: 4, background: accent }} />
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#f0f0ff" }}>Brand</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    {links.map((l, i) => (
                        <motion.span key={l} animate={{ color: i === 1 ? [accent, "#f0f0ff", accent] : "rgba(240,240,255,0.45)" }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                            style={{ fontSize: 9, fontWeight: 600 }}>{l}</motion.span>
                    ))}
                </div>
                <motion.div animate={{ boxShadow: [`0 0 4px ${accent}50`, `0 0 12px ${accent}90`, `0 0 4px ${accent}50`] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ padding: "3px 10px", borderRadius: 6, background: accent, fontSize: 9, fontWeight: 800, color: "#0a0a0f" }}>Sign In</motion.div>
            </div>
            {/* page skeleton */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                {[80, 60, 90, 50].map((w, i) => (
                    <motion.div key={i} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                        style={{ height: 5, width: `${w}%`, borderRadius: 3, background: "rgba(255,255,255,0.1)" }} />
                ))}
            </div>
        </div>
    );
}

function DashboardPreview({ accent }: { accent: string }) {
    const bars = [55, 80, 40, 95, 65, 75];
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 8, padding: "12px 16px" }}>
            {/* stat cards */}
            <div style={{ display: "flex", gap: 6 }}>
                {[{ label: "Revenue", val: "$124K", delta: "+12%" }, { label: "Users", val: "8.2K", delta: "+5%" }].map((s, i) => (
                    <motion.div key={i} animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                        style={{ flex: 1, padding: "6px 8px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ fontSize: 8, color: "rgba(240,240,255,0.4)", marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: "#f0f0ff" }}>{s.val}</div>
                        <div style={{ fontSize: 8, color: accent, fontWeight: 700 }}>{s.delta}</div>
                    </motion.div>
                ))}
            </div>
            {/* bar chart */}
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4, padding: "6px 8px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                {bars.map((h, i) => (
                    <motion.div key={i}
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                        style={{ flex: 1, borderRadius: "3px 3px 0 0", originY: 1, background: i === 3 ? accent : `${accent}50`, height: `${h}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

function FormPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px" }}>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#f0f0ff", marginBottom: 4 }}>Create Account</div>
                {[{ label: "Full Name", placeholder: "John Doe", focus: false }, { label: "Email", placeholder: "john@email.com", focus: true }, { label: "Password", placeholder: "••••••••", focus: false }].map((f, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(240,240,255,0.45)" }}>{f.label}</span>
                        <motion.div
                            animate={f.focus ? { boxShadow: [`0 0 0 0px ${accent}`, `0 0 0 3px ${accent}40`, `0 0 0 0px ${accent}`] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ padding: "5px 10px", borderRadius: 7, background: "rgba(255,255,255,0.04)", border: `1px solid ${f.focus ? accent : "rgba(255,255,255,0.08)"}` }}>
                            <span style={{ fontSize: 9, color: f.focus ? "rgba(240,240,255,0.9)" : "rgba(240,240,255,0.25)" }}>
                                {f.focus ? (
                                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>john@email.com|</motion.span>
                                ) : f.placeholder}
                            </span>
                        </motion.div>
                    </div>
                ))}
                <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ marginTop: 4, padding: "7px", borderRadius: 8, background: accent, textAlign: "center", fontSize: 10, fontWeight: 800, color: "#0a0a0f" }}>
                    Submit →
                </motion.div>
            </div>
        </div>
    );
}

function CardPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            {[
                { title: "Pro Plan", price: "$29", rotate: -6, delay: 0 },
                { title: "Analytics", price: "+18%", rotate: 0, delay: 0.2 },
                { title: "Dashboard", price: "Live", rotate: 5, delay: 0.4 },
            ].map((c, i) => (
                <motion.div key={i}
                    animate={{ y: [0, -8, 0], rotateZ: c.rotate }}
                    transition={{ duration: 3, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
                    style={{ padding: "10px 12px", borderRadius: 12, background: i === 1 ? `${accent}18` : "rgba(255,255,255,0.04)", border: `1px solid ${i === 1 ? accent : "rgba(255,255,255,0.07)"}`, minWidth: 60, boxShadow: i === 1 ? `0 8px 24px ${accent}30` : "0 4px 12px rgba(0,0,0,0.3)" }}>
                    <div style={{ fontSize: 8, color: "rgba(240,240,255,0.4)", marginBottom: 3 }}>{c.title}</div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: i === 1 ? accent : "#f0f0ff" }}>{c.price}</div>
                    {[40, 70, 55].map((w, j) => (
                        <div key={j} style={{ marginTop: 3, height: 3, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.1)" }} />
                    ))}
                </motion.div>
            ))}
        </div>
    );
}

function ModalPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {/* Backdrop */}
            <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
                style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", borderRadius: 12 }} />
            {/* Dialog */}
            <motion.div
                animate={{ scale: [0.9, 1, 0.9], y: [4, 0, 4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative", background: "#13131f", borderRadius: 14, padding: "16px", border: `1px solid ${accent}40`, boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 24px ${accent}20`, minWidth: 140 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#f0f0ff" }}>Confirm Action</span>
                    <span style={{ fontSize: 12, color: "rgba(240,240,255,0.3)", cursor: "default" }}>×</span>
                </div>
                <div style={{ fontSize: 9, color: "rgba(240,240,255,0.4)", lineHeight: 1.5, marginBottom: 12 }}>
                    Are you sure you want to proceed? This action cannot be undone.
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ flex: 1, padding: "5px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", fontSize: 9, fontWeight: 700, color: "rgba(240,240,255,0.5)", textAlign: "center" }}>Cancel</div>
                    <motion.div animate={{ boxShadow: [`0 0 4px ${accent}40`, `0 0 14px ${accent}70`, `0 0 4px ${accent}40`] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ flex: 1, padding: "5px", borderRadius: 7, background: accent, fontSize: 9, fontWeight: 800, color: "#0a0a0f", textAlign: "center" }}>Confirm</motion.div>
                </div>
            </motion.div>
        </div>
    );
}

function SidebarPreview({ accent }: { accent: string }) {
    const items = ["🏠 Dashboard", "📊 Analytics", "👥 Users", "⚙️ Settings", "🔔 Alerts"];
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", gap: 6, padding: "10px 12px" }}>
            {/* Sidebar */}
            <motion.div animate={{ x: [-8, 0, 0, -8] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.85, 1] }}
                style={{ width: 90, display: "flex", flexDirection: "column", gap: 3, borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: accent }} />
                    <span style={{ fontSize: 9, fontWeight: 800, color: "#f0f0ff" }}>App</span>
                </div>
                {items.map((item, i) => (
                    <motion.div key={i} animate={{ background: i === 1 ? [`${accent}18`, `${accent}28`, `${accent}18`] : "rgba(255,255,255,0)" }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ padding: "4px 6px", borderRadius: 6, fontSize: 8, fontWeight: 600, color: i === 1 ? accent : "rgba(240,240,255,0.4)", borderLeft: i === 1 ? `2px solid ${accent}` : "2px solid transparent" }}>
                        {item}
                    </motion.div>
                ))}
            </motion.div>
            {/* Main content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                {[70, 90, 55, 80, 65].map((w, i) => (
                    <motion.div key={i} animate={{ opacity: [0.2, 0.45, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
                        style={{ height: 8, width: `${w}%`, borderRadius: 4, background: "rgba(255,255,255,0.07)" }} />
                ))}
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    style={{ marginTop: 4, height: 40, borderRadius: 8, background: `${accent}15`, border: `1px solid ${accent}25` }} />
            </div>
        </div>
    );
}

function LandingPagePreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
            <motion.div animate={{ y: ["0%", "-65%"] }} transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {/* Hero section */}
                <div style={{ padding: "14px 16px", background: `radial-gradient(ellipse at top, ${accent}12 0%, transparent 70%)`, borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ height: 5, width: "50%", borderRadius: 3, background: `${accent}80` }} />
                    <div style={{ height: 8, width: "80%", borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
                    <div style={{ height: 5, width: "70%", borderRadius: 3, background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ height: 20, width: 60, borderRadius: 6, background: accent, marginTop: 4 }} />
                </div>
                {/* Features */}
                <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                    {[accent, "#ff6b9d", "#67e8f9"].map((c, i) => (
                        <div key={i} style={{ padding: "8px 6px", borderRadius: 8, background: `${c}12`, border: `1px solid ${c}25` }}>
                            <div style={{ width: 12, height: 12, borderRadius: 3, background: c, marginBottom: 4 }} />
                            {[60, 80].map((w, j) => <div key={j} style={{ height: 3, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.1)", marginBottom: 2 }} />)}
                        </div>
                    ))}
                </div>
                {/* Testimonial */}
                <div style={{ padding: "12px 16px" }}>
                    <div style={{ height: 4, width: "90%", borderRadius: 2, background: "rgba(255,255,255,0.07)", marginBottom: 4 }} />
                    <div style={{ height: 4, width: "70%", borderRadius: 2, background: "rgba(255,255,255,0.07)" }} />
                </div>
            </motion.div>
        </div>
    );
}

function AuthPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ padding: "16px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}30`, boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${accent}15`, minWidth: 160 }}>
                <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: accent, margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔐</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#f0f0ff" }}>Welcome Back</div>
                </div>
                {["Email", "Password"].map((label, i) => (
                    <div key={i} style={{ marginBottom: 7 }}>
                        <div style={{ fontSize: 8, color: "rgba(240,240,255,0.4)", marginBottom: 3 }}>{label}</div>
                        <motion.div animate={i === 0 ? { borderColor: [accent, "rgba(255,255,255,0.08)", accent] } : {}} transition={{ duration: 2.5, repeat: Infinity }}
                            style={{ height: 20, borderRadius: 6, background: "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? accent : "rgba(255,255,255,0.08)"}` }}>
                            {i === 0 && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                                style={{ padding: "0 8px", fontSize: 9, color: "rgba(240,240,255,0.6)", lineHeight: "20px", display: "block" }}>admin@site.com|</motion.span>}
                        </motion.div>
                    </div>
                ))}
                <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ padding: "6px", borderRadius: 8, background: accent, fontSize: 10, fontWeight: 800, color: "#0a0a0f", textAlign: "center" }}>
                    Sign In →
                </motion.div>
            </motion.div>
        </div>
    );
}

function PricingPreview({ accent }: { accent: string }) {
    const plans = [
        { name: "Free", price: "$0", color: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", featured: false },
        { name: "Pro", price: "$29", color: `${accent}15`, border: accent, featured: true },
        { name: "Team", price: "$79", color: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", featured: false },
    ];
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px" }}>
            {plans.map((p, i) => (
                <motion.div key={i}
                    animate={p.featured ? { scale: [1, 1.04, 1], boxShadow: [`0 0 8px ${accent}30`, `0 0 24px ${accent}60`, `0 0 8px ${accent}30`] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ flex: p.featured ? 1.3 : 1, padding: "10px 8px", borderRadius: 10, background: p.color, border: `1px solid ${p.border}`, textAlign: "center" }}>
                    {p.featured && <div style={{ fontSize: 7, fontWeight: 800, color: "#0a0a0f", background: accent, borderRadius: 4, padding: "1px 6px", marginBottom: 5 }}>POPULAR</div>}
                    <div style={{ fontSize: 9, color: "rgba(240,240,255,0.5)", marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: p.featured ? accent : "#f0f0ff" }}>{p.price}</div>
                    <div style={{ fontSize: 7, color: "rgba(240,240,255,0.3)", marginBottom: 6 }}>/month</div>
                    {[1, 2, 3].map(j => (
                        <div key={j} style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.07)", marginBottom: 3 }} />
                    ))}
                    <div style={{ marginTop: 6, padding: "4px", borderRadius: 5, background: p.featured ? accent : "rgba(255,255,255,0.06)", fontSize: 7, fontWeight: 700, color: p.featured ? "#0a0a0f" : "rgba(240,240,255,0.5)" }}>
                        {p.featured ? "Get Pro" : "Select"}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function FooterPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "10px 14px" }}>
            {/* Page body */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
                {[80, 65, 90].map((w, i) => (
                    <div key={i} style={{ height: 5, width: `${w}%`, borderRadius: 3, background: "rgba(255,255,255,0.07)" }} />
                ))}
            </div>
            {/* Footer */}
            <div style={{ borderTop: `1px solid ${accent}30`, paddingTop: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                    {["Company", "Product", "Docs", "Legal"].map((col, i) => (
                        <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}>
                            <div style={{ fontSize: 7, fontWeight: 800, color: accent, marginBottom: 4, textTransform: "uppercase" }}>{col}</div>
                            {[1, 2, 3].map(j => (
                                <div key={j} style={{ height: 3, width: `${60 + j * 10}%`, borderRadius: 2, background: "rgba(255,255,255,0.06)", marginBottom: 3 }} />
                            ))}
                        </motion.div>
                    ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 7, color: "rgba(240,240,255,0.25)" }}>© 2025 Brand Inc.</div>
                    <div style={{ display: "flex", gap: 5 }}>
                        {[accent, "#ff6b9d", "#67e8f9"].map((c, i) => (
                            <motion.div key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DataTablePreview({ accent }: { accent: string }) {
    const rows = [
        ["Alice Chen", "Engineer", "$142K", "Active"],
        ["Bob Smith", "Designer", "$98K", "Away"],
        ["Carol Davis", "Manager", "$165K", "Active"],
        ["David Park", "Dev Ops", "$138K", "Active"],
    ];
    return (
        <div style={{ width: "100%", height: "100%", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 5 }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", gap: 4 }}>
                {["Name ↕", "Role ↕", "Salary", "Status"].map((h, i) => (
                    <div key={i} style={{ fontSize: 7, fontWeight: 800, color: i === 0 ? accent : "rgba(240,240,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
                ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            {/* Rows */}
            {rows.map((row, i) => (
                <motion.div key={i}
                    animate={i === 1 ? { background: [`${accent}00`, `${accent}10`, `${accent}00`] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", gap: 4, padding: "3px 4px", borderRadius: 5 }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: "#f0f0ff" }}>{row[0]}</div>
                    <div style={{ fontSize: 8, color: "rgba(240,240,255,0.45)" }}>{row[1]}</div>
                    <div style={{ fontSize: 8, fontWeight: 700, color: accent }}>{row[2]}</div>
                    <div style={{ fontSize: 7, fontWeight: 800, color: row[3] === "Active" ? "#6ee7b7" : "#ffb347" }}>{row[3]}</div>
                </motion.div>
            ))}
        </div>
    );
}

function ChartPreview({ accent }: { accent: string }) {
    const points = [20, 45, 30, 70, 50, 85, 60, 90, 75];
    const width = 180;
    const height = 80;
    const path = points.map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - (p / 100) * height;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
    const area = `${path} L ${width} ${height} L 0 ${height} Z`;

    return (
        <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <div style={{ fontSize: 8, color: "rgba(240,240,255,0.35)" }}>Monthly Revenue</div>
                    <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontSize: 14, fontWeight: 900, color: accent }}>$124,280</motion.div>
                </div>
                <div style={{ fontSize: 8, fontWeight: 700, color: "#6ee7b7", background: "rgba(110,231,183,0.1)", padding: "2px 6px", borderRadius: 4 }}>↑ 18.4%</div>
            </div>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ flex: 1, width: "100%", overflow: "visible" }}>
                <defs>
                    <linearGradient id={`g-${accent.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path d={area} fill={`url(#g-${accent.replace("#", "")})`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
                <motion.path d={path} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }} />
                {points.map((p, i) => {
                    const x = (i / (points.length - 1)) * width;
                    const y = height - (p / 100) * height;
                    return (
                        <motion.circle key={i} cx={x} cy={y} r="3" fill={accent}
                            animate={{ r: [2, 4, 2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
                    );
                })}
            </svg>
        </div>
    );
}

function EcommercePreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px" }}>
            {/* Product card */}
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ flex: 1, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}30`, overflow: "hidden" }}>
                {/* Product image area */}
                <div style={{ height: 55, background: `linear-gradient(135deg, ${accent}20, ${accent}08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    👟
                </div>
                <div style={{ padding: "8px" }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: "#f0f0ff", marginBottom: 3 }}>Air Max Pro</div>
                    <div style={{ fontSize: 8, color: "rgba(240,240,255,0.35)", marginBottom: 4 }}>⭐ 4.8 (234)</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: accent }}>$129</span>
                        <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ padding: "3px 8px", borderRadius: 6, background: accent, fontSize: 8, fontWeight: 800, color: "#0a0a0f" }}>
                            + Cart
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            {/* Mini cart */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: 20 }}>🛒</motion.div>
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    style={{ fontSize: 7, color: "#6ee7b7", fontWeight: 700 }}>Added!</motion.div>
                <div style={{ fontSize: 7, color: "rgba(240,240,255,0.35)" }}>3 items</div>
                <div style={{ fontSize: 10, fontWeight: 900, color: accent }}>$387</div>
            </div>
        </div>
    );
}

function BlogPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Reading progress */}
            <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                <motion.div animate={{ width: ["0%", "75%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ height: "100%", background: accent, borderRadius: 999 }} />
            </div>
            {/* Article */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✍️</div>
                <div>
                    <div style={{ fontSize: 8, fontWeight: 700, color: "#f0f0ff" }}>Sarah Chen</div>
                    <div style={{ fontSize: 7, color: "rgba(240,240,255,0.35)" }}>Mar 5 · 6 min read</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 7, color: accent, fontWeight: 700, background: `${accent}15`, padding: "2px 6px", borderRadius: 4 }}>Design</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#f0f0ff", lineHeight: 1.3 }}>10 UI Patterns That Will Make Your App Shine</div>
            {[90, 80, 75, 60].map((w, i) => (
                <motion.div key={i} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                    style={{ height: 4, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.08)" }} />
            ))}
        </div>
    );
}

function AnimationPreview({ accent }: { accent: string }) {
    const particles = Array.from({ length: 16 }, (_, i) => ({
        x: Math.sin(i * 1.4) * 55 + 50, y: Math.cos(i * 1.4) * 40 + 50,
        size: 3 + (i % 3) * 2, delay: i * 0.15,
        color: [accent, "#ff6b9d", "#67e8f9", "#6ee7b7"][i % 4],
    }));
    return (
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            {particles.map((p, i) => (
                <motion.div key={i}
                    animate={{ x: [p.x - 50, p.x - 40, p.x - 50], y: [p.y - 50, p.y - 60, p.y - 50], opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                    style={{ position: "absolute", left: "50%", top: "50%", width: p.size, height: p.size, borderRadius: "50%", background: p.color, filter: `blur(1px) drop-shadow(0 0 4px ${p.color})` }}
                />
            ))}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ width: 30, height: 30, borderRadius: "50%", background: `conic-gradient(${accent}, #ff6b9d, #67e8f9, ${accent})`, filter: `drop-shadow(0 0 8px ${accent})` }} />
            </div>
        </div>
    );
}

function ThreeDPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", perspective: 300 }}>
            <motion.div
                animate={{ rotateY: [0, 360], rotateX: [15, 30, 15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ width: 60, height: 60, position: "relative", transformStyle: "preserve-3d" }}
            >
                {/* Cube faces */}
                {[
                    { transform: "translateZ(30px)", bg: `${accent}60` },
                    { transform: "rotateY(180deg) translateZ(30px)", bg: `${accent}40` },
                    { transform: "rotateY(90deg) translateZ(30px)", bg: `${accent}50` },
                    { transform: "rotateY(-90deg) translateZ(30px)", bg: `${accent}35` },
                    { transform: "rotateX(90deg) translateZ(30px)", bg: `${accent}45` },
                    { transform: "rotateX(-90deg) translateZ(30px)", bg: `${accent}30` },
                ].map((face, i) => (
                    <div key={i} style={{ position: "absolute", width: 60, height: 60, border: `1px solid ${accent}`, background: face.bg, backdropFilter: "blur(4px)", transform: face.transform }} />
                ))}
            </motion.div>
            <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, textAlign: "center" }}>
                <div style={{ fontSize: 8, color: "rgba(240,240,255,0.4)", fontWeight: 600 }}>WebGL · Three.js · Interactive</div>
            </div>
        </div>
    );
}


// ─── NEW category previews ────────────────────────────────────────────────────

function SplineModelPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative", overflow: "hidden" }}>
            {/* Ambient glow */}
            <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
                style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${accent}20 0%, transparent 70%)` }} />

            {/* Robot silhouette (CSS art) */}
            <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative", zIndex: 2 }}
            >
                {/* Head */}
                <div style={{ width: 36, height: 28, borderRadius: "8px 8px 4px 4px", background: `linear-gradient(135deg, ${accent}60, ${accent}30)`, border: `1px solid ${accent}80`, margin: "0 auto 2px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, position: "relative" }}>
                    {/* Eyes */}
                    {[0, 1].map(i => (
                        <motion.div key={i} animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            style={{ width: 7, height: 7, borderRadius: "50%", background: i === 0 ? "#67e8f9" : accent, boxShadow: `0 0 8px ${i === 0 ? "#67e8f9" : accent}` }} />
                    ))}
                    {/* Antenna */}
                    <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", width: 2, height: 10, background: `${accent}80` }}>
                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }}
                            style={{ width: 5, height: 5, borderRadius: "50%", background: accent, position: "absolute", top: -3, left: -1, boxShadow: `0 0 6px ${accent}` }} />
                    </div>
                </div>
                {/* Body */}
                <div style={{ width: 44, height: 32, borderRadius: 8, background: `linear-gradient(180deg, ${accent}40, ${accent}20)`, border: `1px solid ${accent}50`, margin: "0 auto 2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ width: 16, height: 10, borderRadius: 4, background: `${accent}60`, border: `1px solid ${accent}` }} />
                </div>
                {/* Legs */}
                <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    {[0, 1].map(i => (
                        <motion.div key={i} animate={{ scaleY: [1, 0.85, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
                            style={{ width: 14, height: 18, borderRadius: "0 0 6px 6px", background: `${accent}35`, border: `1px solid ${accent}50`, originY: 0 }} />
                    ))}
                </div>
            </motion.div>

            {/* Labels */}
            <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
                {["Spline", "Three.js", "WebGL"].map(t => (
                    <span key={t} style={{ fontSize: 7, fontWeight: 700, color: accent, background: `${accent}12`, padding: "2px 5px", borderRadius: 4, border: `1px solid ${accent}25` }}>{t}</span>
                ))}
            </div>

            {/* Orbit ring */}
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", width: 90, height: 40, borderRadius: "50%", border: `1px solid ${accent}25`, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: -3, left: "30%", width: 6, height: 6, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}` }} />
            </motion.div>
        </div>
    );
}

function ApiPreview({ accent }: { accent: string }) {
    const endpoints = [
        { method: "GET", path: "/api/users", status: 200, time: "42ms" },
        { method: "POST", path: "/api/auth/token", status: 201, time: "128ms" },
        { method: "PUT", path: "/api/data/:id", status: 200, time: "67ms" },
        { method: "DEL", path: "/api/cache", status: 204, time: "15ms" },
    ];
    const methodColors: Record<string, string> = { GET: "#6ee7b7", POST: "#c084fc", PUT: "#fde68a", DEL: "#ff6b9d" };
    return (
        <div style={{ width: "100%", height: "100%", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Header bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: 8, height: 8, borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 6px #6ee7b7" }} />
                <span style={{ fontSize: 9, fontWeight: 800, color: accent }}>API Playground</span>
                <span style={{ marginLeft: "auto", fontSize: 7, color: "rgba(240,240,255,0.3)" }}>REST / GraphQL / WS</span>
            </div>
            {/* Endpoint rows */}
            {endpoints.map((ep, i) => (
                <motion.div key={i}
                    animate={{ x: i % 2 === 0 ? [-4, 0, 0, -4] : [4, 0, 0, 4], opacity: [0.5, 1, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 7px", borderRadius: 7, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <span style={{ fontSize: 7, fontWeight: 900, color: methodColors[ep.method] || accent, background: `${methodColors[ep.method] || accent}15`, padding: "1px 5px", borderRadius: 3, minWidth: 24, textAlign: "center" }}>{ep.method}</span>
                    <span style={{ fontSize: 8, color: "rgba(240,240,255,0.55)", fontFamily: "monospace", flex: 1 }}>{ep.path}</span>
                    <span style={{ fontSize: 7, fontWeight: 700, color: ep.status < 300 ? "#6ee7b7" : "#ff6b9d" }}>{ep.status}</span>
                    <span style={{ fontSize: 7, color: "rgba(240,240,255,0.3)" }}>{ep.time}</span>
                </motion.div>
            ))}
            {/* Code hint */}
            <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }}
                style={{ padding: "5px 8px", borderRadius: 7, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "monospace", fontSize: 8, color: "#67e8f9" }}>
                <span style={{ color: "#c084fc" }}>const</span> res = <span style={{ color: "#6ee7b7" }}>await</span> fetch(<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}><span style={{ color: "#fde68a" }}>url</span>|</motion.span>)
            </motion.div>
        </div>
    );
}

function SecurityPreview({ accent }: { accent: string }) {
    const threats = [
        { name: "Malware.Gen", severity: "HIGH", icon: "🦠" },
        { name: "Phishing.URL", severity: "MED", icon: "🎣" },
        { name: "Trojan.Win32", severity: "CRIT", icon: "⚠️" },
    ];
    const sevColor: Record<string, string> = { HIGH: "#fde68a", MED: "#ffb347", CRIT: "#ff6b9d" };
    return (
        <div style={{ width: "100%", height: "100%", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Shield icon */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <motion.div
                    animate={{ boxShadow: [`0 0 0px ${accent}`, `0 0 20px ${accent}60`, `0 0 0px ${accent}`] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 36, height: 36, borderRadius: 10, background: `${accent}15`, border: `1px solid ${accent}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}
                >🛡️</motion.div>
                <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#f0f0ff" }}>Threat Scanner</div>
                    <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity }}
                        style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${accent}, #ff6b9d)`, marginTop: 4 }} />
                </div>
                <div style={{ marginLeft: "auto", fontSize: 8, fontWeight: 700, color: "#ff6b9d", background: "rgba(255,107,157,0.1)", padding: "2px 7px", borderRadius: 5 }}>3 Found</div>
            </div>

            {/* Scan bar */}
            <div style={{ height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ height: "100%", width: "40%", background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
            </div>

            {/* Threats */}
            {threats.map((t, i) => (
                <motion.div key={i} animate={{ x: [0, 3, 0] }} transition={{ duration: 0.5, delay: i * 0.8, repeat: Infinity, repeatDelay: 2.5 }}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 7px", borderRadius: 7, background: `${sevColor[t.severity]}08`, border: `1px solid ${sevColor[t.severity]}25` }}>
                    <span style={{ fontSize: 10 }}>{t.icon}</span>
                    <span style={{ fontSize: 8, color: "rgba(240,240,255,0.65)", flex: 1, fontFamily: "monospace" }}>{t.name}</span>
                    <span style={{ fontSize: 7, fontWeight: 800, color: sevColor[t.severity] }}>{t.severity}</span>
                </motion.div>
            ))}
        </div>
    );
}

function PrinterPreview({ accent }: { accent: string }) {
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {/* Printer body */}
            <div style={{ position: "relative", width: 100 }}>
                {/* Paper coming out */}
                <motion.div
                    animate={{ y: [0, 18, 36, 36, 0], opacity: [0, 1, 1, 0, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: 70, height: 48, margin: "0 auto", borderRadius: "4px 4px 0 0", background: "#ffffff", border: "1px solid rgba(255,255,255,0.3)", display: "flex", flexDirection: "column", gap: 4, padding: "8px 10px", position: "absolute", top: -44, left: "50%", transform: "translateX(-50%)" }}>
                    {[80, 65, 90, 55, 70].map((w, i) => (
                        <motion.div key={i} animate={{ opacity: [0, 1] }} transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                            style={{ height: 3, width: `${w}%`, borderRadius: 2, background: i === 0 ? `${accent}80` : "rgba(0,0,0,0.2)" }} />
                    ))}
                </motion.div>

                {/* Printer box */}
                <div style={{ width: 100, height: 44, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 5, position: "relative" }}>
                    {/* Paper slot */}
                    <div style={{ width: 60, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }} />
                    {/* Status light */}
                    <motion.div animate={{ opacity: [0.5, 1, 0.5], background: [`${accent}60`, accent, `${accent}60`] }} transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
                    {/* Controls */}
                    <div style={{ display: "flex", gap: 4, position: "absolute", right: 10 }}>
                        {[accent, "#6ee7b7"].map((c, i) => (
                            <div key={i} style={{ width: 5, height: 5, borderRadius: 2, background: `${c}50` }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Labels */}
            <div style={{ display: "flex", gap: 5 }}>
                {["ESC/POS", "USB", "Bluetooth"].map(t => (
                    <span key={t} style={{ fontSize: 7, fontWeight: 700, color: accent, background: `${accent}12`, padding: "2px 6px", borderRadius: 4, border: `1px solid ${accent}25` }}>{t}</span>
                ))}
            </div>
        </div>
    );
}

// ─── router ──────────────────────────────────────────────────────────────────

const PREVIEW_MAP: Record<string, (props: { accent: string }) => React.ReactElement> = {
    "hero-sections": HeroPreview,
    "navigation-bars": NavbarPreview,
    "dashboards": DashboardPreview,
    "forms": FormPreview,
    "cards": CardPreview,
    "modals": ModalPreview,
    "sidebars": SidebarPreview,
    "landing-pages": LandingPagePreview,
    "authentication-pages": AuthPreview,
    "pricing-tables": PricingPreview,
    "footers": FooterPreview,
    "data-tables": DataTablePreview,
    "charts": ChartPreview,
    "e-commerce": EcommercePreview,
    "blog-templates": BlogPreview,
    "animation-components": AnimationPreview,
    "3d-components": ThreeDPreview,
    // new categories
    "3d-spline-models": SplineModelPreview,
    "apis-integrations": ApiPreview,
    "security-antivirus": SecurityPreview,
    "printers-hardware": PrinterPreview,
};

export default function CategoryPreview({ slug, accent, hovered }: CategoryPreviewProps) {
    const Preview = PREVIEW_MAP[slug];
    if (!Preview) return null;

    return (
        <motion.div
            animate={{ scale: hovered ? 1.04 : 1, filter: hovered ? "brightness(0.6)" : "brightness(1)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        >
            <Preview accent={accent} />
        </motion.div>
    );
}
