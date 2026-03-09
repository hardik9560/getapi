"use client";
import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Check, CreditCard, Lock, ArrowLeft, Download, Package, User, ShoppingBag, ShieldCheck, ArrowRight, Tag, Gift, Sparkles, Star, Zap, Copy, CheckCircle, FileCode, Eye, EyeOff, Loader2, AlertCircle, Phone, Mail, UserCircle, IndianRupee, Wallet } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getLicensePrice } from "@/lib/utils";
import { COLORS as C } from "@/lib/constants";
import { getDeliverable } from "@/lib/deliverables";
import type { CartItem } from "@/types";

const steps = ["Account", "Review", "Payment", "Done"];
const STEP_ICONS = [User, ShoppingBag, CreditCard, Sparkles];

// Cashfree JS SDK v3 type declaration
declare global {
    interface Window {
        Cashfree?: (config: { mode: string }) => {
            checkout: (config: { paymentSessionId: string; redirectTarget?: string; returnUrl?: string }) => Promise<{ error?: { message: string }; redirect?: boolean; paymentDetails?: Record<string, unknown> }>;
        };
    }
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div style={{ background: C.dark, minHeight: "100vh", color: C.light, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Loader2 size={48} color="#c084fc" />
                </motion.div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [cashfreeLoaded, setCashfreeLoaded] = useState(false);
    const [verifyingPayment, setVerifyingPayment] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const purchasedRef = useRef<CartItem[]>([]);
    const { items, getTotal, getDiscount, getFinalTotal, appliedCoupon, clearCart } = useCartStore();
    const subtotal = getTotal();
    const discount = getDiscount();
    const total = getFinalTotal();
    const isFree = total === 0;

    // Check for return from Cashfree payment
    const verifyPayment = useCallback(async (orderId: string) => {
        setVerifyingPayment(true);
        try {
            const res = await fetch("/api/cashfree/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });
            const data = await res.json();
            if (data.isPaid) {
                purchasedRef.current = [...items];
                clearCart();
                setCurrentStep(3);
            } else {
                setPaymentError(`Payment ${data.orderStatus === "ACTIVE" ? "was not completed" : "failed"}. Please try again.`);
                setCurrentStep(2);
            }
        } catch {
            setPaymentError("Could not verify payment. Please contact support.");
            setCurrentStep(2);
        } finally {
            setVerifyingPayment(false);
        }
    }, [items, clearCart]);

    useEffect(() => {
        const orderId = searchParams.get("order_id");
        const cfStatus = searchParams.get("cf_status");
        if (orderId && cfStatus) {
            verifyPayment(orderId);
        }
    }, [searchParams, verifyPayment]);

    const nextStep = () => setCurrentStep(s => Math.min(s + 1, 3));
    const prevStep = () => setCurrentStep(s => Math.max(s - 1, 0));

    const handleFreeCheckout = () => {
        purchasedRef.current = [...items];
        clearCart();
        setCurrentStep(3);
    };

    const copyCode = (id: string, code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // ── Cashfree Payment ──
    const handleCashfreePayment = async () => {
        setIsProcessing(true);
        setPaymentError("");

        try {
            // Convert USD to INR (approximate rate), minimum ₹1 (Cashfree minimum)
            const inrAmount = Math.max(1, Math.round(total * 85 * 100) / 100);

            // Prepare order items
            const orderItems = items.map(item => ({
                name: item.component.name,
                licenseType: item.licenseType,
                price: getLicensePrice(item.component, item.licenseType),
                componentId: item.componentId,
            }));

            // Create order via our API
            const res = await fetch("/api/cashfree/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: inrAmount,
                    customerEmail: email || "customer@getapi.dev",
                    customerPhone: phone || "9999999999",
                    customerName: customerName || "Customer",
                    items: orderItems,
                }),
            });

            const data = await res.json();

            if (!data.success || !data.paymentSessionId) {
                const errDetail = data.details?.message || data.error || "Failed to create order";
                throw new Error(errDetail);
            }

            // Initialize Cashfree checkout using JS SDK v3
            if (window.Cashfree) {
                const cashfree = window.Cashfree({
                    mode: "production",
                });

                // Use _modal mode for localhost (avoids HTTPS redirect issue)
                // Use _self redirect for production HTTPS
                const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

                const result = await cashfree.checkout({
                    paymentSessionId: data.paymentSessionId,
                    redirectTarget: isLocalhost ? "_modal" : "_self",
                });

                // Handle modal/popup result (for localhost testing)
                if (result) {
                    if (result.error) {
                        setPaymentError(result.error.message || "Payment was cancelled or failed.");
                        setIsProcessing(false);
                    } else if (result.paymentDetails) {
                        // Payment completed in modal
                        setPaymentCompleted(true);
                        purchasedRef.current = [...items];
                        clearCart();
                        setCurrentStep(3);
                        setIsProcessing(false);
                    } else if (result.redirect) {
                        // Redirect mode — user will be redirected
                        // Nothing to do here, page will reload
                    }
                }
            } else {
                throw new Error("Payment system not loaded. Please refresh and try again.");
            }
        } catch (err) {
            setPaymentError(err instanceof Error ? err.message : "Payment failed. Please try again.");
            setIsProcessing(false);
        }
    };

    // Verifying payment state
    if (verifyingPayment) {
        return (
            <div style={{ background: C.dark, minHeight: "100vh", color: C.light, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Loader2 size={48} color="#c084fc" />
                </motion.div>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, background: "linear-gradient(135deg,#c084fc,#ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Verifying Payment</h2>
                    <p style={{ color: "rgba(240,240,255,0.4)", fontSize: 14 }}>Please wait while we confirm your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Load Cashfree JS SDK */}
            <Script
                src="https://sdk.cashfree.com/js/v3/cashfree.js"
                onLoad={() => { console.log("✅ Cashfree SDK loaded"); setCashfreeLoaded(true); }}
                onError={() => console.error("❌ Failed to load Cashfree SDK")}
                strategy="afterInteractive"
            />

            <div style={{ background: C.dark, minHeight: "100vh", color: C.light, padding: "100px 24px 100px", position: "relative", overflow: "hidden" }}>
                {/* Aurora background */}
                <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(192,132,252,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 300, background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(103,232,249,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

                {/* ── Stepper ── */}
                <div style={{ maxWidth: 680, margin: "0 auto 60px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
                        {/* connector bar */}
                        <div style={{ position: "absolute", top: 22, left: "10%", right: "10%", height: 2, background: "rgba(255,255,255,0.05)", zIndex: 0 }}>
                            <motion.div animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{ height: "100%", background: "linear-gradient(90deg, #c084fc, #ff6b9d, #67e8f9)", borderRadius: 999 }} />
                        </div>

                        {steps.map((step, i) => {
                            const Icon = STEP_ICONS[i];
                            const done = i < currentStep;
                            const active = i === currentStep;
                            return (
                                <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
                                    <motion.div
                                        animate={active ? { boxShadow: ["0 0 0px #c084fc40", "0 0 24px #c084fc80", "0 0 0px #c084fc40"] } : {}}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                                            background: done ? "linear-gradient(135deg,#6ee7b7,#67e8f9)" : active ? "linear-gradient(135deg,#c084fc,#ff6b9d)" : "rgba(255,255,255,0.04)",
                                            border: `1.5px solid ${done ? "#6ee7b780" : active ? "#c084fc60" : "rgba(255,255,255,0.08)"}`,
                                            color: (done || active) ? "#0a0a0f" : "rgba(240,240,255,0.3)",
                                            transition: "all 0.4s ease",
                                        }}>
                                        {done ? <Check size={20} strokeWidth={3} /> : <Icon size={18} />}
                                    </motion.div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: active ? "#c084fc" : done ? "#6ee7b7" : "rgba(240,240,255,0.25)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        {step}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Step Content ── */}
                <AnimatePresence mode="wait">
                    <motion.div key={currentStep} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.35 }}>

                        {/* STEP 0 — Account */}
                        {currentStep === 0 && (
                            <div style={{ maxWidth: 440, margin: "0 auto" }}>
                                <div style={{ padding: "40px", borderRadius: 32, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(192,132,252,0.15)", backdropFilter: "blur(24px)", boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 60px rgba(192,132,252,0.06)", position: "relative" }}>
                                    {/* Rainbow top line */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #c084fc, #ff6b9d)", borderRadius: "32px 32px 0 0" }} />
                                    <div style={{ textAlign: "center", marginBottom: 28 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg,#c084fc,#ff6b9d)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 32px rgba(192,132,252,0.4)" }}>
                                            <User size={26} color="#fff" />
                                        </div>
                                        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, background: "linear-gradient(135deg,#c084fc,#ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Almost There!</h2>
                                        <p style={{ color: "rgba(240,240,255,0.4)", fontSize: 14 }}>Enter your details to complete your purchase via Cashfree.</p>
                                    </div>

                                    {/* Customer details form */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                                        <div style={{ position: "relative" }}>
                                            <UserCircle size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(240,240,255,0.3)" }} />
                                            <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Full Name"
                                                style={{ width: "100%", padding: "13px 18px 13px 42px", borderRadius: 13, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: C.light, fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                                        </div>
                                        <div style={{ position: "relative" }}>
                                            <Mail size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(240,240,255,0.3)" }} />
                                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email"
                                                style={{ width: "100%", padding: "13px 18px 13px 42px", borderRadius: 13, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: C.light, fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                                        </div>
                                        <div style={{ position: "relative" }}>
                                            <Phone size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(240,240,255,0.3)" }} />
                                            <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Phone Number (10 digits)" type="tel"
                                                style={{ width: "100%", padding: "13px 18px 13px 42px", borderRadius: 13, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: C.light, fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                                        </div>

                                        {/* Phone validation hint */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 10, background: "rgba(103,232,249,0.06)", border: "1px solid rgba(103,232,249,0.15)" }}>
                                            <ShieldCheck size={14} color="#67e8f9" />
                                            <span style={{ fontSize: 11, color: "rgba(240,240,255,0.5)", fontWeight: 600 }}>
                                                Phone number is required by Cashfree for payment verification
                                            </span>
                                        </div>
                                    </div>

                                    <button onClick={nextStep} className="btn-primary" disabled={!phone || phone.length < 10}
                                        style={{
                                            width: "100%", padding: "15px", borderRadius: 14, justifyContent: "center", fontSize: 15,
                                            opacity: (!phone || phone.length < 10) ? 0.5 : 1,
                                            cursor: (!phone || phone.length < 10) ? "not-allowed" : "pointer",
                                        }}>
                                        Continue <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 1 — Review */}
                        {currentStep === 1 && (
                            <div style={{ maxWidth: 660, margin: "0 auto" }}>
                                <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>Order Summary</h2>
                                <p style={{ color: "rgba(240,240,255,0.4)", marginBottom: 28, fontSize: 14 }}>Review your items before completing your one-time purchase.</p>

                                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                                    {items.map((item, idx) => {
                                        const accents = ["#c084fc", "#ff6b9d", "#67e8f9", "#6ee7b7", "#fde68a", "#ffb347"];
                                        const ac = accents[idx % accents.length];
                                        return (
                                            <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderRadius: 20, background: "rgba(255,255,255,0.03)", border: `1px solid ${ac}20`, backdropFilter: "blur(12px)" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                    <div style={{ width: 44, height: 44, borderRadius: 13, background: `${ac}15`, border: `1px solid ${ac}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                                                        {item.component.category.icon}
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: 800, color: C.light, fontSize: 15 }}>{item.component.name}</p>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                                                            <span style={{ fontSize: 10, fontWeight: 700, color: ac, background: `${ac}15`, padding: "2px 8px", borderRadius: 99, border: `1px solid ${ac}25` }}>
                                                                {item.licenseType} LICENSE
                                                            </span>
                                                            <span style={{ fontSize: 11, color: "rgba(240,240,255,0.3)" }}>One-time payment · Lifetime access</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p style={{ fontWeight: 900, fontSize: 18, color: C.light }}>{formatPrice(getLicensePrice(item.component, item.licenseType))}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Lifetime access badge */}
                                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 14, background: "rgba(192,132,252,0.06)", border: "1px solid rgba(192,132,252,0.2)", marginBottom: 20 }}>
                                    <Zap size={16} color="#c084fc" />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(240,240,255,0.7)" }}>
                                        <span style={{ color: "#c084fc" }}>One-time payment</span> — no subscription, no recurring fees. Lifetime access + all future updates included.
                                    </span>
                                </div>

                                {/* Payment method badge */}
                                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderRadius: 14, background: "rgba(110,231,183,0.06)", border: "1px solid rgba(110,231,183,0.2)", marginBottom: 20 }}>
                                    <Wallet size={16} color="#6ee7b7" />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(240,240,255,0.7)" }}>
                                        <span style={{ color: "#6ee7b7" }}>Cashfree Payments</span> — UPI, Cards, Net Banking, Wallets & more. 100% Secure.
                                    </span>
                                </div>

                                {/* Totals */}
                                <div style={{ padding: "24px 28px", borderRadius: 24, background: "rgba(255,255,255,0.025)", border: `1px solid ${appliedCoupon ? "rgba(110,231,183,0.3)" : "rgba(192,132,252,0.15)"}`, marginBottom: 28 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: appliedCoupon ? 12 : 0 }}>
                                        <span style={{ fontSize: 14, color: "rgba(240,240,255,0.45)" }}>Subtotal</span>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: C.light }}>{formatPrice(subtotal)}</span>
                                    </div>
                                    {appliedCoupon && (
                                        <>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                                                <span style={{ fontSize: 13, color: "#6ee7b7", display: "flex", alignItems: "center", gap: 6 }}>
                                                    <Tag size={13} /> {appliedCoupon.code} ({appliedCoupon.discountPercent}% off)
                                                    {appliedCoupon.discountPercent === 100 && <span style={{ fontSize: 10, background: "rgba(110,231,183,0.15)", border: "1px solid #6ee7b740", padding: "1px 7px", borderRadius: 5, fontWeight: 800 }}>FREE</span>}
                                                </span>
                                                <span style={{ fontSize: 14, fontWeight: 800, color: "#6ee7b7" }}>-{formatPrice(discount)}</span>
                                            </div>
                                            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 14 }} />
                                        </>
                                    )}
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <span style={{ fontSize: 18, fontWeight: 900 }}>Total Due</span>
                                            <div style={{ fontSize: 11, color: "rgba(240,240,255,0.3)", marginTop: 2 }}>One-time · No hidden fees</div>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <span style={{ fontSize: 28, fontWeight: 900, background: isFree ? "linear-gradient(135deg,#6ee7b7,#67e8f9)" : "linear-gradient(135deg,#c084fc,#ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>
                                                {isFree ? "FREE 🎉" : formatPrice(total)}
                                            </span>
                                            {!isFree && (
                                                <span style={{ fontSize: 11, color: "rgba(240,240,255,0.3)", display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end" }}>
                                                    <IndianRupee size={10} /> ≈ ₹{Math.round(total * 85).toLocaleString("en-IN")} INR
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: 14 }}>
                                    <button onClick={prevStep} style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: C.light, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowLeft size={22} /></button>
                                    {isFree ? (
                                        <button onClick={handleFreeCheckout} className="btn-primary" style={{ flex: 1, padding: "15px", borderRadius: 14, justifyContent: "center", fontSize: 16, gap: 10 }}>
                                            <Gift size={20} /> Claim Free Access
                                        </button>
                                    ) : (
                                        <button onClick={nextStep} className="btn-primary" style={{ flex: 1, padding: "15px", borderRadius: 14, justifyContent: "center", fontSize: 16 }}>
                                            Proceed to Payment <ArrowRight size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 2 — Payment */}
                        {currentStep === 2 && (
                            <div style={{ maxWidth: 520, margin: "0 auto" }}>
                                <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6, textAlign: "center" }}>Secure Payment</h2>
                                <p style={{ color: "rgba(240,240,255,0.4)", marginBottom: 28, fontSize: 14, textAlign: "center" }}>
                                    One-time charge of <strong style={{ color: "#c084fc" }}>{formatPrice(total)}</strong> (≈ ₹{Math.round(total * 85).toLocaleString("en-IN")} INR). You will never be charged again.
                                </p>

                                {/* Cashfree Payment Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ padding: "32px", borderRadius: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(192,132,252,0.2)", backdropFilter: "blur(20px)", marginBottom: 24, position: "relative", overflow: "hidden" }}
                                >
                                    {/* Gradient top accent */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #c084fc, #ff6b9d, #67e8f9)", borderRadius: "28px 28px 0 0" }} />

                                    {/* Cashfree branding */}
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #5B45E0, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(91,69,224,0.4)" }}>
                                            <Wallet size={24} color="#fff" />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: 18, fontWeight: 900, color: "#f0f0ff" }}>Cashfree Payments</h3>
                                            <p style={{ fontSize: 11, color: "rgba(240,240,255,0.4)", fontWeight: 600 }}>India&apos;s Trusted Payment Gateway</p>
                                        </div>
                                    </div>

                                    {/* Payment methods grid */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
                                        {[
                                            { label: "UPI / GPay", icon: "📱", desc: "Instant" },
                                            { label: "Cards", icon: "💳", desc: "Visa/MC" },
                                            { label: "Net Banking", icon: "🏦", desc: "All Banks" },
                                            { label: "Wallets", icon: "👛", desc: "Paytm etc" },
                                            { label: "EMI", icon: "📅", desc: "0% EMI" },
                                            { label: "Pay Later", icon: "⏳", desc: "BNPL" },
                                        ].map(method => (
                                            <div key={method.label} style={{ padding: "14px 10px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center", transition: "all 0.2s" }}>
                                                <div style={{ fontSize: 22, marginBottom: 4 }}>{method.icon}</div>
                                                <div style={{ fontSize: 11, fontWeight: 800, color: "#f0f0ff" }}>{method.label}</div>
                                                <div style={{ fontSize: 9, color: "rgba(240,240,255,0.3)", fontWeight: 600 }}>{method.desc}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order summary */}
                                    <div style={{ padding: "16px 20px", borderRadius: 16, background: "rgba(192,132,252,0.06)", border: "1px solid rgba(192,132,252,0.15)", marginBottom: 20 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 14, color: "rgba(240,240,255,0.6)", fontWeight: 600 }}>You&apos;ll pay</span>
                                            <div style={{ textAlign: "right" }}>
                                                <span style={{ fontSize: 22, fontWeight: 900, background: "linear-gradient(135deg,#c084fc,#ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                                    ₹{Math.round(total * 85).toLocaleString("en-IN")}
                                                </span>
                                                <div style={{ fontSize: 10, color: "rgba(240,240,255,0.3)", fontWeight: 600 }}>({formatPrice(total)} USD)</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Error message */}
                                    {paymentError && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 14, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", marginBottom: 16 }}>
                                            <AlertCircle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: 1 }} />
                                            <div>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 2 }}>Payment Error</p>
                                                <p style={{ fontSize: 12, color: "rgba(239,68,68,0.8)" }}>{paymentError}</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Pay button */}
                                    <motion.button
                                        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                                        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                                        onClick={handleCashfreePayment}
                                        disabled={isProcessing || !cashfreeLoaded}
                                        style={{
                                            width: "100%", padding: "18px", borderRadius: 16,
                                            background: isProcessing ? "rgba(192,132,252,0.2)" : "linear-gradient(135deg, #5B45E0, #7C3AED)",
                                            border: "none", color: "#fff", fontSize: 16, fontWeight: 900,
                                            cursor: isProcessing ? "not-allowed" : "pointer",
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                            boxShadow: isProcessing ? "none" : "0 8px 32px rgba(91,69,224,0.4)",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                                    <Loader2 size={20} />
                                                </motion.div>
                                                Processing...
                                            </>
                                        ) : !cashfreeLoaded ? (
                                            <>
                                                <Loader2 size={20} />
                                                Loading Payment Gateway...
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={18} />
                                                Pay ₹{Math.round(total * 85).toLocaleString("en-IN")} Securely
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>

                                {/* Trust badges */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
                                    {[
                                        { icon: Lock, text: "256-bit SSL", color: "#6ee7b7" },
                                        { icon: ShieldCheck, text: "PCI DSS Compliant", color: "#67e8f9" },
                                        { icon: Star, text: "Money-back 30 days", color: "#fde68a" },
                                    ].map(({ icon: Icon, text, color }) => (
                                        <div key={text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(240,240,255,0.4)", fontWeight: 600 }}>
                                            <Icon size={12} color={color} /> {text}
                                        </div>
                                    ))}
                                </div>

                                {/* Cashfree trust badge */}
                                <div style={{ textAlign: "center", marginBottom: 20 }}>
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 99, background: "rgba(91,69,224,0.1)", border: "1px solid rgba(91,69,224,0.2)" }}>
                                        <ShieldCheck size={13} color="#7C3AED" />
                                        <span style={{ fontSize: 10, fontWeight: 800, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.05em" }}>Powered by Cashfree Payments</span>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: 14 }}>
                                    <button onClick={prevStep} style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: C.light, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowLeft size={22} /></button>
                                    <button onClick={nextStep} style={{ flex: 1, padding: "12px", borderRadius: 14, background: "none", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(240,240,255,0.3)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                                        Skip (Demo Mode) →
                                    </button>
                                </div>

                                <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "rgba(240,240,255,0.25)" }}>
                                    By completing purchase you agree to our <a href="/terms" style={{ color: "#c084fc", textDecoration: "none" }}>Terms of Service</a>. You will never be billed again.
                                </p>
                            </div>
                        )}

                        {/* STEP 3 — Done */}
                        {currentStep === 3 && (
                            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                                {/* Success ring */}
                                <div style={{ textAlign: "center" }}>
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        style={{ width: 90, height: 90, margin: "0 auto 24px", borderRadius: 30, background: "linear-gradient(135deg, rgba(110,231,183,0.15), rgba(103,232,249,0.1))", border: "2px solid rgba(110,231,183,0.4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 60px rgba(110,231,183,0.25)" }}>
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                                            <Check size={44} color="#6ee7b7" strokeWidth={3} />
                                        </motion.div>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, background: "linear-gradient(135deg,#6ee7b7,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Payment Successful! 🎉</h2>
                                        <p style={{ color: "rgba(240,240,255,0.45)", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                                            Lifetime access granted. Your component files are ready below — copy the code or download.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Receipt */}
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                    style={{ padding: "18px 22px", borderRadius: 18, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(110,231,183,0.2)", textAlign: "left", marginBottom: 28 }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Receipt</div>
                                    {[
                                        ["Payment Type", "One-time, lifetime access"],
                                        ["Payment Gateway", "Cashfree Payments"],
                                        ["Transaction ID", `TXN-${Math.random().toString(36).slice(2, 10).toUpperCase()}`],
                                        ["Date", new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })],
                                        ["Amount Paid", isFree ? "FREE" : formatPrice(total)],
                                    ].map(([label, val]) => (
                                        <div key={label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.04)", marginBottom: 8 }}>
                                            <span style={{ fontSize: 12, color: "rgba(240,240,255,0.35)" }}>{label}</span>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#f0f0ff", fontFamily: label === "Transaction ID" ? "monospace" : "inherit" }}>{val}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* ── DELIVERABLE FILES ── */}
                                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                        <FileCode size={18} color="#c084fc" />
                                        <span style={{ fontSize: 14, fontWeight: 800, color: "#f0f0ff" }}>Your Purchased Files ({purchasedRef.current.length})</span>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                                        {purchasedRef.current.map((item, idx) => {
                                            const d = getDeliverable(item.componentId);
                                            if (!d) return null;
                                            const isExpanded = expandedId === item.componentId;
                                            return (
                                                <motion.div key={item.componentId} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + idx * 0.08 }}
                                                    style={{ borderRadius: 18, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(192,132,252,0.15)", overflow: "hidden" }}>
                                                    {/* Header */}
                                                    <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#c084fc20,#ff6b9d15)", border: "1px solid #c084fc30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#c084fc" }}>
                                                            {d.language === "tsx" ? "TSX" : "TS"}
                                                        </div>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontSize: 13, fontWeight: 800, color: "#f0f0ff", marginBottom: 2 }}>{item.component.name}</div>
                                                            <div style={{ fontSize: 11, color: "rgba(240,240,255,0.3)", fontFamily: "monospace" }}>{d.fileName}</div>
                                                        </div>
                                                        <div style={{ display: "flex", gap: 6 }}>
                                                            <button onClick={() => setExpandedId(isExpanded ? null : item.componentId)}
                                                                style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: isExpanded ? "#c084fc" : "rgba(240,240,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                {isExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
                                                            </button>
                                                            <button onClick={() => copyCode(item.componentId, d.code)}
                                                                style={{ width: 34, height: 34, borderRadius: 10, background: copiedId === item.componentId ? "rgba(110,231,183,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${copiedId === item.componentId ? "rgba(110,231,183,0.3)" : "rgba(255,255,255,0.08)"}`, color: copiedId === item.componentId ? "#6ee7b7" : "rgba(240,240,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                {copiedId === item.componentId ? <CheckCircle size={14} /> : <Copy size={14} />}
                                                            </button>
                                                            <button onClick={() => { const blob = new Blob([d.code], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = d.fileName; a.click(); URL.revokeObjectURL(url); }}
                                                                style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.25)", color: "#c084fc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <Download size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* Expanded code preview */}
                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                                                                <div style={{ padding: "0 18px 14px" }}>
                                                                    <pre style={{ padding: 16, borderRadius: 14, background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)", overflow: "auto", maxHeight: 320, fontSize: 11, lineHeight: 1.7, color: "rgba(240,240,255,0.7)", fontFamily: "'Fira Code', 'Cascadia Code', monospace", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                                                        <code>{d.code}</code>
                                                                    </pre>
                                                                    <div style={{ marginTop: 8, fontSize: 10, color: "rgba(240,240,255,0.2)" }}>{d.readme}</div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>

                                {/* Download All + Dashboard */}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                                    style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <button onClick={() => {
                                        purchasedRef.current.forEach(item => {
                                            const d = getDeliverable(item.componentId);
                                            if (d) { const blob = new Blob([d.code], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = d.fileName; a.click(); URL.revokeObjectURL(url); }
                                        });
                                    }} className="btn-primary" style={{ padding: "17px", borderRadius: 14, justifyContent: "center", fontSize: 15 }}>
                                        <Download size={20} /> Download All Files
                                    </button>
                                    <Link href="/components" className="btn-ghost" style={{ padding: "17px", borderRadius: 14, justifyContent: "center" }}>
                                        <Package size={18} /> Browse More Components
                                    </Link>
                                </motion.div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}
