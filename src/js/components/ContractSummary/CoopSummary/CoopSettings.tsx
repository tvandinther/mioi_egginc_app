import React, { useState } from "react"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SettingsIcon from '@material-ui/icons/Settings'
import SettingsSwitch from "../../appSettings/SettingsSwitch"
import switchProfiles from "../../appSettings/switchProfiles"

const useStyle = makeStyles(theme => ({
	root: {
		position: "absolute",
		top: 0,
		right: 0,
	}
}))

export default function CoopSettings() {
	const classes = useStyle()
	let [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const handleClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(evt.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

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
				<SettingsSwitch {...switchProfiles.detailedRewardsBar}/>
				<SettingsSwitch {...switchProfiles.hourlyEggLayingRate}/>
			</Menu>
		</div>
	)
}

