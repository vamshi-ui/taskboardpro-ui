/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false, // Disable the reset
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
}