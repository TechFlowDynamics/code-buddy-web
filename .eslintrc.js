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
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": "warn",
  },
};
