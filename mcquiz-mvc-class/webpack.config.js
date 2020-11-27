const path = require("path");

module.exports = {
  // エントリーポイントの設定
  mode: "production",
  entry: "./js/src/app.js",
  // ビルド後、'./dist/my-bundle.js'というbundleファイルを生成する
  output: {
    path: path.resolve(__dirname, "./js/dist/"),
    filename: "bundle.js",
  },
};
