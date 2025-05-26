/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#e9eef5',
          200: '#d5dfe9',
          300: '#b3c5d7',
          400: '#8aa3be',
          500: '#6883a5',
          600: '#526a8c',
          700: '#435672',
          800: '#3a4a60',
          900: '#343f51',
          950: '#23293a',
        },
        accent: {
          50: '#fcf5f0',
          100: '#f9e9dc',
          200: '#f2d1b8',
          300: '#e8b28a',
          400: '#e0945f',
          500: '#d77e41',
          600: '#c76835',
          700: '#a6512c',
          800: '#884329',
          900: '#703a26',
          950: '#3c1c12',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
          950: '#282828',
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};