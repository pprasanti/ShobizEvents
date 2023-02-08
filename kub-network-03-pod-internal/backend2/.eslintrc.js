module.exports = {
    // extends: "airbnb-base",
    parserOptions: {
        "requireConfigFile": false,
        "babelOptions": {
            "presets": ["@babel/preset-react"]
        }
    },
    rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "implicit-arrow-linebreak": "off",
        "comma-dangle": "off",
        "indent": "off",
        "no-trailing-spaces": "off"
    }
};
