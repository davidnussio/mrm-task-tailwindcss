const path = require("path");
const { packageJson, template, install } = require("mrm-core");

const postcssConfigFile = "postcss.config.js";
const tailwindConfigFile = "tailwind.config.js";

const fs = require("fs");

module.exports = function task({}) {
  install(["tailwindcss@latest", "postcss@latest", "autoprefixer@latest"], {
    dev: true,
  });

  template(
    postcssConfigFile,
    path.join(__dirname, "templates", postcssConfigFile)
  )
    .apply()
    .save();

  template(
    tailwindConfigFile,
    path.join(__dirname, "templates", tailwindConfigFile)
  )
    .apply()
    .save();

  // const pkg = packageJson();
};

module.exports.description = "Task 123";
module.exports.parameters = {
  tailwindOverrides: {
    type: "config",
  },
};
