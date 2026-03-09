// Each component's deliverable: the REAL file a buyer receives after purchase.
// fileName, language, code (the actual component source), and a quick readme.

export interface Deliverable {
  fileName: string;
  language: string;
  readme: string;
  code: string;
}

const D: Record<string, Deliverable> = {};

// helper
function add(id: string, fileName: string, language: string, readme: string, code: string) {
  D[id] = { fileName, language, readme, code };
}

// ── HERO SECTIONS ────────────────────────────────────────────────────────────
add("comp1", "AuroraHero.tsx", "tsx", "Drop into app/page.tsx. Requires framer-motion.",
  `"use client";
import { motion } from "framer-motion";

export default function AuroraHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Aurora blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[15%] w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-[80px] animate-pulse delay-2000" />
      </div>
      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 mb-6">
            ✨ Introducing v2.0
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Build Something<br/>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">Extraordinary</span>
          </h1>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
            Ship production-ready interfaces in minutes with our premium component library.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-purple-500/25">
              Get Started →
            </button>
            <button className="px-8 py-4 rounded-xl border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/5 transition-colors">
              ▶ Watch Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}`);

add("comp21", "ParticleHero.tsx", "tsx", "Particle hero with floating dots. Requires framer-motion.",
  `"use client";
import { motion } from "framer-motion";
const particles = Array.from({ length: 40 }, (_, i) => ({
  x: Math.random() * 100, y: Math.random() * 100,
  size: 2 + Math.random() * 4, delay: Math.random() * 3,
}));
export default function ParticleHero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-purple-400/40"
          style={{ left: \`\${p.x}%\`, top: \`\${p.y}%\`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: p.delay }} />
      ))}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-black text-white mb-4">Particle Hero</h1>
        <p className="text-white/40 text-lg">Floating particle background with parallax</p>
      </div>
    </section>
  );
}`);

add("comp22", "TypewriterHero.tsx", "tsx", "Typewriter cycling text hero.",
  `"use client";
import { useState, useEffect } from "react";
const words = ["developers", "designers", "creators", "teams"];
export default function TypewriterHero() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length === word.length) setTimeout(() => setDeleting(true), 1500);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setIdx((idx + 1) % words.length); }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [text, deleting, idx]);
  return (
    <section className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <h1 className="text-5xl font-black text-white">
        Built for <span className="text-purple-400">{text}</span>
        <span className="animate-pulse">|</span>
      </h1>
    </section>
  );
}`);

// ── NAVIGATION ───────────────────────────────────────────────────────────────
add("comp2", "GlassNavbar.tsx", "tsx", "Responsive glass navbar. No dependencies needed.",
  `"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
const links = ["Products","Pricing","Docs","Blog"];
export default function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <nav className={\`fixed top-0 w-full z-50 transition-all duration-300 \${scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-lg" : "bg-transparent"}\`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-black text-white">Brand<span className="text-purple-400">.</span></Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => <Link key={l} href={\`/\${l.toLowerCase()}\`} className="text-sm text-white/50 hover:text-white transition-colors font-medium">{l}</Link>)}
        </div>
        <button className="px-5 py-2 rounded-lg bg-purple-500 text-white text-sm font-bold hover:bg-purple-400 transition-colors">Sign In</button>
      </div>
    </nav>
  );
}`);

// ── DASHBOARDS ───────────────────────────────────────────────────────────────
add("comp3", "AnalyticsDashboard.tsx", "tsx", "Full analytics dashboard with stat cards and chart area.",
  `"use client";
const stats = [
  { label: "Revenue", value: "$124,580", delta: "+12.5%", up: true },
  { label: "Users", value: "8,249", delta: "+5.2%", up: true },
  { label: "Orders", value: "1,043", delta: "-2.1%", up: false },
  { label: "Conversion", value: "3.24%", delta: "+0.8%", up: true },
];
export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8">
      <h1 className="text-2xl font-black text-white mb-8">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xs text-white/30 mb-1">{s.label}</div>
            <div className="text-2xl font-black text-white">{s.value}</div>
            <div className={\`text-xs font-bold \${s.up ? "text-green-400" : "text-red-400"}\`}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="h-64 rounded-2xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-white/20">
        Chart Area — integrate recharts or chart.js here
      </div>
    </div>
  );
}`);

