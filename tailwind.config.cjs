const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    path.join(__dirname, 'client/index.html'),
    path.join(__dirname, 'client/src/**/*.{js,ts,jsx,tsx,html}'),
    path.join(__dirname, 'shared/**/*.ts'),
    path.join(__dirname, 'shared/**/*.tsx')
  ],
  safelist: [
    { pattern: /^(container|mx-auto|grid|flex|gap-\d+|p-\d+|px-\d+|py-\d+|rounded-\w+|shadow(\-\w+)?|text-(xs|sm|base|lg|xl|2xl|3xl)|bg-(white|black|slate|gray|neutral)-(50|100|200|300|400|500))/ }
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
    },
  },
  plugins: [],
};
