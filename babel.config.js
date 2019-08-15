module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "browsers": [
          "last 2 versions",
          "ie >= 11",
          "safari >= 10"
        ]
      }
    }],
    "@babel/react"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true}],
    ["@babel/transform-runtime"],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-syntax-dynamic-import",
    "syntax-dynamic-import",
    "transform-class-properties",
    ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": true}]
  ],
  "env": {
    "production": {
      "plugins": [
        "transform-react-remove-prop-types"
      ]
    }
  }
}
