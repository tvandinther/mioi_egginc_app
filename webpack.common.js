const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json")

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
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
  plugins: [
	  new webpack.DefinePlugin({
		  VERSION: JSON.stringify(pkg.version),
		  TRACKING_ID: JSON.stringify("UA-120158257-2")
	  })
  ],
  resolve: {
    descriptionFiles: ["package.json"],
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, "public/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  optimization: {
    usedExports: true,
    minimize: true,
  }
};