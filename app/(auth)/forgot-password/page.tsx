"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-indigo flex items-center justify-center"><Package className="w-5 h-5 text-white" /></div>
                    </Link>
                    <h1 className="text-2xl font-bold">Reset your password</h1>
                    <p className="text-text-secondary mt-1">Enter your email and we&apos;ll send you a reset link</p>
                </div>
                <form className="space-y-4">
                    <div><label className="text-sm text-text-secondary mb-1 block">Email</label>
                        <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent" /></div>
                    <button type="button" className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-indigo text-white font-semibold hover:opacity-90 transition-opacity">Send Reset Link</button>
                </form>
                <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-accent transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
            </motion.div>
        </div>
    );
}
