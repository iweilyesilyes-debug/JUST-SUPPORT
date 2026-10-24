import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050507",
          900: "#08080b",
          850: "#0b0b10",
          800: "#101017",
          700: "#17171f",
          600: "#20202b",
        },
        brand: {
          50: "#fff1f3",
          100: "#ffe0e4",
          200: "#ffc4cc",
          300: "#ff96a4",
          400: "#ff5c71",
          500: "#f52744",
          600: "#e11d2e",
          700: "#bd1026",
          800: "#9c1123",
          900: "#821325",
        },
        gold: {
          300: "#ffe08a",
          400: "#f7cc5b",
          500: "#eab308",
          600: "#ca9a04",
        },
      },
      fontFamily: {
        display: ["Chakra Petch", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "Chakra Petch", "system-ui", "sans-serif"],
        arabic: ["Inter", "Chakra Petch", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(225, 29, 46, 0.55)",
        "glow-sm": "0 0 24px -8px rgba(225, 29, 46, 0.6)",
        card: "0 24px 70px -30px rgba(0, 0, 0, 0.9)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "radial-brand":
          "radial-gradient(circle at 50% 0%, rgba(225,29,46,0.22), transparent 60%)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.4s ease-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.8s linear infinite",
        "fade-up": "fadeUp .7s cubic-bezier(.2,.7,.2,1) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(.85)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
