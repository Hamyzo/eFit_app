module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: ["airbnb", "eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    quotes: "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "react/jsx-wrap-multilines": "off",
    "linebreak-style": "off",
    "no-underscore-dangle": "off"
  }
};
