import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDarkTheme } from "../../actions/settingsActions"
import { Switch, ListItem, ListItemText } from "@material-ui/core"
import ReactGA from "react-ga"

export default function ThemeSwitch(props) {
	const dispatch = useDispatch()
	const darkTheme = useSelector(store => store.settings.darkTheme)

	const handleChange = event => {
		dispatch(setDarkTheme(event.target.checked))
		ReactGA.event({
			category: "Theme",
			action: !darkTheme ? "Dark Theme Enabled" : "Light Theme Enabled",
		})
	}

	return (
		<ListItem>
			<Switch checked={darkTheme} onChange={handleChange}/>
			<ListItemText primary="Dark Theme"/>
		</ListItem>
	)
}