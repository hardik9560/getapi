"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, Menu, X, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { NAV_LINKS, SITE_NAME, COLORS as C } from "@/lib/constants";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const cartCount = useCartStore(s => s.items.length);
    const wishlistCount = useWishlistStore(s => s.items.length);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") { setSearchOpen(false); setMobileOpen(false); } };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, []);

    return (
        <>
            <header style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 72,
                display: "flex", alignItems: "center",
                background: scrolled
                    ? "rgba(10, 10, 15, 0.75)"
                    : "transparent",
                backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
                boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(192,132,252,0.1)" : "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #c084fc, #ff6b9d)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(192,132,252,0.5), 0 0 0 1px rgba(255,255,255,0.15) inset" }}
                        >
                            <Sparkles size={18} color="#fff" />
                        </motion.div>
                        <span style={{ fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #c084fc, #ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                            {SITE_NAME}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden lg:flex">
                        {NAV_LINKS.map(l => (
                            <Link key={l.href} href={l.href}
                                style={{ padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "rgba(240,240,255,0.55)", textDecoration: "none", transition: "all 0.2s" }}
                                onMouseEnter={e => { const el = e.target as HTMLElement; el.style.color = "#c084fc"; el.style.background = "rgba(192,132,252,0.08)"; }}
                                onMouseLeave={e => { const el = e.target as HTMLElement; el.style.color = "rgba(240,240,255,0.55)"; el.style.background = "transparent"; }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                            style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,240,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.2s" }}
                            onClick={() => setSearchOpen(true)}
                            onMouseEnter={e => { e.currentTarget.style.color = "#c084fc"; e.currentTarget.style.borderColor = "rgba(192,132,252,0.4)"; e.currentTarget.style.background = "rgba(192,132,252,0.08)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(240,240,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                        >
                            <Search size={17} />
                        </motion.button>

                        <Link href="/dashboard/wishlist" style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,240,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", position: "relative", transition: "all 0.2s" }}>
                            <Heart size={17} color={wishlistCount > 0 ? "#ff6b9d" : "currentColor"} fill={wishlistCount > 0 ? "#ff6b9d" : "none"} />
                            {wishlistCount > 0 && (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg, #ff6b9d, #ffb347)", color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(255,107,157,0.5)" }}>
                                    {wishlistCount}
                                </motion.span>
                            )}
                        </Link>

                        <Link href="/cart" style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(240,240,255,0.5)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", position: "relative", transition: "all 0.2s" }}>
                            <ShoppingCart size={17} />
                            {cartCount > 0 && (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg, #c084fc, #ff6b9d)", color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(192,132,252,0.5)" }}>
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        <Link href="/login"
                            className="hidden sm:inline-flex btn-primary"
                            style={{ padding: "10px 22px", fontSize: 14, marginLeft: 8, borderRadius: 12 }}
                        >
                            Sign In
                        </Link>

                        <button className="lg:hidden" style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", color: C.light }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.97 }}
                            style={{ position: "absolute", top: 80, left: 16, right: 16, background: "rgba(19, 19, 31, 0.95)", backdropFilter: "blur(32px)", borderRadius: 24, border: "1px solid rgba(192,132,252,0.15)", padding: "12px", boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 60px rgba(192,132,252,0.08)" }}
                        >
                            {NAV_LINKS.map((l, i) => (
                                <motion.div key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link href={l.href} onClick={() => setMobileOpen(false)}
                                        style={{ display: "block", padding: "14px 20px", fontSize: 16, fontWeight: 600, color: "rgba(240,240,255,0.8)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", borderRadius: 12 }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c084fc"; (e.currentTarget as HTMLElement).style.background = "rgba(192,132,252,0.06)"; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(240,240,255,0.8)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                    >
                                        {l.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12, borderRadius: 16 }}>
                                Sign In
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSearchOpen(false)}
                        style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(16px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "15vh", padding: "16px" }}
                    >
                        <motion.div initial={{ y: -20, scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: -20, scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}
                            style={{ width: "100%", maxWidth: 640, background: "rgba(19,19,31,0.98)", borderRadius: 28, border: "1px solid rgba(192,132,252,0.2)", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(192,132,252,0.1)" }}
                        >
                            <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, #c084fc, transparent)" }} />
                            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                <Search size={22} color="#c084fc" />
                                <input autoFocus placeholder="Search components, APIs..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 18, color: "#f0f0ff", fontFamily: "inherit" }} />
                                <button onClick={() => setSearchOpen(false)} style={{ color: "rgba(240,240,255,0.4)", background: "transparent", border: "none", cursor: "pointer", padding: 4 }}><X size={20} /></button>
                            </div>
                            <div style={{ padding: "24px" }}>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "#c084fc", textTransform: "uppercase", marginBottom: 16, letterSpacing: "0.1em" }}>Quick Searches</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                    {["Authentication", "Payments", "Dashboard", "Hero Sections", "Machine Learning", "Maps"].map(t => (
                                        <Link key={t} href={`/apis?q=${t}`} onClick={() => setSearchOpen(false)}
                                            style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(192,132,252,0.06)", border: "1px solid rgba(192,132,252,0.15)", fontSize: 14, color: "rgba(240,240,255,0.65)", textDecoration: "none", transition: "all 0.2s" }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(192,132,252,0.12)"; (e.currentTarget as HTMLElement).style.color = "#c084fc"; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(192,132,252,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(240,240,255,0.65)"; }}
                                        >{t}</Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
