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
    extend: {
      keyframes: {
        "confirm-fade": { from: { opacity: "0" } },
        "confirm-pop": {
          from: { opacity: "0", transform: "scale(0.96) translateY(6px)" },
        },
      },
      animation: {
        "confirm-fade": "confirm-fade 0.15s ease-out",
        "confirm-pop": "confirm-pop 0.16s cubic-bezier(0.2, 0.8, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
