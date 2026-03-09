"use client";
import { motion } from "framer-motion";
import { Download, Star, FileText } from "lucide-react";
import { samplePurchases, components } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const allPurchases = [
    ...samplePurchases,
    { id: "p4", userId: "u6", component: components[4], componentId: "comp5", licenseType: "PERSONAL" as const, price: 179, createdAt: "2024-10-15" },
    { id: "p5", userId: "u6", component: components[15], componentId: "comp16", licenseType: "TEAM" as const, price: 309, createdAt: "2024-09-20" },
];

export default function PurchasesPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-8">My Purchases</motion.h1>
            <div className="space-y-4">
                {allPurchases.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-accent/10 to-indigo/10 flex items-center justify-center">
                                <span className="text-2xl">{p.component.category.icon}</span>
                            </div>
                            <div>
                                <Link href={`/components/${p.component.slug}`} className="font-semibold hover:text-accent transition-colors">{p.component.name}</Link>
                                <p className="text-sm text-text-muted mt-0.5">{p.licenseType} License • Purchased {p.createdAt}</p>
                                <p className="text-sm text-text-secondary mt-0.5">by {p.component.creator.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 sm:shrink-0">
                            <span className="text-lg font-bold">{formatPrice(p.price)}</span>
                            <button className="p-2.5 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors"><Download className="w-4 h-4" /></button>
                            <button className="p-2.5 rounded-xl bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"><FileText className="w-4 h-4" /></button>
                            <button className="p-2.5 rounded-xl bg-surface-hover text-text-secondary hover:text-warning transition-colors"><Star className="w-4 h-4" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
