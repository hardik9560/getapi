"use client";
import { motion } from "framer-motion";
import ComponentCard from "@/components/components/ComponentCard";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { COLORS as C } from "@/lib/constants";

export default function WishlistPage() {
    const { items } = useWishlistStore();

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light, padding: "120px 24px 100px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
                    <div>
                        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: 16 }}>
                            <Heart size={32} color="#ef4444" fill="#ef4444" /> Saved <span style={{ color: C.teal }}>Assets</span>
                        </h1>
                        <p style={{ color: "rgba(238, 238, 238, 0.4)", marginTop: 8, fontWeight: 500 }}>A curated list of premium components and APIs you’re tracking.</p>
                    </div>
                    {items.length > 0 && (
                        <span className="badge-teal">
                            <Sparkles size={11} /> {items.length} Tracked {items.length === 1 ? 'Item' : 'Items'}
                        </span>
                    )}
                </motion.div>

                {items.length === 0 ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "120px 24px", borderRadius: 32, background: "rgba(238, 238, 238, 0.02)", border: "1px dashed rgba(238, 238, 238, 0.1)" }}>
                        <div style={{ width: 80, height: 80, margin: "0 auto 24px", borderRadius: 24, background: "rgba(238, 238, 238, 0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Heart size={40} color="rgba(238, 238, 238, 0.2)" />
                        </div>
                        <h2 style={{ fontSize: 24, fontWeight: 900, color: C.light, marginBottom: 12 }}>Your wishlist is purely theoretical</h2>
                        <p style={{ color: "rgba(238, 238, 238, 0.4)", marginBottom: 32, maxWidth: 400, margin: "0 auto 32px", lineHeight: 1.6 }}>Start tracking premium components to build your dream UI library. They'll appear here when you're ready.</p>
                        <Link href="/components" className="btn-primary" style={{ padding: "14px 32px", borderRadius: 16 }}>
                            Browse the Forge <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
                        {items.map((item, i) => <ComponentCard key={item.id} component={item.component} index={i} />)}
                    </div>
                )}
            </div>
        </div>
    );
}
