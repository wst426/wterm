const { defineConfig } = require("rollup");
const typescript = require("@rollup/plugin-typescript");

export default defineConfig([
  {
    input: "./main/index.ts",
    output: {
      file: "./dist/main.js",
      format: "cjs"
    },
    plugins: [typescript()]
  },
  {
    input: "./preload/index.ts",
    output: {
      file: "./dist/preload.js",
      format: "cjs"
    },
    plugins: [typescript()]
  },
  {
    input: "./render/index.ts",
    output: {
      file: "./dist/render.js",
      format: "iife"
    },
    plugins: [typescript()]
  }
]);