"use client";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, List, X, Star, Sliders, ChevronDown, ChevronUp, Sparkles, ArrowRight, Filter } from "lucide-react";
import ComponentCard from "@/components/components/ComponentCard";
import { components, categories } from "@/lib/mock-data";
import { SORT_OPTIONS, COLORS as C } from "@/lib/constants";
import { Spotlight } from "@/components/ui/spotlight";

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={{ borderBottom: "1px solid rgba(238, 238, 238, 0.05)", paddingBottom: open ? 20 : 0 }}>
            <button onClick={() => setOpen(!open)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", background: "none", border: "none", cursor: "pointer" }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: C.light, textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</span>
                {open ? <ChevronUp size={16} color="rgba(238, 238, 238, 0.4)" /> : <ChevronDown size={16} color="rgba(238, 238, 238, 0.4)" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function BrowsePage() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [priceMax, setPriceMax] = useState(599);
    const [minRating, setMinRating] = useState(0);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [focused, setFocused] = useState(false);

    const toggleCat = (slug: string) =>
        setSelectedCats(prev => prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]);

    const filtered = useMemo(() => {
        let items = [...components];
        if (search) {
            const q = search.toLowerCase();
            items = items.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some(t => t.name.toLowerCase().includes(q)));
        }
        if (selectedCats.length) items = items.filter(c => selectedCats.includes(c.category.slug));
        if (minRating > 0) items = items.filter(c => c.averageRating >= minRating);
        items = items.filter(c => c.price <= priceMax);

        switch (sortBy) {
            case "newest": items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
            case "price-asc": items.sort((a, b) => a.price - b.price); break;
            case "price-desc": items.sort((a, b) => b.price - a.price); break;
            case "rating": items.sort((a, b) => b.averageRating - a.averageRating); break;
            default: items.sort((a, b) => b.downloadCount - a.downloadCount);
        }
        return items;
    }, [search, sortBy, selectedCats, priceMax, minRating]);

    const clearAll = () => { setSelectedCats([]); setPriceMax(599); setMinRating(0); setSearch(""); };
    const activeFilterCount = selectedCats.length + (minRating > 0 ? 1 : 0) + (priceMax < 599 ? 1 : 0);

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>

            {/* ── Hero section ── */}
            <div style={{ position: "relative", overflow: "hidden", background: C.dark, padding: "100px 24px 120px" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 15% 55%, ${C.teal}18 0%, transparent 60%), radial-gradient(ellipse at 85% 25%, ${C.teal}10 0%, transparent 55%)` }} />
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.light}10 1px, transparent 1px), linear-gradient(90deg, ${C.light}10 1px, transparent 1px)`, backgroundSize: "52px 52px" }} />
                <Spotlight size={420} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="badge-teal" style={{ marginBottom: 24 }}>
                            <Sparkles size={11} /> Over {components.length} Premium Assets
                        </span>
                        <h1 style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 900, color: C.light, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 24 }}>
                            Build Faster with <span style={{ color: C.teal }}>Premium UI</span>
                        </h1>
                        <p style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: "rgba(238, 238, 238, 0.5)", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
                            A curated collection of production-ready components, layouts, and animations. Just copy, paste, and ship.
                        </p>

                        {/* Search Bar */}
                        <div style={{ display: "flex", alignItems: "center", gap: 14, maxWidth: 640, margin: "0 auto" }}>
                            <div style={{ flex: 1, position: "relative", background: focused ? "rgba(238, 238, 238, 0.06)" : "rgba(238, 238, 238, 0.03)", border: `1px solid ${focused ? C.teal : "rgba(238, 238, 238, 0.1)"}`, borderRadius: 16, display: "flex", alignItems: "center", padding: "14px 22px", gap: 12, backdropFilter: "blur(20px)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: focused ? `0 0 30px ${C.teal}15` : "none" }}>
                                <Search size={18} color={focused ? C.teal : "rgba(238, 238, 238, 0.3)"} style={{ transition: "all 0.3s" }} />
                                <input value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                                    placeholder="Search for UI elements..."
                                    style={{ background: "transparent", border: "none", outline: "none", fontSize: 16, color: C.light, fontFamily: "inherit", flex: 1 }}
                                />
                                {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(238, 238, 238, 0.4)", display: "flex" }}><X size={16} /></button>}
                            </div>
                        </div>
                    </motion.div>
                </div>
                {/* Bottom fade */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, transparent, ${C.dark})` }} />
            </div>

            {/* ── Main Layout ── */}
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 100px" }}>
                <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

                    {/* ── Sidebar Filters ── */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        style={{ width: 280, flexShrink: 0, background: "rgba(238, 238, 238, 0.02)", borderRadius: 24, border: `1px solid rgba(238, 238, 238, 0.06)`, overflow: "hidden", position: "sticky", top: 100, backdropFilter: "blur(12px)" }}
                    >
                        <div style={{ padding: "20px 24px", borderBottom: `1px solid rgba(238, 238, 238, 0.05)`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 900, color: C.light }}>
                                <SlidersHorizontal size={16} color={C.teal} /> Explorer
                            </div>
                            {activeFilterCount > 0 && (
                                <button onClick={clearAll} style={{ fontSize: 12, color: C.teal, background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>Reset All</button>
                            )}
                        </div>

                        <div style={{ padding: "8px 24px 24px" }}>
                            <FilterSection title="Category">
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {categories.map(cat => (
                                        <label key={cat.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 0" }}>
                                            <div onClick={() => toggleCat(cat.slug)}
                                                style={{ width: 18, height: 18, borderRadius: 6, border: `2px solid ${selectedCats.includes(cat.slug) ? C.teal : "rgba(238, 238, 238, 0.2)"}`, background: selectedCats.includes(cat.slug) ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.2s" }}>
                                                {selectedCats.includes(cat.slug) && <div style={{ width: 8, height: 8, borderRadius: 2, background: C.dark }} />}
                                            </div>
                                            <span style={{ fontSize: 13, color: selectedCats.includes(cat.slug) ? C.light : "rgba(238, 238, 238, 0.5)", fontWeight: selectedCats.includes(cat.slug) ? 800 : 500, flex: 1 }}>{cat.icon} {cat.name}</span>
                                            <span style={{ fontSize: 11, color: "rgba(238, 238, 238, 0.3)", fontWeight: 700 }}>{cat.componentCount}</span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Max Investment">
                                <div style={{ paddingTop: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13, fontWeight: 700 }}>
                                        <span style={{ color: "rgba(238, 238, 238, 0.3)" }}>$99</span>
                                        <span style={{ color: C.teal }}>${priceMax}</span>
                                    </div>
                                    <input type="range" min={99} max={599} value={priceMax} onChange={e => setPriceMax(parseInt(e.target.value))}
                                        style={{ width: "100%", accentColor: C.teal }} />
                                </div>
                            </FilterSection>

                            <FilterSection title="Rating Threshold" defaultOpen={false}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {[0, 3, 4, 4.5].map(r => (
                                        <label key={r} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 0" }} onClick={() => setMinRating(r)}>
                                            <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${minRating === r ? C.teal : "rgba(238, 238, 238, 0.2)"}`, background: minRating === r ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                                                {minRating === r && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.dark }} />}
                                            </div>
                                            <span style={{ fontSize: 13, color: minRating === r ? C.light : "rgba(238, 238, 238, 0.5)", fontWeight: minRating === r ? 800 : 500, display: "flex", alignItems: "center", gap: 6 }}>
                                                {r === 0 ? "Any Rating" : <><Star size={12} color="#f59e0b" fill="#f59e0b" /> {r}+</>}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterSection>
                        </div>
                    </motion.aside>

                    {/* ── Content Area ── */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Toolbar */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 }}>
                                <AnimatePresence>
                                    {selectedCats.map(slug => {
                                        const cat = categories.find(c => c.slug === slug);
                                        return cat ? (
                                            <motion.button key={slug} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                                onClick={() => toggleCat(slug)}
                                                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: C.teal, background: "rgba(0, 173, 181, 0.08)", border: `1px solid rgba(0, 173, 181, 0.2)`, cursor: "pointer" }}>
                                                {cat.icon} {cat.name} <X size={12} />
                                            </motion.button>
                                        ) : null;
                                    })}
                                </AnimatePresence>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <p style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.4)", whiteSpace: "nowrap" }}>
                                    Filtered <span style={{ fontWeight: 800, color: C.light }}>{filtered.length}</span> items
                                </p>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                                    style={{ padding: "10px 16px", borderRadius: 12, border: "1px solid rgba(238, 238, 238, 0.1)", background: "rgba(238, 238, 238, 0.02)", color: C.light, fontSize: 13, fontWeight: 700, outline: "none", cursor: "pointer" }}>
                                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                                <div style={{ display: "flex", gap: 4, background: "rgba(238, 238, 238, 0.02)", border: "1px solid rgba(238, 238, 238, 0.1)", borderRadius: 12, padding: 4 }}>
                                    {([["grid", Grid3X3], ["list", List]] as [string, typeof Grid3X3][]).map(([mode, Icon]) => (
                                        <button key={mode} onClick={() => setViewMode(mode as "grid" | "list")}
                                            style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", background: viewMode === mode ? C.teal : "transparent", color: viewMode === mode ? C.dark : "rgba(238, 238, 238, 0.4)", transition: "all 0.2s" }}>
                                            <Icon size={16} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results Grid */}
                        {filtered.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "100px 24px", background: "rgba(238, 238, 238, 0.01)", borderRadius: 32, border: `1px solid rgba(238, 238, 238, 0.05)` }}>
                                <div style={{ fontSize: 64, marginBottom: 24 }}>🔎</div>
                                <p style={{ fontSize: 24, fontWeight: 900, color: C.light, marginBottom: 12 }}>Nothing matched your hunt</p>
                                <p style={{ fontSize: 16, color: "rgba(238, 238, 238, 0.4)", marginBottom: 32 }}>Try resetting the filters or broaden your search.</p>
                                <button onClick={clearAll} className="btn-primary" style={{ padding: "14px 32px" }}>
                                    Refresh Selection
                                </button>
                            </motion.div>
                        ) : (
                            <div style={viewMode === "grid"
                                ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }
                                : { display: "flex", flexDirection: "column", gap: 20 }
                            }>
                                {filtered.map((comp, i) => <ComponentCard key={comp.id} component={comp} index={i} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
