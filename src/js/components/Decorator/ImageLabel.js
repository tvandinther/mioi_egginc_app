import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyle = makeStyles(theme => ({
	root: {
		
		"&>img": {
			height: 100,
		}
	}
}))

export default function ImageLabel(props) {
	const { imageSrc, label, height } = props

	return (
		<div>
			<img height={height} src={imageSrc}/>
			<Typography align="center">{label}</Typography>
		</div>
	)
}