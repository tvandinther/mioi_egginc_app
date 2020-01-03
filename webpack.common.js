const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/js/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            [
              'babel-plugin-import',
              {
                'libraryName': '@material-ui/core',
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                'libraryDirectory': '',
                'camel2DashComponentName': false
              },
              'core'
            ],
            [
              'babel-plugin-import',
              {
                'libraryName': '@material-ui/icons',
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                'libraryDirectory': '',
                'camel2DashComponentName': false
              },
              'icons'
            ]
          ],
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ]
      },
    ]
  },
  resolve: {
    descriptionFiles: ["package.json"],
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "/",
    filename: "bundle.js"
  }
};