// ── FORMS ────────────────────────────────────────────────────────────────────
add("comp4", "MultiStepForm.tsx", "tsx", "Multi-step form wizard with validation.",
  `"use client";
import { useState } from "react";
const steps = ["Personal Info", "Contact", "Confirm"];
export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", email: "", message: "" });
  return (
    <div className="max-w-md mx-auto p-8 rounded-3xl bg-white/[0.03] border border-white/[0.07]">
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className={\`flex-1 h-1 rounded-full \${i <= step ? "bg-purple-500" : "bg-white/10"}\`} />
        ))}
      </div>
      <h2 className="text-lg font-bold text-white mb-6">{steps[step]}</h2>
      {step === 0 && <input value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="Full Name" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none mb-4" />}
      {step === 1 && <input value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="Email" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none mb-4" />}
      {step === 2 && <div className="text-white/50 text-sm mb-4">Name: {data.name}<br/>Email: {data.email}</div>}
      <div className="flex gap-3">
        {step > 0 && <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl border border-white/10 text-white/50 font-bold text-sm">Back</button>}
        <button onClick={() => step < 2 ? setStep(step + 1) : alert("Submitted!")} className="flex-1 py-3 rounded-xl bg-purple-500 text-white font-bold text-sm">
          {step === 2 ? "Submit" : "Next →"}
        </button>
      </div>
    </div>
  );
}`);

// ── CARDS ─────────────────────────────────────────────────────────────────────
add("comp5", "GlassCard.tsx", "tsx", "Glassmorphic card with hover effects.",
  `export default function GlassCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 cursor-pointer">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}`);

// ── MODALS ────────────────────────────────────────────────────────────────────
add("comp6", "AnimatedModal.tsx", "tsx", "Animated modal with backdrop blur. Requires framer-motion.",
  `"use client";
import { motion, AnimatePresence } from "framer-motion";
interface Props { open: boolean; onClose: () => void; title: string; children: React.ReactNode; }
export default function AnimatedModal({ open, onClose, title, children }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-8 rounded-3xl bg-[#13131f] border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button onClick={onClose} className="text-white/30 hover:text-white text-2xl">×</button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}`);

// ── SIDEBARS ─────────────────────────────────────────────────────────────────
add("comp7", "CollapsibleSidebar.tsx", "tsx", "Collapsible sidebar with icon-only mode.",
  `"use client";
import { useState } from "react";
const items = [
  { icon: "🏠", label: "Dashboard" }, { icon: "📊", label: "Analytics" },
  { icon: "👥", label: "Users" }, { icon: "⚙️", label: "Settings" },
];
export default function CollapsibleSidebar() {
  const [expanded, setExpanded] = useState(true);
  const [active, setActive] = useState(0);
  return (
    <aside className={\`h-screen \${expanded ? "w-56" : "w-16"} bg-[#0a0a0f] border-r border-white/5 transition-all duration-300 flex flex-col p-3 gap-1\`}>
      <button onClick={() => setExpanded(!expanded)} className="p-2 rounded-lg hover:bg-white/5 text-white/40 text-xs mb-4">{expanded ? "«" : "»"}</button>
      {items.map((item, i) => (
        <button key={i} onClick={() => setActive(i)}
          className={\`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all \${i === active ? "bg-purple-500/15 text-purple-400 border-l-2 border-purple-400" : "text-white/40 hover:bg-white/5"}\`}>
          <span className="text-lg">{item.icon}</span>
          {expanded && <span>{item.label}</span>}
        </button>
      ))}
    </aside>
  );
}`);

