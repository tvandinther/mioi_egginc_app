import React, { Children } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../actions"
import { Switch, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ReactGA from "react-ga"

const useStyle = makeStyles(theme => ({
	root: {
		width: "max-content",
	}
}))

function SettingsSwitch(props, ref) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const { store: storePath, action, label, metrics } = props
	const state = useSelector(store => {
		let obj = store
		for (let partialPath of storePath.split('.')) {
			obj = obj[partialPath]
		}
		return obj
	})

	const handleChange = event => {
		dispatch(actions[action](event.target.checked))
		ReactGA.event({
			category: metrics.category,
			action: !state ? metrics.true : metrics.false,
			label: metrics.label
		})
	}

	return (
		<ListItem style={props.style} className={classes.root} innerRef={ref}>
			<Switch checked={state} onChange={handleChange}/>
			<ListItemText primary={label}/>
			{props.children}
		</ListItem>
	)
}

export default React.forwardRef((props, ref) => SettingsSwitch(props, ref))