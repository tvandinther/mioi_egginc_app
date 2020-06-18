import React from "react"
import { getImageSrc } from "../../tools"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	inline: {
		height: "1.2em",
		verticalAlign: "text-bottom",
	},
}))

export default function Image(props) {
	const { newProps, itemId } = props
	const classes = useStyle()
	
	function composeClassNames() {
		return Array.from(arguments).join(" ")
	}

	return (
		<img
			{...newProps}
			className={composeClassNames(props.inline ? classes.inline : null, props.className)}
			src={getImageSrc(itemId)}
		/>
	)
}