/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/testPortal/**/*.{js,jsx}',
  ],
  // The rest of the site already has its own hand-written CSS. Disabling
  // Preflight keeps Tailwind's base reset from changing the look of any
  // existing page — Tailwind utility classes are still fully available,
  // but only inside the new Test Portal module (see `content` above).
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F26522',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