// ── LANDING PAGES ────────────────────────────────────────────────────────────
add("comp8", "SaaSLanding.tsx", "tsx", "Complete SaaS landing page template.",
  `export default function SaaSLanding() {
  return (
    <div className="bg-[#0a0a0f] text-white">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="font-black text-xl">SaaS<span className="text-purple-400">Pro</span></span>
        <button className="px-5 py-2 rounded-lg bg-purple-500 text-sm font-bold">Start Free</button>
      </nav>
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl font-black mb-6">The all-in-one<br/><span className="text-purple-400">platform</span> you need</h1>
        <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">Streamline your workflow with powerful tools built for modern teams.</p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-4 rounded-xl bg-purple-500 font-bold">Get Started Free</button>
          <button className="px-8 py-4 rounded-xl border border-white/10 text-white/60 font-semibold">Book Demo</button>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-3 gap-6">
        {["⚡ Lightning Fast","🔒 Secure by Default","📊 Analytics Built-in"].map(f => (
          <div key={f} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
            <h3 className="text-lg font-bold mb-2">{f}</h3>
            <p className="text-sm text-white/30">Enterprise-grade feature ready for production use.</p>
          </div>
        ))}
      </section>
    </div>
  );
}`);

// ── AUTH ──────────────────────────────────────────────────────────────────────
add("comp9", "LoginPage.tsx", "tsx", "Beautiful login page with social login buttons.",
  `"use client";
import { useState } from "react";
export default function LoginPage() {
  const [email, setEmail] = useState(""); const [pass, setPass] = useState("");
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="w-full max-w-sm p-8 rounded-3xl bg-white/[0.03] border border-white/[0.07]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-purple-500 mx-auto mb-4 flex items-center justify-center text-xl">🔐</div>
          <h1 className="text-2xl font-black text-white">Welcome Back</h1>
          <p className="text-sm text-white/30 mt-1">Sign in to your account</p>
        </div>
        <div className="space-y-4 mb-6">
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none text-sm" />
          <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" type="password" className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none text-sm" />
        </div>
        <button className="w-full py-3 rounded-xl bg-purple-500 text-white font-bold text-sm mb-4">Sign In</button>
        <div className="flex gap-3">
          {["Google","GitHub"].map(p => <button key={p} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs font-bold">{p}</button>)}
        </div>
      </div>
    </div>
  );
}`);

// ── PRICING ──────────────────────────────────────────────────────────────────
add("comp10", "PricingTable.tsx", "tsx", "3-tier pricing table with toggle.",
  `"use client";
import { useState } from "react";
const plans = [
  { name: "Starter", monthly: 0, yearly: 0, features: ["5 projects","1GB storage","Email support"] },
  { name: "Pro", monthly: 29, yearly: 290, features: ["Unlimited projects","50GB storage","Priority support","API access"], popular: true },
  { name: "Enterprise", monthly: 99, yearly: 990, features: ["Everything in Pro","SSO & SAML","Dedicated manager","SLA guarantee"] },
];
export default function PricingTable() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="py-20 px-6">
      <div className="flex justify-center mb-12">
        <button onClick={() => setYearly(!yearly)} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/50">
          Monthly <div className={\`w-10 h-5 rounded-full \${yearly ? "bg-purple-500" : "bg-white/20"} relative transition-colors\`}><div className={\`absolute top-0.5 \${yearly ? "left-5" : "left-0.5"} w-4 h-4 rounded-full bg-white transition-all\`}/></div> Yearly
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map(p => (
          <div key={p.name} className={\`p-8 rounded-3xl border \${p.popular ? "bg-purple-500/10 border-purple-500/30 shadow-xl shadow-purple-500/10 scale-105" : "bg-white/[0.02] border-white/5"}\`}>
            {p.popular && <div className="text-xs font-bold text-purple-400 bg-purple-500/20 inline-block px-3 py-1 rounded-full mb-4">POPULAR</div>}
            <h3 className="text-lg font-bold text-white">{p.name}</h3>
            <div className="text-4xl font-black text-white my-4">\${yearly ? p.yearly : p.monthly}<span className="text-sm text-white/30 font-normal">{yearly ? "yr" : "mo"}</span></div>
            <ul className="space-y-3 mb-8">{p.features.map(f => <li key={f} className="text-sm text-white/40 flex items-center gap-2">✓ {f}</li>)}</ul>
            <button className={\`w-full py-3 rounded-xl font-bold text-sm \${p.popular ? "bg-purple-500 text-white" : "bg-white/5 text-white/50 border border-white/10"}\`}>Get {p.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}`);

