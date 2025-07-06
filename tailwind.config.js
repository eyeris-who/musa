/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        'float-up': 'floatUp 2s ease-out forwards',
        'glow': 'glow 1s ease-in-out infinite',
      },
      keyframes: {
        floatUp: {
          '0%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate(-50%, -200px) scale(1)',
          },
        },
        glow: {
          '0%': {
            textShadow: '0 0 10px var(--color-accent), 0 0 20px var(--color-accent), 0 0 30px var(--color-accent)',
            color: 'var(--color-accent)',
          },
          '100%': {
            textShadow: '0 0 10px var(--color-accent), 0 0 20px var(--color-accent), 0 0 30px var(--color-accent)',
            color: 'var(--color-accent)',
          },
        },
      },
    },
  },
  plugins: [],
} 