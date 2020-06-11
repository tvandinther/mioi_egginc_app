import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { hideTooltips } from "../../actions/settingsActions"
import { Switch, ListItem, ListItemText } from "@material-ui/core"
import ReactGA from "react-ga"

export default function HideTooltipsSwitch(props) {
	const dispatch = useDispatch()
	const hidden = useSelector(store => store.settings.hideTooltips)

	const handleChange = event => {
		dispatch(hideTooltips(event.target.checked))
		ReactGA.event({
			category: "Appearance",
			action: !hidden ? "Tooltips Hidden" : "Tooltips Shown",
		})
	}

	return (
		<ListItem>
			<Switch checked={hidden} onChange={handleChange}/>
			<ListItemText primary="Hide Tooltips"/>
		</ListItem>
	)
}