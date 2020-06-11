import React from "react"
import { Tooltip } from "@material-ui/core"
import HelpIcon from "@material-ui/icons/Help"
import { useSelector } from "react-redux"

export default function HelpTooltip(props) {
	const hide = useSelector(store => store.settings.hideTooltips)
	let fontSize = props.small ? "small" : "default"
	if (hide) return null
	return (
		<Tooltip title={props.helpText}>
			<HelpIcon fontSize={fontSize} style={{verticalAlign: "text-bottom"}} color="primary"/>
		</Tooltip>
	)
}