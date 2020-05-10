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
          presets: [
			  ["@babel/preset-env", {
				  exclude: ["@babel/plugin-transform-exponentiation-operator"]
			  }], 
			  ["@babel/preset-react"]],
          plugins: [
            [
              'babel-plugin-import',
              {
                libraryName: '@material-ui/core',
                libraryDirectory: '',
                camel2DashComponentName: false
              },
              'core'
            ],
            [
              'babel-plugin-import',
              {
                libraryName: '@material-ui/icons',
                libraryDirectory: '',
                camel2DashComponentName: false
              },
              'icons'
			]
          ],
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        sideEffects: true,
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
  },
  optimization: {
    usedExports: true,
    minimize: true,
  }
};