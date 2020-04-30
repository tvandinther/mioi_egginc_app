const compress_images = require("compress-images")
const path = require("path")

const input_path = "./src/images/*.png"
const output_path = "./public/images/"

//const input_path = path.resolve(__dirname, "src", "images", "*.png")
//const output_path = path.resolve(__dirname, "public", "images")

compress_images(input_path, output_path, {compress_force: true, statistic: true, autoupdate: false}, false,
	{jpg: {engine: false, command: false}},
	{png: {
		engine: 'pngquant',
		command: ["--speed=8", "--force"]
	}},
	{svg: {engine: false, command: false}},
	{gif: {engine: false, command: false}},
	(err) => console.log(err)
)