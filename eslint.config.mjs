import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/** Flat config for ESLint 9 + Next 16 (next lint removed). */
const eslintConfig = tseslint.config(
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    extends: [...tseslint.configs.recommended],
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
);

export default eslintConfig;
