/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1890ff',
          light: '#69c0ff',
          dark: '#096dd9',
        },
        secondary: {
          DEFAULT: '#52c41a',
          light: '#95de64',
          dark: '#389e0d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Tắt preflight để tránh xung đột với Ant Design
  },
  important: true,
} 