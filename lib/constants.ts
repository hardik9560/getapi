export const SITE_NAME = "Get API";
export const SITE_DESCRIPTION = "Premium UI Component Library with Live Demos";
export const SITE_URL = "https://getapi.dev";

// ── Glossy Pastel Aurora Palette ──
export const COLORS = {
    // Backgrounds
    dark: "#0a0a0f",
    gray: "#13131f",
    panel: "#1a1a2e",
    // Pastels / Glossy accents
    rose: "#ff6b9d",
    peach: "#ffb347",
    lavender: "#c084fc",
    sky: "#67e8f9",
    mint: "#6ee7b7",
    lemon: "#fde68a",
    // Text
    light: "#f0f0ff",
    muted: "rgba(240,240,255,0.45)",
    // Aliases kept for backward compat
    teal: "#67e8f9",
    glass: "rgba(255,255,255,0.04)",
    glassBorder: "rgba(255,255,255,0.08)",
    // Gradients
    gradPrimary: "linear-gradient(135deg, #c084fc 0%, #ff6b9d 100%)",
    gradWarm: "linear-gradient(135deg, #fde68a 0%, #ffb347 50%, #ff6b9d 100%)",
    gradCool: "linear-gradient(135deg, #67e8f9 0%, #c084fc 100%)",
    gradGreen: "linear-gradient(135deg, #6ee7b7 0%, #67e8f9 100%)",
};

export const NAV_LINKS = [
    { label: "Browse", href: "/components" },
    { label: "APIs", href: "/apis" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const CATEGORIES = [
    "Hero Sections",
    "Navigation Bars",
    "Dashboards",
    "Forms",
    "Cards",
    "Modals",
    "Sidebars",
    "Landing Pages",
    "Authentication Pages",
    "Pricing Tables",
    "Footers",
    "Data Tables",
    "Charts",
    "E-commerce Components",
    "Blog Templates",
    "Animation Components",
    "3D Components",
];

export const FRAMEWORKS = ["React", "Next.js", "Vue", "Svelte"];
export const STYLINGS = ["Tailwind CSS", "CSS Modules", "Styled Components"];

export const LICENSE_TIERS = {
    PERSONAL: {
        name: "Personal",
        priceRange: "$99 - $199",
        features: [
            "Single project use",
            "1 developer",
            "6 months updates",
            "Community support",
        ],
    },
    TEAM: {
        name: "Team",
        priceRange: "$199 - $399",
        features: [
            "Up to 5 projects",
            "10 developers",
            "12 months updates",
            "Priority email support",
        ],
        popular: true,
    },
    ENTERPRISE: {
        name: "Enterprise",
        priceRange: "$399 - $599",
        features: [
            "Unlimited projects",
            "Unlimited developers",
            "Lifetime updates",
            "Dedicated support",
            "Custom modifications",
        ],
    },
};

export const SORT_OPTIONS = [
    { label: "Most Popular", value: "popular" },
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Highest Rated", value: "rating" },
    { label: "Most Downloaded", value: "downloads" },
];

export const STATS = [
    { label: "Total Components", value: 2847, suffix: "+" },
    { label: "Active Developers", value: 15200, suffix: "+" },
    { label: "Total Downloads", value: 892000, suffix: "+" },
    { label: "Total Sales", value: 4200000, prefix: "$" },
];

export const SOCIAL_LINKS = {
    github: "https://github.com",
    twitter: "https://twitter.com",
    discord: "https://discord.com",
    linkedin: "https://linkedin.com",
};