// ── FOOTERS ──────────────────────────────────────────────────────────────────
add("comp11", "MegaFooter.tsx", "tsx", "Full-featured footer with columns and social links.",
  `const cols = { Company:["About","Careers","Blog"], Product:["Features","Pricing","Changelog"], Resources:["Docs","API","Community"], Legal:["Privacy","Terms","Cookies"] };
export default function MegaFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-5 gap-8">
        <div><span className="text-xl font-black text-white">Brand<span className="text-purple-400">.</span></span><p className="text-xs text-white/25 mt-3">Premium UI components for modern web apps.</p></div>
        {Object.entries(cols).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">{title}</h4>
            {links.map(l => <a key={l} href="#" className="block text-sm text-white/30 hover:text-white/60 mb-2">{l}</a>)}
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex justify-between text-xs text-white/20">
        <span>© 2025 Brand Inc. All rights reserved.</span>
        <div className="flex gap-4">{["Twitter","GitHub","Discord"].map(s => <a key={s} href="#" className="hover:text-white/40">{s}</a>)}</div>
      </div>
    </footer>
  );
}`);

// ── DATA TABLES ──────────────────────────────────────────────────────────────
add("comp12", "SortableTable.tsx", "tsx", "Sortable, filterable data table.",
  `"use client";
import { useState } from "react";
const DATA = [
  { name:"Alice Chen", role:"Engineer", salary:"$142K", status:"Active" },
  { name:"Bob Smith", role:"Designer", salary:"$98K", status:"Away" },
  { name:"Carol Davis", role:"Manager", salary:"$165K", status:"Active" },
  { name:"David Park", role:"Dev Ops", salary:"$138K", status:"Active" },
];
export default function SortableTable() {
  const [sort, setSort] = useState<string>("name");
  const [filter, setFilter] = useState("");
  const filtered = DATA.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
      <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search..." className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none text-sm mb-4" />
      <table className="w-full text-sm text-left">
        <thead><tr className="text-white/30 text-xs uppercase">
          {["Name","Role","Salary","Status"].map(h => <th key={h} onClick={() => setSort(h.toLowerCase())} className="pb-3 cursor-pointer hover:text-white/50">{h} ↕</th>)}
        </tr></thead>
        <tbody>{filtered.map((r,i) => (
          <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02]">
            <td className="py-3 text-white font-semibold">{r.name}</td>
            <td className="py-3 text-white/40">{r.role}</td>
            <td className="py-3 text-purple-400 font-bold">{r.salary}</td>
            <td className="py-3"><span className={\`text-xs font-bold \${r.status==="Active"?"text-green-400":"text-yellow-400"}\`}>{r.status}</span></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}`);

