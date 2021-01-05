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

type Props = {
	imageSrc: string;
	itemId?: string | number;
	label: string;
	height: number;
}

export default function ImageLabel(props: Props) {
	const { imageSrc, itemId, label, height } = props

	let src = imageSrc ?? (itemId ? getImageSrc(itemId) : "")

	return (
		<div>
			<img height={height} src={src}/>
			<Typography align="center">{label}</Typography>
		</div>
	)
}