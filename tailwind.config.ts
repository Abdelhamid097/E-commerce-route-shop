import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#fafafa",
                    100: "#f5f5f5",
                    200: "#e5e5e5",
                    300: "#d4d4d4",
                    400: "#a3a3a3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717"
                },
                accent: {
                    midnight: "#2C3E50",
                    black: "#000000",
                    steel: "#AEB6BF",
                    rose: "#E6B0AA"
                },
                ink: "#333333"
            },
            fontFamily: {
                display: ["'DM Sans'", "system-ui", "sans-serif"],
                body: ["'Inter'", "system-ui", "sans-serif"]
            },
            boxShadow: {
                card: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
                "card-hover": "0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)"
            }
        }
    },
    plugins: [require("@tailwindcss/forms")]
};

export default config;
