"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, ShoppingBag, Heart, Star, DollarSign, Download, ArrowRight, TrendingUp } from "lucide-react";
import { samplePurchases } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

const stats = [
    { label: "Total Purchases", value: "12", icon: ShoppingBag, color: "text-accent" },
    { label: "Total Spent", value: "$2,847", icon: DollarSign, color: "text-success" },
    { label: "Wishlist Items", value: "8", icon: Heart, color: "text-error" },
    { label: "Reviews Given", value: "5", icon: Star, color: "text-warning" },
];

const sidebarLinks = [
    { label: "Overview", href: "/dashboard", icon: TrendingUp },
    { label: "Purchases", href: "/dashboard/purchases", icon: ShoppingBag },
    { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { label: "Settings", href: "/dashboard/settings", icon: Package },
    { label: "Billing", href: "/dashboard/billing", icon: DollarSign },
];

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:block w-56 shrink-0">
                    <nav className="sticky top-24 space-y-1">
                        {sidebarLinks.map(link => (
                            <Link key={link.href} href={link.href}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors">
                                <link.icon className="w-4 h-4" />{link.label}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-border">
                            <Link href="/dashboard/seller"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-accent hover:bg-accent/10 transition-colors">
                                <Package className="w-4 h-4" />Seller Dashboard
                            </Link>
                        </div>
                    </nav>
                </aside>

                {/* Main */}
                <div className="flex-1 min-w-0 space-y-8">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold">Welcome back, Lisa!</h1>
                        <p className="text-text-secondary mt-1">Here&apos;s what&apos;s happening with your account</p>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                className="p-4 rounded-2xl bg-surface border border-border">
                                <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-text-muted">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Purchases */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Recent Purchases</h2>
                            <Link href="/dashboard/purchases" className="text-sm text-accent hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
                        </div>
                        <div className="space-y-3">
                            {samplePurchases.map((p, i) => (
                                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                                    className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><span>{p.component.category.icon}</span></div>
                                        <div>
                                            <p className="font-medium text-sm">{p.component.name}</p>
                                            <p className="text-xs text-text-muted">{p.licenseType} License • {p.createdAt}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold">{formatPrice(p.price)}</span>
                                        <button className="p-2 rounded-lg hover:bg-surface-hover transition-colors text-text-muted hover:text-accent"><Download className="w-4 h-4" /></button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
