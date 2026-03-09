import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Get API — Premium UI Components with Live Demos",
  description: "Browse, preview, and download production-ready UI components for React and Next.js. Live demos for every component.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0a0a0f", color: "#f0f0ff", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
        <Header />
        <main style={{ flex: 1, paddingTop: "72px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
