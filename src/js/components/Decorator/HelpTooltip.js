import React from "react"
import { Tooltip } from "@material-ui/core"
import HelpIcon from "@material-ui/icons/Help"

export default function HelpTooltip(props) {
	const children = props.children

	return (
		<Tooltip title={props.helpText}>
			<HelpIcon color="primary"/>
		</Tooltip>
	)
}