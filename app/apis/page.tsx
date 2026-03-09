"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Zap, Activity, Star, ChevronDown, ChevronUp, X } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { ApiCard } from "@/components/apis/ApiCard";
import { apis, apiCategories } from "@/lib/api-data";
import { ApiItem } from "@/types";
import { COLORS as C } from "@/lib/constants";

const ALL_PRICING = ["FREEMIUM", "FREE", "PAY_PER_CALL", "SUBSCRIPTION"];
const PRICING_LABEL: Record<string, string> = { FREE: "Free", FREEMIUM: "Freemium", PAY_PER_CALL: "Pay-per-call", SUBSCRIPTION: "Subscription" };
const AUTH_OPTIONS = ["API_KEY", "BEARER", "OAUTH2"];
const AUTH_LABEL: Record<string, string> = { API_KEY: "API Key", BEARER: "Bearer Token", OAUTH2: "OAuth 2.0" };

function SidebarSection({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
    return (
        <div style={{ borderBottom: "1px solid rgba(238, 238, 238, 0.05)" }}>
            <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.light }}>{title}</span>
                {open ? <ChevronUp size={16} color="rgba(238, 238, 238, 0.4)" /> : <ChevronDown size={16} color="rgba(238, 238, 238, 0.4)" />}
            </button>
            {open && <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>}
        </div>
    );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div onClick={onChange} style={{ width: 18, height: 18, borderRadius: 6, border: `2px solid ${checked ? C.teal : "rgba(238, 238, 238, 0.2)"}`, background: checked ? C.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                {checked && <div style={{ width: 8, height: 8, borderRadius: 2, background: C.dark }} />}
            </div>
            <span style={{ fontSize: 13, color: checked ? C.light : "rgba(238, 238, 238, 0.5)" }}>{label}</span>
        </label>
    );
}

