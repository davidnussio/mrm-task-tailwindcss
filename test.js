jest.mock("fs");
const fs = jest.requireActual("fs");

jest.mock("mrm-core/src/util/log", () => ({
  added: jest.fn(),
}));

jest.mock("mrm-core/src/npm", () => ({
  install: jest.fn(),
}));

const path = require("path");
const { getTaskOptions } = require("mrm");
const { install } = require("mrm-core");
const task = require("./index");
const { vol } = require("memfs");
const { beforeEach } = require("jest-circus");

const stringify = (o) => JSON.stringify(o, null, "  ");

afterEach(() => {
  console.log("fdjkalsfdlaksdjf askdjflksa jd");
  vol.reset();
  install.mockClear();
});

it("should not install ", async () => {
  vol.fromJSON({
    [`${__dirname}/templates/tailwind.config.js`]: fs
      .readFileSync(path.join(__dirname, "templates/tailwind.config.js"))
      .toString(),
    [`${__dirname}/templates/postcss.config.js`]: fs
      .readFileSync(path.join(__dirname, "templates/postcss.config.js"))
      .toString(),
  });

  task(await getTaskOptions(task, false, {}));

  expect(install.mock.calls).toEqual([
    [
      ["tailwindcss@latest", "postcss@latest", "autoprefixer@latest"],
      { dev: true },
    ],
  ]);

  expect(vol.toJSON()["/tailwind.config.js"]).toMatchInlineSnapshot(`
"// tailwind.config.js
module.exports = {
  mode: \\"jit\\",
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
"
`);

  expect(vol.toJSON()["/postcss.config.js"]).toMatchInlineSnapshot(`
"// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"
`);
});
