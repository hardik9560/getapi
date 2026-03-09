"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, DollarSign, Download, Eye, Package, Plus, TrendingUp, Star } from "lucide-react";
import { components } from "@/lib/mock-data";

const myComponents = components.filter(c => c.creatorId === "u1");
const stats = [
    { label: "Total Revenue", value: "$24,892", icon: DollarSign, change: "+12%" },
    { label: "Total Sales", value: "347", icon: TrendingUp, change: "+8%" },
    { label: "Total Downloads", value: "12.4K", icon: Download, change: "+15%" },
    { label: "Avg Rating", value: "4.8", icon: Star, change: "+0.1" },
];

export default function SellerDashboardPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex items-center justify-between">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="text-3xl font-bold">Seller Dashboard</h1>
                    <p className="text-text-secondary mt-1">Manage your components and earnings</p>
                </motion.div>
                <Link href="/dashboard/seller/components/new"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent to-indigo text-white font-medium hover:opacity-90 transition-opacity">
                    <Plus className="w-4 h-4" /> Upload Component
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="p-5 rounded-2xl bg-surface border border-border">
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon className="w-5 h-5 text-accent" />
                            <span className="text-xs font-medium text-success">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-text-muted">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-6"><BarChart3 className="w-5 h-5 text-accent" />Revenue Overview</h2>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => {
                        const h = [40, 55, 45, 65, 80, 70, 85, 90, 75, 95, 88, 100][i];
                        return (
                            <div key={m} className="flex-1 flex flex-col items-center gap-2">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.5 }}
                                    className="w-full rounded-t-lg bg-gradient-to-t from-accent to-indigo" />
                                <span className="text-xs text-text-muted">{m}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* My Components */}
            <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-accent" />My Components</h2>
                <div className="space-y-3">
                    {myComponents.map((comp, i) => (
                        <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                            className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><span>{comp.category.icon}</span></div>
                                <div>
                                    <p className="font-medium">{comp.name}</p>
                                    <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-warning text-warning" />{comp.averageRating}</span>
                                        <span className="flex items-center gap-1"><Download className="w-3 h-3" />{comp.downloadCount}</span>
                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{comp.downloadCount * 3}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">Published</span>
                                <Link href={`/components/${comp.slug}`} className="text-sm text-accent hover:underline">View</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
