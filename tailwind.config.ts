import { join } from "path";

import { skeleton } from "@skeletonlabs/tw-plugin";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}")
  ],
  darkMode: "class",
  plugins: [
    forms,
    typography,
    skeleton({
      themes: { preset: [{ enhancements: true, name: "wintry" }] }
    })
  ],
  theme: {
    extend: {}
  }
} satisfies Config;

export default config;
