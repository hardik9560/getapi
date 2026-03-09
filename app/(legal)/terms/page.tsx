"use client";
import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                <p className="text-text-muted mb-8">Last updated: January 1, 2025</p>
                <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
                    {[
                        { title: "1. Acceptance of Terms", body: "By accessing and using ComponentVault, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree, please do not use our service." },
                        { title: "2. Use License", body: "Permission is granted to use the purchased components in accordance with the selected license tier. Personal licenses allow use in one project by one developer. Team licenses allow use in up to five projects by ten developers. Enterprise licenses provide unlimited usage rights." },
                        { title: "3. Restrictions", body: "You may not redistribute, resell, or sublicense the component source code. You may not claim authorship of purchased components. You may not use components in competing marketplace products." },
                        { title: "4. Payments", body: "All sales are processed securely via Stripe. Prices are listed in USD. We offer a 14-day money-back guarantee for all purchases." },
                        { title: "5. Intellectual Property", body: "Sellers retain copyright of their components. Buyers receive a license to use the components as specified. ComponentVault retains all rights to the platform, branding, and services." },
                        { title: "6. Termination", body: "We reserve the right to terminate accounts that violate these terms. Upon termination, purchased component licenses remain valid." },
                        { title: "7. Limitation of Liability", body: "ComponentVault shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from use of the platform or purchased components." },
                        { title: "8. Changes to Terms", body: "We reserve the right to modify these terms at any time. Users will be notified of significant changes via email." },
                    ].map(s => (
                        <section key={s.title}>
                            <h2 className="text-lg font-semibold text-text-primary">{s.title}</h2>
                            <p>{s.body}</p>
                        </section>
                    ))}
                    <section>
                        <h2 className="text-lg font-semibold text-text-primary">9. Contact</h2>
                        <p>For questions about these terms, contact us at <a href="mailto:legal@componentvault.com" className="text-accent hover:underline">legal@componentvault.com</a>.</p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
