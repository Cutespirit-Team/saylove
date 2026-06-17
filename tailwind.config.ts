import type { Config } from "tailwindcss";

const config: Config = {
  // Tailwind is scoped to a prefix so its preflight/reset does NOT override the
  // original Bootstrap + custom CSS that reproduces the site 1:1. Use `tw-`
  // prefixed utilities (e.g. `tw-flex`) for any new styling.
  prefix: "tw-",
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
