/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'gray-100': '#E3E3E3',
        'gray-200': '#F5F5F5',
        'gray-300': '#828282',
        'blue-sky': '#00B4E4',
        'dark-blue': '#042541',
        'purple': '#9747FF'
      },
    },
  },
  plugins: [],
}