/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh':
          'linear-gradient(135deg, #eff6ff 0%, #ffffff 45%, #dbeafe 100%)',
        'cta-blue':
          'linear-gradient(120deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 100%)',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(37, 99, 235, 0.12)',
        card: '0 8px 30px -8px rgba(30, 64, 175, 0.1)',
      },
    },
  },
  plugins: [],
}
