import { defineConfig } from "vite";
import minifyLiterals from "rollup-plugin-minify-html-literals-v3";
import terser from "@rollup/plugin-terser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...minifyLiterals(),
      apply: "build",
    },
    {
      ...terser(),
      apply: "build",
    },
  ],
});
