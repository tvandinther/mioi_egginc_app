import React, { useState } from "react"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SettingsIcon from '@material-ui/icons/Settings'
import SettingsSwitch from "../../appSettings/SettingsSwitch"
import switchProfiles from "../../appSettings/switchProfiles.json"

const useStyle = makeStyles(theme => ({
	root: {
		position: "absolute",
		right: 24,
	}
}))

export default function CoopSettings(props) {
	const classes = useStyle()
	let [anchorEl, setAnchorEl] = useState(null)

	const handleClick = evt => {
		setAnchorEl(evt.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const X = React.forwardRef((props, ref) => <detailedRewardsBarSwitch ref={ref} {...props}/>)
	return (
		<div>
			<IconButton color="inherit" className={classes.root} onClick={handleClick}>
				<SettingsIcon/>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<div>
					<SettingsSwitch {...switchProfiles.detailedRewardsBar}/>
					<SettingsSwitch {...switchProfiles.hourlyEggLayingRate}/>
				</div>
			</Menu>
		</div>
	)
}