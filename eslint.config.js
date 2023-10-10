import { garavest } from "@garavest/eslint-config";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  garavest.global,
  garavest.javascript,
  garavest.svelte,
  garavest.typescript,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json"
      }
    }
  }
];
