import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import { getImageSrc } from "../../tools"

const useStyle = makeStyles(theme => ({
	root: {
		
		"&>img": {
			height: 100,
		}
	}
}))

export default function ImageLabel(props) {
	const { imageSrc, itemId, label, height } = props

	let src = imageSrc || getImageSrc(itemId)

	return (
		<div>
			<img height={height} src={src}/>
			<Typography align="center">{label}</Typography>
		</div>
	)
}