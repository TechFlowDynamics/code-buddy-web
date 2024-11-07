module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": "warn",
  },
};
