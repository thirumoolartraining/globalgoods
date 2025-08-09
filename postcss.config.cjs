console.log('POSTCSS CWD=', process.cwd());
try { console.log('RESOLVE tailwindcss=', require.resolve('tailwindcss')); } catch {}

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
