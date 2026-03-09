"use client";
import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Shield, Users, Building2, Star, ArrowRight, HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { LICENSE_TIERS, COLORS as C } from "@/lib/constants";
import { Spotlight } from "@/components/ui/spotlight";

const plans = [
    {
        key: "PERSONAL", price: 99, maxPrice: 199, name: "Personal Pro", badge: null,
        desc: "Perfect for indie creators and high-end portfolios",
        icon: Shield, iconColor: C.teal,
        features: LICENSE_TIERS.PERSONAL.features,
        cta: "Get Started Now", popular: false,
        gradient: "linear-gradient(135deg, rgba(0, 173, 181, 0.05) 0%, rgba(238, 238, 238, 0) 100%)",
        borderGlow: "rgba(0, 173, 181, 0.2)",
    },
    {
        key: "TEAM", price: 199, maxPrice: 399, name: "Studio Team", badge: "⚡ Peak Value",
        desc: "The standard for agencies and startup teams",
        icon: Users, iconColor: C.light,
        features: LICENSE_TIERS.TEAM.features,
        cta: "Unlock Studio Access", popular: true,
        gradient: "linear-gradient(135deg, rgba(0, 173, 181, 0.12) 0%, rgba(34, 40, 49, 0.5) 100%)",
        borderGlow: C.teal,
    },
    {
        key: "ENTERPRISE", price: 399, maxPrice: 599, name: "Enterprise", badge: null,
        desc: "Scalable infrastructure for global organizations",
        icon: Building2, iconColor: C.teal,
        features: LICENSE_TIERS.ENTERPRISE.features,
        cta: "Establish Connection", popular: false,
        gradient: "linear-gradient(135deg, rgba(0, 173, 181, 0.05) 0%, rgba(238, 238, 238, 0) 100%)",
        borderGlow: "rgba(0, 173, 181, 0.2)",
    },
];

const faqs = [
    { q: "How does the 'per-component' pricing work?", a: "You can purchase individual components for a one-time fee. This gives you full source access and lifetime rights to use that specific component in any of your projects." },
    { q: "Can I switch licenses after purchase?", a: "Yes, you can upgrade from Personal to Team or Enterprise by simply paying the difference. Your previous investment is fully credited." },
    { q: "What's the support policy for these assets?", a: "We provide dedicated technical support for all premium components. If you encounter any bugs or integration issues, our team is ready to assist via our Discord or email." },
    { q: "Are updates included with the one-time fee?", a: "Absolutely. All future patches, performance optimizations, and feature updates for your purchased components are free forever." },
];

