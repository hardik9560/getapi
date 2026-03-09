"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Bookmark, TrendingUp, Rss, Search, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/mock-data";
import { Spotlight } from "@/components/ui/spotlight";
import { COLORS as C } from "@/lib/constants";

const CAT_COLORS: Record<string, string> = {
    Tutorial: C.teal,
    "Case Study": C.teal,
    Design: C.teal,
    Guide: C.teal,
    Engineering: C.teal,
};

const CATEGORIES = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

function BlogCard({ post, i }: { post: typeof blogPosts[0]; i: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const color = C.teal;

    return (
        <motion.article ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ borderRadius: 28, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.06)`, overflow: "hidden", backdropFilter: "blur(20px)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "pointer" }}
            whileHover={{ y: -8, background: "rgba(238, 238, 238, 0.04)", borderColor: C.teal }}
        >
            {/* Thumbnail */}
            <div style={{ aspectRatio: "16/9", background: "rgba(0,0,0,0.3)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(${C.light} 1px, transparent 1px), linear-gradient(90deg, ${C.light} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
                <div style={{ width: 60, height: 60, borderRadius: 18, background: "rgba(238, 238, 238, 0.02)", border: "1px solid rgba(238, 238, 238, 0.04)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", zIndex: 2 }}>
                    <TrendingUp size={24} color={C.teal} />
                </div>
                <div style={{ position: "absolute", top: 16, left: 16 }} className="badge-teal">
                    {post.category}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "32px" }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: C.light, lineHeight: 1.4, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.title}
                    </h3>
                </Link>
                <p style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.4)", lineHeight: 1.8, marginBottom: 24, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {post.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={post.author.image} alt={post.author.name} style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid rgba(238, 238, 238, 0.1)` }} />
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 800, color: C.light }}>{post.author.name}</p>
                            <p style={{ fontSize: 10, color: "rgba(238, 238, 238, 0.3)", fontWeight: 700 }}>{post.publishedAt}</p>
                        </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}
                        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 900, color: C.teal, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Explore <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}

export default function BlogPage() {
    const [search, setSearch] = useState("");
    const [activecat, setActivecat] = useState("All");
    const featured = blogPosts[0];

    const filtered = blogPosts.filter(p => {
        const matchCat = activecat === "All" || p.category === activecat;
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>

            {/* ── Hero section ── */}
            <div style={{ position: "relative", overflow: "hidden", background: C.dark, padding: "120px 24px 100px" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% -10%, ${C.teal}15 0%, transparent 60%)` }} />
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.light}10 1px, transparent 1px), linear-gradient(90deg, ${C.light}10 1px, transparent 1px)`, backgroundSize: "52px 52px" }} />
                <Spotlight size={500} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="badge-teal" style={{ marginBottom: 24 }}>
                            <Rss size={11} /> Nexus Intelligence Blog
                        </span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, color: C.light, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24 }}>
                        Signals from the <span style={{ color: C.teal }}>Frontier</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "rgba(238, 238, 238, 0.5)", maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.7 }}>
                        Deep dives into UI architecture, high-performance systems, and modern digital aesthetics.
                    </motion.p>

                    {/* Search */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 540, margin: "0 auto", background: "rgba(0, 0, 0, 0.3)", border: "1px solid rgba(238, 238, 238, 0.1)", borderRadius: 16, padding: "14px 24px", backdropFilter: "blur(20px)" }}>
                        <Search size={18} color="rgba(238, 238, 238, 0.3)" style={{ flexShrink: 0 }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Decrypt articles..."
                            style={{ background: "transparent", border: "none", outline: "none", fontSize: 15, color: C.light, fontFamily: "inherit", flex: 1 }} />
                    </motion.div>
                </div>
            </div>

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 120px" }}>

                {/* ── Featured post ── */}
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ marginBottom: 80, borderRadius: 32, overflow: "hidden", border: `1px solid rgba(238, 238, 238, 0.06)`, background: "rgba(238, 238, 238, 0.02)", display: "grid", gridTemplateColumns: "1.2fr 1fr", backdropFilter: "blur(20px)" }}
                    className="md:grid-cols-2 grid-cols-1"
                >
                    <div style={{ padding: "64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <span className="badge-teal" style={{ marginBottom: 24 }}>
                            ✦ Node Priority · {featured.category}
                        </span>
                        <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, color: C.light, lineHeight: 1.2, marginBottom: 20 }}>
                            {featured.title}
                        </h2>
                        <p style={{ fontSize: 16, color: "rgba(238, 238, 238, 0.4)", lineHeight: 1.8, marginBottom: 40 }}>{featured.excerpt}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
                            <img src={featured.author.image} alt={featured.author.name} style={{ width: 44, height: 44, borderRadius: 16, border: `2px solid rgba(238, 238, 238, 0.1)` }} />
                            <div>
                                <p style={{ fontSize: 15, fontWeight: 900, color: C.light }}>{featured.author.name}</p>
                                <p style={{ fontSize: 12, color: "rgba(238, 238, 238, 0.3)", fontWeight: 700 }}>{featured.publishedAt} · {featured.readingTime}</p>
                            </div>
                        </div>
                        <Link href={`/blog/${featured.slug}`} className="btn-primary" style={{ alignSelf: "flex-start", padding: "16px 32px", borderRadius: 14 }}>
                            Read Full Transmission <ArrowRight size={18} />
                        </Link>
                    </div>
                    {/* Visual side */}
                    <div style={{ background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", minHeight: 400 }}>
                        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `linear-gradient(${C.teal} 1px, transparent 1px), linear-gradient(90deg, ${C.teal} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                        <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }} transition={{ duration: 10, repeat: Infinity }}
                            style={{ width: 140, height: 140, borderRadius: 32, background: "rgba(238, 238, 238, 0.02)", border: `1px solid ${C.teal}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, backdropFilter: "blur(12px)", boxShadow: `0 0 40px ${C.teal}10` }}>
                            🛰️
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── Category filter ── */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48, justifyContent: "center" }}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActivecat(cat)}
                            style={{
                                padding: "10px 24px", borderRadius: 16, fontSize: 14, fontWeight: 800, border: "1px solid", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                background: activecat === cat ? C.teal : "rgba(238, 238, 238, 0.03)",
                                color: activecat === cat ? C.dark : "rgba(238, 238, 238, 0.4)",
                                borderColor: activecat === cat ? C.teal : "rgba(238, 238, 238, 0.1)",
                            }}
                        >{cat}</button>
                    ))}
                </div>

                {/* ── Grid ── */}
                {filtered.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "100px 0" }}>
                        <div style={{ width: 80, height: 80, margin: "0 auto 24px", borderRadius: 24, background: "rgba(238, 238, 238, 0.02)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Search size={40} color="rgba(238, 238, 238, 0.1)" />
                        </div>
                        <h2 style={{ fontSize: 24, fontWeight: 900, color: C.light }}>No signal found</h2>
                        <p style={{ color: "rgba(238, 238, 238, 0.4)", marginTop: 8 }}>Try adjusting your decryption parameters.</p>
                        <button onClick={() => { setSearch(""); setActivecat("All"); }} style={{ color: C.teal, background: "none", border: "none", cursor: "pointer", fontWeight: 800, marginTop: 24, textTransform: "uppercase", fontSize: 12, letterSpacing: "0.1em" }}>Clear Uplink Filters</button>
                    </motion.div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
                        {filtered.map((post, i) => <BlogCard key={post.id} post={post} i={i} />)}
                    </div>
                )}
            </div>
        </div>
    );
}
