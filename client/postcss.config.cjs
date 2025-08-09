const path = require("path");
module.exports = {
  plugins: {
    // Force the plugin to load THIS config, regardless of CWD/autodiscovery
    tailwindcss: {
      config: path.resolve(__dirname, "tailwind.config.cjs"),
    },
    autoprefixer: {},
  },
};