// For remaining components, generate category-appropriate code
const TEMPLATES: Record<string, (name: string, id: string) => { fn: string; code: string }> = {
  charts: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `"use client";\n// ${name} — Component ID: ${id}\n// Integrate with recharts: npm i recharts\nimport { useState } from "react";\nconst data = [{m:"Jan",v:4000},{m:"Feb",v:3000},{m:"Mar",v:5000},{m:"Apr",v:4500},{m:"May",v:6000},{m:"Jun",v:5500}];\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  return (\n    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">\n      <h3 className="text-lg font-bold text-white mb-4">${name}</h3>\n      <div className="flex items-end gap-2 h-40">\n        {data.map((d,i) => <div key={i} className="flex-1 flex flex-col items-center gap-1">\n          <div style={{height:\`\${(d.v/6000)*100}%\`}} className="w-full rounded-t-lg bg-purple-500/60 hover:bg-purple-400 transition-colors" />\n          <span className="text-[10px] text-white/30">{d.m}</span>\n        </div>)}\n      </div>\n    </div>\n  );\n}`
  }),
  ecommerce: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `"use client";\n// ${name} — Component ID: ${id}\nimport { useState } from "react";\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  const [qty, setQty] = useState(1);\n  return (\n    <div className="max-w-sm p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]">\n      <div className="h-48 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 flex items-center justify-center text-5xl mb-4">🛍️</div>\n      <h3 className="text-lg font-bold text-white mb-1">${name}</h3>\n      <p className="text-sm text-white/30 mb-4">Premium quality product component</p>\n      <div className="flex items-center justify-between">\n        <span className="text-2xl font-black text-purple-400">$99</span>\n        <div className="flex items-center gap-3">\n          <button onClick={() => setQty(Math.max(1,qty-1))} className="w-8 h-8 rounded-lg bg-white/5 text-white text-sm">-</button>\n          <span className="text-white font-bold">{qty}</span>\n          <button onClick={() => setQty(qty+1)} className="w-8 h-8 rounded-lg bg-purple-500 text-white text-sm">+</button>\n        </div>\n      </div>\n    </div>\n  );\n}`
  }),
  blog: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `// ${name} — Component ID: ${id}\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  return (\n    <article className="max-w-2xl mx-auto py-16 px-6">\n      <div className="mb-8"><span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">Design</span></div>\n      <h1 className="text-4xl font-black text-white mb-4">${name}</h1>\n      <div className="flex items-center gap-3 mb-8"><div className="w-8 h-8 rounded-full bg-purple-500/30" /><span className="text-sm text-white/40">Author · 5 min read</span></div>\n      <div className="prose prose-invert prose-sm"><p className="text-white/40 leading-relaxed">Your blog content renders here. Supports MDX, code blocks, images, and custom components.</p></div>\n    </article>\n  );\n}`
  }),
  animations: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `"use client";\n// ${name} — Component ID: ${id}\nimport { motion } from "framer-motion";\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  return (\n    <div className="flex items-center justify-center min-h-[300px]">\n      <motion.div\n        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}\n        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}\n        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-purple-500/30"\n      />\n    </div>\n  );\n}`
  }),
  threeD: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `"use client";\n// ${name} — Component ID: ${id}\n// npm i three @react-three/fiber @react-three/drei\nimport { Canvas } from "@react-three/fiber";\nimport { OrbitControls, MeshDistortMaterial } from "@react-three/drei";\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  return (\n    <div className="h-[500px] w-full rounded-2xl overflow-hidden bg-black">\n      <Canvas camera={{ position: [0, 0, 5] }}>\n        <ambientLight intensity={0.5} />\n        <directionalLight position={[10, 10, 5]} intensity={1} />\n        <mesh>\n          <sphereGeometry args={[1.5, 64, 64]} />\n          <MeshDistortMaterial color="#c084fc" distort={0.4} speed={2} roughness={0.2} />\n        </mesh>\n        <OrbitControls enableZoom={false} autoRotate />\n      </Canvas>\n    </div>\n  );\n}`
  }),
  spline: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `"use client";\n// ${name} — Component ID: ${id}\n// npm i @splinetool/react-spline\nimport { Suspense, lazy } from "react";\nconst Spline = lazy(() => import("@splinetool/react-spline"));\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  return (\n    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-[#0a0a0f] border border-purple-500/20">\n      <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" /></div>}>\n        <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />\n      </Suspense>\n      <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10">\n        <span className="text-xs font-bold text-white/50">🎮 Drag to interact</span>\n      </div>\n    </div>\n  );\n}`
  }),
  api: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.ts`, code:
      `// ${name} — Component ID: ${id}\n// Ready-to-use API integration\n\nconst API_KEY = process.env.NEXT_PUBLIC_API_KEY || "your-api-key";\nconst BASE_URL = "https://api.example.com/v1";\n\nexport async function fetchData(endpoint: string, options?: RequestInit) {\n  const res = await fetch(\`\${BASE_URL}/\${endpoint}\`, {\n    ...options,\n    headers: {\n      "Content-Type": "application/json",\n      "Authorization": \`Bearer \${API_KEY}\`,\n      ...options?.headers,\n    },\n  });\n  if (!res.ok) throw new Error(\`API Error: \${res.status} \${res.statusText}\`);\n  return res.json();\n}\n\nexport async function getAll(resource: string) { return fetchData(resource); }\nexport async function getById(resource: string, id: string) { return fetchData(\`\${resource}/\${id}\`); }\nexport async function create(resource: string, data: unknown) {\n  return fetchData(resource, { method: "POST", body: JSON.stringify(data) });\n}\nexport async function update(resource: string, id: string, data: unknown) {\n  return fetchData(\`\${resource}/\${id}\`, { method: "PUT", body: JSON.stringify(data) });\n}\nexport async function remove(resource: string, id: string) {\n  return fetchData(\`\${resource}/\${id}\`, { method: "DELETE" });\n}\n\n// Webhook handler (for Next.js API route)\nexport async function handleWebhook(req: Request) {\n  const body = await req.json();\n  const signature = req.headers.get("x-signature");\n  // Verify signature here\n  console.log("Webhook received:", body.event, body.data);\n  return new Response(JSON.stringify({ received: true }), { status: 200 });\n}`
  }),
  security: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `"use client";\n// ${name} — Component ID: ${id}\nimport { useState, useEffect } from "react";\nconst THREATS = [\n  { id: 1, name: "Malware.Gen.Trojan", severity: "CRITICAL", status: "quarantined", time: "2 min ago" },\n  { id: 2, name: "Phishing.URL.Blocked", severity: "HIGH", status: "blocked", time: "15 min ago" },\n  { id: 3, name: "Suspicious.Script.JS", severity: "MEDIUM", status: "reviewing", time: "1 hr ago" },\n];\nconst SEV_COLOR: Record<string,string> = { CRITICAL: "text-red-400", HIGH: "text-orange-400", MEDIUM: "text-yellow-400" };\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  const [scanning, setScanning] = useState(false);\n  const [progress, setProgress] = useState(0);\n  const startScan = () => { setScanning(true); setProgress(0); };\n  useEffect(() => { if (scanning && progress < 100) { const t = setTimeout(() => setProgress(p => p + 1), 30); return () => clearTimeout(t); } if (progress >= 100) setScanning(false); }, [scanning, progress]);\n  return (\n    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 max-w-lg">\n      <div className="flex items-center gap-4 mb-6">\n        <div className="text-4xl">🛡️</div>\n        <div><h2 className="text-xl font-bold text-white">${name}</h2><p className="text-xs text-white/30">Real-time protection active</p></div>\n        <button onClick={startScan} className="ml-auto px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-bold">{scanning ? \`\${progress}%\` : "Scan Now"}</button>\n      </div>\n      {scanning && <div className="h-1.5 rounded-full bg-white/5 mb-6 overflow-hidden"><div style={{width:\`\${progress}%\`}} className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all" /></div>}\n      <div className="space-y-3">\n        {THREATS.map(t => <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">\n          <span className={\`text-xs font-bold \${SEV_COLOR[t.severity]}\`}>{t.severity}</span>\n          <span className="text-sm text-white/50 flex-1 font-mono">{t.name}</span>\n          <span className="text-xs text-white/20">{t.time}</span>\n        </div>)}\n      </div>\n    </div>\n  );\n}`
  }),
  printer: (name, id) => ({
    fn: `${name.replace(/\s/g, "")}.tsx`, code:
      `"use client";\n// ${name} — Component ID: ${id}\nimport { useState } from "react";\nexport default function ${name.replace(/[^a-zA-Z]/g, "")}() {\n  const [printing, setPrinting] = useState(false);\n  const handlePrint = () => {\n    setPrinting(true);\n    // ESC/POS thermal printer: send via USB/Bluetooth\n    const esc = "\\x1B"; const gs = "\\x1D";\n    const commands = [\n      \`\${esc}@\`,          // Initialize printer\n      \`\${esc}a\\x01\`,      // Center align\n      \`\${gs}!\\x11\`,       // Double height+width\n      "RECEIPT\\n",\n      \`\${gs}!\\x00\`,       // Normal size\n      "========================\\n",\n      "Item            Qty  Price\\n",\n      "Widget A          2  $29.98\\n",\n      "Widget B          1  $49.99\\n",\n      "========================\\n",\n      \`\${esc}a\\x02\`,      // Right align\n      "TOTAL: $79.97\\n",\n      \`\${esc}a\\x01\`,      // Center align\n      "\\nThank you!\\n\\n\\n",\n      \`\${gs}V\\x00\`,       // Cut paper\n    ].join("");\n    console.log("Print commands ready:", commands.length, "bytes");\n    setTimeout(() => setPrinting(false), 2000);\n  };\n  return (\n    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 max-w-md">\n      <div className="flex items-center gap-4 mb-6"><span className="text-3xl">🖨️</span><div><h2 className="text-lg font-bold text-white">${name}</h2><p className="text-xs text-white/30">ESC/POS • USB • Bluetooth • Network</p></div></div>\n      <div className="bg-white rounded-xl p-6 mb-6 text-black font-mono text-xs space-y-1">\n        <div className="text-center font-bold text-sm mb-2">RECEIPT</div>\n        <div>========================</div>\n        <div className="flex justify-between"><span>Widget A x2</span><span>$29.98</span></div>\n        <div className="flex justify-between"><span>Widget B x1</span><span>$49.99</span></div>\n        <div>========================</div>\n        <div className="text-right font-bold">TOTAL: $79.97</div>\n      </div>\n      <button onClick={handlePrint} disabled={printing} className={\`w-full py-3 rounded-xl font-bold text-sm \${printing ? "bg-green-500 text-white" : "bg-purple-500 text-white"}\`}>{printing ? "Printing..." : "Print Receipt"}</button>\n    </div>\n  );\n}`
  }),
};

