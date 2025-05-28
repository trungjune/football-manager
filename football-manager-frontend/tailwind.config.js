/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1890ff',
          dark: '#096dd9',
          light: '#40a9ff',
        },
        secondary: {
          DEFAULT: '#52c41a',
          dark: '#389e0d',
          light: '#73d13d',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Tắt preflight để tránh xung đột với Ant Design
  },
} 