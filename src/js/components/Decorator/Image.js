import React from "react"
import { getImageSrc } from "../../tools"

export default function Image(props) {
	const { newProps, itemId } = props
	console.log(getImageSrc(itemId))
	return (
		<img
			{...newProps}
			src={getImageSrc(itemId)}
		/>
	)
}