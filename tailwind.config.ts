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
      }
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