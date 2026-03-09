"use client";
import { motion } from "framer-motion";
import { CreditCard, FileText, ExternalLink } from "lucide-react";

const payments = [
    { id: 1, date: "2024-12-01", description: "Aurora Hero Section - Personal", amount: "$149", status: "Completed" },
    { id: 2, date: "2024-11-20", description: "SaaS Landing Page Kit - Team", amount: "$399", status: "Completed" },
    { id: 3, date: "2024-10-15", description: "Holographic Card Stack - Personal", amount: "$179", status: "Completed" },
    { id: 4, date: "2024-09-20", description: "Scroll Animation Kit - Team", amount: "$309", status: "Completed" },
];

export default function BillingPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-8">Billing</motion.h1>
            <div className="space-y-8">
                <section className="p-6 rounded-2xl bg-surface border border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-4"><CreditCard className="w-5 h-5 text-accent" />Payment Methods</h2>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-hover border border-border">
                        <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold">VISA</div>
                        <div><p className="text-sm font-medium">•••• •••• •••• 4242</p><p className="text-xs text-text-muted">Expires 12/26</p></div>
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-success/10 text-success text-xs">Default</span>
                    </div>
                    <button className="mt-3 text-sm text-accent hover:underline flex items-center gap-1">Manage payment methods <ExternalLink className="w-3 h-3" /></button>
                </section>

                <section className="p-6 rounded-2xl bg-surface border border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-4"><FileText className="w-5 h-5 text-accent" />Payment History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-border text-left text-text-muted">
                                <th className="pb-3">Date</th><th className="pb-3">Description</th><th className="pb-3">Amount</th><th className="pb-3">Status</th><th className="pb-3"></th>
                            </tr></thead>
                            <tbody>{payments.map(p => (
                                <tr key={p.id} className="border-b border-border/50">
                                    <td className="py-3 text-text-secondary">{p.date}</td>
                                    <td className="py-3">{p.description}</td>
                                    <td className="py-3 font-semibold">{p.amount}</td>
                                    <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs">{p.status}</span></td>
                                    <td className="py-3"><button className="text-accent hover:underline text-xs">Invoice</button></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
