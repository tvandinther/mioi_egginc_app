import React from "react"
import {composeClassNames, getImageSrc} from "../../tools"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	inline: {
		height: "1.2em",
		verticalAlign: "text-bottom",
	},
}))

type Props = {
	inline?: boolean;
	className?: string;
	itemId: string | number;
	[key: string]: any;
}

export default function Image(props: Props) {
	const { itemId, className, inline, ...newProps } = props
	const classes = useStyle()
	const inheritedClassName = className ?? ""

	return (
		<img
			{...newProps}
			className={composeClassNames(inline ? classes.inline : "", inheritedClassName)}
			src={getImageSrc(itemId)}
		/>
	)
}