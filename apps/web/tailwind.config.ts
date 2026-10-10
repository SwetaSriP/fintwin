import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font-inter)', 'sans-serif'], display: ['var(--font-manrope)', 'sans-serif'] },
    },
  },
  plugins: [],
};

export default config;
