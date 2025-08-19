import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B46C1',
          dark: '#553C9A',
          light: '#9F7AEA'
        },
        text: {
          DEFAULT: '#2D3748',
          light: '#4A5568'
        }
      },
      opacity: {
        '85': '0.85',
        '90': '0.90',
        '95': '0.95',
      },
      transitionProperty: {
        'all': 'all',
      },
      scale: {
        '105': '1.05',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-delay': 'fadeIn 1s ease-in 0.5s forwards',
        'fade-in-delay-2': 'fadeIn 1s ease-in 1s forwards',
        'float-slow': 'floatSlow 12s ease-in-out infinite',
        'float-medium': 'floatMedium 8s ease-in-out infinite',
        'float-fast': 'floatFast 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin 10s linear infinite reverse',
        'bounce-gentle': 'bounceGentle 5s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0)' },
          '25%': { transform: 'translateY(-20px) translateX(15px) rotate(5deg)' },
          '50%': { transform: 'translateY(0) translateX(30px) rotate(0)' },
          '75%': { transform: 'translateY(20px) translateX(15px) rotate(-5deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '33%': { transform: 'translateY(-15px) translateX(-15px) scale(1.1)' },
          '66%': { transform: 'translateY(15px) translateX(15px) scale(0.9)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0)' },
          '25%': { transform: 'translateY(-10px) translateX(-10px) rotate(-5deg)' },
          '75%': { transform: 'translateY(10px) translateX(10px) rotate(5deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.1)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  safelist: [
    'bg-primary',
    'hover:bg-primary-dark',
    'text-primary',
    'hover:text-primary',
    'border-primary',
  ],
  plugins: [],
}
export default config 