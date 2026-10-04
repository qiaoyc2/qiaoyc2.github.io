import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "legacy/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Last, so it can switch off the stylistic rules Prettier already handles.
  prettier,
];

export default eslintConfig;
