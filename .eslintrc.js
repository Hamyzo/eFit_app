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
    "react/jsx-curly-newline": "off",
    "react/prop-types": "off",
    "react/jsx-one-expression-per-line": "off",
    "linebreak-style": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "implicit-arrow-linebreak": "off",
    "operator-linebreak": "off",
    "object-curly-newline": "off",
    "function-paren-newline": "off"
  }
};
