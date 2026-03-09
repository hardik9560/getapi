"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { COLORS as C, STATS } from "@/lib/constants";
import { Package, Users, Download, DollarSign } from "lucide-react";

const ICONS = [Package, Users, Download, DollarSign];
const ACCENTS = ["#c084fc", "#ff6b9d", "#67e8f9", "#6ee7b7"];
const GLOWS = ["rgba(192,132,252,0.25)", "rgba(255,107,157,0.25)", "rgba(103,232,249,0.25)", "rgba(110,231,183,0.25)"];
const BG_GRADS = [
    "linear-gradient(135deg, rgba(192,132,252,0.08), rgba(255,107,157,0.04))",
    "linear-gradient(135deg, rgba(255,107,157,0.08), rgba(255,179,71,0.04))",
    "linear-gradient(135deg, rgba(103,232,249,0.08), rgba(192,132,252,0.04))",
    "linear-gradient(135deg, rgba(110,231,183,0.08), rgba(103,232,249,0.04))",
];

function Counter({ value, prefix, suffix, inView, accent }: { value: number; prefix?: string; suffix?: string; inView: boolean; accent: string }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let c = 0;
        const step = value / (2000 / 16);
        const t = setInterval(() => { c += step; if (c >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(c)); }, 16);
        return () => clearInterval(t);
    }, [inView, value]);
    const d = value >= 1_000_000 ? (count / 1_000_000).toFixed(1) + "M" : value >= 1000 ? (count / 1000).toFixed(count >= value ? 1 : 0) + "K" : count.toString();
    return <span style={{ background: `linear-gradient(135deg, ${accent}, #f0f0ff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{prefix}{d}{suffix}</span>;
}

export default function Stats() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} style={{ position: "relative", padding: "120px 0", background: C.dark }}>
            {/* Decorative divider */}
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.3), rgba(255,107,157,0.3), transparent)" }} />

            {/* Background glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(192,132,252,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 72 }}>
                    <span className="badge-purple" style={{ marginBottom: 20 }}>📊 Platform Stats</span>
                    <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: C.light, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 12 }}>
                        Numbers that{" "}
                        <span style={{ background: "linear-gradient(135deg, #c084fc, #ff6b9d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            speak
                        </span>
                    </h2>
                    <p style={{ marginTop: 16, fontSize: 17, color: "rgba(240,240,255,0.4)", fontWeight: 500 }}>Hard data from thousands of developers who ship with us.</p>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                    {STATS.map((stat, i) => {
                        const Icon = ICONS[i];
                        return (
                            <motion.div key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                style={{ padding: "44px 32px", borderRadius: 28, background: BG_GRADS[i], border: `1px solid ${ACCENTS[i]}20`, textAlign: "center", position: "relative", overflow: "hidden", backdropFilter: "blur(20px)", cursor: "default", transition: "box-shadow 0.3s ease" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${GLOWS[i]}`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                            >
                                {/* Glossy top shine */}
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)", pointerEvents: "none" }} />
                                {/* Corner decoration */}
                                <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENTS[i]}25 0%, transparent 70%)`, pointerEvents: "none" }} />

                                <div style={{ width: 56, height: 56, borderRadius: 18, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", background: `${ACCENTS[i]}15`, border: `1px solid ${ACCENTS[i]}30`, boxShadow: `0 0 20px ${ACCENTS[i]}25` }}>
                                    <Icon size={24} color={ACCENTS[i]} />
                                </div>
                                <p style={{ fontSize: "clamp(32px, 3vw, 44px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
                                    <Counter value={stat.value} prefix={(stat as { prefix?: string }).prefix} suffix={(stat as { suffix?: string }).suffix} inView={inView} accent={ACCENTS[i]} />
                                </p>
                                <p style={{ marginTop: 10, fontSize: 12, color: "rgba(240,240,255,0.35)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
