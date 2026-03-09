"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code, Monitor, Smartphone, Tablet, Copy, Check, Maximize2, RotateCcw } from "lucide-react";

const C = { blue: "#3F72AF", navy: "#112D4E", mist: "#DBE2EF", snow: "#F9F7F7", textMute: "#6b7fa3" };

interface LiveDemoProps {
    componentName: string;
    demoHtml: string;       // raw HTML string to render in iframe srcdoc
    code: string;           // code to show in code tab
    height?: number;
}

type DeviceMode = "desktop" | "tablet" | "mobile";
type TabMode = "preview" | "code";

const DEVICE_WIDTHS: Record<DeviceMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px",
};

export default function LiveDemo({ componentName, demoHtml, code, height = 420 }: LiveDemoProps) {
    const [tab, setTab] = useState<TabMode>("preview");
    const [device, setDevice] = useState<DeviceMode>("desktop");
    const [copied, setCopied] = useState(false);
    const [key, setKey] = useState(0);

    const copyCode = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div style={{ borderRadius: 16, border: `1.5px solid ${C.mist}`, overflow: "hidden", background: "#fff", boxShadow: "0 4px 24px rgba(17,45,78,0.07)" }}>
            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: C.snow, borderBottom: `1px solid ${C.mist}` }}>
                {/* Tab switcher */}
                <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 10, padding: 3, border: `1px solid ${C.mist}` }}>
                    {(["preview", "code"] as TabMode[]).map(t => (
                        <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab === t ? "active" : ""}`} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {t === "preview" ? <Monitor size={13} /> : <Code size={13} />}
                            {t === "preview" ? "Live Preview" : "Code"}
                        </button>
                    ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Device switcher (preview only) */}
                    {tab === "preview" && (
                        <div style={{ display: "flex", gap: 2 }}>
                            {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as [DeviceMode, typeof Monitor][]).map(([d, Icon]) => (
                                <button key={d} onClick={() => setDevice(d)}
                                    style={{ width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", background: device === d ? C.blue : "transparent", color: device === d ? "#fff" : C.textMute, transition: "all 0.2s" }}
                                >
                                    <Icon size={14} />
                                </button>
                            ))}
                        </div>
                    )}
                    {/* Reload */}
                    {tab === "preview" && (
                        <button onClick={() => setKey(k => k + 1)}
                            style={{ width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", background: "transparent", color: C.textMute, transition: "all 0.2s" }}
                            title="Reload"
                        >
                            <RotateCcw size={14} />
                        </button>
                    )}
                    {/* Copy code */}
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={copyCode}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: copied ? "1px solid rgba(26,127,55,0.3)" : `1px solid ${C.mist}`, background: copied ? "rgba(26,127,55,0.08)" : "#fff", color: copied ? "#1a7f37" : C.blue, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                    >
                        {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Code</>}
                    </motion.button>
                </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {tab === "preview" ? (
                    <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", background: "#f6f8fc", padding: "20px 16px", minHeight: height + 40 }}
                    >
                        <div style={{ width: DEVICE_WIDTHS[device], maxWidth: "100%", transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)", borderRadius: device !== "desktop" ? 16 : 0, overflow: "hidden", boxShadow: device !== "desktop" ? "0 8px 32px rgba(17,45,78,0.14)" : "none", border: device !== "desktop" ? `1px solid ${C.mist}` : "none" }}>
                            <iframe
                                key={key}
                                srcDoc={demoHtml}
                                title={`Live demo: ${componentName}`}
                                style={{ width: "100%", height: height, border: "none", display: "block", background: "#fff" }}
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="code" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <pre style={{ background: C.navy, color: "#DBE2EF", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.8, padding: "20px 24px", overflowX: "auto", margin: 0, maxHeight: height + 80 }}>
                            <code>{code}</code>
                        </pre>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
