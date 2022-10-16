/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  // 禁用预检
  corePlugins: {
    preflight: false
  },
  // daisyUI 配置
  daisyui: {
    styled: true,
    themes: ['dark', 'emerald'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
  }
}
