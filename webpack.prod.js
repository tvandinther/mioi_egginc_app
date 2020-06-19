const merge = require("webpack-merge")
const common = require("./webpack.common")
const path = require("path")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

module.exports = merge(common, {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.(png)$/,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							pngquant: {
								quality: [0.65, 0.9],
								speed: 8,
								strip: true,
								verbose: true,
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		// new BundleAnalyzerPlugin()
	],
	output: {
		path: path.join(__dirname, "public/"),
		publicPath: "/",
		filename: "bundle.js",
		chunkFilename: "[name].bundle.js"
	}
})