/** 3D card that tilts on mouse move */
function TiltCard({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });

    const onMove = (e: MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width - 0.5);
        mouseY.set((e.clientY - top) / height - 0.5);
    };
    const onLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
            style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function FAQItem({ faq, idx }: { faq: typeof faqs[0]; idx: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
            style={{ borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: `1px solid ${open ? C.teal : "rgba(238, 238, 238, 0.06)"}`, overflow: "hidden", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
            <button onClick={() => setOpen(!open)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
            >
                <span style={{ fontSize: 16, fontWeight: 800, color: open ? C.teal : C.light }}>{faq.q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={20} color={open ? C.teal : "rgba(238, 238, 238, 0.3)"} />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div style={{ padding: "0 32px 24px", fontSize: 15, color: "rgba(238, 238, 238, 0.5)", lineHeight: 1.8 }}>{faq.a}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function PricingPage() {
    const [billing, setBilling] = useState<"unit" | "bundle">("unit");

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>

            {/* ── Hero section ── */}
            <div style={{ position: "relative", overflow: "hidden", background: C.dark, padding: "120px 24px 100px" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 10%, ${C.teal}15 0%, transparent 60%)` }} />
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.light}10 1px, transparent 1px), linear-gradient(90deg, ${C.light}10 1px, transparent 1px)`, backgroundSize: "52px 52px" }} />
                <Spotlight size={500} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="badge-teal" style={{ marginBottom: 24 }}>
                            <Sparkles size={11} /> Transparent Investment Tiers
                        </span>
                        <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, color: C.light, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24 }}>
                            Pay once. Use <span style={{ color: C.teal }}>forever</span>.
                        </h1>
                        <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(238, 238, 238, 0.5)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7 }}>
                            No recurring subscriptions. Access full source code and high-performance assets with a one-time investment.
                        </p>

                        {/* Billing toggle */}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(238, 238, 238, 0.03)", border: "1px solid rgba(238, 238, 238, 0.08)", borderRadius: 16, padding: "6px", backdropFilter: "blur(20px)" }}>
                            {(["unit", "bundle"] as const).map(b => (
                                <button key={b} onClick={() => setBilling(b)}
                                    style={{
                                        padding: "10px 24px", borderRadius: 12, fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer", transition: "all 0.3s",
                                        background: billing === b ? C.teal : "transparent",
                                        color: billing === b ? C.dark : "rgba(238, 238, 238, 0.4)",
                                    }}
                                >
                                    {b === "unit" ? "Individual Access" : "The Full Archive (Save 40%)"}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 120px" }}>
                {/* ── Pricing cards ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, marginBottom: 120 }}>
                    {plans.map((plan, i) => {
                        const Icon = plan.icon;
                        const price = billing === "bundle" ? Math.round(plan.price * 5) : plan.price;
                        return (
                            <motion.div key={plan.key}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                            >
                                <TiltCard style={{ height: "100%" }}>
                                    <div style={{
                                        height: "100%", borderRadius: 32, padding: "48px 40px", position: "relative", overflow: "hidden",
                                        background: "rgba(238, 238, 238, 0.02)",
                                        border: `1px solid ${plan.popular ? C.teal : "rgba(238, 238, 238, 0.08)"}`,
                                        backdropFilter: "blur(20px)",
                                        boxShadow: plan.popular ? `0 24px 64px -12px ${C.teal}20` : "none",
                                        transform: plan.popular ? "scale(1.05)" : "scale(1)",
                                        zIndex: plan.popular ? 10 : 1,
                                    }}>
                                        {/* Glow Layer */}
                                        <div style={{ position: "absolute", inset: 0, background: plan.gradient, pointerEvents: "none" }} />

                                        {plan.badge && (
                                            <div style={{ position: "absolute", top: 24, right: 24 }} className="badge-teal">
                                                {plan.badge}
                                            </div>
                                        )}

                                        <div style={{ position: "relative", zIndex: 2 }}>
                                            <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(238, 238, 238, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                                                <Icon size={28} color={C.teal} />
                                            </div>

                                            <h3 style={{ fontSize: 24, fontWeight: 900, color: C.light, marginBottom: 8 }}>{plan.name}</h3>
                                            <p style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.4)", marginBottom: 40, lineHeight: 1.6 }}>{plan.desc}</p>

                                            <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid rgba(238, 238, 238, 0.05)" }}>
                                                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                                                    <span style={{ fontSize: 48, fontWeight: 900, color: C.light, letterSpacing: "-0.04em" }}>${price}</span>
                                                    <span style={{ fontSize: 16, color: "rgba(238, 238, 238, 0.3)", fontWeight: 700 }}>{billing === "bundle" ? "/archive" : "/asset"}</span>
                                                </div>
                                                <p style={{ fontSize: 12, fontWeight: 800, color: C.teal, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Universal Perpetual License</p>
                                            </div>

                                            <ul style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
                                                {plan.features.map((f, j) => (
                                                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "rgba(238, 238, 238, 0.6)" }}>
                                                        <div style={{ width: 22, height: 22, borderRadius: 8, background: "rgba(0, 173, 181, 0.05)", border: "1px solid rgba(0, 173, 181, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                            <Check size={12} color={C.teal} />
                                                        </div>
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>

                                            <Link href="/components" className={plan.popular ? "btn-primary" : "btn-ghost"} style={{ display: "flex", width: "100%", padding: "18px", borderRadius: 16, justifyContent: "center", fontSize: 15, border: plan.popular ? "none" : "1px solid rgba(238, 238, 238, 0.1)" }}>
                                                {plan.cta} <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── FAQ ── */}
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <HelpCircle size={40} color={C.teal} style={{ margin: "0 auto 20px" }} />
                        <h2 style={{ fontSize: 36, fontWeight: 900, color: C.light }}>Clarifications</h2>
                        <p style={{ color: "rgba(238, 238, 238, 0.4)", marginTop: 8 }}>Everything you need to know about our premium assets.</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {faqs.map((faq, i) => <FAQItem key={i} faq={faq} idx={i} />)}
                    </div>
                </div>

                {/* ── Final CTA ── */}
                <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    style={{ marginTop: 160, padding: "80px 40px", borderRadius: 48, background: `linear-gradient(135deg, ${C.teal} 0%, #008187 100%)`, textAlign: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.2)" }} />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 50% 120%, rgba(255,255,255,0.3) 0%, transparent 60%)` }} />

                    <div style={{ position: "relative", zIndex: 2 }}>
                        <h2 style={{ fontSize: 40, fontWeight: 900, color: C.dark, marginBottom: 16, letterSpacing: "-0.04em" }}>Start Building Your Legacy</h2>
                        <p style={{ fontSize: 18, color: "rgba(34, 40, 49, 0.7)", maxWidth: 500, margin: "0 auto 40px", fontWeight: 600 }}>Join the elite developers shiping with premium UI components.</p>
                        <Link href="/components" className="btn-primary" style={{ background: C.dark, color: C.light, padding: "20px 48px", borderRadius: 20, fontSize: 18, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                            Access Library <ArrowRight size={22} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
