"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, MessageCircle, Heart, Sparkles } from "lucide-react";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

const LINKS = {
    Product: [{ label: "Browse", href: "/components" }, { label: "Pricing", href: "/pricing" }, { label: "New Releases", href: "/components?sort=newest" }, { label: "Best Sellers", href: "/components?sort=popular" }],
    Resources: [{ label: "Docs", href: "/docs" }, { label: "Blog", href: "/blog" }, { label: "Changelog", href: "/blog" }, { label: "API Docs", href: "/docs" }],
    Company: [{ label: "About", href: "/about" }, { label: "Careers", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Press Kit", href: "/about" }],
    Legal: [{ label: "Terms", href: "/terms" }, { label: "Privacy", href: "/privacy" }, { label: "License", href: "/terms" }, { label: "Cookies", href: "/privacy" }],
};

const SOCIALS = [
    { icon: Github, href: SOCIAL_LINKS.github || "#", color: "#c084fc" },
    { icon: Twitter, href: SOCIAL_LINKS.twitter || "#", color: "#67e8f9" },
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin || "#", color: "#ff6b9d" },
    { icon: MessageCircle, href: SOCIAL_LINKS.discord || "#", color: "#6ee7b7" },
];

export default function Footer() {
    return (
        <footer style={{ background: "#07070d", borderTop: "1px solid rgba(192,132,252,0.1)", position: "relative" }}>
            {/* Top rainbow line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 0%, #c084fc 25%, #ff6b9d 50%, #67e8f9 75%, transparent 100%)" }} />

            {/* Background glow */}
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(192,132,252,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 0", position: "relative" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 48 }}>
                    {/* Brand */}
                    <div style={{ gridColumn: "span 2", minWidth: 220 }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #c084fc, #ff6b9d)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(192,132,252,0.4)" }}>
                                <Sparkles size={18} color="#fff" />
                            </div>
                            <span style={{ fontSize: 18, fontWeight: 800, background: "linear-gradient(135deg, #c084fc, #ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                {SITE_NAME}
                            </span>
                        </Link>
                        <p style={{ fontSize: 13, color: "rgba(240,240,255,0.35)", lineHeight: 1.8, marginBottom: 24, maxWidth: 280 }}>
                            Premium UI components with live demos. Build beautiful products faster.
                        </p>

                        {/* Social icons */}
                        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                            {SOCIALS.map(({ icon: Icon, href, color }, i) => (
                                <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                    whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                    style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,240,255,0.4)", transition: "all 0.2s", textDecoration: "none" }}
                                    onMouseEnter={e => { const el = e.currentTarget; el.style.color = color; el.style.borderColor = `${color}40`; el.style.background = `${color}10`; el.style.boxShadow = `0 0 20px ${color}30`; }}
                                    onMouseLeave={e => { const el = e.currentTarget; el.style.color = "rgba(240,240,255,0.4)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.background = "rgba(255,255,255,0.04)"; el.style.boxShadow = "none"; }}
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Status badge */}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(240,240,255,0.3)", padding: "6px 14px", borderRadius: 999, background: "rgba(110,231,183,0.06)", border: "1px solid rgba(110,231,183,0.15)" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", boxShadow: "0 0 8px #6ee7b7", display: "inline-block" }} />
                            All systems operational
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([title, links], i) => (
                        <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,240,255,0.25)", marginBottom: 18 }}>
                                {title}
                            </h3>
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                                {links.map(l => (
                                    <li key={l.label}>
                                        <Link href={l.href}
                                            style={{ fontSize: 14, textDecoration: "none", color: "rgba(240,240,255,0.45)", transition: "all 0.2s", fontWeight: 500 }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c084fc"; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,240,255,0.45)"; }}
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{ marginTop: 56, paddingTop: 24, paddingBottom: 24, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <p style={{ fontSize: 13, color: "rgba(240,240,255,0.25)" }}>
                        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontSize: 13, color: "rgba(240,240,255,0.25)", display: "flex", alignItems: "center", gap: 4 }}>
                            Made with <Heart size={11} color="#ff6b9d" fill="#ff6b9d" style={{ filter: "drop-shadow(0 0 4px #ff6b9d)" }} /> for developers
                        </span>
                        <div style={{ display: "flex", gap: 6 }}>
                            {["Visa", "MC", "Amex"].map(c => (
                                <span key={c} style={{ padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: "rgba(240,240,255,0.3)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>{c}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
