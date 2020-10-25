import React, { ChangeEvent, Children, CSSProperties } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../actions"
import { Switch, ListItem, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ReactGA from "react-ga"
import { SwitchProfile } from "./switchProfiles"

const useStyle = makeStyles(theme => ({
	root: {
		width: "max-content",
	}
}))

interface PropTypes extends SwitchProfile {
	style: CSSProperties,
	children: JSX.Element,
}

export default function SettingsSwitch(props: PropTypes) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const { store: storePath, action, label, metrics } = props

	// This whole function needs better typing
	const state: boolean = useSelector(store => {
		let obj: object = store
		for (let partialPath of storePath.split('.') as Array<keyof typeof obj>) {
			obj = obj[partialPath]
		}
		return obj as unknown as boolean // Needs to be cleaned up
	})

	const handleChange = (evt: ChangeEvent<HTMLInputElement>, checked: boolean ) => {
		dispatch(actions[action](checked))
		ReactGA.event({
			category: metrics.category,
			action: !state ? metrics.true : metrics.false,
			label: metrics.label
		})
	}

	return (
		// <ListItem style={props.style} className={classes.root} innerRef={ref}>
		<ListItem style={props.style} className={classes.root}>
			<Switch checked={state} onChange={handleChange}/>
			<ListItemText primary={label}/>
			{props.children}
		</ListItem>
	)
}

// export default React.forwardRef<JSX.Element, PropTypes>((props, ref) => SettingsSwitch(props, ref))