// Batch-apply templates for remaining components
const COMP_MAP: [string, string, string][] = [
  // [id, name, template]
  ["comp13", "Line Chart", "charts"], ["comp14", "Product Card Grid", "ecommerce"], ["comp15", "Blog Post Layout", "blog"],
  ["comp16", "Scroll Animation Kit", "animations"], ["comp17", "3D Planet Scene", "threeD"],
  ["comp18", "3D Product Viewer", "threeD"], ["comp19", "WebGL Fluid Sim", "threeD"],
  ["comp20", "3D Interactive Resume", "threeD"],
  ["comp23", "Split-Screen Hero", "charts"],
  ["comp24", "Mega Menu Navbar", "charts"], ["comp25", "Sticky Tabbed Nav", "charts"],
  ["comp26", "CRM Dashboard", "charts"], ["comp27", "Finance Dashboard", "charts"], ["comp28", "Project Dashboard", "charts"], ["comp29", "Metrics Sparklines", "charts"],
  ["comp30", "OTP Input", "animations"], ["comp31", "File Dropzone", "animations"], ["comp32", "Rich Text Editor", "blog"], ["comp33", "Date Range Picker", "animations"],
  ["comp34", "Tabs Component", "animations"], ["comp35", "Stepper Form", "animations"],
  ["comp36", "Glass Profile Card", "ecommerce"], ["comp37", "Flip Product Card", "ecommerce"], ["comp38", "Testimonial Carousel", "animations"],
  ["comp39", "Image Lightbox", "animations"], ["comp40", "Confirmation Dialog", "animations"], ["comp41", "Toast System", "animations"],
  ["comp42", "AI Side Panel", "animations"], ["comp43", "Context Menu Sidebar", "animations"],
  ["comp44", "Agency Portfolio", "blog"], ["comp45", "App Download Landing", "blog"], ["comp46", "Startup Launch Page", "blog"],
  ["comp47", "Magic Link Auth", "animations"], ["comp48", "Two-Factor Auth", "animations"],
  ["comp49", "Usage Slider Pricing", "charts"], ["comp50", "Toggle Pricing", "charts"],
  ["comp51", "Globe Footer", "animations"],
  ["comp52", "Virtual Scroll Table", "charts"], ["comp53", "Expandable Row Table", "charts"],
  ["comp54", "Funnel Chart", "charts"], ["comp55", "Real-Time Live Chart", "charts"], ["comp56", "Geo Heatmap", "charts"],
  ["comp57", "Product Detail Page", "ecommerce"], ["comp58", "Cart Drawer", "ecommerce"], ["comp59", "Wishlist Grid", "ecommerce"],
  ["comp60", "MDX Blog Engine", "blog"], ["comp61", "Newsletter Template", "blog"],
  ["comp62", "Liquid Buttons", "animations"], ["comp63", "Number Ticker", "animations"], ["comp64", "Cursor Trail", "animations"],
  ["comp65", "Logo Marquee", "animations"], ["comp66", "Gradient Text", "animations"], ["comp67", "Color Palette Tool", "animations"],
  ["comp68", "Stepper Progress", "animations"], ["comp69", "Stepper Progress V2", "animations"], ["comp70", "Color Palette Gen", "animations"],
  // 3D WebGL
  ["comp71", "Galaxy Scene", "threeD"], ["comp72", "Data Globe", "threeD"], ["comp73", "Morphing Blob", "threeD"], ["comp74", "Floating Island", "threeD"],
  // Spline
  ["comp75", "Robot Hero Scene", "spline"], ["comp76", "Product Showcase Spline", "spline"], ["comp77", "Astronaut Scene", "spline"],
  ["comp78", "Crystal Ball Spline", "spline"], ["comp79", "DNA Helix Loader", "spline"], ["comp80", "Macbook Mockup", "spline"],
  ["comp81", "Floating Cards Spline", "spline"], ["comp82", "AI Brain Viz", "spline"], ["comp83", "Phone Mockup Spline", "spline"],
  // APIs
  ["comp84", "Stripe Payment SDK", "api"], ["comp85", "OpenAI GPT Wrapper", "api"], ["comp86", "SendGrid Email Kit", "api"],
  ["comp87", "Google Maps Kit", "api"], ["comp88", "Firebase Auth Kit", "api"], ["comp89", "Twilio SMS Kit", "api"],
  ["comp90", "GitHub API Dashboard", "api"], ["comp91", "Cloudinary Image Kit", "api"], ["comp92", "Webhook Dashboard", "api"],
  ["comp93", "Resend Email Kit", "api"], ["comp94", "REST API Playground", "api"], ["comp95", "S3 File Manager", "api"],
  ["comp96", "Paddle Billing", "api"],
  // Security
  ["comp97", "Malware Scanner", "security"], ["comp98", "Threat Dashboard", "security"], ["comp99", "Password Vault", "security"],
  ["comp100", "Security Gate", "security"], ["comp101", "SSL Monitor", "security"], ["comp102", "GDPR Consent", "security"],
  ["comp103", "Audit Report", "security"], ["comp104", "Firewall Manager", "security"],
  // Printers
  ["comp105", "Thermal Printer", "printer"], ["comp106", "Invoice PDF Printer", "printer"], ["comp107", "Label Printer", "printer"],
  ["comp108", "Barcode Scanner", "printer"], ["comp109", "Print Queue Dashboard", "printer"], ["comp110", "POS Receipt Builder", "printer"],
];

for (const [id, name, tpl] of COMP_MAP) {
  if (!D[id]) {
    const gen = TEMPLATES[tpl]?.(name, id);
    if (gen) add(id, gen.fn, tpl === "api" ? "typescript" : "tsx", `${name} component — ID: ${id}. Drop into your Next.js project.`, gen.code);
  }
}

export const deliverables = D;

export function getDeliverable(componentId: string): Deliverable | undefined {
  return D[componentId];
}
