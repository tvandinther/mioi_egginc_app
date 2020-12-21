import React from "react"
import { Tooltip } from "@material-ui/core"
import HelpIcon from "@material-ui/icons/Help"
import { useSelector } from "react-redux"

export default function HelpTooltip(props: { small?: boolean; helpText: string }) {
	const hide = useSelector(store => store.settings.hideTooltips)
	if (hide) return null

	const fontSize = props.small ? "small" : "default"

	return (
		<Tooltip title={props.helpText} enterTouchDelay={300} leaveTouchDelay={5000}>
			<HelpIcon fontSize={fontSize} style={{verticalAlign: "text-bottom"}} color="primary"/>
		</Tooltip>
	)
}