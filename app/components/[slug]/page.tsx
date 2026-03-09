"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Star, Download, ShoppingCart, Heart, Share2, Check, ChevronRight, Home, Code2, Sparkles, Layout, BookOpen, Clock, Activity, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { getComponentBySlug, getReviewsForComponent, components } from "@/lib/mock-data";
import { formatPrice, formatNumber } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import ComponentCard from "@/components/components/ComponentCard";
import LiveDemo from "@/components/components/LiveDemo";
import type { LicenseType } from "@/types";
import { COLORS as C } from "@/lib/constants";

/** Generates a self-contained HTML demo for the component */
function buildDemoHtml(component: { name: string; category: { icon: string; name: string }; slug: string }) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:system-ui,sans-serif;background:#222831;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;color:#eeeeee;}
    .glass{background:rgba(238,238,238,0.02);backdrop-filter:blur(16px);border-radius:24px;padding:48px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.4);max-width:480px;width:100%;border:1px solid rgba(238,238,238,0.08);}
    .icon-box{width:80px;height:80px;background:rgba(0,173,181,0.1);border:1px solid rgba(0,173,181,0.2);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:40px;margin:0 auto 24px;animation:float 3s ease-in-out infinite;}
    h1{font-size:24px;font-weight:900;color:#eeeeee;margin-bottom:12px;letter-spacing:-0.02em;}
    p{font-size:15px;color:rgba(238,238,238,0.5);line-height:1.7;margin-bottom:32px;}
    .badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;font-size:12px;font-weight:800;color:#00ADB5;background:rgba(0,173,181,0.08);border:1px solid rgba(0,173,181,0.2);margin-bottom:20px;text-transform:uppercase;letter-spacing:0.05em;}
    .btn{display:inline-block;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:800;color:#222831;background:#00ADB5;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,173,181,0.3);transition:all 0.3s;text-decoration:none;}
    .btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,173,181,0.4);background:#00c2cc;}
    .meta{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:32px;}
    .pill{padding:5px 14px;border-radius:12px;font-size:12px;font-weight:700;color:#eeeeee;background:rgba(238,238,238,0.05);border:1px solid rgba(238,238,238,0.1);}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  </style>
</head>
<body>
  <div class="glass">
    <div class="badge">Experimental Prototype</div>
    <div class="icon-box">${component.category.icon}</div>
    <h1>${component.name}</h1>
    <p>This is a live interactive preview of the ${component.name}. Designed for high-performance React applications with built-in accessibility.</p>
    <a href="#" class="btn" onclick="this.textContent='Launched!';return false;">Trigger Action</a>
    <div class="meta">
      <span class="pill">React 18+</span>
      <span class="pill">TypeScript</span>
      <span class="pill">WAI-ARIA</span>
    </div>
  </div>
</body>
</html>`;
}

function buildCode(component: { name: string; slug: string }) {
    return `import { ${component.name.replace(/\s+/g, '')} } from "@nexatech/ui";

// Premium ${component.name} implementation
export default function Preview() {
  return (
    <${component.name.replace(/\s+/g, '')}
      variant="glass"
      accentColor="#00ADB5"
      onAction={() => console.log("Nexus Activated")}
      showGlow={true}
    >
      Explore the future of web design
    </${component.name.replace(/\s+/g, '')}>
  );
}`;
}

export default function ComponentDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const component = getComponentBySlug(slug);

    const [selectedLicense, setSelectedLicense] = useState<LicenseType>("PERSONAL");
    const [activeTab, setActiveTab] = useState("demo");

    const addToCart = useCartStore(s => s.addItem);
    const isInCart = useCartStore(s => s.isInCart(component?.id || ""));
    const isWished = useWishlistStore(s => s.isInWishlist(component?.id || ""));
    const addWishlist = useWishlistStore(s => s.addItem);
    const removeWishlist = useWishlistStore(s => s.removeItem);

    if (!component) {
        return (
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 24px", textAlign: "center", background: C.dark }}>
                <h1 style={{ fontSize: 32, fontWeight: 900, color: C.light }}>Component not found</h1>
                <Link href="/components" className="btn-primary" style={{ marginTop: 24 }}>
                    Back to Library
                </Link>
            </div>
        );
    }

    const reviews = getReviewsForComponent(component.id);
    const related = components.filter(c => c.categoryId === component.categoryId && c.id !== component.id).slice(0, 4);
    const prices = { PERSONAL: component.price, TEAM: component.teamPrice, ENTERPRISE: component.enterprisePrice };
    const licenses: { type: LicenseType; name: string; desc: string }[] = [
        { type: "PERSONAL", name: "Personal Use", desc: "Single project, solo developer" },
        { type: "TEAM", name: "Team License", desc: "Multiple projects, up to 15 devs" },
        { type: "ENTERPRISE", name: "Enterprise", desc: "Unlimited commercial use" },
    ];

    const TABS = [
        { id: "demo", label: "Interactive Demo", icon: Zap },
        { id: "overview", label: "Documentation", icon: BookOpen },
        { id: "reviews", label: `User Reviews (${component.reviewCount})`, icon: Star },
        { id: "changelog", label: "Version History", icon: Clock },
    ];

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 80px" }}>
                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(238, 238, 238, 0.4)", marginBottom: 40, flexWrap: "wrap", fontWeight: 700 }}>
                    <Link href="/" style={{ color: "inherit", textDecoration: "none" }}><Home size={14} /></Link>
                    <ChevronRight size={14} />
                    <Link href="/components" style={{ color: "inherit", textDecoration: "none" }}>Components</Link>
                    <ChevronRight size={14} />
                    <Link href={`/components?category=${component.category.slug}`} style={{ color: C.teal, textDecoration: "none" }}>{component.category.name}</Link>
                    <ChevronRight size={14} />
                    <span style={{ color: C.light }}>{component.name}</span>
                </nav>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start" }} className="lg:grid-cols-[1fr,360px] grid-cols-1">
                    {/* Left column */}
                    <div style={{ minWidth: 0 }}>
                        {/* Tab bar */}
                        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid rgba(238, 238, 238, 0.05)", marginBottom: 32, overflowX: "auto", paddingBottom: 2 }}>
                            {TABS.map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                        style={{ padding: "12px 20px", fontSize: 14, fontWeight: 800, border: "none", background: "transparent", cursor: "pointer", color: activeTab === tab.id ? C.teal : "rgba(238, 238, 238, 0.4)", borderBottom: `2px solid ${activeTab === tab.id ? C.teal : "transparent"}`, marginBottom: -1, whiteSpace: "nowrap", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 10 }}
                                    >
                                        <Icon size={16} /> {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === "demo" && (
                                <motion.div key="demo" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                                    <LiveDemo
                                        componentName={component.name}
                                        demoHtml={buildDemoHtml(component)}
                                        code={buildCode(component)}
                                        height={500}
                                    />
                                </motion.div>
                            )}

                            {activeTab === "overview" && (
                                <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                                    style={{ background: "rgba(238, 238, 238, 0.02)", borderRadius: 24, border: `1px solid rgba(238, 238, 238, 0.06)`, padding: 40 }}>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: C.light, marginBottom: 16 }}>The Core Architecture</h3>
                                    <p style={{ color: "rgba(238, 238, 238, 0.5)", lineHeight: 1.8, marginBottom: 32, fontSize: 16 }}>{component.longDescription || component.description}</p>

                                    <h4 style={{ fontSize: 17, fontWeight: 800, color: C.light, marginBottom: 20 }}>Premium Features</h4>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="sm:grid-cols-2 grid-cols-1">
                                        {["Tailwind Integrated", "Glassmorphism UI", "TypeScript Definitions", "Motion Optimized", "Accessibility Ready", "Modular Exports"].map((f, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "rgba(238, 238, 238, 0.6)", background: "rgba(238, 238, 238, 0.02)", padding: "16px", borderRadius: 16, border: "1px solid rgba(238, 238, 238, 0.04)" }}>
                                                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Check size={14} color="#10b981" />
                                                </div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>

                                    <h4 style={{ fontSize: 17, fontWeight: 800, color: C.light, margin: "40px 0 20px" }}>Semantic Tags</h4>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                        {component.tags.map(tag => (
                                            <span key={tag.id} className="chip" style={{ background: "rgba(238, 238, 238, 0.04)", border: "1px solid rgba(238, 238, 238, 0.08)", color: "rgba(238, 238, 238, 0.6)", padding: "8px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700 }}>{tag.name}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "reviews" && (
                                <motion.div key="reviews" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                                    style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    {reviews.length === 0 ? (
                                        <div style={{ textAlign: "center", padding: "100px 0", color: "rgba(238, 238, 238, 0.4)", background: "rgba(238, 238, 238, 0.01)", borderRadius: 24, border: "1px dashed rgba(238, 238, 238, 0.1)" }}>No ratings yet. Be the first to review!</div>
                                    ) : (
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="md:grid-cols-2 grid-cols-1">
                                            {reviews.map(review => (
                                                <div key={review.id} style={{ padding: 24, borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: "1px solid rgba(238, 238, 238, 0.06)" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                                        <img src={review.user.image} alt={review.user.name} style={{ width: 44, height: 44, borderRadius: 14, border: `1px solid rgba(238, 238, 238, 0.1)` }} />
                                                        <div style={{ flex: 1 }}>
                                                            <p style={{ fontSize: 15, fontWeight: 800, color: C.light }}>{review.user.name}</p>
                                                            <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
                                                                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} color="#f59e0b" fill={i < review.rating ? "#f59e0b" : "none"} />)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {review.title && <p style={{ fontWeight: 800, fontSize: 16, color: C.light, marginBottom: 8 }}>{review.title}</p>}
                                                    <p style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.5)", lineHeight: 1.7 }}>{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "changelog" && (
                                <motion.div key="changelog" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                                    style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {[{ version: component.version, date: component.updatedAt, title: "Stable Release", changes: "Core improvements to animation performance and CSS transitions. Optimized for latest React engine." }, { version: "1.0.0", date: component.createdAt, title: "Initial Access", changes: "The beginning of the legend. Core functionality and essential layouts." }].map((cl, i) => (
                                        <div key={i} style={{ padding: 32, borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, display: "flex", gap: 24 }}>
                                            <div style={{ textAlign: "center", minWidth: 80 }}>
                                                <p style={{ fontSize: 16, fontWeight: 900, color: C.teal }}>v{cl.version}</p>
                                                <p style={{ fontSize: 11, color: "rgba(238, 238, 238, 0.3)", fontWeight: 800, marginTop: 4 }}>{cl.date.split(' ')[0]}</p>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 17, fontWeight: 800, color: C.light, marginBottom: 8 }}>{cl.title}</p>
                                                <p style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.4)", lineHeight: 1.7 }}>{cl.changes}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right sidebar */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                        style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 24 }}>
                        {/* Transaction card */}
                        <div style={{ background: "rgba(238, 238, 238, 0.02)", backdropFilter: "blur(20px)", borderRadius: 32, border: `1px solid rgba(238, 238, 238, 0.06)`, padding: 32, boxShadow: "0 24px 48px rgba(0,0,0,0.3)" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
                                <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(238, 238, 238, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                                    {component.category.icon}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <h1 style={{ fontSize: 20, fontWeight: 900, color: C.light, lineHeight: 1.2, marginBottom: 4 }}>{component.name}</h1>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <Star size={12} color="#f59e0b" fill="#f59e0b" />
                                        <span style={{ fontSize: 13, fontWeight: 800, color: C.light }}>{component.averageRating}</span>
                                        <span style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.3)" }}>({component.reviewCount} users)</span>
                                    </div>
                                </div>
                            </div>

                            {/* License selection */}
                            <p style={{ fontSize: 11, fontWeight: 900, color: "rgba(238, 238, 238, 0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Select Architecture</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                                {licenses.map(lic => (
                                    <button key={lic.type} onClick={() => setSelectedLicense(lic.type)}
                                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderRadius: 16, border: `1px solid ${selectedLicense === lic.type ? C.teal : "rgba(238, 238, 238, 0.1)"}`, background: selectedLicense === lic.type ? "rgba(0, 173, 181, 0.05)" : "transparent", cursor: "pointer", textAlign: "left", transition: "all 0.3s" }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 14, fontWeight: 800, color: selectedLicense === lic.type ? C.teal : C.light }}>{lic.name}</p>
                                            <p style={{ fontSize: 11, color: "rgba(238, 238, 238, 0.3)", marginTop: 2 }}>{lic.desc}</p>
                                        </div>
                                        <span style={{ fontSize: 18, fontWeight: 900, color: C.light }}>{formatPrice(prices[lic.type])}</span>
                                    </button>
                                ))}
                            </div>

                            {/* CTAs */}
                            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                                onClick={() => !isInCart && addToCart(component, selectedLicense)}
                                className="btn-primary"
                                style={{ width: "100%", padding: "18px", borderRadius: 16, marginBottom: 12, justifyContent: "center", background: isInCart ? "rgba(16, 185, 129, 0.1)" : C.teal, color: isInCart ? "#10b981" : C.dark, opacity: isInCart ? 1 : 1, border: isInCart ? "1px solid #10b981" : "none" }}
                            >
                                {isInCart ? <><Check size={20} /> Checkout Now</> : <><ShoppingCart size={20} /> Grab Access</>}
                            </motion.button>

                            <div style={{ display: "flex", gap: 10 }}>
                                <button onClick={() => isWished ? removeWishlist(component.id) : addWishlist(component)}
                                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 16, border: `1px solid ${isWished ? "#ef4444" : "rgba(238, 238, 238, 0.1)"}`, background: isWished ? "rgba(239, 68, 68, 0.05)" : "transparent", color: isWished ? "#ef4444" : "rgba(238, 238, 238, 0.5)", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
                                    <Heart size={16} fill={isWished ? "#ef4444" : "none"} /> {isWished ? "Saved" : "Save"}
                                </button>
                                <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 16, border: "1px solid rgba(238, 238, 238, 0.1)", background: "transparent", color: "rgba(238, 238, 238, 0.5)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                                    <Share2 size={16} /> Share
                                </button>
                            </div>
                        </div>

                        {/* Specs grid */}
                        <div style={{ background: "rgba(238, 238, 238, 0.02)", borderRadius: 24, border: `1px solid rgba(238, 238, 238, 0.06)`, padding: "24px" }}>
                            <p style={{ fontSize: 11, fontWeight: 900, color: "rgba(238, 238, 238, 0.2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Technical Specs</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {[
                                    { icon: Layout, label: "Framework", val: component.framework, color: "#61dafb" },
                                    { icon: Code2, label: "Styling", val: component.styling, color: "#38bdf8" },
                                    { icon: Activity, label: "Accessibility", val: "WCAG 2.1", color: "#10b981" },
                                    { icon: Clock, label: "Last Refined", val: component.updatedAt.split(' ')[0], color: C.teal },
                                ].map(({ icon: Icon, label, val, color }) => (
                                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(238, 238, 238, 0.4)" }}>
                                            <Icon size={14} /> <span>{label}</span>
                                        </div>
                                        <span style={{ fontWeight: 800, color: C.light }}>{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Assets */}
                {related.length > 0 && (
                    <section style={{ marginTop: 100 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
                            <h2 style={{ fontSize: 28, fontWeight: 900, color: C.light, letterSpacing: "-0.03em" }}>You Might Also <span style={{ color: C.teal }}>Need</span></h2>
                            <Link href="/components" style={{ fontSize: 14, fontWeight: 800, color: C.teal, textDecoration: "none" }} className="hover:underline">Explore Full Library →</Link>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
                            {related.map((c, i) => <ComponentCard key={c.id} component={c} index={i} />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
