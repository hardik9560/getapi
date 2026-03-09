"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Download, ShoppingCart, Eye, Heart, Zap, Play, Check } from "lucide-react";
import { ComponentItem } from "@/types";
import { formatPrice, formatNumber } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { COLORS as C } from "@/lib/constants";
import { useState } from "react";
import CategoryPreview from "./CategoryPreview";

interface ComponentCardProps { component: ComponentItem; index?: number; }

const ACCENTS = [
    { bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.18)", accent: "#c084fc", glow: "rgba(192,132,252,0.3)" },
    { bg: "rgba(255,107,157,0.08)", border: "rgba(255,107,157,0.18)", accent: "#ff6b9d", glow: "rgba(255,107,157,0.3)" },
    { bg: "rgba(103,232,249,0.07)", border: "rgba(103,232,249,0.15)", accent: "#67e8f9", glow: "rgba(103,232,249,0.25)" },
    { bg: "rgba(110,231,183,0.07)", border: "rgba(110,231,183,0.15)", accent: "#6ee7b7", glow: "rgba(110,231,183,0.25)" },
    { bg: "rgba(253,230,138,0.07)", border: "rgba(253,230,138,0.15)", accent: "#fde68a", glow: "rgba(253,230,138,0.25)" },
    { bg: "rgba(255,179,71,0.07)", border: "rgba(255,179,71,0.15)", accent: "#ffb347", glow: "rgba(255,179,71,0.25)" },
];

export default function ComponentCard({ component, index = 0 }: ComponentCardProps) {
    const addItem = useCartStore(s => s.addItem);
    const isInCart = useCartStore(s => s.isInCart(component.id));
    const isWished = useWishlistStore(s => s.isInWishlist(component.id));
    const addWish = useWishlistStore(s => s.addItem);
    const removeWish = useWishlistStore(s => s.removeItem);
    const [hovered, setHovered] = useState(false);

    const A = ACCENTS[index % ACCENTS.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            whileHover={{ y: -10, scale: 1.015 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{
                borderRadius: 24,
                background: A.bg,
                backdropFilter: "blur(16px)",
                border: `1px solid ${A.border}`,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 64px rgba(0,0,0,0.5), 0 0 40px ${A.glow}`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
        >
            {/* Rainbow accent top border */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${A.accent}, transparent)`, zIndex: 4 }} />

            {/* Glossy top shine */}
            <div style={{ position: "absolute", top: 2, left: 0, right: 0, height: "35%", background: "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, transparent 100%)", pointerEvents: "none", zIndex: 1 }} />

            {/* ── THUMBNAIL: custom animated preview ── */}
            <div style={{ position: "relative", aspectRatio: "16/10", background: "rgba(0,0,0,0.25)", overflow: "hidden" }}>

                {/* Subtle ambient mesh behind */}
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${A.accent}0a 0%, transparent 70%), radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.4) 0%, transparent 60%)` }} />

                {/* The animated preview component */}
                <CategoryPreview slug={component.category.slug} accent={A.accent} hovered={hovered} />

                {/* ── Hover CTA layer ── */}
                <motion.div
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, zIndex: 10, pointerEvents: hovered ? "auto" : "none" }}
                >
                    <Link href={`/components/${component.slug}`}
                        style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 12, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.22)", color: "#f0f0ff", fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                    >
                        <Eye size={14} /> View
                    </Link>
                    <Link href={`/components/${component.slug}?tab=demo`}
                        style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 12, background: A.accent, color: "#0a0a0f", fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 20px ${A.glow}` }}
                    >
                        <Play size={14} fill="currentColor" /> Live Demo
                    </Link>
                </motion.div>

                {/* Featured badge */}
                {component.featured && (
                    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 6 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", background: A.accent, color: "#0a0a0f", boxShadow: `0 2px 12px ${A.glow}` }}>
                            <Zap size={9} fill="currentColor" /> Featured
                        </span>
                    </div>
                )}

                {/* Wishlist */}
                <button
                    onClick={e => { e.preventDefault(); isWished ? removeWish(component.id) : addWish(component); }}
                    style={{ position: "absolute", top: 10, right: 10, zIndex: 6, width: 34, height: 34, borderRadius: 10, background: isWished ? "rgba(255,107,157,0.25)" : "rgba(0,0,0,0.4)", border: `1px solid ${isWished ? "rgba(255,107,157,0.5)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", color: isWished ? "#ff6b9d" : "rgba(240,240,255,0.6)", backdropFilter: "blur(8px)" }}
                >
                    <Heart size={15} fill={isWished ? "currentColor" : "none"} />
                </button>

                {/* Category chip — bottom left, hides on hover */}
                <motion.div
                    animate={{ opacity: hovered ? 0 : 1 }}
                    transition={{ duration: 0.18 }}
                    style={{ position: "absolute", bottom: 10, left: 10, zIndex: 5, display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: `1px solid rgba(255,255,255,0.08)` }}
                >
                    <span style={{ fontSize: 12 }}>{component.category.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(240,240,255,0.7)", whiteSpace: "nowrap" }}>{component.category.name}</span>
                </motion.div>
            </div>

            {/* ── Card body ── */}
            <div style={{ padding: "16px 18px 18px" }}>
                <Link href={`/components/${component.slug}`} style={{ textDecoration: "none" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: C.light, lineHeight: 1.3, marginBottom: 5 }}>{component.name}</h3>
                </Link>
                <p style={{ fontSize: 12.5, color: "rgba(240,240,255,0.42)", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 12 }}>
                    {component.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: 5, marginBottom: 12, flexWrap: "wrap" }}>
                    {component.tags.slice(0, 3).map(t => (
                        <span key={t.id} style={{ fontSize: 9, fontWeight: 700, color: A.accent, background: `${A.accent}12`, padding: "2px 8px", borderRadius: 99, border: `1px solid ${A.accent}22`, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            {t.name}
                        </span>
                    ))}
                </div>

                {/* Creator & Price */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <img src={component.creator.image} alt={component.creator.name} style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${A.border}` }} />
                        <span style={{ fontSize: 11, color: "rgba(240,240,255,0.35)", fontWeight: 500 }}>{component.creator.name}</span>
                    </div>
                    <span style={{ fontSize: 19, fontWeight: 900, color: C.light }}>{formatPrice(component.price)}</span>
                </div>

                {/* Stats + Add to Cart */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${A.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11 }}>
                            <Star size={11} color="#fde68a" fill="#fde68a" style={{ filter: "drop-shadow(0 0 3px #fde68a80)" }} />
                            <span style={{ fontWeight: 700, color: C.light }}>{component.averageRating}</span>
                            <span style={{ color: "rgba(240,240,255,0.3)", fontSize: 10 }}>({component.reviewCount})</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "rgba(240,240,255,0.35)" }}>
                            <Download size={11} /> {formatNumber(component.downloadCount)}
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                        onClick={e => { e.preventDefault(); !isInCart && addItem(component, "PERSONAL"); }}
                        style={{ padding: "7px 16px", borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "none", background: isInCart ? "rgba(110,231,183,0.12)" : A.accent, color: isInCart ? "#6ee7b7" : "#0a0a0f", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 5, boxShadow: isInCart ? "none" : `0 3px 14px ${A.glow}` }}
                    >
                        {isInCart ? <><Check size={12} /> In Cart</> : <><ShoppingCart size={12} /> Add</>}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
