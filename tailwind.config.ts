import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        accent: {
          grayblue: {
            DEFAULT: '#6A7DC2',
            dark: '#4E62A5',
          },
          purple: {
            DEFAULT: '#7C23FA',
            dark: '#6A1BFF',
          },
        },
        gray: {
          DEFAULT: '#9CA3AF',
          dark: '#374151',
          light: '#E5E7EB',
        },
        primary: {
          DEFAULT: '#2457FA',
          dark: '#1D47CF',
          darker: '#142F8B',
          light: '#BECDFF',
          lighter: '#DFE7FF',
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
    },
  },
};
export default config;
