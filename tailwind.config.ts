import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "winb-highlight-bg": "#CBC#FD",
        "winb-text-dark-blue": "#002A96",
        "winb-yellow": "#FCDB02"
      },
      width: {
        "winb-max-1366": "1366px",
        "winb-max-1166": "1166px",

      },
    
    },
  },
  plugins: [],
} satisfies Config;
