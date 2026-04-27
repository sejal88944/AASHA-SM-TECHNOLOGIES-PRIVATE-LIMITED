/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d5f7',
          300: '#9fb4ef',
          400: '#6b87e3',
          500: '#3d5cc9',
          600: '#2f4ab0',
          700: '#273d96',
          800: '#1e3078',
          900: '#172554',
          950: '#0f1a3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh':
          'linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #f1f5f9 100%)',
        'cta-blue':
          'linear-gradient(135deg, #172554 0%, #1e3078 50%, #273d96 100%)',
      },
      boxShadow: {
        soft: '0 2px 12px -2px rgba(15, 26, 61, 0.08)',
        card: '0 4px 24px -6px rgba(15, 26, 61, 0.1)',
      },
    },
  },
  plugins: [],
}
