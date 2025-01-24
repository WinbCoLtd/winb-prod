import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
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
        "winb-yellow": "#FCDB02",
        "winb-blue": "#BCDEFF",
        "winb-ash":"#5a5467",
        "winb-border":"#9dadd7",             
        "winb-blue-border":"#8fa1d1",
        "winb-ashborder":"#b2b2b2",
        "winb-ashcolor":"#fafafa",
        "winb-formblue":"#7e68b9"
        
      },
      maxWidth: {
        "winb-max-1366": "1366px",
        "winb-max-1166": "1166px",
      },
      backgroundImage: {
        "hero-image": "url('/home/hero-image.svg')",
        "home-vehicle": "url('/home/homeVehicle.svg')",
        "company-profile": "url('/companyProfile/companyprofile.svg')",
      }
         
    
    },
  },
  plugins: [],
} satisfies Config;
