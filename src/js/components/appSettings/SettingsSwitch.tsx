import React, {PropsWithChildren} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "../../actions"
import { Switch, ListItem, ListItemText } from "@material-ui/core"
import useStyle from "./styles"
import ReactGA from "react-ga"
import { SwitchProfile } from "./switchProfiles"

interface PropTypes extends SwitchProfile {
	style?: React.CSSProperties,
	children?: JSX.Element,
}

const SettingsSwitch = React.forwardRef((props: PropTypes, ref) => {
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

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>, checked: boolean ) => {
		dispatch(actions[action](checked))
		ReactGA.event({
			category: metrics.category,
			action: !state ? metrics.true : metrics.false,
			label: metrics.label
		})
	}

	return (
		<ListItem innerRef={ref} style={props.style} className={classes.settingsSwitchRoot}>
			<Switch checked={state} onChange={handleChange}/>
			<ListItemText primary={label}/>
			{props.children}
		</ListItem>
	)
})

export default SettingsSwitch