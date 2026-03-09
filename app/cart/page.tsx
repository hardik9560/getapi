"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Tag, ShoppingCart, ArrowLeft, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getLicensePrice } from "@/lib/utils";
import type { LicenseType } from "@/types";
import { useState } from "react";
import { COLORS as C } from "@/lib/constants";

export default function CartPage() {
    const { items, removeItem, updateLicense, clearCart, getTotal, getDiscount, getFinalTotal, appliedCoupon, couponError, applyCoupon, removeCoupon } = useCartStore();
    const [couponCode, setCouponCode] = useState("");

    const subtotal = getTotal();
    const discount = getDiscount();
    const total = getFinalTotal();

    const handleApplyCoupon = () => {
        applyCoupon(couponCode);
    };

    if (items.length === 0) {
        return (
            <div style={{ background: C.dark, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", maxWidth: 400 }}>
                    <div style={{ width: 100, height: 100, margin: "0 auto 32px", borderRadius: 32, background: "rgba(238, 238, 238, 0.02)", border: "1px solid rgba(238, 238, 238, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ShoppingBag size={48} color="rgba(238, 238, 238, 0.2)" />
                    </div>
                    <h1 style={{ fontSize: 24, fontWeight: 900, color: C.light, marginBottom: 12 }}>Your cart is empty</h1>
                    <p style={{ color: "rgba(238, 238, 238, 0.4)", marginBottom: 32, lineHeight: 1.6 }}>It looks like you haven't added any premium assets to your cart yet. Time to go shopping!</p>
                    <Link href="/components" className="btn-primary" style={{ padding: "16px 32px", borderRadius: 16 }}>
                        Explore marketplace <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ background: C.dark, minHeight: "100vh", padding: "120px 24px 100px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: 32, fontWeight: 900, color: C.light, marginBottom: 40, display: "flex", alignItems: "center", gap: 16 }}>
                    <ShoppingCart size={32} color={C.teal} /> Order Summary <span style={{ fontSize: 16, fontWeight: 500, color: "rgba(238, 238, 238, 0.3)" }}>({items.length} items)</span>
                </motion.h1>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32 }} className="lg:grid-cols-[1fr,400px] grid-cols-1">
                    {/* Cart Items */}
                    <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {items.map((item, i) => (
                                <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                    style={{ display: "flex", gap: 24, padding: "24px", borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: "1px solid rgba(238, 238, 238, 0.06)", alignItems: "center" }}>
                                    <div style={{ width: 80, height: 80, borderRadius: 16, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: "1px solid rgba(238, 238, 238, 0.04)" }}>
                                        {item.component.category.icon}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <Link href={`/components/${item.component.slug}`} style={{ fontSize: 18, fontWeight: 800, color: C.light, textDecoration: "none", display: "block", marginBottom: 4 }}>
                                            {item.component.name}
                                        </Link>
                                        <p style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.3)", marginBottom: 16 }}>Asset by {item.component.creator.name}</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <select value={item.licenseType} onChange={e => updateLicense(item.componentId, e.target.value as LicenseType)}
                                                style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(238, 238, 238, 0.03)", border: "1px solid rgba(238, 238, 238, 0.1)", color: C.light, fontSize: 12, fontWeight: 700, outline: "none", cursor: "pointer" }}>
                                                <option value="PERSONAL">Personal License — {formatPrice(item.component.price)}</option>
                                                <option value="TEAM">Team License — {formatPrice(item.component.teamPrice)}</option>
                                                <option value="ENTERPRISE">Enterprise License — {formatPrice(item.component.enterprisePrice)}</option>
                                            </select>
                                            <button onClick={() => removeItem(item.componentId)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)")}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)")}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <p style={{ fontSize: 20, fontWeight: 900, color: C.light }}>{formatPrice(getLicensePrice(item.component, item.licenseType))}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, padding: "0 8px" }}>
                            <Link href="/components" style={{ display: "flex", alignItems: "center", gap: 8, color: C.teal, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                                <ArrowLeft size={16} /> Continue Shopping
                            </Link>
                            <button onClick={clearCart} style={{ background: "none", border: "none", color: "rgba(238, 238, 238, 0.3)", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Empty entire cart</button>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div style={{ position: "sticky", top: 100 }}>
                        <div style={{ padding: "32px", borderRadius: 32, background: "rgba(238, 238, 238, 0.02)", border: "1px solid rgba(238, 238, 238, 0.06)", backdropFilter: "blur(20px)" }}>
                            <h2 style={{ fontSize: 18, fontWeight: 900, color: C.light, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.1em" }}>Checkout Summary</h2>

                            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                                    <span style={{ color: "rgba(238, 238, 238, 0.4)" }}>Subtotal</span>
                                    <span style={{ fontWeight: 800, color: C.light }}>{formatPrice(subtotal)}</span>
                                </div>
                                {appliedCoupon && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ display: "flex", justifyContent: "space-between", fontSize: 15, color: "#10b981" }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            Discount ({appliedCoupon.discountAmount ? `${formatPrice(appliedCoupon.discountAmount)} off` : `${appliedCoupon.discountPercent}%`})
                                            {appliedCoupon.discountPercent === 100 && <span style={{ fontSize: 11, background: "rgba(16, 185, 129, 0.15)", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>FREE</span>}
                                        </span>
                                        <span style={{ fontWeight: 800 }}>-{formatPrice(discount)}</span>
                                    </motion.div>
                                )}
                                <div style={{ paddingTop: 24, borderTop: "1px solid rgba(238, 238, 238, 0.05)", display: "flex", justifyContent: "space-between", fontSize: 22 }}>
                                    <span style={{ fontWeight: 900, color: C.light }}>Total Due</span>
                                    <span style={{ fontWeight: 900, color: total === 0 ? "#10b981" : C.teal }}>{total === 0 ? "FREE" : formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Coupon Code */}
                            <div style={{ marginBottom: 32 }}>
                                {!appliedCoupon ? (
                                    <>
                                        <div style={{ display: "flex", gap: 10 }}>
                                            <div style={{ position: "relative", flex: 1 }}>
                                                <Tag size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(238, 238, 238, 0.3)" }} />
                                                <input value={couponCode} onChange={e => setCouponCode(e.target.value)}
                                                    onKeyDown={e => e.key === "Enter" && handleApplyCoupon()}
                                                    placeholder="Promo code"
                                                    style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: 14, background: "rgba(238, 238, 238, 0.03)", border: "1px solid rgba(238, 238, 238, 0.1)", color: C.light, fontSize: 14, outline: "none" }} />
                                            </div>
                                            <button onClick={handleApplyCoupon} style={{ padding: "0 20px", borderRadius: 14, background: "rgba(238, 238, 238, 0.05)", border: "1px solid rgba(238, 238, 238, 0.1)", color: C.light, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                                                Apply
                                            </button>
                                        </div>
                                        {couponError && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 8, fontWeight: 600 }}>{couponError}</p>}
                                    </>
                                ) : (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: 14, background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <Tag size={16} color="#10b981" />
                                            <div>
                                                <p style={{ fontSize: 13, fontWeight: 800, color: "#10b981" }}>{appliedCoupon.code}</p>
                                                <p style={{ fontSize: 11, color: "rgba(16, 185, 129, 0.7)", fontWeight: 600 }}>{appliedCoupon.discountAmount ? `${formatPrice(appliedCoupon.discountAmount)} off` : `${appliedCoupon.discountPercent}% off`} applied {appliedCoupon.discountPercent === 100 && "🎉"}</p>
                                            </div>
                                        </div>
                                        <button onClick={removeCoupon} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(16, 185, 129, 0.1)", border: "none", color: "#10b981", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <X size={14} />
                                        </button>
                                    </motion.div>
                                )}
                            </div>

                            <Link href="/checkout" className="btn-primary" style={{ display: "flex", width: "100%", padding: "18px", borderRadius: 16, justifyContent: "center", fontSize: 16, marginBottom: 16 }}>
                                {total === 0 ? "Complete Order" : "Secure Checkout"} <ArrowRight size={18} />
                            </Link>

                            <p style={{ fontSize: 12, color: "rgba(238, 238, 238, 0.3)", textAlign: "center", lineHeight: 1.5 }}>
                                By proceeding, you agree to our Terms of Service. Purchases include lifetime updates and support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

