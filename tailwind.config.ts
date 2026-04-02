import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        gold: { DEFAULT: '#C9A84C', light: '#E8C97A', dark: '#A8872E' },
        dark: { DEFAULT: '#0D0D0D', 2: '#141414', 3: '#1C1C1C', 4: '#242424', 5: '#2E2E2E' },
        cream: { DEFAULT: '#F5F0E8', 2: '#EDE6D6' },
        border: "hsl(var(--border, 0 0% 20%))",
        input: "hsl(var(--input, 0 0% 20%))",
        ring: "hsl(var(--ring, 43 55% 54%))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary, 0 0% 10%))", foreground: "hsl(var(--secondary-foreground, 0 0% 90%))" },
        destructive: { DEFAULT: "hsl(var(--destructive, 0 84% 60%))", foreground: "hsl(var(--destructive-foreground, 0 0% 98%))" },
        muted: { DEFAULT: "hsl(var(--muted, 0 0% 15%))", foreground: "hsl(var(--muted-foreground, 0 0% 53%))" },
        accent: { DEFAULT: "hsl(var(--accent, 0 0% 15%))", foreground: "hsl(var(--accent-foreground, 0 0% 90%))" },
        popover: { DEFAULT: "hsl(var(--popover, 0 0% 8%))", foreground: "hsl(var(--popover-foreground, 0 0% 90%))" },
        card: { DEFAULT: "hsl(var(--card, 0 0% 8%))", foreground: "hsl(var(--card-foreground, 0 0% 90%))" },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius, 0.5rem)",
        md: "calc(var(--radius, 0.5rem) - 2px)",
        sm: "calc(var(--radius, 0.5rem) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
