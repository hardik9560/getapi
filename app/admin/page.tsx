"use client";
import { motion } from "framer-motion";
import { Users, Package, DollarSign, ShoppingCart, TrendingUp, AlertCircle, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { components, users } from "@/lib/mock-data";

const adminStats = [
    { label: "Total Revenue", value: "$142,892", icon: DollarSign, change: "+18%" },
    { label: "Total Users", value: "15,234", icon: Users, change: "+24%" },
    { label: "Total Components", value: "2,847", icon: Package, change: "+12%" },
    { label: "Active Orders", value: "89", icon: ShoppingCart, change: "+5%" },
];

const pendingReviews = components.slice(0, 3).map(c => ({ ...c, status: "UNDER_REVIEW" as const }));
const recentUsers = users.slice(0, 5);

export default function AdminPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-text-secondary mt-1">Platform overview and management</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {adminStats.map((stat, i) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Reviews */}
                <div className="p-6 rounded-2xl bg-surface border border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-4"><AlertCircle className="w-5 h-5 text-warning" />Pending Reviews ({pendingReviews.length})</h2>
                    <div className="space-y-3">
                        {pendingReviews.map(comp => (
                            <div key={comp.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-hover border border-border">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{comp.category.icon}</span>
                                    <div>
                                        <p className="text-sm font-medium">{comp.name}</p>
                                        <p className="text-xs text-text-muted">by {comp.creator.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                                    <button className="p-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"><XCircle className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Users */}
                <div className="p-6 rounded-2xl bg-surface border border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-4"><Users className="w-5 h-5 text-accent" />Recent Users</h2>
                    <div className="space-y-3">
                        {recentUsers.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-hover border border-border">
                                <div className="flex items-center gap-3">
                                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full bg-surface" />
                                    <div>
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-text-muted">{user.email}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "ADMIN" ? "bg-error/10 text-error" : user.role === "SELLER" ? "bg-accent/10 text-accent" : "bg-surface text-text-muted border border-border"}`}>
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-6"><BarChart3 className="w-5 h-5 text-accent" />Revenue Trend</h2>
                <div className="h-48 flex items-end justify-between gap-2 px-4">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => {
                        const h = [35, 42, 48, 55, 52, 68, 72, 65, 78, 82, 88, 95][i];
                        return (
                            <div key={m} className="flex-1 flex flex-col items-center gap-2">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.5 }}
                                    className="w-full rounded-t-lg bg-gradient-to-t from-accent/80 to-indigo/80" />
                                <span className="text-xs text-text-muted">{m}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
