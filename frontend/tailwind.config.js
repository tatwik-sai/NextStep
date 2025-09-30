/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                plasmaWaves: {
                    '0%, 100%': {
                        transform: 'translate(0, 0) scale(1) rotate(0deg)',
                        opacity: '1'
                    },
                    '25%': {
                        transform: 'translate(20px, -15px) scale(1.05) rotate(1deg)',
                        opacity: '0.8'
                    },
                    '50%': {
                        transform: 'translate(-15px, 10px) scale(0.95) rotate(-1deg)',
                        opacity: '1'
                    },
                    '75%': {
                        transform: 'translate(10px, -20px) scale(1.02) rotate(0.5deg)',
                        opacity: '0.9'
                    },
                },
                plasmaRotate: {
                    '0%': { transform: 'rotate(0deg) scale(1)' },
                    '33%': { transform: 'rotate(120deg) scale(1.1)' },
                    '66%': { transform: 'rotate(240deg) scale(0.9)' },
                    '100%': { transform: 'rotate(360deg) scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                barGrow: {
                    'from': { height: '0' },
                },
                progressFill: {
                    'from': { width: '0%' },
                    'to': { width: '85%' },
                },
                fadeInUp: {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                'plasma-waves': 'plasmaWaves 18s ease-in-out infinite',
                'plasma-rotate': 'plasmaRotate 25s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse': 'pulse 2s ease-in-out infinite',
                'bar-grow': 'barGrow 1.5s ease-out',
                'progress-fill': 'progressFill 2s ease-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
            },
            backgroundImage: {
                'conic-gradient': 'conic-gradient(from 0deg at 50% 50%, rgba(219, 234, 254, 0.06) 0deg, rgba(191, 219, 254, 0.08) 60deg, rgba(147, 197, 253, 0.05) 120deg, rgba(239, 246, 255, 0.07) 180deg, rgba(191, 219, 254, 0.04) 240deg, rgba(147, 197, 253, 0.06) 300deg, rgba(219, 234, 254, 0.06) 360deg)',
            },
            textShadow: {
                'sm': '0 1px 3px rgba(0,0,0,0.1)',
            },
            spacing: {
                '15': '3.75rem',
            }
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.text-shadow-sm': {
                    textShadow: '0 1px 3px rgba(0,0,0,0.1)',
                },
            }
            addUtilities(newUtilities)
        }
    ],
}