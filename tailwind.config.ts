import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'p code': {
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              color: '#007acc',
              padding: '4px',
            },
          },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
