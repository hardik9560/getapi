"use client";
import { motion } from "framer-motion";
import { User, Key, Bell, Globe, Trash2, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-8">Settings</motion.h1>
            <div className="space-y-8">
                {/* Profile */}
                <section className="p-6 rounded-2xl bg-surface border border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-6"><User className="w-5 h-5 text-accent" />Profile</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-indigo/20 flex items-center justify-center text-2xl font-bold text-accent">L</div>
                            <button className="px-4 py-2 rounded-xl bg-surface-hover border border-border text-sm hover:bg-border transition-colors">Change Avatar</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="text-sm text-text-secondary mb-1 block">Name</label><input defaultValue="Lisa Wang" className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary focus:outline-none focus:border-accent" /></div>
                            <div><label className="text-sm text-text-secondary mb-1 block">Email</label><input defaultValue="lisa@example.com" className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary focus:outline-none focus:border-accent" /></div>
                        </div>
                        <div><label className="text-sm text-text-secondary mb-1 block">Bio</label><textarea rows={3} placeholder="Tell us about yourself..." className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent resize-none" /></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="text-sm text-text-secondary mb-1 block">Website</label><input placeholder="https://yoursite.com" className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent" /></div>
                            <div><label className="text-sm text-text-secondary mb-1 block">GitHub</label><input placeholder="username" className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent" /></div>
                        </div>
                    </div>
                </section>

                {/* Password */}
                <section className="p-6 rounded-2xl bg-surface border border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-6"><Key className="w-5 h-5 text-accent" />Change Password</h2>
                    <div className="space-y-4 max-w-md">
                        <div><label className="text-sm text-text-secondary mb-1 block">Current Password</label><input type="password" className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary focus:outline-none focus:border-accent" /></div>
                        <div><label className="text-sm text-text-secondary mb-1 block">New Password</label><input type="password" className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary focus:outline-none focus:border-accent" /></div>
                        <div><label className="text-sm text-text-secondary mb-1 block">Confirm New Password</label><input type="password" className="w-full px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-text-primary focus:outline-none focus:border-accent" /></div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="p-6 rounded-2xl bg-surface border border-border">
                    <h2 className="text-lg font-semibold flex items-center gap-2 mb-6"><Bell className="w-5 h-5 text-accent" />Notifications</h2>
                    <div className="space-y-4">
                        {["New component releases", "Price drop alerts", "Order updates", "Newsletter & promotions"].map(label => (
                            <label key={label} className="flex items-center justify-between cursor-pointer">
                                <span className="text-sm text-text-secondary">{label}</span>
                                <div className="relative w-10 h-6 bg-surface-hover rounded-full cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-10 h-6 bg-surface-hover rounded-full peer peer-checked:bg-accent transition-colors" />
                                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-indigo text-white font-medium hover:opacity-90 transition-opacity"><Save className="w-4 h-4" />Save Changes</button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-error hover:bg-error/10 transition-colors text-sm"><Trash2 className="w-4 h-4" />Delete Account</button>
                </div>
            </div>
        </div>
    );
}
