import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setDarkTheme } from "../../actions/settingsActions"
import { Switch } from "@material-ui/core"

export default function ThemeSwitch(props) {
	const dispatch = useDispatch()
	const darkTheme = useSelector(store => store.settings.darkTheme)

	return (
		<Switch checked={darkTheme} onChange={event => dispatch(setDarkTheme(event.target.checked))}/>
	)
}