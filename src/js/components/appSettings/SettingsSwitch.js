import React from "react"
import { useDispatch, useSelector } from "react-redux"
import settingsActions from "../../actions"
import { Switch, ListItem, ListItemText } from "@material-ui/core"
import ReactGA from "react-ga"

function SettingsSwitch(props, ref) {
	const dispatch = useDispatch()
	const { store: storePath, action, label, metrics } = props
	const state = useSelector(store => store.settings[storePath])

	const handleChange = event => {
		dispatch(settingsActions[action](event.target.checked))
		ReactGA.event({
			category: metrics.category,
			action: !state ? metrics.true : metrics.false,
			label: metrics.label
		})
	}

	return (
		<ListItem innerRef={ref}>
			<Switch checked={state} onChange={handleChange}/>
			<ListItemText primary={label}/>
		</ListItem>
	)
}

export default React.forwardRef((props, ref) => SettingsSwitch(props, ref))