"use client";
import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-text-muted mb-8">Last updated: January 1, 2025</p>
                <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
                    {[
                        { title: "1. Information We Collect", body: "We collect information you provide directly, including name, email, payment details, and profile information. We also collect usage data such as pages visited, features used, and device information." },
                        { title: "2. How We Use Your Information", body: "We use your information to provide and improve our services, process transactions, send transactional emails, provide customer support, and personalize your experience." },
                        { title: "3. Information Sharing", body: "We do not sell your personal information. We share data with: payment processors (Stripe) for transaction processing, analytics providers for service improvement, and law enforcement when legally required." },
                        { title: "4. Data Security", body: "We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits. However, no method of electronic transmission is 100% secure." },
                        { title: "5. Cookies", body: "We use essential cookies for authentication, preference cookies for your settings, and analytics cookies (with consent) to understand how you use our platform." },
                        { title: "6. Your Rights", body: "You have the right to access, correct, or delete your personal data. You can export your data at any time through your account settings. EU users have additional rights under GDPR." },
                        { title: "7. Data Retention", body: "We retain your data for as long as your account is active. Upon account deletion, personal data is removed within 30 days, though anonymized analytics data may be retained." },
                        { title: "8. Changes", body: "We may update this policy periodically. We will notify you of significant changes via email and update the 'Last updated' date." },
                    ].map(s => (
                        <section key={s.title}>
                            <h2 className="text-lg font-semibold text-text-primary">{s.title}</h2>
                            <p>{s.body}</p>
                        </section>
                    ))}
                    <section>
                        <h2 className="text-lg font-semibold text-text-primary">9. Contact</h2>
                        <p>For privacy inquiries, contact us at <a href="mailto:privacy@componentvault.com" className="text-accent hover:underline">privacy@componentvault.com</a>.</p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