export default function ApisPage() {
    const [query, setQuery] = useState("");
    const [catOpen, setCatOpen] = useState(true);
    const [pmOpen, setPmOpen] = useState(true);
    const [authOpen, setAuthOpen] = useState(false);
    const [cats, setCats] = useState<string[]>([]);
    const [pms, setPms] = useState<string[]>([]);
    const [auths, setAuths] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("featured");

    const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
        set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

    const filtered: ApiItem[] = useMemo(() => {
        let list = apis.filter(a => {
            if (query && !a.name.toLowerCase().includes(query.toLowerCase()) && !a.description.toLowerCase().includes(query.toLowerCase())) return false;
            if (cats.length && !cats.includes(a.categoryId)) return false;
            if (pms.length && !pms.includes(a.pricingModel)) return false;
            if (auths.length && !auths.includes(a.authType)) return false;
            return true;
        });
        if (sortBy === "featured") list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        if (sortBy === "rating") list = [...list].sort((a, b) => b.averageRating - a.averageRating);
        if (sortBy === "calls") list = [...list].sort((a, b) => b.callCount - a.callCount);
        if (sortBy === "latency") list = [...list].sort((a, b) => a.latencyMs - b.latencyMs);
        return list;
    }, [query, cats, pms, auths, sortBy]);

    const activeFilters = [...cats.map(c => apiCategories.find(x => x.id === c)?.name ?? c), ...pms.map(p => PRICING_LABEL[p]), ...auths.map(a => AUTH_LABEL[a])];
    const clearFilter = (label: string) => {
        const cat = apiCategories.find(c => c.name === label); if (cat) setCats(p => p.filter(x => x !== cat.id));
        const pmK = Object.entries(PRICING_LABEL).find(([, v]) => v === label)?.[0]; if (pmK) setPms(p => p.filter(x => x !== pmK));
        const aK = Object.entries(AUTH_LABEL).find(([, v]) => v === label)?.[0]; if (aK) setAuths(p => p.filter(x => x !== aK));
    };

    return (
        <div style={{ background: C.dark, minHeight: "100vh", color: C.light }}>
            {/* ── Hero ── */}
            <div style={{ position: "relative", overflow: "hidden", background: C.dark, padding: "100px 24px 120px" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 20% 60%, ${C.teal}15 0%, transparent 58%), radial-gradient(ellipse at 80% 20%, ${C.teal}08 0%, transparent 55%)` }} />
                <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.light}10 1px, transparent 1px), linear-gradient(90deg, ${C.light}10 1px, transparent 1px)`, backgroundSize: "52px 52px" }} />
                <Spotlight size={460} />
                <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="badge-teal" style={{ marginBottom: 24 }}>
                            <Zap size={11} /> 20+ Production-Ready APIs
                        </span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                        style={{ fontSize: "clamp(32px, 6vw, 68px)", fontWeight: 900, color: C.light, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 24 }}>
                        Explore the Global <br />
                        <span style={{ color: C.teal }}>API Marketplace</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
                        style={{ fontSize: "clamp(16px, 1.8vw, 19px)", color: "rgba(238, 238, 238, 0.5)", maxWidth: 640, margin: "0 auto 40px", lineHeight: 1.7 }}>
                        High-performance endpoints for AI, payments, mapping, and more. All with copy-ready snippets and 99.9% uptime.
                    </motion.p>
                    {/* Search */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
                        style={{ display: "flex", maxWidth: 600, margin: "0 auto", background: "rgba(238, 238, 238, 0.03)", backdropFilter: "blur(12px)", borderRadius: 16, border: `1px solid rgba(238, 238, 238, 0.1)`, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <div style={{ display: "flex", alignItems: "center", paddingLeft: 20 }}><Search size={18} color={C.teal} /></div>
                        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for anything (e.g. 'Authentication', 'Maps')..."
                            style={{ flex: 1, padding: "18px 16px", fontSize: 16, border: "none", outline: "none", color: C.light, background: "transparent" }} />
                    </motion.div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, transparent, ${C.dark})` }} />
            </div>

            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 100px" }}>
                {/* Stats Bar */}
                <div style={{ display: "flex", gap: 16, marginBottom: 40, overflowX: "auto", paddingBottom: 8 }}>
                    {[
                        { icon: Zap, label: "Total APIs", value: apis.length, color: C.teal },
                        { icon: Activity, label: "Network Uptime", value: "99.99%", color: "#10b981" },
                        { icon: Star, label: "Developer Rating", value: "4.8 / 5", color: "#f59e0b" },
                    ].map(({ icon: Icon, label, value, color }) => (
                        <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 16, background: "rgba(238, 238, 238, 0.02)", border: `1px solid rgba(238, 238, 238, 0.05)`, whiteSpace: "nowrap", flexShrink: 0 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Icon size={14} color={color} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 800, color: C.light }}>{value}</span>
                            <span style={{ fontSize: 12, color: "rgba(238, 238, 238, 0.4)" }}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                {activeFilters.length > 0 && (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                        {activeFilters.map(f => (
                            <button key={f} onClick={() => clearFilter(f)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: C.teal, background: "rgba(0, 173, 181, 0.08)", border: `1px solid rgba(0, 173, 181, 0.22)`, cursor: "pointer" }}>
                                {f} <X size={13} />
                            </button>
                        ))}
                        <button onClick={() => { setCats([]); setPms([]); setAuths([]); }} style={{ fontSize: 13, color: "rgba(238, 238, 238, 0.4)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                            Clear all filters
                        </button>
                    </div>
                )}

                <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
                    {/* ── Sidebar ── */}
                    <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        style={{ width: 280, flexShrink: 0, background: "rgba(238, 238, 238, 0.02)", borderRadius: 24, border: `1px solid rgba(238, 238, 238, 0.06)`, overflow: "hidden", position: "sticky", top: 100, backdropFilter: "blur(10px)" }}>
                        <div style={{ padding: "20px 24px", borderBottom: `1px solid rgba(238, 238, 238, 0.05)`, display: "flex", alignItems: "center", gap: 10 }}>
                            <Filter size={16} color={C.teal} />
                            <span style={{ fontSize: 14, fontWeight: 800, color: C.light }}>Filters</span>
                        </div>

                        <SidebarSection title="Category" open={catOpen} onToggle={() => setCatOpen(p => !p)}>
                            {apiCategories.map(c => <CheckRow key={c.id} label={`${c.icon} ${c.name}`} checked={cats.includes(c.id)} onChange={() => toggle(cats, c.id, setCats)} />)}
                        </SidebarSection>

                        <SidebarSection title="Pricing Model" open={pmOpen} onToggle={() => setPmOpen(p => !p)}>
                            {ALL_PRICING.map(p => <CheckRow key={p} label={PRICING_LABEL[p]} checked={pms.includes(p)} onChange={() => toggle(pms, p, setPms)} />)}
                        </SidebarSection>

                        <SidebarSection title="Authentication" open={authOpen} onToggle={() => setAuthOpen(p => !p)}>
                            {AUTH_OPTIONS.map(a => <CheckRow key={a} label={AUTH_LABEL[a]} checked={auths.includes(a)} onChange={() => toggle(auths, a, setAuths)} />)}
                        </SidebarSection>
                    </motion.aside>

                    {/* ── Main Grid ── */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                            <p style={{ fontSize: 14, color: "rgba(238, 238, 238, 0.4)" }}>
                                Showing <span style={{ fontWeight: 800, color: C.light }}>{filtered.length}</span> endpoints
                            </p>
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                                style={{ padding: "10px 16px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: C.light, background: "rgba(238, 238, 238, 0.03)", border: `1px solid rgba(238, 238, 238, 0.1)`, cursor: "pointer", outline: "none" }}>
                                <option value="featured">Featured First</option>
                                <option value="rating">Top Rated</option>
                                <option value="calls">Popularity</option>
                                <option value="latency">Low Latency</option>
                            </select>
                        </div>

                        {filtered.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "100px 24px" }}>
                                <div style={{ fontSize: 64, marginBottom: 24 }}>🔍</div>
                                <h3 style={{ fontSize: 24, fontWeight: 800, color: C.light, marginBottom: 12 }}>No endpoints found</h3>
                                <p style={{ color: "rgba(238, 238, 238, 0.4)", fontSize: 16 }}>Try adjusting your search or filters</p>
                                <button onClick={() => { setQuery(""); setCats([]); setPms([]); setAuths([]); }}
                                    className="btn-primary" style={{ marginTop: 32 }}>
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
                                {filtered.map((api, i) => <ApiCard key={api.id} api={api} index={i} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
