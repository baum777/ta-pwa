/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#00FF66',
          blue: '#00D4FF',
          purple: '#B000FF',
        },
      },
    },
  },
  plugins: [],
}
